// @vitest-environment node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const ORIGINAL = join(process.cwd(), 'public/brand/logo-cemo.png');
const SVG = join(process.cwd(), 'public/brand/logo-cemo.svg');
const SVG_WHITE = join(process.cwd(), 'public/brand/logo-cemo-white.svg');
const PAD = 8;

// Mesma referência usada pelo script: logo sem a margem transparente + 8px de folga.
async function referenceAlpha() {
  const trimmed = await sharp(ORIGINAL)
    .trim()
    .extend({ top: PAD, bottom: PAD, left: PAD, right: PAD, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const { data, info } = await sharp(trimmed).ensureAlpha().extractChannel(3).raw().toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
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

describe('logo vetorizado (QA contra o PNG original)', () => {
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

  it('variante branca usa só #FFFFFF', () => {
    const svg = readFileSync(SVG_WHITE, 'utf8');
    const fills = new Set([...svg.matchAll(/fill="(#[0-9A-Fa-f]{6})"/g)].map((m) => m[1]?.toUpperCase()));
    expect([...fills]).toEqual(['#FFFFFF']);
  });
});
