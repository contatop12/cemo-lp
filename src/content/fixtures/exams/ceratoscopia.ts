// Redigido a partir do post "ceratoscopia-para-que-serve-o-exame" (mesma URL, ranqueia) e da página /exames/ceratoscopia/ (301 para cá).
import type { Exam } from '../../types';

export const ceratoscopia: Exam = {
  id: 'ceratoscopia',
  name: 'Ceratoscopia (topografia de córnea)',
  aka: ['Ceratoscopia', 'Topografia de córnea', 'Topografia corneana', 'Topografia'],
  canonicalPath: '/ceratoscopia-para-que-serve-o-exame/',
  published: true,
  seo: {
    title: 'Ceratoscopia: para que serve a topografia de córnea',
    description:
      'Entenda para que serve a ceratoscopia (topografia de córnea), como é feita, como se preparar e por que ajuda no ceratocone e no astigmatismo.',
  },
  h1: 'Ceratoscopia (topografia de córnea): para que serve o exame',
  lead:
    'A ceratoscopia faz um mapa da curvatura da córnea. É um dos exames mais importantes para investigar ceratocone e astigmatismo e para planejar lentes e cirurgias.',
  summary: 'Mapa da curvatura da córnea, usado no ceratocone, no astigmatismo, em lentes de contato e antes e depois de cirurgias.',
  answer: {
    question: 'Para que serve a ceratoscopia?',
    text:
      'A ceratoscopia, também chamada de topografia de córnea, é um exame que mapeia a curvatura e a forma da superfície da córnea, a lente transparente na frente do olho. Serve para investigar e acompanhar o ceratocone e o astigmatismo, ajudar na adaptação de lentes de contato e avaliar a córnea antes e depois de cirurgias, quando há indicação médica.',
  },
  purpose: [
    'A córnea tem uma curvatura própria, e pequenas irregularidades mudam a forma como a luz chega à retina. A ceratoscopia transforma essa curvatura em um mapa colorido, em que cores mais quentes indicam áreas mais curvas e cores mais frias, áreas mais planas.',
    'O oftalmologista lê esse mapa para entender se a córnea é regular ou irregular. O resultado auxilia no diagnóstico de condições como o astigmatismo e o ceratocone, em que a córnea fica mais fina e se projeta para a frente em forma de cone.',
    'O exame também orienta o ajuste de lentes de contato, principalmente as especiais, e é usado em avaliações antes e depois de cirurgias refrativas e de procedimentos na córnea.',
  ],
  whenRequested: [
    'A ceratoscopia costuma ser pedida quando há suspeita de ceratocone, em especial em crianças, adolescentes e adultos jovens que têm visão embaçada ou distorcida mesmo com óculos, troca frequente de grau ou coceira intensa nos olhos. Esses sinais podem estar associados a diferentes condições e precisam de avaliação oftalmológica.',
    'Também é solicitada para investigar astigmatismo irregular, para quem pretende fazer cirurgia refrativa, para adaptar lentes de contato e no acompanhamento depois de algumas cirurgias da córnea.',
    'Nos casos de ceratocone diagnosticado, o exame é repetido periodicamente para ver se a córnea está estável. A frequência é definida pelo médico.',
  ],
  howDone: [
    'A pessoa apoia o queixo e a testa no aparelho e olha para uma luz ou um alvo de fixação. O equipamento projeta ou capta imagens da superfície da córnea e, em poucos instantes, calcula o mapa.',
    'Não há contato com o olho nem injeções. O exame costuma ser bem tolerado e não causa dor.',
    'O mapa mostra a curvatura e, dependendo do aparelho, outras medidas da córnea. Só o oftalmologista interpreta esses resultados em conjunto com a consulta.',
    'Em geral os dois olhos são examinados. Se a imagem sair com falhas por piscadas, o aparelho é refeito.',
  ],
  preparation: [
    'Quem usa lentes de contato precisa suspendê-las antes, porque elas alteram o formato da córnea e podem mascarar o resultado. O tempo de suspensão depende do tipo de lente: lentes rígidas exigem afastamento mais longo do que lentes gelatinosas. A equipe informa o prazo no agendamento.',
    'Evite colírios nos minutos que antecedem o exame, a menos que o médico tenha orientado. No dia, vá sem maquiagem nos olhos e leve os óculos e os exames anteriores.',
    'A pupila não costuma ser dilatada na topografia, mas, se o médico pedir outros exames na mesma visita, o efeito da dilatação será explicado.',
  ],
  duration: [
    'A ceratoscopia costuma ser rápida: a captura das imagens leva poucos minutos.',
    'O tempo total na clínica varia conforme a consulta e os outros exames que o médico solicitar.',
  ],
  aftercare: [
    'Depois da ceratoscopia, a pessoa pode voltar às atividades normais. O exame não deixa limitação para a visão.',
    'O médico explica o mapa, diz se há alguma alteração e orienta os próximos passos. Se houver ceratocone ou outra alteração, o acompanhamento e as opções de tratamento são discutidos na consulta. Guarde os resultados: comparar mapas de datas diferentes é parte do acompanhamento.',
  ],
  faq: [
    {
      question: 'Ceratoscopia e topografia de córnea são o mesmo exame?',
      answer: [
        'Sim, são nomes usados para o mesmo tipo de exame, com variações de nomenclatura: topografia, topografia corneana, topografia de córnea e ceratoscopia.',
      ],
    },
    {
      question: 'Quem tem ceratocone precisa repetir o exame?',
      answer: [
        'Sim. O ceratocone pode mudar com o tempo, e a topografia é um dos exames usados para acompanhar essa evolução. O intervalo é definido pelo oftalmologista.',
      ],
    },
    {
      question: 'Preciso parar de usar lente de contato antes?',
      answer: [
        'Sim, em geral. A lente pode alterar a curvatura da córnea e o resultado. O prazo de suspensão depende do tipo de lente e deve ser confirmado com a clínica.',
      ],
    },
    {
      question: 'A ceratoscopia serve para quem quer fazer cirurgia refrativa?',
      answer: [
        'Sim. Ela é um dos exames de avaliação da córnea antes da cirurgia refrativa. Com base nele e em outros exames, o médico decide se há indicação e qual técnica é adequada.',
      ],
    },
    {
      question: 'O exame dói ou usa colírio?',
      answer: [
        'Não causa dor e, em geral, não exige colírio. O aparelho não encosta no olho.',
      ],
    },
  ],
  related: {
    doctors: ['david-ribeiro-de-mendonca-filho'],
    specialties: ['cornea', 'refrativa', 'lentes-de-contato'],
    exams: ['paquimetria', 'microscopia-especular'],
    conditions: ['ceratocone', 'astigmatismo'],
    articles: [
      'ceratocone-em-criancas',
      'ceratocone-causa-cegueira',
      'manifestacoes-oculares-com-astigmatismo',
      'cross-link-perguntas-frequentes',
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
    'TODO_CONTENT_VALIDATION: aparelho de topografia usado na CEMO (a clínica declara topografia de córnea em vídeo, sem marca) e se há tomografia de córnea',
    'TODO_CONTENT_VALIDATION: prazos exatos de suspensão de lentes de contato (gelatinosas e rígidas) adotados pela CEMO',
    'TODO_CONTENT_VALIDATION: duração do exame na CEMO',
  ],
};
