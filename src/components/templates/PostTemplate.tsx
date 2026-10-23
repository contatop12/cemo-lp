import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageCta } from '@/components/page/PageCta';
import { RelatedArticles } from '@/components/page/RelatedBlocks';
import { JsonLd } from '@/components/seo/JsonLd';
import { content } from '@/content';
import type { LeadInterestId, Post } from '@/content/types';
import { buildBlogPostingNode, buildClinicNode, buildGraph, buildWebSiteNode } from '@/lib/seo/jsonld';

const dateFmt = (iso: string) => new Date(iso).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

// Destino do link contextual e do CTA de cada post (docs/information-architecture.md §6.5).
async function entityLink(entity: Post['entity']): Promise<{ name: string; href: string; interest: LeadInterestId } | null> {
  if (!entity) return null;
  if (entity.kind === 'home') return { name: 'Clínica de oftalmologia em Taboão da Serra', href: '/', interest: 'consulta' };
  if (entity.kind === 'specialty') {
    const s = await content.getSpecialty(entity.id);
    return s?.published ? { name: s.name, href: s.canonicalPath, interest: s.leadInterest } : null;
  }
  if (entity.kind === 'exam') {
    const e = await content.getExam(entity.id);
    return e?.published ? { name: e.name, href: e.canonicalPath, interest: 'exames' } : null;
  }
  const c = await content.getCondition(entity.id);
  return c?.published ? { name: c.name, href: c.canonicalPath, interest: 'consulta' } : null;
}

export async function PostTemplate({ post }: { post: Post }) {
  const [settings, interests, posts, conditionLinks, target] = await Promise.all([
    content.getSiteSettings(),
    content.listLeadInterests(),
    content.listPosts(),
    content.listConditionLinks(),
    entityLink(post.entity),
  ]);
  const path = `/${post.slug}/`;
  // Posts que já são a entidade (presbiopia, uveíte, olho seco) seguem a trilha de condições (IA §5).
  const asCondition = conditionLinks.find((c) => c.href === path);
  const trail = asCondition
    ? [{ name: 'Início', path: '/' }, { name: 'Condições oculares', path: '/condicoes-oculares/' }, { name: post.title, path }]
    : [{ name: 'Início', path: '/' }, { name: 'Conteúdos', path: '/blog/' }, { name: post.title, path }];
  const siblings = posts
    .filter((p) => p.slug !== post.slug && p.entity?.kind === post.entity?.kind && p.entity?.id === post.entity?.id)
    .slice(0, 3)
    .map((p) => ({ slug: p.slug, title: p.title, href: `/${p.slug}/`, excerpt: p.excerpt, publishedAt: p.publishedAt.slice(0, 10), image: p.image }));
  const updated = post.modifiedAt.slice(0, 10) !== post.publishedAt.slice(0, 10);

  return (
    <>
      <JsonLd data={buildGraph([buildClinicNode(settings), buildWebSiteNode(settings), buildBlogPostingNode(post, settings)])} />
      <article aria-labelledby="page-title">
        <header className="border-b border-borda bg-nevoa">
          <div className="mx-auto max-w-[52rem] px-[var(--gutter)] pb-10 pt-6 lg:pb-14">
            <Breadcrumbs items={trail} />
            <h1 id="page-title" className="mt-6 text-h1">
              {post.title}
            </h1>
            <p className="mt-4 text-small text-tinta-suave">
              <span>Publicado em <time dateTime={post.publishedAt}>{dateFmt(post.publishedAt)}</time></span>
              {updated ? (
                <span>
                  <span aria-hidden="true">. </span>Atualizado em <time dateTime={post.modifiedAt}>{dateFmt(post.modifiedAt)}</time>
                </span>
              ) : null}
              <span aria-hidden="true">. </span>
              <span>Leitura de {post.readingMinutes} min</span>
            </p>
          </div>
        </header>
        <div className="mx-auto max-w-[52rem] px-[var(--gutter)] py-12 lg:py-16">
          {post.image ? (
            <Image
              src={post.image.src}
              alt={post.image.alt}
              width={post.image.width}
              height={post.image.height}
              sizes="(min-width: 860px) 48rem, 100vw"
              priority
              className="mb-10 h-auto w-full rounded-lg"
            />
          ) : null}
          {/* HTML vindo da migração: sanitizado por lista branca em scripts/migrate-wp.mjs. */}
          <div className="prose-cemo" dangerouslySetInnerHTML={{ __html: post.html }} />
          {target ? (
            <aside aria-label="Próximo passo" className="mt-12 rounded-lg border-l-4 border-azul-cemo bg-nevoa px-6 py-6">
              <p className="font-display text-h4 font-semibold">Quer avaliar isso de perto?</p>
              <p className="mt-2 text-tinta-suave">
                Conheça como o CEMO cuida de{' '}
                <Link href={target.href} className="font-bold text-azul-700 underline underline-offset-[3px]">
                  {target.name.charAt(0).toLowerCase() + target.name.slice(1)}
                </Link>{' '}
                ou agende uma consulta logo abaixo.
              </p>
            </aside>
          ) : null}
          <p className="mt-10 border-t border-borda pt-6 text-small text-tinta-suave">
            Conteúdo da equipe do CEMO, de caráter informativo. Não substitui a consulta com o oftalmologista.
          </p>
        </div>
      </article>
      {siblings.length > 0 ? (
        <div className="mx-auto max-w-wide px-[var(--gutter)] pb-[var(--space-section)]">
          <RelatedArticles articles={siblings} title="Leia também" />
        </div>
      ) : null}
      <PageCta title="Agende sua consulta no CEMO" interests={interests} defaultInterest={target?.interest ?? 'consulta'} settings={settings} formId="post_final" />
    </>
  );
}
