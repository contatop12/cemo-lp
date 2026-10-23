// Redigido a partir do site atual (/exames/mapeamento/) e dos posts CONSOLIDATE "o-que-voce-precisa-saber-sobre-exame-de-mapeamento-de-retina" e "mapeamento-retina-importancia".
import type { Exam } from '../../types';

export const mapeamentoDeRetina: Exam = {
  id: 'mapeamento-de-retina',
  name: 'Mapeamento de Retina',
  aka: ['Mapeamento de retina', 'Fundo de olho', 'Exame de fundo de olho', 'Oftalmoscopia indireta'],
  canonicalPath: '/exames/mapeamento/',
  published: true,
  seo: {
    title: 'Mapeamento de Retina: o que é e como é feito',
    description:
      'Entenda o que é o mapeamento de retina (fundo de olho), para que serve, como se preparar e por que a pupila é dilatada. Exame em Taboão da Serra.',
  },
  h1: 'Mapeamento de retina (exame de fundo de olho) em Taboão da Serra',
  lead:
    'O mapeamento de retina é o exame em que o oftalmologista examina a parte de trás do olho, com a pupila dilatada. Aqui você entende para que ele serve, como é feito e como se preparar.',
  summary: 'Exame de fundo de olho: avalia a retina, o nervo óptico e os vasos sanguíneos da parte posterior do olho.',
  answer: {
    question: 'O que é o mapeamento de retina?',
    text:
      'O mapeamento de retina, também chamado de exame de fundo de olho, é uma avaliação em que o oftalmologista observa a retina, o nervo óptico e os vasos sanguíneos na parte posterior do olho. Para isso, em geral usa colírio para dilatar a pupila e uma luz focada com lente de apoio. Serve para identificar alterações da retina e acompanhar doenças como diabetes e hipertensão, quando há indicação médica.',
  },
  purpose: [
    'A retina é a camada que reveste o fundo do olho e transforma a luz em sinais enviados ao cérebro. Os vasos sanguíneos que a irrigam são os únicos que podem ser vistos diretamente, sem cirurgia, e por isso o exame também oferece pistas sobre a saúde dos vasos em geral.',
    'O mapeamento permite que o médico observe a retina central (mácula), a retina periférica e o nervo óptico. Ele ajuda a detectar alterações antes que a pessoa perceba qualquer mudança na visão.',
    'O exame também serve para acompanhar quem já tem uma doença conhecida ou usa medicamentos que podem afetar a retina. Nesses casos, a repetição periódica mostra se algo mudou.',
  ],
  whenRequested: [
    'O mapeamento costuma ser solicitado na consulta de rotina, em especial depois dos 40 anos, e sempre que há queixa que sugira problema na retina. Isso inclui sinais como moscas volantes novas, clarões de luz ou sombra no campo de visão, que podem estar associados a diferentes condições e precisam de avaliação oftalmológica.',
    'Também é pedido para quem tem diabetes ou pressão alta, para quem tem alta miopia, história familiar de doença da retina ou antes de algumas cirurgias oculares.',
    'Em bebês prematuros, a avaliação da retina faz parte do cuidado neonatal e segue a orientação da equipe médica.',
  ],
  howDone: [
    'Primeiro o paciente recebe colírios para dilatar a pupila. Com a pupila maior, o médico enxerga uma área mais ampla do fundo do olho.',
    'Depois, o oftalmologista usa uma fonte de luz e uma lente de apoio, ou um oftalmoscópio, para observar a retina, o nervo óptico e os vasos. Durante a observação, ele pode pedir que você olhe para diferentes direções.',
    'O exame costuma ser bem tolerado e, em geral, não causa dor. A luz forte pode incomodar por alguns instantes.',
    'O mapeamento pode ser feito na mesma consulta, junto com outros exames que o especialista julgar necessários.',
  ],
  preparation: [
    'Como a pupila é dilatada, a visão fica embaçada e a sensibilidade à luz aumenta por algumas horas. Por isso é melhor vir acompanhado e evitar dirigir logo depois do exame.',
    'Traga óculos escuros para o caminho de volta. Se usa lentes de contato, avise a equipe e leve o estojo e os óculos de grau.',
    'Leve a lista dos medicamentos que usa e os exames anteriores, se houver. Informe se tem glaucoma, alergia a colírios ou já teve reação a algum deles.',
  ],
  duration: [
    'A observação em si costuma ser curta. O que toma mais tempo é esperar a dilatação da pupila, que leva alguns minutos para fazer efeito.',
    'Programe-se para ficar na clínica um pouco mais do que numa consulta sem dilatação. O efeito do colírio costuma passar ao longo de algumas horas, e o tempo varia de pessoa para pessoa.',
  ],
  aftercare: [
    'Depois do exame, a visão de perto e de longe pode ficar embaçada e a luz pode incomodar. Use óculos escuros e evite atividades que exijam visão nítida, como dirigir, até a pupila voltar ao normal.',
    'O médico explica o resultado na própria consulta e diz se há necessidade de exames complementares, tratamento ou retorno. Se surgir dor forte no olho, vermelhidão intensa ou piora da visão depois da dilatação, procure atendimento.',
  ],
  faq: [
    {
      question: 'Mapeamento de retina e fundo de olho são o mesmo exame?',
      answer: [
        'Na prática, sim. “Fundo de olho” é o nome popular do exame em que o médico examina a retina e o nervo óptico. “Mapeamento de retina” costuma indicar a avaliação mais detalhada, inclusive da periferia da retina.',
      ],
    },
    {
      question: 'Por que preciso dilatar a pupila?',
      answer: [
        'A pupila funciona como uma janela. Com ela mais aberta, o médico enxerga a retina com mais detalhe, inclusive áreas mais afastadas do centro. Por isso o exame é feito, na maioria dos casos, depois da dilatação.',
      ],
    },
    {
      question: 'O mapeamento dói?',
      answer: [
        'Em geral não. O colírio pode arder um pouco ao ser aplicado, e a luz usada no exame costuma incomodar por instantes.',
      ],
    },
    {
      question: 'Posso dirigir depois do exame?',
      answer: [
        'Não é recomendado enquanto a visão estiver embaçada. Venha com acompanhante ou combine o transporte antes. Se o médico dilatar a pupila, a orientação é aguardar o efeito passar.',
      ],
    },
    {
      question: 'Quem tem diabetes precisa fazer o mapeamento com que frequência?',
      answer: [
        'A frequência depende do tipo de diabetes, do tempo de doença e do que o médico encontrar no exame. Quem tem diabetes deve manter acompanhamento regular com o oftalmologista, que define o intervalo ideal para cada pessoa.',
      ],
    },
  ],
  related: {
    doctors: ['adriano-de-morais-ferreira', 'jose-pereira-do-rego-neto'],
    specialties: ['retina', 'consulta'],
    exams: ['retinografia', 'tomografia-de-coerencia-optica'],
    conditions: ['degeneracao-macular', 'descolamento-de-retina'],
    articles: [
      'doencas-na-retina',
      'quais-doencas-podem-causar-degeneracao-macular-e-como-evitar',
      'retinografia-e-gonioscopia-no-diagnostico-de-doencas-oculares',
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
    'TODO_CONTENT_VALIDATION: revisão médica do texto',
    'TODO_CONTENT_VALIDATION: incluir fontes e referências',
    'TODO_CONTENT_VALIDATION: tempo de espera da dilatação e duração do exame na CEMO',
    'TODO_CONTENT_VALIDATION: técnica usada na CEMO (oftalmoscopia indireta, lente de apoio, aparelho)',
    'TODO_CONTENT_VALIDATION: confirmar se o exame é feito no mesmo dia da consulta e se a CEMO faz triagem de prematuros',
  ],
};
