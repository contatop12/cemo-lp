// Redigido a partir do post "exame-de-campo-visual-o-que-e-para-que-serve-e-como-e-feito" (mesma URL, ranqueia) e da página /exames/campo-visual/ (301 para cá).
import type { Exam } from '../../types';

export const campoVisual: Exam = {
  id: 'campo-visual',
  name: 'Campo Visual',
  aka: ['Campimetria', 'Perimetria', 'Exame de campo visual', 'Campo visual computadorizado'],
  canonicalPath: '/exame-de-campo-visual-o-que-e-para-que-serve-e-como-e-feito/',
  published: true,
  seo: {
    title: 'Exame de campo visual: o que é, para que serve',
    description:
      'Saiba o que é o exame de campo visual, para que serve no glaucoma e em outras doenças, como é feito e como se preparar. Exame em Taboão da Serra, SP.',
  },
  h1: 'Exame de campo visual: o que é, para que serve e como é feito',
  lead:
    'O campo visual mede toda a área que você enxerga enquanto olha para um ponto fixo, inclusive nas laterais. Entenda o exame, quando ele é pedido e o que esperar no dia.',
  summary: 'Mede a área de visão de cada olho e ajuda a diagnosticar e acompanhar o glaucoma e outras doenças do nervo óptico e da retina.',
  answer: {
    question: 'O que é o exame de campo visual?',
    text:
      'O campo visual é a área total que o olho enxerga quando está fixo em um ponto à frente, incluindo a visão lateral. O exame, também chamado de campimetria, mapeia essa área em cada olho e mostra se há regiões com menos sensibilidade. É muito usado para diagnosticar e acompanhar o glaucoma e outras doenças do nervo óptico e da retina, quando há indicação médica.',
  },
  purpose: [
    'O exame mostra se há pontos de visão reduzida ou ausente, chamados escotomas, e em que região do campo eles estão. O tamanho e o desenho dessas áreas ajudam o médico a entender qual parte do caminho da visão pode estar envolvida: o olho, o nervo óptico ou o cérebro.',
    'Ele é mais associado ao glaucoma, que costuma afetar primeiro a visão lateral, de forma lenta e muitas vezes sem a pessoa perceber. Repetido ao longo do tempo, o exame mostra se o quadro está estável ou mudando.',
    'Também é usado em doenças da retina, em outras doenças do nervo óptico e para avaliar quanto uma pálpebra caída limita o campo de visão.',
  ],
  whenRequested: [
    'O oftalmologista pede o campo visual quando suspeita de glaucoma, quando já há diagnóstico e é preciso acompanhar a evolução, ou quando o paciente relata perda de visão lateral, tropeços frequentes ou dificuldade de notar objetos nos lados.',
    'Pode ser solicitado em condições que afetam o nervo óptico ou as vias visuais, como esclerose múltipla, alterações da hipófise, tumores no sistema nervoso e AVC, e no acompanhamento de diabetes e pressão alta, a critério do médico. As doenças investigadas com o exame estão explicadas no artigo do blog sobre doenças diagnosticadas.',
    'Esses sinais podem estar associados a diferentes condições e precisam de avaliação oftalmológica. O exame sozinho não dá o diagnóstico: o médico o interpreta junto com a consulta e outros exames.',
  ],
  howDone: [
    'Existem alguns tipos de teste. O mais simples é a confrontação, feita no consultório: o médico pede que você olhe para um ponto à frente, com um olho coberto, e diz quantos dedos aparecem nas laterais.',
    'O mais usado quando há suspeita ou acompanhamento é o campo visual automatizado, ou computadorizado. Você apoia o rosto em um aparelho chamado perímetro, cobre um olho e olha fixamente para o centro. Pequenas luzes aparecem em pontos diferentes, e você aperta um botão sempre que vê uma delas. O aparelho registra quais luzes foram vistas e monta o mapa do seu campo de visão.',
    'Há variações, como o campo visual cinético, em que a luz se move, e o teste de dupla frequência, que usa barras que cintilam. A tela de Amsler, com linhas em quadrados, avalia apenas a região central e é muito usada para a mácula.',
    'O campo visual é um teste subjetivo, que depende de atenção e cooperação. É normal errar algumas respostas, e o médico leva isso em conta.',
  ],
  preparation: [
    'Em geral não é preciso suspender medicamentos nem fazer jejum. Vá com os óculos que usa para perto, pois o aparelho pode exigir correção específica, que a equipe ajusta.',
    'Se usa colírios, avise na consulta. Se o exame for feito com dilatação de pupila, o que não costuma ser necessário para o campo visual automatizado, a visão ficará embaçada por algumas horas e é melhor vir acompanhado.',
  ],
  duration: [
    'O exame costuma durar alguns minutos por olho, e a pessoa fica concentrada nesse período. Se o teste precisar ser repetido por cansaço ou erros, pode demorar um pouco mais.',
  ],
  aftercare: [
    'Quando não há dilatação da pupila, a pessoa costuma voltar às atividades normalmente. O exame não exige repouso.',
    'O resultado é interpretado pelo oftalmologista, que compara com exames anteriores. Quem faz acompanhamento de glaucoma costuma repetir o campo visual em intervalos definidos pelo médico. Guarde os laudos e leve-os em todas as consultas.',
  ],
  faq: [
    {
      question: 'Campo visual e acuidade visual são a mesma coisa?',
      answer: [
        'Não. A acuidade visual mede a nitidez com que você enxerga letras ou figuras no centro. O campo visual mede a extensão da área que você percebe, inclusive nas laterais. É possível ter boa acuidade e perda de campo.',
      ],
    },
    {
      question: 'O exame de campo visual dói?',
      answer: [
        'Não causa dor. Ele exige atenção e pode ser cansativo, mas não envolve contato com o olho nem colírios na maioria dos casos.',
      ],
    },
    {
      question: 'Quem tem glaucoma precisa repetir o exame?',
      answer: [
        'Sim, o campo visual é uma das formas de acompanhar o glaucoma. O intervalo entre os exames é definido pelo oftalmologista, de acordo com o estágio da doença e o tratamento.',
      ],
    },
    {
      question: 'Visão monocular tem relação com o campo visual?',
      answer: [
        'Sim. Quem enxerga com um olho só tem o campo visual reduzido, principalmente no lado do olho que não vê. Veja o artigo do blog sobre visão monocular.',
      ],
    },
  ],
  related: {
    doctors: ['roberta-andrade-e-nascimento', 'igor-seidi-sekiguchi'],
    specialties: ['glaucoma', 'retina'],
    exams: ['curva-tensional-diaria', 'tonometria', 'tomografia-de-coerencia-optica'],
    conditions: ['degeneracao-macular'],
    articles: [
      'exame-de-campo-visual-doencas-diagnosticadas-e-tratamentos',
      'biometria-campo-visual-problemas-oculares',
      'tudo-o-que-voce-precisa-saber-sobre-visao-monocular',
      'os-principais-sintomas-do-glaucoma',
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
    'TODO_CONTENT_VALIDATION: tipo de campo visual realizado na CEMO (automatizado, cinético, outros) e marca do perímetro',
    'TODO_CONTENT_VALIDATION: duração do exame e orientações de preparo na CEMO',
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO realiza eletrorretinografia (citada no post original; tratada aqui apenas como exame distinto, omitida do texto)',
  ],
};
