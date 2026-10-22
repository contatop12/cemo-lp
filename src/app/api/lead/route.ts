import { getServerEnv, getSiteUrl } from '@/lib/env';
import { createLeadHandler } from '@/lib/leads/handler';
import { resolveLeadProvider } from '@/lib/leads/provider';
import { createRateLimiter } from '@/lib/leads/rate-limit';

export const dynamic = 'force-dynamic';

const handler = createLeadHandler({
  getProvider: () => resolveLeadProvider(getServerEnv()),
  rateLimiter: createRateLimiter({ windowMs: 10 * 60 * 1000, max: 5 }),
  allowedOrigin: getSiteUrl(),
});

export async function POST(request: Request): Promise<Response> {
  return handler(request);
}
