// Reescrita de paginas/exames__gonioscopia.md e do post CONSOLIDATE tudo-o-que-voce-precisa-saber-sobre-gonioscopia, com conhecimento médico geral conservador.
import type { Exam } from '../../types';

export const gonioscopia: Exam = {
  id: 'gonioscopia',
  name: 'Gonioscopia',
  aka: ['Exame do ângulo da câmara anterior', 'Exame de drenagem do olho'],
  canonicalPath: '/exames/gonioscopia/',
  published: true,
  seo: {
    title: 'Gonioscopia: exame do ângulo do olho',
    description:
      'Entenda o que é a gonioscopia, quando é pedida, como é feita e como se preparar. Exame do ângulo de drenagem do olho, em Taboão da Serra.',
  },
  h1: 'Gonioscopia: o exame que avalia a drenagem do olho',
  lead: 'A gonioscopia permite ao oftalmologista ver o ângulo de drenagem do olho, região que ajuda a regular a pressão interna. É um exame importante na avaliação do glaucoma. Veja como funciona na CEMO, em Taboão da Serra.',
  summary: 'Examina o ângulo de drenagem do olho; ajuda a definir o tipo de glaucoma e o tratamento.',
  answer: {
    question: 'O que é a gonioscopia?',
    text: 'A gonioscopia é o exame que permite ao oftalmologista observar o ângulo da câmara anterior, a região do olho por onde o líquido interno, o humor aquoso, escoa. Ela ajuda a investigar o glaucoma, a identificar o tipo da doença e a orientar o tratamento. É feita no consultório, com colírio anestésico e uma lente especial apoiada no olho.',
  },
  purpose: [
    'O olho produz um líquido, o humor aquoso, que nutre estruturas internas e ajuda a manter a pressão. Esse líquido escoa por um ângulo formado entre a íris (a parte colorida) e a córnea. Quando esse caminho é estreito ou está alterado, a pressão pode subir.',
    'Nem a lâmpada de fenda comum nem a medida da pressão mostram diretamente esse ângulo. A gonioscopia mostra: o médico vê se ele está aberto, estreito ou fechado e se há alterações nas estruturas de drenagem.',
    'Essa informação ajuda a distinguir os tipos de glaucoma, como o de ângulo aberto e o de ângulo fechado, que podem pedir condutas diferentes.',
    'O resultado também ajuda a decidir se um tratamento a laser pode ser indicado, o que o médico avalia caso a caso.',
  ],
  whenRequested: [
    'O médico pode pedir a gonioscopia quando há suspeita de glaucoma, quando a pressão do olho está acima do esperado ou quando o exame clínico sugere um ângulo estreito.',
    'Também é usada no acompanhamento de quem já tem glaucoma, para reavaliar o ângulo ao longo do tempo, e em algumas situações que afetam a drenagem, como inflamações ou traumas, a critério do oftalmologista.',
    'O exame costuma ser feito depois de uma primeira consulta, quando o médico entende que precisa ver o ângulo para fechar o raciocínio clínico. Ter o exame pedido não significa que você tem glaucoma.',
  ],
  howDone: [
    'Primeiro, o médico pinga um colírio anestésico. Em seguida, apoia delicadamente sobre o olho uma pequena lente de contato especial, com espelhos, e usa a lâmpada de fenda, o microscópio do consultório, para observar o ângulo.',
    'Você fica sentado, com o queixo e a testa apoiados, olhando para onde o médico indicar. Pode ser pedido que olhe em direções diferentes.',
    'Em geral, o que se sente é a pressão leve da lente e a luz da lâmpada. Um gel pode ser usado para apoiar a lente, o que deixa a visão embaçada por um tempo. Cada olho é examinado em separado.',
  ],
  preparation: [
    'Em geral, não há preparo especial. Você pode comer e usar seus colírios normalmente, salvo orientação contrária do médico.',
    'Informe se tem alergia a colírios ou a anestésicos e quais medicamentos usa. Quem usa lentes de contato deve perguntar à clínica, no agendamento, se precisa retirá-las e por quanto tempo.',
    'Como o gel pode embaçar a visão por um tempo, vale avaliar se é melhor vir acompanhado, sobretudo se vai dirigir.',
  ],
  duration: [
    'O exame costuma ser feito em poucos minutos por olho. O tempo total no dia depende de outros exames e da consulta.',
    'Na CEMO, a avaliação e os exames podem ser feitos no mesmo dia, sem precisar voltar em outros dias.',
  ],
  aftercare: [
    'A visão pode ficar embaçada por alguns instantes por causa do gel. Espere a visão normalizar antes de dirigir ou fazer atividades que exijam atenção.',
    'O anestésico deixa o olho menos sensível por algum tempo, então evite coçar ou esfregar o olho até o efeito passar.',
    'O oftalmologista explica o que viu e o que isso significa para você, e combina os próximos passos, como outros exames, colírios ou, se indicado, um tratamento a laser. Procure a clínica se houver dor forte, vermelhidão intensa ou queda de visão depois do exame.',
  ],
  faq: [
    {
      question: 'A gonioscopia dói?',
      answer: [
        'Em geral não, porque o olho é anestesiado com colírio. Você pode sentir a lente encostando e a luz da lâmpada. Se algo incomodar, avise o médico.',
      ],
    },
    {
      question: 'Quem tem glaucoma sempre precisa de gonioscopia?',
      answer: [
        'Em geral, ela faz parte da avaliação inicial do glaucoma e pode ser repetida em algumas situações. O médico decide quando.',
      ],
    },
    {
      question: 'A gonioscopia substitui a medida da pressão?',
      answer: [
        'Não. A tonometria mede a pressão. A gonioscopia mostra o ângulo de drenagem. Os dois são complementares.',
      ],
    },
    {
      question: 'Posso dirigir depois do exame?',
      answer: [
        'A visão pode ficar embaçada por alguns instantes. Espere normalizar e, se tiver dúvida, venha acompanhado.',
      ],
    },
  ],
  related: {
    doctors: ['roberta-andrade-e-nascimento'],
    specialties: ['glaucoma', 'consulta'],
    exams: ['tonometria', 'campo-visual', 'estereofoto-de-papila', 'retinografia'],
    conditions: [],
    articles: [
      'retinografia-e-gonioscopia-no-diagnostico-de-doencas-oculares',
      'tipos-de-glaucoma',
      'os-principais-sintomas-do-glaucoma',
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
    'TODO_CONTENT_VALIDATION: confirmar tempo do exame e orientação sobre lentes de contato',
    'TODO_CONTENT_VALIDATION: confirmar quais lasers para glaucoma a CEMO realiza antes de citar técnicas (o vídeo do Dr. David só cita glaucoma com laser)',
  ],
};
