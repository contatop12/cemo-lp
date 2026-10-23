// Consolida o post degeneracao-macular-relacionada-a-idade-dmri-como-prevenir-e-tratar; o post de causas da DM (KEEP) é linkado.
import type { Condition } from '../../types';

export const degeneracaoMacular: Condition = {
  id: 'degeneracao-macular',
  name: 'Degeneração Macular',
  canonicalPath: '/condicoes-oculares/degeneracao-macular/',
  published: true,
  seo: {
    title: 'Degeneração macular: sintomas e tratamento',
    description:
      'Entenda a degeneração macular relacionada à idade (DMRI): sinais, fatores de risco, exames para diagnóstico e opções de tratamento e acompanhamento.',
  },
  h1: 'Degeneração macular: o que é, sinais e tratamento',
  lead: 'A degeneração macular relacionada à idade (DMRI) afeta a parte central da retina e pode comprometer a visão de detalhes. O diagnóstico precoce e o acompanhamento fazem diferença.',
  summary: 'Doença da mácula, região central da retina, que prejudica a visão de detalhes e é mais frequente após os 50 anos.',
  answer: {
    question: 'O que é degeneração macular?',
    text: 'Degeneração macular é uma doença que afeta a mácula, a pequena região central da retina responsável pela visão nítida e de detalhes, usada para ler, reconhecer rostos e dirigir. A forma mais comum aparece com o envelhecimento e é chamada de DMRI. Ela costuma preservar a visão periférica e pode evoluir de modo lento (forma seca) ou mais rápido (forma úmida). O diagnóstico é feito por oftalmologista, com exames da retina, e o tratamento depende da forma.',
  },
  signs: {
    title: 'Sinais que merecem atenção',
    intro:
      'Esses sinais podem estar associados a diferentes condições e precisam de avaliação oftalmológica. Eles não servem como diagnóstico.',
    items: [
      'Linhas retas que parecem tortas ou onduladas',
      'Mancha escura ou borrada no centro da visão',
      'Dificuldade para ler ou reconhecer rostos',
      'Cores que parecem menos vivas',
      'Necessidade de mais luz para enxergar detalhes',
      'Piora súbita da visão central em um dos olhos',
    ],
  },
  sections: [
    {
      id: 'o-que-e',
      title: 'O que é a mácula e o que acontece na doença?',
      paragraphs: [
        'A mácula fica no centro da retina e concentra as células que permitem ver detalhes e cores. Na degeneração macular, essa região sofre desgaste progressivo.',
        'A doença costuma preservar a visão periférica: a pessoa consegue se locomover, mas tem dificuldade para tarefas que dependem do centro da visão. Nas fases iniciais pode não haver sintomas.',
      ],
    },
    {
      id: 'tipos',
      title: 'Forma seca e forma úmida',
      paragraphs: [
        'A forma seca é a mais comum e evolui de forma gradual, com acúmulo de depósitos e afinamento da retina. A forma úmida é menos frequente, mas pode ser mais rápida, por causa do crescimento de vasos anormais que vazam líquido ou sangue.',
        'Uma forma seca pode evoluir para a úmida, por isso o acompanhamento regular é recomendado.',
      ],
    },
    {
      id: 'causas',
      title: 'Causas e fatores de risco',
      paragraphs: [
        'A causa é multifatorial. A idade é o principal fator, e outros aspectos aumentam o risco. O artigo do blog sobre doenças que podem causar degeneração macular aprofunda o tema.',
      ],
      bullets: [
        'Idade acima de 50 anos',
        'Histórico familiar de degeneração macular',
        'Tabagismo',
        'Hipertensão, colesterol alto e outras doenças cardiovasculares',
        'Alimentação pobre em frutas e vegetais',
        'Exposição prolongada e sem proteção à radiação solar',
      ],
    },
    {
      id: 'diagnostico',
      title: 'Como é feito o diagnóstico?',
      paragraphs: [
        'O oftalmologista examina a retina com o olho dilatado. Exames de imagem ajudam a ver a mácula em detalhe: a tomografia de coerência óptica (OCT) mostra as camadas da retina, a retinografia registra o fundo do olho e o mapeamento de retina avalia a periferia.',
        'Em alguns casos, outros exames são pedidos para avaliar vasos e líquido sob a retina. A frequência dos retornos é definida pelo médico.',
      ],
    },
    {
      id: 'tratamentos',
      title: 'Quais tratamentos existem?',
      paragraphs: [
        'A conduta depende da forma e do estágio. Em termos gerais:',
      ],
      bullets: [
        'Forma seca: acompanhamento regular, controle dos fatores de risco e, em casos selecionados, suplementação orientada pelo médico',
        'Forma úmida: injeções intravítreas de medicamentos que reduzem o crescimento e o vazamento dos vasos, aplicadas no olho',
        'Laser ou outras terapias, em situações específicas',
        'Reabilitação visual, para ajudar quem já tem perda de visão central',
      ],
    },
    {
      id: 'autoteste',
      title: 'Tela de Amsler: automonitoramento',
      paragraphs: [
        'A tela de Amsler é um quadriculado usado para perceber distorções no centro da visão. Quando o oftalmologista a recomenda, a pessoa observa a grade com um olho de cada vez, em casa, com os óculos de perto.',
        'Se as linhas parecerem tortas ou houver mancha, entre em contato com o médico. A tela não substitui a consulta nem o exame de imagem.',
      ],
    },
    {
      id: 'prevencao',
      title: 'Cuidados e prevenção',
      paragraphs: [
        'Não existe forma de prevenir totalmente a doença, mas hábitos saudáveis podem contribuir para a saúde da retina:',
      ],
      bullets: [
        'Não fumar',
        'Manter alimentação variada, rica em vegetais e frutas',
        'Controlar pressão arterial, colesterol e diabetes',
        'Usar óculos de sol com proteção contra raios ultravioleta',
        'Fazer consultas oftalmológicas regulares a partir dos 50 anos',
      ],
    },
    {
      id: 'quando-procurar',
      title: 'Quando procurar o oftalmologista?',
      paragraphs: [
        'Procure atendimento se notar distorção, mancha no centro da visão ou dificuldade nova para ler. Se a alteração surgir de forma súbita, não espere: a avaliação deve ser rápida, porque algumas formas precisam de tratamento sem demora.',
      ],
    },
  ],
  faq: [
    {
      question: 'Degeneração macular causa cegueira total?',
      answer: [
        'Em geral ela afeta o centro da visão e preserva a visão periférica. A perda de visão central, porém, pode limitar bastante atividades como ler, e por isso o diagnóstico precoce é importante.',
      ],
    },
    {
      question: 'Degeneração macular tem cura?',
      answer: [
        'Não há cura, mas existem tratamentos para a forma úmida e acompanhamento para a seca que podem ajudar a controlar a evolução. A conduta é individual.',
      ],
    },
    {
      question: 'Quem tem degeneração macular precisa de exames com que frequência?',
      answer: [
        'Depende da forma e do estágio. O oftalmologista define o intervalo entre as consultas e os exames de imagem.',
      ],
    },
    {
      question: 'A degeneração macular é hereditária?',
      answer: [
        'Existe componente genético, e quem tem parentes próximos com a doença apresenta risco maior. Isso não significa que a doença vá ocorrer, mas é um bom motivo para manter as consultas.',
      ],
    },
    {
      question: 'Degeneração macular só ocorre em idosos?',
      answer: [
        'A forma relacionada à idade é mais comum após os 50 anos. Existem também formas hereditárias que aparecem mais cedo, como a doença de Stargardt, que tem artigo próprio no blog.',
      ],
    },
  ],
  related: {
    doctors: ['adriano-de-morais-ferreira', 'david-ribeiro-de-mendonca-filho'],
    specialties: ['retina'],
    exams: ['tomografia-de-coerencia-optica', 'mapeamento-de-retina', 'retinografia'],
    conditions: ['baixa-visao', 'descolamento-de-retina'],
    articles: ['quais-doencas-podem-causar-degeneracao-macular-e-como-evitar', 'doenca-de-stargardt-como-funciona', 'recursos-opticos-para-baixa-visao-cemo'],
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
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO aplica injeção intravítrea e laser na degeneração macular (o vídeo do Dr. David cita injeções, laser e cirurgias de retina de forma geral)',
    'TODO_CONTENT_VALIDATION: confirmar a recomendação de uso da tela de Amsler com o Dr. Adriano',
  ],
};
