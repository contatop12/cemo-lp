// @vitest-environment node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const css = readFileSync(join(process.cwd(), 'src/app/globals.css'), 'utf8');

function luminance(hex: string): number {
  const n = hex.replace('#', '');
  const channels = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

function token(name: string): string {
  const match = css.match(new RegExp(`--color-${name}:\\s*(#[0-9A-Fa-f]{6})`));
  if (!match?.[1]) throw new Error(`token --color-${name} ausente`);
  return match[1];
}

describe('globals.css — tokens do design system', () => {
  it('importa o Tailwind', () => {
    expect(css).toContain('@import "tailwindcss"');
  });

  it.each([
    ['--color-azul-cemo', '#0066B1'],
    ['--color-azul-700', '#004F8C'],
    ['--color-azul-profundo', '#072A4A'],
    ['--color-tinta', '#0F2236'],
    ['--color-tinta-suave', '#3D4F63'],
    ['--color-papel', '#FFFFFF'],
    ['--color-nevoa', '#F2F6FA'],
    ['--color-nevoa-2', '#E6EEF5'],
    ['--color-estudio', '#C7C8C5'],
    ['--color-verde-cemo', '#9EC227'],
    ['--color-verde-texto', '#4A6A00'],
    ['--color-ciano-cemo', '#27A1CF'],
    ['--color-whatsapp', '#0B6B3A'],
    ['--color-erro', '#B3261E'],
    ['--color-sucesso', '#1B6E3A'],
  ])('define %s: %s', (name, hex) => {
    expect(css).toContain(`${name}: ${hex};`);
  });

  it('respeita prefers-reduced-motion e define o breakpoint de 390px', () => {
    expect(css).toContain('prefers-reduced-motion');
    expect(css).toContain('--breakpoint-xs: 24.375rem');
  });
});

describe('contraste WCAG dos pares aprovados', () => {
  it('corpo tinta/papel ≥ 16', () => {
    expect(contrast(token('tinta'), token('papel'))).toBeGreaterThanOrEqual(16);
  });
  it('botão primário papel/azul-cemo ≥ 5.9', () => {
    expect(contrast(token('papel'), token('azul-cemo'))).toBeGreaterThanOrEqual(5.9);
  });
  it('botão WhatsApp papel/whatsapp ≥ 6.5', () => {
    expect(contrast(token('papel'), token('whatsapp'))).toBeGreaterThanOrEqual(6.5);
  });
  it('verde-texto/papel ≥ 6', () => {
    expect(contrast(token('verde-texto'), token('papel'))).toBeGreaterThanOrEqual(6);
  });
  it('guarda: verde-cemo nunca serve como texto sobre papel (< 3)', () => {
    expect(contrast(token('verde-cemo'), token('papel'))).toBeLessThan(3);
  });
});
