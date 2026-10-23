// Logos dos convênios: JPGs 200×200 do site atual (/wp-content/uploads/2020/08/logo-*.jpg, baixados em
// _materiais/convenios/) → recorte da margem branca → WebP em public/images/convenios/<id>.webp.
// Uso: node scripts/convenios-logos.mjs  (imprime as dimensões para o fixture)
import { mkdirSync } from 'node:fs';
import sharp from 'sharp';

const SRC = '_materiais/convenios';
const OUT = 'public/images/convenios';

// arquivo do site atual → id do fixture
const files = {
  amil: 'amil',
  allianz: 'allianz',
  'bradesco-saude': 'bradesco-saude',
  'saude-caixa': 'saude-caixa',
  cassi: 'cassi',
  'unimed-central': 'central-nacional-unimed',
  economus: 'economus',
  'gama-saude': 'gama-saude',
  mediservice: 'mediservice',
  'notredame-intermedica': 'notredame-intermedica',
  'porto-seguro': 'porto-seguro',
  'saude-itau': 'saude-itau',
  postalsaude: 'postal-saude',
  'unimed-seguros': 'unimed-seguros',
  vivest: 'vivest',
};

mkdirSync(OUT, { recursive: true });
for (const [file, id] of Object.entries(files)) {
  const trimmed = await sharp(`${SRC}/logo-${file}.jpg`).trim({ background: '#ffffff', threshold: 24 }).toBuffer();
  const info = await sharp(trimmed)
    .extend({ top: 4, bottom: 4, left: 4, right: 4, background: '#ffffff' })
    .webp({ quality: 90 })
    .toFile(`${OUT}/${id}.webp`);
  console.log(`${id}: ${info.width}×${info.height} ${info.size} B`);
}
