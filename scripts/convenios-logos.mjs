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

// Blue Saúde: só existe publicada a versão branca sobre azul (ícone 512×512, "cropped-bluesaude_logo.jpeg");
// recorta o fundo azul em volta da palavra (x 82–429, y 194–311 + margem) e arredonda os cantos, como o selo
// da Unimed Seguros. Marca sem nenhuma alteração.
{
  const [w, h] = [419, 177];
  const corner = Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="18" ry="18"/></svg>`);
  const rounded = await sharp(`${SRC}/logo-blue-saude.jpeg`)
    .extract({ left: 46, top: 164, width: w, height: h })
    .composite([{ input: corner, blend: 'dest-in' }])
    .png()
    .toBuffer();
  const info = await sharp(rounded).flatten({ background: '#ffffff' }).webp({ quality: 90 }).toFile(`${OUT}/blue.webp`);
  console.log(`blue: ${info.width}×${info.height} ${info.size} B`);
}
