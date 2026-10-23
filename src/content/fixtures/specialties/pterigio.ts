// Texto novo, em termos gerais; fato da CEMO (realiza cirurgia de pterígio) vem do documento de ajustes de 23/10/2026. Sem post de pterígio no índice.
import type { Specialty } from '../../types';

export const pterigio: Specialty = {
  id: 'pterigio',
  kind: 'tratamento',
  treatmentType: 'cirurgia',
  parentId: 'cornea',
  name: 'Cirurgia de Pterígio',
  shortName: 'Pterígio',
  canonicalPath: '/tratamentos/pterigio/',
  published: true,
  seo: {
    title: 'Cirurgia de pterígio em Taboão da Serra',
    description:
      'Entenda o que é o pterígio, quando a cirurgia é considerada, como costuma ser feita e quais cuidados vêm depois. Avaliação na CEMO.',
  },
  h1: 'Cirurgia de pterígio em Taboão da Serra',
  lead: 'O pterígio é um crescimento de tecido sobre a córnea, muitas vezes chamado de “carne crescida” no olho. Entenda o que está associado a ele, quando a cirurgia é considerada e como é a jornada na CEMO.',
  summary: 'Avaliação do pterígio e cirurgia para retirar o tecido que cresce sobre a córnea, quando há indicação médica.',
  leadInterest: 'cornea',
  ctaLabel: 'Agendar avaliação de pterígio',
  answer: {
    question: 'O que é o pterígio e quando operar?',
    text: 'O pterígio é um crescimento de tecido da conjuntiva, a membrana que reveste o “branco do olho”, que avança sobre a córnea. Costuma aparecer no canto do olho próximo ao nariz. Nem todo pterígio precisa de cirurgia: o oftalmologista avalia o tamanho, o crescimento, os sintomas e o efeito na visão. Quando há indicação, a cirurgia retira o tecido, e a equipe explica os cuidados e a possibilidade de o pterígio voltar.',
  },
  signs: {
    title: 'Sinais que merecem avaliação',
    intro: 'Esses sinais podem estar associados a diferentes condições e precisam de avaliação oftalmológica:',
    items: [
      'Tecido avermelhado ou esbranquiçado que avança do canto do olho em direção à córnea',
      'Olho vermelho ou irritado com frequência',
      'Sensação de areia, queimação ou corpo estranho',
      'Lacrimejamento e sensibilidade à luz',
      'Visão embaçada ou distorcida, principalmente quando o tecido se aproxima do centro da córnea',
      'Incômodo estético que atrapalha o dia a dia',
    ],
  },
  sections: [
    {
      id: 'o-que-e',
      title: 'O que é o pterígio?',
      paragraphs: [
        'A conjuntiva é uma membrana fina e transparente que reveste a parte branca do olho. No pterígio, uma parte dessa membrana cresce em forma de triângulo e invade a superfície da córnea, a camada transparente na frente do olho.',
        'O pterígio não é um tumor maligno. Mesmo assim, ele pode irritar o olho e, ao avançar sobre a córnea, mudar o seu formato e atrapalhar a visão.',
        'Ele pode aparecer em um olho só ou nos dois, e costuma crescer devagar, ao longo de meses ou anos. Em muitas pessoas, permanece pequeno por bastante tempo.',
      ],
    },
    {
      id: 'fatores',
      title: 'O que está associado ao surgimento do pterígio?',
      paragraphs: [
        'A causa exata não é totalmente conhecida. Em termos gerais, o pterígio costuma estar associado à exposição prolongada do olho a fatores do ambiente.',
      ],
      bullets: [
        'Exposição à luz solar e à radiação ultravioleta',
        'Vento, poeira e fumaça',
        'Ambientes secos e olho seco',
        'Trabalho ou lazer ao ar livre por muitos anos',
      ],
    },
    {
      id: 'quando-operar',
      title: 'Quando a cirurgia é considerada?',
      paragraphs: [
        'Quando o pterígio é pequeno e dá poucos sintomas, o oftalmologista pode apenas acompanhar o olho, com orientação de proteção solar e, se for o caso, colírios lubrificantes para aliviar a irritação.',
        'A cirurgia costuma ser considerada quando o pterígio cresce, se aproxima do centro da córnea, causa astigmatismo ou perda de qualidade da visão, provoca inflamação repetida ou incomoda muito. A decisão é sempre do médico, depois da avaliação.',
        'Em alguns casos, o médico pede exames para entender o efeito do pterígio na córnea, como o mapeamento do seu formato.',
      ],
    },
    {
      id: 'como-e-feita',
      title: 'Como a cirurgia costuma ser feita?',
      paragraphs: [
        'A cirurgia de pterígio consiste em retirar o tecido que invadiu a córnea. Em geral, o espaço deixado na conjuntiva é coberto com um enxerto de conjuntiva do próprio paciente, uma das técnicas mais usadas. Há outras formas de fechar a área, e o cirurgião indica a mais adequada a cada olho.',
        'O procedimento é feito com cuidado e com o olho anestesiado. A equipe orienta, antes do dia, sobre o preparo, o uso de medicamentos e o acompanhante.',
      ],
    },
    {
      id: 'recidiva',
      title: 'O pterígio pode voltar?',
      paragraphs: [
        'Sim. A volta do pterígio, chamada de recidiva, é possível depois da cirurgia, e o risco varia conforme o caso e a técnica usada. Por isso o acompanhamento e a proteção do olho são parte do tratamento.',
        'O médico conversa sobre esse risco na consulta e orienta como reduzi-lo.',
      ],
    },
    {
      id: 'cuidados',
      title: 'Quais são os cuidados depois da cirurgia?',
      paragraphs: [
        'Nos primeiros dias, é comum o olho ficar vermelho, com sensação de areia e lacrimejamento. A equipe orienta o que é esperado e o que deve ser comunicado ao médico.',
      ],
      bullets: [
        'Usar os colírios exatamente como prescritos',
        'Não coçar nem esfregar o olho',
        'Evitar poeira, fumaça, piscina e maquiagem enquanto o médico não liberar',
        'Usar óculos de sol com proteção ultravioleta e chapéu ao sair',
        'Comparecer às consultas de retorno',
      ],
    },
  ],
  journey: {
    title: 'Como é a jornada na CEMO',
    intro: 'Os passos podem variar conforme o caso. A equipe explica cada um.',
    steps: [
      {
        title: 'Avaliação',
        text: 'Consulta com exame da superfície do olho para saber o tamanho do pterígio e como ele afeta a córnea e a visão.',
      },
      {
        title: 'Decisão',
        text: 'O médico explica se é melhor acompanhar ou operar, quais são os riscos e o que esperar. A decisão é conversada com você.',
      },
      {
        title: 'Cirurgia',
        text: 'Quando indicada, é agendada com orientações de preparo. A equipe esclarece as dúvidas antes do dia.',
      },
      {
        title: 'Acompanhamento',
        text: 'Consultas de retorno para conferir a cicatrização, ajustar os colírios e vigiar a possibilidade de o pterígio voltar.',
      },
    ],
  },
  faq: [
    {
      question: 'Pterígio é o mesmo que catarata?',
      answer: [
        'Não. A catarata é a perda de transparência do cristalino, a lente dentro do olho. O pterígio é um tecido que cresce sobre a córnea, na superfície. São condições diferentes, com tratamentos diferentes.',
      ],
    },
    {
      question: 'Todo pterígio precisa ser operado?',
      answer: [
        'Não. Pterígios pequenos e com poucos sintomas podem ser apenas acompanhados. A cirurgia é considerada quando há crescimento, desconforto importante ou efeito na visão.',
      ],
    },
    {
      question: 'Colírio faz o pterígio sumir?',
      answer: [
        'Colírios lubrificantes ou anti-inflamatórios, quando prescritos, podem aliviar a irritação, mas não removem o tecido. Só o médico pode dizer o que é adequado ao seu caso.',
      ],
    },
    {
      question: 'Como me proteger para o pterígio não crescer ou voltar?',
      answer: [
        'Óculos de sol com proteção ultravioleta, chapéu ou boné e cuidado com poeira e vento ajudam a reduzir a agressão ao olho. Isso vale antes e depois da cirurgia.',
      ],
    },
    {
      question: 'Posso operar os dois olhos ao mesmo tempo?',
      answer: [
        'Essa decisão é do cirurgião. Em geral, cada olho é avaliado separadamente, e a equipe orienta o melhor momento para cada um.',
      ],
    },
  ],
  related: {
    doctors: ['david-ribeiro-de-mendonca-filho'],
    specialties: ['cornea'],
    exams: ['ceratoscopia'],
    conditions: ['olho-seco'],
    articles: [
      'como-proteger-seus-olhos-dos-danos-solares',
      'qual-a-funcao-da-cornea',
      'as-melhores-maneiras-de-se-proteger-contra-doencas-oculares',
    ],
  },
  videoIds: [],
  review: {
    status: 'MEDICAL_REVIEW',
    author: 'Equipe editorial CEMO',
    medicalReviewerSlug: null,
    reviewedAt: null,
    updatedAt: '2026-10-23',
    sources: [],
  },
  todos: [
    'TODO_CONTENT_VALIDATION: revisão médica do texto',
    'TODO_CONTENT_VALIDATION: incluir fontes e referências',
    'TODO_CONTENT_VALIDATION: confirmar a técnica usada na CEMO (enxerto de conjuntiva, cola biológica, antimitótico); o texto fala só em termos gerais',
    'TODO_CONTENT_VALIDATION: confirmar tipo de anestesia, local (centro cirúrgico) e tempo da cirurgia',
    'TODO_CONTENT_VALIDATION: confirmar quais médicos da CEMO operam pterígio (o texto cita só o Dr. David pela área de córnea)',
    'TODO_CONTENT_VALIDATION: confirmar prazos de retorno e restrições do pós-operatório',
  ],
};
