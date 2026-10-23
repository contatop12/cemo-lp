// Conteúdo novo (não há página atual): posts do blog sobre visão infantil, briefing §19 e fala do Dr. David sobre as especialidades da CEMO.
import type { Specialty } from '../../types';

export const oftalmopediatria: Specialty = {
  id: 'oftalmopediatria',
  kind: 'especialidade',
  name: 'Oftalmopediatria',
  shortName: 'Oftalmologia infantil',
  canonicalPath: '/especialidades/oftalmopediatria/',
  published: true,
  seo: {
    title: 'Oftalmologista infantil em Taboão da Serra',
    description:
      'Seu filho precisa de avaliação dos olhos? Entenda quando levar, como é a consulta infantil e o que é ambliopia. Agende no CEMO, em Taboão da Serra.',
  },
  h1: 'Oftalmologista infantil em Taboão da Serra',
  lead: 'A visão da criança está em desenvolvimento, e muitos problemas não aparecem sozinhos: a criança acha que todo mundo enxerga como ela. Aqui você entende quando levar seu filho ao oftalmologista, como é a consulta e por que a idade importa.',
  summary: 'Avaliação dos olhos de bebês, crianças e adolescentes, com atenção ao desenvolvimento da visão, ao grau e ao alinhamento dos olhos.',
  leadInterest: 'oftalmopediatria',
  ctaLabel: 'Agendar avaliação infantil',
  answer: {
    question: 'Quando levar meu filho ao oftalmologista infantil?',
    text: 'O oftalmologista infantil cuida da saúde visual de bebês, crianças e adolescentes. Em geral, a criança deve fazer ao menos uma avaliação completa na primeira infância e outra antes de começar a ler e escrever, mesmo sem queixa. Se você notar algo diferente no jeito de ela olhar, não espere a próxima rotina: marque a consulta, porque a visão ainda está se formando e algumas alterações respondem melhor quando tratadas cedo.',
  },
  signs: {
    title: 'Sinais que merecem avaliação',
    intro:
      'Crianças pequenas raramente reclamam da visão. Estes sinais podem estar associados a diferentes condições, como erro de grau ou alteração no alinhamento dos olhos, e precisam de avaliação oftalmológica.',
    items: [
      'Aproximar muito objetos, livros ou a tela para ver',
      'Apertar ou piscar os olhos com frequência',
      'Inclinar a cabeça ou fechar um olho para enxergar',
      'Um olho que “foge” para dentro, para fora, para cima ou para baixo',
      'Lacrimejamento constante ou olhos vermelhos com frequência',
      'Esfregar os olhos o tempo todo',
      'Dor de cabeça ou cansaço ao ler, ou incômodo com a luz',
      'Dificuldade na escola, na leitura ou na lousa, sem outra explicação',
      'Tropeçar ou esbarrar nas coisas mais do que o esperado para a idade',
    ],
  },
  sections: [
    {
      id: 'o-que-faz',
      title: 'O que faz o oftalmologista infantil?',
      paragraphs: [
        'É o médico oftalmologista que acompanha a visão desde os primeiros meses de vida até a adolescência. Ele avalia se os dois olhos enxergam bem e trabalham juntos, se há miopia, hipermetropia ou astigmatismo e se a saúde interna dos olhos está preservada.',
        'Na CEMO, a oftalmopediatria é uma das especialidades da clínica, e o atendimento das crianças é feito pela Dra. Adriana Bizzarri, que também atende estrabismo.',
      ],
    },
    {
      id: 'primeiro-exame',
      title: 'Quando fazer o primeiro exame de vista?',
      paragraphs: [
        'O primeiro contato com a saúde ocular costuma ser o teste do reflexo vermelho, o “teste do olhinho”, feito pelo pediatra ou na maternidade. Ele é uma triagem e não substitui a consulta com o oftalmologista.',
        'Depois disso, o oftalmologista orienta a frequência das avaliações de acordo com a idade e com o histórico da família. Se há casos de estrabismo, grau alto ou doenças dos olhos entre pais e irmãos, vale conversar sobre isso logo cedo. Crianças que nasceram prematuras ou com alguma condição de saúde também podem precisar de acompanhamento mais próximo.',
        'Antes da alfabetização é um bom momento para uma avaliação completa, porque a visão passa a ser muito exigida em sala de aula.',
      ],
    },
    {
      id: 'como-e-a-consulta',
      title: 'Como é a consulta oftalmológica da criança?',
      paragraphs: [
        'A consulta é adaptada à idade. Em crianças que ainda não falam ou não sabem as letras, o médico observa como os olhos seguem a luz e os objetos, o alinhamento entre eles e o reflexo da luz dentro do olho. Em crianças maiores, entram também as tabelas de figuras ou letras.',
        'Para medir o grau com precisão, é comum o oftalmologista usar colírios que relaxam o foco do olho e dilatam a pupila. Eles podem causar visão embaçada e sensibilidade à luz por algumas horas, então vale levar óculos escuros e um acompanhante. Com esse exame é possível avaliar também a parte interna do olho.',
        'A duração varia com a idade, a colaboração da criança e os exames necessários. Conversar com a criança antes sobre o que vai acontecer costuma ajudar na adaptação.',
      ],
    },
    {
      id: 'ambliopia',
      title: 'O que é ambliopia, o “olho preguiçoso”?',
      paragraphs: [
        'A ambliopia é a diminuição da visão de um olho (ou dos dois) que não se explica apenas por uma doença visível e não se corrige só com óculos. Acontece quando o cérebro, durante o desenvolvimento, “prefere” o olho que enxerga melhor ou que está alinhado e deixa o outro de lado.',
        'As causas mais conhecidas são diferença grande de grau entre os olhos, grau alto não corrigido, estrabismo e, mais raramente, algo que impeça a luz de chegar bem à retina. A criança quase nunca percebe, porque o olho mais forte compensa.',
        'Por isso a idade importa. Enquanto o sistema visual está em desenvolvimento, o cérebro responde melhor ao tratamento. Quanto mais tarde a ambliopia é descoberta, menor tende a ser a chance de recuperação. O tratamento é definido pelo médico e pode incluir óculos, oclusão do olho mais forte com tampão, colírios ou treino visual.',
      ],
    },
    {
      id: 'estrabismo',
      title: 'Qual a relação com o estrabismo?',
      paragraphs: [
        'Estrabismo é a perda do alinhamento entre os dois olhos. Ele pode ser constante ou aparecer só em alguns momentos, como no cansaço, e pode ser tanto causa quanto consequência da ambliopia.',
        'Por isso, quando o olhar parece “torto” em fotos ou o olho desvia ao fim do dia, a criança precisa de avaliação, mesmo que o desvio seja discreto. Conheça mais sobre diagnóstico e tratamento na página de estrabismo.',
      ],
    },
    {
      id: 'outros-temas',
      title: 'O que mais é avaliado na infância?',
      paragraphs: [
        'Além do grau e do alinhamento, o oftalmologista observa as vias lacrimais, a transparência do cristalino e a saúde da córnea. Condições como a catarata congênita, o ceratocone e a miopia, que tende a aumentar no crescimento, pedem acompanhamento.',
      ],
    },
  ],
  journey: {
    title: 'Como funciona o atendimento na CEMO',
    steps: [
      {
        title: 'Agendamento',
        text: 'Você escolhe o dia pelo WhatsApp ou telefone e informa a idade da criança e o motivo da consulta.',
      },
      {
        title: 'Avaliação com a especialista',
        text: 'A criança é atendida pela oftalmologista da área, com exames adaptados à idade.',
      },
      {
        title: 'Exames no mesmo local',
        text: 'Quando necessário, os exames complementares são feitos na própria clínica, sem precisar voltar em outros dias.',
      },
      {
        title: 'Orientação à família',
        text: 'A médica explica o resultado, orienta os cuidados, indica óculos ou tratamento quando necessário e combina o retorno.',
      },
    ],
  },
  faq: [
    {
      question: 'Meu filho enxerga bem e não reclama de nada. Preciso levá-lo?',
      answer: [
        'Sim, ao menos nas avaliações recomendadas para a idade. Muitos problemas de visão na infância não causam queixa, porque a criança não tem como comparar com outra forma de enxergar. Na dúvida, o oftalmologista orienta a frequência ideal.',
      ],
    },
    {
      question: 'O colírio na consulta infantil é obrigatório?',
      answer: [
        'Em muitas situações o médico precisa dele para medir o grau com precisão e examinar o fundo do olho, porque a criança tem grande capacidade de focar sem perceber. A indicação é do oftalmologista. O colírio pode arder um pouco e deixar a visão embaçada por algumas horas.',
      ],
    },
    {
      question: 'Criança pode usar óculos desde bebê?',
      answer: [
        'Pode, quando há indicação. Em bebês e crianças pequenas, o óculos adequado ajuda o olho a se desenvolver.',
      ],
    },
    {
      question: 'Olho preguiçoso tem cura?',
      answer: [
        'Em muitos casos a visão pode ser recuperada, principalmente quando o tratamento começa cedo. Cada caso responde de um jeito, por isso a avaliação e o acompanhamento são importantes.',
      ],
    },
  ],
  related: {
    doctors: ['adriana-bizzarri'],
    specialties: ['estrabismo', 'consulta', 'cornea'],
    exams: [],
    conditions: ['miopia', 'hipermetropia', 'astigmatismo'],
    articles: [
      'criancas-e-saude-ocular-sinais-de-alerta-para-pais',
      'o-que-e-miopia-infantil',
      'miopia-infantil-tratamento',
      'catarata-congenita-ou-infantil',
      'ceratocone-em-criancas',
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
    'TODO_CONTENT_VALIDATION: confirmar com a Dra. Adriana a faixa etária atendida e a frequência de avaliação que ela recomenda',
    'TODO_CONTENT_VALIDATION: confirmar duração média da consulta infantil e se os exames complementares são feitos no mesmo dia para crianças',
    'TODO_CONTENT_VALIDATION: confirmar quais tratamentos de ambliopia e miopia infantil a CEMO oferece (tampão, treino visual, colírios)',
  ],
};
