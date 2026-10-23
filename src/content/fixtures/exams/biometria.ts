// Reescrita de paginas/exames__biometria.md e do post CONSOLIDATE tudo-o-que-voce-precisa-saber-sobre-exame-de-biometria; fato do vídeo "Exames que realizamos" (Lenstar).
import type { Exam } from '../../types';

export const biometria: Exam = {
  id: 'biometria',
  name: 'Biometria Ocular',
  aka: ['Biometria', 'Biometria óptica', 'Biometria ultrassônica', 'Exame de biometria', 'Cálculo da lente intraocular'],
  canonicalPath: '/exames/biometria/',
  published: true,
  seo: {
    title: 'Biometria ocular: exame para cirurgia de catarata',
    description:
      'Veja o que é a biometria ocular, como é feita e por que ela é essencial para calcular a lente da cirurgia de catarata, em Taboão da Serra.',
  },
  h1: 'Biometria ocular: o exame que mede o olho para a cirurgia de catarata',
  lead: 'A biometria ocular mede o olho para calcular o grau da lente intraocular que substitui o cristalino na cirurgia de catarata. Na CEMO, em Taboão da Serra, o exame é feito com o Lenstar. Entenda como funciona.',
  summary: 'Mede o olho e permite calcular a lente intraocular da cirurgia de catarata.',
  answer: {
    question: 'O que é a biometria ocular?',
    text: 'A biometria ocular é o exame que mede as dimensões do olho, como o comprimento e a curvatura da córnea. Com esses números, o oftalmologista calcula o grau da lente intraocular que será implantada na cirurgia de catarata. Na CEMO, a biometria é feita com o aparelho Lenstar. O exame não costuma causar dor e é feito em poucos minutos.',
  },
  purpose: [
    'Na cirurgia de catarata, o cristalino, que ficou opaco, é retirado e uma lente é implantada dentro do olho. Essa lente precisa ter o grau adequado a cada olho, e o grau depende de medidas muito precisas.',
    'A biometria fornece essas medidas. Entre elas, o comprimento do olho, a curvatura da córnea e a profundidade da parte da frente do olho. O médico as usa em fórmulas para calcular a lente.',
    'O exame é, portanto, uma das etapas do planejamento da cirurgia. Ele não indica por si só que a operação é necessária: a indicação vem da avaliação clínica.',
    'Quando bem executada, a biometria contribui para o planejamento da lente, mas o resultado depende de vários fatores, e o médico explica o que esperar em cada caso.',
  ],
  whenRequested: [
    'A biometria costuma ser pedida quando o oftalmologista indica a cirurgia de catarata, para escolher a lente intraocular. Também pode ser pedida em outras situações em que seja preciso medir o olho, a critério do médico.',
    'Na CEMO, a clínica reúne os exames complementares necessários para o diagnóstico e o planejamento da catarata, o que permite fazer a avaliação e os exames no mesmo dia.',
    'Se você tem 50 anos ou mais e percebe a visão embaçada, o primeiro passo é a consulta. Esses sinais podem estar associados a diferentes condições e precisam de avaliação oftalmológica.',
  ],
  howDone: [
    'Existem dois tipos principais. Na biometria óptica, o aparelho usa luz para medir o olho, sem tocar nele. Na biometria ultrassônica, uma sonda de ultrassom é usada para medir o comprimento do olho, e pode haver contato com o olho ou com a pálpebra, conforme a técnica.',
    'O Lenstar, usado na CEMO, é um aparelho de biometria óptica. Você apoia o queixo e a testa e olha para uma luz. O aparelho faz as medidas, e algumas são repetidas para conferir.',
    'Em alguns casos, como quando a catarata é muito densa e a luz não atravessa bem o olho, o médico pode recorrer à biometria ultrassônica.',
  ],
  preparation: [
    'Em geral, a biometria não exige jejum nem preparo especial. Mas as lentes de contato podem alterar a curvatura da córnea e, com isso, as medidas. Quem as usa deve perguntar à equipe quanto tempo antes do exame precisa suspendê-las.',
    'Leve exames anteriores, a lista de colírios e remédios e a receita de óculos atual.',
    'Informe se já fez cirurgia nos olhos, como cirurgia refrativa, porque isso influencia o cálculo.',
  ],
  duration: [
    'A medida é feita em poucos minutos para cada olho. O tempo total no dia depende dos demais exames pedidos pelo médico.',
  ],
  aftercare: [
    'Depois da biometria, em geral você volta às atividades normais. Se foi usada a sonda de ultrassom com contato, evite coçar o olho até passar o efeito de colírio anestésico.',
    'O médico usa as medidas para planejar a lente e conversa com você sobre as opções adequadas ao seu caso. A escolha da lente depende da avaliação do olho, das suas necessidades e das indicações médicas.',
    'Se a cirurgia for indicada, a equipe orienta o preparo para o dia da operação. A cirurgia de catarata é feita em centro cirúrgico, com anestesia local e sedação.',
  ],
  faq: [
    {
      question: 'A biometria dói?',
      answer: [
        'A biometria óptica não toca o olho. Na ultrassônica, pode haver contato com anestesia por colírio. Em geral, o exame é bem tolerado.',
      ],
    },
    {
      question: 'Qual é a diferença entre biometria óptica e ultrassônica?',
      answer: [
        'A óptica usa luz e não toca o olho. A ultrassônica usa ondas de ultrassom e pode ser necessária quando a luz não atravessa bem o olho. O médico escolhe conforme cada caso.',
      ],
    },
    {
      question: 'Preciso fazer jejum para a biometria?',
      answer: [
        'Em geral, não. A orientação principal é sobre as lentes de contato. Confirme com a clínica no agendamento.',
      ],
    },
    {
      question: 'A biometria vale para os dois olhos?',
      answer: [
        'Os dois olhos costumam ser medidos, e cada um tem o seu cálculo. Mesmo que a cirurgia seja em um olho de cada vez, as medidas dos dois ajudam o planejamento.',
      ],
    },
    {
      question: 'Quem não tem catarata precisa de biometria?',
      answer: [
        'Em geral, a biometria é pedida para planejar cirurgias com lente intraocular. O médico decide quando ela é necessária.',
      ],
    },
  ],
  related: {
    doctors: ['rodrigo-arantes', 'david-ribeiro-de-mendonca-filho'],
    specialties: ['catarata'],
    exams: ['ceratoscopia', 'microscopia-especular', 'campo-visual'],
    conditions: [],
    articles: [
      'biometria-campo-visual-problemas-oculares',
      'causas-da-catarata',
      'catarata-nos-olhos-quando-operar',
      'qual-e-a-melhor-tecnica-para-cirurgia-de-catarata',
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
    'TODO_CONTENT_VALIDATION: o post antigo citava o IOL Master, o vídeo do Dr. David cita o Lenstar; confirmar qual(is) aparelho(s) a CEMO usa hoje (o texto cita só o Lenstar)',
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO realiza biometria ultrassônica (o texto a descreve como tipo geral)',
    'TODO_CONTENT_VALIDATION: confirmar prazo de suspensão de lentes de contato e tempo do exame',
  ],
};
