// Redigido a partir do post "o-que-e-exame-de-microscopia" (mesma URL, ranqueia) e da página /exames/microscopia/ (301 para cá).
import type { Exam } from '../../types';

export const microscopiaEspecular: Exam = {
  id: 'microscopia-especular',
  name: 'Microscopia Especular',
  aka: ['Microscopia especular de córnea', 'Exame de microscopia', 'Contagem de células endoteliais', 'Microscopia ocular'],
  canonicalPath: '/o-que-e-exame-de-microscopia/',
  published: true,
  seo: {
    title: 'O que é exame de microscopia especular da córnea?',
    description:
      'Saiba o que é o exame de microscopia especular, o que ele mostra sobre a córnea, quando é pedido (como antes da catarata) e como é feito. Taboão da Serra.',
  },
  h1: 'O que é o exame de microscopia (especular) da córnea?',
  lead:
    'A microscopia especular fotografa e conta as células da camada interna da córnea. Entenda para que o exame serve, quando é pedido e o que esperar.',
  summary: 'Avalia o número e o aspecto das células do endotélio da córnea, em geral antes de cirurgias oculares.',
  answer: {
    question: 'O que é o exame de microscopia especular?',
    text:
      'A microscopia especular é um exame de imagem que amplia e fotografa a camada mais interna da córnea, o endotélio, permitindo contar as células e avaliar seu tamanho e formato. Essas células ajudam a manter a córnea transparente. O exame costuma ser pedido na avaliação antes de cirurgias, como a de catarata, e no acompanhamento de doenças da córnea, quando há indicação médica.',
  },
  purpose: [
    'O endotélio é uma camada de células que fica na parte interna da córnea e ajuda a mantê-la clara, retirando o excesso de líquido. Quando essas células diminuem muito ou mudam de forma, a córnea pode inchar e perder transparência.',
    'A microscopia especular mostra quantas células existem, como elas se distribuem e se têm tamanho e forma regulares. Com isso, o médico avalia a saúde do endotélio e se a córnea pode ser mais sensível a uma cirurgia.',
    'O exame também é usado para acompanhar a córnea ao longo do tempo, por exemplo depois de um transplante ou em doenças que afetam o endotélio.',
  ],
  whenRequested: [
    'É um exame frequentemente pedido na avaliação pré-operatória de cirurgias oculares, como a de catarata e as cirurgias de glaucoma, e no preparo e acompanhamento de transplantes de córnea. Também pode entrar na avaliação antes de cirurgia refrativa e em outros procedimentos.',
    'O oftalmologista pode pedir o exame quando percebe sinais de alteração na córnea, como inchaço, ou quando há doenças conhecidas do endotélio. Nesses casos, a indicação depende de cada pessoa.',
    'Os casos mais comuns de indicação estão detalhados no artigo do blog sobre casos indicados para microscopia.',
  ],
  howDone: [
    'O paciente apoia o queixo e a testa no aparelho e olha para um ponto luminoso. O equipamento se aproxima da córnea, sem tocá-la na maioria dos aparelhos, e capta a imagem do endotélio, que é ampliada muitas vezes.',
    'O software então conta as células e calcula medidas como o tamanho médio e a regularidade. O médico confere a qualidade da imagem e interpreta os valores junto com a consulta.',
    'O exame costuma ser bem tolerado e não causa dor. Pode ser necessário repetir a captura se houver piscadas ou movimento.',
  ],
  preparation: [
    'Em geral não é preciso suspender medicamentos nem fazer jejum. Quem usa lentes de contato deve retirá-las e avisar a equipe; o tempo de suspensão antes do exame deve ser confirmado com a clínica.',
    'Leve exames anteriores e informe cirurgias oculares já realizadas, doenças da córnea e uso de colírios.',
  ],
  duration: [
    'A captura das imagens costuma ser curta. O tempo total na clínica depende da consulta e dos outros exames solicitados.',
  ],
  aftercare: [
    'Depois do exame, a pessoa pode retomar as atividades normais. Não há restrição, porque o exame não costuma exigir colírio nem dilatação.',
    'O oftalmologista explica o resultado. Se houver alteração, ele indica outros exames, o acompanhamento ou o tratamento. Guarde o laudo para comparar com resultados futuros.',
  ],
  faq: [
    {
      question: 'O que significa “microscopia” no nome do exame?',
      answer: [
        'Microscopia é a técnica de ampliar objetos pequenos demais para serem vistos a olho nu. Na oftalmologia, o microscópio especular amplia as células do endotélio da córnea, que são microscópicas.',
      ],
    },
    {
      question: 'Quem vai operar catarata precisa fazer microscopia especular?',
      answer: [
        'Muitas vezes o oftalmologista pede o exame na avaliação antes da cirurgia, mas isso depende de cada caso. O médico explica se é necessário.',
      ],
    },
    {
      question: 'Preciso suspender medicamentos antes?',
      answer: [
        'Em geral não. Quem usa lentes de contato precisa tirá-las, conforme a orientação da clínica. Se tiver dúvida sobre algum remédio, pergunte à equipe.',
      ],
    },
    {
      question: 'O exame dói?',
      answer: [
        'Não costuma causar dor. Você olha para uma luz enquanto o aparelho registra a imagem.',
      ],
    },
    {
      question: 'Menos células significa que a córnea está doente?',
      answer: [
        'Não necessariamente. A quantidade de células muda com a idade e depende de cada pessoa. O médico interpreta o número junto com o formato das células, o resto da avaliação e a saúde da córnea.',
      ],
    },
  ],
  related: {
    doctors: ['david-ribeiro-de-mendonca-filho', 'rodrigo-arantes'],
    specialties: ['cornea', 'catarata'],
    exams: ['paquimetria', 'ceratoscopia', 'biometria'],
    conditions: [],
    articles: [
      'casos-indicados-para-microscopia',
      'importancia-da-paquimetria-e-microscopia-na-avaliacao-da-cornea',
      'causas-da-catarata',
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
    'TODO_CONTENT_VALIDATION: aparelho usado na CEMO (a clínica declara microscopia especular em vídeo, sem marca) e se o exame é de contato ou sem contato',
    'TODO_CONTENT_VALIDATION: prazo de suspensão de lentes de contato adotado pela CEMO',
    'TODO_CONTENT_VALIDATION: duração do exame na CEMO',
  ],
};
