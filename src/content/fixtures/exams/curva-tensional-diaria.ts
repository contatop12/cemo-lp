// Redigido a partir do post "exame-de-ctd-curva-tensional-diaria-tudo-sobre" (mesma URL, ranqueia), do post CONSOLIDATE "ctd-curva-tensional-diaria-principais-duvidas" (FAQ migrado) e da página /exames/ctd/.
import type { Exam } from '../../types';

export const curvaTensionalDiaria: Exam = {
  id: 'curva-tensional-diaria',
  name: 'Curva Tensional Diária (CTD)',
  aka: ['CTD', 'Curva tensional diária', 'Curva de pressão intraocular', 'Exame de CTD'],
  canonicalPath: '/exame-de-ctd-curva-tensional-diaria-tudo-sobre/',
  published: true,
  seo: {
    title: 'Exame de CTD (curva tensional diária): tudo sobre',
    description:
      'Veja o que é a curva tensional diária (CTD), como a pressão do olho é medida ao longo do dia, como se preparar e quando o exame é pedido. Taboão da Serra.',
  },
  h1: 'Exame de CTD (curva tensional diária): tudo sobre',
  lead:
    'A CTD mede a pressão do olho em mais de um momento do dia. Entenda por que a pressão varia, quando o exame é pedido e como se preparar.',
  summary: 'Medidas da pressão intraocular ao longo do dia, usadas no diagnóstico e no acompanhamento do glaucoma.',
  answer: {
    question: 'O que é o exame de CTD (curva tensional diária)?',
    text:
      'A curva tensional diária é um exame que mede a pressão dentro do olho, a pressão intraocular, em vários momentos ao longo do dia, usando a tonometria. Como a pressão varia durante o dia, o conjunto de medidas mostra a média, a amplitude da variação e os picos. Esse conjunto auxilia no diagnóstico e no acompanhamento do glaucoma, quando há indicação médica.',
  },
  purpose: [
    'A pressão do olho não é constante: ela sobe e desce ao longo das horas. Uma única medida, na consulta, pode ser igual à de um momento calmo e deixar passar um pico em outro horário.',
    'A CTD reúne várias medidas e mostra o comportamento da pressão no período do exame: a média, a diferença entre o maior e o menor valor e em que horários os picos ocorrem. O médico usa essas informações para avaliar o risco de dano ao nervo óptico e ajustar o tratamento.',
    'O exame não substitui o campo visual nem o exame do nervo óptico. Ele é uma peça do quebra-cabeça do glaucoma, sempre interpretada junto com os demais dados.',
  ],
  whenRequested: [
    'O oftalmologista costuma pedir a CTD quando há suspeita de glaucoma, em pessoas com pressão intraocular limítrofe ou com variações, e no acompanhamento de quem já trata glaucoma, para ver se o tratamento está controlando a pressão ao longo do dia.',
    'Também pode ser pedida quando a pressão medida na consulta não combina com o aspecto do nervo óptico ou com o campo visual.',
    'Sintomas como dor ocular, olho vermelho, náusea ou visão turva podem estar associados a diferentes condições e precisam de avaliação oftalmológica. A pressão alta nos olhos muitas vezes não dá sintomas, e por isso só o exame mostra o valor.',
  ],
  howDone: [
    'A pressão é medida com um tonômetro, aparelho que avalia a resistência da superfície do olho. Existem tipos diferentes, e o oftalmologista escolhe o mais adequado. Em alguns, é usado um colírio anestésico, que torna a medida confortável, e um corante chamado fluoresceína.',
    'A CTD envolve mais de uma medida ao longo do dia, em horários diferentes, para registrar a variação da pressão. O número e os horários das medidas dependem do protocolo da clínica.',
    'O exame não costuma doer. O colírio anestésico pode causar uma sensação de olho dormente por alguns minutos, e o corante deixa o olho levemente amarelado por pouco tempo.',
  ],
  preparation: [
    'Não use lentes de contato no dia do exame. A dilatação das pupilas, em geral, não é necessária na CTD.',
    'Na maioria dos casos, não é preciso suspender colírios ou outros medicamentos, mas não interrompa nenhum tratamento sem orientação do seu médico. Informe tudo o que usa.',
    'Como o exame envolve um período mais longo e colírios, é prudente vir acompanhado. Leve um lanche e algo para ocupar o tempo entre as medidas.',
  ],
  duration: [
    'Diferente de um exame pontual, a CTD se estende por parte do dia, porque as medidas são feitas em horários distintos.',
    'Cada medida costuma ser rápida. A maior parte do tempo é a espera entre elas.',
  ],
  aftercare: [
    'Depois das medidas, o efeito do colírio anestésico passa em pouco tempo. Evite esfregar o olho enquanto ele estiver dormente, para não machucar a superfície sem perceber.',
    'O oftalmologista analisa o gráfico da pressão, explica o que ele mostra e define se é preciso iniciar ou ajustar o tratamento, pedir outros exames ou marcar retorno. Quem já tem glaucoma deve manter o uso dos colírios e as consultas regulares.',
  ],
  faq: [
    {
      question: 'Qual é a pressão normal do olho?',
      answer: [
        'Os valores de referência costumam ficar entre cerca de 10 e 21 mmHg, mas o que é adequado depende de cada pessoa. Há quem tenha glaucoma com pressão dentro dessa faixa, e quem tenha pressão um pouco mais alta sem dano ao nervo.',
        'Por isso o médico interpreta a pressão junto com o nervo óptico e o campo visual.',
      ],
    },
    {
      question: 'Como saber se tenho pressão alta nos olhos?',
      answer: [
        'Não dá para saber sem medir. A pressão alta muitas vezes não causa sintomas, e só a tonometria mostra o valor. Por isso consultas regulares são importantes, principalmente a partir dos 40 anos e para quem tem familiares com glaucoma.',
      ],
    },
    {
      question: 'Quais as principais causas da pressão alta nos olhos?',
      answer: [
        'Podem estar envolvidos glaucoma, histórico familiar, dificuldade de drenagem do líquido do olho, produção excessiva desse líquido, inflamações, traumas, tumores, uso de alguns medicamentos e cirurgias. Cada caso é investigado pelo oftalmologista.',
      ],
    },
    {
      question: 'Pressão alta no olho é a mesma coisa que glaucoma?',
      answer: [
        'Não. A pressão alta é um fator de risco importante para o glaucoma, mas nem toda pessoa com pressão alta tem glaucoma, e existe glaucoma com pressão considerada normal. O diagnóstico depende do conjunto de exames.',
      ],
    },
    {
      question: 'A CTD dói ou precisa de acompanhante?',
      answer: [
        'Não costuma doer. Como há colírio anestésico e corante, vir acompanhado é prudente, e a clínica confirma a necessidade no agendamento.',
      ],
    },
  ],
  related: {
    doctors: ['roberta-andrade-e-nascimento'],
    specialties: ['glaucoma'],
    exams: ['tonometria', 'campo-visual', 'gonioscopia'],
    conditions: [],
    articles: [
      'os-principais-sintomas-do-glaucoma',
      'as-principais-causas-do-glaucoma',
      'o-glaucoma-pode-causar-cegueira-em-quanto-tempo',
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
    'TODO_CONTENT_VALIDATION: protocolo da CEMO: número de medidas, horários, se é em um único dia e tonômetro usado (os dois posts antigos divergem: “de 2 em 2 horas” e “3 a 4 medidas, entre 8 e 18 horas”)',
    'TODO_CONTENT_VALIDATION: confirmar uso de colírio anestésico e fluoresceína e a necessidade de acompanhante na CEMO',
    'TODO_CONTENT_VALIDATION: faixa de referência da pressão intraocular a citar (posts antigos citam 10 a 21,5 mmHg)',
  ],
};
