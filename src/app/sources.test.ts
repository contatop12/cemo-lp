// @vitest-environment node
// O Tailwind v4 não lê arquivos ignorados pelo git: uma regra larga no .gitignore (ex.: "media/") tirava do CSS as
// classes de src/components/media/ e deixava src/lib/media/ fora do repositório.
import { execFileSync } from 'node:child_process';

describe('código-fonte', () => {
  it('nenhum arquivo de src/ é ignorado pelo git', () => {
    const ignored = execFileSync('git', ['ls-files', '--others', '--ignored', '--exclude-standard', '--directory', 'src'], { encoding: 'utf8' });
    const trackedButIgnored = execFileSync('git', ['ls-files', '--cached', '--ignored', '--exclude-standard', 'src'], { encoding: 'utf8' });
    expect(ignored.trim()).toBe('');
    expect(trackedButIgnored.trim()).toBe('');
  });
});
