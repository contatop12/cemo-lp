// @vitest-environment node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildRedirectTables } from './build';
import { resolveRedirect, shouldBypass } from './resolve';

const tables = buildRedirectTables(readFileSync(join(process.cwd(), 'docs/seo-migration-map.csv'), 'utf8'));
const go = (pathname: string, search = '') => resolveRedirect({ pathname, search }, tables);

describe('resolveRedirect (amostras do mapa de migração)', () => {
  it.each([
    ['/contato-2/', '/contato/'],
    ['/exames/lentes/', '/especialidades/lentes-de-contato/'],
    ['/author/cemox/', '/blog/'],
  ])('%s → 301 %s', (from, to) => {
    expect(go(from)).toEqual({ kind: 'redirect', location: to });
  });

  // URLs com impressões no Search Console que o WordPress ainda atendia (migração de produção, 10/11/2026).
  it.each([
    ['/category/ceratocone/page/2/', '/condicoes-oculares/ceratocone/'],
    ['/category/dicas-e-curiosidades-sobre-os-olhos-e-visao/dicas/page/3/', '/blog/'],
    ['/author/cemox/page/24/', '/blog/'],
    ['/blog/alimentos-que-auxiliam-na-visao/', '/alimentos-que-auxiliam-na-visao/'],
  ])('arquivo paginado e permalink antigo /blog/<post>/: %s → 301 %s', (from, to) => {
    expect(go(from)).toEqual({ kind: 'redirect', location: to });
  });

  it('página 2 de uma tag removida também é 410; /blog/pagina/N/ do site novo passa', () => {
    expect(go('/tag/campo-visual/page/2/')).toEqual({ kind: 'gone' });
    expect(go('/blog/pagina/2/')).toEqual({ kind: 'pass' });
  });

  it.each(['/sitemap_index.xml', '/wp-sitemap.xml', '/post-sitemap.xml', '/page-sitemap.xml', '/category-sitemap.xml', '/post_tag-sitemap.xml', '/author-sitemap.xml'])(
    'sitemap do WordPress (cadastrado no Search Console) %s → 301 /sitemap.xml',
    (from) => {
      expect(go(from)).toEqual({ kind: 'redirect', location: '/sitemap.xml' });
    },
  );

  it('/post-list/ → 410', () => {
    expect(go('/post-list/')).toEqual({ kind: 'gone' });
  });

  it('primeira tag removida do CSV → 410', () => {
    const tag = tables.gone.find((p) => p.startsWith('/tag/'));
    expect(tag).toBeDefined();
    expect(go(tag!)).toEqual({ kind: 'gone' });
  });

  it('URL mantida passa direto', () => {
    expect(go('/alimentos-que-auxiliam-na-visao/')).toEqual({ kind: 'pass' });
    expect(go('/')).toEqual({ kind: 'pass' });
  });

  it('RF-3: preserva gclid e UTMs', () => {
    expect(go('/contato-2/', '?gclid=abc&utm_source=g')).toEqual({
      kind: 'redirect',
      location: '/contato/?gclid=abc&utm_source=g',
    });
  });

  it('RF-3: caixa alta e sem barra final → um único salto ao destino final', () => {
    expect(go('/CONTATO-2')).toEqual({ kind: 'redirect', location: '/contato/' });
  });

  it('RF-3: variação só de formato vai para a forma canônica', () => {
    expect(go('/Sobre')).toEqual({ kind: 'redirect', location: '/sobre/' });
    expect(go('/index.html')).toEqual({ kind: 'redirect', location: '/' });
    expect(go('/sobre', '?utm_source=x')).toEqual({ kind: 'redirect', location: '/sobre/?utm_source=x' });
  });

  it('RF-3: assets, API e arquivos nunca são interceptados', () => {
    for (const p of ['/_next/static/x.js', '/api/lead', '/api/lead/', '/robots.txt', '/sitemap.xml', '/images/dr-david.jpg', '/favicon.ico']) {
      expect(shouldBypass(p), p).toBe(true);
      expect(go(p), p).toEqual({ kind: 'pass' });
    }
  });
});
