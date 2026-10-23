// Conteúdo novo (não há página atual): posts do blog que citam estrabismo, briefing e fala do Dr. David sobre as especialidades da CEMO.
import type { Specialty } from '../../types';

export const estrabismo: Specialty = {
  id: 'estrabismo',
  kind: 'especialidade',
  name: 'Estrabismo',
  shortName: 'Estrabismo',
  canonicalPath: '/especialidades/estrabismo/',
  published: true,
  seo: {
    title: 'Estrabismo em crianças e adultos: avaliação',
    description:
      'Olhos desalinhados? Entenda os tipos de estrabismo, como é feito o diagnóstico e quais tratamentos existem em crianças e adultos. Agende no CEMO.',
  },
  h1: 'Estrabismo: avaliação e tratamento em crianças e adultos',
  lead: 'Quando os olhos não olham para o mesmo ponto ao mesmo tempo, a visão e a autoestima podem ser afetadas. O estrabismo pode ser avaliado em qualquer idade, e conhecer as opções ajuda a decidir com tranquilidade.',
  summary: 'Avaliação do alinhamento dos olhos em crianças e adultos, com orientação sobre óculos, oclusão, exercícios e cirurgia quando indicados.',
  leadInterest: 'estrabismo',
  ctaLabel: 'Agendar avaliação de estrabismo',
  answer: {
    question: 'O que é estrabismo e tem tratamento?',
    text: 'Estrabismo é o desalinhamento dos olhos: um deles pode se desviar para dentro, para fora, para cima ou para baixo, de forma constante ou ocasional. Ocorre em crianças e adultos. Existe tratamento, e a indicação depende da causa, da idade e do tipo de desvio. Pode envolver óculos, oclusão de um dos olhos, exercícios ortópticos ou cirurgia, definidos pelo oftalmologista após avaliação.',
  },
  signs: {
    title: 'Quando suspeitar de estrabismo',
    intro:
      'Estes sinais podem estar associados ao estrabismo ou a outras condições dos olhos e precisam de avaliação oftalmológica.',
    items: [
      'Um olho que parece olhar para outra direção',
      'Cabeça inclinada ou virada para enxergar',
      'Fechar ou piscar um olho, principalmente na claridade',
      'Visão dupla, mais comum em quem desenvolve o desvio na vida adulta',
      'Cansaço, dor de cabeça ou dificuldade para ler',
      'Desvio que aparece só em alguns momentos, como no cansaço',
    ],
  },
  sections: [
    {
      id: 'o-que-e',
      title: 'O que é o estrabismo?',
      paragraphs: [
        'Para enxergarmos em três dimensões, os dois olhos precisam estar alinhados e trabalhar em conjunto, com a coordenação dos músculos que movem cada olho. No estrabismo, essa coordenação falha, e o cérebro recebe duas imagens diferentes.',
        'Na criança, o cérebro costuma ignorar a imagem do olho desviado para evitar a visão dupla, o que pode levar à ambliopia, o chamado “olho preguiçoso”. No adulto, o cérebro já não consegue ignorar a imagem com a mesma facilidade, e é comum surgir visão dupla.',
      ],
    },
    {
      id: 'tipos',
      title: 'Quais são os tipos de estrabismo?',
      paragraphs: [
        'O estrabismo é classificado pela direção do desvio e pela forma como ele aparece. Em termos gerais:',
      ],
      bullets: [
        'Esotropia: o olho desvia para dentro, em direção ao nariz',
        'Exotropia: o olho desvia para fora',
        'Hipertropia e hipotropia: desvios para cima ou para baixo',
        'Constante ou intermitente: o desvio está sempre presente ou aparece só em alguns momentos',
        'Congênito, de início na primeira infância, ou adquirido, quando surge mais tarde',
      ],
    },
    {
      id: 'causas',
      title: 'O que causa o estrabismo?',
      paragraphs: [
        'Nem sempre a causa é identificada. Entre os fatores associados estão alteração no grau (como hipermetropia não corrigida), histórico familiar, diferença de visão entre os olhos e problemas nos músculos ou nos nervos que movem os olhos.',
        'Em adultos, o aparecimento recente de desvio ou visão dupla pode estar associado a doenças que afetam a saúde geral. Por isso a avaliação deve ser feita sem demora e não deve ser tratada como apenas estética.',
      ],
    },
    {
      id: 'diagnostico',
      title: 'Como é feito o diagnóstico?',
      paragraphs: [
        'O oftalmologista observa o alinhamento dos olhos em diferentes direções e distâncias, mede o desvio, verifica a visão de cada olho e avalia o grau, geralmente com colírio para dilatar a pupila e relaxar o foco. Também examina a parte interna do olho para descartar outras causas.',
        'Em crianças pequenas, o exame é adaptado à idade, com brinquedos e luzes que chamam a atenção. A avaliação indica o tipo de estrabismo, a causa provável e se há ambliopia associada.',
      ],
    },
    {
      id: 'tratamentos',
      title: 'Quais são os tratamentos possíveis?',
      paragraphs: [
        'Não existe um tratamento único. O oftalmologista indica a combinação adequada ao tipo de desvio, à idade e à visão de cada olho, e pode ajustar o plano ao longo do tempo. As opções mais conhecidas, em termos gerais, são:',
      ],
      bullets: [
        'Óculos: corrigem o grau e, em alguns tipos de estrabismo, ajudam o alinhamento',
        'Oclusão (tampão): cobre o olho de visão mais forte para estimular o outro, usada no tratamento da ambliopia',
        'Exercícios ortópticos: treino orientado para coordenar os olhos, indicado em situações específicas',
        'Prismas: lentes que reduzem a visão dupla em alguns casos',
        'Cirurgia: ajusta a posição ou a força dos músculos que movem os olhos, quando há indicação',
      ],
    },
    {
      id: 'cirurgia',
      title: 'Quando a cirurgia é considerada?',
      paragraphs: [
        'A cirurgia é considerada quando o desvio persiste mesmo com o tratamento clínico ou quando o desvio é grande. Ela atua nos músculos externos do olho, sem abrir o globo ocular. Pode ser indicada para recuperar o alinhamento, a função visual em conjunto e também o convívio social.',
        'O médico explica as expectativas e os cuidados antes da decisão.',
      ],
    },
    {
      id: 'idade',
      title: 'Estrabismo tem idade para tratar?',
      paragraphs: [
        'Na infância, descobrir cedo importa porque a visão ainda está em formação. No adulto, o alinhamento também pode ser avaliado e tratado, mesmo que o desvio exista há anos.',
      ],
    },
  ],
  journey: {
    title: 'Como funciona a avaliação de estrabismo na CEMO',
    steps: [
      {
        title: 'Agendamento',
        text: 'Você informa a idade do paciente e o que notou, como desvio, visão dupla ou inclinação da cabeça.',
      },
      {
        title: 'Avaliação com a especialista',
        text: 'A Dra. Adriana Bizzarri avalia o alinhamento, a visão de cada olho e o grau.',
      },
      {
        title: 'Exames complementares',
        text: 'Se necessário, são feitos exames na própria clínica para completar o diagnóstico.',
      },
      {
        title: 'Plano de tratamento',
        text: 'A médica explica o tipo de estrabismo, as opções indicadas ao caso e o acompanhamento.',
      },
    ],
  },
  faq: [
    {
      question: 'Estrabismo é só uma questão estética?',
      answer: [
        'Não. Além do aspecto visual, ele pode reduzir a visão de um dos olhos (ambliopia) em crianças e causar visão dupla, cansaço e desconforto em adultos. Por isso merece avaliação médica.',
      ],
    },
    {
      question: 'Meu bebê tem o olhar torto. Isso passa sozinho?',
      answer: [
        'Em bebês, o alinhamento ainda está se organizando, e um desvio ocasional nos primeiros meses pode ser normal. Mas, se o desvio é frequente ou persiste, ou se você tem dúvida, procure o oftalmologista. Não há como diferenciar só pela aparência.',
      ],
    },
    {
      question: 'Adulto pode tratar estrabismo?',
      answer: [
        'Pode ser avaliado, e a consulta mostra as opções, que podem incluir óculos, prismas, exercícios ou cirurgia. Em quem desenvolveu o desvio recentemente, a investigação da causa é parte importante da consulta.',
      ],
    },
    {
      question: 'A cirurgia de estrabismo é feita dentro do olho?',
      answer: [
        'Não. Ela atua nos músculos que ficam do lado de fora do globo ocular e movem o olho. A técnica e o tipo de anestesia são definidos pela equipe conforme a idade e o caso.',
      ],
    },
    {
      question: 'Exercícios para os olhos resolvem o estrabismo?',
      answer: [
        'Os exercícios ortópticos podem ajudar em situações específicas, como alguns desvios intermitentes ou dificuldade de convergência, mas não substituem a avaliação. Fazer exercícios por conta própria pode atrasar o tratamento adequado.',
      ],
    },
  ],
  related: {
    doctors: ['adriana-bizzarri'],
    specialties: ['oftalmopediatria', 'consulta'],
    exams: [],
    conditions: ['hipermetropia'],
    articles: [
      'criancas-e-saude-ocular-sinais-de-alerta-para-pais',
      'catarata-congenita-ou-infantil',
      'o-que-e-miopia-infantil',
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
    'TODO_CONTENT_VALIDATION: confirmar com a Dra. Adriana quais tratamentos a CEMO realiza (oclusão, ortóptica, prismas, cirurgia) e onde a cirurgia é feita',
    'TODO_CONTENT_VALIDATION: confirmar se há atendimento de estrabismo em adultos e a idade mínima das crianças atendidas',
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO conta com ortoptista',
  ],
};
