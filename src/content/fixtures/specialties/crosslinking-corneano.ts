// Posts consolidados: crosslinking-cirurgia-de-ceratocone, crosslinking-corneano-o-tratamento-mais-eficaz-no-controle-da-progressao-do-ceratocone, crosslinking-corneano-tratamento-ceratocone, crosslinking-de-cornea, crosslink-corneano-no-cemo. Não publicado até a CEMO confirmar o procedimento.
import type { Specialty } from '../../types';

export const crosslinkingCorneano: Specialty = {
  id: 'crosslinking-corneano',
  kind: 'tratamento',
  parentId: 'cornea',
  name: 'Crosslinking Corneano',
  shortName: 'Crosslinking',
  canonicalPath: '/tratamentos/crosslinking-corneano/',
  published: false,
  seo: {
    title: 'Crosslinking corneano para ceratocone',
    description:
      'O crosslinking corneano busca estabilizar o ceratocone fortalecendo a córnea. Entenda para quem é indicado, como é feito e a recuperação. Agende avaliação.',
  },
  h1: 'Crosslinking corneano: tratamento para estabilizar o ceratocone',
  lead: 'O ceratocone deixa a córnea mais fraca e com formato de cone, e pode piorar com o tempo. O crosslinking corneano é um tratamento que busca fortalecer a córnea para frear essa progressão. Entenda como ele funciona e quando é considerado.',
  summary: 'Tratamento que fortalece o colágeno da córnea para estabilizar a progressão do ceratocone, quando há indicação.',
  leadInterest: 'cornea',
  ctaLabel: 'Agendar avaliação de ceratocone',
  answer: {
    question: 'O que é o crosslinking corneano?',
    text: 'O crosslinking corneano é um procedimento que combina um colírio de riboflavina (vitamina B2) com luz ultravioleta A para criar novas ligações entre as fibras de colágeno da córnea. O objetivo é deixá-la mais resistente e frear a progressão do ceratocone. Ele não cura a doença nem corrige o grau por si só, e a indicação depende da avaliação do oftalmologista.',
  },
  sections: [
    {
      id: 'ceratocone',
      title: 'Por que tratar o ceratocone?',
      paragraphs: [
        'O ceratocone é uma doença em que a córnea, a “janela” transparente na frente do olho, afina e se curva para frente. A visão fica distorcida, com astigmatismo irregular e troca frequente de grau. Costuma ser diagnosticado na adolescência ou no início da vida adulta e, em muitos casos, progride por alguns anos.',
        'Não há cura, mas há formas de acompanhar e controlar a doença. Quanto mais cedo o diagnóstico, maiores as opções para preservar a visão. Esse é o ponto: os óculos e as lentes de contato corrigem a visão, mas não fortalecem a córnea. O crosslinking atua nessa causa.',
      ],
    },
    {
      id: 'como-funciona',
      title: 'Como funciona o crosslinking?',
      paragraphs: [
        'O colágeno é a proteína que dá sustentação à córnea. No ceratocone, essas fibras ficam enfraquecidas. No crosslinking, a córnea recebe riboflavina e é exposta a uma luz ultravioleta A em condições controladas, o que forma novas ligações entre as fibras e aumenta a rigidez do tecido.',
        'O procedimento é feito com anestesia por colírio, em geral sem internação. Existem variações da técnica, com e sem remoção da camada superficial da córnea (o epitélio) e com diferentes protocolos de luz. A equipe indica a técnica após a avaliação.',
      ],
    },
    {
      id: 'indicacao',
      title: 'Para quem o crosslinking é indicado?',
      paragraphs: [
        'Em geral, é considerado quando há ceratocone em progressão, comprovada por exames de mapeamento da córnea feitos ao longo do tempo, e quando a córnea tem espessura suficiente para o procedimento. Também pode ser avaliado em algumas ectasias, que são alterações semelhantes após cirurgias da córnea.',
        'Crianças e adolescentes com ceratocone merecem atenção especial, porque a doença tende a evoluir mais rápido em idades menores.',
      ],
      bullets: [
        'Ceratocone com sinais de progressão nos exames',
        'Ectasia da córnea após cirurgias oculares, em casos selecionados',
        'Córnea com espessura adequada, medida pela paquimetria',
      ],
    },
    {
      id: 'contraindicacoes',
      title: 'Quando o crosslinking pode não ser indicado?',
      paragraphs: [
        'Algumas situações exigem cautela ou contraindicam o procedimento, como infecção ou inflamação ativa da córnea, córnea muito fina, cicatrizes importantes, olho seco intenso ou gestação. Em estágios muito avançados, outros tratamentos podem ser mais adequados.',
        'Por isso, a avaliação com exames é indispensável antes de qualquer decisão.',
      ],
    },
    {
      id: 'recuperacao',
      title: 'Como é a recuperação?',
      paragraphs: [
        'Nos primeiros dias podem ocorrer desconforto, sensação de areia nos olhos, lacrimejamento e sensibilidade à luz, que variam de pessoa para pessoa. Costuma-se usar uma lente de contato terapêutica por alguns dias e colírios receitados pelo médico.',
        'A visão pode ficar embaçada por algum tempo, e a recuperação é gradual, com consultas de acompanhamento. No blog há um artigo com o passo a passo do pós-operatório.',
      ],
    },
    {
      id: 'outros-tratamentos',
      title: 'E se o crosslinking não for indicado?',
      paragraphs: [
        'O tratamento do ceratocone é individualizado e pode combinar mais de uma abordagem: óculos, lentes de contato especiais, crosslinking, implante de anel intraestromal e, nos casos avançados, transplante de córnea. O crosslinking busca estabilizar a doença; as outras opções atuam na correção da visão ou na substituição do tecido.',
      ],
    },
  ],
  journey: {
    title: 'Da avaliação ao acompanhamento',
    steps: [
      { title: 'Avaliação e exames', text: 'O médico examina a córnea e solicita exames como a ceratoscopia (topografia) e a paquimetria.' },
      { title: 'Definição da indicação', text: 'Com os resultados, a equipe explica se há progressão e se o crosslinking é indicado.' },
      { title: 'Procedimento', text: 'Quando indicado, o crosslinking é realizado conforme a técnica escolhida pelo médico.' },
      { title: 'Acompanhamento', text: 'Retornos periódicos conferem a cicatrização e a estabilidade da córnea.' },
    ],
  },
  faq: [
    {
      question: 'O crosslinking cura o ceratocone?',
      answer: [
        'Não. O objetivo é estabilizar a córnea e frear a progressão, o que pode reduzir a chance de evolução para quadros mais graves. Muitos pacientes continuam precisando de óculos ou lentes de contato depois.',
      ],
    },
    {
      question: 'Crosslinking dói?',
      answer: [
        'O procedimento é feito com anestesia local por colírio. Nos primeiros dias depois, pode haver desconforto, e o médico indica colírios e analgésicos quando necessário.',
      ],
    },
    {
      question: 'Quanto tempo dura o procedimento?',
      answer: [
        'Varia com a técnica e o protocolo adotados. O médico informa o tempo previsto na consulta.',
      ],
    },
    {
      question: 'Crosslinking substitui o transplante de córnea?',
      answer: [
        'Em muitos casos, tratar cedo pode reduzir a chance de precisar do transplante, mas não é uma garantia. Em estágios avançados, o transplante pode continuar sendo indicado.',
      ],
    },
    {
      question: 'Criança pode fazer crosslinking?',
      answer: [
        'Pode ser avaliado, e a indicação depende da progressão da doença. Como o ceratocone costuma evoluir mais rápido em idades menores, o acompanhamento oftalmológico regular é importante.',
      ],
    },
  ],
  related: {
    doctors: ['david-ribeiro-de-mendonca-filho'],
    specialties: ['cornea', 'consulta', 'lentes-de-contato'],
    exams: ['ceratoscopia', 'paquimetria', 'microscopia-especular'],
    conditions: ['ceratocone'],
    articles: [
      'pos-operatorio-crosslinking',
      'como-e-feita-a-cirurgia-de-crosslinking',
      'cross-link-perguntas-frequentes',
      'ceratocone-em-criancas',
      'ceratocone-causa-cegueira',
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
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO realiza crosslinking corneano para publicar a página',
    'TODO_CONTENT_VALIDATION: revisão médica do texto',
    'TODO_CONTENT_VALIDATION: incluir fontes e referências',
    'TODO_CONTENT_VALIDATION: os posts antigos descrevem o procedimento como feito na CEMO (técnica, duração, lente terapêutica de 5 a 7 dias); confirmar com o Dr. David antes de citar qualquer um desses dados',
    'TODO_CONTENT_VALIDATION: confirmar o equipamento de luz UVA, a técnica (com ou sem remoção do epitélio) e o local de realização',
    'TODO_CONTENT_VALIDATION: se a CEMO não confirmar, o destino dos 5 posts consolidados passa a ser /especialidades/cornea/',
  ],
};
