// Migra os posts do WordPress (export da API REST em _materiais/wp-export/) para src/content/posts/.
//
// Só entram os posts KEEP/UPDATE do mapa de migração (docs/seo-migration-map.csv); CONSOLIDATE vira 301 e os seis
// exames que moram em slug de artigo são renderizados pelo template de exame. Preserva slug, título, datas e texto.
//
// Limpeza: remove shortcodes do Divi (o módulo de imagem vira <img>; a caixa de autor do fim sai), sanitiza com lista
// branca de tags/atributos, reescreve links internos para o destino FINAL (mapa de redirects, sem cadeia; 410 vira
// texto), descarta botões de WhatsApp embutidos e baixa as imagens para public/wp-content/uploads/ com o MESMO caminho
// (preserva URLs de imagem já indexadas), recomprimidas.
//
// Uso: node scripts/migrate-wp.mjs [--no-images]
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { parse } from 'csv-parse/sync';
import { JSDOM } from 'jsdom';
import sharp from 'sharp';
import { redirectTables } from '../src/lib/redirects/generated.ts';
import { classifyHref } from './wp/links.mjs';

const ROOT = process.cwd();
const EXPORT = join(ROOT, '_materiais/wp-export');
const OUT = join(ROOT, 'src/content/posts');
const PUBLIC = join(ROOT, 'public');
const SITE = 'https://oftalmologiacemo.com.br';
const SKIP_IMAGES = process.argv.includes('--no-images');

const posts = [1, 2].flatMap((p) => JSON.parse(readFileSync(join(EXPORT, `posts-${p}.json`), 'utf8')));
const media = [1, 2, 3, 4].flatMap((p) => JSON.parse(readFileSync(join(EXPORT, `media-${p}.json`), 'utf8')));
const categories = Object.fromEntries(JSON.parse(readFileSync(join(EXPORT, 'categories.json'), 'utf8')).map((c) => [c.id, c]));
const map = parse(readFileSync(join(ROOT, 'docs/seo-migration-map.csv')), { columns: true });
const rowBySlug = Object.fromEntries(
  map.filter((r) => /^https:\/\/oftalmologiacemo\.com\.br\/[a-z0-9-]+\/$/.test(r.current_url)).map((r) => [r.current_url.split('/')[3], r]),
);

// ---------- entidade comercial de cada post (link contextual + CTA do fim) ----------
const ENTITY_BY_PATH = {
  '/': ['home', 'home'],
  '/consulta-oftalmologica/': ['specialty', 'consulta'],
  '/especialidades/catarata/': ['specialty', 'catarata'],
  '/especialidades/refrativa/': ['specialty', 'refrativa'],
  '/especialidades/glaucoma/': ['specialty', 'glaucoma'],
  '/especialidades/retina/': ['specialty', 'retina'],
  '/especialidades/cornea/': ['specialty', 'cornea'],
  '/especialidades/oftalmopediatria/': ['specialty', 'oftalmopediatria'],
  '/especialidades/estrabismo/': ['specialty', 'estrabismo'],
  '/especialidades/plastica-ocular/': ['specialty', 'plastica-ocular'],
  '/especialidades/lentes-de-contato/': ['specialty', 'lentes-de-contato'],
  '/tratamentos/crosslinking-corneano/': ['condition', 'ceratocone'],
  '/tratamentos/anel-intraestromal/': ['condition', 'ceratocone'],
  '/tratamentos/transplante-de-cornea/': ['specialty', 'cornea'],
  '/exames/mapeamento/': ['exam', 'mapeamento-de-retina'],
  '/exames/tonometria/': ['exam', 'tonometria'],
  '/exames/paquimetria/': ['exam', 'paquimetria'],
  '/exames/gonioscopia/': ['exam', 'gonioscopia'],
  '/exames/biometria/': ['exam', 'biometria'],
  '/exame-de-campo-visual-o-que-e-para-que-serve-e-como-e-feito/': ['exam', 'campo-visual'],
  '/o-que-voce-precisa-saber-sobre-retinografia/': ['exam', 'retinografia'],
  '/ceratoscopia-para-que-serve-o-exame/': ['exam', 'ceratoscopia'],
  '/o-que-e-exame-de-microscopia/': ['exam', 'microscopia-especular'],
  '/exame-de-ctd-curva-tensional-diaria-tudo-sobre/': ['exam', 'curva-tensional-diaria'],
  '/tudo-o-que-voce-precisa-saber-sobre-estereofoto-de-papila/': ['exam', 'estereofoto-de-papila'],
};
for (const c of ['ceratocone', 'miopia', 'hipermetropia', 'astigmatismo', 'baixa-visao', 'conjuntivite', 'degeneracao-macular', 'descolamento-de-retina'])
  ENTITY_BY_PATH[`/condicoes-oculares/${c}/`] = ['condition', c];
