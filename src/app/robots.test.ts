// @vitest-environment node
import robots from './robots';

afterEach(() => vi.unstubAllEnvs());

describe('app/robots', () => {
  it('delega ao ambiente: staging bloqueia', () => {
    vi.stubEnv('SITE_ENV', 'staging');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://staging.oftalmologiacemo.com.br');
    expect(robots().rules).toEqual({ userAgent: '*', disallow: '/' });
  });

  it('produção aponta o sitemap da URL configurada', () => {
    vi.stubEnv('SITE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://oftalmologiacemo.com.br');
    expect(robots().sitemap).toBe('https://oftalmologiacemo.com.br/sitemap.xml');
  });
});
