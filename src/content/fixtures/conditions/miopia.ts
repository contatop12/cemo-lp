// Consolida o post tudo-sobre-miopia, com apoio do texto de /especialidades/refrativa/.
import type { Condition } from '../../types';

export const miopia: Condition = {
  id: 'miopia',
  name: 'Miopia',
  canonicalPath: '/condicoes-oculares/miopia/',
  published: true,
  seo: {
    title: 'Miopia: o que é, sintomas e tratamentos',
    description:
      'Veja o que causa a miopia, quais sinais observar, como é feito o diagnóstico e quais opções existem, de óculos a cirurgia refrativa, quando há indicação.',
  },
  h1: 'Miopia: o que é, sintomas e tratamentos',
  lead: 'A miopia é um dos erros de refração mais comuns e costuma aparecer na infância ou na adolescência. Entenda como ela se manifesta e como é corrigida.',
  summary: 'Erro de refração em que a visão de longe fica desfocada e a de perto, em geral, permanece nítida.',
  answer: {
    question: 'O que é miopia?',
    text: 'Miopia é um erro de refração em que a luz focaliza antes da retina, em vez de exatamente sobre ela. Por isso, a pessoa enxerga com clareza de perto, mas tem a visão de longe embaçada. Costuma surgir na infância ou na adolescência e pode aumentar ao longo do crescimento. O diagnóstico é feito na consulta oftalmológica, com medida do grau, e a correção pode ser feita com óculos, lentes de contato ou, quando há indicação, cirurgia refrativa.',
  },
  signs: {
    title: 'Sinais mais comuns',
    intro:
      'Esses sinais podem estar associados a diferentes condições e precisam de avaliação oftalmológica. Eles não servem como diagnóstico.',
    items: [
      'Dificuldade para enxergar a lousa, a TV ou placas de longe',
      'Apertar os olhos para tentar enxergar melhor',
      'Aproximar muito o rosto de telas e livros',
      'Dor de cabeça e cansaço visual',
      'Coceira ou desconforto frequente nos olhos',
      'Queda no rendimento escolar sem outra explicação aparente',
    ],
  },
  sections: [
    {
      id: 'o-que-e-erro-de-refracao',
      title: 'O que acontece no olho de quem tem miopia?',
      paragraphs: [
        'Para enxergar bem, a luz que entra no olho precisa ser focalizada sobre a retina, o “filme” no fundo do olho. Quando isso não acontece, falamos em erro de refração.',
        'Na miopia, o olho costuma ser um pouco mais alongado do que o ideal, ou a córnea tem curvatura mais acentuada. A imagem se forma antes da retina e fica desfocada para objetos distantes.',
      ],
    },
    {
      id: 'causas',
      title: 'Causas e fatores de risco',
      paragraphs: [
        'Não existe uma causa única. A herança familiar pesa: filhos de pais míopes têm mais chance de também ter miopia. O ambiente também influencia.',
      ],
      bullets: [
        'Histórico familiar de miopia',
        'Muitas horas de atividade visual de perto, como leitura e telas',
        'Pouco tempo ao ar livre durante a infância',
        'Doenças oculares associadas, em casos específicos',
      ],
    },
    {
      id: 'tipos',
      title: 'Existem tipos de miopia?',
      paragraphs: [
        'Sim. A miopia pode ser classificada pelo mecanismo (por exemplo, axial, quando o olho é mais comprido, ou de curvatura) e pela intensidade do grau. Quando o grau é alto, o oftalmologista dá atenção especial à saúde da retina.',
        'Se você quer entender cada tipo, há um artigo próprio no blog sobre o assunto.',
      ],
    },
    {
      id: 'diagnostico',
      title: 'Como é feito o diagnóstico?',
      paragraphs: [
        'O oftalmologista mede a acuidade visual, determina o grau pela refração e examina o fundo do olho. Em crianças, pode usar colírio para relaxar o foco e obter a medida com mais precisão.',
        'Antes de uma cirurgia refrativa, são necessários exames complementares, como a análise da forma e da espessura da córnea e o mapeamento de retina, para saber se há indicação.',
      ],
    },
    {
      id: 'tratamentos',
      title: 'Quais são as opções de correção?',
      paragraphs: [
        'O objetivo é fazer a imagem focar corretamente na retina. A escolha depende do grau, da idade, do estilo de vida e da saúde dos olhos, sempre após avaliação.',
      ],
      bullets: [
        'Óculos de grau, a opção mais simples e segura para a maioria',
        'Lentes de contato, que podem ser úteis em graus altos ou em atividades físicas',
        'Cirurgia refrativa a laser, que remodela a córnea, quando há indicação médica',
        'Em crianças, estratégias de controle da progressão definidas pelo oftalmologista',
      ],
    },
    {
      id: 'cirurgia',
      title: 'Cirurgia refrativa para miopia',
      paragraphs: [
        'A cirurgia a laser altera a curvatura da córnea para que a luz passe a focalizar na retina. As técnicas mais usadas são conhecidas pelas siglas LASIK e PRK, e a equipe indica a técnica adequada após a avaliação.',
        'Nem todo olho tem indicação. A espessura e a forma da córnea, a estabilidade do grau e a saúde da retina entram na análise. Em muitos casos, a cirurgia pode reduzir ou dispensar o uso de óculos, mas isso não é garantido e depende de cada pessoa.',
      ],
    },
    {
      id: 'cuidados',
      title: 'Cuidados e prevenção',
      paragraphs: [
        'Não há forma comprovada de evitar a miopia. Alguns hábitos podem contribuir para a saúde visual, principalmente na infância: passar tempo ao ar livre, fazer pausas durante leitura e telas e manter boa iluminação.',
        'Consultas regulares permitem detectar mudanças de grau cedo. Em crianças, o acompanhamento é especialmente importante.',
      ],
    },
    {
      id: 'quando-procurar',
      title: 'Quando procurar o oftalmologista?',
      paragraphs: [
        'Procure avaliação se notar dificuldade para enxergar de longe, dores de cabeça frequentes ou se o grau parece mudar rápido. Em crianças, fique atento ao comportamento: apertar os olhos e sentar muito perto da TV são pistas.',
        'Se surgirem clarões de luz, aumento súbito de pontos flutuantes ou sombra no campo de visão, procure atendimento com urgência, especialmente em quem tem miopia alta.',
      ],
    },
  ],
  faq: [
    {
      question: 'Miopia tem cura?',
      answer: [
        'A miopia pode ser corrigida, mas não “desaparece” sozinha. A cirurgia refrativa pode reduzir o grau ou dispensar óculos quando há indicação, porém o grau pode mudar com o tempo e o resultado varia de pessoa para pessoa.',
      ],
    },
    {
      question: 'O grau da miopia para de aumentar?',
      answer: [
        'Na maioria das pessoas, o grau tende a se estabilizar no início da vida adulta, mas isso varia. Por isso, consultas regulares são recomendadas durante o crescimento.',
      ],
    },
    {
      question: 'Usar óculos faz o grau piorar?',
      answer: [
        'Não. Os óculos corrigem a visão e não pioram a miopia. Deixar de usar o grau certo pode causar cansaço e prejudicar o desempenho, principalmente em crianças.',
      ],
    },
    {
      question: 'Ficar muito tempo no celular causa miopia?',
      answer: [
        'O esforço visual prolongado de perto é considerado um fator ambiental associado ao aumento da miopia. Pausas, boa iluminação e tempo ao ar livre são hábitos recomendados.',
      ],
    },
    {
      question: 'Miopia é diferente de astigmatismo?',
      answer: [
        'Sim, são erros de refração distintos, mas podem existir juntos. Na miopia a imagem forma-se antes da retina; no astigmatismo, a curvatura irregular da córnea distorce a imagem em qualquer distância.',
      ],
    },
  ],
  related: {
    doctors: ['david-ribeiro-de-mendonca-filho'],
    specialties: ['refrativa', 'lentes-de-contato', 'oftalmopediatria'],
    exams: [],
    conditions: ['astigmatismo', 'hipermetropia'],
    articles: [
      'tipos-de-miopia',
      'miopia-duvidas-frequentes',
      'o-que-e-miopia-infantil',
      'miopia-quando-pode-ser-corrigida',
      'qual-a-diferenca-de-miopia-e-astigmatismo',
    ],
  },
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
    'TODO_CONTENT_VALIDATION: confirmar quais técnicas de cirurgia refrativa (LASIK, PRK etc.) a CEMO realiza',
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO oferece estratégias de controle de miopia infantil',
  ],
};
