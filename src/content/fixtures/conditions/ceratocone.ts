// Consolida os posts o-que-e-ceratocone, causas-e-tratamentos-da-ceratocone, sintomas-e-tratamento-para-ceratocone e opcoes-de-tratamento-para-o-ceratocone.
import type { Condition } from '../../types';

export const ceratocone: Condition = {
  id: 'ceratocone',
  name: 'Ceratocone',
  canonicalPath: '/condicoes-oculares/ceratocone/',
  published: true,
  seo: {
    title: 'Ceratocone: o que é, sinais e tratamento',
    description:
      'Entenda o que é o ceratocone, quais sinais merecem atenção, como é feito o diagnóstico e quais tratamentos existem. Para conversar com o médico.',
  },
  h1: 'Ceratocone: o que é, sinais e tratamento',
  lead: 'O ceratocone é uma condição da córnea que costuma aparecer na adolescência ou no início da vida adulta e pode distorcer a visão. Aqui você entende como ela funciona, como é investigada e quais caminhos de tratamento existem.',
  summary: 'Condição em que a córnea afina e se curva para frente, deixando a visão distorcida; precisa de acompanhamento oftalmológico.',
  answer: {
    question: 'O que é ceratocone?',
    text: 'Ceratocone é uma condição não inflamatória em que a córnea, a “janela” transparente na frente do olho, vai ficando mais fina e se curva para frente, em formato de cone. Isso deixa a visão embaçada e distorcida, muitas vezes com mudanças frequentes no grau dos óculos. Costuma começar na adolescência ou no início da vida adulta. O diagnóstico é feito pelo oftalmologista, com exames da forma da córnea, e o tratamento depende da fase em que a condição está.',
  },
  signs: {
    title: 'Sinais que merecem atenção',
    intro:
      'Esses sinais podem estar associados a diferentes condições e precisam de avaliação oftalmológica. Eles não servem como diagnóstico.',
    items: [
      'Visão embaçada ou distorcida, de longe e de perto',
      'Troca frequente do grau dos óculos ou lentes que não resolvem a nitidez',
      'Aumento rápido de miopia ou de astigmatismo',
      'Sensibilidade à luz e halos ao redor das luzes',
      'Visão dupla com um olho só',
      'Coceira intensa nos olhos e hábito de esfregá-los',
      'Lentes de contato que deixam de se adaptar bem',
    ],
  },
  sections: [
    {
      id: 'como-acontece',
      title: 'Como o ceratocone acontece?',
      paragraphs: [
        'A córnea é formada por fibras de colágeno que mantêm a curvatura regular e a transparência. No ceratocone, essa estrutura se enfraquece e a córnea cede aos poucos, ficando mais fina e mais curva na região central ou um pouco abaixo dela.',
        'Com isso, a luz deixa de se focalizar de forma uniforme na retina. O resultado é um astigmatismo irregular, que os óculos comuns nem sempre conseguem corrigir por completo.',
        'A evolução varia muito de pessoa para pessoa. Em alguns casos ela é lenta e se estabiliza; em outros, avança mais rápido, principalmente em jovens. Por isso o acompanhamento regular faz diferença.',
      ],
    },
    {
      id: 'causas-e-fatores-de-risco',
      title: 'Causas e fatores de risco',
      paragraphs: [
        'A causa exata ainda não é totalmente conhecida. Acredita-se que fatores genéticos e ambientais se combinam, e pode haver casos na mesma família.',
        'Alguns fatores são associados a um risco maior ou a uma evolução mais rápida:',
      ],
      bullets: [
        'Histórico familiar de ceratocone',
        'Alergias oculares, que levam a coçar os olhos com frequência',
        'Hábito de esfregar os olhos com força',
        'Córnea naturalmente mais fina',
        'Astigmatismo irregular ou aumento rápido do grau na adolescência',
      ],
    },
    {
      id: 'diagnostico',
      title: 'Como é feito o diagnóstico?',
      paragraphs: [
        'O ceratocone pode passar despercebido num exame simples de grau. Quando há suspeita, o oftalmologista pede exames que mapeiam a forma da córnea, como a ceratoscopia (topografia), e que medem sua espessura, como a paquimetria.',
        'Esses exames mostram a curvatura e a espessura de cada região da córnea e permitem classificar a fase da condição e acompanhar se ela está avançando. A avaliação inclui ainda o histórico do paciente e do uso de óculos e lentes.',
        'Quem tem astigmatismo elevado na infância ou adolescência, ou histórico familiar, costuma ser orientado a fazer esses exames de forma preventiva.',
      ],
    },
    {
      id: 'tratamentos',
      title: 'Quais tratamentos existem?',
      paragraphs: [
        'Não há um tratamento único: a escolha depende da fase, da idade, da espessura da córnea e da visão de cada pessoa. Em termos gerais, as opções descritas na literatura médica são:',
      ],
      bullets: [
        'Óculos de grau, em fases iniciais, para melhorar a nitidez',
        'Lentes de contato especiais (rígidas, esclerais, híbridas ou de sistemas combinados), que regularizam a superfície da córnea e melhoram a visão',
        'Crosslinking corneano, procedimento que busca fortalecer o colágeno da córnea para frear a evolução',
        'Anel intraestromal, segmentos colocados na córnea para remodelar sua forma em casos selecionados',
        'Transplante de córnea, reservado a casos avançados em que as demais opções já não atendem',
      ],
    },
    {
      id: 'cuidados',
      title: 'Convivência e cuidados no dia a dia',
      paragraphs: [
        'Evitar coçar e esfregar os olhos é uma das orientações mais importantes, porque o atrito repetido pode contribuir para o afinamento da córnea. Se há coceira, vale tratar a causa, como a alergia, com orientação médica.',
        'Também ajuda manter as consultas de acompanhamento, usar óculos de sol com proteção contra raios ultravioleta e não trocar de lente de contato sem avaliação. Colírios só devem ser usados com indicação do oftalmologista.',
        'Pais de crianças e adolescentes com ceratocone na família podem conversar com o médico sobre quando começar o acompanhamento.',
      ],
    },
    {
      id: 'quando-procurar',
      title: 'Quando procurar o oftalmologista?',
      paragraphs: [
        'Procure avaliação se a visão está distorcida mesmo com óculos, se o grau muda com muita frequência, se há sensibilidade à luz nova ou se uma lente de contato deixou de se adaptar. Quem já tem o diagnóstico deve manter o acompanhamento periódico, mesmo sem sintomas novos.',
        'Se houver dor forte, olho muito vermelho ou queda brusca da visão, procure atendimento oftalmológico sem esperar a consulta de rotina.',
      ],
    },
    {
      id: 'cirurgia-refrativa',
      title: 'Ceratocone e cirurgia refrativa',
      paragraphs: [
        'A cirurgia refrativa a laser modifica a córnea, por isso o ceratocone, ou a suspeita dele, é uma contraindicação importante a esse tipo de procedimento. O exame de topografia antes da cirurgia serve justamente para identificar esses casos.',
        'Quem deseja deixar de usar óculos deve passar por avaliação completa: nem todo olho tem indicação.',
      ],
    },
  ],
  faq: [
    {
      question: 'Ceratocone tem cura?',
      answer: [
        'Não há cura no sentido de fazer a córnea voltar ao formato original. O que existe são tratamentos que buscam melhorar a visão e, em muitos casos, controlar a evolução da condição.',
        'Com acompanhamento adequado, muitas pessoas mantêm boa visão no dia a dia. O plano é definido pelo oftalmologista após a avaliação.',
      ],
    },
    {
      question: 'Ceratocone pode causar cegueira?',
      answer: [
        'A perda total de visão é incomum, e há várias opções de tratamento antes dos casos mais avançados. O importante é o diagnóstico e o acompanhamento. Você pode ler mais no artigo dedicado a essa dúvida.',
      ],
    },
    {
      question: 'Quem tem ceratocone pode usar lente de contato?',
      answer: [
        'Em muitos casos, sim, e as lentes especiais costumam dar uma visão mais nítida que os óculos. O tipo de lente e a adaptação precisam ser indicados pelo oftalmologista, porque a córnea tem forma irregular.',
      ],
    },
    {
      question: 'Coçar os olhos causa ceratocone?',
      answer: [
        'Coçar não é considerado a única causa, mas o atrito frequente é associado ao agravamento. Por isso recomenda-se evitar esfregar os olhos e tratar alergias.',
      ],
    },
    {
      question: 'Ceratocone é hereditário?',
      answer: [
        'Há influência genética e casos familiares, mas nem todo parente de uma pessoa com ceratocone desenvolve a condição. Parentes próximos podem ser orientados a fazer exame de topografia.',
      ],
    },
  ],
  related: {
    doctors: ['david-ribeiro-de-mendonca-filho'],
    specialties: ['cornea', 'lentes-de-contato', 'refrativa'],
    exams: ['ceratoscopia', 'paquimetria'],
    conditions: ['astigmatismo', 'miopia'],
    articles: [
      'ceratocone-causa-cegueira',
      'ceratocone-em-criancas',
      'transplante-de-cornea-ceratocone',
      'como-e-feita-a-cirurgia-de-crosslinking',
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
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO realiza crosslinking, anel intraestromal e transplante de córnea (o texto os cita só em termos gerais)',
    'TODO_CONTENT_VALIDATION: confirmar quais tipos de lente de contato especial a CEMO adapta',
  ],
};
