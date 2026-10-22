// @vitest-environment node
import type { LeadRecord } from './types';
import { createWebhookProvider } from './webhook-provider';

const lead: LeadRecord = {
  id: 'lead-1',
  receivedAt: '2026-10-22T12:00:00.000Z',
  source: 'cemo-site',
  name: 'Maria da Silva',
  whatsapp: '5511947016162',
  interest: 'catarata',
  attribution: { landingPage: '/', conversionPage: '/', referrer: '', timestamp: '' },
};

afterEach(() => vi.restoreAllMocks());

function spyConsole() {
  return (['log', 'info', 'warn', 'error', 'debug'] as const).map((m) => vi.spyOn(console, m).mockImplementation(() => {}));
}

function loggedText(spies: ReturnType<typeof spyConsole>) {
  return JSON.stringify(spies.flatMap((s) => s.mock.calls));
}

describe('createWebhookProvider', () => {
  it('envia POST JSON com o segredo e o lead', async () => {
    const fetchImpl = vi.fn(async () => new Response('ok', { status: 200 }));
    const provider = createWebhookProvider({ url: 'https://hook.example/lead', secret: 's3cr3t', fetchImpl });
    expect(await provider.submit(lead)).toEqual({ ok: true });
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://hook.example/lead');
    expect(init.method).toBe('POST');
    const headers = new Headers(init.headers);
    expect(headers.get('content-type')).toBe('application/json');
    expect(headers.get('x-webhook-secret')).toBe('s3cr3t');
    expect(JSON.parse(String(init.body))).toEqual(lead);
  });

  it('5xx → falha retryable, sem PII no console', async () => {
    const spies = spyConsole();
    const provider = createWebhookProvider({
      url: 'https://hook.example/lead',
      fetchImpl: async () => new Response('erro', { status: 500 }),
    });
    expect(await provider.submit(lead)).toEqual({ ok: false, retryable: true });
    expect(loggedText(spies)).not.toMatch(/Maria|947016162/);
  });

  it('RF-4: timeout (AbortError) → falha retryable, sem PII no console', async () => {
    const spies = spyConsole();
    const provider = createWebhookProvider({
      url: 'https://hook.example/lead',
      timeoutMs: 10,
      fetchImpl: (_url, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')));
        }),
    });
    expect(await provider.submit(lead)).toEqual({ ok: false, retryable: true });
    expect(loggedText(spies)).not.toMatch(/Maria|947016162/);
  });

  it('4xx → falha não retryable', async () => {
    const provider = createWebhookProvider({
      url: 'https://hook.example/lead',
      fetchImpl: async () => new Response('não', { status: 422 }),
    });
    expect(await provider.submit(lead)).toEqual({ ok: false, retryable: false });
  });
});
