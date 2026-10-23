// Reescrita de paginas/exames__tonometria.md (site atual, 1 frase) com conhecimento médico geral conservador; sem post associado.
import type { Exam } from '../../types';

export const tonometria: Exam = {
  id: 'tonometria',
  name: 'Tonometria',
  aka: ['Medida da pressão intraocular', 'Exame de pressão dos olhos', 'Pressão ocular'],
  canonicalPath: '/exames/tonometria/',
  published: true,
  seo: {
    title: 'Tonometria: exame da pressão dos olhos',
    description:
      'Entenda o que é a tonometria, para que serve, como é feita e como se preparar. Exame que mede a pressão intraocular, em Taboão da Serra.',
  },
  h1: 'Tonometria: o exame que mede a pressão dos olhos',
  lead: 'A tonometria mede a pressão dentro do olho e faz parte da avaliação de quem tem ou pode ter glaucoma. Aqui você entende como o exame é feito, quando é pedido e o que esperar na CEMO, em Taboão da Serra.',
  summary: 'Mede a pressão intraocular, um dado importante para detectar e acompanhar o glaucoma.',
  answer: {
    question: 'O que é a tonometria?',
    text: 'A tonometria é o exame que mede a pressão intraocular, isto é, a força com que o líquido dentro do olho empurra as paredes dele. É um dos dados usados para investigar e acompanhar o glaucoma. O exame é rápido, feito no consultório, e o resultado precisa ser interpretado pelo oftalmologista junto com outros exames, porque a pressão sozinha não fecha um diagnóstico.',
  },
  purpose: [
    'O olho produz continuamente um líquido transparente, o humor aquoso, que também escoa por um canal próprio. Quando a produção e a drenagem não se equilibram, a pressão dentro do olho pode subir.',
    'A tonometria mede essa pressão. Ela ajuda a detectar uma pressão acima do esperado, a acompanhar se o tratamento está funcionando e a decidir se outros exames são necessários.',
    'É importante saber que a pressão alta é um fator de risco para o glaucoma, mas não é a única peça. Há pessoas com pressão dentro do esperado que têm glaucoma, e pessoas com pressão elevada que nunca desenvolvem a doença. Por isso o oftalmologista avalia o resultado junto com o nervo óptico, o campo visual e as características da córnea.',
  ],
  whenRequested: [
    'A medida da pressão costuma fazer parte da consulta oftalmológica de rotina, principalmente a partir de certa idade. O glaucoma pode evoluir sem sintomas no início, e esse é um dos motivos para a medida ser repetida ao longo da vida.',
    'O médico dá mais atenção ao exame quando há histórico de glaucoma na família, idade avançada, diabetes, alta miopia, uso prolongado de colírios ou comprimidos com corticoide, ou queixas que pedem investigação do nervo óptico.',
    'Quem já tem diagnóstico de glaucoma ou de hipertensão ocular (pressão acima do esperado, sem lesão detectada no nervo) mede a pressão com regularidade para acompanhar o tratamento.',
    'Esses sinais, sozinhos, não indicam uma doença específica e precisam de avaliação oftalmológica.',
  ],
  howDone: [
    'Existem diferentes formas de medir a pressão. Em algumas, um aparelho encosta de leve na superfície do olho depois de um colírio anestésico. Em outras, o aparelho lança um jato de ar e não toca o olho.',
    'Você fica sentado, com o queixo e a testa apoiados em um suporte, olhando para um ponto indicado. A medida em si dura poucos instantes.',
    'Quando há contato, o colírio anestésico reduz o desconforto, e algumas pessoas sentem apenas a sensação de algo tocando o olho. No jato de ar, o que incomoda para muitos é o susto, não a medida.',
    'O oftalmologista escolhe o método conforme cada caso.',
  ],
  preparation: [
    'Em geral, a tonometria não exige preparo especial. Você pode se alimentar normalmente e seguir com seus colírios, a não ser que o médico oriente o contrário.',
    'Leve a lista dos colírios e medicamentos que usa, o resultado de exames anteriores e, se tiver, o relatório de consultas passadas. Esses dados ajudam o médico a comparar as medidas ao longo do tempo.',
    'Quem usa lentes de contato deve perguntar à clínica, na hora do agendamento, se é preciso retirá-las e por quanto tempo antes do exame.',
  ],
  duration: [
    'A medida da pressão é rápida e costuma ser feita em poucos minutos dentro da consulta ou da bateria de exames.',
    'Se a tonometria fizer parte de uma série de exames no mesmo dia, o tempo total depende dos outros exames pedidos pelo médico.',
  ],
  aftercare: [
    'Depois do exame, você normalmente volta às atividades do dia. Se foi usado colírio anestésico, evite coçar ou esfregar o olho até o efeito passar, para não machucar a superfície sem perceber.',
    'O oftalmologista explica o resultado e diz o que ele significa no seu caso. Um valor isolado não é um diagnóstico: pode ser preciso repetir a medida, em outro horário, ou pedir exames complementares.',
    'Se o médico indicar acompanhamento ou tratamento, siga a periodicidade combinada, mesmo que você não sinta nada. No glaucoma, a ausência de sintomas não significa que a doença está controlada.',
  ],
  faq: [
    {
      question: 'A tonometria dói?',
      answer: [
        'Em geral, não causa dor. Nos métodos com contato, o colírio anestésico reduz o desconforto, e no método do jato de ar a sensação é de um sopro rápido. Se você tem receio, avise o técnico ou o médico antes de começar.',
      ],
    },
    {
      question: 'Pressão alta no olho significa que tenho glaucoma?',
      answer: [
        'Não necessariamente. A pressão elevada é um fator de risco, mas o diagnóstico depende de outros exames, como o do nervo óptico e o campo visual. O médico avalia o conjunto.',
      ],
    },
    {
      question: 'Com pressão normal posso ter glaucoma?',
      answer: [
        'Sim. Existem tipos de glaucoma em que a pressão medida fica dentro do esperado. Por isso a tonometria é uma parte da investigação, e não a investigação inteira.',
      ],
    },
    {
      question: 'A pressão do olho muda ao longo do dia?',
      answer: [
        'Sim, ela pode variar em horários diferentes. Quando o médico quer entender essa variação, pode pedir a curva tensional diária, que reúne várias medidas ao longo do dia.',
      ],
    },
    {
      question: 'Com que frequência devo medir a pressão dos olhos?',
      answer: [
        'A frequência depende da idade, do histórico familiar e de outros fatores de risco. O oftalmologista define a periodicidade na consulta.',
      ],
    },
  ],
  related: {
    doctors: ['roberta-andrade-e-nascimento', 'igor-seidi-sekiguchi'],
    specialties: ['glaucoma', 'consulta'],
    exams: ['curva-tensional-diaria', 'gonioscopia', 'paquimetria', 'campo-visual'],
    conditions: [],
    articles: ['os-principais-sintomas-do-glaucoma', 'tipos-de-glaucoma', 'as-principais-causas-do-glaucoma'],
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
    'TODO_CONTENT_VALIDATION: confirmar qual(is) método(s) de tonometria a CEMO usa (aplanação, sopro, outro) para citar no texto',
    'TODO_CONTENT_VALIDATION: confirmar tempo médio do exame e orientação sobre lentes de contato antes do exame',
    'TODO_CONTENT_VALIDATION: confirmar com a Dra. Roberta a frequência de medida sugerida por faixa etária/risco',
  ],
};
