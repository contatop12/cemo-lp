import { expect, test, type Page } from '@playwright/test';


const STUB = 'http://localhost:3199';
type Received = Array<{ headers: Record<string, string>; body: Record<string, unknown> & { attribution: Record<string, string> } }>;

test.beforeEach(async ({ context, request }) => {
  await request.delete(`${STUB}/received`);
  await context.addInitScript(() => localStorage.setItem('cemo.consent.v1', 'denied'));
});

async function fill(page: Page) {
  const form = page.locator('#agendar form');
  await form.getByLabel(/^Nome/).fill('Maria da Silva');
  await form.getByLabel(/^WhatsApp/).fill('(11) 91234-5678');
  await form.getByLabel(/O que você está buscando\?/).selectOption('catarata');
  return form;
}

test('caminho feliz: lead registrado com atribuição e sem dados pessoais no dataLayer', async ({ page, request }) => {
  await page.goto('/?utm_source=teste&gclid=abc');
  const form = await fill(page);
  await form.getByRole('button', { name: 'Solicitar contato' }).click();
  await expect(page).toHaveURL(/\/obrigado\/$/);
  const received = (await (await request.get(`${STUB}/received`)).json()) as Received;
  expect(received).toHaveLength(1);
  const [lead] = received;
  expect(lead!.headers['x-webhook-secret']).toBe('test-secret');
  expect(lead!.body).toMatchObject({ whatsapp: '5511912345678', interest: 'catarata', source: 'cemo-site' });
  expect(lead!.body.attribution.utm_source).toBe('teste');
  expect(lead!.body.attribution.gclid).toBe('abc');
  expect(lead!.body.attribution.landingPage).toBe('/?utm_source=teste&gclid=abc');
});

test('dataLayer recebe só eventos genéricos', async ({ page }) => {
  await page.goto('/');
  const form = await fill(page);
  await form.getByRole('button', { name: 'Solicitar contato' }).click();
  await expect(page).toHaveURL(/\/obrigado\/$/);
  const dataLayer = await page.evaluate(() => JSON.stringify((window as unknown as { dataLayer: unknown[] }).dataLayer));
  expect(dataLayer).not.toMatch(/Maria|91234|catarata/);
});

test('validação: resumo de erros com foco e mensagem de telefone', async ({ page }) => {
  await page.goto('/');
  const form = page.locator('#agendar form');
  await form.getByLabel(/^WhatsApp/).fill('1234');
  await form.getByRole('button', { name: 'Solicitar contato' }).click();
  const summary = form.getByRole('alert');
  await expect(summary).toBeFocused();
  await expect(form.getByText('Informe um telefone com DDD, por exemplo (11) 91234-5678').first()).toBeVisible();
});

test('honeypot preenchido: 200 sem registrar lead', async ({ request }) => {
  const res = await request.post('/api/lead/', {
    headers: { 'content-type': 'application/json', origin: 'http://localhost:3100' },
    data: { name: 'Robô', whatsapp: '11912345678', interest: 'outro', website: 'http://spam.example' },
  });
  expect(res.status()).toBe(200);
  expect(await (await request.get(`${STUB}/received`)).json()).toEqual([]);
});

test('sem webhook em produção: falha fechada com alternativa no WhatsApp', async ({ page, request }) => {
  const api = await request.post('http://localhost:3101/api/lead/', {
    headers: { 'content-type': 'application/json', origin: 'http://localhost:3100' },
    data: { name: 'Maria da Silva', whatsapp: '11912345678', interest: 'catarata' },
  });
  expect(api.status()).toBe(503);
  await page.goto('http://localhost:3101/');
  const form = await fill(page);
  await form.getByRole('button', { name: 'Solicitar contato' }).click();
  await expect(form.getByRole('link', { name: 'Falar no WhatsApp' })).toBeVisible();
  await expect(page).not.toHaveURL(/obrigado/);
});

test('rate limit: requisições seguidas do mesmo cliente terminam em 429', async ({ request }) => {
  const statuses: number[] = [];
  for (let i = 0; i < 7; i++) {
    const res = await request.post('/api/lead/', {
      headers: { 'content-type': 'application/json', origin: 'http://localhost:3100' },
      data: { name: 'Teste', whatsapp: '1234', interest: 'outro' },
    });
    statuses.push(res.status());
  }
  expect(statuses.at(-1)).toBe(429);
});
