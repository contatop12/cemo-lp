// @vitest-environment node
import { memorySource, serveVideo } from '@/lib/media/video-source';

const DATA = new Uint8Array(5000).map((_, i) => i % 251);
const source = memorySource({ 'especialidades.mp4': DATA, 'especialidades.webm': DATA.slice(0, 3000) });
const SIZE = DATA.byteLength;

function call(file: string, range?: string) {
  const req = new Request(`http://localhost/v/${file}`, range ? { headers: { range } } : undefined);
  return serveVideo(req, file, source);
}

describe('serveVideo — vídeo com suporte a Range (Safari/iOS exige 206)', () => {
  it('sem Range: 200 com o arquivo inteiro, Accept-Ranges e tipo pelo formato', async () => {
    const res = await call('especialidades.mp4');
    expect(res.status).toBe(200);
    expect(res.headers.get('accept-ranges')).toBe('bytes');
    expect(res.headers.get('content-type')).toBe('video/mp4');
    expect(Number(res.headers.get('content-length'))).toBe(SIZE);
    expect((await call('especialidades.webm')).headers.get('content-type')).toBe('video/webm');
  });

  it('bytes=0-99: 206 com Content-Range e exatamente o trecho pedido', async () => {
    const res = await call('especialidades.mp4', 'bytes=0-99');
    expect(res.status).toBe(206);
    expect(res.headers.get('content-range')).toBe(`bytes 0-99/${SIZE}`);
    const body = new Uint8Array(await res.arrayBuffer());
    expect(body).toEqual(DATA.slice(0, 100));
  });

  it('bytes=N- vai até o fim; sufixo bytes=-N pega os últimos N', async () => {
    const open = await call('especialidades.mp4', `bytes=${SIZE - 10}-`);
    expect(open.status).toBe(206);
    expect((await open.arrayBuffer()).byteLength).toBe(10);
    const suffix = await call('especialidades.mp4', 'bytes=-20');
    expect(suffix.headers.get('content-range')).toBe(`bytes ${SIZE - 20}-${SIZE - 1}/${SIZE}`);
  });

  it('fora do tamanho: 416', async () => {
    const res = await call('especialidades.mp4', `bytes=${SIZE + 10}-`);
    expect(res.status).toBe(416);
    expect(res.headers.get('content-range')).toBe(`bytes */${SIZE}`);
  });

  it('nome fora do padrão, outro formato ou inexistente: 404', async () => {
    expect((await call('../secret.mp4')).status).toBe(404);
    expect((await call('especialidades.mov')).status).toBe(404);
    expect((await call('nao-existe.mp4')).status).toBe(404);
  });
});

describe('firstAvailable', () => {
  it('usa a segunda fonte quando a primeira não tem o arquivo (R2 local vazio → disco)', async () => {
    const { firstAvailable } = await import('@/lib/media/video-source');
    const chained = firstAvailable(memorySource({}), source);
    const res = await serveVideo(new Request('http://localhost/v/especialidades.mp4', { headers: { range: 'bytes=0-9' } }), 'especialidades.mp4', chained);
    expect(res.status).toBe(206);
  });
});
