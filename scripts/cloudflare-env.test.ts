// @vitest-environment node
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { findLeakingEnvFiles } from './cloudflare-env.mjs';

function project(files: Record<string, string>) {
  const dir = mkdtempSync(join(tmpdir(), 'cemo-env-'));
  for (const [name, content] of Object.entries(files)) writeFileSync(join(dir, name), content);
  return dir;
}

describe('findLeakingEnvFiles', () => {
  it('acusa credenciais do Cloudflare em arquivos que o Next/OpenNext embutem no Worker', () => {
    const dir = project({
      '.env': 'CLOUDFLARE_API_TOKEN=x\nOUTRA=1\n',
      '.env.local': 'ID_ACCOUNT_CLOUDFLARE=y\n',
      '.env.production': 'SITE_ENV=staging\n',
    });
    expect(findLeakingEnvFiles(dir)).toEqual([
      { file: '.env', keys: ['CLOUDFLARE_API_TOKEN'] },
      { file: '.env.local', keys: ['ID_ACCOUNT_CLOUDFLARE'] },
    ]);
  });

  it('ignora o .env.cloudflare (lido só pelo wrangler) e arquivos sem credenciais', () => {
    const dir = project({ '.env.cloudflare': 'CLOUDFLARE_API_TOKEN=x\n', '.env': 'SITE_ENV=staging\n' });
    expect(findLeakingEnvFiles(dir)).toEqual([]);
  });

  it('ignora linhas comentadas', () => {
    const dir = project({ '.env': '# CLOUDFLARE_API_TOKEN=antigo\n' });
    expect(findLeakingEnvFiles(dir)).toEqual([]);
  });
});
