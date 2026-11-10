// Build e deploy de PRODUÇÃO (https://oftalmologiacemo.com.br) com as variáveis de build fixas.
// O deploy publica o Worker "cemo-producao" COM as rotas do domínio: é ele que substitui o WordPress.
// Voltar ao WordPress: apagar as duas rotas (docs/deploy-cloudflare.md, seção "Produção").
//
// Uso: node scripts/deploy-producao.mjs [--build-only]
import { spawnSync } from 'node:child_process';

const env = {
  ...process.env,
  SITE_ENV: 'production',
  NEXT_PUBLIC_SITE_URL: 'https://oftalmologiacemo.com.br',
  NEXT_PUBLIC_GTM_ID: 'GTM-PH3D5ZS', // mesmo container do WordPress: conversões do Google Ads e pixel da Meta
  NEXT_PUBLIC_META_PIXEL_ID: '423546515361032', // pixel que o WordPress carregava fora do GTM
  CLOUDFLARE_TOKEN_KEY: 'CLOUDFLARE_API_TOKEN_ZONA_CEMO', // o token da conta não tem permissão na zona
};

function run(command) {
  const result = spawnSync(command, { stdio: 'inherit', shell: true, env });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run('node scripts/cloudflare-env.mjs echo verificacao-ok');
run('npm run build');
if (!process.argv.includes('--build-only')) run('node scripts/cloudflare-env.mjs opennextjs-cloudflare deploy --env production');
