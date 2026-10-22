import type { LeadProvider } from './provider';

// POST JSON para o webhook configurado. Sem retry automático (evita duplicar leads); nunca loga o corpo.
export function createWebhookProvider(cfg: {
  url: string;
  secret?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
}): LeadProvider {
  const fetchImpl = cfg.fetchImpl ?? fetch;
  const timeoutMs = cfg.timeoutMs ?? 8000;

  return {
    name: 'webhook',
    async submit(lead) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (cfg.secret) headers['X-Webhook-Secret'] = cfg.secret;
        const res = await fetchImpl(cfg.url, {
          method: 'POST',
          headers,
          body: JSON.stringify(lead),
          signal: controller.signal,
        });
        if (res.ok) return { ok: true };
        console.warn('[lead:webhook] resposta de erro', res.status);
        return { ok: false, retryable: res.status >= 500 || res.status === 429 };
      } catch (error) {
        const kind = error instanceof Error ? error.name : 'unknown';
        console.warn('[lead:webhook] falha de rede ou timeout', kind);
        return { ok: false, retryable: true };
      } finally {
        clearTimeout(timer);
      }
    },
  };
}
