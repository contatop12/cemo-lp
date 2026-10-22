// @vitest-environment node
import { content } from './index';
import { navigation } from './navigation';

describe('navigation', () => {
  it('6 grupos na ordem da arquitetura de informação', () => {
    expect(navigation.map((g) => g.id)).toEqual(['especialidades', 'cirurgias', 'exames', 'corpo-clinico', 'conteudos', 'a-cemo']);
  });

  it('Exames lista 11 exames com as URLs preservadas', () => {
    const exames = navigation.find((g) => g.id === 'exames');
    expect(exames?.links.map((l) => l.href)).toEqual([
      '/exames/mapeamento/',
      '/exame-de-campo-visual-o-que-e-para-que-serve-e-como-e-feito/',
      '/o-que-voce-precisa-saber-sobre-retinografia/',
      '/ceratoscopia-para-que-serve-o-exame/',
      '/o-que-e-exame-de-microscopia/',
      '/exame-de-ctd-curva-tensional-diaria-tudo-sobre/',
      '/exames/tonometria/',
      '/exames/paquimetria/',
      '/exames/gonioscopia/',
      '/exames/biometria/',
      '/tudo-o-que-voce-precisa-saber-sobre-estereofoto-de-papila/',
    ]);
    expect(exames?.viewAll?.href).toBe('/exames/');
  });

  it('todo link interno começa e termina com barra', () => {
    for (const group of navigation) {
      const links = [...group.links, group.viewAll, group.featured].filter((l) => l && !l.external);
      for (const link of links) expect(link!.href).toMatch(/^\/(.*\/)?$/);
      if (group.href) expect(group.href).toMatch(/^\/(.*\/)?$/);
    }
  });

  it('procedimentos não confirmados ficam ocultos (published:false)', () => {
    const cirurgias = navigation.find((g) => g.id === 'cirurgias');
    const gated = cirurgias?.links.filter((l) => l.published === false).map((l) => l.href);
    expect(gated).toEqual([
      '/tratamentos/crosslinking-corneano/',
      '/tratamentos/anel-intraestromal/',
      '/tratamentos/transplante-de-cornea/',
    ]);
  });

  it('sem caminho repetido dentro de um grupo', () => {
    for (const group of navigation) {
      const hrefs = group.links.map((l) => l.href);
      expect(new Set(hrefs).size).toBe(hrefs.length);
    }
  });

  it('o repositório expõe a navegação', async () => {
    expect(await content.getNavigation()).toBe(navigation);
  });
});
