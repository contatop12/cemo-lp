import type { LeadProvider } from './provider';
import type { RateLimiter } from './rate-limit';
import { validateLeadInput } from './schema';
import type { LeadRecord } from './types';

export interface LeadHandlerDeps {
  getProvider(): LeadProvider | null;
  rateLimiter: RateLimiter;
  allowedOrigin: string;
  now?: () => Date;
  randomId?: () => string;
}

const MAX_BODY_BYTES = 10_000;

function json(status: number, body: object, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
  });
}

function clientKey(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

// Ordem: tipo → origem → limite de taxa → tamanho → JSON → validação → honeypot → provider.
// Nenhum caminho responde 500 e nenhum log contém dados pessoais ou de saúde.
export function createLeadHandler(deps: LeadHandlerDeps): (request: Request) => Promise<Response> {
  const now = deps.now ?? (() => new Date());
  const randomId = deps.randomId ?? (() => crypto.randomUUID());

  return async (request) => {
    try {
      if (!(request.headers.get('content-type') ?? '').toLowerCase().includes('application/json')) {
        return json(415, { ok: false, error: 'unsupported_media_type' });
      }

      const origin = request.headers.get('origin');
      if (origin && origin !== deps.allowedOrigin) return json(403, { ok: false, error: 'forbidden' });

      const limit = deps.rateLimiter.check(clientKey(request));
      if (!limit.allowed) {
        return json(429, { ok: false, error: 'rate_limited' }, { 'Retry-After': String(limit.retryAfterSeconds) });
      }

      const declared = Number(request.headers.get('content-length') ?? '0');
      if (declared > MAX_BODY_BYTES) return json(413, { ok: false, error: 'too_large' });
      const text = await request.text();
      if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) return json(413, { ok: false, error: 'too_large' });

      let raw: unknown;
      try {
        raw = JSON.parse(text);
      } catch {
        return json(400, { ok: false, error: 'bad_request' });
      }

      const result = validateLeadInput(raw);
      if (!result.ok) return json(400, { ok: false, error: 'invalid', errors: result.errors });
      if (result.honeypotFilled) return json(200, { ok: true });

      const provider = deps.getProvider();
      if (!provider) {
        console.warn('[lead] nenhum provider configurado (falha fechada)');
        return json(503, { ok: false, error: 'provider_unavailable' });
      }

      const record: LeadRecord = { ...result.data, id: randomId(), receivedAt: now().toISOString(), source: 'cemo-site' };
      try {
        const outcome = await provider.submit(record);
        if (outcome.ok) return json(200, { ok: true });
        return json(502, { ok: false, error: 'provider_error' });
      } catch {
        console.error('[lead] exceção no provider', provider.name);
        return json(502, { ok: false, error: 'provider_error' });
      }
    } catch {
      return json(400, { ok: false, error: 'bad_request' });
    }
  };
}
