// @vitest-environment node
import { getPublicEnv, getServerEnv, getSiteEnv, getSiteUrl } from './env';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('getSiteEnv', () => {
  it('lê SITE_ENV válido', () => {
    vi.stubEnv('SITE_ENV', 'staging');
    expect(getSiteEnv()).toBe('staging');
  });

  it('cai para development quando SITE_ENV é inválido', () => {
    vi.stubEnv('SITE_ENV', 'banana');
    expect(getSiteEnv()).toBe('development');
  });

  it('cai para development quando SITE_ENV está ausente', () => {
    vi.stubEnv('SITE_ENV', undefined);
    expect(getSiteEnv()).toBe('development');
  });
});

describe('getSiteUrl', () => {
  it('remove a barra final', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://x.com.br/');
    expect(getSiteUrl()).toBe('https://x.com.br');
  });

  it('usa localhost por padrão', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', undefined);
    expect(getSiteUrl()).toBe('http://localhost:3000');
  });
});

describe('getPublicEnv', () => {
  it('expõe só dados públicos', () => {
    vi.stubEnv('SITE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://oftalmologiacemo.com.br');
    vi.stubEnv('NEXT_PUBLIC_GTM_ID', 'GTM-TEST');
    vi.stubEnv('LEAD_WEBHOOK_SECRET', 'segredo');
    const env = getPublicEnv();
    expect(env).toEqual({ siteEnv: 'production', siteUrl: 'https://oftalmologiacemo.com.br', gtmId: 'GTM-TEST' });
    expect(JSON.stringify(env)).not.toContain('segredo');
  });

  it('gtmId vazio vira undefined', () => {
    vi.stubEnv('NEXT_PUBLIC_GTM_ID', '');
    expect(getPublicEnv().gtmId).toBeUndefined();
  });
});

describe('getServerEnv', () => {
  it('lê process.env a cada chamada (leitura tardia)', () => {
    vi.stubEnv('LEAD_WEBHOOK_URL', 'https://hook.example/a');
    expect(getServerEnv().leadWebhookUrl).toBe('https://hook.example/a');
    vi.stubEnv('LEAD_WEBHOOK_URL', 'https://hook.example/b');
    expect(getServerEnv().leadWebhookUrl).toBe('https://hook.example/b');
  });

  it('valores vazios viram undefined', () => {
    vi.stubEnv('LEAD_WEBHOOK_URL', '');
    vi.stubEnv('LEAD_WEBHOOK_SECRET', '');
    const env = getServerEnv();
    expect(env.leadWebhookUrl).toBeUndefined();
    expect(env.leadWebhookSecret).toBeUndefined();
  });
});
