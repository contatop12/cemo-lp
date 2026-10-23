// Menu ≠ arquitetura SEO: a mesma URL canônica pode aparecer em mais de um grupo (ex.: Catarata em
// Especialidades e em Cirurgias). Ordem e itens: docs/information-architecture.md §4.1.
import type { NavGroup } from './types';


export const navigation: NavGroup[] = [
  {
    id: 'especialidades',
    label: 'Especialidades',
    kind: 'mega',
    featured: { label: 'Consulta Oftalmológica', href: '/consulta-oftalmologica/' },
    links: [
      { label: 'Catarata', href: '/especialidades/catarata/' },
      { label: 'Cirurgia Refrativa', href: '/especialidades/refrativa/' },
      { label: 'Retina', href: '/especialidades/retina/' },
      { label: 'Glaucoma', href: '/especialidades/glaucoma/' },
      { label: 'Córnea e Ceratocone', href: '/especialidades/cornea/' },
      { label: 'Oftalmopediatria', href: '/especialidades/oftalmopediatria/' },
      { label: 'Estrabismo', href: '/especialidades/estrabismo/' },
      { label: 'Plástica Ocular', href: '/especialidades/plastica-ocular/' },
      { label: 'Lentes de Contato', href: '/especialidades/lentes-de-contato/' },
    ],
    viewAll: { label: 'Ver todas as especialidades', href: '/especialidades/' },
  },
  {
    id: 'cirurgias',
    label: 'Cirurgias e Tratamentos',
    kind: 'mega',
    links: [
      { label: 'Cirurgia de Catarata', href: '/especialidades/catarata/' },
      { label: 'Cirurgia Refrativa', href: '/especialidades/refrativa/' },
      { label: 'Tratamento do Glaucoma', href: '/especialidades/glaucoma/' },
      // TODO_CONTENT_VALIDATION: confirmar se a CEMO realiza crosslinking, anel intraestromal e transplante de córnea
      { label: 'Crosslinking Corneano', href: '/tratamentos/crosslinking-corneano/', published: false },
      { label: 'Anel Intraestromal', href: '/tratamentos/anel-intraestromal/', published: false },
      { label: 'Transplante de Córnea', href: '/tratamentos/transplante-de-cornea/', published: false },
      { label: 'Plástica Ocular', href: '/especialidades/plastica-ocular/' },
    ],
    viewAll: { label: 'Ver todos os tratamentos', href: '/tratamentos/' },
  },
  {
    id: 'exames',
    label: 'Exames',
    kind: 'mega',
    links: [
      { label: 'Mapeamento de Retina', href: '/exames/mapeamento/' },
      { label: 'Campo Visual', href: '/exame-de-campo-visual-o-que-e-para-que-serve-e-como-e-feito/' },
      { label: 'Retinografia', href: '/o-que-voce-precisa-saber-sobre-retinografia/' },
      { label: 'Ceratoscopia (Topografia de Córnea)', href: '/ceratoscopia-para-que-serve-o-exame/' },
      { label: 'Microscopia Especular', href: '/o-que-e-exame-de-microscopia/' },
      { label: 'Curva Tensional Diária', href: '/exame-de-ctd-curva-tensional-diaria-tudo-sobre/' },
      { label: 'Tomografia de Coerência Óptica (OCT)', href: '/exames/tomografia-de-coerencia-optica/' },
      { label: 'Tonometria', href: '/exames/tonometria/' },
      { label: 'Paquimetria', href: '/exames/paquimetria/' },
      { label: 'Gonioscopia', href: '/exames/gonioscopia/' },
      { label: 'Biometria', href: '/exames/biometria/' },
      { label: 'Estereofoto de Papila', href: '/tudo-o-que-voce-precisa-saber-sobre-estereofoto-de-papila/' },
    ],
    viewAll: { label: 'Ver todos os exames', href: '/exames/' },
  },
  { id: 'corpo-clinico', label: 'Corpo Clínico', kind: 'link', href: '/corpo-clinico/', links: [] },
  {
    id: 'conteudos',
    label: 'Conteúdos',
    kind: 'dropdown',
    links: [
      { label: 'Condições Oculares', href: '/condicoes-oculares/' },
      { label: 'Blog', href: '/blog/' },
      { label: 'Ceratocone', href: '/condicoes-oculares/ceratocone/' },
      { label: 'Miopia', href: '/condicoes-oculares/miopia/' },
      { label: 'Hipermetropia', href: '/condicoes-oculares/hipermetropia/' },
      { label: 'Astigmatismo', href: '/condicoes-oculares/astigmatismo/' },
      { label: 'Presbiopia', href: '/presbiopia-entenda-a-vista-cansada-e-suas-opcoes-de-correcao/' },
      { label: 'Degeneração Macular', href: '/condicoes-oculares/degeneracao-macular/' },
    ],
  },
  {
    id: 'a-cemo',
    label: 'A CEMO',
    kind: 'dropdown',
    links: [
      { label: 'Sobre', href: '/sobre/' },
      { label: 'Estrutura e Tecnologia', href: '/estrutura-e-tecnologia/' },
      { label: 'Convênios', href: '/convenios/' },
      { label: 'Contato / Como chegar', href: '/contato/' },
    ],
  },
];
