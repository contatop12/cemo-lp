// @vitest-environment node
import { normalizeWhatsapp, validateLeadInput } from './schema';

const valid = {
  name: 'Maria da Silva',
  whatsapp: '(11) 94701-6162',
  interest: 'catarata',
  attribution: {
    landingPage: '/',
    conversionPage: '/',
    referrer: '',
    timestamp: '2026-10-22T12:00:00.000Z',
    utm_source: 'google',
  },
};

describe('normalizeWhatsapp (RF-1)', () => {
  it.each([
    ['(11) 94701-6162', '5511947016162'],
    ['+55 11 94701-6162', '5511947016162'],
    ['55 (11) 94701-6162', '5511947016162'],
    ['011 94701-6162', '5511947016162'],
    ['11947016162', '5511947016162'],
    ['11 4788-3536', '551147883536'],
  ])('%s → %s', (input, expected) => {
    expect(normalizeWhatsapp(input)).toBe(expected);
  });

  it.each(['1234', '', 'abc', '119470161620000', '(11) 94701-61AB'])('%s → null', (input) => {
    expect(normalizeWhatsapp(input)).toBeNull();
  });
});

describe('validateLeadInput', () => {
  it('aceita um lead válido e normaliza o WhatsApp', () => {
    const result = validateLeadInput(valid);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.whatsapp).toBe('5511947016162');
      expect(result.data.interest).toBe('catarata');
      expect(result.data.attribution.utm_source).toBe('google');
      expect(result.honeypotFilled).toBe(false);
    }
  });

  it('nome com acento e apóstrofo é válido', () => {
    expect(validateLeadInput({ ...valid, name: "D'Ávila José" }).ok).toBe(true);
  });

  it('nome com 1 caractere → erro em name', () => {
    const result = validateLeadInput({ ...valid, name: 'A' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.name).toBeDefined();
  });

  it('nome com marcação nunca passa com "<"', () => {
    const result = validateLeadInput({ ...valid, name: '<script>alert(1)</script>' });
    if (result.ok) expect(result.data.name).not.toContain('<');
    else expect(result.errors.name).toBeDefined();
  });

  it('interesse fora da lista → erro em interest', () => {
    const result = validateLeadInput({ ...valid, interest: 'banana' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.interest).toBeDefined();
  });

  it('WhatsApp inválido → mensagem exata', () => {
    const result = validateLeadInput({ ...valid, whatsapp: '1234' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.whatsapp).toBe('Informe um telefone com DDD, por exemplo (11) 91234-5678');
  });

  it.each([{ ...valid, name: 123 }, null, [], 'texto', { ...valid, whatsapp: { x: 1 } }])(
    'entrada malformada %# → ok:false sem lançar',
    (raw) => {
      expect(() => validateLeadInput(raw)).not.toThrow();
      expect(validateLeadInput(raw).ok).toBe(false);
    },
  );

  it('honeypot preenchido → ok:true com honeypotFilled', () => {
    const result = validateLeadInput({ ...valid, website: 'http://spam.example' });
    expect(result).toMatchObject({ ok: true, honeypotFilled: true });
  });

  it('atribuição ausente (storage bloqueado) não impede o lead', () => {
    const result = validateLeadInput({ ...valid, attribution: undefined });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.attribution.landingPage).toBe('');
  });

  it('atribuição descarta chaves desconhecidas e limita tamanho', () => {
    const result = validateLeadInput({
      ...valid,
      attribution: { ...valid.attribution, cpf: '123', utm_campaign: 'x'.repeat(600) },
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.attribution).not.toHaveProperty('cpf');
      expect(result.data.attribution.utm_campaign?.length).toBe(500);
    }
  });
});
