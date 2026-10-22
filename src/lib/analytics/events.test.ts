import { track } from './events';

type DataLayerWindow = Window & { dataLayer?: unknown[] };

beforeEach(() => {
  (window as DataLayerWindow).dataLayer = [];
});

describe('track', () => {
  it('empurra o evento genérico no dataLayer', () => {
    track('whatsapp_click', { location: 'hero', page_type: 'home' });
    expect((window as DataLayerWindow).dataLayer).toEqual([
      { event: 'whatsapp_click', location: 'hero', page_type: 'home' },
    ]);
  });

  it('descarta qualquer chave fora da allowlist (dados pessoais/de saúde)', () => {
    track('lead_form_submit', { form_id: 'home', service: 'catarata', name: 'Ana', phone: '11999999999' } as never);
    const [pushed] = (window as DataLayerWindow).dataLayer ?? [];
    expect(pushed).toEqual({ event: 'lead_form_submit', form_id: 'home' });
    expect(JSON.stringify(pushed)).not.toMatch(/catarata|Ana|11999999999/);
  });

  it('cria o dataLayer se ainda não existir', () => {
    delete (window as DataLayerWindow).dataLayer;
    track('phone_click', { location: 'footer' });
    expect((window as DataLayerWindow).dataLayer).toHaveLength(1);
  });
});
