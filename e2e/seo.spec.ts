import { expect, test } from '@playwright/test';


test('title, canonical, robots e JSON-LD da Home', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Clínica de Oftalmologia em Taboão da Serra | CEMO');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'http://localhost:3100/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index/);
  const read = async () =>
    page.$$eval('script[type="application/ld+json"]', (els) => els.map((e) => JSON.parse(e.textContent ?? '{}')));
  const first = await read();
  const ids = first.flatMap((d) => (d['@graph'] ?? [d]).map((n: { '@id'?: string }) => n['@id'])).filter(Boolean);
  expect(new Set(ids).size).toBe(ids.length);
  expect(JSON.stringify(first)).not.toMatch(/Review|AggregateRating/);
  await page.reload();
  expect(await read()).toEqual(first);
});

test('robots.txt e sitemap.xml de produção', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Allow: /');
  expect(robots).toContain('Sitemap: http://localhost:3100/sitemap.xml');
  const sitemap = await (await request.get('/sitemap.xml')).text();
  for (const path of ['/', '/privacidade/', '/cookies/']) expect(sitemap).toContain(`<loc>http://localhost:3100${path}</loc>`);
  expect(sitemap).not.toContain('/obrigado/');
});

test('headers de segurança', async ({ request }) => {
  const res = await request.get('/');
  for (const header of ['x-content-type-options', 'strict-transport-security', 'referrer-policy', 'permissions-policy', 'content-security-policy']) {
    expect(res.headers()[header], header).toBeTruthy();
  }
});

test('404 humanizada e não indexável', async ({ page }) => {
  const res = await page.goto('/nao-existe/');
  expect(res?.status()).toBe(404);
  // o Next acrescenta o próprio noindex na 404; todas as tags precisam dizer noindex
  const robots = await page.$$eval('meta[name="robots"]', (els) => els.map((e) => e.getAttribute('content') ?? ''));
  expect(robots.length).toBeGreaterThan(0);
  for (const content of robots) expect(content).toContain('noindex');
  await expect(page.getByRole('link', { name: 'Falar no WhatsApp' }).first()).toHaveAttribute('href', /wa\.me/);
});
