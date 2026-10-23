// Consolida o post tudo-sobre-astigmatismo (e o conteúdo de causas do duplicado de preços), sem texto de preço.
import type { Condition } from '../../types';

export const astigmatismo: Condition = {
  id: 'astigmatismo',
  name: 'Astigmatismo',
  canonicalPath: '/condicoes-oculares/astigmatismo/',
  published: true,
  seo: {
    title: 'Astigmatismo: o que é, sintomas e tratamento',
    description:
      'Entenda o que é astigmatismo, as causas, como aparece a visão borrada ou distorcida e quais opções de correção existem. Saiba quando consultar.',
  },
  h1: 'Astigmatismo: o que é, sintomas e tratamento',
  lead: 'O astigmatismo é um erro de refração muito comum, causado por uma curvatura irregular da córnea. Ele pode deixar a visão borrada ou distorcida, de perto e de longe.',
  summary: 'Erro de refração causado por curvatura irregular da córnea, que distorce a imagem em qualquer distância.',
  answer: {
    question: 'O que é astigmatismo?',
    text: 'Astigmatismo é um erro de refração em que a córnea, a lente transparente na frente do olho, tem curvatura irregular, mais parecida com uma bola de rúgbi do que com uma bola de futebol. Com isso, a luz focaliza em mais de um ponto e a imagem fica borrada ou distorcida, de perto e de longe. Pode existir sozinho ou junto com miopia e hipermetropia. O diagnóstico é feito na consulta oftalmológica, e a correção pode ser feita com óculos, lentes de contato ou, quando há indicação, cirurgia.',
  },
  signs: {
    title: 'Sinais mais comuns',
    intro:
      'Esses sinais podem estar associados a diferentes condições e precisam de avaliação oftalmológica. Eles não servem como diagnóstico.',
    items: [
      'Visão borrada ou com sombras em qualquer distância',
      'Visão dupla ou contornos “duplicados” nas letras',
      'Necessidade de apertar os olhos para enxergar',
      'Dor de cabeça e cansaço visual',
      'Sensibilidade à luz e dificuldade para enxergar à noite',
      'Em crianças, dificuldade de leitura e irritação nos olhos',
    ],
  },
  sections: [
    {
      id: 'o-que-acontece',
      title: 'O que acontece no olho com astigmatismo?',
      paragraphs: [
        'A córnea, junto com o cristalino, é responsável por focalizar a luz na retina. Quando a córnea é regular, ela tem curvatura parecida em todas as direções.',
        'No astigmatismo, uma direção é mais curva que a outra. A luz passa a focalizar em pontos diferentes e a imagem sai distorcida. Pode ser um astigmatismo regular, mais comum e de fácil correção, ou irregular, em que a córnea apresenta alterações mais desiguais.',
      ],
    },
    {
      id: 'causas',
      title: 'Causas e fatores de risco',
      paragraphs: [
        'Na maioria das vezes, o astigmatismo é herdado e está presente desde cedo. Também pode surgir ou mudar depois de condições e eventos que alteram a córnea.',
      ],
      bullets: [
        'Histórico familiar',
        'Trauma ocular ou cicatrizes na córnea',
        'Cirurgias oculares, em alguns casos',
        'Ceratocone, condição em que a córnea afina e se curva',
        'Associação com miopia ou hipermetropia',
      ],
    },
    {
      id: 'diagnostico',
      title: 'Como é feito o diagnóstico?',
      paragraphs: [
        'O oftalmologista mede a acuidade visual e determina o grau por meio da refração. Para entender a forma da córnea, pode usar exames como a ceratoscopia (topografia).',
        'Esses exames são importantes quando o astigmatismo é alto, irregular ou muda rápido, porque ajudam a diferenciar o astigmatismo comum de condições como o ceratocone. Também são necessários antes de uma cirurgia refrativa.',
      ],
    },
    {
      id: 'tratamentos',
      title: 'Quais são as opções de correção?',
      paragraphs: [
        'O objetivo é compensar a irregularidade da córnea para a luz focalizar corretamente. A escolha depende do tipo e do grau, da idade e da saúde do olho.',
      ],
      bullets: [
        'Óculos com lentes que compensam o astigmatismo',
        'Lentes de contato tóricas ou rígidas, indicadas pelo oftalmologista',
        'Cirurgia refrativa a laser, quando a córnea tem indicação',
        'Lente intraocular tórica, associada à cirurgia de catarata em pessoas com astigmatismo',
        'Anel intraestromal, em casos selecionados de astigmatismo irregular associado a ceratocone',
      ],
    },
    {
      id: 'cirurgia',
      title: 'Astigmatismo e cirurgia refrativa',
      paragraphs: [
        'Muitos pacientes perguntam se o astigmatismo pode ser operado. Em alguns casos, a cirurgia a laser pode corrigir ou reduzir o astigmatismo, mas depende do tipo, do grau e da saúde da córnea.',
        'A equipe indica a técnica adequada após a avaliação. Nem todo olho tem indicação, e o cuidado no pós-operatório é parte importante do resultado.',
      ],
    },
    {
      id: 'cuidados',
      title: 'Cuidados e prevenção',
      paragraphs: [
        'Não há como prevenir o astigmatismo hereditário. Evitar coçar os olhos com força e proteger os olhos contra traumas ajuda a reduzir complicações na córnea.',
        'Usar o grau correto, fazer pausas em atividades prolongadas e manter consultas periódicas ajudam a conviver bem com a condição. Bebês e crianças raramente reclamam, por isso o exame de rotina é importante.',
      ],
    },
    {
      id: 'quando-procurar',
      title: 'Quando procurar o oftalmologista?',
      paragraphs: [
        'Procure avaliação se a visão está borrada ou distorcida, se há dor de cabeça frequente ao ler ou se o grau muda com frequência. Para crianças, observe dificuldade na escola, olhos apertados e irritação.',
        'Astigmatismo elevado na infância ou grau que cresce rápido pode precisar de investigação da córnea.',
      ],
    },
  ],
  faq: [
    {
      question: 'Astigmatismo tem cura?',
      answer: [
        'O astigmatismo pode ser corrigido com óculos, lentes ou, em casos selecionados, cirurgia. Se a córnea muda ao longo da vida, o grau também pode mudar. A conduta é definida pelo oftalmologista.',
      ],
    },
    {
      question: 'Astigmatismo causa cegueira?',
      answer: [
        'O astigmatismo comum, quando corrigido, não leva à perda da visão. Em casos associados a outras condições, como o ceratocone, o acompanhamento é importante. Há um artigo no blog dedicado a essa dúvida.',
      ],
    },
    {
      question: 'Qual a diferença entre astigmatismo e miopia?',
      answer: [
        'Na miopia, a imagem se forma antes da retina e a visão de longe fica embaçada. No astigmatismo, a córnea irregular distorce a imagem em qualquer distância. As duas condições podem existir ao mesmo tempo.',
      ],
    },
    {
      question: 'Astigmatismo piora com o tempo?',
      answer: [
        'Pode mudar ao longo da vida. Em crianças e adolescentes, mudanças rápidas merecem avaliação; em adultos, o grau costuma ser mais estável, mas deve ser reavaliado periodicamente.',
      ],
    },
    {
      question: 'Como é o cuidado depois de uma cirurgia de astigmatismo?',
      answer: [
        'Segue as orientações dadas pela equipe médica, incluindo colírios e retornos. O artigo sobre cuidados pós-cirúrgicos explica os pontos gerais.',
      ],
    },
  ],
  related: {
    doctors: ['david-ribeiro-de-mendonca-filho'],
    specialties: ['refrativa', 'cornea'],
    exams: ['ceratoscopia'],
    conditions: ['ceratocone', 'miopia', 'hipermetropia'],
    articles: [
      'a-doenca-de-astigmatismo-pode-causar-cegueira',
      'astigmatismo-cuidados-pos-cirurgicos',
      'astigmatismo-tem-cura',
      'manifestacoes-oculares-com-astigmatismo',
    ],
  },
  review: {
    status: 'MEDICAL_REVIEW',
    author: 'Equipe editorial CEMO',
    medicalReviewerSlug: null,
    reviewedAt: null,
    updatedAt: '2026-10-22',
    sources: [],
  },
  todos: [
    'TODO_CONTENT_VALIDATION: revisão médica do texto',
    'TODO_CONTENT_VALIDATION: incluir fontes e referências',
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO realiza cirurgia refrativa para astigmatismo, implante de lente tórica e anel intraestromal',
  ],
};
