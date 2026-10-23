// Consolida o post tudo-sobre-conjuntivite; o post o-que-acontece-se-nao-tratar-conjuntivite (KEEP) é linkado.
import type { Condition } from '../../types';

export const conjuntivite: Condition = {
  id: 'conjuntivite',
  name: 'Conjuntivite',
  canonicalPath: '/condicoes-oculares/conjuntivite/',
  published: true,
  seo: {
    title: 'Conjuntivite: tipos, sintomas e tratamento',
    description:
      'Saiba como diferenciar conjuntivite viral, bacteriana e alérgica, como evitar a transmissão e quando procurar um oftalmologista para o tratamento correto.',
  },
  h1: 'Conjuntivite: tipos, sintomas e tratamento',
  lead: 'A conjuntivite é uma das causas mais comuns de olho vermelho. O tratamento muda conforme o tipo, por isso vale saber como ela se apresenta e quando buscar avaliação.',
  summary: 'Inflamação da conjuntiva, que pode ser viral, bacteriana ou alérgica e causa olho vermelho, secreção e coceira.',
  answer: {
    question: 'O que é conjuntivite?',
    text: 'Conjuntivite é a inflamação da conjuntiva, a membrana fina e transparente que cobre a parte branca do olho e o interior das pálpebras. Ela deixa o olho vermelho, com lacrimejamento, coceira ou secreção. Pode ser causada por vírus, bactérias ou alergias, e as formas infecciosas são contagiosas. Como o tratamento depende da causa, o ideal é consultar o oftalmologista em vez de usar colírios por conta própria.',
  },
  signs: {
    title: 'Sinais mais comuns',
    intro:
      'Esses sinais podem estar associados a diferentes condições e precisam de avaliação oftalmológica. Eles não servem como diagnóstico.',
    items: [
      'Olho vermelho em um ou nos dois olhos',
      'Coceira ou sensação de areia nos olhos',
      'Lacrimejamento',
      'Secreção, que pode deixar as pálpebras grudadas ao acordar',
      'Inchaço das pálpebras',
      'Sensibilidade à luz',
    ],
  },
  sections: [
    {
      id: 'tipos',
      title: 'Quais são os tipos de conjuntivite?',
      paragraphs: [
        'Em geral, a conjuntivite é dividida em três grupos, de acordo com a causa.',
      ],
      bullets: [
        'Viral: associada a vírus, costuma vir com lacrimejamento e secreção clara, às vezes junto de sintomas de gripe, e é bastante contagiosa',
        'Bacteriana: causada por bactérias, tende a ter secreção mais espessa e amarelada, e também é contagiosa',
        'Alérgica: reação a poeira, pólen, pelos de animais ou outros agentes, com coceira intensa; não é contagiosa',
      ],
    },
    {
      id: 'transmissao',
      title: 'Como a conjuntivite é transmitida?',
      paragraphs: [
        'As formas virais e bacterianas passam por contato com secreções do olho, por mãos contaminadas, toalhas, fronhas e objetos de uso pessoal. Ambientes com muitas pessoas facilitam a transmissão.',
        'A conjuntivite alérgica não passa de uma pessoa para outra, mas pode se repetir quando a pessoa entra em contato com o agente que a provoca.',
      ],
    },
    {
      id: 'diagnostico',
      title: 'Como é feito o diagnóstico?',
      paragraphs: [
        'Antes de tudo, vale lembrar que os sintomas se parecem entre os tipos. Só a avaliação de um profissional permite saber se há infecção, alergia ou outro problema, e isso define o cuidado certo.',
        'O diagnóstico é clínico: o oftalmologista examina os olhos, avalia o tipo de secreção e a aparência da conjuntiva e investiga o histórico. Em casos mais difíceis ou recorrentes, pode pedir exames adicionais.',
        'Um olho vermelho nem sempre é conjuntivite. Condições como alterações da córnea, uveíte ou glaucoma agudo também podem avermelhar o olho e exigem tratamento específico.',
      ],
    },
    {
      id: 'tratamento',
      title: 'Como se trata?',
      paragraphs: [
        'O tratamento depende do tipo e é definido pelo médico. Em termos gerais:',
      ],
      bullets: [
        'Viral: costuma melhorar sozinha, com cuidados de higiene e lubrificação; o médico orienta o que usar',
        'Bacteriana: pode exigir colírio com antibiótico prescrito',
        'Alérgica: medicamentos para aliviar a coceira e, principalmente, afastar o que desencadeia a alergia',
      ],
    },
    {
      id: 'evitar-contagio',
      title: 'Cuidados para não transmitir',
      paragraphs: [
        'Enquanto os sintomas durarem, alguns hábitos reduzem o risco de passar a conjuntivite adiante:',
      ],
      bullets: [
        'Lavar as mãos com frequência',
        'Evitar coçar e levar as mãos aos olhos',
        'Usar toalha, fronha e lenços de uso individual e trocá-los com frequência',
        'Não compartilhar maquiagem, colírios e objetos que tocam o rosto',
        'Evitar piscinas e locais com aglomeração até a orientação médica',
        'Suspender o uso de lentes de contato enquanto houver sintomas',
      ],
    },
    {
      id: 'cuidado-com-colirios',
      title: 'Por que evitar automedicação?',
      paragraphs: [
        'Colírios com corticoide ou antibiótico usados sem indicação podem mascarar o problema, causar efeitos colaterais e piorar a doença. Somente colírios lubrificantes liberados pelo médico devem ser usados por conta própria.',
        'O artigo sobre o que acontece se a conjuntivite não for tratada explica os riscos de deixar o quadro sem acompanhamento.',
      ],
    },
    {
      id: 'quando-procurar',
      title: 'Quando procurar o oftalmologista?',
      paragraphs: [
        'Procure atendimento se o olho vermelho vier acompanhado de dor, queda da visão, muita sensibilidade à luz, secreção abundante ou se os sintomas não melhorarem em poucos dias. Recém-nascidos, usuários de lentes de contato e pessoas com doenças que reduzem a imunidade devem ser avaliados logo.',
      ],
    },
  ],
  faq: [
    {
      question: 'Conjuntivite passa sozinha?',
      answer: [
        'Algumas formas, em especial as virais, tendem a melhorar sem medicação específica, mas isso só pode ser definido depois de avaliar o olho. Outras precisam de tratamento para evitar complicações.',
      ],
    },
    {
      question: 'Quanto tempo dura a conjuntivite?',
      answer: [
        'Depende do tipo e do tratamento. De modo geral, as infecciosas melhoram em alguns dias a poucas semanas. Se não houver melhora, volte ao oftalmologista.',
      ],
    },
    {
      question: 'Conjuntivite é contagiosa o tempo todo?',
      answer: [
        'As formas virais e bacterianas são contagiosas enquanto houver secreção e sintomas. O médico orienta quando é seguro voltar à escola ou ao trabalho.',
      ],
    },
    {
      question: 'Posso usar lente de contato com conjuntivite?',
      answer: [
        'Não é recomendado. Suspenda as lentes enquanto houver sintomas e converse com o oftalmologista sobre quando voltar a usar e como higienizar ou trocar as lentes.',
      ],
    },
    {
      question: 'Conjuntivite deixa sequelas?',
      answer: [
        'Na maioria dos casos tratados corretamente, não. Casos não acompanhados podem afetar a córnea e a visão, por isso vale buscar avaliação.',
      ],
    },
  ],
  related: {
    doctors: [],
    specialties: ['consulta'],
    exams: [],
    conditions: ['olho-seco', 'uveite'],
    articles: ['o-que-acontece-se-nao-tratar-conjuntivite', 'alergias-oculares-na-primavera'],
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
    'TODO_CONTENT_VALIDATION: definir médico(a) revisor(a) e perfis relacionados para conjuntivite (nenhum perfil publicado cobre o tema com clareza)',
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO atende consultas de urgência para olho vermelho',
  ],
};
