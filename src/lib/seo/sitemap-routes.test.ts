// @vitest-environment node
import { collectSitemapRoutes } from './sitemap-routes';

describe('rotas do sitemap a partir do conteúdo', () => {
  it('inclui institucionais, entidades publicadas, médicos e posts — com lastmod real', async () => {
    const routes = await collectSitemapRoutes();
    const paths = routes.map((r) => r.path);
    for (const p of [
      '/',
      '/sobre/',
      '/contato/',
      '/convenios/',
      '/especialidades/',
      '/especialidades/catarata/',
      '/consulta-oftalmologica/',
      '/exames/mapeamento/',
      '/exame-de-campo-visual-o-que-e-para-que-serve-e-como-e-feito/',
      '/condicoes-oculares/ceratocone/',
      '/corpo-clinico/david-ribeiro-de-mendonca-filho/',
      '/blog/',
      '/hipermetropia-como-e-a-visao/',
    ]) {
      expect(paths, p).toContain(p);
    }
    expect(new Set(paths).size).toBe(paths.length);
    for (const r of routes) expect(r.lastModified).toMatch(/^\d{4}-\d{2}-\d{2}/);
  });

  it('nunca inclui não publicados, paginação, utilitárias ou URLs que redirecionam', async () => {
    const paths = (await collectSitemapRoutes()).map((r) => r.path);
    for (const p of ['/tratamentos/crosslinking-corneano/', '/corpo-clinico/danielle-longo/', '/blog/pagina/2/', '/obrigado/', '/tudo-sobre-glaucoma/', '/exames/campo-visual/']) {
      expect(paths, p).not.toContain(p);
    }
  });

  it('posts usam a data de modificação original', async () => {
    const routes = await collectSitemapRoutes();
    expect(routes.find((r) => r.path === '/hipermetropia-como-e-a-visao/')?.group).toBe('blog');
  });
});
