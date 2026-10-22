import type { SiteEnv } from '../env';

// CSP sem nonce: nonce exige renderização dinâmica e mataria o SSG. Por isso 'unsafe-inline' em script-src
// (default de consentimento inline e GTM) — limitação documentada em docs/seo-checklist.md.
function contentSecurityPolicy(env: SiteEnv): string {
  const scriptSrc = ["'self'", "'unsafe-inline'", 'https://www.googletagmanager.com'];
  if (env === 'development') scriptSrc.push("'unsafe-eval'");
  return [
    "default-src 'self'",
    `script-src ${scriptSrc.join(' ')}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com",
    "font-src 'self'",
    "connect-src 'self' https://www.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.g.doubleclick.net",
    'frame-src https://www.youtube-nocookie.com https://www.google.com https://www.googletagmanager.com',
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
  ].join('; ');
}

export function buildSecurityHeaders(env: SiteEnv): Array<{ key: string; value: string }> {
  const headers = [
    { key: 'Content-Security-Policy', value: contentSecurityPolicy(env) },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()' },
  ];
  if (env === 'production') {
    headers.push({ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' });
  } else {
    headers.push({ key: 'X-Robots-Tag', value: 'noindex, nofollow' });
  }
  return headers;
}