const ENTITY_BY_CATEGORY = {
  catarata: ['specialty', 'catarata'],
  refrativa: ['specialty', 'refrativa'],
  glaucoma: ['specialty', 'glaucoma'],
  'ctd-curva-tensional-diaria': ['exam', 'curva-tensional-diaria'],
  'campo-visual': ['exam', 'campo-visual'],
  retina: ['specialty', 'retina'],
  'degeneracao-macular': ['condition', 'degeneracao-macular'],
  ceratocone: ['condition', 'ceratocone'],
  crosslinking: ['condition', 'ceratocone'],
  cornea: ['specialty', 'cornea'],
  'microscopia-ocular': ['exam', 'microscopia-especular'],
  paquimetria: ['exam', 'paquimetria'],
  'plastica-ocular': ['specialty', 'plastica-ocular'],
  palpebras: ['specialty', 'plastica-ocular'],
  'lentes-de-contato': ['specialty', 'lentes-de-contato'],
  miopia: ['condition', 'miopia'],
  astigmatismo: ['condition', 'astigmatismo'],
  hipermetropia: ['condition', 'hipermetropia'],
  conjuntivite: ['condition', 'conjuntivite'],
  'baixa-visao': ['condition', 'baixa-visao'],
};

function entityFor(post, row) {
  // 1) O mapa de migração já diz para onde o post deve linkar ("linkar para /x/").
  for (const m of (row?.notes ?? '').matchAll(/\/[a-z0-9/-]*\//g)) {
    const e = ENTITY_BY_PATH[m[0]];
    if (e) return { kind: e[0], id: e[1] };
  }
  if (post.slug.includes('taboao')) return { kind: 'home', id: 'home' };
  // 2) Categoria mais específica.
  for (const id of post.categories) {
    const e = ENTITY_BY_CATEGORY[categories[id]?.slug];
    if (e) return { kind: e[0], id: e[1] };
  }
  return { kind: 'specialty', id: 'consulta' };
}

// ---------- links internos ----------
const gone = new Set(redirectTables.gone);
// Links já quebrados no site atual, com destino óbvio.
const LINK_FIXES = { '/riscos-luz-azul-das-telas/': '/quais-os-riscos-da-luz-azul-das-telas/' };
const linkTables = { redirects: redirectTables.redirects, gone, fixes: LINK_FIXES };

// ---------- imagens ----------
const imageCache = new Map();
async function localImage(src) {
  const url = new URL(src, SITE);
  if (!url.pathname.startsWith('/wp-content/uploads/')) return null;
  const path = decodeURIComponent(url.pathname);
  if (imageCache.has(path)) return imageCache.get(path);
  const file = join(PUBLIC, path);
  let info = null;
  try {
    if (!existsSync(file) && !SKIP_IMAGES) {
      const res = await fetch(`${SITE}${url.pathname}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const input = Buffer.from(await res.arrayBuffer());
      mkdirSync(dirname(file), { recursive: true });
      let pipeline = sharp(input, { failOn: 'none' }).rotate().resize({ width: 1600, withoutEnlargement: true });
      if (/\.png$/i.test(file)) pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: 85 });
      else if (/\.webp$/i.test(file)) pipeline = pipeline.webp({ quality: 80 });
      else pipeline = pipeline.jpeg({ quality: 78, mozjpeg: true });
      await pipeline.toFile(file);
    }
    if (existsSync(file)) {
      const m = await sharp(file).metadata();
      info = { src: path, width: m.width, height: m.height };
    }
  } catch (err) {
    console.warn('imagem falhou', path, String(err));
  }
  imageCache.set(path, info);
  return info;
}

// ---------- limpeza ----------
const ALLOWED = new Set(['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'img', 'figure', 'figcaption', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'br']);
const RENAME = { b: 'strong', i: 'em', h1: 'h2', h5: 'h4', h6: 'h4' };
const DROP = new Set(['script', 'style', 'head', 'title', 'iframe', 'form', 'input', 'button', 'noscript', 'svg', 'meta', 'link']);

function stripShortcodes(html) {
  const decoded = html.replace(/&#8221;|&#8243;|&#8220;/g, '"');
  // Seções inteiras da caixa de autor (foto do Dr. David + CRM) saem: o site novo tem o próprio bloco de autoria.
  const sections = decoded.split(/(?=\[et_pb_section)/);
  const kept = sections.filter((s) => !/img-dr-david|dr\.david-ribeiro/.test(s));
  return kept
    .join('')
    .replace(/\[et_pb_image[^\]]*?src="([^"]+)"[^\]]*?(?:alt="([^"]*)")?[^\]]*\](?:\[\/et_pb_image\])?/g, (_, src, alt) => `<figure><img src="${src}" alt="${alt ?? ''}"></figure>`)
    .replace(/\[\/?[a-z_]+[^\]]*\]/g, '');
}

async function clean(html, post) {
  const dom = new JSDOM(`<body>${stripShortcodes(html)}</body>`);
  const doc = dom.window.document;
  const body = doc.body;

  for (const el of [...body.querySelectorAll('*')].reverse()) {
    const tag = el.tagName.toLowerCase();
    if (DROP.has(tag)) {
      el.remove();
      continue;
    }
    const finalTag = RENAME[tag] ?? tag;
    if (!ALLOWED.has(finalTag)) {
      el.replaceWith(...el.childNodes);
      continue;
    }
    let node = el;
    if (finalTag !== tag) {
      node = doc.createElement(finalTag);
      node.append(...el.childNodes);
      el.replaceWith(node);
    }
    const keep = { a: ['href'], img: ['src', 'alt'], th: ['colspan', 'rowspan'], td: ['colspan', 'rowspan'] }[finalTag] ?? [];
    for (const attr of [...node.attributes]) if (!keep.includes(attr.name)) node.removeAttribute(attr.name);
  }

  // Links
  for (const a of [...body.querySelectorAll('a')]) {
    const href = a.getAttribute('href');
    if (/api\.whatsapp\.com|wa\.me\//.test(href ?? '')) {
      if (/agende|agendar|whatsapp|clique/i.test(a.textContent ?? '')) a.remove();
      else a.replaceWith(...a.childNodes);
      continue;
    }
    const r = classifyHref(href, linkTables);
    if (r.kind === 'unlink') {
      a.replaceWith(...a.childNodes);
      continue;
    }
    a.setAttribute('href', r.href);
    if (r.kind === 'external') a.setAttribute('rel', 'noopener');
  }

  // Imagens: locais, com dimensões; dentro de <figure>
  for (const img of [...body.querySelectorAll('img')]) {
    const info = await localImage(img.getAttribute('src') ?? '');
    if (!info) {
      img.remove();
      continue;
    }
    img.setAttribute('src', info.src);
    img.setAttribute('width', String(info.width));
    img.setAttribute('height', String(info.height));
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
    if (!img.getAttribute('alt')) img.setAttribute('alt', '');
    if (img.parentElement?.tagName.toLowerCase() !== 'figure') {
      const fig = doc.createElement('figure');
      const host = img.parentElement?.tagName.toLowerCase() === 'p' && img.parentElement.textContent.trim() === '' ? img.parentElement : img;
      host.replaceWith(fig);
      fig.append(img);
    }
  }

  // Parágrafos e itens vazios; <br> soltos nas pontas
  for (const el of [...body.querySelectorAll('p, li, h2, h3, h4, figure, strong, em')]) {
    if (el.querySelector('img')) continue;
    if ((el.textContent ?? '').replace(/ /g, ' ').trim() === '') el.remove();
  }
  for (const p of body.querySelectorAll('p')) {
    while (p.firstChild?.nodeName === 'BR') p.firstChild.remove();
    while (p.lastChild?.nodeName === 'BR') p.lastChild.remove();
  }
  // Heading que repete o título do post
  const first = body.querySelector('h2');
  if (first && first.textContent.trim().toLowerCase() === post.title.toLowerCase()) first.remove();

  return body.innerHTML.replace(/&nbsp;| /g, ' ').replace(/ {2,}/g, ' ').replace(/\n{2,}/g, '\n').trim();
}

const text = (html) => new JSDOM(`<body>${html}</body>`).window.document.body.textContent.replace(/\s+/g, ' ').trim();
const truncate = (s, n) => (s.length <= n ? s : `${s.slice(0, s.lastIndexOf(' ', n - 1))}…`);

// ---------- execução ----------
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
const summaries = [];
let count = 0;
for (const post of posts) {
  const row = rowBySlug[post.slug];
  if (!row || !['KEEP', 'UPDATE'].includes(row.action) || row.page_type === 'exame') continue;
  const title = text(post.title.rendered);
  const html = await clean(post.content.rendered, { title });
  const plain = text(html);
  const words = plain.split(' ').length;
  const featured = media.find((m) => m.id === post.featured_media);
  const image = featured ? await localImage(featured.source_url) : null;
  const yoastDescription = post.yoast_head_json?.description?.trim();
  const summary = {
    slug: post.slug,
    title,
    excerpt: truncate(text(post.excerpt.rendered).replace(/\s*\[…\]$|\s*\[&hellip;\]$/, ''), 220),
    description: yoastDescription || truncate(plain, 155),
    // UTC explícito (o WordPress agendava posts: a "modificação" podia ser anterior à publicação).
    publishedAt: `${post.date_gmt}Z`,
    modifiedAt: post.modified_gmt > post.date_gmt ? `${post.modified_gmt}Z` : `${post.date_gmt}Z`,
    image: image ? { ...image, alt: text(featured.alt_text ?? '') || '', original: featured.source_url } : null,
    topics: post.categories.map((id) => categories[id]?.name).filter(Boolean),
    entity: entityFor(post, row),
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
  writeFileSync(join(OUT, `${post.slug}.json`), `${JSON.stringify({ ...summary, html }, null, 1)}\n`);
  summaries.push(summary);
  count++;
}
summaries.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

// Links internos que não batem com nenhuma rota conhecida (posts migrados, entidades, institucionais).
const KNOWN = new Set([
  ...summaries.map((s) => `/${s.slug}/`),
  ...Object.keys(ENTITY_BY_PATH),
  '/blog/', '/sobre/', '/contato/', '/convenios/', '/corpo-clinico/', '/especialidades/', '/exames/', '/tratamentos/',
  '/condicoes-oculares/', '/estrutura-e-tecnologia/', '/privacidade/', '/cookies/', '/exames/tomografia-de-coerencia-optica/',
]);
const unknown = new Map();
for (const s of summaries) {
  const { html } = JSON.parse(readFileSync(join(OUT, `${s.slug}.json`), 'utf8'));
  for (const m of html.matchAll(/href="(\/[^"#]*)/g)) if (!m[1].startsWith('/wp-content/') && !KNOWN.has(m[1])) unknown.set(m[1], s.slug);
}
if (unknown.size) console.warn('links internos sem rota conhecida:', Object.fromEntries(unknown));
writeFileSync(join(OUT, 'index.json'), `${JSON.stringify(summaries, null, 1)}\n`);
console.log(`${count} posts migrados; ${[...imageCache.values()].filter(Boolean).length} imagens`);
