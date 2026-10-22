// Atribuição first-party (fica no navegador e só é enviada junto com o lead; nunca vai para analytics).
// First-touch por 30 dias; uma nova campanha na URL substitui o registro.
import type { Attribution, LeadAttribution } from '@/lib/leads/types';

export const ATTRIBUTION_STORAGE_KEY = 'cemo.attribution.v1';
export const TRACKING_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'wbraid',
  'gbraid',
] as const;

type TrackingParam = (typeof TRACKING_PARAMS)[number];

const TTL_MS = 30 * 24 * 60 * 60 * 1000;

export function safeStorage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
}

export function parseAttributionParams(search: string): Partial<Record<TrackingParam, string>> {
  const params = new URLSearchParams(search);
  const out: Partial<Record<TrackingParam, string>> = {};
  for (const key of TRACKING_PARAMS) {
    const value = params.get(key);
    if (value) out[key] = value.slice(0, 500);
  }
  return out;
}

function read(storage: Storage | null): Attribution | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(ATTRIBUTION_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

function write(storage: Storage | null, value: Attribution): void {
  if (!storage) return;
  try {
    storage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // storage cheio ou bloqueado: a atribuição desta visita segue em memória
  }
}

export function captureAttribution(ctx: { href: string; referrer: string; now: Date; storage: Storage | null }): Attribution {
  const url = new URL(ctx.href);
  const campaign = parseAttributionParams(url.search);
  const stored = read(ctx.storage);
  const expired = !stored || ctx.now.getTime() - new Date(stored.timestamp).getTime() > TTL_MS;

  if (stored && !expired && Object.keys(campaign).length === 0) return stored;

  const fresh: Attribution = {
    ...campaign,
    landingPage: `${url.pathname}${url.search}`,
    referrer: ctx.referrer,
    timestamp: ctx.now.toISOString(),
  };
  write(ctx.storage, fresh);
  return fresh;
}

export function getLeadAttribution(ctx: { href: string; referrer: string; now: Date; storage: Storage | null }): LeadAttribution {
  return { ...captureAttribution(ctx), conversionPage: new URL(ctx.href).pathname };
}
