// Gera src/lib/redirects/generated.ts a partir de docs/seo-migration-map.csv (npm run redirects:generate).
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildRedirectTables } from '../src/lib/redirects/build.ts';

const root = process.cwd();
const csv = readFileSync(join(root, 'docs/seo-migration-map.csv'), 'utf8');
const tables = buildRedirectTables(csv);

const body = `// GERADO por scripts/generate-redirects.ts a partir de docs/seo-migration-map.csv — não editar à mão.
// Para mudar um redirect: edite o CSV e rode \`npm run redirects:generate\`.
import type { RedirectTables } from './build.ts';

export const redirectTables: RedirectTables = ${JSON.stringify(tables, null, 2)};
`;

writeFileSync(join(root, 'src/lib/redirects/generated.ts'), body);
console.log(
  `ok: ${Object.keys(tables.redirects).length} redirects (${tables.stats.redirect} REDIRECT + ${tables.stats.consolidate} CONSOLIDATE), ` +
    `${tables.gone.length} x 410, ${tables.stats.hostOnlyDropped} só-host, ${tables.stats.naturalNotFound} 404 natural`,
);
