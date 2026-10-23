// Texto novo; fato da CEMO vem do vídeo "Exames que realizamos" (YAG laser) e do documento de ajustes de 23/10/2026. O post KEEP sobre capsulotomia fica linkado.
import type { Specialty } from '../../types';

export const yagLaser: Specialty = {
  id: 'yag-laser',
  kind: 'tratamento',
  treatmentType: 'procedimento',
  parentId: 'catarata',
  name: 'YAG Laser',
  shortName: 'YAG laser',
  canonicalPath: '/tratamentos/yag-laser/',
  published: true,
  seo: {
    title: 'YAG laser: capsulotomia e iridotomia',
    description:
      'Entenda o que é o YAG laser, para que servem a capsulotomia depois da catarata e a iridotomia no glaucoma e como é o procedimento no consultório.',
  },
  h1: 'YAG laser em Taboão da Serra: capsulotomia e iridotomia',
  lead: 'O YAG laser é um procedimento a laser, sem corte, feito no consultório. Ele é usado, por exemplo, para limpar a cápsula da lente depois da cirurgia de catarata e para prevenir crises em certos tipos de glaucoma.',
  summary: 'Laser sem corte, feito no consultório, para limpar a cápsula após a catarata e para tratar certos tipos de glaucoma.',
  leadInterest: 'catarata',
  ctaLabel: 'Agendar avaliação',
  answer: {
    question: 'O que é o YAG laser?',
    text: 'O YAG laser é um procedimento não cirúrgico, feito no consultório com um aparelho de laser. Duas indicações comuns são a capsulotomia, que abre a cápsula que ficou opaca depois da cirurgia de catarata, e a iridotomia, que cria uma pequena passagem na íris para prevenir crise em certos tipos de glaucoma de ângulo fechado. A indicação é sempre definida pelo médico, depois da avaliação.',
  },
  sections: [
    {
      id: 'o-que-e',
      title: 'O que é o YAG laser e como funciona?',
      paragraphs: [
        'O YAG laser emite pulsos de energia de alta precisão. No olho, ele é dirigido a um ponto específico, sem abrir o olho e sem pontos.',
        'Por isso é considerado um procedimento, e não uma cirurgia. Ele é feito com a pessoa sentada, no consultório, em um aparelho parecido com o usado no exame oftalmológico.',
        'No vídeo sobre os exames da CEMO, o Dr. David cita o YAG laser entre os recursos da clínica, usado na limpeza da lente após a catarata e no tratamento de glaucoma.',
      ],
    },
    {
      id: 'capsulotomia',
      title: 'Capsulotomia: limpeza da cápsula depois da catarata',
      paragraphs: [
        'Na cirurgia de catarata, o cristalino opaco é retirado e uma lente é implantada dentro do olho. A lente fica apoiada em uma fina membrana, a cápsula.',
        'Em alguns pacientes, meses ou anos depois, essa cápsula perde a transparência. A visão volta a ficar embaçada, como se a catarata tivesse voltado, mas a causa é a cápsula, não a lente. Isso se chama opacificação da cápsula.',
        'Na capsulotomia, o laser abre uma pequena área central da cápsula, e a luz volta a passar. O passo a passo está no artigo sobre capsulotomia com YAG laser, indicado ao fim da página.',
      ],
    },
    {
      id: 'iridotomia',
      title: 'Iridotomia: prevenção de crise em certos tipos de glaucoma',
      paragraphs: [
        'Em alguns olhos, a saída do humor aquoso, o líquido que circula na parte da frente do olho, pode ficar bloqueada pela íris. Isso caracteriza o glaucoma de ângulo fechado, ou olhos com ângulo estreito, e pode levar a uma crise com aumento rápido da pressão.',
        'Na iridotomia, o laser faz um pequeno orifício na íris, criando uma passagem para o líquido. Em muitos casos, isso reduz o risco de crise.',
        'Nem todo glaucoma é tratado assim. Os exames definem se o seu olho tem esse tipo de anatomia e se a iridotomia é adequada.',
      ],
    },
    {
      id: 'como-e-feito',
      title: 'Como o procedimento é feito?',
      paragraphs: [
        'Em geral, o médico pinga colírios, que podem incluir um para ajustar a pupila e um anestésico. Em alguns casos, usa-se uma pequena lente de apoio sobre o olho.',
        'Você apoia o queixo e a testa no aparelho e olha em uma direção. O laser é disparado em pulsos, e você pode ver clarões de luz. A equipe explica o que sentir antes de começar.',
      ],
    },
    {
      id: 'depois',
      title: 'O que esperar e quais cuidados depois?',
      paragraphs: [
        'Depois do procedimento, a pessoa em geral volta para casa no mesmo dia. Pode haver sensibilidade à luz e visão um pouco embaçada por algumas horas, em especial se a pupila foi dilatada.',
        'O médico pode prescrever colírios e pede retorno para conferir o resultado e, no caso do glaucoma, a pressão do olho. Procure a clínica se houver dor forte, piora súbita da visão ou muitos pontos novos na visão.',
      ],
    },
  ],
  journey: {
    title: 'Como é a jornada na CEMO',
    steps: [
      { title: 'Avaliação', text: 'Consulta e exames para saber se o laser é a opção adequada para o seu olho.' },
      { title: 'Procedimento', text: 'Feito no consultório, com colírios, sem corte e sem internação.' },
      { title: 'Retorno', text: 'Consulta para conferir a visão, a pressão do olho e definir os próximos passos.' },
    ],
  },
  faq: [
    {
      question: 'O YAG laser é uma cirurgia?',
      answer: ['Não. É um procedimento a laser, sem corte, feito no consultório. Mesmo assim, só deve ser feito com indicação médica.'],
    },
    {
      question: 'Dói fazer o YAG laser?',
      answer: [
        'Muitas pessoas descrevem incômodo leve ou clarões de luz, e são usados colírios. A sensação varia de uma pessoa para outra.',
      ],
    },
    {
      question: 'A catarata volta depois da cirurgia?',
      answer: [
        'A catarata em si não volta, pois o cristalino foi retirado. O que pode ocorrer é a cápsula que sustenta a lente ficar opaca, e é isso que o YAG laser trata.',
      ],
    },
    {
      question: 'Quem tem glaucoma precisa de YAG laser?',
      answer: [
        'Não necessariamente. A iridotomia é indicada em certos tipos de glaucoma de ângulo fechado ou em olhos com risco. Outros tipos têm outros tratamentos.',
      ],
    },
    {
      question: 'Posso dirigir depois do procedimento?',
      answer: ['Se a pupila foi dilatada, a visão pode ficar desconfortável. Peça orientação à equipe e, se possível, venha acompanhado.'],
    },
  ],
  related: {
    doctors: ['david-ribeiro-de-mendonca-filho', 'roberta-andrade-e-nascimento', 'igor-seidi-sekiguchi'],
    specialties: ['catarata', 'glaucoma'],
    exams: ['gonioscopia', 'tonometria'],
    conditions: [],
    articles: ['tudo-sobre-capsulotomia-com-yag-laser', 'tipos-de-glaucoma', 'catarata-nos-olhos-quando-operar'],
  },
  videoIds: ['exames-que-realizamos'],
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
    'TODO_CONTENT_VALIDATION: confirmar que a CEMO faz capsulotomia e iridotomia (o vídeo cita limpeza da lente e tratamento de glaucoma) e se há outras indicações',
    'TODO_CONTENT_VALIDATION: confirmar quem executa o YAG laser na CEMO e o tempo do procedimento',
    'TODO_CONTENT_VALIDATION: confirmar colírios e orientações de retorno',
  ],
};
