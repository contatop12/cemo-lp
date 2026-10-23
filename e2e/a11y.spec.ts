import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';


const TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'];

test('axe: 0 violações com o banner de cookies aberto e depois da escolha', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('region', { name: 'Aviso de cookies' })).toBeVisible();
  const before = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  expect(before.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
  await page.getByRole('button', { name: 'Recusar' }).click();
  const after = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  expect(after.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
});

test('skip link é o primeiro Tab e leva ao conteúdo', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Ir para o conteúdo' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#conteudo')).toBeFocused();
});

test('mega menu: Enter abre, Esc fecha e devolve o foco', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop-1440', 'menu desktop');
  await page.context().addInitScript(() => localStorage.setItem('cemo.consent.v1', 'denied'));
  await page.goto('/');
  const button = page.getByRole('navigation', { name: 'Principal' }).getByRole('button', { name: 'Especialidades' });
  await button.focus();
  await page.keyboard.press('Enter');
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(button).toBeFocused();
});

test('alvos de toque: controles ≥ 44×44 (links dentro de frases são exceção WCAG 2.5.8)', async ({ page }) => {
  await page.context().addInitScript(() => localStorage.setItem('cemo.consent.v1', 'denied'));
  await page.goto('/');
  const small = await page.$$eval('a[href], button, select, input:not([type="hidden"]):not([tabindex="-1"])', (els) =>
    els
      .filter((el) => {
        const r = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        if (r.width === 0 || style.visibility === 'hidden' || el.closest('[hidden],[aria-hidden="true"]')) return false;
        if (el.matches('.sr-only-focusable')) return false;
        if (el.closest('p, li > p, figcaption') && el.tagName === 'A') return false; // inline em texto
        return r.width < 44 || r.height < 44;
      })
      .map((el) => `${el.tagName} "${(el.textContent ?? '').trim().slice(0, 30)}" ${Math.round(el.getBoundingClientRect().width)}×${Math.round(el.getBoundingClientRect().height)}`),
  );
  expect(small).toEqual([]);
});

// Templates internos: uma página de cada tipo, com a escolha de cookies já feita.
const PAGES = [
  '/especialidades/catarata/',
  '/consulta-oftalmologica/',
  '/exame-de-campo-visual-o-que-e-para-que-serve-e-como-e-feito/',
  '/exames/tomografia-de-coerencia-optica/',
  '/condicoes-oculares/ceratocone/',
  '/corpo-clinico/',
  '/corpo-clinico/david-ribeiro-de-mendonca-filho/',
  '/especialidades/',
  '/exames/',
  '/blog/',
  '/hipermetropia-como-e-a-visao/',
  '/sobre/',
  '/convenios/',
  '/contato/',
];

for (const path of PAGES) {
  test(`axe: 0 violações em ${path}`, async ({ page }) => {
    await page.context().addInitScript(() => localStorage.setItem('cemo.consent.v1', 'denied'));
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    const result = await new AxeBuilder({ page }).withTags(TAGS).analyze();
    expect(result.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
  });
}
