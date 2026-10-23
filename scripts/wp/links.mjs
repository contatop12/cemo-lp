// Decide o que fazer com cada href do HTML migrado do WordPress. Lista branca de protocolos: só http(s), mailto e
// tel saem como link; javascript:, data:, vbscript: e qualquer outro viram texto. Âncoras na própria página ficam.
const SITE = 'https://oftalmologiacemo.com.br';

/**
 * @param {string | null} href
 * @param {{ redirects: Record<string, string>, gone: Set<string>, fixes?: Record<string, string> }} tables
 * @returns {{ kind: 'internal' | 'asset' | 'external' | 'anchor' | 'contact', href: string } | { kind: 'unlink' }}
 */
export function classifyHref(href, { redirects, gone, fixes = {} }) {
  const raw = (href ?? '').trim();
  if (raw === '') return { kind: 'unlink' };
  if (raw.startsWith('#')) return raw.length > 1 ? { kind: 'anchor', href: raw } : { kind: 'unlink' };
  let url;
  try {
    url = new URL(raw, SITE);
  } catch {
    return { kind: 'unlink' };
  }
  if (url.protocol === 'mailto:' || url.protocol === 'tel:') return { kind: 'contact', href: url.href };
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return { kind: 'unlink' };
  if (!/(^|\.)oftalmologiacemo\.com\.br$/.test(url.hostname)) return { kind: 'external', href: url.href };
  if (url.pathname.startsWith('/wp-content/')) return { kind: 'asset', href: url.pathname };
  // Permalinks antigos por data (/2022/11/28/slug/) apontam para o post na raiz.
  let path = decodeURIComponent(url.pathname).toLowerCase().replace(/^\/\d{4}\/\d{2}\/(?:\d{2}\/)?/, '/');
  if (!path.endsWith('/')) path += '/';
  if (gone.has(path)) return { kind: 'unlink' };
  const target = fixes[path] ?? redirects[path] ?? path;
  return { kind: 'internal', href: target + (url.hash || '') };
}
