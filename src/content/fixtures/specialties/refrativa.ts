// Reescrita a partir de paginas/especialidades__refrativa.md e dos posts consolidados cirurgia-refrativa-o-que-e-e-quais-sao-os-casos-indicados,
// cirurgia-refrativa-quando-procurar-por-esse-procedimento e refrativa-tudo-sobre; fatos do vídeo "Óculos" do Dr. David.
import type { Specialty } from '../../types';

export const refrativa: Specialty = {
  id: 'refrativa',
  kind: 'especialidade',
  name: 'Cirurgia Refrativa',
  shortName: 'Cirurgia refrativa',
  canonicalPath: '/especialidades/refrativa/',
  published: true,
  seo: {
    title: 'Cirurgia Refrativa em Taboão da Serra',
    description:
      'Miopia, astigmatismo ou hipermetropia? Saiba quem pode fazer cirurgia refrativa, quais exames avaliam a córnea e como é a avaliação na CEMO.',
  },
  h1: 'Cirurgia Refrativa em Taboão da Serra',
  lead:
    'Usar óculos ou lentes o dia inteiro cansa. A cirurgia refrativa a laser pode reduzir a dependência de óculos ou lentes quando há indicação médica, mas nem todo olho pode ser operado. Na CEMO, em Taboão da Serra, a avaliação com exames da córnea mostra se esse caminho existe para você.',
  summary:
    'Avaliação para cirurgia refrativa a laser em Taboão da Serra, com exames da córnea e indicação definida caso a caso.',
  leadInterest: 'refrativa',
  ctaLabel: 'Saber se a cirurgia refrativa é para você',
  answer: {
    question: 'O que é a cirurgia refrativa?',
    text:
      'Cirurgia refrativa é o conjunto de procedimentos que alteram a forma como o olho foca a luz, para corrigir miopia, astigmatismo e hipermetropia. Na refrativa a laser, a curvatura da córnea é remodelada. Pode reduzir a dependência de óculos ou lentes quando há indicação médica, mas não serve para todo mundo e não garante independência total. Só a avaliação com exames define se é seguro e qual técnica se aplica.',
  },
  sections: [
    {
      id: 'o-que-corrige',
      title: 'Quais problemas de visão a cirurgia refrativa trata?',
      paragraphs: [
        'Ela é pensada para os chamados erros refrativos, em que o olho não foca a imagem exatamente na retina. Os mais comuns são a miopia, o astigmatismo e a hipermetropia.',
        'A miopia dificulta enxergar de longe. A hipermetropia costuma cansar a visão de perto e, em graus maiores, também de longe. No astigmatismo, a curvatura irregular da córnea deixa a imagem borrada ou distorcida em várias distâncias. Muitas pessoas têm mais de um deles ao mesmo tempo.',
      ],
    },
    {
      id: 'o-que-esperar',
      title: 'O que a cirurgia pode (e não pode) fazer?',
      paragraphs: [
        'O objetivo da cirurgia refrativa é corrigir o grau que a pessoa tem no momento do procedimento. Quando há indicação médica, ela pode reduzir a dependência de óculos ou lentes de contato no dia a dia.',
        'Ela não impede que o grau mude no futuro e não trata doenças como o glaucoma, a catarata ou o ceratocone. Também não elimina a necessidade de consultas regulares: quem opera continua precisando cuidar dos olhos. Algumas pessoas ainda precisam de óculos para determinadas tarefas, principalmente para leitura com o passar dos anos.',
        'Todo procedimento cirúrgico tem riscos. Eles e as alternativas, como óculos e lentes de contato, são explicados na consulta, para que a decisão seja sua e bem informada.',
      ],
    },
    {
      id: 'quem-pode-fazer',
      title: 'Quem pode fazer cirurgia refrativa?',
      paragraphs: [
        'A indicação depende da avaliação oftalmológica. Em geral, o médico considera estes pontos:',
      ],
      bullets: [
        'Ser adulto, com idade e grau estáveis, isto é, sem mudança relevante nos últimos tempos',
        'Ter córnea saudável, com espessura e formato adequados ao grau que se quer corrigir',
        'Não ter doenças oculares ou sistêmicas que atrapalhem a cicatrização',
        'Ter expectativas realistas sobre o resultado',
      ],
    },
    {
      id: 'contraindicacoes',
      title: 'Quando a cirurgia refrativa não é indicada?',
      paragraphs: [
        'Há situações em que operar não é seguro ou não traz benefício. É por isso que existe a avaliação: a decisão sempre cabe ao oftalmologista, depois dos exames.',
      ],
      bullets: [
        'Córnea fina ou com formato irregular',
        'Ceratocone ou suspeita de ceratocone',
        'Grau que ainda está mudando',
        'Algumas doenças do olho ou do corpo, a depender do caso',
        'Gravidez e amamentação, que alteram o grau temporariamente',
      ],
    },
    {
      id: 'avaliacao-e-exames',
      title: 'Como é a avaliação antes da cirurgia?',
      paragraphs: [
        'Antes de qualquer indicação, o oftalmologista faz uma consulta completa, mede o grau e examina o olho. Depois vêm os exames que avaliam a córnea, que é a parte do olho que será remodelada.',
        'Na CEMO, os exames são feitos no mesmo lugar da consulta, e o paciente passa pela avaliação já com o especialista da área. Entre os exames que ajudam nessa decisão estão:',
      ],
      bullets: [
        'Topografia de córnea, que mapeia a curvatura da superfície',
        'Paquimetria, que mede a espessura da córnea',
        'Microscopia especular, que avalia as células da camada interna da córnea',
        'Mapeamento de retina e medida da pressão do olho, conforme o caso',
      ],
    },
    {
      id: 'tecnicas',
      title: 'Como funciona a cirurgia a laser?',
      paragraphs: [
        'O laser remodela a córnea para que a luz passe a focar no lugar certo. O procedimento costuma ser feito com anestesia em colírio, com o paciente acordado, e a alta é no mesmo dia.',
        'As técnicas mais conhecidas são o PRK e o LASIK. A escolha entre elas depende da espessura e do formato da córnea, do grau e da sua rotina, e é definida na avaliação.',
      ],
    },
    {
      id: 'recuperacao',
      title: 'Como é a recuperação?',
      paragraphs: [
        'A recuperação varia conforme a técnica e de pessoa para pessoa. Nos primeiros dias pode haver desconforto, sensibilidade à luz e visão oscilante, e o médico explica o que é esperado em cada fase.',
      ],
      bullets: [
        'Usar os colírios exatamente como prescritos',
        'Evitar coçar o olho e proteger de poeira e água',
        'Seguir as orientações sobre maquiagem, exercícios e telas',
        'Comparecer a todos os retornos de acompanhamento',
      ],
    },
    {
      id: 'presbiopia',
      title: 'E a vista cansada? A cirurgia refrativa resolve?',
      paragraphs: [
        'A presbiopia, ou vista cansada, aparece depois dos 40 anos e dificulta a visão de perto. Ela tem origem no cristalino, que perde a capacidade de focar. Por isso, a cirurgia refrativa a laser não é a resposta para todo mundo que sofre com ela.',
        'No vídeo da CEMO, o Dr. David conta que ele mesmo tem presbiopia e uma contraindicação para a cirurgia refrativa. O recado é que nem todo olho tem indicação, e cada caso pede a técnica adequada e segura. Para ele, uma cirurgia de catarata com lente trifocal pode ser uma opção no futuro.',
      ],
    },
  ],
  journey: {
    title: 'Como é o caminho até a cirurgia',
    intro: 'Estas são as etapas que o paciente costuma percorrer.',
    steps: [
      {
        title: 'Consulta',
        text: 'Conversa sobre o seu histórico, medida do grau e exame geral dos olhos, para entender se vale seguir adiante.',
      },
      {
        title: 'Exames da córnea',
        text: 'Topografia, paquimetria e outros exames, feitos na clínica, para verificar se a córnea tem condições seguras para o procedimento.',
      },
      {
        title: 'Indicação e técnica',
        text: 'O médico explica o resultado dos exames, indica ou não a cirurgia e define a técnica mais adequada ao seu caso.',
      },
      {
        title: 'Cirurgia',
        text: 'Feita a laser, com anestesia em colírio. O paciente recebe as orientações para os primeiros dias.',
      },
      {
        title: 'Acompanhamento',
        text: 'Retornos programados para avaliar a recuperação e a estabilidade da visão.',
      },
    ],
  },
  options: {
    title: 'Quais técnicas existem?',
    intro:
      'Existem diferentes formas de remodelar a córnea com laser. Em termos gerais, estas são as mais conhecidas.',
    items: [
      {
        name: 'PRK',
        text: 'Técnica de superfície: o laser atua sobre a camada externa da córnea, sem criar uma aba. A recuperação costuma ser um pouco mais longa e com mais desconforto nos primeiros dias.',
      },
      {
        name: 'LASIK',
        text: 'Cria uma fina aba na córnea, o laser atua por baixo dela e a aba é recolocada. É uma das técnicas mais conhecidas, e nem sempre é a indicada para córneas finas.',
      },
    ],
    note: 'A técnica é definida na avaliação, depois dos exames. Nem todo paciente pode fazer qualquer uma delas.',
  },
  faq: [
    {
      question: 'Com que idade posso fazer cirurgia refrativa?',
      answer: [
        'Em geral, a cirurgia é indicada para adultos com grau estável por um período. Não existe uma idade única: a decisão depende dos exames e da avaliação do médico.',
      ],
    },
    {
      question: 'Vou deixar de usar óculos para sempre?',
      answer: [
        'A cirurgia pode reduzir a dependência de óculos ou lentes quando há indicação médica, mas não é possível garantir independência total. Com o passar dos anos, a vista cansada pode exigir óculos para perto.',
      ],
    },
    {
      question: 'A cirurgia refrativa dói?',
      answer: [
        'O procedimento é feito com anestesia em colírio. Depois, pode haver desconforto, lacrimejamento e sensibilidade à luz, mais comuns nos primeiros dias. A equipe orienta como lidar com cada fase.',
      ],
    },
    {
      question: 'Quem tem ceratocone pode fazer?',
      answer: [
        'Em geral, não. O ceratocone deixa a córnea mais fina e irregular, e a cirurgia refrativa a laser pode piorar o quadro. O tratamento do ceratocone é outro e é definido pelo oftalmologista.',
      ],
    },
    {
      question: 'O grau pode voltar depois da cirurgia?',
      answer: [
        'Em alguns casos, o grau pode mudar com o tempo, por exemplo se o olho ainda estava se modificando. Por isso a estabilidade do grau antes da cirurgia e o acompanhamento depois dela são importantes.',
      ],
    },
    {
      question: 'Como saber se tenho indicação?',
      answer: [
        'Só a avaliação com um oftalmologista e os exames da córnea respondem a essa pergunta. Marcar a consulta não obriga ninguém a operar: se não houver indicação, o médico orienta outras formas de correção.',
      ],
    },
  ],
  related: {
    doctors: ['david-ribeiro-de-mendonca-filho', 'priscilla-pires', 'bruna-de-andrade-nascimento'],
    specialties: ['consulta', 'cornea', 'lentes-de-contato'],
    exams: ['ceratoscopia', 'paquimetria', 'microscopia-especular'],
    conditions: ['miopia', 'astigmatismo', 'hipermetropia', 'presbiopia'],
    articles: [
      'quem-pode-fazer-a-cirurgia-refrativa',
      'cirurgia-refrativa-cuidados-pos-operatorio',
      'miopia-quando-pode-ser-corrigida',
      'astigmatismo-tem-cura',
      'hipermetropia-como-e-a-visao',
    ],
  },
  videoIds: ['dr-david-oculos'],
  review: {
    status: 'MEDICAL_REVIEW',
    author: 'Equipe editorial CEMO',
    medicalReviewerSlug: null,
    reviewedAt: null,
    updatedAt: '2026-10-22',
    sources: [
      {
        label: 'BRASCRS – O que é cirurgia refrativa',
        url: 'https://brascrs.com.br/publico/o-que-e-cirurgia-refrativa/',
      },
    ],
  },
  todos: [
    'TODO_CONTENT_VALIDATION: revisão médica do texto',
    'TODO_CONTENT_VALIDATION: confirmar quais técnicas de cirurgia refrativa a CEMO realiza (PRK, LASIK, femtossegundo, lentes) e o aparelho de laser',
    'TODO_CONTENT_VALIDATION: confirmar quais exames pré-operatórios a CEMO faz para refrativa (topografia, paquimetria, microscopia especular) e a idade mínima adotada',
    'TODO_CONTENT_VALIDATION: confirmar duração do procedimento, prazos de recuperação e protocolo de pós-operatório',
    'TODO_CONTENT_VALIDATION: confirmar se a anestesia é só em colírio e se a alta é no mesmo dia',
  ],
};
