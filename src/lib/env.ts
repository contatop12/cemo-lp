export type SiteEnv = 'development' | 'staging' | 'production';

const SITE_ENVS: readonly SiteEnv[] = ['development', 'staging', 'production'];
const DEFAULT_SITE_URL = 'http://localhost:3000';

function nonEmpty(value: string | undefined): string | undefined {
  return value && value.trim() !== '' ? value.trim() : undefined;
}

export function getSiteEnv(): SiteEnv {
  const value = process.env.SITE_ENV;
  return SITE_ENVS.includes(value as SiteEnv) ? (value as SiteEnv) : 'development';
}

export function getSiteUrl(): string {
  return (nonEmpty(process.env.NEXT_PUBLIC_SITE_URL) ?? DEFAULT_SITE_URL).replace(/\/+$/, '');
}

export function getPublicEnv(): { siteEnv: SiteEnv; siteUrl: string; gtmId: string | undefined } {
  return {
    siteEnv: getSiteEnv(),
    siteUrl: getSiteUrl(),
    gtmId: nonEmpty(process.env.NEXT_PUBLIC_GTM_ID),
  };
}

// Lido a cada chamada: segredos nunca ficam congelados em escopo de módulo.
export function getServerEnv(): {
  siteEnv: SiteEnv;
  leadWebhookUrl: string | undefined;
  leadWebhookSecret: string | undefined;
  allowDevLeadProvider: boolean;
} {
  return {
    siteEnv: getSiteEnv(),
    leadWebhookUrl: nonEmpty(process.env.LEAD_WEBHOOK_URL),
    leadWebhookSecret: nonEmpty(process.env.LEAD_WEBHOOK_SECRET),
    // Provider de memória só em next dev ou com opt-in explícito: um SITE_ENV ausente/errado em runtime
    // nunca transforma produção num destino que descarta leads.
    allowDevLeadProvider: process.env.NODE_ENV !== 'production' || process.env.LEAD_PROVIDER === 'dev',
  };
}
