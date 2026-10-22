// Converte docs/seo-migration-map.csv em tabelas de redirect/410. Puro (sem fs); usado pelo gerador e pelos testes.
// Extensões .ts explícitas: o gerador roda direto no Node (type-stripping).
import { parse } from 'csv-parse/sync';
import { normalizePath } from './normalize.ts';

export { normalizePath } from './normalize.ts';

export interface RedirectTables {
  redirects: Record<string, string>;
  gone: string[];
  // hostOnlyDropped: linhas que a normalização já cobre — mesma URL com outro host (www.), outra caixa,
  // sem barra final, ou duplicata de uma chave já mapeada para o mesmo destino.
  stats: { redirect: number; consolidate: number; gone: number; hostOnlyDropped: number; naturalNotFound: number };
}

interface MigrationRow {
  current_url: string;
  new_url: string;
  action: string;
  notes: string;
}

function pathOf(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

export function buildRedirectTables(csvText: string): RedirectTables {
  const rows = parse(csvText, { columns: true, skip_empty_lines: true, bom: true }) as MigrationRow[];
  const tables: RedirectTables = {
    redirects: {},
    gone: [],
    stats: { redirect: 0, consolidate: 0, gone: 0, hostOnlyDropped: 0, naturalNotFound: 0 },
  };
  const gone = new Set<string>();

  for (const row of rows) {
    const action = row.action.trim().toUpperCase();
    const from = normalizePath(pathOf(row.current_url.trim()));
    const to = row.new_url.trim();

    if ((action === 'REDIRECT' || action === 'CONSOLIDATE') && to) {
      const existing = tables.redirects[from];
      if (from === normalizePath(to) || existing === to) {
        tables.stats.hostOnlyDropped++;
        continue;
      }
      if (existing !== undefined) {
        throw new Error(`Conflito no mapa de migração: ${from} → ${existing} e ${to}`);
      }
      tables.redirects[from] = to;
      if (action === 'REDIRECT') tables.stats.redirect++;
      else tables.stats.consolidate++;
    } else if (action === 'REMOVE') {
      if (/^410/.test(row.notes.trim())) {
        if (!gone.has(from)) {
          gone.add(from);
          tables.gone.push(from);
        }
        tables.stats.gone++;
      } else {
        tables.stats.naturalNotFound++;
      }
    }
  }

  tables.gone.sort();
  return tables;
}
