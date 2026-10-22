import type { MetadataRoute } from 'next';
import type { SiteEnv } from '@/lib/env';

export type SitemapGroup = 'core' | 'especialidades' | 'exames' | 'condicoes' | 'corpo-clinico' | 'blog';

export interface SitemapRoute {
  path: string;
  group: SitemapGroup;
  lastModified: string; // ISO date
}

// Só rotas que EXISTEM no app e são indexáveis (teste confere o arquivo page.tsx de cada uma).
export const sitemapRoutes: readonly SitemapRoute[] = [{ path: '/', group: 'core', lastModified: '2026-10-22' }];

// Defesa extra: utilitárias, experimentos e paginação nunca entram, mesmo se listadas por engano.
const EXCLUDED = [/^\/obrigado\//, /^\/lp\//, /\/page\/\d+\/$/, /^\/api\//];

export function buildSitemap(routes: readonly SitemapRoute[], siteUrl: string): MetadataRoute.Sitemap {
  return routes
    .filter((r) => !EXCLUDED.some((rx) => rx.test(r.path)))
    .map((r) => ({
      url: `${siteUrl}${r.path.endsWith('/') ? r.path : `${r.path}/`}`,
      lastModified: r.lastModified,
    }));
}

export function buildRobots(env: SiteEnv, siteUrl: string): MetadataRoute.Robots {
  if (env !== 'production') return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
