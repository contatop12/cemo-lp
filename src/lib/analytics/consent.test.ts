import { CONSENT_DEFAULT, CONSENT_STORAGE_KEY, consentUpdateFor, readConsent, resetConsent, writeConsent } from './consent';

type DataLayerWindow = Window & { dataLayer?: unknown[] };

beforeEach(() => {
  resetConsent();
  (window as DataLayerWindow).dataLayer = [];
  localStorage.clear();
  delete document.documentElement.dataset.consent;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Consent Mode v2', () => {
  it('padrão: tudo negado', () => {
    expect(CONSENT_DEFAULT).toEqual({
      ad_storage: 'denied',
      analytics_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  });

  it('aceitar libera só analytics e ad_storage (dados de usuário para anúncios seguem negados)', () => {
    expect(consentUpdateFor('granted')).toEqual({
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  });

  it('recusar mantém tudo negado', () => {
    expect(Object.values(consentUpdateFor('denied')).every((v) => v === 'denied')).toBe(true);
  });

  it('readConsent devolve null quando não há escolha', () => {
    expect(readConsent()).toBeNull();
  });

  it('readConsent lê a escolha salva', () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'denied');
    expect(readConsent()).toBe('denied');
  });

  it('readConsent ignora valor inválido', () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'talvez');
    expect(readConsent()).toBeNull();
  });

  it('RF-2: readConsent não quebra com storage bloqueado', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    expect(readConsent()).toBeNull();
  });

  it('RF-2: writeConsent aplica no GTM mesmo se o storage lançar', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    expect(() => writeConsent('granted')).not.toThrow();
    const last = (window as DataLayerWindow).dataLayer?.at(-1) as ArrayLike<unknown>;
    expect(last[0]).toBe('consent');
    expect(last[1]).toBe('update');
    expect(last[2]).toEqual(consentUpdateFor('granted'));
    expect(document.documentElement.dataset.consent).toBe('granted');
  });
});

describe('fix: escolha em memória quando o storage está bloqueado', () => {
  it('writeConsent + readConsent funcionam com getItem/setItem lançando', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    writeConsent('granted');
    expect(readConsent()).toBe('granted');
  });
});
