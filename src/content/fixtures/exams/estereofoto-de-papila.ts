// Atualização do post tudo-o-que-voce-precisa-saber-sobre-estereofoto-de-papila (URL que ranqueia) + paginas/exames__estereofoto.md; /exames/estereofoto/ vira 301 para cá.
import type { Exam } from '../../types';

export const estereofotoDePapila: Exam = {
  id: 'estereofoto-de-papila',
  name: 'Estereofoto de Papila',
  aka: ['Estereofotografia de papila', 'Foto do nervo óptico', 'Estereofoto de disco óptico'],
  canonicalPath: '/tudo-o-que-voce-precisa-saber-sobre-estereofoto-de-papila/',
  published: true,
  seo: {
    title: 'Tudo sobre estereofoto de papila: guia do exame',
    description:
      'Saiba o que é a estereofoto de papila, para que serve no glaucoma, como é feita, quanto tempo leva e como se preparar. Em Taboão da Serra.',
  },
  h1: 'Tudo o que você precisa saber sobre estereofoto de papila',
  lead: 'A estereofoto de papila é uma fotografia colorida em 3D do nervo óptico, usada para acompanhar o glaucoma e outras doenças desse nervo. Veja para que serve, como é feita e como se preparar, na CEMO em Taboão da Serra.',
  summary: 'Fotografia 3D do nervo óptico que permite comparar sua evolução ao longo do tempo.',
  answer: {
    question: 'O que é a estereofoto de papila?',
    text: 'A estereofoto de papila é uma fotografia colorida, em três dimensões, da papila, a parte do nervo óptico que pode ser vista no fundo do olho. A imagem permite comparar de forma objetiva, de um exame para outro, o formato da escavação do disco óptico. É usada para diagnóstico e acompanhamento do glaucoma e de doenças do nervo óptico, em geral com a pupila dilatada.',
  },
  purpose: [
    'O nervo óptico leva as imagens do olho para o cérebro. Sua porção visível no fundo do olho se chama papila, ou disco óptico, e tem uma depressão central natural, a escavação.',
    'No glaucoma, o nervo pode sofrer lesões que, com o tempo, mudam o aspecto da escavação. Como essa mudança costuma ser lenta, é difícil perceber a olho nu de uma consulta para outra.',
    'A estereofoto registra o aspecto da papila em imagens que podem ser guardadas e comparadas. Isso ajuda o médico a notar se houve mudança e a decidir se o tratamento precisa ser ajustado.',
    'O exame não mede a visão nem substitui o campo visual ou a medida da pressão: ele é uma peça de um conjunto de exames.',
  ],
  whenRequested: [
    'O oftalmologista costuma pedir a estereofoto no acompanhamento de pacientes com glaucoma e de pessoas com histórico de hipertensão ocular, que é a pressão do olho acima do esperado sem lesão detectada.',
    'Também pode ser pedida na investigação de doenças do nervo óptico, como o edema de papila (inchaço do nervo) e a neurite óptica (inflamação do nervo), e na avaliação de outras alterações nessa região.',
    'Esses sinais, sozinhos, não indicam uma doença específica. Cabe ao médico, depois da consulta, definir se o exame é necessário no seu caso.',
  ],
  howDone: [
    'Na maior parte das vezes, o exame é feito com a pupila dilatada. Primeiro o técnico pinga colírios que aumentam o tamanho da pupila, e é preciso aguardar o efeito.',
    'Depois você apoia o queixo e a testa em um aparelho e olha para uma luz indicada. O equipamento faz fotografias coloridas do fundo do olho, de modo a formar a imagem em 3D da papila. O exame não toca o olho.',
    'Algumas pessoas se incomodam com o flash da câmera. As imagens são salvas e comparadas com as de exames anteriores.',
  ],
  preparation: [
    'Como a dilatação deixa a visão para perto embaçada e o olho sensível à luz por algumas horas, vale vir acompanhado e evitar dirigir logo depois. Se puder, traga óculos escuros.',
    'Informe se tem glaucoma, especialmente de ângulo estreito, ou alergia a colírios, porque isso pode influenciar a conduta. O médico decide se a dilatação pode ser feita.',
    'Leve os exames anteriores, para a comparação. Se usa lentes de contato, pergunte à clínica se precisa retirá-las.',
  ],
  duration: [
    'A fotografia em si é rápida, mas a dilatação exige um período de espera até a pupila abrir, e depois o efeito dos colírios dura algumas horas.',
    'Por isso, reserve um tempo maior no dia do exame. A CEMO informa o tempo previsto no agendamento.',
  ],
  aftercare: [
    'Depois do exame, a visão pode ficar embaçada e sensível à luz por algumas horas. Evite dirigir enquanto o efeito não passar, e use óculos escuros se a luz incomodar.',
    'O oftalmologista avalia as imagens, compara com as anteriores e explica o que mudou ou permaneceu estável.',
    'Procure atendimento se, depois da dilatação, surgir dor forte no olho, náuseas ou piora importante da visão. Se o médico indicar acompanhamento, mantenha as datas combinadas mesmo sem sintomas.',
  ],
  faq: [
    {
      question: 'A estereofoto de papila machuca?',
      answer: [
        'Não. A câmera não toca o olho. O que mais incomoda é o flash e a sensibilidade à luz causada pela dilatação.',
      ],
    },
    {
      question: 'Preciso de acompanhante?',
      answer: [
        'É recomendável. A dilatação deixa a visão embaçada por algumas horas, e dirigir logo depois não é seguro.',
      ],
    },
    {
      question: 'Quanto tempo dura o efeito da dilatação?',
      answer: [
        'Costuma durar algumas horas, e varia de pessoa para pessoa. A equipe orienta no dia.',
      ],
    },
    {
      question: 'Estereofoto substitui o campo visual?',
      answer: [
        'Não. A estereofoto mostra o aspecto do nervo. O campo visual avalia como está a sua visão periférica. O médico os usa em conjunto.',
      ],
    },
    {
      question: 'Com que frequência precisa repetir o exame?',
      answer: [
        'Depende do seu caso. O oftalmologista define a periodicidade conforme o risco e a evolução.',
      ],
    },
  ],
  related: {
    doctors: ['roberta-andrade-e-nascimento'],
    specialties: ['glaucoma'],
    exams: ['campo-visual', 'tonometria', 'tomografia-de-coerencia-optica', 'retinografia'],
    conditions: [],
    articles: [
      'os-principais-sintomas-do-glaucoma',
      'tipos-de-glaucoma',
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
    'TODO_CONTENT_VALIDATION: o post antigo citava o equipamento Visucam, o exame em cerca de 20 minutos e espera de cerca de 60 minutos; confirmar aparelho e tempos antes de publicar',
    'TODO_CONTENT_VALIDATION: confirmar se a dilatação é sempre necessária na CEMO e as orientações de acompanhante/direção',
    'TODO_CONTENT_VALIDATION: acrescentar o vídeo, se a CEMO tiver um específico sobre o exame',
  ],
};
