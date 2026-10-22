import type { Metadata } from 'next';
import type { ImageAsset } from '@/content/types';
import { getSiteUrl } from '@/lib/env';

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogImage?: ImageAsset;
}

const SUFFIX = ' | CEMO';

export function absoluteUrl(path: string): string {
  return `${getSiteUrl()}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildMetadata(seo: PageSeo): Metadata {
  const title = seo.title.endsWith(SUFFIX) ? seo.title : `${seo.title}${SUFFIX}`;
  const url = absoluteUrl(seo.path);
  return {
    title: { absolute: title },
    description: seo.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      siteName: 'CEMO',
      url,
      title,
      description: seo.description,
      ...(seo.ogImage
        ? {
            images: [
              { url: absoluteUrl(seo.ogImage.src), width: seo.ogImage.width, height: seo.ogImage.height, alt: seo.ogImage.alt },
            ],
          }
        : {}),
    },
    ...(seo.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
