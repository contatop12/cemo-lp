import { content } from '@/content';
import { sitemapRoutes, type SitemapRoute } from './routes';

// Hubs e institucionais (existem como page.tsx; a data acompanha a última revisão do conteúdo da página).
const STATIC: SitemapRoute[] = [
  { path: '/sobre/', group: 'core', lastModified: '2026-10-22' },
  { path: '/estrutura-e-tecnologia/', group: 'core', lastModified: '2026-10-22' },
  { path: '/convenios/', group: 'core', lastModified: '2026-10-22' },
  { path: '/contato/', group: 'core', lastModified: '2026-10-22' },
  { path: '/especialidades/', group: 'especialidades', lastModified: '2026-10-22' },
  { path: '/tratamentos/', group: 'especialidades', lastModified: '2026-10-22' },
  { path: '/exames/', group: 'exames', lastModified: '2026-10-22' },
  { path: '/condicoes-oculares/', group: 'condicoes', lastModified: '2026-10-22' },
  { path: '/corpo-clinico/', group: 'corpo-clinico', lastModified: '2026-10-22' },
  { path: '/blog/', group: 'blog', lastModified: '2026-10-22' },
];

// Sitemap = só URLs indexáveis que respondem 200: entidades publicadas, perfis publicados e posts migrados.
// Paginação do blog, /obrigado/, /lp/ e tudo que redireciona ficam de fora (IA §3).
export async function collectSitemapRoutes(): Promise<SitemapRoute[]> {
  const [specialties, exams, conditions, doctors, posts] = await Promise.all([
    content.listSpecialties(),
    content.listExams(),
    content.listConditions(),
    content.listDoctors(),
    content.listPosts(),
  ]);
  const routes: SitemapRoute[] = [
    ...sitemapRoutes,
    ...STATIC,
    ...specialties.map((s) => ({ path: s.canonicalPath, group: 'especialidades' as const, lastModified: s.review.updatedAt })),
    ...exams.map((e) => ({ path: e.canonicalPath, group: 'exames' as const, lastModified: e.review.updatedAt })),
    ...conditions.map((c) => ({ path: c.canonicalPath, group: 'condicoes' as const, lastModified: c.review.updatedAt })),
    ...doctors.map((d) => ({ path: d.canonicalPath, group: 'corpo-clinico' as const, lastModified: '2026-10-22' })),
    ...posts.map((p) => ({ path: `/${p.slug}/`, group: 'blog' as const, lastModified: p.modifiedAt.slice(0, 10) })),
  ];
  const seen = new Set<string>();
  return routes.filter((r) => (seen.has(r.path) ? false : (seen.add(r.path), true)));
}
