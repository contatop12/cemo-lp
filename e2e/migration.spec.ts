import { expect, test } from '@playwright/test';
import { parse } from 'csv-parse/sync';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Teste automatizado de migração (briefing §147): toda URL relevante do WordPress responde 200 na aplicação nova OU
// 301 em UM salto para um destino que responde 200; tags/listas removidas respondem 410. Nenhum 404 acidental.
interface Row {
  current_url: string;
  new_url: string;
  action: 'KEEP' | 'UPDATE' | 'CONSOLIDATE' | 'REDIRECT' | 'REMOVE';
}
const rows = parse(readFileSync(join(process.cwd(), 'docs/seo-migration-map.csv')), { columns: true }) as Row[];
const pathOf = (url: string) => new URL(url).pathname;
const onSiteHost = (r: Row) => /^https:\/\/oftalmologiacemo\.com\.br\//.test(r.current_url);

test.describe.configure({ mode: 'serial' });
test.setTimeout(240_000);

test('KEEP/UPDATE: a mesma URL responde 200 (sem redirecionar)', async ({ request }) => {
  const failures: string[] = [];
  for (const r of rows.filter((r) => (r.action === 'KEEP' || r.action === 'UPDATE') && onSiteHost(r))) {
    const path = pathOf(r.current_url);
    const res = await request.get(path, { maxRedirects: 0 });
    if (res.status() !== 200) failures.push(`${path} → ${res.status()}`);
  }
  expect(failures).toEqual([]);
});

test('REDIRECT/CONSOLIDATE: 301 em um salto para um destino 200', async ({ request }) => {
  const failures: string[] = [];
  const checked = new Map<string, number>();
  for (const r of rows.filter((r) => (r.action === 'REDIRECT' || r.action === 'CONSOLIDATE') && onSiteHost(r))) {
    const path = pathOf(r.current_url);
    const res = await request.get(path, { maxRedirects: 0 });
    const location = res.headers()['location'] ?? '';
    if (res.status() !== 301) {
      failures.push(`${path} → ${res.status()} (esperado 301)`);
      continue;
    }
    const target = new URL(location, 'http://localhost').pathname;
    if (!checked.has(target)) checked.set(target, (await request.get(target, { maxRedirects: 0 })).status());
    if (checked.get(target) !== 200) failures.push(`${path} → ${target} → ${checked.get(target)}`);
  }
  expect(failures).toEqual([]);
});

test('REMOVE: 410 (ou 404 natural para URLs só do GSC sem correspondente)', async ({ request }) => {
  const failures: string[] = [];
  for (const r of rows.filter((r) => r.action === 'REMOVE' && onSiteHost(r))) {
    const path = pathOf(r.current_url);
    const res = await request.get(path, { maxRedirects: 0 });
    let status = res.status();
    // URL malformada sem barra final: o proxy só normaliza (301 para a mesma URL com barra) e aí vem o 404/410.
    const location = res.headers()['location'] ?? '';
    if (status === 301 && location.replace(/\/$/, '') === path.replace(/\/$/, '')) status = (await request.get(location, { maxRedirects: 0 })).status();
    if (status !== 410 && status !== 404) failures.push(`${path} → ${status}`);
  }
  expect(failures).toEqual([]);
});

test('imagens migradas continuam no mesmo caminho /wp-content/uploads/', async ({ request }) => {
  const res = await request.get('/wp-content/uploads/2023/03/hipermetropia1-freepik.jpg');
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('image/');
});
