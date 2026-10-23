// Gera as versões web dos vídeos selecionados (briefing §65: nunca servir o .MOV bruto).
//
// Entrada: _materiais/videos/src/<id>.(mov|mp4) (baixados do Drive da CEMO; ver _materiais/videos/drive-ids.txt)
// Saída:   public/videos/<id>.mp4  H.264 + AAC mono, 540×960 (vertical) ou 960×540 (horizontal), 30 fps, faststart
//          public/videos/<id>-poster.jpg  quadro do pôster (o next/image converte para AVIF/WebP)
// Metadados do arquivo original (inclusive localização do iPhone) são descartados (-map_metadata -1).
// Requer ffmpeg no PATH. Uso: node scripts/encode-videos.mjs [id...]
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const SRC = join(root, '_materiais/videos/src');
const OUT = join(root, 'public/videos');
mkdirSync(OUT, { recursive: true });

// id → segundo do pôster (rosto de frente, olhos abertos, fora das cartelas de título).
const VIDEOS = {
  'tudo-em-um-lugar-so': { poster: 2.4, orientation: 'vertical' },
  especialidades: { poster: 2.0, orientation: 'vertical' },
  'exames-que-realizamos': { poster: 2.6, orientation: 'vertical' },
  'dr-adriano-catarata': { poster: 2.2, orientation: 'vertical' },
  'dr-david-oculos': { poster: 6.0, orientation: 'vertical' }, // MOV com rotação -90°: é vertical
  'dra-daniele-calazio': { poster: 6.0, orientation: 'vertical' },
  'dra-daniele-excesso-de-pele': { poster: 6.0, orientation: 'vertical' },
  'dra-daniele-palpebra-caida': { poster: 6.0, orientation: 'vertical' },
  'dra-daniele-vias-lacrimais': { poster: 6.0, orientation: 'vertical' },
};

function ffmpeg(args) {
  const r = spawnSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error(`ffmpeg falhou: ${args.join(' ')}`);
}

const only = process.argv.slice(2);
const sources = readdirSync(SRC);
for (const [id, cfg] of Object.entries(VIDEOS)) {
  if (only.length && !only.includes(id)) continue;
  const file = sources.find((f) => f.replace(/\.[^.]+$/, '') === id);
  if (!file) throw new Error(`Vídeo de origem ausente: ${id}`);
  const input = join(SRC, file);
  const [w, h] = cfg.orientation === 'vertical' ? [540, 960] : [960, 540];
  const scale = `scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},fps=30`;
  const mp4 = join(OUT, `${id}.mp4`);
  if (!existsSync(mp4) || only.length) {
    ffmpeg([
      '-i', input, '-map', '0:v:0', '-map', '0:a:0', '-map_metadata', '-1', '-vf', scale,
      '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow', '-crf', '27', '-pix_fmt', 'yuv420p',
      '-c:a', 'aac', '-ac', '1', '-b:a', '80k', '-movflags', '+faststart', mp4,
    ]);
  }
  ffmpeg(['-ss', String(cfg.poster), '-i', input, '-map_metadata', '-1', '-vf', scale, '-frames:v', '1', '-q:v', '3', join(OUT, `${id}-poster.jpg`)]);
  console.log('ok', id);
}
