// Redigido a partir do post "o-que-voce-precisa-saber-sobre-retinografia" (mesma URL, ranqueia) e da página /exames/retinografia/ (301 para cá).
import type { Exam } from '../../types';

export const retinografia: Exam = {
  id: 'retinografia',
  name: 'Retinografia',
  aka: ['Retinografia colorida', 'Retinografia digital', 'Fotografia de fundo de olho', 'Retinografia panorâmica'],
  canonicalPath: '/o-que-voce-precisa-saber-sobre-retinografia/',
  published: true,
  seo: {
    title: 'Retinografia: o que é, para que serve e como é feita',
    description:
      'Descubra o que é a retinografia, o exame que fotografa o fundo do olho, quando é pedido, se precisa dilatar a pupila e como se preparar.',
  },
  h1: 'Retinografia: o que você precisa saber sobre o exame',
  lead:
    'A retinografia fotografa o fundo do olho e guarda a imagem para o médico comparar ao longo do tempo. Veja para que serve, como é feita e o que esperar.',
  summary: 'Exame de imagem que fotografa a retina e o nervo óptico para diagnóstico e acompanhamento de doenças.',
  answer: {
    question: 'O que é a retinografia?',
    text:
      'A retinografia é um exame de imagem que fotografa o fundo do olho, incluindo a retina, o nervo óptico e os vasos sanguíneos, com um aparelho chamado retinógrafo. As imagens ficam registradas e permitem comparar mudanças ao longo do tempo. Ela é usada no diagnóstico e no acompanhamento de doenças como as associadas ao diabetes e ao glaucoma, quando há indicação médica.',
  },
  purpose: [
    'A parte de trás do olho não pode ser vista numa inspeção simples. A retinografia registra essa área em imagem de alta resolução, formando um documento que o médico pode rever e comparar com os próximos exames.',
    'Isso é especialmente útil para acompanhar doenças que mudam devagar. Com fotos de datas diferentes, o oftalmologista percebe se uma alteração aumentou, ficou igual ou melhorou com o tratamento.',
    'O exame ajuda a avaliar a saúde da retina, do nervo óptico e dos vasos da retina. Algumas doenças gerais, como diabetes e hipertensão, deixam sinais nessa região, e por isso a retinografia pode ser pedida também em acompanhamentos clínicos.',
  ],
  whenRequested: [
    'O oftalmologista costuma pedir a retinografia quando há suspeita de doença da retina ou do nervo óptico, ou quando quer registrar o aspecto do fundo do olho para acompanhar a evolução.',
    'Ela é frequente no acompanhamento de pessoas com diabetes, com pressão alta, com glaucoma e com oclusões dos vasos da retina. A partir dos 40 anos, a recomendação é manter consultas regulares, e o médico decide se o exame entra na rotina.',
    'Também pode ser feita em crianças, conforme a necessidade clínica. Cada caso é avaliado pelo oftalmologista.',
    'Pode ser feita em um olho ou nos dois, dependendo da indicação.',
  ],
  howDone: [
    'A pessoa se senta em frente ao retinógrafo e apoia o queixo e a testa. Ela olha para uma luz de fixação, e o aparelho tira as fotos. Um técnico ou o médico conduz o exame.',
    'Em muitos casos, a pupila é dilatada com colírio para as imagens ficarem mais completas. Dependendo do aparelho e do paciente, é possível fotografar sem dilatação.',
    'Existem versões do exame, como a retinografia simples, que registra a retina central e o nervo óptico, e a panorâmica, que abrange uma área maior. A escolha depende da pergunta clínica.',
    'A retinografia é diferente da angiofluoresceinografia, que usa um contraste injetado na veia para estudar o fluxo dos vasos. Esse outro exame é indicado em situações específicas e pode ser contraindicado em quem tem alergia ao contraste. O médico explica caso seja necessário.',
  ],
  preparation: [
    'Se a pupila for dilatada, a visão ficará embaçada e a luz incomodará por algumas horas. Por isso é melhor vir acompanhado e trazer óculos escuros.',
    'Leve exames anteriores, se tiver, e informe os medicamentos em uso e eventuais alergias. Se usa lentes de contato, avise a equipe.',
    'Não é preciso jejum para a retinografia simples. Se o médico indicar outro exame de imagem com contraste, a orientação de preparo será dada à parte.',
  ],
  duration: [
    'A captura das imagens costuma ser rápida, mas o tempo total na clínica inclui a espera da dilatação, quando ela é necessária.',
    'O exame com contraste, quando solicitado, tem outra rotina e leva mais tempo. A equipe informa na hora do agendamento.',
  ],
  aftercare: [
    'Quando há dilatação, evite dirigir e atividades que exijam visão nítida até a pupila voltar ao normal. Use óculos escuros se a luz incomodar.',
    'O médico analisa as imagens, explica o que viu e diz se há necessidade de outros exames ou de retorno. Guarde as imagens e os laudos: comparar com fotos anteriores é o que dá valor ao acompanhamento.',
  ],
  faq: [
    {
      question: 'Retinografia e mapeamento de retina são a mesma coisa?',
      answer: [
        'Não. No mapeamento de retina o médico examina o fundo do olho ao vivo. Na retinografia, o fundo do olho é fotografado e as imagens ficam arquivadas.',
        'Os dois exames se complementam e podem ser pedidos na mesma consulta.',
      ],
    },
    {
      question: 'Preciso dilatar a pupila para fazer retinografia?',
      answer: [
        'Nem sempre. Dependendo do aparelho e das características do olho, as imagens podem ser feitas sem dilatação. Quando a dilatação é necessária, o paciente é avisado.',
      ],
    },
    {
      question: 'A retinografia detecta glaucoma?',
      answer: [
        'Ela registra o aspecto do nervo óptico, que é uma das partes avaliadas no glaucoma. O diagnóstico, porém, depende da consulta e de outros exames, como a medida da pressão do olho e o campo visual.',
      ],
    },
    {
      question: 'Quem tem diabetes precisa fazer retinografia?',
      answer: [
        'A retinografia é um dos exames usados para acompanhar a retina de quem tem diabetes, mas a indicação e a frequência dependem do oftalmologista.',
      ],
    },
    {
      question: 'A retinografia emite radiação?',
      answer: [
        'Não. O aparelho usa um flash de luz visível, como uma câmera fotográfica. O flash pode incomodar por um instante.',
      ],
    },
  ],
  related: {
    doctors: ['adriano-de-morais-ferreira', 'jose-pereira-do-rego-neto'],
    specialties: ['retina', 'glaucoma'],
    exams: ['mapeamento-de-retina', 'estereofoto-de-papila', 'tomografia-de-coerencia-optica'],
    conditions: ['degeneracao-macular', 'descolamento-de-retina'],
    articles: [
      'retinografia-e-gonioscopia-no-diagnostico-de-doencas-oculares',
      'doencas-na-retina',
      'quais-doencas-podem-causar-degeneracao-macular-e-como-evitar',
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
    'TODO_CONTENT_VALIDATION: aparelho (retinógrafo), se a CEMO faz retinografia com e sem dilatação e se faz panorâmica',
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO realiza angiofluoresceinografia (citada no post original)',
    'TODO_CONTENT_VALIDATION: duração do exame e preparo na CEMO',
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO faz retinografia em crianças e bebês (post original cita teste do olhinho digital)',
  ],
};
