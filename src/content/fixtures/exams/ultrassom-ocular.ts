// Reescrita do post tudo-o-que-voce-precisa-saber-sobre-exame-de-ultrassonografia-ocular (vira 301 para esta página); fato da CEMO (realiza ultrassom ocular) vem do documento de ajustes de 23/10/2026.
import type { Exam } from '../../types';

export const ultrassomOcular: Exam = {
  id: 'ultrassom-ocular',
  name: 'Ultrassom Ocular',
  aka: ['Ultrassonografia ocular', 'Ecografia ocular'],
  canonicalPath: '/exames/ultrassom-ocular/',
  published: true,
  seo: {
    title: 'Ultrassom ocular: para que serve e como é feito',
    description:
      'Veja para que serve o ultrassom ocular, quando é pedido, como é feito e o que esperar do exame, que não usa radiação. Na CEMO, em Taboão da Serra.',
  },
  h1: 'Ultrassom ocular: o exame que mostra o interior do olho por meio de ondas sonoras',
  lead: 'O ultrassom ocular usa ondas sonoras para ver o interior do olho quando a luz não consegue atravessá-lo. Entenda para que serve, como é feito e o que esperar.',
  summary: 'Exame com ondas sonoras que avalia as estruturas internas do olho e a órbita, sem radiação.',
  answer: {
    question: 'O que é o ultrassom ocular?',
    text: 'O ultrassom ocular, ou ultrassonografia ocular, é um exame de imagem que usa ondas sonoras para avaliar as estruturas internas do olho e a região ao redor. Ele é muito útil quando o médico não consegue enxergar o fundo do olho, por exemplo, quando há uma catarata densa ou sangramento. Não usa radiação, em geral é rápido e costuma ser bem tolerado.',
  },
  purpose: [
    'O oftalmologista examina o fundo do olho com luz. Quando algo no caminho da luz a bloqueia, como uma catarata muito densa, uma opacidade da córnea ou um sangramento dentro do olho, esse exame fica limitado.',
    'O ultrassom ocular resolve essa limitação: as ondas sonoras atravessam as estruturas opacas e formam uma imagem do interior do olho.',
    'Com ele, o médico avalia, por exemplo, a retina, o vítreo, que é o gel transparente dentro do olho, o nervo óptico e a região da órbita.',
    'O exame não substitui a consulta. Ele complementa a avaliação clínica, e o resultado é interpretado junto com os demais dados do seu caso.',
  ],
  whenRequested: [
    'O médico pode pedir o ultrassom ocular em várias situações. Alguns exemplos:',
    'Quando a catarata, uma opacidade da córnea ou uma hemorragia impedem de ver a retina; antes de uma cirurgia de catarata, para conferir se a retina está bem; nos casos de suspeita de descolamento de retina; após traumas no olho; e em inflamações, cistos ou tumores no olho ou na órbita.',
    'Pode também ser usado para investigar moscas volantes, os pontinhos que flutuam na visão, quando o médico quer olhar o vítreo.',
    'Esses sinais podem estar associados a diferentes condições e precisam de avaliação oftalmológica. O ultrassom é um dos recursos usados para esclarecê-los.',
  ],
  howDone: [
    'Em geral, você fica deitado ou reclinado, com os olhos fechados. O examinador passa um gel sobre as pálpebras e desliza um pequeno aparelho, o transdutor, sobre a região. O aparelho emite as ondas sonoras e capta o eco, formando a imagem.',
    'Em alguns casos, o examinador pede para você mover o olho em diferentes direções para ver as estruturas por mais ângulos. Em outros, usa-se um colírio anestésico, conforme a técnica e a indicação.',
    'O exame não usa radiação e não costuma causar dor. A sensação é de leve pressão e do gel frio nas pálpebras.',
  ],
  preparation: [
    'Em geral, o ultrassom ocular não exige jejum nem preparo especial. Confirme as orientações com a clínica no agendamento.',
    'Leve exames anteriores, a lista de colírios e remédios que usa e a receita de óculos atual.',
    'Evite maquiagem nos olhos, porque o gel é passado nas pálpebras. Se estiver com lentes de contato, pergunte à equipe se precisa retirá-las.',
  ],
  duration: [
    'O exame costuma ser rápido, em geral de poucos minutos para cada olho. O tempo total no dia depende dos demais exames pedidos.',
  ],
  aftercare: [
    'Depois do exame, em geral você volta às atividades normais. Basta limpar o gel das pálpebras. Se foi usado colírio anestésico, evite coçar o olho até o efeito passar.',
    'O médico interpreta as imagens junto com a sua consulta e explica os próximos passos. O ultrassom por si só não define o tratamento: ele ajuda a decidir.',
    'Se o exame sugerir uma alteração da retina, como um descolamento, o médico pode orientar um acompanhamento próximo com o retinólogo.',
  ],
  faq: [
    {
      question: 'O ultrassom ocular dói?',
      answer: [
        'Em geral, não. Há apenas o gel frio e uma leve pressão das pálpebras. Se houver desconforto, avise o examinador.',
      ],
    },
    {
      question: 'O ultrassom ocular usa radiação?',
      answer: ['Não. Ele usa ondas sonoras, sem radiação, e por isso também pode ser usado em crianças, a critério do médico.'],
    },
    {
      question: 'Por que fazer ultrassom se já fiz o exame de fundo de olho?',
      answer: [
        'Quando a luz não atravessa o olho por causa de uma catarata densa ou de um sangramento, o fundo de olho fica limitado. O ultrassom enxerga com ondas sonoras e completa a avaliação.',
      ],
    },
    {
      question: 'O ultrassom ocular substitui a OCT ou o mapeamento de retina?',
      answer: [
        'Não. Cada exame mostra algo diferente. O ultrassom é muito útil quando o olho está opaco, e a OCT e o mapeamento detalham a retina quando a luz passa. O médico escolhe o mais adequado.',
      ],
    },
    {
      question: 'Preciso de acompanhante?',
      answer: [
        'Em geral, não, a menos que seja usado colírio que dilate a pupila ou que o médico oriente o contrário. Consulte a clínica.',
      ],
    },
  ],
  related: {
    doctors: ['adriano-de-morais-ferreira', 'jose-pereira-do-rego-neto'],
    specialties: ['retina', 'catarata'],
    exams: ['mapeamento-de-retina', 'tomografia-de-coerencia-optica', 'biometria'],
    conditions: ['descolamento-de-retina'],
    articles: ['doencas-na-retina', 'catarata-nos-olhos-quando-operar'],
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
    'TODO_CONTENT_VALIDATION: confirmar modos do exame realizados na CEMO (modo A, modo B) e uso de colírio anestésico',
    'TODO_CONTENT_VALIDATION: confirmar duração, preparo e se atende crianças e recém-nascidos',
    'TODO_CONTENT_VALIDATION: o post antigo citava mais de 100 mil pacientes atendidos; não incluído por falta de validação',
  ],
};
