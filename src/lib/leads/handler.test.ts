// @vitest-environment node
import { createLeadHandler, type LeadHandlerDeps } from './handler';
import { resolveLeadProvider, type LeadProvider, type ProviderResult } from './provider';
import { createRateLimiter } from './rate-limit';
import type { LeadRecord } from './types';

const ORIGIN = 'https://oftalmologiacemo.com.br';

const body = {
  name: 'Maria da Silva',
  whatsapp: '(11) 94701-6162',
  interest: 'catarata',
  attribution: { landingPage: '/', conversionPage: '/', referrer: '', timestamp: '2026-10-22T12:00:00.000Z' },
};

function fakeProvider(result: ProviderResult | Error = { ok: true }) {
  const received: LeadRecord[] = [];
  const provider: LeadProvider = {
    name: 'fake',
    async submit(lead) {
      received.push(lead);
      if (result instanceof Error) throw result;
      return result;
    },
  };
  return { provider, received };
}

function setup(overrides: Partial<LeadHandlerDeps> = {}, provider = fakeProvider()) {
  const handler = createLeadHandler({
    getProvider: () => provider.provider,
    rateLimiter: createRateLimiter({ windowMs: 600_000, max: 5, now: () => 0 }),
    allowedOrigin: ORIGIN,
    now: () => new Date('2026-10-22T12:00:00.000Z'),
    randomId: () => 'lead-1',
    ...overrides,
  });
  return { handler, received: provider.received };
}

function post(payload: unknown, init: { headers?: Record<string, string>; raw?: string } = {}) {
  return new Request(`${ORIGIN}/api/lead/`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.7', ...init.headers },
    body: init.raw ?? JSON.stringify(payload),
  });
}

afterEach(() => vi.restoreAllMocks());

function spyConsole() {
  return (['log', 'info', 'warn', 'error', 'debug'] as const).map((m) => vi.spyOn(console, m).mockImplementation(() => {}));
}

describe('createLeadHandler', () => {
  it('lead válido → 200 e provider recebe o LeadRecord normalizado', async () => {
    const { handler, received } = setup();
    const res = await handler(post(body));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(received).toHaveLength(1);
    expect(received[0]).toMatchObject({
      id: 'lead-1',
      source: 'cemo-site',
      whatsapp: '5511947016162',
      receivedAt: '2026-10-22T12:00:00.000Z',
    });
  });

  it('honeypot → 200 sem chamar o provider', async () => {
    const { handler, received } = setup();
    const res = await handler(post({ ...body, website: 'spam' }));
    expect(res.status).toBe(200);
    expect(received).toHaveLength(0);
  });

  it('dados inválidos → 400 com erros por campo', async () => {
    const { handler } = setup();
    const res = await handler(post({ ...body, whatsapp: '1234' }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json).toMatchObject({ ok: false, error: 'invalid' });
    expect(json.errors.whatsapp).toBeDefined();
  });

  it('RF-1: JSON malformado → 400 bad_request', async () => {
    const { handler } = setup();
    const res = await handler(post(null, { raw: '{"name": ' }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: 'bad_request' });
  });

  it('RF-1: corpo maior que 10 KB → 413', async () => {
    const { handler } = setup();
    const res = await handler(post(null, { raw: 'x'.repeat(10_001) }));
    expect(res.status).toBe(413);
  });

  it('RF-1: Content-Type errado → 415', async () => {
    const { handler } = setup();
    const res = await handler(post(body, { headers: { 'content-type': 'text/plain' } }));
    expect(res.status).toBe(415);
  });

  it('RF-1: Origin de outro site → 403; mesmo Origin segue', async () => {
    const { handler } = setup();
    expect((await handler(post(body, { headers: { origin: 'https://evil.example' } }))).status).toBe(403);
    expect((await handler(post(body, { headers: { origin: ORIGIN } }))).status).toBe(200);
  });

  it('6ª chamada do mesmo IP → 429 com Retry-After', async () => {
    const { handler } = setup();
    for (let i = 0; i < 5; i++) await handler(post(body));
    const res = await handler(post(body));
    expect(res.status).toBe(429);
    expect(Number(res.headers.get('retry-after'))).toBeGreaterThan(0);
  });

  it('sem provider (produção sem webhook) → 503 e nada de PII no console', async () => {
    const spies = spyConsole();
    const { handler } = setup({ getProvider: () => null });
    const res = await handler(post(body));
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, error: 'provider_unavailable' });
    expect(JSON.stringify(spies.flatMap((s) => s.mock.calls))).not.toMatch(/Maria|947016162|catarata/);
  });

  it('RF-4: provider falha → 502', async () => {
    const { handler } = setup({}, fakeProvider({ ok: false, retryable: true }));
    const res = await handler(post(body));
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ ok: false, error: 'provider_error' });
  });

  it('RF-4: provider lança → 502, nunca 500, sem PII no console', async () => {
    const spies = spyConsole();
    const { handler } = setup({}, fakeProvider(new Error('boom Maria 5511947016162')));
    const res = await handler(post(body));
    expect(res.status).toBe(502);
    expect(JSON.stringify(spies.flatMap((s) => s.mock.calls))).not.toMatch(/Maria|947016162/);
  });
});

describe('resolveLeadProvider', () => {
  it('produção sem webhook → null (falha fechada)', () => {
    expect(resolveLeadProvider({ siteEnv: 'production' })).toBeNull();
  });

  it('staging sem webhook → provider de desenvolvimento', () => {
    expect(resolveLeadProvider({ siteEnv: 'staging' })?.name).toBe('dev');
  });

  it('com webhook → provider webhook em qualquer ambiente', () => {
    expect(resolveLeadProvider({ siteEnv: 'production', leadWebhookUrl: 'https://hook.example' })?.name).toBe('webhook');
    expect(resolveLeadProvider({ siteEnv: 'development', leadWebhookUrl: 'https://hook.example' })?.name).toBe('webhook');
  });
});
