import type { SiteEnv } from '@/lib/env';
import { createDevProvider } from './dev-provider';
import type { LeadRecord } from './types';
import { createWebhookProvider } from './webhook-provider';

export type ProviderResult = { ok: true } | { ok: false; retryable: boolean };

// Destino dos leads desacoplado de fornecedor (CRM, webhook, automação, e-mail, banco).
export interface LeadProvider {
  readonly name: string;
  submit(lead: LeadRecord): Promise<ProviderResult>;
}

// Produção sem webhook configurado => null: o formulário falha fechado e oferece o WhatsApp.
export function resolveLeadProvider(env: {
  siteEnv: SiteEnv;
  leadWebhookUrl?: string;
  leadWebhookSecret?: string;
}): LeadProvider | null {
  if (env.leadWebhookUrl) return createWebhookProvider({ url: env.leadWebhookUrl, secret: env.leadWebhookSecret });
  if (env.siteEnv !== 'production') return createDevProvider();
  return null;
}
