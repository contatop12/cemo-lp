import {
  ATTRIBUTION_STORAGE_KEY,
  captureAttribution,
  getLeadAttribution,
  parseAttributionParams,
  safeStorage,
} from './attribution';

function memoryStorage(): Storage {
  const data = new Map<string, string>();
  return {
    get length() {
      return data.size;
    },
    clear: () => data.clear(),
    getItem: (k) => data.get(k) ?? null,
    key: (i) => [...data.keys()][i] ?? null,
    removeItem: (k) => void data.delete(k),
    setItem: (k, v) => void data.set(k, String(v)),
  };
}

function throwingStorage(): Storage {
  const fail = () => {
    throw new Error('SecurityError');
  };
  return { length: 0, clear: fail, getItem: fail, key: fail, removeItem: fail, setItem: fail } as Storage;
}

const day = 24 * 60 * 60 * 1000;
const t0 = new Date('2026-10-01T12:00:00.000Z');

describe('parseAttributionParams', () => {
  it('só lê os parâmetros de campanha conhecidos', () => {
    expect(parseAttributionParams('?utm_source=google&gclid=abc&foo=1')).toEqual({ utm_source: 'google', gclid: 'abc' });
  });
});

describe('captureAttribution', () => {
  it('primeira visita grava landing page, referrer e timestamp', () => {
    const storage = memoryStorage();
    const a = captureAttribution({
      href: 'https://oftalmologiacemo.com.br/especialidades/catarata/?utm_source=google#topo',
      referrer: 'https://www.google.com/',
      now: t0,
      storage,
    });
    expect(a).toMatchObject({
      landingPage: '/especialidades/catarata/?utm_source=google',
      referrer: 'https://www.google.com/',
      timestamp: t0.toISOString(),
      utm_source: 'google',
    });
    expect(JSON.parse(storage.getItem(ATTRIBUTION_STORAGE_KEY) ?? '{}').landingPage).toBe(a.landingPage);
  });

  it('segunda visita sem campanha mantém o first-touch', () => {
    const storage = memoryStorage();
    captureAttribution({ href: 'https://x.br/?utm_source=google', referrer: '', now: t0, storage });
    const second = captureAttribution({ href: 'https://x.br/contato/', referrer: '', now: new Date(t0.getTime() + day), storage });
    expect(second.landingPage).toBe('/?utm_source=google');
    expect(second.utm_source).toBe('google');
  });

  it('nova campanha (gclid) substitui o registro', () => {
    const storage = memoryStorage();
    captureAttribution({ href: 'https://x.br/?utm_source=google', referrer: '', now: t0, storage });
    const next = captureAttribution({ href: 'https://x.br/catarata/?gclid=xyz', referrer: '', now: new Date(t0.getTime() + day), storage });
    expect(next.gclid).toBe('xyz');
    expect(next.utm_source).toBeUndefined();
    expect(next.landingPage).toBe('/catarata/?gclid=xyz');
  });

  it('registro com mais de 30 dias expira', () => {
    const storage = memoryStorage();
    captureAttribution({ href: 'https://x.br/?utm_source=google', referrer: '', now: t0, storage });
    const later = captureAttribution({ href: 'https://x.br/sobre/', referrer: '', now: new Date(t0.getTime() + 31 * day), storage });
    expect(later.landingPage).toBe('/sobre/');
    expect(later.utm_source).toBeUndefined();
  });

  it('RF-2: storage que lança não propaga erro', () => {
    expect(() => captureAttribution({ href: 'https://x.br/?gclid=a', referrer: '', now: t0, storage: throwingStorage() })).not.toThrow();
  });

  it('sem storage devolve a atribuição calculada', () => {
    expect(captureAttribution({ href: 'https://x.br/?gclid=a', referrer: 'r', now: t0, storage: null })).toMatchObject({
      gclid: 'a',
      referrer: 'r',
    });
  });
});

describe('getLeadAttribution', () => {
  it('acrescenta a página de conversão', () => {
    const a = getLeadAttribution({ href: 'https://x.br/', referrer: '', now: t0, storage: memoryStorage() });
    expect(a.conversionPage).toBe('/');
  });
});

describe('safeStorage', () => {
  afterEach(() => vi.restoreAllMocks());

  it('devolve null quando o acesso ao localStorage lança', () => {
    vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    expect(safeStorage()).toBeNull();
  });
});
