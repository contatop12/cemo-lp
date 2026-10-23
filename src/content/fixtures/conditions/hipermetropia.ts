// Texto novo organizando a entidade; o post hipermetropia-como-e-a-visao (KEEP) responde a pergunta específica e é linkado.
import type { Condition } from '../../types';

export const hipermetropia: Condition = {
  id: 'hipermetropia',
  name: 'Hipermetropia',
  canonicalPath: '/condicoes-oculares/hipermetropia/',
  published: true,
  seo: {
    title: 'Hipermetropia: o que é, sintomas e tratamento',
    description:
      'Entenda o que é a hipermetropia, como ela afeta a visão de perto e de longe, como é diagnosticada e quais são as formas de correção.',
  },
  h1: 'Hipermetropia: o que é, sintomas e tratamento',
  lead: 'A hipermetropia é um erro de refração que pode causar cansaço visual e dor de cabeça, principalmente ao ler. Muita gente convive com ela sem saber, sobretudo na infância.',
  summary: 'Erro de refração em que o olho precisa de esforço extra para focalizar, causando cansaço e, em graus maiores, visão embaçada.',
  answer: {
    question: 'O que é hipermetropia?',
    text: 'Hipermetropia é um erro de refração em que o olho é um pouco curto ou a córnea tem pouca curvatura, e a luz tenta focalizar depois da retina. Para compensar, o olho faz um esforço de foco constante. Em graus baixos, a pessoa pode enxergar bem e sentir só cansaço e dor de cabeça; em graus maiores, a visão de perto e também a de longe ficam embaçadas. O oftalmologista diagnostica na consulta e indica a correção adequada.',
  },
  signs: {
    title: 'Sinais mais comuns',
    intro:
      'Esses sinais podem estar associados a diferentes condições e precisam de avaliação oftalmológica. Eles não servem como diagnóstico.',
    items: [
      'Cansaço e peso nos olhos depois de ler ou usar telas',
      'Dor de cabeça, principalmente no fim do dia',
      'Visão de perto embaçada',
      'Necessidade de afastar o texto para enxergar',
      'Olhos lacrimejando ou ardendo durante tarefas de perto',
      'Em crianças, desânimo para ler ou olhar torto (desvio dos olhos)',
    ],
  },
  sections: [
    {
      id: 'o-que-acontece',
      title: 'O que acontece no olho com hipermetropia?',
      paragraphs: [
        'Para enxergar bem, a luz precisa se focalizar sobre a retina. Na hipermetropia, o foco “cai” atrás dela. O olho consegue compensar parte disso usando o músculo de focalização, o que funciona melhor quando somos jovens.',
        'Por isso, uma criança ou um adulto jovem com hipermetropia pode enxergar bem e, mesmo assim, sofrer com esforço visual. Com o passar dos anos, essa capacidade diminui e os sintomas aparecem com mais clareza.',
        'Para quem quer entender como a pessoa com hipermetropia enxerga, o blog tem um artigo dedicado à pergunta.',
      ],
    },
    {
      id: 'causas',
      title: 'Causas e fatores de risco',
      paragraphs: [
        'A hipermetropia está ligada à forma do olho, que é determinada, em grande parte, por herança familiar. A maioria dos bebês nasce com algum grau de hipermetropia, que tende a diminuir durante o crescimento.',
      ],
      bullets: [
        'Histórico familiar de hipermetropia',
        'Olho com comprimento menor que o habitual',
        'Córnea ou cristalino com poder de foco reduzido',
        'Algumas condições oculares ou cirurgias, em casos específicos',
      ],
    },
    {
      id: 'diferenca-presbiopia',
      title: 'Hipermetropia e presbiopia são a mesma coisa?',
      paragraphs: [
        'Não. A presbiopia, a chamada vista cansada, é uma perda natural da capacidade de focalizar de perto que aparece em torno dos 40 anos em todas as pessoas. A hipermetropia vem da forma do olho e pode existir desde a infância.',
        'As duas podem coexistir, e a combinação costuma fazer os sintomas aparecerem mais cedo.',
      ],
    },
    {
      id: 'diagnostico',
      title: 'Como é feito o diagnóstico?',
      paragraphs: [
        'O diagnóstico é feito na consulta oftalmológica. O médico mede a acuidade visual, avalia o grau pela refração e examina o interior do olho. Em crianças, é comum usar colírio que relaxa o foco para obter a medida real do grau.',
        'Em alguns casos, o oftalmologista pede exames complementares para avaliar a córnea ou a saúde do nervo e da retina.',
      ],
    },
    {
      id: 'tratamentos',
      title: 'Quais são as opções de correção?',
      paragraphs: [
        'A correção depende do grau, da idade e dos sintomas. Nem toda hipermetropia precisa ser corrigida; em graus muito baixos e sem queixas, o médico pode apenas acompanhar.',
      ],
      bullets: [
        'Óculos com lentes que ajudam o olho a focalizar sobre a retina',
        'Lentes de contato, quando há indicação e boa adaptação',
        'Cirurgia refrativa a laser, em casos selecionados e dentro de limites de grau definidos na avaliação',
        'Implante de lente intraocular, em situações específicas, indicado pelo médico',
      ],
    },
    {
      id: 'criancas',
      title: 'Hipermetropia na infância',
      paragraphs: [
        'Nas crianças, a hipermetropia merece atenção especial. Quando não corrigida, pode causar cansaço, dificuldade na leitura e, em alguns casos, desvio dos olhos (estrabismo).',
        'A criança raramente reclama, porque considera normal o que enxerga. Por isso a consulta oftalmológica de rotina, mesmo sem queixa, é recomendada, principalmente se há histórico familiar.',
      ],
    },
    {
      id: 'cuidados',
      title: 'Cuidados e convivência',
      paragraphs: [
        'Usar o grau indicado, fazer pausas em atividades de perto e manter boa iluminação ajudam a reduzir o cansaço. As consultas periódicas permitem ajustar o grau ao longo da vida, já que ele pode mudar.',
        'Não há forma comprovada de prevenir a hipermetropia, mas a detecção precoce evita desconforto e complicações.',
      ],
    },
    {
      id: 'quando-procurar',
      title: 'Quando procurar o oftalmologista?',
      paragraphs: [
        'Procure atendimento se sentir dor de cabeça frequente ao ler, se a visão de perto está embaçada ou se você percebe que o grau mudou. Para crianças, agende a avaliação se houver queixas, desvio dos olhos ou dificuldade escolar.',
      ],
    },
  ],
  faq: [
    {
      question: 'Hipermetropia tem cura?',
      answer: [
        'Ela pode ser corrigida, mas não some por conta própria. Em alguns casos, a cirurgia refrativa pode reduzir a dependência de óculos, porém isso depende do grau e da avaliação do médico.',
      ],
    },
    {
      question: 'Quem tem hipermetropia enxerga bem de longe?',
      answer: [
        'Em graus baixos e em pessoas jovens, muitas vezes sim, porque o olho compensa. Em graus maiores ou com a idade, a visão de longe também pode ficar embaçada.',
      ],
    },
    {
      question: 'Hipermetropia causa dor de cabeça?',
      answer: [
        'Pode causar, porque o olho faz esforço contínuo para focalizar. A dor costuma aparecer depois de atividades de perto. Como várias condições provocam dor de cabeça, vale investigar com o oftalmologista.',
      ],
    },
    {
      question: 'A hipermetropia da criança some com o tempo?',
      answer: [
        'Em muitos casos o grau diminui durante o crescimento, mas isso não vale para todas as crianças. Só o oftalmologista pode dizer se há necessidade de óculos ou de acompanhamento.',
      ],
    },
    {
      question: 'Hipermetropia é a mesma coisa que vista cansada?',
      answer: [
        'Não. A vista cansada (presbiopia) é uma mudança natural do cristalino com a idade. A hipermetropia vem da forma do olho e pode existir desde a infância.',
      ],
    },
  ],
  related: {
    doctors: ['david-ribeiro-de-mendonca-filho', 'adriana-bizzarri'],
    specialties: ['refrativa', 'oftalmopediatria'],
    exams: [],
    conditions: ['miopia', 'astigmatismo', 'presbiopia'],
    articles: ['hipermetropia-como-e-a-visao', 'criancas-e-saude-ocular-sinais-de-alerta-para-pais', 'quem-pode-fazer-a-cirurgia-refrativa'],
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
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO realiza cirurgia refrativa para hipermetropia e implante de lente intraocular nesse contexto',
  ],
};
