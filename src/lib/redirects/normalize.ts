// Normalização de caminho compartilhada pelo gerador (build) e pelo proxy (runtime). Sem dependências.

export function safeDecode(pathname: string): string {
  try {
    return decodeURI(pathname);
  } catch {
    return pathname;
  }
}

const HAS_EXTENSION = /\/[^/]+\.[a-z0-9]{1,6}$/i;

// decodeURI (tolerante), minúsculas, colapsa '//', remove '/index.html', remove hífen final do último
// segmento e garante barra final — exceto caminhos de arquivo (com extensão).
export function normalizePath(pathname: string): string {
  let p = safeDecode(pathname).toLowerCase().replace(/\/{2,}/g, '/');
  if (!p.startsWith('/')) p = `/${p}`;
  p = p.replace(/\/index\.html$/, '/');
  if (HAS_EXTENSION.test(p)) return p;
  p = p.replace(/-+(\/?)$/, '$1');
  return p.endsWith('/') ? p : `${p}/`;
}
