import type { NextConfig } from 'next';
import { getSiteEnv } from './src/lib/env';
import { buildSecurityHeaders } from './src/lib/security/headers';

const nextConfig: NextConfig = {
  trailingSlash: true,
  // A barra final é aplicada pelo proxy (normalizePath) junto com o mapa de migração: um único salto 301,
  // em vez de 308 (barra) + 301 (destino).
  skipTrailingSlashRedirect: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75, 85],
  },
  async headers() {
    return [{ source: '/:path*', headers: buildSecurityHeaders(getSiteEnv()) }];
  },
};

export default nextConfig;
