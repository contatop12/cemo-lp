import Link from 'next/link';
import { PageHero } from '@/components/page/PageHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { content } from '@/content';
import { localDate } from '@/lib/dates';
import { buildClinicNode, buildGraph, buildWebSiteNode, schemaIds } from '@/lib/seo/jsonld';

export const POSTS_PER_PAGE = 12;

export async function pageCount(): Promise<number> {
  return Math.ceil((await content.listPosts()).length / POSTS_PER_PAGE);
}

export const blogPagePath = (n: number) => (n === 1 ? '/blog/' : `/blog/pagina/${n}/`);

// Índice do blog paginado (IA §10): cada página com canonical própria; só a primeira entra no sitemap.
export async function BlogIndex({ page }: { page: number }) {
  const [settings, posts, total] = await Promise.all([content.getSiteSettings(), content.listPosts(), pageCount()]);
  const slice = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  const path = blogPagePath(page);
  const ids = schemaIds(settings.siteUrl);
  const graph = buildGraph([
    buildClinicNode(settings),
    buildWebSiteNode(settings),
    {
      '@type': 'CollectionPage',
      '@id': ids.page(path),
      url: `${settings.siteUrl}${path}`,
      name: page === 1 ? 'Conteúdos sobre saúde ocular' : `Conteúdos sobre saúde ocular, página ${page}`,
      inLanguage: 'pt-BR',
      isPartOf: { '@id': ids.website },
    },
  ]);
  const trail = [{ name: 'Início', path: '/' }, { name: 'Conteúdos', path: '/blog/' }, ...(page > 1 ? [{ name: `Página ${page}`, path }] : [])];
  return (
    <>
      <JsonLd data={graph} />
      <PageHero
        breadcrumbs={trail}
        title={page === 1 ? 'Conteúdos sobre saúde ocular' : `Conteúdos sobre saúde ocular, página ${page}`}
        lead="Artigos da equipe do CEMO para entender sintomas, exames e tratamentos — e chegar à consulta com as perguntas certas."
        compact
      />
      <div className="mx-auto max-w-wide px-[var(--gutter)] py-[var(--space-section)]">
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {slice.map((p) => (
            <li key={p.slug}>
              <ArticleCard
                article={{ slug: p.slug, title: p.title, href: `/${p.slug}/`, excerpt: p.excerpt, publishedAt: localDate(p.publishedAt), image: p.image }}
                headingLevel={2}
              />
            </li>
          ))}
        </ul>
        <nav aria-label="Páginas do blog" className="mt-14 flex flex-wrap items-center justify-center gap-2">
          {page > 1 ? (
            <Link href={blogPagePath(page - 1)} rel="prev" className="inline-flex min-h-12 items-center rounded-md border-2 border-azul-cemo px-5 font-bold text-azul-700 no-underline">
              Anteriores
            </Link>
          ) : null}
          {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              href={blogPagePath(n)}
              aria-current={n === page ? 'page' : undefined}
              className="inline-flex size-12 items-center justify-center rounded-md font-bold text-azul-700 no-underline hover:bg-nevoa-2 aria-[current=page]:bg-azul-cemo aria-[current=page]:text-papel"
            >
              {n}
            </Link>
          ))}
          {page < total ? (
            <Link href={blogPagePath(page + 1)} rel="next" className="inline-flex min-h-12 items-center rounded-md border-2 border-azul-cemo px-5 font-bold text-azul-700 no-underline">
              Mais conteúdos
            </Link>
          ) : null}
        </nav>
      </div>
    </>
  );
}
