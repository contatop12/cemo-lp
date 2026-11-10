// Enquadra os retratos recortados (scripts/portraits/cutout.py) em 4:5 e exporta WebP com transparência.
// Enquadramento medido na máscara: largura da cabeça ≈ 32% do quadro, topo da cabeça a ~7% e rosto centrado;
// quando a foto de origem é mais fechada (Adriana), usa a altura toda disponível.
// Só recorte e redimensionamento: nenhum ajuste no rosto ou no corpo (briefing §41).
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const SRC = join(root, '_materiais/fotos/recortes');
const OUT = join(root, 'public/images/medicos');
mkdirSync(OUT, { recursive: true });

// [arquivo de origem, slug do médico, left, top, width, área com restos do fundo (opcional)] — altura = width × 1,25.
const FRAMES = [
  ['dr-david', 'david-ribeiro-de-mendonca-filho', 136, 43, 553],
  ['dr.adriano-de-morais', 'adriano-de-morais-ferreira', 47, 0, 453],
  ['dra.adriana-bizzarri', 'adriana-bizzarri', 8, 0, 480],
  ['dra.priscilla-pires', 'priscilla-pires', 30, 0, 444],
  ['dra.roberta-andrade', 'roberta-andrade-e-nascimento', 40, 0, 406],
  // Foto enviada pela CEMO em 30/10/2026 (853×1280): quadro máximo centrado no rosto, cabeça ≈ 37% (Dr. David: 36%).
  ['dr.igor-seidi-sekiguchi', 'igor-seidi-sekiguchi', 195, 41, 658],
  // Foto enviada pela CEMO em 04/11/2026 (1086×1448, no consultório): cabeça ≈ 37%; a cadeira preta atrás dele deixou
  // restos no contorno do cabelo.
  ['dr.jose-pereira-do-rego-neto', 'jose-pereira-do-rego-neto', 100, 166, 984, { x0: 455, y0: 235, x1: 620, y1: 305 }],
];
const MAX_W = 640;

// Restos do fundo colados ao contorno: apaga, só no canal alfa, o que é escuro e neutro ou quase transparente e está
// ligado à área transparente; depois suaviza a borda nova. Os pixels da pessoa não mudam (briefing §41).
async function removeBackgroundRemnants(path, { x0, y0, x1, y1 }) {
  const { data, info } = await sharp(path).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width;
  const at = (x, y) => (y * W + x) * 4;
  const isRemnant = (i) => {
    const [r, g, b, a] = data.subarray(i, i + 4);
    return a < 170 || ((r + g + b) / 3 < 75 && Math.max(r, g, b) - Math.min(r, g, b) < 24);
  };
  const removed = [];
  const seen = new Set();
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      if (data[at(x, y) + 3] < 16) {
        seen.add(y * W + x);
        removed.push([x, y]);
      }
    }
  }
  for (let n = 0; n < removed.length; n++) {
    const [x, y] = removed[n];
    for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
      if (nx < x0 || nx > x1 || ny < y0 || ny > y1 || seen.has(ny * W + nx) || !isRemnant(at(nx, ny))) continue;
      seen.add(ny * W + nx);
      removed.push([nx, ny]);
    }
  }
  for (const [x, y] of removed) data[at(x, y) + 3] = 0;

  const alpha = Uint8Array.from({ length: W * info.height }, (_, k) => data[k * 4 + 3]);
  const band = new Set();
  for (const [x, y] of removed) {
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) band.add((y + dy) * W + x + dx);
  }
  for (const k of band) {
    if (alpha[k] === 0) continue;
    let sum = 0;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) sum += alpha[k + dy * W + dx];
    data[k * 4 + 3] = Math.min(alpha[k], Math.round(sum / 25));
  }
  console.log(`  restos do fundo: ${removed.length} px apagados`);
  return sharp(data, { raw: { width: W, height: info.height, channels: 4 } }).png().toBuffer();
}

for (const [file, slug, left, top, width, remnants] of FRAMES) {
  const height = Math.round(width * 1.25);
  const outW = Math.min(width, MAX_W);
  const source = join(SRC, `${file}.png`);
  const info = await sharp(remnants ? await removeBackgroundRemnants(source, remnants) : source)
    .extract({ left, top, width, height })
    .resize(outW, Math.round(outW * 1.25))
    .webp({ quality: 86, alphaQuality: 90, effort: 6 })
    .toFile(join(OUT, `${slug}.webp`));
  console.log(slug, `${info.width}x${info.height}`, `${(info.size / 1024).toFixed(0)} KB`);
}

// Hero: Dr. David de corpo inteiro (o recorte do hero é feito em CSS, não aqui).
const hero = await sharp(join(SRC, 'dr-david.png'))
  .webp({ quality: 86, alphaQuality: 92, effort: 6 })
  .toFile(join(root, 'public/images/dr-david-recorte.webp'));
console.log('dr-david-recorte', `${hero.width}x${hero.height}`, `${(hero.size / 1024).toFixed(0)} KB`);
