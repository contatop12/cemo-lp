// Texto novo a partir do vídeo "dra-daniele-calazio" (transcrição em videos.ts) e do documento de ajustes de 23/10/2026; termos gerais para o resto.
import type { Specialty } from '../../types';

export const calazio: Specialty = {
  id: 'calazio',
  kind: 'tratamento',
  treatmentType: 'cirurgia',
  parentId: 'plastica-ocular',
  name: 'Cirurgia de Calázio',
  shortName: 'Calázio',
  canonicalPath: '/tratamentos/calazio/',
  published: true,
  seo: {
    title: 'Calázio: tratamento e cirurgia em Taboão da Serra',
    description:
      'Calázio ou terçol? Veja a diferença, o tratamento inicial, quando a pequena cirurgia é indicada e os cuidados depois. Avaliação na CEMO.',
  },
  h1: 'Calázio: tratamento e cirurgia em Taboão da Serra',
  lead: 'Aquele carocinho na pálpebra que inchou, desinchou e não foi embora pode ser um calázio. Entenda como ele se diferencia do terçol, o que costuma ajudar no início e quando a cirurgia é considerada.',
  summary: 'Avaliação do calázio, tratamento clínico inicial e pequena cirurgia quando indicada.',
  leadInterest: 'plastica-ocular',
  ctaLabel: 'Agendar avaliação de calázio',
  answer: {
    question: 'O que é calázio e como se trata?',
    text: 'O calázio é um nódulo na pálpebra causado pelo bloqueio de uma glândula que produz gordura para a lágrima. Ele costuma inchar, às vezes doer no início e, depois, deixar um carocinho endurecido. O tratamento começa, em geral, com compressas mornas e cuidados de higiene, sob orientação do médico. Se o nódulo persiste, cresce ou atrapalha a visão, o oftalmologista pode indicar uma pequena cirurgia.',
  },
  signs: {
    title: 'Sinais que merecem avaliação',
    intro: 'Esses sinais podem estar associados a diferentes condições e precisam de avaliação oftalmológica:',
    items: [
      'Carocinho na pálpebra que persiste depois de a inflamação passar',
      'Pálpebra pesada ou olhar mais caído',
      'Inchaço, vermelhidão ou dor na pálpebra',
      'Visão embaçada porque o nódulo pressiona o olho',
      'Nódulo que cresce ou volta no mesmo lugar',
      'Incômodo na hora da maquiagem',
    ],
  },
  sections: [
    {
      id: 'o-que-e',
      title: 'O que é o calázio?',
      paragraphs: [
        'As pálpebras têm pequenas glândulas que produzem a camada oleosa da lágrima. Quando uma delas entope, a secreção se acumula e forma um nódulo.',
        'Em geral, o calázio aparece depois de uma inflamação: a pálpebra inflama, incha e, quando o inchaço baixa, fica um carocinho residual. Ele pode surgir na pálpebra superior ou na inferior e, às vezes, é grande o bastante para pesar na pálpebra, deixar o olhar mais caído e atrapalhar a visão.',
      ],
    },
    {
      id: 'calazio-ou-tercol',
      title: 'Qual é a diferença entre calázio e terçol?',
      paragraphs: [
        'O terçol é uma infecção, geralmente por bactérias, de uma glândula na raiz do cílio ou dentro da pálpebra. Costuma ser dolorido, vermelho e quente, e aparece de forma mais aguda.',
        'O calázio é uma inflamação por bloqueio de glândula. Em geral, dói menos, é mais endurecido e dura semanas. Os dois podem se confundir, e um terçol pode deixar um calázio como resíduo.',
        'Como outras alterações da pálpebra podem parecer um calázio, a avaliação do oftalmologista é importante para confirmar o que é.',
      ],
    },
    {
      id: 'tratamento-inicial',
      title: 'O que costuma ser feito no início?',
      paragraphs: [
        'Muitos calázios são tratados primeiro de forma clínica. O médico pode orientar compressas mornas, massagem suave e higiene das pálpebras e, conforme o caso, colírios ou pomadas.',
        'Esse cuidado deve ser feito com orientação, porque espremer ou furar o nódulo em casa pode piorar a inflamação e causar infecção.',
      ],
      bullets: [
        'Compressas mornas, como o médico orientar',
        'Higiene das pálpebras e da base dos cílios',
        'Evitar maquiagem nos olhos enquanto houver inflamação',
        'Não espremer nem furar o nódulo',
      ],
    },
    {
      id: 'cirurgia',
      title: 'Quando a cirurgia é indicada?',
      paragraphs: [
        'Se o calázio não melhora com o tratamento clínico, cresce, volta ou atrapalha a visão, o oftalmologista pode indicar a retirada. Também entra na conversa quando o nódulo incomoda muito ou pesa na pálpebra.',
        'A CEMO realiza a cirurgia de calázio, e a indicação é definida na consulta, depois do exame das pálpebras.',
      ],
    },
    {
      id: 'como-e',
      title: 'Como é a cirurgia de calázio?',
      paragraphs: [
        'Em termos gerais, é uma pequena cirurgia na pálpebra: com a região anestesiada, o médico abre o nódulo e retira o conteúdo acumulado. O corte costuma ser feito pelo lado de dentro da pálpebra ou pela pele, conforme o caso.',
        'A equipe explica, antes do dia, como será o preparo e o que esperar. Em calázios que voltam várias vezes, o médico pode investigar a causa.',
      ],
    },
    {
      id: 'cuidados',
      title: 'Quais são os cuidados depois?',
      paragraphs: [
        'É comum a pálpebra ficar um pouco inchada ou arroxeada nos primeiros dias. A orientação exata vem do médico e, em geral, inclui:',
      ],
      bullets: [
        'Usar colírios e pomadas como prescritos',
        'Não coçar nem esfregar o olho',
        'Evitar maquiagem nos olhos até a liberação do médico',
        'Manter a higiene das pálpebras',
        'Voltar nas consultas marcadas',
      ],
    },
  ],
  journey: {
    title: 'Como é a jornada na CEMO',
    intro: 'Os passos podem variar conforme o caso.',
    steps: [
      { title: 'Avaliação', text: 'O médico examina a pálpebra para identificar se é mesmo um calázio e se há outra causa.' },
      { title: 'Tratamento inicial', text: 'Quando adequado, começa-se pelos cuidados clínicos e pelo acompanhamento.' },
      { title: 'Cirurgia, se indicada', text: 'Se o nódulo persiste ou atrapalha, a pequena cirurgia é agendada, com orientação de preparo.' },
      { title: 'Retorno', text: 'Consulta para conferir a cicatrização e orientar os cuidados com as pálpebras.' },
    ],
  },
  faq: [
    {
      question: 'Calázio é contagioso?',
      answer: ['Não. O calázio é um bloqueio de glândula, não uma infecção que passa de uma pessoa para outra.'],
    },
    {
      question: 'O calázio some sozinho?',
      answer: [
        'Alguns diminuem com o tempo e com os cuidados indicados, mas outros persistem por semanas ou meses. Se o carocinho não melhora, cresce ou atrapalha, procure avaliação.',
      ],
    },
    {
      question: 'Posso espremer o calázio?',
      answer: ['Não. Espremer ou furar pode piorar a inflamação e causar infecção. Procure o oftalmologista.'],
    },
    {
      question: 'O calázio pode voltar?',
      answer: [
        'Pode, principalmente em quem tem pálpebras inflamadas com frequência. O médico orienta a higiene das pálpebras e investiga a causa quando ele se repete.',
      ],
    },
    {
      question: 'Calázio atrapalha a visão?',
      answer: [
        'Quando é grande, pode pesar na pálpebra, deixar o olhar mais caído ou alterar o formato da córnea e embaçar a visão. Isso precisa de avaliação.',
      ],
    },
  ],
  related: {
    doctors: [],
    specialties: ['plastica-ocular'],
    exams: [],
    conditions: [],
    articles: [
      'tudo-o-que-voce-precisa-saber-sobre-plastica-ocular',
      'plastica-ocular-cuidados-pos-operatorio',
      'procedimentos-plastica-ocular-taboao-da-serra',
    ],
  },
  videoIds: ['dra-daniele-calazio'],
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
    'TODO_CONTENT_VALIDATION: incluir a Dra. Danielle Longo em related.doctors quando o perfil for publicado',
    'TODO_CONTENT_VALIDATION: confirmar técnica, anestesia, local e tempo da cirurgia de calázio',
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO opera calázio em crianças',
    'TODO_CONTENT_VALIDATION: confirmar cuidados e retornos do pós-operatório',
  ],
};
