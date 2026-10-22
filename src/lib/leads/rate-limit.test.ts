// @vitest-environment node
import { createRateLimiter } from './rate-limit';

describe('createRateLimiter', () => {
  it('permite 5, bloqueia o 6º com Retry-After e libera após a janela', () => {
    let now = 0;
    const limiter = createRateLimiter({ windowMs: 600_000, max: 5, now: () => now });
    for (let i = 0; i < 5; i++) expect(limiter.check('ip').allowed).toBe(true);
    const blocked = limiter.check('ip');
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
    now = 600_001;
    expect(limiter.check('ip').allowed).toBe(true);
  });

  it('chaves independentes', () => {
    const limiter = createRateLimiter({ windowMs: 1000, max: 1, now: () => 0 });
    expect(limiter.check('a').allowed).toBe(true);
    expect(limiter.check('b').allowed).toBe(true);
    expect(limiter.check('a').allowed).toBe(false);
  });
});
