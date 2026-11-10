import type { RedirectTables } from './build.ts';
import { redirectTables } from './generated.ts';
import { normalizePath, safeDecode } from './normalize.ts';

export type RedirectDecision = { kind: 'redirect'; location: string } | { kind: 'gone' } | { kind: 'pass' };

const BYPASS_PREFIXES = ['/_next/', '/api/'];
const BYPASS_EXACT = new Set(['/api', '/favicon.ico', '/robots.txt', '/sitemap.xml']);
const FILE_EXTENSION = /\.([a-z0-9]{1,6})$/i;
// Sitemaps do WordPress/Yoast (o Search Console tem o sitemap_index.xml cadastrado) → sitemap do site novo.
const WP_SITEMAPS = new Set([
  '/sitemap_index.xml',
  '/wp-sitemap.xml',
  '/post-sitemap.xml',
  '/page-sitemap.xml',
  '/category-sitemap.xml',
  '/post_tag-sitemap.xml',
  '/author-sitemap.xml',
]);
// Páginas 2, 3… de arquivos do WordPress (categoria, tag, autor): mesmo destino da primeira página.
const ARCHIVE_PAGE = /^(\/(?:category|tag|author)\/.+\/)page\/\d+\/$/;

export function shouldBypass(pathname: string): boolean {
  if (BYPASS_EXACT.has(pathname)) return true;
  if (BYPASS_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return true;
  const ext = pathname.match(FILE_EXTENSION)?.[1]?.toLowerCase();
  return ext !== undefined && ext !== 'html';
}

const goneCache = new WeakMap<RedirectTables, Set<string>>();

function goneSet(tables: RedirectTables): Set<string> {
  let set = goneCache.get(tables);
  if (!set) {
    set = new Set(tables.gone);
    goneCache.set(tables, set);
  }
  return set;
}

// Um único salto: a chave normalizada já leva ao destino final do mapa; a query (gclid/utm_*) é preservada.
export function resolveRedirect(
  input: { pathname: string; search: string },
  tables: RedirectTables = redirectTables,
): RedirectDecision {
  const { pathname, search } = input;
  if (WP_SITEMAPS.has(pathname.toLowerCase())) return { kind: 'redirect', location: '/sitemap.xml' };
  if (shouldBypass(pathname)) return { kind: 'pass' };

  const key = normalizePath(pathname);
  if (goneSet(tables).has(key)) return { kind: 'gone' };

  const target = tables.redirects[key];
  if (target) return { kind: 'redirect', location: `${target}${search}` };

  const archive = key.match(ARCHIVE_PAGE)?.[1];
  if (archive && goneSet(tables).has(archive)) return { kind: 'gone' };
  if (archive && tables.redirects[archive]) return { kind: 'redirect', location: `${tables.redirects[archive]}${search}` };

  // Variação só de formato (caixa, barra, index.html…): compara na mesma codificação para nunca entrar em loop.
  if (key !== safeDecode(pathname)) return { kind: 'redirect', location: `${encodeURI(key)}${search}` };

  return { kind: 'pass' };
}
