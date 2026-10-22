import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/env';
import { buildSitemap, sitemapRoutes } from '@/lib/seo/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap(sitemapRoutes, getSiteUrl());
}
