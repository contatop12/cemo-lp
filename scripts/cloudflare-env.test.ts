// @vitest-environment node
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { findLeakingEnvFiles, selectApiToken } from './cloudflare-env.mjs';

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

  it('acusa segredos de qualquer serviço, não só do Cloudflare (Google, webhook de leads)', () => {
    const dir = project({
      '.env': 'GOOGLE_ADS_CLIENT_SECRET=a\nGOOGLE_ADS_REFRESH_TOKEN=b\nLEAD_WEBHOOK_SECRET=c\nNEXT_PUBLIC_GTM_ID=GTM-X\nSITE_ENV=production\n',
    });
    expect(findLeakingEnvFiles(dir)).toEqual([
      { file: '.env', keys: ['GOOGLE_ADS_CLIENT_SECRET', 'GOOGLE_ADS_REFRESH_TOKEN', 'LEAD_WEBHOOK_SECRET'] },
    ]);
  });

  it('ignora linhas comentadas', () => {
    const dir = project({ '.env': '# CLOUDFLARE_API_TOKEN=antigo\n' });
    expect(findLeakingEnvFiles(dir)).toEqual([]);
  });
});

describe('selectApiToken', () => {
  it('usa o token da chave pedida em CLOUDFLARE_TOKEN_KEY', () => {
    expect(selectApiToken({ CLOUDFLARE_API_TOKEN: 'conta', CLOUDFLARE_API_TOKEN_ZONA: 'zona' }, 'CLOUDFLARE_API_TOKEN_ZONA')).toBe('zona');
  });

  it('sem chave pedida mantém o CLOUDFLARE_API_TOKEN; chave inexistente é erro', () => {
    expect(selectApiToken({ CLOUDFLARE_API_TOKEN: 'conta' }, undefined)).toBe('conta');
    expect(() => selectApiToken({ CLOUDFLARE_API_TOKEN: 'conta' }, 'NAO_EXISTE')).toThrow(/NAO_EXISTE/);
  });
});
