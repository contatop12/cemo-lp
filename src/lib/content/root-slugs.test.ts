// @vitest-environment node
import { assertRootSlugs } from './root-slugs';

describe('slugs na raiz (posts + exames em slug de artigo)', () => {
  it('aceita slugs únicos e não reservados', () => {
    expect(assertRootSlugs(['campo-visual-x', 'post-a'])).toEqual(['campo-visual-x', 'post-a']);
  });

  it('falha o build quando dois conteúdos disputam a mesma URL', () => {
    expect(() => assertRootSlugs(['post-a', 'post-a'])).toThrow(/post-a/);
  });

  it('falha o build quando um slug colide com rota estática', () => {
    expect(() => assertRootSlugs(['blog'])).toThrow(/blog/);
  });
});
