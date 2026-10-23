// Reescrita a partir de paginas/especialidades__catarata.md e dos posts consolidados catarata-buscando-tratamento,
// como-funciona-o-tratamento-da-catarata-no-cemo e tratamentos-avancados-para-catarata-taboao-da-serra; fatos do vídeo do Dr. Adriano.
import type { Specialty } from '../../types';

export const catarata: Specialty = {
  id: 'catarata',
  kind: 'especialidade',
  name: 'Catarata',
  shortName: 'Catarata',
  canonicalPath: '/especialidades/catarata/',
  published: true,
  seo: {
    title: 'Cirurgia de Catarata em Taboão da Serra',
    description:
      'Visão embaçada? Entenda como a catarata é avaliada e tratada, quais exames são feitos e como é a cirurgia na CEMO, em Taboão da Serra.',
  },
  h1: 'Cirurgia de Catarata em Taboão da Serra',
  lead:
    'Visão embaçada, cores apagadas, ofuscamento ao dirigir à noite. Quando esses sinais aparecem, a avaliação oftalmológica mostra se há catarata e se já é o momento de pensar em cirurgia. Na CEMO, em Taboão da Serra, a avaliação, os exames e a cirurgia acontecem no mesmo lugar.',
  summary:
    'Avaliação, exames e cirurgia de catarata em Taboão da Serra, com a indicação definida caso a caso pelo oftalmologista.',
  leadInterest: 'catarata',
  ctaLabel: 'Agendar avaliação de catarata',
  answer: {
    question: 'O que é catarata?',
    text:
      'Catarata é a perda de transparência do cristalino, a lente natural que fica dentro do olho. Com o cristalino opaco, a luz entra com mais dificuldade e a visão fica embaçada. Ela costuma surgir com o passar dos anos e piora de forma gradual. Colírios e óculos não removem a catarata: o tratamento é a cirurgia, que retira o cristalino e coloca no lugar uma lente intraocular. A indicação e o melhor momento são definidos em consulta.',
  },
  signs: {
    title: 'Sinais que merecem uma avaliação',
    intro:
      'A catarata costuma se desenvolver devagar, e muita gente se acostuma com a piora sem perceber. Estes sinais podem estar associados a diferentes condições e precisam de avaliação oftalmológica.',
    items: [
      'Visão embaçada ou turva, como se houvesse uma névoa',
      'Ofuscamento com luz forte ou com os faróis, principalmente à noite',
      'Cores que parecem desbotadas ou amareladas',
      'Troca frequente do grau dos óculos ou das lentes',
      'Visão dupla em um dos olhos',
      'Dificuldade para ler, dirigir ou reconhecer rostos',
    ],
  },
  sections: [
    {
      id: 'quando-procurar',
      title: 'Quando procurar uma avaliação?',
      paragraphs: [
        'A catarata é mais comum a partir dos 50 anos, mas pode aparecer antes por outros motivos, como diabetes, uso prolongado de corticoides, traumas nos olhos ou histórico familiar. Se você tem 50 anos ou mais e percebe a visão embaçada, vale marcar uma consulta.',
        'Não é preciso esperar a catarata “amadurecer” para operar. A indicação depende de quanto a visão atrapalha a sua rotina e do que o exame mostra. Pessoas que já têm outra doença ocular também precisam de atenção, porque ela pode influenciar a decisão e o resultado.',
        'Se a visão piorou de repente, procure atendimento sem esperar. Isso pode ter outras causas além da catarata.',
      ],
    },
    {
      id: 'diagnostico-e-exames',
      title: 'Como é feito o diagnóstico?',
      paragraphs: [
        'O diagnóstico começa na consulta, com o teste de acuidade visual e a avaliação do cristalino na lâmpada de fenda, um microscópio com luz que permite ver a parte da frente do olho. A pressão do olho e a retina também são verificadas, porque outras doenças podem causar sintomas parecidos com os da catarata.',
        'Na CEMO, os exames complementares para o diagnóstico são feitos na própria clínica, e o paciente passa pela avaliação já com o especialista da área. Conforme o caso, o oftalmologista pode pedir:',
      ],
      bullets: [
        'Biometria com Lenstar, que mede o olho para calcular a lente intraocular',
        'Microscopia especular, que avalia as células da camada interna da córnea',
        'Mapeamento de retina, para examinar o fundo do olho',
        'Tonometria, que mede a pressão do olho',
        'Oftalmoscopia e outros exames, de acordo com o histórico de cada pessoa',
      ],
    },
    {
      id: 'tratamento',
      title: 'Qual é o tratamento da catarata?',
      paragraphs: [
        'O tratamento da catarata é a cirurgia. Colírios não desfazem a opacidade do cristalino, e óculos ou lentes de contato só ajudam no início, enquanto o grau ainda pode ser corrigido de forma satisfatória.',
        'Quando a catarata passa a limitar o dia a dia, como ler, dirigir, assistir à TV ou circular com segurança, a cirurgia costuma ser considerada. Operar mais cedo ou mais tarde é uma decisão conversada entre você e o oftalmologista, a partir dos exames.',
      ],
    },
    {
      id: 'como-funciona-a-cirurgia',
      title: 'Como funciona a cirurgia de catarata?',
      paragraphs: [
        'A cirurgia é feita em centro cirúrgico, com anestesia local e sedação. Isso quer dizer que o olho é anestesiado e o paciente recebe medicação para ficar tranquilo, sem anestesia geral.',
        'Durante o procedimento, o cristalino opaco é retirado e uma lente intraocular é implantada dentro do olho. A técnica mais usada, em termos gerais, é a facoemulsificação: por uma incisão muito pequena, o cristalino é fragmentado e aspirado. A lente acompanha o olho de forma permanente.',
        'Os riscos e as particularidades de cada caso, inclusive o intervalo entre um olho e outro quando os dois precisam ser operados, são explicados na consulta, antes da decisão.',
      ],
    },
    {
      id: 'recuperacao',
      title: 'Recuperação e cuidados',
      paragraphs: [
        'A recuperação varia de um paciente para outro. O que mais pesa para um bom resultado é seguir as orientações da equipe, que passa as instruções por escrito e explica cada uma delas.',
      ],
      bullets: [
        'Usar os colírios nos horários indicados',
        'Evitar coçar ou pressionar o olho operado',
        'Proteger o olho de poeira, água e produtos de higiene, conforme orientado',
        'Não faltar aos retornos de acompanhamento',
        'Avisar a equipe se houver dor intensa, piora da visão ou vermelhidão que aumenta',
      ],
    },
    {
      id: 'capsulotomia-yag',
      title: 'E se a visão embaçar de novo depois da cirurgia?',
      paragraphs: [
        'Meses ou anos depois, a fina cápsula que sustenta a lente pode ficar turva, e a visão volta a embaçar. Isso não é uma nova catarata, e sim a opacificação da cápsula. Costuma ser tratada com a capsulotomia a YAG laser.',
        'A CEMO realiza o YAG laser para limpeza da cápsula depois da catarata. A indicação é feita após o exame do olho.',
      ],
    },
    {
      id: 'estrutura-cemo',
      title: 'Avaliação, exames e cirurgia no mesmo lugar',
      paragraphs: [
        'A CEMO reúne várias especialidades da oftalmologia em Taboão da Serra. Para o paciente de catarata, isso significa passar pela avaliação com o especialista, fazer os exames no mesmo dia e, se houver indicação, seguir para a cirurgia sem circular entre clínicas.',
        'O acompanhamento depois da cirurgia também faz parte do cuidado: as consultas de retorno ajudam a perceber cedo qualquer alteração.',
      ],
    },
  ],
  journey: {
    title: 'Como é o caminho do paciente',
    intro: 'Do primeiro contato à recuperação, estas são as etapas que o paciente costuma percorrer.',
    steps: [
      {
        title: 'Avaliação',
        text: 'Consulta com o oftalmologista, teste de visão e exame do cristalino para entender se há catarata e como ela afeta o seu dia a dia.',
      },
      {
        title: 'Exames',
        text: 'Exames complementares, como a biometria e a microscopia especular, feitos na clínica para planejar a cirurgia com segurança.',
      },
      {
        title: 'Indicação e escolha da lente',
        text: 'O médico explica o que os exames mostram, indica ou não a cirurgia e conversa sobre o tipo de lente intraocular mais adequado.',
      },
      {
        title: 'Cirurgia',
        text: 'Realizada em centro cirúrgico, com anestesia local e sedação. O paciente sai com as orientações para o pós-operatório.',
      },
      {
        title: 'Acompanhamento',
        text: 'Retornos programados para avaliar a recuperação, ajustar o tratamento e, se preciso, indicar óculos.',
      },
    ],
  },
  options: {
    title: 'Que tipos de lente intraocular existem?',
    intro:
      'A lente intraocular substitui o cristalino. Existem modelos com finalidades diferentes, e a escolha leva em conta o seu olho, a sua rotina e o que os exames indicam.',
    items: [
      {
        name: 'Monofocal',
        text: 'Tem um foco principal, geralmente para longe. Para ler ou usar o celular, costuma ser necessário usar óculos.',
      },
      {
        name: 'Tórica',
        text: 'Também corrige o astigmatismo da córnea, quando ele é relevante e regular.',
      },
      {
        name: 'Multifocal e trifocal',
        text: 'Combina focos para longe, distância intermediária e perto. Pode reduzir a necessidade de óculos em algumas situações, mas não é indicada para todos os olhos.',
      },
      {
        name: 'EDOF (profundidade de foco estendida)',
        text: 'Estende o foco principalmente para as distâncias longe e intermediária. Também depende de indicação individual.',
      },
    ],
    note: 'A indicação da lente é individual e nenhuma delas garante independência de óculos. Na consulta, a equipe esclarece quais modelos estão disponíveis na CEMO.',
  },
  faq: [
    {
      question: 'Catarata tem cura sem cirurgia?',
      answer: [
        'Não. Colírios e óculos não removem a opacidade do cristalino. Os óculos podem melhorar a visão no início, mas o tratamento da catarata é a cirurgia.',
      ],
    },
    {
      question: 'Preciso esperar a catarata “amadurecer” para operar?',
      answer: [
        'Não é necessário. A decisão depende de quanto a catarata atrapalha as suas atividades e do que os exames mostram. O oftalmologista orienta o momento adequado.',
      ],
    },
    {
      question: 'A cirurgia de catarata dói?',
      answer: [
        'A cirurgia é feita com anestesia local e sedação, justamente para que o paciente fique confortável. Algum desconforto no pós-operatório pode acontecer, e a equipe orienta o que usar e o que observar.',
      ],
    },
    {
      question: 'Vou deixar de usar óculos depois da cirurgia?',
      answer: [
        'Depende do seu olho e da lente indicada. Algumas lentes podem reduzir a necessidade de óculos em certas distâncias, mas não é possível garantir que você deixará de usá-los. Isso é conversado antes da cirurgia.',
      ],
    },
    {
      question: 'A catarata pode voltar?',
      answer: [
        'O cristalino retirado não volta. Porém, a cápsula que sustenta a lente pode ficar turva com o tempo, e a visão embaça de novo. Nesse caso, a capsulotomia a YAG laser é uma das opções.',
      ],
    },
    {
      question: 'Diabetes aumenta o risco de catarata?',
      answer: [
        'Sim, pessoas com diabetes têm mais chance de desenvolver catarata e precisam de acompanhamento oftalmológico regular. A avaliação da retina faz parte do planejamento.',
      ],
    },
  ],
  related: {
    doctors: ['david-ribeiro-de-mendonca-filho', 'roberta-andrade-e-nascimento', 'igor-seidi-sekiguchi'],
    specialties: ['consulta', 'retina'],
    exams: ['biometria', 'microscopia-especular', 'mapeamento-de-retina', 'tonometria'],
    conditions: [],
    articles: [
      'lentes-intraoculares-premium-catarata',
      'catarata-nos-olhos-quando-operar',
      'a-relacao-entre-a-diabetes-e-a-catarata',
      'tudo-sobre-capsulotomia-com-yag-laser',
      'causas-da-catarata',
    ],
  },
  videoIds: ['dr-adriano-catarata'],
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
    'TODO_CONTENT_VALIDATION: incluir fontes e referências (a página do CBO citada no post antigo retornou 404 e não foi verificada)',
    'TODO_CONTENT_VALIDATION: confirmar quais tipos de lente intraocular (monofocal, tórica, multifocal/trifocal, EDOF) a CEMO oferece',
    'TODO_CONTENT_VALIDATION: confirmar duração da cirurgia (o site antigo cita 20 min e 20 a 40 min) e se há facoemulsificação a laser/femtossegundo',
    'TODO_CONTENT_VALIDATION: confirmar quais exames pré-operatórios são feitos no mesmo dia, o protocolo de cirurgia um olho por vez e o intervalo',
    'TODO_CONTENT_VALIDATION: confirmar prazos de retorno e orientações de pós-operatório do protocolo da CEMO',
  ],
};
