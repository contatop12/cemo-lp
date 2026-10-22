import { defineConfig, devices } from '@playwright/test';

// Pré-requisito (npm run test:e2e faz isto): build único de produção apontando para a porta 3100:
//   SITE_ENV=production NEXT_PUBLIC_SITE_URL=http://localhost:3100 next build
// 3100 = produção com webhook (stub em 3199) · 3101 = produção sem webhook (falha fechada).
const production = { SITE_ENV: 'production', NEXT_PUBLIC_SITE_URL: 'http://localhost:3100' };

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  use: { baseURL: 'http://localhost:3100', trace: 'off' },
  webServer: [
    { command: 'node e2e/stub-webhook.mjs', url: 'http://localhost:3199/health', reuseExistingServer: false },
    {
      command: 'npx next start -p 3100',
      url: 'http://localhost:3100/robots.txt',
      reuseExistingServer: false,
      env: { ...production, LEAD_WEBHOOK_URL: 'http://localhost:3199/lead', LEAD_WEBHOOK_SECRET: 'test-secret' },
    },
    {
      command: 'npx next start -p 3101',
      url: 'http://localhost:3101/robots.txt',
      reuseExistingServer: false,
      env: { ...production, LEAD_WEBHOOK_URL: '', LEAD_WEBHOOK_SECRET: '' },
    },
  ],
  projects: [
    // Specs independentes de viewport (seo, lead, redirects) rodam só em 1440; a11y em 1440 e 390.
    { name: 'desktop-1440', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'desktop-1280', testMatch: /(home|responsive).spec.ts/, use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } } },
    { name: 'tablet-820', testMatch: /(home|responsive).spec.ts/, use: { ...devices['Desktop Chrome'], viewport: { width: 820, height: 1180 }, hasTouch: true } },
    { name: 'mobile-390', testMatch: /(home|responsive|a11y).spec.ts/, use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true } },
    { name: 'mobile-360', testMatch: /(home|responsive).spec.ts/, use: { ...devices['Desktop Chrome'], viewport: { width: 360, height: 740 }, hasTouch: true, isMobile: true } },
  ],
});
