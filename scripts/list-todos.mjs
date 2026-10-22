// Lista as pendências TODO_CONTENT_VALIDATION de src/ e docs/ (npm run todos). --strict sai com 1 se houver.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const MARK = 'TODO_CONTENT_VALIDATION';

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return walk(path);
    return /\.(tsx?|mjs|md|css)$/.test(name) && !name.endsWith('.test.ts') && !name.endsWith('.test.tsx') ? [path] : [];
  });
}

const byFile = new Map();
for (const file of ['src', 'docs'].flatMap((d) => walk(join(root, d)))) {
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      if (!line.includes(MARK)) return;
      const rel = relative(root, file).replaceAll('\\', '/');
      if (!byFile.has(rel)) byFile.set(rel, []);
      byFile.get(rel).push(`  ${i + 1}: ${line.trim().slice(0, 160)}`);
    });
}

const total = [...byFile.values()].reduce((n, lines) => n + lines.length, 0);
console.log(`${total} pendência(s) ${MARK} em ${byFile.size} arquivo(s)\n`);
for (const [file, lines] of [...byFile.entries()].sort()) {
  console.log(file);
  console.log(lines.join('\n'));
}
if (process.argv.includes('--strict') && total > 0) process.exit(1);
