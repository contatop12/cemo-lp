// @vitest-environment node
import { content } from './index';
import { navigation } from './navigation';

describe('navigation', () => {
  it('6 grupos na ordem da arquitetura de informação', () => {
    expect(navigation.map((g) => g.id)).toEqual(['especialidades', 'cirurgias', 'exames', 'corpo-clinico', 'conteudos', 'a-cemo']);
  });

  it('Exames lista 13 exames com as URLs preservadas (OCT e ultrassom incluídos)', () => {
    const exames = navigation.find((g) => g.id === 'exames');
    expect(exames?.links.map((l) => l.href)).toEqual([
      '/exames/mapeamento/',
      '/exame-de-campo-visual-o-que-e-para-que-serve-e-como-e-feito/',
      '/o-que-voce-precisa-saber-sobre-retinografia/',
      '/ceratoscopia-para-que-serve-o-exame/',
      '/o-que-e-exame-de-microscopia/',
      '/exame-de-ctd-curva-tensional-diaria-tudo-sobre/',
      '/exames/tomografia-de-coerencia-optica/',
      '/exames/tonometria/',
      '/exames/paquimetria/',
      '/exames/gonioscopia/',
      '/exames/biometria/',
      '/tudo-o-que-voce-precisa-saber-sobre-estereofoto-de-papila/',
      '/exames/ultrassom-ocular/',
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

  it('Cirurgias e Tratamentos inclui pterígio, calázio, YAG laser e fotocoagulação (ajustes 23/10)', () => {
    const cirurgias = navigation.find((g) => g.id === 'cirurgias');
    const visible = cirurgias?.links.filter((l) => l.published !== false).map((l) => l.href);
    expect(visible).toEqual([
      '/especialidades/catarata/',
      '/especialidades/refrativa/',
      '/especialidades/glaucoma/',
      '/tratamentos/pterigio/',
      '/tratamentos/calazio/',
      '/especialidades/plastica-ocular/',
      '/tratamentos/yag-laser/',
      '/tratamentos/fotocoagulacao-a-laser/',
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

describe('navegação × conteúdo', () => {
  it('todo link publicado do menu aponta para uma página que existe', async () => {
    const { content } = await import('./index');
    const [specialties, exams, conditions, links, posts] = await Promise.all([
      content.listSpecialties(),
      content.listExams(),
      content.listConditions(),
      content.listConditionLinks(),
      content.listPosts(),
    ]);
    const known = new Set([
      '/', '/sobre/', '/estrutura-e-tecnologia/', '/convenios/', '/contato/', '/corpo-clinico/', '/especialidades/', '/tratamentos/',
      '/exames/', '/condicoes-oculares/', '/blog/',
      ...specialties.map((s) => s.canonicalPath),
      ...exams.map((e) => e.canonicalPath),
      ...conditions.map((c) => c.canonicalPath),
      ...links.map((c) => c.href),
      ...posts.map((p) => `/${p.slug}/`),
    ]);
    for (const group of navigation) {
      for (const l of [...group.links, group.viewAll, group.featured, ...(group.href ? [{ href: group.href }] : [])]) {
        if (!l || ('external' in l && l.external) || ('published' in l && l.published === false)) continue;
        expect(known.has(l.href), l.href).toBe(true);
      }
    }
  });
});
