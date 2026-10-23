// Conteúdo reescrito a partir da página atual /especialidades/retina/ e dos posts de retina e mácula (mapeamento, DMRI).
import type { Specialty } from '../../types';

export const retina: Specialty = {
  id: 'retina',
  kind: 'especialidade',
  name: 'Retina',
  shortName: 'Retina',
  canonicalPath: '/especialidades/retina/',
  published: true,
  seo: {
    title: 'Retina e mácula em Taboão da Serra',
    description:
      'Avaliação e tratamento de doenças da retina e da mácula, clínico e cirúrgico, com exames no mesmo lugar. Saiba quais sinais pedem atendimento rápido.',
  },
  h1: 'Retina e mácula em Taboão da Serra',
  lead: 'A retina é o tecido que capta a imagem no fundo do olho, e a mácula é a região responsável pela visão de detalhes. Veja como as doenças dessa área são investigadas e tratadas, e quais sinais não devem esperar.',
  summary: 'Retina clínica e cirúrgica: avaliação, exames e tratamento de doenças da retina e da mácula.',
  leadInterest: 'retina',
  ctaLabel: 'Agendar avaliação de retina',
  answer: {
    question: 'O que a especialidade de retina trata?',
    text: 'A retina é a camada de tecido no fundo do olho que transforma a luz em sinal para o cérebro, e a mácula, no centro dela, permite ler, reconhecer rostos e enxergar detalhes. A especialidade de retina cuida de doenças como a degeneração macular, a retinopatia diabética, o descolamento de retina e as oclusões vasculares, de forma clínica, com medicamentos e laser, ou cirúrgica, conforme a indicação.',
  },
  signs: {
    title: 'Sinais que pedem atendimento oftalmológico imediato',
    intro:
      'Alguns sinais podem estar associados a diferentes condições, inclusive a problemas da retina que precisam de avaliação sem demora. Se eles surgirem, procure atendimento oftalmológico imediato:',
    items: [
      'Flashes de luz repentinos ou em maior quantidade',
      'Aumento súbito de moscas volantes, aquelas manchinhas ou fios que passam pela visão',
      'Sombra, “cortina” ou área escura que avança pelo campo de visão',
      'Distorção de linhas retas, que parecem onduladas, ou mancha no centro da visão',
      'Queda brusca da visão em um dos olhos',
    ],
  },
  sections: [
    {
      id: 'o-que-e',
      title: 'O que são a retina e a mácula?',
      paragraphs: [
        'A retina reveste o fundo do olho e funciona como a tela onde a imagem se forma. Ela é formada por células sensíveis à luz que enviam as informações pelo nervo óptico até o cérebro.',
        'A mácula fica no centro da retina e é responsável pela visão central, usada para ler, dirigir, costurar e reconhecer rostos. Doenças que atingem essa região costumam afetar justamente essas tarefas, enquanto a visão lateral pode ficar preservada por mais tempo.',
      ],
    },
    {
      id: 'condicoes',
      title: 'Quais doenças da retina e da mácula são avaliadas?',
      paragraphs: [
        'Entre as condições que o oftalmologista de retina acompanha, as mais conhecidas são as listadas abaixo. Cada uma tem causas, evolução e tratamentos próprios, definidos após o exame.',
      ],
      bullets: [
        'Degeneração macular relacionada à idade: afeta a visão central, principalmente depois dos 50 anos',
        'Retinopatia diabética: lesão dos vasos da retina associada ao diabetes',
        'Descolamento de retina: separação da retina da parede do olho, que precisa de atenção rápida',
        'Oclusões vasculares: bloqueio de veias ou artérias que irrigam a retina',
        'Outras doenças da mácula e da retina, inclusive hereditárias',
      ],
    },
    {
      id: 'diabetes',
      title: 'Quem tem diabetes ou hipertensão precisa olhar a retina?',
      paragraphs: [
        'Sim. Diabetes e hipertensão podem afetar os pequenos vasos da retina sem causar sintomas no início. Por isso, quem tem essas condições costuma ser orientado a fazer avaliações periódicas do fundo do olho, mesmo enxergando bem.',
        'A frequência é definida pelo oftalmologista de acordo com seu quadro. O controle da doença de base, com o seu médico clínico, faz parte do cuidado com a retina.',
      ],
    },
    {
      id: 'exames',
      title: 'Quais exames avaliam a retina?',
      paragraphs: [
        'O oftalmologista combina o exame clínico com exames de imagem para ver a retina com detalhe e acompanhar mudanças ao longo do tempo. Os mais usados são:',
      ],
      bullets: [
        'Mapeamento de retina: exame com a pupila dilatada que examina toda a retina, inclusive a periferia',
        'Retinografia: fotografia colorida do fundo do olho, útil para registrar e comparar a evolução',
        'Tomografia de coerência óptica (OCT): imagem em cortes que mostra as camadas da retina e da mácula',
      ],
    },
    {
      id: 'tratamento',
      title: 'Como é o tratamento das doenças da retina?',
      paragraphs: [
        'O tratamento depende da doença, da fase e do olho. Algumas condições só precisam de acompanhamento regular. Outras exigem tratamento para estabilizar a visão.',
        'A CEMO atua em retina clínica e cirúrgica, o que inclui injeções, laser e cirurgias de retina. As injeções intravítreas, aplicadas dentro do olho, e o laser são exemplos de recursos usados no cuidado clínico. A cirurgia é indicada em situações como o descolamento de retina, conforme a avaliação do especialista.',
        'O tempo de recuperação e os cuidados pós-operatórios, como o uso de colírios, variam de caso para caso e devem ser seguidos conforme as orientações da equipe.',
      ],
    },
    {
      id: 'na-cemo',
      title: 'Como é o atendimento de retina na CEMO?',
      paragraphs: [
        'A CEMO reúne as especialidades da oftalmologia em um só lugar. O paciente passa na avaliação já com o especialista da área e faz os exames no mesmo dia, sem precisar voltar em outras datas.',
        'Na retina, o atendimento envolve o Dr. Adriano de Morais Ferreira e o Dr. José Pereira do Rego Neto, especialistas em retina clínica e cirúrgica.',
      ],
    },
  ],
  faq: [
    {
      question: 'Moscas volantes são perigosas?',
      answer: [
        'Em muitos casos as moscas volantes são benignas e fazem parte do envelhecimento do corpo vítreo, o gel que preenche o olho. Mas o aparecimento súbito de muitas moscas, principalmente se vier com flashes de luz ou sombra no campo de visão, precisa de avaliação oftalmológica imediata.',
      ],
    },
    {
      question: 'Descolamento de retina dá dor?',
      answer: [
        'Em geral não. Os sinais costumam ser flashes de luz, moscas volantes súbitas e uma sombra que avança pelo campo de visão. Como não dói, a ausência de dor não deve atrasar a procura por atendimento.',
      ],
    },
    {
      question: 'Degeneração macular tem cura?',
      answer: [
        'Depende do tipo. Em geral, o tratamento busca controlar a doença e preservar a visão, e o diagnóstico precoce amplia as opções. O oftalmologista explica o que é possível para o seu caso após os exames.',
      ],
    },
    {
      question: 'A injeção no olho dói?',
      answer: [
        'Em termos gerais, o procedimento é feito com anestesia, e a sensação varia de pessoa para pessoa. O especialista explica o que esperar antes de indicar o tratamento.',
      ],
    },
    {
      question: 'Por que a pupila é dilatada no mapeamento de retina?',
      answer: [
        'A dilatação abre a pupila e permite ao oftalmologista ver toda a retina, incluindo as bordas. Depois do exame, a visão pode ficar embaçada e mais sensível à luz por algumas horas, por isso é bom ir acompanhado.',
      ],
    },
  ],
  related: {
    doctors: ['adriano-de-morais-ferreira', 'jose-pereira-do-rego-neto'],
    specialties: ['consulta', 'glaucoma'],
    exams: ['mapeamento-de-retina', 'retinografia', 'tomografia-de-coerencia-optica'],
    conditions: ['degeneracao-macular', 'descolamento-de-retina'],
    articles: [
      'o-que-e-retina',
      'qual-a-funcao-da-retina',
      'doencas-na-retina',
      'quais-doencas-podem-causar-degeneracao-macular-e-como-evitar',
      'retinoplastia-oque-e',
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
    'TODO_CONTENT_VALIDATION: confirmar quais tipos de laser e cirurgia de retina a CEMO realiza e quais doenças trata (o vídeo cita apenas injeções, laser e cirurgias de retina)',
    'TODO_CONTENT_VALIDATION: confirmar se mapeamento de retina, retinografia e OCT são feitos na clínica e se há tomografia disponível para retina',
    'TODO_CONTENT_VALIDATION: validar a terminologia “retinoplastia” com a equipe médica antes de qualquer uso como serviço; o post retinoplastia-oque-e está linkado apenas como leitura de apoio',
    'TODO_CONTENT_VALIDATION: o site antigo informava recuperação de 45 a 60 dias após cirurgia de retina, sem fonte; confirmar antes de usar',
  ],
};
