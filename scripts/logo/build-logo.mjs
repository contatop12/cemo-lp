// Monta o logo SVG em alta a partir das medições de scripts/logo/measure.py (rode o .py antes).
//
// Partes geométricas (exatas, medidas no original): linhas da mira e ponto central.
// Partes orgânicas (pálpebras, arcos da íris, arcos curtos afilados, "CEMO", subtítulo): traço potrace sobre a
// máscara de cobertura ampliada 4× e suavizada — a borda segue a cobertura antisserrilhada do PNG, sem o serrilhado do pixel.
//
// Saídas em public/brand/: logo-cemo.svg (vertical, cores), logo-cemo-white.svg, logo-cemo-horizontal.svg,
// logo-cemo-horizontal-white.svg e logo-cemo-symbol.svg (só o olho).
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import potrace from 'potrace';
import sharp from 'sharp';

const root = process.cwd();
const BUILD = join(root, 'scripts/logo/build');
const OUT = join(root, 'public/brand');
const UP = 4;
const g = JSON.parse(readFileSync(join(BUILD, 'geometry.json'), 'utf8'));

const COLORS = { blue: '#0066B1', green: '#9EC227', cyan: '#27A1CF' };
const LABEL = 'CEMO – Centro de Microcirurgia Ocular';

const fmt = (n) => String(Math.round(n * 100) / 100);

async function traceMask(file, blur) {
  const png = await sharp(join(BUILD, file))
    .resize(g.width * UP, g.height * UP, { kernel: 'lanczos3' })
    .blur(blur)
    .threshold(128)
    .png()
    .toBuffer();
  return new Promise((resolve, reject) => {
    const t = new potrace.Potrace();
    t.setParameters({ turdSize: 20, alphaMax: 1.1, optCurve: true, optTolerance: 0.6, threshold: 128, blackOnWhite: true });
    t.loadImage(png, (err) => {
      if (err) return reject(err);
      const d = t.getPathTag('#000').match(/\sd="([^"]+)"/)?.[1] ?? '';
      // Volta para a escala 1× já no dado (sem transform), 2 casas decimais.
      resolve(
        d
          .replace(/-?\d+(?:\.\d+)?/g, (n) => fmt(Number(n) / UP))
          .replace(/\s*([MCLZ])\s*/g, '$1')
          .replace(/,\s*/g, ' ')
          .replace(/ -/g, '-'),
      );
    });
  });
}

function geometricSymbol(fill) {
  const c = g.crosshair;
  const v = `<rect x="${fmt(c.cx - c.vWidth / 2)}" y="${fmt(c.vTop)}" width="${fmt(c.vWidth)}" height="${fmt(c.vBottom - c.vTop)}"/>`;
  const h = `<rect x="${fmt(c.hLeft)}" y="${fmt(c.cy - c.hWidth / 2)}" width="${fmt(c.hRight - c.hLeft)}" height="${fmt(c.hWidth)}"/>`;
  const dot = `<circle cx="${fmt(c.cx)}" cy="${fmt(c.cy)}" r="${fmt(g.dot.r)}"/>`;
  return `<g fill="${fill}">${v}${h}${dot}</g>`;
}

const traced = {
  green: await traceMask('mask-green.png', 2.5),
  blue: await traceMask('mask-blue.png', 4.5),
  cyan: await traceMask('mask-cyan.png', 1.2),
};

function parts(palette) {
  return {
    symbol: `<path fill="${palette.green}" fill-rule="evenodd" d="${traced.green}"/>${geometricSymbol(palette.green)}`,
    word: `<path fill="${palette.blue}" fill-rule="evenodd" d="${traced.blue}"/>`,
    sub: `<path fill="${palette.cyan}" fill-rule="evenodd" d="${traced.cyan}"/>`,
  };
}

// Caixas (no sistema do logo vertical) de cada bloco, para montar a versão horizontal.
async function bbox(file) {
  const { data, info } = await sharp(join(BUILD, file)).raw().toBuffer({ resolveWithObject: true });
  let x0 = Infinity, y0 = Infinity, x1 = -1, y1 = -1;
  for (let y = 0; y < info.height; y++)
    for (let x = 0; x < info.width; x++)
      if (data[(y * info.width + x) * info.channels] < 128) {
        x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
      }
  return { x0, y0, x1: x1 + 1, y1: y1 + 1 };
}
const box = { symbol: await bbox('mask-green.png'), word: await bbox('mask-blue.png'), sub: await bbox('mask-cyan.png') };
box.symbol.y0 = Math.min(box.symbol.y0, g.crosshair.vTop);
box.symbol.y1 = Math.max(box.symbol.y1, g.crosshair.vBottom);

function svg(viewBox, body, title = LABEL) {
  const [, , w, h] = viewBox.split(' ');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${w}" height="${h}" role="img" aria-label="${title}">${body}</svg>\n`;
}

function vertical(palette) {
  const p = parts(palette);
  return svg(`0 0 ${g.width} ${g.height}`, p.symbol + p.word + p.sub);
}

// Horizontal: olho à esquerda na altura do bloco de texto; texto alinhado à esquerda.
function horizontal(palette) {
  const p = parts(palette);
  const pad = 8;
  const textH = box.sub.y1 - box.word.y0; // do topo do CEMO à base do subtítulo
  const s = (textH * 1.05) / (box.symbol.y1 - box.symbol.y0);
  const symW = (box.symbol.x1 - box.symbol.x0) * s;
  const gap = textH * 0.28;
  const textX = pad + symW + gap;
  const width = textX + (box.sub.x1 - box.word.x0 > box.word.x1 - box.word.x0 ? box.sub.x1 - box.sub.x0 : box.word.x1 - box.word.x0) + pad;
  const height = textH * 1.05 + pad * 2;
  const symT = `translate(${fmt(pad - box.symbol.x0 * s)} ${fmt(pad - box.symbol.y0 * s)}) scale(${fmt(s)})`;
  const textTop = pad + (textH * 1.05 - textH) / 2;
  const wordT = `translate(${fmt(textX - box.word.x0)} ${fmt(textTop - box.word.y0)})`;
  const subT = `translate(${fmt(textX - box.sub.x0)} ${fmt(textTop - box.word.y0)})`;
  return svg(
    `0 0 ${fmt(width)} ${fmt(height)}`,
    `<g transform="${symT}">${p.symbol}</g><g transform="${wordT}">${p.word}</g><g transform="${subT}">${p.sub}</g>`,
  );
}

function symbolOnly(palette) {
  const p = parts(palette);
  const pad = 4;
  const vb = `${box.symbol.x0 - pad} ${fmt(box.symbol.y0 - pad)} ${box.symbol.x1 - box.symbol.x0 + pad * 2} ${fmt(box.symbol.y1 - box.symbol.y0 + pad * 2)}`;
  return svg(vb, p.symbol, 'CEMO');
}

const white = { blue: '#FFFFFF', green: '#FFFFFF', cyan: '#FFFFFF' };
const outputs = {
  'logo-cemo.svg': vertical(COLORS),
  'logo-cemo-white.svg': vertical(white),
  'logo-cemo-horizontal.svg': horizontal(COLORS),
  'logo-cemo-horizontal-white.svg': horizontal(white),
  'logo-cemo-symbol.svg': symbolOnly(COLORS),
};
for (const [file, content] of Object.entries(outputs)) {
  writeFileSync(join(OUT, file), content);
  console.log(file, `${(content.length / 1024).toFixed(1)} KB`);
}
