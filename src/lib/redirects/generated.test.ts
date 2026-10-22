// @vitest-environment node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildRedirectTables } from './build';
import { redirectTables } from './generated';

describe('generated.ts', () => {
  it('está sincronizado com docs/seo-migration-map.csv (rode npm run redirects:generate)', () => {
    const csv = readFileSync(join(process.cwd(), 'docs/seo-migration-map.csv'), 'utf8');
    expect(redirectTables).toEqual(buildRedirectTables(csv));
  });
});
