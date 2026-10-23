import type { ReactNode } from 'react';
import Link from 'next/link';
import { PageCta } from '@/components/page/PageCta';
import { PageHero } from '@/components/page/PageHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { content } from '@/content';
import type { LeadInterestId } from '@/content/types';
import { buildClinicNode, buildGraph, buildWebSiteNode, schemaIds } from '@/lib/seo/jsonld';

export interface HubItem {
  name: string;
  summary: string;
  href: string;
  /** Rótulo curto acima do nome (ex.: "Exame", "Tratamento"). */
  kind?: string;
}

// Hubs de navegação (especialidades, exames, condições, tratamentos): lista que direciona, não página de conteúdo.
// Itens em linhas inteiras clicáveis, como o índice da Home.
export async function HubPage({
  path,
  breadcrumbs,
  title,
  lead,
  groups,
  aside,
  children,
  ctaTitle,
  interest = 'consulta',
  formId,
}: {
  path: string;
  breadcrumbs: Array<{ name: string; path: string }>;
  title: string;
  lead: string;
  groups: Array<{ id: string; title?: string; items: HubItem[] }>;
  aside?: ReactNode;
  children?: ReactNode;
  ctaTitle: string;
  interest?: LeadInterestId;
  formId: string;
}) {
  const [settings, interests] = await Promise.all([content.getSiteSettings(), content.listLeadInterests()]);
  const all = groups.flatMap((g) => g.items);
  const ids = schemaIds(settings.siteUrl);
  const graph = buildGraph([
    buildClinicNode(settings),
    buildWebSiteNode(settings),
    {
      '@type': 'CollectionPage',
      '@id': ids.page(path),
      url: `${settings.siteUrl}${path}`,
      name: title,
      description: lead,
      inLanguage: 'pt-BR',
      isPartOf: { '@id': ids.website },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: all.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, url: `${settings.siteUrl}${item.href}` })),
      },
    },
  ]);
  return (
    <>
      <JsonLd data={graph} />
      <PageHero breadcrumbs={breadcrumbs} title={title} lead={lead} compact />
      <div className="mx-auto grid max-w-wide gap-14 px-[var(--gutter)] py-[var(--space-section)] lg:grid-cols-12 lg:gap-8">
        <div className={aside ? 'flex flex-col gap-14 lg:col-span-8' : 'flex flex-col gap-14 lg:col-span-12'}>
          {groups.map((group) => (
            <section key={group.id} aria-labelledby={group.title ? `${group.id}-titulo` : undefined} aria-label={group.title ? undefined : title}>
              {group.title ? (
                <h2 id={`${group.id}-titulo`} className="text-h2">
                  {group.title}
                </h2>
              ) : null}
              <ul className={`${group.title ? 'mt-6' : ''} grid border-t border-borda ${aside ? '' : 'md:grid-cols-2 md:gap-x-10'}`}>
                {group.items.map((item) => (
                  <li key={item.href} className="border-b border-borda">
                    <Link href={item.href} className="group flex min-h-20 flex-col justify-center gap-1 py-5 no-underline">
                      {item.kind ? <span className="text-small font-bold text-tinta-suave">{item.kind}</span> : null}
                      <span className="font-display text-h3 font-semibold text-tinta group-hover:text-azul-700">{item.name}</span>
                      <span className="max-w-[56ch] text-tinta-suave">{item.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          {children}
        </div>
        {aside ? <div className="lg:col-span-4">{aside}</div> : null}
      </div>
      <PageCta title={ctaTitle} interests={interests} defaultInterest={interest} settings={settings} formId={formId} />
    </>
  );
}
