// @vitest-environment node
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { buildRobots, buildSitemap, sitemapRoutes, type SitemapRoute } from './routes';

const SITE = 'https://oftalmologiacemo.com.br';

describe('sitemap', () => {
  it('cada URL termina em barra e é absoluta', () => {
    for (const entry of buildSitemap(sitemapRoutes, SITE)) {
      expect(entry.url.startsWith(SITE + '/')).toBe(true);
      expect(entry.url.endsWith('/')).toBe(true);
    }
  });

  it('descarta rotas utilitárias, de experimento e paginação mesmo se listadas por engano', () => {
    const routes: SitemapRoute[] = [
      { path: '/', group: 'core', lastModified: '2026-10-22' },
      { path: '/obrigado/', group: 'core', lastModified: '2026-10-22' },
      { path: '/lp/catarata/', group: 'core', lastModified: '2026-10-22' },
      { path: '/blog/page/2/', group: 'blog', lastModified: '2026-10-22' },
    ];
    expect(buildSitemap(routes, SITE).map((e) => e.url)).toEqual([`${SITE}/`]);
  });

  it('toda rota do sitemap existe no app', () => {
    for (const route of sitemapRoutes) {
      const file = route.path === '/' ? 'src/app/page.tsx' : `src/app${route.path}page.tsx`;
      expect(existsSync(join(process.cwd(), file)), file).toBe(true);
    }
  });
});

describe('robots', () => {
  it('staging bloqueia tudo e não anuncia sitemap', () => {
    const robots = buildRobots('staging', SITE);
    expect(robots.rules).toEqual({ userAgent: '*', disallow: '/' });
    expect(robots.sitemap).toBeUndefined();
  });

  it('development também bloqueia', () => {
    expect(buildRobots('development', SITE).rules).toEqual({ userAgent: '*', disallow: '/' });
  });

  it('produção libera o site, protege a API e aponta o sitemap', () => {
    const robots = buildRobots('production', SITE);
    expect(robots.rules).toEqual({ userAgent: '*', allow: '/', disallow: ['/api/'] });
    expect(robots.sitemap).toBe(`${SITE}/sitemap.xml`);
  });
});
