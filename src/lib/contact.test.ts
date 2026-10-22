// @vitest-environment node
import { siteSettings } from '@/content/fixtures/site-settings';
import {
  directionsHref,
  formatAddress,
  formatHoursLines,
  mapsEmbedSrc,
  reviewsHref,
  telHref,
  whatsappHref,
} from './contact';

const DEFAULT_MESSAGE = 'Olá! Gostaria de agendar uma consulta no CEMO.';

describe('contact helpers', () => {
  it('whatsappHref usa a mensagem genérica padrão', () => {
    expect(whatsappHref(siteSettings)).toBe(
      'https://wa.me/5511947016162?text=' + encodeURIComponent(DEFAULT_MESSAGE),
    );
  });

  it('a mensagem padrão não carrega informação de saúde', () => {
    expect(DEFAULT_MESSAGE).not.toMatch(/catarata|glaucoma|cirurgia|diagn/i);
    expect(decodeURIComponent(whatsappHref(siteSettings))).not.toMatch(/catarata|glaucoma|cirurgia|diagn/i);
  });

  it('whatsappHref aceita mensagem própria codificada', () => {
    expect(whatsappHref(siteSettings, 'Olá & tudo bem?')).toBe(
      'https://wa.me/5511947016162?text=' + encodeURIComponent('Olá & tudo bem?'),
    );
  });

  it('telHref usa E.164', () => {
    expect(telHref(siteSettings)).toBe('tel:+551147883536');
  });

  it('directionsHref codifica o endereço', () => {
    const href = directionsHref(siteSettings);
    expect(href.startsWith('https://www.google.com/maps/dir/?api=1&destination=')).toBe(true);
    expect(href).toContain('Rua%20Levi%20de%20Souza%20e%20Silva');
  });

  it('mapsEmbedSrc gera embed sem chave de API', () => {
    expect(mapsEmbedSrc(siteSettings)).toMatch(/^https:\/\/www\.google\.com\/maps\?q=.+&output=embed$/);
  });

  it('reviewsHref cai para busca no Maps quando não há URL do perfil', () => {
    const href = reviewsHref({ ...siteSettings, googleBusiness: { profileUrl: null, reviewsUrl: null } });
    expect(href.startsWith('https://www.google.com/maps/search/?api=1&query=')).toBe(true);
    expect(href).toContain('Tabo%C3%A3o%20da%20Serra');
  });

  it('reviewsHref usa a URL de avaliações quando existe', () => {
    const href = reviewsHref({
      ...siteSettings,
      googleBusiness: { profileUrl: null, reviewsUrl: 'https://g.page/r/exemplo/review' },
    });
    expect(href).toBe('https://g.page/r/exemplo/review');
  });

  it('formatAddress e formatHoursLines', () => {
    expect(formatAddress(siteSettings)).toContain('Taboão da Serra/SP');
    expect(formatHoursLines(siteSettings)).toEqual([
      'Segunda a quinta: 08:00 às 18:00',
      'Sexta: 08:00 às 17:00',
      'Sábado: 08:00 às 12:00',
    ]);
  });
});
