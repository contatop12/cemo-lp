// Texto novo, em termos gerais; fato da CEMO (realiza laser de argônio/fotocoagulação) vem do documento de ajustes de 23/10/2026 e do vídeo "Especialidades" (laser na retina).
import type { Specialty } from '../../types';

export const fotocoagulacaoALaser: Specialty = {
  id: 'fotocoagulacao-a-laser',
  kind: 'tratamento',
  treatmentType: 'procedimento',
  parentId: 'retina',
  name: 'Fotocoagulação a Laser (Laser de Argônio)',
  shortName: 'Fotocoagulação a laser',
  canonicalPath: '/tratamentos/fotocoagulacao-a-laser/',
  published: true,
  seo: {
    title: 'Fotocoagulação a laser na retina',
    description:
      'Veja para que serve o laser de argônio na retina, como a fotocoagulação é feita, o que se sente e quais cuidados e acompanhamento vêm depois.',
  },
  h1: 'Fotocoagulação a laser (laser de argônio) em Taboão da Serra',
  lead: 'A fotocoagulação é um tratamento a laser para a retina, feito sem corte. Entenda para que serve, como é feita e por que o acompanhamento depois é parte do tratamento.',
  summary: 'Laser aplicado na retina para tratar áreas alteradas, com indicação e acompanhamento do retinólogo.',
  leadInterest: 'retina',
  ctaLabel: 'Agendar avaliação de retina',
  answer: {
    question: 'O que é a fotocoagulação a laser?',
    text: 'A fotocoagulação a laser, também chamada de laser de argônio, é um procedimento em que pequenos pontos de luz de laser são aplicados na retina, a camada que capta as imagens no fundo do olho. Pode ser indicada em casos como retinopatia diabética, roturas e áreas frágeis da retina e algumas oclusões vasculares. Não substitui outros tratamentos, e o retinólogo define a indicação depois de examinar o olho.',
  },
  signs: {
    title: 'Quando procurar um oftalmologista',
    intro: 'Esses sinais podem estar associados a diferentes condições da retina e precisam de avaliação oftalmológica:',
    items: [
      'Surgimento súbito de pontos ou “moscas” flutuando na visão',
      'Clarões de luz no canto da visão',
      'Sombra ou “cortina” que cobre parte da visão',
      'Visão embaçada ou distorcida de forma repentina',
      'Diabetes sem exame de fundo de olho recente',
    ],
  },
  sections: [
    {
      id: 'o-que-e',
      title: 'O que é a fotocoagulação a laser?',
      paragraphs: [
        'A retina é a camada de tecido no fundo do olho que transforma a luz em sinais enviados ao cérebro. Ela precisa de bons vasos sanguíneos e de estar bem fixa na parede do olho.',
        'Na fotocoagulação, um laser, como o de argônio, é aplicado em pontos selecionados da retina. A energia do laser forma pequenas cicatrizes controladas, que podem selar áreas, fortalecer a aderência da retina ou reduzir tecido que a doença estimula a produzir vasos anormais.',
        'No vídeo sobre especialidades, o Dr. David cita o laser entre os recursos da retina clínica e cirúrgica da CEMO.',
      ],
    },
    {
      id: 'para-que-serve',
      title: 'Para que a fotocoagulação pode ser indicada?',
      paragraphs: [
        'Em termos gerais, o retinólogo pode considerar o laser em situações como as abaixo. A decisão depende do tipo, do estágio e da localização da alteração.',
      ],
      bullets: [
        'Retinopatia diabética, para tratar áreas de retina e vasos alterados pela doença',
        'Roturas e áreas frágeis da retina, para reduzir o risco de descolamento',
        'Algumas oclusões vasculares da retina, em determinados casos',
      ],
    },
    {
      id: 'retinopatia',
      title: 'Por que o diabetes entra nessa conversa?',
      paragraphs: [
        'Com o tempo, o diabetes pode danificar os vasos da retina. A retinopatia diabética pode não dar sintoma no começo, por isso o exame de fundo de olho é recomendado mesmo quando a visão parece boa.',
        'Em certos estágios, o laser pode ser usado para ajudar a controlar a doença. Ele não cura o diabetes, e o controle da glicemia e da pressão segue sendo parte do cuidado.',
      ],
    },
    {
      id: 'como-e-feita',
      title: 'Como a fotocoagulação é feita?',
      paragraphs: [
        'O procedimento costuma ser ambulatorial, sem corte. O médico pinga colírios para dilatar a pupila e, em geral, um anestésico. Uma pequena lente de apoio pode ser colocada sobre o olho.',
        'Você apoia o queixo e a testa no aparelho, e o laser é aplicado por pulsos, em muitos pontos. Dependendo do caso, o tratamento é dividido em mais de uma sessão. A equipe explica o plano antes de começar.',
      ],
    },
    {
      id: 'o-que-sentir',
      title: 'O que se sente durante e depois?',
      paragraphs: [
        'Durante a aplicação, é comum ver clarões de luz. Algumas pessoas sentem desconforto ou uma leve pontada, que varia de pessoa para pessoa e conforme a região tratada.',
        'Depois, a visão pode ficar embaçada e a luz incomodar por algumas horas, por causa da dilatação da pupila e do clarão do laser. É melhor vir acompanhado e levar óculos escuros.',
        'Em alguns casos, o campo de visão ou a visão noturna podem se alterar. O médico explica essa possibilidade antes do procedimento.',
      ],
    },
    {
      id: 'cuidados',
      title: 'Quais cuidados e acompanhamento?',
      paragraphs: [
        'O efeito do laser nem sempre é imediato, e o objetivo muitas vezes é estabilizar a doença, não melhorar a visão. Por isso o retorno é essencial.',
      ],
      bullets: [
        'Usar os colírios e remédios como prescritos',
        'Evitar esforço intenso se o médico recomendar',
        'Voltar nas consultas marcadas para conferir a retina',
        'Procurar a clínica se houver piora súbita da visão, dor forte ou nova sombra na visão',
        'Manter o controle do diabetes e da pressão arterial, quando for o caso',
      ],
    },
  ],
  journey: {
    title: 'Como é a jornada na CEMO',
    intro: 'Os passos podem variar conforme o caso.',
    steps: [
      { title: 'Avaliação', text: 'Consulta com o retinólogo e exame de fundo de olho, com dilatação da pupila.' },
      { title: 'Exames', text: 'Quando necessário, exames de imagem da retina, que a clínica pode fazer no mesmo dia.' },
      { title: 'Laser', text: 'Se indicado, o procedimento é agendado e explicado, e pode ter mais de uma sessão.' },
      { title: 'Acompanhamento', text: 'Retornos para avaliar a resposta ao tratamento e definir os próximos passos.' },
    ],
  },
  faq: [
    {
      question: 'A fotocoagulação a laser é uma cirurgia?',
      answer: ['É um procedimento a laser, feito sem corte e em regime ambulatorial. Mesmo assim, exige indicação e acompanhamento médicos.'],
    },
    {
      question: 'O laser devolve a visão que já foi perdida?',
      answer: [
        'Em geral, o objetivo do laser é impedir que a doença avance ou reduzir riscos, e não recuperar o que já foi perdido. O médico explica o que esperar em cada caso.',
      ],
    },
    {
      question: 'Dói?',
      answer: [
        'Com colírio anestésico, muitas pessoas sentem apenas incômodo e clarões de luz, mas a sensação varia. Avise o médico se estiver desconfortável.',
      ],
    },
    {
      question: 'Preciso fazer só uma sessão?',
      answer: [
        'Depende. Em alguns casos, uma sessão basta; em outros, o tratamento é dividido ou repetido. O retinólogo define o plano.',
      ],
    },
    {
      question: 'Quem tem diabetes precisa de exame de fundo de olho mesmo enxergando bem?',
      answer: [
        'Sim. A retinopatia diabética pode avançar sem sintomas no início. O oftalmologista indica a frequência dos exames.',
      ],
    },
  ],
  related: {
    doctors: ['adriano-de-morais-ferreira', 'jose-pereira-do-rego-neto'],
    specialties: ['retina'],
    exams: ['mapeamento-de-retina', 'retinografia', 'tomografia-de-coerencia-optica'],
    conditions: ['descolamento-de-retina', 'degeneracao-macular'],
    articles: ['doencas-na-retina', 'o-que-e-retina', 'qual-a-funcao-da-retina'],
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
    'TODO_CONTENT_VALIDATION: confirmar indicações realizadas na CEMO (retinopatia diabética, roturas, oclusões vasculares)',
    'TODO_CONTENT_VALIDATION: confirmar anestesia, número e duração das sessões e local (consultório ou centro cirúrgico)',
    'TODO_CONTENT_VALIDATION: confirmar orientações de retorno e restrições pós-procedimento',
  ],
};
