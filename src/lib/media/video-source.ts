// Entrega de vídeo com suporte a Range. O arquivo mora no R2 (bucket cemo-videos, binding VIDEOS) em produção e
// staging; no `next start` local e nos testes, em media/videos (disco) ou na memória. Os assets estáticos do Workers
// não atendem Range (devolvem 200 com o arquivo inteiro) — e o Safari do iPhone só toca vídeo com 206.

export interface VideoSource {
  /** Tamanho em bytes, ou null se o arquivo não existe. */
  size(key: string): Promise<number | null>;
  /** Bytes de start a end (inclusive). */
  read(key: string, start: number, end: number): Promise<BodyInit>;
}

const TYPES: Record<string, string> = { mp4: 'video/mp4', webm: 'video/webm' };
const NAME = /^[a-z0-9-]+\.(mp4|webm)$/;

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

export async function serveVideo(request: Request, file: string, source: VideoSource): Promise<Response> {
  const match = NAME.exec(file);
  if (!match) return new Response('Not found', { status: 404 });
  const size = await source.size(file);
  if (size === null) return new Response('Not found', { status: 404 });

  // Sem cache compartilhado na borda (ela devolveria o arquivo inteiro a pedidos de trecho); o navegador guarda.
  const base = { 'Content-Type': TYPES[match[1]!]!, 'Accept-Ranges': 'bytes', 'Cache-Control': 'private, max-age=86400' };
  const header = request.headers.get('range');
  const range = header ? parseRange(header, size) : null;

  if (range === 'invalid') return new Response(null, { status: 416, headers: { ...base, 'Content-Range': `bytes */${size}` } });
  if (!range) return new Response(await source.read(file, 0, size - 1), { status: 200, headers: { ...base, 'Content-Length': String(size) } });
  const { start, end } = range;
  return new Response(await source.read(file, start, end), {
    status: 206,
    headers: { ...base, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': String(end - start + 1) },
  });
}

// ---------- fontes ----------

interface R2ObjectLike {
  size: number;
}
interface R2BodyLike extends R2ObjectLike {
  body: ReadableStream;
}
export interface R2BucketLike {
  head(key: string): Promise<R2ObjectLike | null>;
  get(key: string, options: { range: { offset: number; length: number } }): Promise<R2BodyLike | null>;
}

export function r2Source(bucket: R2BucketLike): VideoSource {
  return {
    async size(key) {
      return (await bucket.head(key))?.size ?? null;
    },
    async read(key, start, end) {
      const object = await bucket.get(key, { range: { offset: start, length: end - start + 1 } });
      if (!object) throw new Error(`Vídeo sumiu do R2: ${key}`);
      return object.body;
    },
  };
}

/** Local (`next start`, e2e): media/videos, gerado por scripts/encode-videos.mjs. */
export function diskSource(dir: string): VideoSource {
  return {
    async size(key) {
      const [{ stat }, { join }] = await Promise.all([import('node:fs/promises'), import('node:path')]);
      try {
        return (await stat(join(dir, key))).size;
      } catch {
        return null;
      }
    },
    async read(key, start, end) {
      const [{ readFile }, { join }] = await Promise.all([import('node:fs/promises'), import('node:path')]);
      const buf = await readFile(join(dir, key));
      return new Uint8Array(buf.subarray(start, end + 1));
    },
  };
}

/** Primeira fonte que tem o arquivo vence (ex.: R2 → disco; o R2 simulado no `next start` local vem vazio). */
export function firstAvailable(...sources: VideoSource[]): VideoSource {
  const pick = async (key: string) => {
    for (const s of sources) {
      const size = await s.size(key);
      if (size !== null) return { s, size };
    }
    return null;
  };
  return {
    async size(key) {
      return (await pick(key))?.size ?? null;
    },
    async read(key, start, end) {
      const found = await pick(key);
      if (!found) throw new Error(`Vídeo não encontrado: ${key}`);
      return found.s.read(key, start, end);
    },
  };
}

export function memorySource(files: Record<string, Uint8Array>): VideoSource {
  return {
    async size(key) {
      return files[key]?.byteLength ?? null;
    },
    async read(key, start, end) {
      return files[key]!.slice(start, end + 1);
    },
  };
}
