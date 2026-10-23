// Página atual /especialidades/plastica-ocular/ + posts consolidados (plastica-ocular-cirurgia, plastica-ocular-no-cemo, plastica-ocular-entenda-como-funciona, pra-quem-e-recomendado-a-cirurgia-de-plastica-ocular) + vídeos da Dra. Danielle Longo.
import type { Specialty } from '../../types';

export const plasticaOcular: Specialty = {
  id: 'plastica-ocular',
  kind: 'especialidade',
  name: 'Plástica Ocular',
  shortName: 'Plástica ocular',
  canonicalPath: '/especialidades/plastica-ocular/',
  published: true,
  seo: {
    title: 'Plástica ocular em Taboão da Serra',
    description:
      'Pálpebras caídas, calázio, lacrimejamento ou alterações da órbita? Conheça as condições tratadas na plástica ocular e agende sua avaliação no CEMO.',
  },
  h1: 'Plástica ocular em Taboão da Serra',
  lead: 'A plástica ocular, ou oculoplástica, cuida das pálpebras, das vias lacrimais e da órbita, a cavidade óssea que abriga o olho. O foco é a função: enxergar bem, manter o olho protegido e confortável. Quando há também uma questão estética, ela é conversada na avaliação, sem promessas.',
  summary: 'Avaliação e tratamento de alterações das pálpebras, das vias lacrimais e da órbita, com foco na função e na saúde ocular.',
  leadInterest: 'plastica-ocular',
  ctaLabel: 'Agendar avaliação de plástica ocular',
  answer: {
    question: 'O que a plástica ocular trata?',
    text: 'A plástica ocular é a área da oftalmologia que trata alterações das pálpebras, das vias lacrimais (por onde a lágrima escoa) e da órbita. Inclui condições como calázio, excesso de pele nas pálpebras, pálpebra caída, pálpebra que vira para dentro ou para fora e lacrimejamento por obstrução. A indicação depende de cada caso e é definida em avaliação oftalmológica, sempre com foco na saúde e na função do olho.',
  },
  signs: {
    title: 'Quando procurar um especialista em plástica ocular',
    intro:
      'Estes sinais podem estar associados a diferentes condições das pálpebras, das vias lacrimais ou da órbita e precisam de avaliação oftalmológica.',
    items: [
      'Pele ou pálpebra que cai e atrapalha o campo de visão',
      'Caroço ou inchaço na pálpebra que não melhora',
      'Cílios que raspam o olho ou pálpebra que se afasta do olho',
      'Lacrimejamento constante ou secreção persistente no canto do olho',
      'Olho vermelho, irritado ou seco, com dificuldade para fechar as pálpebras',
      'Mudança de posição ou volume do olho',
      'Lesão na pele da pálpebra que cresce ou sangra',
    ],
  },
  sections: [
    {
      id: 'o-que-e',
      title: 'O que é a plástica ocular?',
      paragraphs: [
        'É uma subespecialidade da oftalmologia dedicada às estruturas que protegem e envolvem o olho: pálpebras, vias lacrimais, órbita e áreas próximas. O médico que atua nela é o oculoplástico, oftalmologista com formação específica nessa área.',
        'Em muitos casos, o tratamento é funcional: proteger a córnea, desobstruir a passagem da lágrima, liberar o campo de visão. Em outros, há um componente estético, que pode ser considerado como contexto da avaliação, mas não é o ponto de partida.',
      ],
    },
    {
      id: 'avaliacao',
      title: 'Como é a avaliação?',
      paragraphs: [
        'A consulta começa com sua história: desde quando o problema existe, o que incomoda e se há outros tratamentos ou doenças. O médico examina as pálpebras e o olho e, se necessário, solicita exames complementares, que a CEMO realiza na própria clínica.',
        'Quando há indicação cirúrgica, a equipe explica o procedimento, os cuidados antes e depois, os riscos e o que esperar. Nem todo caso precisa de cirurgia; algumas condições são acompanhadas ou tratadas com medicação.',
      ],
    },
    {
      id: 'equipe',
      title: 'Quem atende na CEMO',
      paragraphs: [
        'Os vídeos da clínica sobre calázio, excesso de pele, entrópio e ectrópio e vias lacrimais são apresentados pela Dra. Danielle Longo, que atua em plástica ocular, vias lacrimais e órbita.',
      ],
    },
  ],
  options: {
    title: 'Condições e procedimentos de plástica ocular',
    intro:
      'Estes são os principais temas tratados na especialidade. Para cada um, a indicação é feita caso a caso, após avaliação.',
    items: [
      {
        name: 'Calázio',
        text: 'É um nódulo na pálpebra causado pela obstrução de uma glândula que produz gordura da lágrima. Muitos casos melhoram com compressas e medicação, orientadas pelo médico. Quando o nódulo persiste, cresce ou incomoda a visão, a cirurgia de calázio pode ser considerada.',
      },
      {
        name: 'Blefaroplastia (excesso de pele e bolsas de gordura)',
        text: 'É a cirurgia que remove o excesso de pele da pálpebra superior e as bolsas de gordura. É considerada quando a pele sobra a ponto de pesar sobre os cílios ou reduzir o campo de visão, o que o médico confirma na avaliação. Também pode ter um objetivo estético, avaliado em conjunto com o aspecto funcional.',
      },
      {
        name: 'Entrópio',
        text: 'É a pálpebra que vira para dentro, fazendo os cílios tocarem o olho. Pode causar dor, vermelhidão e lacrimejamento, e machucar a córnea. A cirurgia é considerada para reposicionar a pálpebra e proteger a superfície do olho.',
      },
      {
        name: 'Ectrópio',
        text: 'É a pálpebra que vira para fora, deixando o olho exposto, o que pode causar lacrimejamento, vermelhidão e ressecamento. Quando há indicação, a cirurgia reposiciona a pálpebra para que ela volte a proteger o olho.',
      },
      {
        name: 'Vias lacrimais',
        text: 'A lágrima escoa por pequenos canais do canto do olho até o nariz. Quando há obstrução, o olho lacrimeja e pode haver secreção ou infecções repetidas. O tratamento depende do local e da causa da obstrução e pode incluir procedimentos para restabelecer a passagem da lágrima.',
      },
      {
        name: 'Órbita',
        text: 'É a cavidade óssea que abriga o olho. Alterações da órbita, como inflamações, tumores, fraturas ou doenças da tireoide, podem mudar a posição do olho e exigir investigação específica. A avaliação define se há necessidade de exames de imagem e de qual tratamento.',
      },
    ],
    note: 'Os procedimentos dependem de indicação médica, exames e avaliação individual. Resultados variam de pessoa para pessoa.',
  },
  journey: {
    title: 'Como funciona o atendimento na CEMO',
    steps: [
      {
        title: 'Agendamento',
        text: 'Você conta o que está sentindo pelo WhatsApp ou telefone e agenda a avaliação com a especialista da área.',
      },
      {
        title: 'Avaliação e exames',
        text: 'A consulta e os exames necessários são feitos na própria clínica, sem precisar voltar em outros dias.',
      },
      {
        title: 'Explicação do caso',
        text: 'O médico explica o diagnóstico, as opções e se há indicação cirúrgica, com orientações de antes e depois.',
      },
      {
        title: 'Acompanhamento',
        text: 'Após o tratamento, a equipe combina os retornos para acompanhar a recuperação.',
      },
    ],
  },
  faq: [
    {
      question: 'Plástica ocular é só estética?',
      answer: [
        'Não. Boa parte dos casos envolve a função: pálpebras que atrapalham a visão, que ferem a córnea ou vias lacrimais obstruídas. A parte estética pode existir, mas é discutida na avaliação, junto com a saúde do olho.',
      ],
    },
    {
      question: 'Todo calázio precisa de cirurgia?',
      answer: [
        'Não. Muitos calázios melhoram com compressas mornas e medicação indicada pelo médico. A cirurgia é considerada quando o nódulo persiste, cresce ou incomoda a visão.',
      ],
    },
    {
      question: 'Pálpebra caída pode atrapalhar a visão?',
      answer: [
        'Pode. Quando a pálpebra ou o excesso de pele cobre parte da pupila, o campo de visão pode diminuir, e a criança com ptose precisa de atenção especial porque a visão está em desenvolvimento. Só a avaliação mostra a causa e a conduta.',
      ],
    },
    {
      question: 'O que é preciso fazer antes de uma cirurgia de pálpebras?',
      answer: [
        'A equipe orienta caso a caso. Em geral, o médico pergunta sobre doenças, alergias e medicamentos em uso, e pode pedir exames. Informe também se você fuma, porque isso pode interferir na cicatrização.',
      ],
    },
    {
      question: 'Lacrimejamento constante é normal?',
      answer: [
        'Pode ter várias causas, como olho seco, alergia, alterações das pálpebras ou obstrução das vias lacrimais. Se o lacrimejamento é persistente, vale uma avaliação para identificar a causa.',
      ],
    },
  ],
  related: {
    doctors: [],
    specialties: ['consulta', 'oftalmopediatria'],
    exams: [],
    conditions: ['olho-seco'],
    articles: [
      'procedimentos-plastica-ocular-taboao-da-serra',
      'tudo-o-que-voce-precisa-saber-sobre-plastica-ocular',
      'doencas-nas-palpebras',
      'avancos-na-cirurgia-de-plastica-ocular',
      'plastica-ocular-cuidados-pos-operatorio',
    ],
  },
  videoIds: ['dra-daniele-calazio', 'dra-daniele-excesso-de-pele', 'dra-daniele-palpebra-caida', 'dra-daniele-vias-lacrimais'],
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
    'TODO_CONTENT_VALIDATION: Dra. Danielle Longo aparece nos vídeos mas não tem perfil publicado; incluí-la em related.doctors quando o perfil for validado',
    'TODO_CONTENT_VALIDATION: confirmar com a Dra. Danielle quais condições e procedimentos de plástica ocular a CEMO realiza (ptose, órbita e tumores palpebrais além dos citados nos vídeos)',
    'TODO_CONTENT_VALIDATION: confirmar tipo de anestesia, local de realização das cirurgias e tempo de recuperação para citar na página',
    'TODO_CONTENT_VALIDATION: conferir os vídeos de plástica ocular com a transcrição revisada e ajustar as descrições de calázio, pálpebra caída e vias lacrimais ao que a Dra. Danielle disse',
    'TODO_CONTENT_VALIDATION: o site atual cita “preços acessíveis e parcelas”; a frase foi removida por conflito com a Resolução CFM nº 2.336/2023',
  ],
};
