// Consent Mode v2. Padrão: tudo negado. "Aceitar" libera medição (analytics_storage) e cookies de anúncio
// (ad_storage); envio de dados de usuário e personalização de anúncios seguem negados (contexto de saúde,
// briefing §121 — só após revisão jurídica).

export type ConsentChoice = 'granted' | 'denied';

export const CONSENT_STORAGE_KEY = 'cemo.consent.v1';

export const CONSENT_DEFAULT: Record<
  'ad_storage' | 'analytics_storage' | 'ad_user_data' | 'ad_personalization',
  'denied'
> = {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
};

export function consentUpdateFor(choice: ConsentChoice): Record<string, 'granted' | 'denied'> {
  return {
    analytics_storage: choice,
    ad_storage: choice,
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  };
}

// Storage pode estar indisponível (aba anônima, Safari ITP, bloqueio): nunca quebra a página.
export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

type GtagWindow = Window & { dataLayer?: unknown[] };

// Mesmo formato do gtag(): o GTM só reconhece comandos de consentimento empurrados como `arguments`.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]): void {
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer ?? [];
  // eslint-disable-next-line prefer-rest-params
  w.dataLayer.push(arguments);
}

export function writeConsent(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // sem persistência: a escolha vale para esta página
  }
  gtag('consent', 'update', consentUpdateFor(choice));
  document.documentElement.dataset.consent = choice;
}
