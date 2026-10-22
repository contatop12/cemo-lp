// @vitest-environment node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

// O PNG publicado é a cópia otimizada (paleta) do original de _materiais/marca.
const ORIGINAL = join(process.cwd(), 'public/brand/logo-cemo.png');
const SVG = join(process.cwd(), 'public/brand/logo-cemo.svg');
const SVG_WHITE = join(process.cwd(), 'public/brand/logo-cemo-white.svg');
const SVG_H = join(process.cwd(), 'public/brand/logo-cemo-horizontal.svg');
const SVG_H_WHITE = join(process.cwd(), 'public/brand/logo-cemo-horizontal-white.svg');
const PAD = 8;

// Mesma referência de scripts/logo/measure.py: recorte nos pixels com alfa > 8 + 8 px de folga.
async function referenceAlpha() {
  const { data: full, info } = await sharp(ORIGINAL).ensureAlpha().extractChannel(3).raw().toBuffer({ resolveWithObject: true });
  let x0 = info.width, y0 = info.height, x1 = 0, y1 = 0;
  for (let y = 0; y < info.height; y++)
    for (let x = 0; x < info.width; x++)
      if ((full[y * info.width + x] ?? 0) > 8) {
        x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
      }
  const width = x1 - x0 + 1 + PAD * 2;
  const height = y1 - y0 + 1 + PAD * 2;
  const data = Buffer.alloc(width * height);
  for (let y = y0; y <= y1; y++)
    for (let x = x0; x <= x1; x++) data[(y - y0 + PAD) * width + (x - x0 + PAD)] = full[y * info.width + x] ?? 0;
  return { data, width, height };
}

async function svgAlpha(width: number, height: number) {
  const { data } = await sharp(readFileSync(SVG), { density: 300 })
    .resize(width, height, { fit: 'fill' })
    .ensureAlpha()
    .extractChannel(3)
    .raw()
    .toBuffer({ resolveWithObject: true });
  return data;
}

describe('logo reconstruído (QA contra o PNG original)', () => {
  it('silhueta coincide com o original (IoU ≥ 0.97)', async () => {
    const ref = await referenceAlpha();
    const traced = await svgAlpha(ref.width, ref.height);
    let inter = 0;
    let union = 0;
    for (let i = 0; i < ref.data.length; i++) {
      const a = (ref.data[i] ?? 0) >= 128;
      const b = (traced[i] ?? 0) >= 128;
      if (a && b) inter++;
      if (a || b) union++;
    }
    expect(inter / union).toBeGreaterThanOrEqual(0.97);
  });

  it('usa só as três cores da marca e nenhuma imagem embutida', () => {
    const svg = readFileSync(SVG, 'utf8');
    const fills = new Set([...svg.matchAll(/fill="(#[0-9A-Fa-f]{6})"/g)].map((m) => m[1]?.toUpperCase()));
    expect([...fills].sort()).toEqual(['#0066B1', '#27A1CF', '#9EC227']);
    expect(svg).not.toContain('<image');
  });

  it('variantes brancas usam só #FFFFFF', () => {
    for (const file of [SVG_WHITE, SVG_H_WHITE]) {
      const svg = readFileSync(file, 'utf8');
      const fills = new Set([...svg.matchAll(/fill="(#[0-9A-Fa-f]{6})"/g)].map((m) => m[1]?.toUpperCase()));
      expect([...fills]).toEqual(['#FFFFFF']);
    }
  });

  it('versão horizontal usa as mesmas três cores e todos os arquivos ficam abaixo de 40 KB', () => {
    const svg = readFileSync(SVG_H, 'utf8');
    const fills = new Set([...svg.matchAll(/fill="(#[0-9A-Fa-f]{6})"/g)].map((m) => m[1]?.toUpperCase()));
    expect([...fills].sort()).toEqual(['#0066B1', '#27A1CF', '#9EC227']);
    for (const file of [SVG, SVG_WHITE, SVG_H, SVG_H_WHITE]) expect(readFileSync(file).length).toBeLessThan(40 * 1024);
  });
});
