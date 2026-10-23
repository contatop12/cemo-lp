import { expect, test } from '@playwright/test';

// Nada interno vai para o HTML público: notas de validação (TODO_CONTENT_VALIDATION), comentários de compliance e
// links de páginas não publicadas — nem no texto, nem no payload RSC serializado para os componentes cliente.
const PAGES = [
  '/',
  '/corpo-clinico/',
  '/convenios/',
  '/especialidades/plastica-ocular/',
  '/especialidades/catarata/',
  '/hipermetropia-como-e-a-visao/',
];

for (const path of PAGES) {
  test(`sem notas internas no HTML de ${path}`, async ({ request }) => {
    const html = await (await request.get(path)).text();
    expect(html).not.toContain('TODO_CONTENT_VALIDATION');
    expect(html).not.toContain('avaliar corte');
    expect(html).not.toContain('/tratamentos/crosslinking-corneano/');
  });
}

test('eventos de analytics nunca levam o assunto da página (LGPD)', async ({ page }) => {
  await page.context().addInitScript(() => localStorage.setItem('cemo.consent.v1', 'denied'));
  await page.goto('/condicoes-oculares/descolamento-de-retina/');
  await page.evaluate(() => document.querySelectorAll('a[href^="https://wa.me"], a[href*="whatsapp"]').forEach((a) => a.addEventListener('click', (e) => e.preventDefault())));
  await page.getByRole('link', { name: 'Falar no WhatsApp' }).first().click();
  const layer = JSON.stringify(await page.evaluate(() => (window as Window & { dataLayer?: unknown[] }).dataLayer ?? []));
  expect(layer).toContain('whatsapp_click');
  // O tipo de página (pagina_condicao) pode ir; o assunto (qual condição) nunca.
  expect(layer).not.toMatch(/retina|descolamento|catarata|glaucoma/i);
});

test('vídeo atende pedido de trecho (206) — o Safari do iPhone exige', async ({ request }) => {
  const res = await request.get('/v/especialidades.mp4', { headers: { range: 'bytes=0-1023' } });
  expect(res.status()).toBe(206);
  expect(res.headers()['content-range']).toMatch(/^bytes 0-1023\/\d+$/);
  expect((await res.body()).byteLength).toBe(1024);
});
