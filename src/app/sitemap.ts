import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/env';
import { buildSitemap } from '@/lib/seo/routes';
import { collectSitemapRoutes } from '@/lib/seo/sitemap-routes';

// Um arquivo só (~170 URLs, bem abaixo do limite de 50 mil); os grupos ficam no dado para relatórios.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return buildSitemap(await collectSitemapRoutes(), getSiteUrl());
}
