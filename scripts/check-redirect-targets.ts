// Gate de lançamento: todo destino do mapa de redirects precisa ser uma rota gerada pelo build (senão 301 → 404).
// Lê .next/prerender-manifest.json (rode `npm run build` antes). Sai com código 1 se faltar destino.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { redirectTables } from '../src/lib/redirects/generated.ts';

const root = process.cwd();
const manifestPath = join(root, '.next/prerender-manifest.json');
if (!existsSync(manifestPath)) {
  console.error('Sem build: rode `npm run build` (ou `npx next build`) antes desta checagem.');
  process.exit(1);
}
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as { routes: Record<string, unknown> };
const built = new Set(Object.keys(manifest.routes).map((r) => (r === '/' ? '/' : `${r.replace(/\/$/, '')}/`)));

const targets = [...new Set(Object.values(redirectTables.redirects).map((t) => (t.split('?')[0] ?? t).split('#')[0] ?? t))].sort();
const missing = targets.filter((t) => !built.has(t));

console.log(`${targets.length} destinos únicos; ${targets.length - missing.length} gerados pelo build; ${missing.length} ausentes.`);
for (const path of missing) {
  const sources = Object.entries(redirectTables.redirects)
    .filter(([, to]) => to === path)
    .map(([from]) => from);
  console.log(`  ${path}  ← ${sources.length} origem(ns)`);
}
if (missing.length > 0) {
  console.log('\nNão aponte o domínio de produção enquanto houver destinos ausentes (gerariam 301 → 404).');
  process.exit(1);
}
