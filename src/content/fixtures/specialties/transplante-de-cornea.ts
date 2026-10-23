// Post consolidado: tudo-sobre-transplante-de-cornea (inclui as perguntas sobre doação) + conhecimento médico geral. Não publicado até a CEMO confirmar o procedimento.
import type { Specialty } from '../../types';

export const transplanteDeCornea: Specialty = {
  id: 'transplante-de-cornea',
  kind: 'tratamento',
  parentId: 'cornea',
  name: 'Transplante de Córnea',
  shortName: 'Transplante de córnea',
  canonicalPath: '/tratamentos/transplante-de-cornea/',
  published: false,
  seo: {
    title: 'Transplante de córnea: quando é indicado',
    description:
      'Entenda o que é o transplante de córnea, quando é indicado, como funciona a doação e como é a recuperação. Tire suas dúvidas e agende avaliação.',
  },
  h1: 'Transplante de córnea: indicação, cirurgia e recuperação',
  lead: 'Quando a córnea perde a transparência ou a forma de um modo que óculos, lentes e outros tratamentos não resolvem, o transplante pode ser uma opção. Veja como a decisão é tomada, como funciona a cirurgia e o que muda na doação de córneas.',
  summary: 'Substituição de parte ou de toda a córnea doente por tecido doado, em casos selecionados.',
  leadInterest: 'cornea',
  ctaLabel: 'Agendar avaliação de córnea',
  answer: {
    question: 'O que é o transplante de córnea e quando é indicado?',
    text: 'O transplante de córnea é a cirurgia em que a córnea doente, total ou parcialmente, é substituída por uma córnea doada. É indicado quando a córnea perdeu a transparência ou o formato e os outros tratamentos não bastam, como em ceratocone avançado, cicatrizes, infecções, traumas e algumas doenças hereditárias. A decisão é do oftalmologista, depois de avaliação e exames.',
  },
  sections: [
    {
      id: 'funcao-da-cornea',
      title: 'Por que a córnea é tão importante?',
      paragraphs: [
        'A córnea é a camada transparente na frente do olho. Ela protege as estruturas internas e ajuda a focar a luz na retina. Quando perde a transparência, a luz não passa direito e a visão fica turva.',
      ],
    },
    {
      id: 'quando-e-indicado',
      title: 'Quando o transplante é indicado?',
      paragraphs: [
        'Em geral, é considerado quando outras formas de tratamento já não oferecem visão útil. O ceratocone é uma das causas mais frequentes no Brasil, mas não a única.',
      ],
      bullets: [
        'Ceratocone avançado, com afinamento ou cicatriz central',
        'Opacidades e cicatrizes da córnea após infecções ou traumas',
        'Distrofias e doenças hereditárias da córnea',
        'Edema persistente da córnea',
        'Falha de um transplante anterior',
      ],
    },
    {
      id: 'tipos',
      title: 'Existe mais de um tipo de transplante?',
      paragraphs: [
        'Sim. Em alguns casos, troca-se toda a espessura da córnea; em outros, apenas as camadas doentes, preservando as saudáveis. A escolha depende da doença, do estado das camadas da córnea e da experiência da equipe. O oftalmologista explica a técnica indicada no seu caso.',
      ],
    },
    {
      id: 'cirurgia',
      title: 'Como é a cirurgia?',
      paragraphs: [
        'É feita em centro cirúrgico, com microscópio, com anestesia local ou, em alguns casos, geral. O médico retira a parte doente da córnea e fixa a córnea doada com pontos muito finos ou outra técnica, de acordo com o procedimento.',
        'Na maior parte dos casos, não é preciso ficar internado, mas isso depende do caso. A duração e o tipo de anestesia são definidos pela equipe.',
      ],
    },
    {
      id: 'recuperacao',
      title: 'Como é a recuperação?',
      paragraphs: [
        'A recuperação visual é gradual e pode levar meses. São usados colírios por tempo prolongado, especialmente para reduzir o risco de rejeição, e as consultas de retorno são frequentes no início. Os pontos podem ser retirados aos poucos ao longo do acompanhamento.',
        'Os principais riscos são rejeição do tecido, infecção, aumento da pressão do olho e astigmatismo, e a equipe explica cada um antes da cirurgia. Sinais como olho vermelho, dor, piora da visão ou sensibilidade à luz depois do transplante precisam de avaliação rápida.',
      ],
    },
    {
      id: 'doacao',
      title: 'Como funciona a doação de córneas?',
      paragraphs: [
        'No Brasil, a doação de córneas só é possível após a morte, e a autorização é da família. Por isso, quem deseja ser doador deve comunicar essa vontade aos familiares. Qualquer pessoa pode ser considerada doadora, e o tecido passa por avaliação rigorosa de qualidade e segurança antes do uso.',
        'A doação não deforma o corpo do doador, não gera pagamento nem cobrança à família, e não é possível escolher o receptor: o tecido segue a lista de espera.',
      ],
    },
  ],
  journey: {
    title: 'Da avaliação ao acompanhamento',
    steps: [
      { title: 'Avaliação e exames', text: 'O médico examina a córnea e solicita exames, como a topografia e a microscopia especular, para definir o estado das camadas.' },
      { title: 'Indicação e conversa', text: 'A equipe explica se há indicação, a técnica adequada, os riscos e o tempo de recuperação.' },
      { title: 'Cirurgia', text: 'Realizada quando há córnea doada disponível e o paciente está pronto.' },
      { title: 'Acompanhamento', text: 'Retornos frequentes, uso de colírios e controle de sinais de rejeição.' },
    ],
  },
  faq: [
    {
      question: 'Todo ceratocone precisa de transplante?',
      answer: [
        'Não. A maioria das pessoas com ceratocone é acompanhada com óculos, lentes de contato e, quando indicado, tratamentos como o crosslinking. O transplante fica para os casos em que as outras opções não oferecem visão útil.',
      ],
    },
    {
      question: 'É possível transplantar o olho inteiro?',
      answer: [
        'Não. O transplante é apenas da córnea, e não do olho inteiro.',
      ],
    },
    {
      question: 'Existe risco de rejeição?',
      answer: [
        'Sim. A rejeição pode ocorrer e é um dos principais cuidados no acompanhamento. Quanto antes é percebida, mais fácil é tratá-la, por isso a equipe orienta sinais de alerta e mantém retornos regulares.',
      ],
    },
    {
      question: 'Posso doar córneas em vida?',
      answer: [
        'Não. A doação de córneas só ocorre após a morte, com autorização da família, por isso é importante comunicar o desejo de ser doador.',
      ],
    },
    {
      question: 'Quanto tempo leva para ver bem depois do transplante?',
      answer: [
        'Varia de pessoa para pessoa e pode levar meses. A visão melhora gradualmente, e muitas vezes é necessário ajustar óculos ou lentes de contato depois.',
      ],
    },
  ],
  related: {
    doctors: ['david-ribeiro-de-mendonca-filho'],
    specialties: ['cornea', 'consulta', 'lentes-de-contato'],
    exams: ['ceratoscopia', 'microscopia-especular', 'paquimetria'],
    conditions: ['ceratocone'],
    articles: [
      'transplante-de-cornea-ceratocone',
      'ceratocone-causa-cegueira',
      'entendendo-a-ceratite',
      'cicatrizacao-da-cornea',
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
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO realiza transplante de córnea para publicar a página',
    'TODO_CONTENT_VALIDATION: revisão médica do texto',
    'TODO_CONTENT_VALIDATION: incluir fontes e referências',
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO realiza todos os tipos (total e lamelar) e onde a cirurgia é feita (hospital parceiro?)',
    'TODO_CONTENT_VALIDATION: o post antigo cita tempo médio de espera de 90 dias na fila; omitido por variar por estado, confirmar se deve entrar',
  ],
};
