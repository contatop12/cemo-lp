import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteSettings } from '@/content/fixtures/site-settings';
import { buildBreadcrumbNode } from '@/lib/seo/jsonld';

// Breadcrumb visível + BreadcrumbList (URLs absolutas no domínio canônico de SiteSettings).
export function Breadcrumbs({ items }: { items: Array<{ name: string; path: string }> }) {
  const data = { '@context': 'https://schema.org', ...buildBreadcrumbNode(items, siteSettings) };
  return (
    <nav aria-label="Você está aqui" className="text-small">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-tinta-suave">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="font-bold text-tinta">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="inline-flex min-h-12 items-center text-azul-700 underline underline-offset-[3px]">
                    {item.name}
                  </Link>
                  <span aria-hidden="true">›</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={data} />
    </nav>
  );
}
