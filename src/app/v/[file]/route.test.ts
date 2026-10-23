// @vitest-environment node
import { statSync } from 'node:fs';
import { join } from 'node:path';
import { GET } from './route';

const FILE = 'especialidades.mp4';
const SIZE = statSync(join(process.cwd(), 'public/videos', FILE)).size;

function call(file: string, range?: string) {
  const req = new Request(`http://localhost/v/${file}`, range ? { headers: { range } } : undefined);
  return GET(req, { params: Promise.resolve({ file }) });
}

describe('/v/[file] — vídeo com suporte a Range (Safari/iOS exige 206)', () => {
  it('sem Range: 200 com o arquivo inteiro e Accept-Ranges', async () => {
    const res = await call(FILE);
    expect(res.status).toBe(200);
    expect(res.headers.get('accept-ranges')).toBe('bytes');
    expect(res.headers.get('content-type')).toBe('video/mp4');
    expect(Number(res.headers.get('content-length'))).toBe(SIZE);
  });

  it('bytes=0-99: 206 com Content-Range e só o trecho pedido', async () => {
    const res = await call(FILE, 'bytes=0-99');
    expect(res.status).toBe(206);
    expect(res.headers.get('content-range')).toBe(`bytes 0-99/${SIZE}`);
    expect((await res.arrayBuffer()).byteLength).toBe(100);
  });

  it('bytes=N- vai até o fim; sufixo bytes=-N pega os últimos N', async () => {
    const open = await call(FILE, `bytes=${SIZE - 10}-`);
    expect(open.status).toBe(206);
    expect((await open.arrayBuffer()).byteLength).toBe(10);
    const suffix = await call(FILE, 'bytes=-20');
    expect(suffix.headers.get('content-range')).toBe(`bytes ${SIZE - 20}-${SIZE - 1}/${SIZE}`);
  });

  it('fora do tamanho: 416', async () => {
    const res = await call(FILE, `bytes=${SIZE + 10}-`);
    expect(res.status).toBe(416);
    expect(res.headers.get('content-range')).toBe(`bytes */${SIZE}`);
  });

  it('nome fora do padrão ou inexistente: 404 (sem acesso a outros caminhos)', async () => {
    expect((await call('../secret.mp4')).status).toBe(404);
    expect((await call('nao-existe.mp4')).status).toBe(404);
  });
});
