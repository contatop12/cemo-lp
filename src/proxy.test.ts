// @vitest-environment node
import { NextRequest } from 'next/server';
import { proxy } from './proxy';

afterEach(() => vi.unstubAllEnvs());

function request(url: string, headers: Record<string, string> = {}) {
  const u = new URL(url);
  return new NextRequest(url, { headers: { host: u.host, ...headers } });
}

describe('proxy', () => {
  it('nunca redireciona para a própria URL (sem loop quando o site é http)', () => {
    vi.stubEnv('SITE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'http://localhost:3100');
    const res = proxy(request('http://localhost:3100/alimentos-que-auxiliam-na-visao/', { 'x-forwarded-proto': 'http' }));
    expect(res.status).toBe(200);
    expect(res.headers.get('location')).toBeNull();
  });

  it('produção: www → apex já no destino final do mapa, em um salto', () => {
    vi.stubEnv('SITE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://oftalmologiacemo.com.br');
    const res = proxy(request('https://www.oftalmologiacemo.com.br/contato-2/?gclid=abc', { 'x-forwarded-proto': 'https' }));
    expect(res.status).toBe(301);
    expect(res.headers.get('location')).toBe('https://oftalmologiacemo.com.br/contato/?gclid=abc');
  });

  it('fix: produção não redireciona só pelo x-forwarded-proto (HTTPS é da hospedagem/HSTS; evita loop atrás de proxy TLS)', () => {
    vi.stubEnv('SITE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://oftalmologiacemo.com.br');
    const res = proxy(request('http://oftalmologiacemo.com.br/sobre/', { 'x-forwarded-proto': 'http' }));
    expect(res.status).toBe(200);
    expect(res.headers.get('location')).toBeNull();
  });

  it('URL removida responde 410 com noindex', () => {
    vi.stubEnv('SITE_ENV', 'staging');
    const res = proxy(request('http://localhost:3000/post-list/'));
    expect(res.status).toBe(410);
    expect(res.headers.get('x-robots-tag')).toBe('noindex');
  });

  it('staging não aplica regra de host', () => {
    vi.stubEnv('SITE_ENV', 'staging');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://oftalmologiacemo.com.br');
    const res = proxy(request('http://localhost:3000/sobre/', { 'x-forwarded-proto': 'http' }));
    expect(res.status).toBe(200);
  });
});
