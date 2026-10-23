// Envia os vídeos web (media/videos, gerados por scripts/encode-videos.mjs) para o R2 `cemo-videos`.
// Uso (credenciais só do .env.cloudflare): node scripts/cloudflare-env.mjs node scripts/upload-videos.mjs
import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join(process.cwd(), 'media/videos');
const BUCKET = 'cemo-videos';
const TYPES = { mp4: 'video/mp4', webm: 'video/webm' };

const files = readdirSync(DIR).filter((f) => /^[a-z0-9-]+\.(mp4|webm)$/.test(f));
if (files.length === 0) throw new Error('Nada em media/videos: rode node scripts/encode-videos.mjs');
for (const file of files) {
  const type = TYPES[file.split('.').pop()];
  const r = spawnSync(
    'npx',
    ['wrangler', 'r2', 'object', 'put', `${BUCKET}/${file}`, '--file', `media/videos/${file}`, '--content-type', type, '--remote'], // relativo: o caminho do projeto tem espaços
    { stdio: ['ignore', 'pipe', 'inherit'], shell: true },
  );
  if (r.status !== 0) throw new Error(`Falha ao enviar ${file}`);
  console.log('enviado', file);
}
