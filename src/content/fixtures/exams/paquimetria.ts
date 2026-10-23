// Reescrita de paginas/exames__paquimetria.md e do post CONSOLIDATE tudo-o-que-voce-precisa-saber-sobre-o-exame-de-paquimetria, com conhecimento médico geral conservador.
import type { Exam } from '../../types';

export const paquimetria: Exam = {
  id: 'paquimetria',
  name: 'Paquimetria',
  aka: ['Paquimetria corneana', 'Paquimetria ultrassônica', 'Paquimetria óptica', 'Medida da espessura da córnea'],
  canonicalPath: '/exames/paquimetria/',
  published: true,
  seo: {
    title: 'Paquimetria: exame da espessura da córnea',
    description:
      'Saiba o que é a paquimetria, para que serve, como é feita e como se preparar. Exame que mede a espessura da córnea, em Taboão da Serra.',
  },
  h1: 'Paquimetria: o exame que mede a espessura da córnea',
  lead: 'A paquimetria mede a espessura da córnea, a “janela” transparente na frente do olho. O dado ajuda a interpretar a pressão ocular e a avaliar quem pensa em cirurgia refrativa. Veja como funciona na CEMO, em Taboão da Serra.',
  summary: 'Mede a espessura da córnea; apoia o glaucoma, o ceratocone e a avaliação para cirurgia refrativa.',
  answer: {
    question: 'O que é a paquimetria?',
    text: 'A paquimetria é o exame que mede a espessura da córnea, a camada transparente que cobre a frente do olho. O resultado ajuda o oftalmologista a interpretar a medida da pressão intraocular, a investigar doenças da córnea, como o ceratocone, e a avaliar se há condições para a cirurgia refrativa. É um exame de consultório, feito em poucos minutos.',
  },
  purpose: [
    'A córnea não tem a mesma espessura em todas as pessoas, e também varia de uma região para outra do mesmo olho. Medir essa espessura dá ao médico informações que o exame de vista comum não mostra.',
    'No glaucoma, a espessura da córnea pode influenciar a leitura da pressão do olho: córneas mais finas ou mais espessas podem fazer o aparelho de medida mostrar um valor diferente do real. Por isso, o médico considera a paquimetria ao interpretar a tonometria.',
    'Na avaliação para cirurgia refrativa, a espessura da córnea ajuda a decidir se há condições seguras para o procedimento e qual técnica faz sentido. Nem todo olho tem indicação, e cada caso tem a técnica adequada.',
    'Na investigação do ceratocone e de outras doenças da córnea, a medida ajuda a mostrar se a córnea está mais fina ou irregular.',
    'O exame não substitui os demais: o médico o interpreta junto com a topografia, a pressão e o restante do exame clínico.',
  ],
  whenRequested: [
    'O oftalmologista pode pedir a paquimetria quando há suspeita ou acompanhamento de glaucoma, para corrigir a interpretação da pressão ocular.',
    'Também é comum pedi-la na avaliação antes de uma cirurgia refrativa, quando a pessoa tem interesse em reduzir a dependência de óculos.',
    'Outras situações incluem a investigação de ceratocone ou de outras alterações da córnea, a avaliação antes de algumas cirurgias oculares e o acompanhamento de doenças que afetam a córnea.',
    'A indicação é sempre do médico, depois da consulta. Ter o exame pedido não significa que há uma doença.',
  ],
  howDone: [
    'Há dois tipos principais. Na paquimetria ultrassônica, uma pequena sonda toca a superfície da córnea por instantes, depois de um colírio anestésico, e usa ondas de ultrassom para medir a espessura no ponto tocado.',
    'Na paquimetria óptica, a medida é feita por luz, sem tocar o olho. Alguns aparelhos que mapeiam a córnea, como os de tomografia, também fornecem a espessura em várias regiões.',
    'Você fica sentado, com a cabeça apoiada, olhando para um ponto indicado. A medida costuma ser repetida algumas vezes para conferir a consistência.',
    'Em geral o exame é bem tolerado. Quando há contato da sonda, pode haver um leve desconforto.',
  ],
  preparation: [
    'Em geral, não exige preparo especial. Se o exame for feito com contato, avise o técnico se você tem alergia a colírios.',
    'Lentes de contato podem alterar o formato e a espessura da córnea por algum tempo. Se você as usa, pergunte à clínica, no agendamento, se precisa suspendê-las e por quantos dias; o prazo é definido pela equipe médica.',
    'Leve exames anteriores, se tiver, para comparação, e a lista dos colírios e remédios que usa.',
  ],
  duration: [
    'A medida em si costuma ser feita em poucos minutos. O tempo total no dia depende dos demais exames pedidos pelo médico.',
    'Na CEMO, a avaliação e os exames podem ser feitos no mesmo dia, sem precisar voltar em outros dias.',
  ],
  aftercare: [
    'Quando houve contato com a córnea, evite coçar ou esfregar o olho até o efeito do colírio passar, para não machucar a superfície sem perceber.',
    'Em geral, não há restrição depois do exame, e você pode retomar suas atividades. O oftalmologista explica o resultado e o que ele significa para o seu caso.',
    'Se o exame foi pedido para avaliar uma cirurgia, o resultado é um dos dados da decisão, junto com outros exames. A equipe indica a técnica adequada após a avaliação.',
  ],
  faq: [
    {
      question: 'A paquimetria tem riscos?',
      answer: [
        'É um exame de baixo risco, feito em poucos minutos. No método com contato, o cuidado é evitar coçar o olho depois, até o efeito do colírio passar.',
      ],
    },
    {
      question: 'Córnea fina quer dizer que tenho ceratocone?',
      answer: [
        'Não necessariamente. A espessura é apenas um dado. O diagnóstico de ceratocone depende de outros exames, como o mapeamento da curvatura da córnea, e da avaliação do oftalmologista.',
      ],
    },
    {
      question: 'Por que a paquimetria é pedida no glaucoma?',
      answer: [
        'Porque a espessura da córnea pode alterar a leitura da pressão do olho. O médico usa a paquimetria para interpretar melhor a tonometria.',
      ],
    },
    {
      question: 'Preciso de paquimetria antes de cirurgia refrativa?',
      answer: [
        'A espessura da córnea faz parte da avaliação pré-operatória, junto com outros exames. A equipe define quais exames cada paciente precisa.',
      ],
    },
    {
      question: 'Qual a diferença entre paquimetria e topografia de córnea?',
      answer: [
        'A paquimetria mede a espessura. A topografia mapeia a curvatura da superfície. Os dois se complementam, e alguns aparelhos fornecem ambos.',
      ],
    },
  ],
  related: {
    doctors: ['david-ribeiro-de-mendonca-filho', 'roberta-andrade-e-nascimento'],
    specialties: ['cornea', 'glaucoma', 'refrativa'],
    exams: ['tonometria', 'ceratoscopia', 'microscopia-especular'],
    conditions: ['ceratocone'],
    articles: [
      'importancia-da-paquimetria-e-microscopia-na-avaliacao-da-cornea',
      'qual-a-funcao-da-cornea',
      'sintomas-e-problemas-na-cornea',
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
    'TODO_CONTENT_VALIDATION: confirmar qual tipo de paquimetria a CEMO realiza (ultrassônica, óptica ou por tomografia/topografia)',
    'TODO_CONTENT_VALIDATION: confirmar tempo do exame e prazo de suspensão de lentes de contato antes dele',
  ],
};
