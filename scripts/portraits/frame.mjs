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

// [arquivo de origem, slug do médico, left, top, width] — altura = width × 1,25.
const FRAMES = [
  ['dr-david', 'david-ribeiro-de-mendonca-filho', 136, 43, 553],
  ['dr.adriano-de-morais', 'adriano-de-morais-ferreira', 47, 0, 453],
  ['dra-cintia-gomes-novo', 'cintia-gomes-galvao', 54, 0, 341],
  ['dra.adriana-bizzarri', 'adriana-bizzarri', 8, 0, 480],
  ['dra.bruna-andrade', 'bruna-de-andrade-nascimento', 73, 0, 350],
  ['dra.priscilla-pires', 'priscilla-pires', 30, 0, 444],
  ['dra.roberta-andrade', 'roberta-andrade-e-nascimento', 40, 0, 406],
  ['rodrigo-arantes-2024', 'rodrigo-arantes', 433, 336, 647],
];
const MAX_W = 640;

for (const [file, slug, left, top, width] of FRAMES) {
  const height = Math.round(width * 1.25);
  const outW = Math.min(width, MAX_W);
  const info = await sharp(join(SRC, `${file}.png`))
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
