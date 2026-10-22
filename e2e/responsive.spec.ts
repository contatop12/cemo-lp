import { expect, test } from '@playwright/test';

test('sem rolagem horizontal (RF-5)', async ({ page }) => {
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test('celular: barra fixa oculta com o banner pendente, aparece depois do hero e não cobre o foco', async ({ page }, info) => {
  test.skip(!info.project.name.startsWith('mobile'), 'só celular');
  await page.goto('/');
  const sticky = page.locator('[data-sticky-cta]');
  await expect(page.getByRole('region', { name: 'Aviso de cookies' })).toBeVisible();
  await expect(sticky).toBeHidden();
  await page.getByRole('button', { name: 'Recusar' }).click();
  await expect(page.getByRole('region', { name: 'Aviso de cookies' })).toHaveCount(0);
  await page.locator('#especialidades').scrollIntoViewIfNeeded();
  await expect(sticky).toBeVisible();

  // Tab pelos links do rodapé: o elemento focado nunca fica sob a barra (WCAG 2.4.11).
  await page.locator('footer a').first().focus();
  for (let i = 0; i < 12; i++) {
    const covered = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el) return false;
      el.scrollIntoView({ block: 'nearest' });
      const r = el.getBoundingClientRect();
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return !!hit?.closest('[data-sticky-cta]');
    });
    expect(covered).toBe(false);
    await page.keyboard.press('Tab');
  }
});

test('zoom 200% em 1280 (viewport de 640 px CSS) sem rolagem horizontal', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop-1280', 'zoom em 1280');
  // Zoom de 200% do navegador em 1280 px = viewport de 640 px CSS (zoom via CSS no <html> mede em escalas diferentes).
  await page.setViewportSize({ width: 640, height: 400 });
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
