import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';


const csv = readFileSync(join(process.cwd(), 'docs/seo-migration-map.csv'), 'utf8');
const firstTag = csv.match(/https:\/\/oftalmologiacemo\.com\.br(\/tag\/[^,"]+\/),,REMOVE/)?.[1];

async function head(request: import('@playwright/test').APIRequestContext, path: string) {
  const res = await request.get(path, { maxRedirects: 0 });
  return { status: res.status(), location: res.headers()['location'] ?? null };
}

test('301 para o destino do mapa, em um salto, preservando a query', async ({ request }) => {
  expect(await head(request, '/contato-2/')).toEqual({ status: 301, location: '/contato/' });
  expect(await head(request, '/contato-2/?utm_source=x')).toEqual({ status: 301, location: '/contato/?utm_source=x' });
  expect(await head(request, '/CONTATO-2')).toEqual({ status: 301, location: '/contato/' });
  expect(await head(request, '/exames/lentes/')).toEqual({ status: 301, location: '/especialidades/lentes-de-contato/' });
});

test('410 para URLs removidas', async ({ request }) => {
  expect((await head(request, '/post-list/')).status).toBe(410);
  expect(firstTag).toBeTruthy();
  expect((await head(request, firstTag!)).status).toBe(410);
});

test('arquivos e assets nunca são redirecionados', async ({ request }) => {
  expect((await head(request, '/robots.txt')).status).toBe(200);
  expect((await head(request, '/_next/static/nao-existe.js')).status).toBe(404);
});
