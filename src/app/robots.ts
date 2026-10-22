import type { MetadataRoute } from 'next';
import { getSiteEnv, getSiteUrl } from '@/lib/env';
import { buildRobots } from '@/lib/seo/routes';

export default function robots(): MetadataRoute.Robots {
  return buildRobots(getSiteEnv(), getSiteUrl());
}
