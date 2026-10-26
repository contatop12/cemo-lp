import { expect, test } from '@playwright/test';

test.beforeEach(async ({ context }) => {
  await context.addInitScript(() => localStorage.setItem('cemo.consent.v1', 'denied'));
});

const SECTIONS = ['inicio', 'agendar', 'especialidades', 'catarata', 'refrativa', 'diretor-tecnico', 'estrutura', 'video', 'corpo-clinico', 'avaliacoes', 'convenios', 'localizacao', 'conteudos', 'agende'];

test('Home responde e tem um único h1', async ({ page }) => {
  const res = await page.goto('/');
  expect(res?.status()).toBe(200);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText('Clínica de Oftalmologia em Taboão da Serra');
});

test('foto do hero é o LCP, com prioridade alta e sem lazy', async ({ page }) => {
  await page.goto('/');
  const img = page.locator('#inicio img[fetchpriority="high"]');
  await expect(img).toHaveAttribute('fetchpriority', 'high');
  expect(await img.getAttribute('loading')).not.toBe('lazy');
  expect(await page.locator('link[rel="preload"][as="image"]').count()).toBeGreaterThan(0);
  const lcp = await page.evaluate(
    () =>
      new Promise<{ src: string; time: number }>((resolve) => {
        new PerformanceObserver((list) => {
          const last = list.getEntries().at(-1) as PerformanceEntry & { element?: Element; url?: string };
          const el = last.element as HTMLImageElement | undefined;
          resolve({ src: el?.currentSrc || last.url || el?.tagName || '', time: last.startTime });
        }).observe({ type: 'largest-contentful-paint', buffered: true });
      }),
  );
  expect(lcp.src).toContain('dr-david');
  expect.soft(lcp.time).toBeLessThan(2500);
});

test('conteúdo crítico existe sem JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Clínica de Oftalmologia em Taboão da Serra');
  await expect(page.locator('[data-hero-cta]')).toBeVisible();
  for (const id of ['agendar', 'especialidades', 'corpo-clinico', 'localizacao']) await expect(page.locator(`#${id}`)).toHaveCount(1);
  await context.close();
});

test('movimento reduzido: texto do hero visível de imediato', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  const opacity = await page.locator('#hero-title').evaluate((el) => getComputedStyle(el).opacity);
  expect(opacity).toBe('1');
  await context.close();
});

test('seções na ordem da jornada', async ({ page }) => {
  await page.goto('/');
  const ids = await page.$$eval('main section[id]', (els) => els.map((e) => e.id));
  expect(ids).toEqual(SECTIONS);
});

test('itens lado a lado ficam alinhados: títulos de especialidade, fotos da estrutura e transcrições dos vídeos', async ({ page }, info) => {
  test.skip((info.project.use.viewport?.width ?? 0) < 1024, 'só no desktop (grade em colunas)');
  await page.goto('/');
  const sizes = await page.locator('#especialidades h3').evaluateAll((hs) => hs.map((h) => getComputedStyle(h).fontSize));
  expect(new Set(sizes).size).toBe(1);
  const photos = await page.locator('#estrutura figure img').evaluateAll((imgs) => imgs.map((i) => Math.round(i.getBoundingClientRect().height)));
  expect(new Set(photos).size).toBe(1);
  const summaries = await page.locator('#video summary').evaluateAll((ss) => ss.map((s) => Math.round(s.getBoundingClientRect().top)));
  expect(new Set(summaries).size).toBe(1);
  // botão "Assistir" com o ícone de 64 px dentro do pôster (classes de src/components/media/ geradas no CSS)
  const play = await page.locator('#video button span.rounded-full').first().boundingBox();
  expect(play?.width).toBe(64);
});
