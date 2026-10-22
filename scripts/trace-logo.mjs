// Vetoriza o logo PNG (não redesenha): recorta a margem transparente, amplia 4×, separa cada pixel opaco
// pela cor de marca mais próxima e traça cada máscara com potrace. Saída: logo colorido + versão branca.
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import potrace from 'potrace';
import sharp from 'sharp';

const root = process.cwd();
const INPUT = join(root, 'public/brand/logo-cemo.png');
const OUT = join(root, 'public/brand/logo-cemo.svg');
const OUT_WHITE = join(root, 'public/brand/logo-cemo-white.svg');
const PAD = 8;
const SCALE = 4;

const BRAND = [
  { hex: '#0066B1', rgb: [0x00, 0x66, 0xb1] },
  { hex: '#9EC227', rgb: [0x9e, 0xc2, 0x27] },
  { hex: '#27A1CF', rgb: [0x27, 0xa1, 0xcf] },
];

const trimmed = await sharp(INPUT)
  .trim()
  .extend({ top: PAD, bottom: PAD, left: PAD, right: PAD, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();
const { width, height } = await sharp(trimmed).metadata();

const { data, info } = await sharp(trimmed)
  .resize(width * SCALE, height * SCALE, { kernel: 'lanczos3' })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

// Uma máscara por cor: preto = forma, branco = fundo (formato que o potrace espera).
const masks = BRAND.map(() => Buffer.alloc(info.width * info.height, 255));
for (let p = 0; p < info.width * info.height; p++) {
  const o = p * 4;
  if (data[o + 3] < 128) continue;
  let best = 0;
  let bestDist = Infinity;
  BRAND.forEach((c, i) => {
    const d = (data[o] - c.rgb[0]) ** 2 + (data[o + 1] - c.rgb[1]) ** 2 + (data[o + 2] - c.rgb[2]) ** 2;
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  });
  masks[best][p] = 0;
}

function trace(maskRaw) {
  return new Promise(async (resolve, reject) => {
    const png = await sharp(maskRaw, { raw: { width: info.width, height: info.height, channels: 1 } }).png().toBuffer();
    const tracer = new potrace.Potrace();
    tracer.setParameters({ turdSize: 4, optTolerance: 0.4, threshold: 128, blackOnWhite: true });
    tracer.loadImage(png, (err) => {
      if (err) return reject(err);
      const match = tracer.getPathTag('#000').match(/\sd="([^"]+)"/);
      // 1 casa decimal na escala 4× = 0,025 px no tamanho final: imperceptível e reduz o arquivo.
      resolve(match ? match[1].replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n) * 10) / 10)) : '');
    });
  });
}

const paths = [];
for (let i = 0; i < BRAND.length; i++) {
  const d = await trace(masks[i]);
  if (d) paths.push({ fill: BRAND[i].hex, d });
}

function buildSvg(fillFor) {
  const body = paths
    .map((p) => `<path fill="${fillFor(p.fill)}" fill-rule="evenodd" d="${p.d}"/>`)
    .join('');
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="CEMO – Centro de Microcirurgia Ocular">` +
    `<g transform="scale(${1 / SCALE})">${body}</g></svg>\n`
  );
}

writeFileSync(OUT, buildSvg((fill) => fill));
writeFileSync(OUT_WHITE, buildSvg(() => '#FFFFFF'));
console.log(`ok: ${width}x${height}, ${paths.length} paths`);
