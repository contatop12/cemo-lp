// Executa um comando com as credenciais de deploy do Cloudflare carregadas de `.env.cloudflare`.
//
// Por que não `.env`: o OpenNext embute no Worker publicado TODOS os valores de .env, .env.local,
// .env.production e .env.production.local (.open-next/cloudflare/next-env.mjs). Um token de API ali
// iria parar dentro do código do site. Este script recusa rodar se encontrar credenciais nesses arquivos.
//
// Uso: node scripts/cloudflare-env.mjs <comando> [args...]
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Arquivos que o Next e o OpenNext leem no build (modo production).
const BUNDLED_ENV_FILES = ['.env', '.env.local', '.env.production', '.env.production.local'];
// Qualquer credencial, não só do Cloudflare: tokens do Google, segredo do webhook de leads etc.
const CREDENTIAL_KEY = /^\s*(?:export\s+)?([A-Z0-9_]*(?:CLOUDFLARE|TOKEN|SECRET|PASSWORD|API_KEY|PRIVATE_KEY|ACCESS_KEY)[A-Z0-9_]*)\s*=/gm;

export function findLeakingEnvFiles(dir) {
  return BUNDLED_ENV_FILES.flatMap((file) => {
    const path = join(dir, file);
    if (!existsSync(path)) return [];
    const keys = [...readFileSync(path, 'utf8').matchAll(CREDENTIAL_KEY)].map((m) => m[1]);
    return keys.length > 0 ? [{ file, keys }] : [];
  });
}

// CLOUDFLARE_TOKEN_KEY escolhe outro token do .env.cloudflare (ex.: o que tem permissão na zona do domínio).
export function selectApiToken(env, key) {
  if (!key) return env.CLOUDFLARE_API_TOKEN;
  if (!env[key]) throw new Error(`Token ${key} não encontrado no .env.cloudflare`);
  return env[key];
}

function main() {
  const root = process.cwd();
  const leaks = findLeakingEnvFiles(root);
  if (leaks.length > 0) {
    console.error('Deploy bloqueado: credenciais em arquivos que seriam embutidos no Worker:');
    for (const { file, keys } of leaks) console.error(`  ${file}: ${keys.join(', ')}`);
    console.error('Mova essas variáveis para .env.cloudflare (deploy) ou .env.google (scripts locais).');
    process.exit(1);
  }

  const credentials = join(root, '.env.cloudflare');
  if (existsSync(credentials)) process.loadEnvFile(credentials);
  else console.warn('Aviso: .env.cloudflare não encontrado — usando o login do wrangler ou variáveis do sistema.');
  process.env.CLOUDFLARE_API_TOKEN = selectApiToken(process.env, process.env.CLOUDFLARE_TOKEN_KEY);

  const [command, ...args] = process.argv.slice(2);
  if (!command) {
    console.error('Uso: node scripts/cloudflare-env.mjs <comando> [args...]');
    process.exit(1);
  }
  const result = spawnSync(command, args, { stdio: 'inherit', shell: true, env: process.env });
  process.exit(result.status ?? 1);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
