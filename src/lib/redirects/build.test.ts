// @vitest-environment node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildRedirectTables, normalizePath } from './build';

const CSV = readFileSync(join(process.cwd(), 'docs/seo-migration-map.csv'), 'utf8');

describe('normalizePath', () => {
  it.each([
    ['/EXAME-DE-CAMPO-VISUAL/', '/exame-de-campo-visual/'],
    ['/oftalmologia-cemo', '/oftalmologia-cemo/'],
    ['/slug-/', '/slug/'],
    ['/index.html', '/'],
    ['/a/index.html', '/a/'],
    ['//a//b', '/a/b/'],
    ['/a/b.pdf', '/a/b.pdf'],
    ['/', '/'],
    ['/cirurgia%20refrativa/', '/cirurgia refrativa/'],
    ['/%E0%A4%A/', '/%e0%a4%a/'],
  ])('%s → %s', (input, expected) => {
    expect(normalizePath(input)).toBe(expected);
  });
});

describe('buildRedirectTables (mini-CSV)', () => {
  const mini = [
    'current_url,new_url,action,page_type,clicks,impressions,ctr,position,main_queries,reason,notes',
    'https://oftalmologiacemo.com.br/contato-2/,/contato/,REDIRECT,page,,,,,,dup,',
    'https://www.oftalmologiacemo.com.br/sobre/,/sobre/,REDIRECT,page,,,,,,host,',
    'https://oftalmologiacemo.com.br/tag/x/,,REMOVE,tag,,,,,,fino,"410 Gone: tag fina"',
    'https://oftalmologiacemo.com.br/nada/,,REMOVE,junk,,,,,,lixo,"404 natural (nunca existiu / sem destino)"',
    'https://oftalmologiacemo.com.br/post-a/,/especialidades/catarata/,CONSOLIDATE,post,,,,,,quase duplicado,',
    'https://oftalmologiacemo.com.br/sobre/,/sobre/,KEEP,page,,,,,,ok,',
  ].join('\n');

  it('separa redirects, consolidações, 410 e descarta variações só de host', () => {
    const t = buildRedirectTables(mini);
    expect(t.redirects).toEqual({ '/contato-2/': '/contato/', '/post-a/': '/especialidades/catarata/' });
    expect(t.gone).toEqual(['/tag/x/']);
    expect(t.stats).toEqual({ redirect: 1, consolidate: 1, gone: 1, hostOnlyDropped: 1, naturalNotFound: 1 });
  });
});

describe('buildRedirectTables (CSV real)', () => {
  const t = buildRedirectTables(CSV);
  const entries = Object.entries(t.redirects);

  it('206 URLs com 410 e 4 que viram 404 natural', () => {
    expect(t.stats.gone).toBe(206);
    expect(t.gone).toHaveLength(206);
    expect(t.stats.naturalNotFound).toBe(4);
  });

  it('todas as linhas REDIRECT/CONSOLIDATE viram regra, menos as que só mudam o host', () => {
    // 39 CONSOLIDATE: o post de ultrassonografia virou /exames/ultrassom-ocular/ (ajustes 23/10)
    expect(t.stats.redirect + t.stats.consolidate).toBe(139 + 39 - t.stats.hostOnlyDropped);
    expect(entries).toHaveLength(t.stats.redirect + t.stats.consolidate);
  });

  it('sem self-redirect', () => {
    for (const [from, to] of entries) expect(from).not.toBe(to);
  });

  it('sem cadeias (destino nunca é origem de outro redirect nem 410)', () => {
    const gone = new Set(t.gone);
    for (const [, to] of entries) {
      expect(t.redirects[to]).toBeUndefined();
      expect(gone.has(to)).toBe(false);
    }
  });

  it('destinos relativos, com barra inicial e final', () => {
    for (const [, to] of entries) {
      expect(to.startsWith('http')).toBe(false);
      expect(to).toMatch(/^\/(.*\/)?$/);
    }
  });

  it('exatamente 6 destinos para a Home (nunca "tudo para a Home")', () => {
    expect(entries.filter(([, to]) => to === '/')).toHaveLength(6);
  });
});
