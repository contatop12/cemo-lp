// Janela fixa em memória, por instância do servidor. Em serverless/multi-instância é best-effort:
// trocar por store compartilhado (ou somar Turnstile) se houver abuso.
export interface RateLimiter {
  check(key: string): { allowed: boolean; retryAfterSeconds: number };
}

export function createRateLimiter(opts: { windowMs: number; max: number; now?: () => number }): RateLimiter {
  const now = opts.now ?? Date.now;
  const buckets = new Map<string, { count: number; resetAt: number }>();

  return {
    check(key) {
      const t = now();
      let bucket = buckets.get(key);
      if (!bucket || t >= bucket.resetAt) {
        bucket = { count: 0, resetAt: t + opts.windowMs };
        buckets.set(key, bucket);
      }
      if (buckets.size > 10_000) {
        for (const [k, b] of buckets) if (t >= b.resetAt) buckets.delete(k);
      }
      bucket.count++;
      if (bucket.count > opts.max) {
        return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - t) / 1000)) };
      }
      return { allowed: true, retryAfterSeconds: 0 };
    },
  };
}
