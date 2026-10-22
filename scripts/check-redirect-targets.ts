// Informativo (exit 0): lista destinos do mapa de redirects que ainda não existem como rota do app.
// Gate de lançamento: a lista precisa estar vazia antes de apontar o domínio (docs/seo-checklist.md).
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { redirectTables } from '../src/lib/redirects/generated.ts';

const root = process.cwd();

function routeExists(path: string): boolean {
  const file = path === '/' ? 'src/app/page.tsx' : `src/app${path}page.tsx`;
  return existsSync(join(root, file));
}

const targets = [...new Set(Object.values(redirectTables.redirects).map((t) => t.split('?')[0] ?? t))].sort();
const missing = targets.filter((t) => !routeExists(t));

console.log(`${targets.length} destinos únicos; ${targets.length - missing.length} existem; ${missing.length} ainda não existem.`);
for (const path of missing) {
  const sources = Object.entries(redirectTables.redirects)
    .filter(([, to]) => to === path)
    .map(([from]) => from);
  console.log(`  ${path}  ← ${sources.length} origem(ns)`);
}
if (missing.length > 0) {
  console.log('\nATENÇÃO: não aponte o domínio de produção enquanto houver destinos ausentes (gerariam 301 → 404).');
}
