// @vitest-environment node
import { buildSecurityHeaders } from './headers';

const get = (env: Parameters<typeof buildSecurityHeaders>[0], key: string) =>
  buildSecurityHeaders(env).find((h) => h.key === key)?.value;

describe('buildSecurityHeaders', () => {
  it('headers básicos em todos os ambientes', () => {
    for (const env of ['development', 'staging', 'production'] as const) {
      expect(get(env, 'X-Content-Type-Options')).toBe('nosniff');
      expect(get(env, 'Referrer-Policy')).toBe('strict-origin-when-cross-origin');
      expect(get(env, 'X-Frame-Options')).toBe('SAMEORIGIN');
      const permissions = get(env, 'Permissions-Policy') ?? '';
      expect(permissions).toContain('camera=()');
      expect(permissions).toContain('microphone=()');
      expect(permissions).toContain('geolocation=()');
    }
  });

  it('HSTS só em produção', () => {
    expect(get('production', 'Strict-Transport-Security')).toBe('max-age=63072000; includeSubDomains; preload');
    expect(get('staging', 'Strict-Transport-Security')).toBeUndefined();
    expect(get('development', 'Strict-Transport-Security')).toBeUndefined();
  });

  it('CSP compatível com GTM, YouTube sem cookies e Maps', () => {
    const csp = get('production', 'Content-Security-Policy') ?? '';
    expect(csp).toContain('https://www.googletagmanager.com');
    expect(csp).toMatch(/frame-src[^;]*https:\/\/www\.youtube-nocookie\.com/);
    expect(csp).toMatch(/frame-src[^;]*https:\/\/www\.google\.com/);
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).toContain("frame-ancestors 'self'");
    expect(csp).toContain("form-action 'self'");
    expect(csp).not.toContain("'unsafe-eval'");
  });

  it("'unsafe-eval' só em desenvolvimento (HMR)", () => {
    expect(get('development', 'Content-Security-Policy')).toContain("'unsafe-eval'");
  });

  it('X-Robots-Tag noindex fora de produção', () => {
    expect(get('staging', 'X-Robots-Tag')).toBe('noindex, nofollow');
    expect(get('development', 'X-Robots-Tag')).toBe('noindex, nofollow');
    expect(get('production', 'X-Robots-Tag')).toBeUndefined();
  });
});
