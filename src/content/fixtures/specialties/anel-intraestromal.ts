// Trecho sobre anel intraestromal do post crosslinking-corneano-o-tratamento-mais-eficaz-no-controle-da-progressao-do-ceratocone e conhecimento médico geral. Não publicado até a CEMO confirmar o procedimento.
import type { Specialty } from '../../types';

export const anelIntraestromal: Specialty = {
  id: 'anel-intraestromal',
  kind: 'tratamento',
  parentId: 'cornea',
  name: 'Anel Intraestromal',
  shortName: 'Anel intraestromal',
  canonicalPath: '/tratamentos/anel-intraestromal/',
  published: false,
  seo: {
    title: 'Anel intraestromal para ceratocone',
    description:
      'O anel intraestromal regulariza a curvatura da córnea no ceratocone e pode melhorar a visão. Veja para quem é indicado e como é o procedimento.',
  },
  h1: 'Anel intraestromal: o que é e quando é indicado',
  lead: 'No ceratocone, a córnea fica irregular e a visão distorce. O anel intraestromal é um implante que pode ajudar a regularizar o formato da córnea. Entenda para quem é indicado, como funciona e como ele se diferencia do crosslinking.',
  summary: 'Implante de segmentos dentro da córnea para regularizar sua curvatura em casos selecionados de ceratocone.',
  leadInterest: 'cornea',
  ctaLabel: 'Agendar avaliação de ceratocone',
  answer: {
    question: 'O que é o anel intraestromal?',
    text: 'O anel intraestromal é um implante, geralmente em forma de segmentos de arco, colocado dentro da camada intermediária da córnea, o estroma. Ele muda a curvatura da córnea e pode torná-la mais regular, o que em casos selecionados de ceratocone ajuda a melhorar a qualidade da visão. Ele não substitui o crosslinking, que tem outro objetivo, e a indicação depende de exames e da avaliação do oftalmologista.',
  },
  sections: [
    {
      id: 'como-funciona',
      title: 'Como o anel funciona?',
      paragraphs: [
        'No ceratocone, a córnea afina e assume um formato mais cônico, o que causa astigmatismo irregular. Os segmentos do anel são inseridos na espessura da córnea, em um canal criado para recebê-los, e atuam como uma estrutura de apoio que achata e regulariza a superfície.',
        'O material usado é um acrílico transparente e tolerado pelo organismo. No Brasil, esse tipo de anel é conhecido popularmente como anel de Ferrara. Os segmentos têm espessuras e tamanhos diferentes, escolhidos conforme o caso.',
      ],
    },
    {
      id: 'indicacao',
      title: 'Para quem o anel é indicado?',
      paragraphs: [
        'Em geral, é considerado em pessoas com ceratocone em que os óculos e as lentes de contato já não dão um conforto ou uma visão satisfatórios, e cuja córnea tem características adequadas ao implante. Os exames de topografia e paquimetria da córnea orientam essa decisão.',
        'O anel não costuma ser indicado em córneas muito finas, com cicatrizes centrais importantes ou em estágios muito avançados. Nesses casos, o médico avalia outras opções.',
      ],
    },
    {
      id: 'procedimento',
      title: 'Como é o procedimento?',
      paragraphs: [
        'É uma cirurgia ambulatorial, em geral com anestesia por colírio. O canal na córnea pode ser feito com laser de femtossegundo ou com instrumentos próprios, de acordo com a técnica adotada pela equipe. Depois, os segmentos são posicionados, e o médico pode colocar uma lente de contato terapêutica por alguns dias.',
        'Após a cirurgia, há desconforto leve nos primeiros dias, sensibilidade à luz e visão oscilante enquanto a córnea se adapta. O acompanhamento regular é parte do tratamento.',
      ],
    },
    {
      id: 'anel-ou-crosslinking',
      title: 'Anel ou crosslinking?',
      paragraphs: [
        'São procedimentos diferentes, com objetivos diferentes. O crosslinking visa fortalecer a córnea e frear a progressão da doença. O anel visa regularizar o formato e melhorar a visão. Por isso, em alguns casos os dois podem ser combinados, e essa decisão é do oftalmologista.',
        'O anel não elimina a necessidade de óculos ou lentes de contato na maior parte dos casos, mas pode tornar a correção mais fácil e a visão mais estável.',
      ],
    },
    {
      id: 'riscos',
      title: 'Quais são os riscos?',
      paragraphs: [
        'Como toda cirurgia, existem riscos, como infecção, deslocamento ou exposição do segmento, halos e brilho ao redor das luzes e visão que não atinge o esperado. Em alguns casos, o anel pode ser retirado. O médico explica essas possibilidades antes da decisão.',
      ],
    },
  ],
  journey: {
    title: 'Da avaliação ao acompanhamento',
    steps: [
      { title: 'Avaliação e exames', text: 'Topografia, paquimetria e exame clínico mostram o formato e a espessura da córnea.' },
      { title: 'Definição do plano', text: 'O médico explica se o anel, o crosslinking, ambos ou outra opção são indicados.' },
      { title: 'Procedimento', text: 'Quando indicado, o implante é feito conforme a técnica escolhida pela equipe.' },
      { title: 'Acompanhamento', text: 'Retornos periódicos, ajuste de óculos ou lentes e controle da córnea.' },
    ],
  },
  faq: [
    {
      question: 'O anel intraestromal cura o ceratocone?',
      answer: [
        'Não. Ele regulariza o formato da córnea e pode melhorar a visão, mas não corrige a causa da doença. Por isso, o médico pode associar o crosslinking.',
      ],
    },
    {
      question: 'Depois do anel ainda vou precisar de óculos?',
      answer: [
        'Na maior parte dos casos, sim, óculos ou lentes de contato ainda são necessários, embora o grau possa ficar mais fácil de corrigir.',
      ],
    },
    {
      question: 'O anel pode ser retirado?',
      answer: [
        'Em geral, sim. É um procedimento considerado reversível, o que o diferencia de outras cirurgias. Mesmo assim, a retirada depende de avaliação.',
      ],
    },
    {
      question: 'Quem tem ceratocone avançado pode colocar anel?',
      answer: [
        'Depende das características da córnea. Em estágios muito avançados ou com cicatrizes, outras opções, como o transplante, podem ser mais adequadas.',
      ],
    },
  ],
  related: {
    doctors: ['david-ribeiro-de-mendonca-filho'],
    specialties: ['cornea', 'consulta', 'lentes-de-contato'],
    exams: ['ceratoscopia', 'paquimetria'],
    conditions: ['ceratocone'],
    articles: [
      'ceratocone-causa-cegueira',
      'ceratocone-em-criancas',
      'transplante-de-cornea-ceratocone',
      'cross-link-perguntas-frequentes',
    ],
  },
  videoIds: [],
  review: {
    status: 'MEDICAL_REVIEW',
    author: 'Equipe editorial CEMO',
    medicalReviewerSlug: null,
    reviewedAt: null,
    updatedAt: '2026-10-22',
    sources: [],
  },
  todos: [
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO realiza implante de anel intraestromal para publicar a página',
    'TODO_CONTENT_VALIDATION: revisão médica do texto',
    'TODO_CONTENT_VALIDATION: incluir fontes e referências',
    'TODO_CONTENT_VALIDATION: confirmar a técnica usada (laser de femtossegundo ou manual) e o tipo de anel',
    'TODO_CONTENT_VALIDATION: nenhum post consolidado cobre esta página; só um trecho do post de crosslinking cita o anel',
  ],
};
