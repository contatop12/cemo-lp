// Gera os derivados web a partir dos originais em _materiais/ (fora do git). Idempotente.
// Regras: rosto/corpo do médico nunca alterados (só cópia ou corte puro); sem upscaling; sem EXIF.
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const src = (...p) => join(root, '_materiais', ...p);
const out = (...p) => join(root, 'public', ...p);

mkdirSync(out('images', 'equipamentos'), { recursive: true });
mkdirSync(out('brand'), { recursive: true });

// Dr. David — cópia byte a byte (o arquivo já está muito comprimido; recomprimir só pioraria).
const david = src('fotos', 'dr-david.jpeg');
if (!existsSync(david)) throw new Error(`Original ausente: ${david}`);
copyFileSync(david, out('images', 'dr-david.jpg'));

// Recorte mobile 4:5 por corte puro (cabeça, ombros e tronco), sem redimensionar.
await sharp(david)
  .extract({ left: 62, top: 0, width: 728, height: 910 })
  .jpeg({ mozjpeg: true, quality: 92 })
  .toFile(out('images', 'dr-david-mobile.jpg'));

// Equipamentos — corrige orientação, limita o lado maior a 1600 px sem ampliar, remove metadados.
const equipDir = src('fotos', 'equipamentos');
const equipFiles = readdirSync(equipDir).filter((f) => /^equip-\d{2}\.jpe?g$/i.test(f)).sort();
for (const file of equipFiles) {
  await sharp(join(equipDir, file))
    .rotate()
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .jpeg({ mozjpeg: true, quality: 85 })
    .toFile(out('images', 'equipamentos', file.replace(/\.jpe?g$/i, '.jpg')));
}

// Logo PNG otimizado (fallback até existir o SVG).
const logo = src('marca', 'Logo CEMO - Transparente.png');
await sharp(logo).png({ palette: true, quality: 90, effort: 10 }).toFile(out('brand', 'logo-cemo.png'));

// Imagem Open Graph: logo centralizado sobre branco, 1200×630.
const logoForOg = await sharp(logo).resize({ width: 520, height: 416, fit: 'inside' }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#FFFFFF' } })
  .composite([{ input: logoForOg, gravity: 'center' }])
  .png({ compressionLevel: 9 })
  .toFile(out('images', 'og-home.png'));

console.log(`ok: dr-david, dr-david-mobile, ${equipFiles.length} equipamentos, logo, og-home`);
