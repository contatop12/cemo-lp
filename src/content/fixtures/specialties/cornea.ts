// Conteúdo reescrito a partir da página atual /especialidades/cornea/ e de posts de córnea e ceratocone (resumo).
import type { Specialty } from '../../types';

export const cornea: Specialty = {
  id: 'cornea',
  kind: 'especialidade',
  name: 'Córnea e Ceratocone',
  shortName: 'Córnea e ceratocone',
  canonicalPath: '/especialidades/cornea/',
  published: true,
  seo: {
    title: 'Córnea e ceratocone em Taboão da Serra',
    description:
      'Veja como são investigadas e tratadas as doenças da córnea, incluindo o ceratocone, e quais exames ajudam no diagnóstico e no acompanhamento.',
  },
  h1: 'Córnea e ceratocone em Taboão da Serra',
  lead: 'A córnea é a “janela” transparente na frente do olho. Quando o formato ou a transparência mudam, a visão sofre. Entenda como as doenças da córnea são avaliadas e quais caminhos de tratamento existem.',
  summary: 'Avaliação das doenças da córnea e do ceratocone, com exames de imagem para diagnóstico e acompanhamento.',
  leadInterest: 'cornea',
  ctaLabel: 'Agendar avaliação de córnea',
  answer: {
    question: 'O que é a especialidade de córnea?',
    text: 'A córnea é a camada transparente na frente do olho, responsável por boa parte do foco da imagem. A especialidade de córnea cuida de doenças que alteram o seu formato, a sua transparência ou a sua saúde, como o ceratocone, as cicatrizes e as inflamações. O diagnóstico usa exames de imagem, e o tratamento varia de óculos e lentes especiais a procedimentos e cirurgias, conforme cada caso.',
  },
  signs: {
    title: 'Quando procurar um oftalmologista',
    intro:
      'Esses sinais podem estar associados a diferentes condições e precisam de avaliação oftalmológica:',
    items: [
      'Visão embaçada ou distorcida que os óculos não corrigem bem',
      'Troca frequente de grau, principalmente em jovens',
      'Sensibilidade à luz, olho vermelho ou dor ocular persistentes',
      'Sensação de corpo estranho no olho que não passa',
      'Manchas esbranquiçadas ou perda de brilho na córnea',
    ],
  },
  sections: [
    {
      id: 'funcao',
      title: 'Qual é a função da córnea?',
      paragraphs: [
        'A córnea fica na parte da frente do olho e, junto com a esclera, o “branco do olho”, forma a camada protetora externa. Além de proteger, ela é responsável por grande parte do poder de focalização da imagem.',
        'Para isso, precisa ter o formato regular e ser transparente. Qualquer alteração em um desses pontos pode comprometer a qualidade da visão e a saúde do olho.',
      ],
    },
    {
      id: 'doencas',
      title: 'Que doenças afetam a córnea?',
      paragraphs: [
        'Em termos gerais, as doenças da córnea se dividem entre as que mudam o seu formato, as que reduzem a sua transparência e as que a inflamam ou infectam. Algumas das condições avaliadas são:',
      ],
      bullets: [
        'Ceratocone: afinamento e deformação progressiva da córnea',
        'Ceratites: inflamações ou infecções da córnea',
        'Cicatrizes e opacidades, por trauma, infecção ou doenças anteriores',
        'Distrofias e degenerações corneanas',
        'Alterações associadas ao olho seco',
      ],
    },
    {
      id: 'ceratocone',
      title: 'O que é o ceratocone?',
      paragraphs: [
        'No ceratocone, a córnea se torna mais fina e perde a regularidade, ganhando um formato mais “pontudo”. Isso costuma causar visão distorcida, miopia e astigmatismo que mudam com frequência. Ele geralmente começa na adolescência ou no início da vida adulta.',
        'Detectado cedo, o ceratocone pode ser acompanhado e tratado de forma a controlar a evolução. O Dr. David Ribeiro de Mendonça Filho atua com ceratocone na CEMO. Para o conteúdo completo sobre sintomas, causas e tratamentos, veja a página sobre ceratocone.',
      ],
    },
    {
      id: 'exames',
      title: 'Quais exames avaliam a córnea?',
      paragraphs: [
        'Os exames mapeiam o formato, a espessura e as células da córnea. Eles mostram alterações que muitas vezes não aparecem no exame de rotina, e permitem comparar a evolução ao longo do tempo.',
      ],
      bullets: [
        'Topografia de córnea (ceratoscopia): mapeia a curvatura da superfície e é central no diagnóstico do ceratocone',
        'Tomografia de córnea: mostra a forma da frente e de trás da córnea e a sua espessura em diferentes pontos',
        'Paquimetria: mede a espessura da córnea',
        'Microscopia especular: avalia as células da camada interna da córnea, o endotélio',
      ],
    },
    {
      id: 'tratamentos',
      title: 'Quais tratamentos existem para as doenças da córnea?',
      paragraphs: [
        'O tratamento depende da doença e da fase, e é definido pelo oftalmologista após a avaliação. Nas doenças que deformam a córnea, como o ceratocone, os recursos de uso mais comum são:',
      ],
      bullets: [
        'Óculos: corrigem o grau nas fases iniciais',
        'Lentes de contato especiais: ajudam a regularizar a visão quando os óculos não bastam',
        'Crosslinking corneano: procedimento que busca fortalecer a córnea e frear a progressão',
        'Anel intraestromal: implante na córnea que ajuda a regularizar o seu formato',
        'Transplante de córnea: indicado em casos selecionados, quando outras opções não são suficientes',
      ],
    },
    {
      id: 'na-cemo',
      title: 'Como é o atendimento de córnea na CEMO?',
      paragraphs: [
        'A CEMO reúne as especialidades da oftalmologia em um só lugar. O paciente passa na avaliação com o especialista e faz os exames no mesmo dia, sem precisar voltar em outras datas. Entre os exames da clínica estão a topografia de córnea e a microscopia especular.',
        'A equipe indica o caminho de tratamento após a avaliação e os exames. O procedimento adequado é individual e não pode ser definido sem consulta.',
      ],
    },
  ],
  faq: [
    {
      question: 'O ceratocone pode comprometer a visão?',
      answer: [
        'Sem acompanhamento, o ceratocone pode reduzir a qualidade da visão, mas existem formas de controlar a evolução e melhorar a visão. O diagnóstico precoce e o acompanhamento regular são o caminho. Seu oftalmologista explica o que esperar no seu caso.',
      ],
    },
    {
      question: 'O que é topografia de córnea?',
      answer: [
        'É um exame que mapeia a curvatura da superfície da córnea e não encosta no olho. Ele mostra irregularidades que o exame comum não vê e é muito usado para investigar ceratocone e planejar cirurgias.',
      ],
    },
    {
      question: 'Todo ceratocone precisa de cirurgia?',
      answer: [
        'Não. Em muitos casos, o acompanhamento e a correção com óculos ou lentes especiais são suficientes por um período. O procedimento é indicado conforme a evolução da doença e os exames.',
      ],
    },
    {
      question: 'Coçar os olhos pode prejudicar a córnea?',
      answer: [
        'Coçar com força e com frequência é um hábito associado ao ceratocone e pode irritar a córnea. Se você sente coceira constante, converse com o oftalmologista para investigar a causa, como alergia ou olho seco.',
      ],
    },
    {
      question: 'Crianças podem ter problemas de córnea?',
      answer: [
        'Podem. O ceratocone, por exemplo, pode aparecer na infância e na adolescência. Troca frequente de grau, queixa de visão borrada e coceira intensa merecem uma avaliação oftalmológica.',
      ],
    },
  ],
  related: {
    doctors: ['david-ribeiro-de-mendonca-filho'],
    specialties: ['refrativa', 'lentes-de-contato', 'consulta'],
    exams: ['ceratoscopia', 'paquimetria', 'microscopia-especular', 'tomografia-de-coerencia-optica'],
    conditions: ['ceratocone'],
    articles: [
      'qual-a-funcao-da-cornea',
      'sintomas-e-problemas-na-cornea',
      'cicatrizacao-da-cornea',
      'entendendo-a-ceratite',
      'transplante-de-cornea-ceratocone',
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
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO realiza crosslinking corneano (o site antigo cita; sem fonte validada) e se o texto pode afirmar',
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO realiza implante de anel intraestromal (o site antigo cita “anel corneano (Ferrara)”)',
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO realiza transplante de córnea e em que formato (próprio ou encaminhamento)',
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO adapta lentes de contato especiais para ceratocone',
    'TODO_CONTENT_VALIDATION: confirmar disponibilidade de tomografia de córnea e paquimetria na clínica (o vídeo cita topografia de córnea e microscopia especular)',
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO atende pterígio e outras doenças da superfície ocular citadas no site antigo (fora do texto por ora)',
    'TODO_CONTENT_VALIDATION: páginas /tratamentos/ de crosslinking, anel e transplante não estão publicadas; incluir links quando existirem',
  ],
};
