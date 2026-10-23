// Vídeos com suporte a Range. Os assets estáticos do Workers devolvem 200 com o arquivo inteiro mesmo quando o
// navegador pede um trecho — e o Safari (iPhone/iPad) só toca vídeo com 206. Esta rota lê o MP4 de public/videos
// (binding ASSETS no Cloudflare; disco no `next start`) e responde ao trecho pedido.
export const dynamic = 'force-dynamic';

const NAME = /^[a-z0-9-]+\.mp4$/;

async function loadVideo(file: string, request: Request): Promise<ArrayBuffer | null> {
  const path = `/videos/${file}`;
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const { env } = await getCloudflareContext({ async: true });
    const assets = (env as { ASSETS?: { fetch(input: Request | string): Promise<Response> } }).ASSETS;
    if (assets) {
      const res = await assets.fetch(new URL(path, request.url).toString());
      return res.ok ? res.arrayBuffer() : null;
    }
  } catch {
    // fora do Workers (next start, testes): lê do disco
  }
  try {
    const [{ readFile }, { join }] = await Promise.all([import('node:fs/promises'), import('node:path')]);
    const buf = await readFile(join(process.cwd(), 'public', path));
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  } catch {
    return null;
  }
}

function parseRange(header: string, size: number): { start: number; end: number } | 'invalid' | null {
  const m = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!m) return null; // múltiplos intervalos ou formato desconhecido: responde o arquivo inteiro
  const [, a = '', b = ''] = m;
  if (a === '' && b === '') return null;
  let start: number;
  let end: number;
  if (a === '') {
    start = Math.max(0, size - Number(b));
    end = size - 1;
  } else {
    start = Number(a);
    end = b === '' ? size - 1 : Math.min(Number(b), size - 1);
  }
  return start >= size || start > end ? 'invalid' : { start, end };
}

export async function GET(request: Request, { params }: { params: Promise<{ file: string }> }): Promise<Response> {
  const { file } = await params;
  if (!NAME.test(file)) return new Response('Not found', { status: 404 });
  const data = await loadVideo(file, request);
  if (!data) return new Response('Not found', { status: 404 });

  const size = data.byteLength;
  // Sem cache compartilhado na borda (ela devolveria o arquivo inteiro a pedidos de trecho); o navegador guarda.
  const base = { 'Content-Type': 'video/mp4', 'Accept-Ranges': 'bytes', 'Cache-Control': 'private, max-age=86400' };
  const header = request.headers.get('range');
  const range = header ? parseRange(header, size) : null;

  if (range === 'invalid') return new Response(null, { status: 416, headers: { ...base, 'Content-Range': `bytes */${size}` } });
  if (!range) return new Response(data, { status: 200, headers: { ...base, 'Content-Length': String(size) } });
  const { start, end } = range;
  return new Response(data.slice(start, end + 1), {
    status: 206,
    headers: { ...base, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': String(end - start + 1) },
  });
}
