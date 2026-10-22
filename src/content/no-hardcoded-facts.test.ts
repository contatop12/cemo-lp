// @vitest-environment node
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Números de prova social, NAP e CRM só podem viver nas fixtures (src/content/fixtures).
const FORBIDDEN = /4,9|2,1 mil|100 mil|\+20|4788-3536|94701-6162|98339|06763/;

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return walk(path);
    return /\.(tsx?|css)$/.test(name) && !/\.test\./.test(name) ? [path] : [];
  });
}

describe('fatos não ficam hardcoded em componentes/páginas', () => {
  const files = ['src/components', 'src/app'].flatMap((d) => walk(join(process.cwd(), d)));

  it('encontra arquivos para varrer', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)('%s não contém números/NAP literais', (file) => {
    const match = readFileSync(file, 'utf8').match(FORBIDDEN);
    expect(match?.[0] ?? null).toBeNull();
  });
});
