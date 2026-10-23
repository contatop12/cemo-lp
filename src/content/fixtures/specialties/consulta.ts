// Conteúdo novo para /consulta-oftalmologica/ (sem página equivalente no site atual), com foco em intenção sem cidade.
import type { Specialty } from '../../types';

export const consulta: Specialty = {
  id: 'consulta',
  kind: 'consulta',
  name: 'Consulta Oftalmológica',
  shortName: 'Consulta oftalmológica',
  canonicalPath: '/consulta-oftalmologica/',
  published: true,
  seo: {
    title: 'Consulta oftalmológica: como é e quando fazer',
    description:
      'Saiba o que é avaliado na consulta oftalmológica, de quanto em quanto tempo ir, como se preparar e por que a dilatação da pupila pede um acompanhante.',
  },
  h1: 'Consulta oftalmológica: como é e quando fazer',
  lead: 'Ir ao oftalmologista não é só para trocar o grau dos óculos. A consulta avalia a saúde do olho como um todo e pode identificar problemas antes de aparecerem sintomas. Veja como ela acontece.',
  summary: 'O que é avaliado na consulta oftalmológica, quando fazer e como se preparar.',
  leadInterest: 'consulta',
  ctaLabel: 'Agendar consulta',
  answer: {
    question: 'O que acontece na consulta oftalmológica?',
    text: 'Na consulta, o oftalmologista conversa sobre sua saúde e queixas, mede a acuidade visual e o grau, verifica a pressão do olho e examina a parte da frente e o fundo do olho. Em muitos casos a pupila é dilatada com colírio para ver a retina. Se houver necessidade, ele pede exames complementares. A frequência com que você deve voltar é definida pelo oftalmologista.',
  },
  signs: {
    title: 'Sinais que não devem ser adiados',
    intro:
      'Esses sinais podem estar associados a diferentes condições e precisam de avaliação oftalmológica. Não espere a consulta de rotina se notar:',
    items: [
      'Visão embaçada, dupla ou distorcida',
      'Dor, vermelhidão ou sensibilidade à luz persistentes',
      'Flashes de luz, aumento súbito de moscas volantes ou sombra no campo de visão (procure atendimento imediato)',
      'Dor de cabeça frequente ao ler ou usar telas',
      'Dificuldade para enxergar de perto ou de longe que antes não existia',
      'Criança que se aproxima demais da tela ou do livro, pisca muito ou franze a testa para enxergar',
    ],
  },
  sections: [
    {
      id: 'o-que-avalia',
      title: 'O que o oftalmologista avalia na consulta?',
      paragraphs: [
        'A consulta começa com uma conversa: queixas, histórico familiar, doenças como diabetes e hipertensão, e medicamentos em uso. Em seguida vêm os exames básicos de cada etapa, que podem variar conforme a sua idade e as suas queixas.',
      ],
      bullets: [
        'Acuidade visual: o quanto você enxerga de longe e de perto, com e sem correção',
        'Refração: determina o grau, ou seja, se há miopia, hipermetropia, astigmatismo ou presbiopia',
        'Pressão intraocular: importante para identificar o risco de glaucoma',
        'Biomicroscopia: exame com um microscópio de lâmpada de fenda que observa pálpebras, córnea, íris e cristalino',
        'Fundo de olho: exame da retina e do nervo óptico, geralmente com a pupila dilatada',
      ],
    },
    {
      id: 'frequencia',
      title: 'Com que frequência devo ir ao oftalmologista?',
      paragraphs: [
        'A frequência é definida pelo oftalmologista, porque depende da idade, do grau, de doenças como diabetes e do histórico da família. Em termos gerais, ela costuma ser maior nos extremos da vida e para quem tem fatores de risco.',
        'Crianças devem ser avaliadas desde cedo, já que muitos problemas de visão não são percebidos por elas. Adultos sem queixas se beneficiam de consultas periódicas, e a partir dos 40 anos aumentam a importância do exame da pressão ocular e do fundo de olho. Quem usa óculos ou lentes de contato, tem diabetes ou histórico familiar de doenças oculares tende a precisar de retornos mais regulares.',
      ],
    },
    {
      id: 'preparo',
      title: 'Como me preparar para a consulta?',
      paragraphs: [
        'Algumas providências ajudam o oftalmologista a avaliar com mais detalhe e tornam a consulta mais tranquila.',
      ],
      bullets: [
        'Leve os óculos e as lentes de contato que você usa hoje',
        'Leve receitas e exames oftalmológicos anteriores',
        'Faça uma lista dos medicamentos que usa e das doenças que tem',
        'Anote as queixas e as dúvidas que quer esclarecer',
        'Se usa lentes de contato, pergunte se deve tirá-las antes do exame',
      ],
    },
    {
      id: 'dilatacao',
      title: 'A dilatação da pupila atrapalha a visão?',
      paragraphs: [
        'Para examinar a retina e o nervo óptico, o oftalmologista pode usar colírios que dilatam a pupila. Depois do exame, a visão de perto pode ficar embaçada e a sensibilidade à luz aumenta por algumas horas.',
        'Por isso, quando houver dilatação, é recomendável ir acompanhado e evitar dirigir logo depois. Óculos escuros ajudam a lidar com a claridade.',
      ],
    },
    {
      id: 'na-cemo',
      title: 'Por que fazer a consulta e os exames no mesmo lugar?',
      paragraphs: [
        'A CEMO reúne as especialidades da oftalmologia em um só lugar. O paciente passa na avaliação já com o especialista da área e faz os exames no mesmo dia, sem precisar voltar em outras datas.',
        'Se na consulta o oftalmologista identifica a necessidade de um exame complementar ou de uma avaliação mais específica, o caminho é mais direto para quem já está na clínica.',
      ],
    },
  ],
  journey: {
    title: 'Como é a consulta, passo a passo',
    intro: 'A sequência pode mudar conforme a sua idade e as suas queixas, mas costuma seguir estas etapas.',
    steps: [
      {
        title: 'Agendamento e chegada',
        text: 'Você agenda a consulta e informa o motivo e se tem convênio. Na chegada, a recepção confirma seus dados e registra suas queixas.',
      },
      {
        title: 'Conversa inicial',
        text: 'O atendimento começa com perguntas sobre sua visão, sua saúde geral, medicamentos em uso e histórico da família.',
      },
      {
        title: 'Medida da visão e do grau',
        text: 'São avaliadas a acuidade visual e a refração, para saber se há necessidade de óculos ou de ajuste do grau.',
      },
      {
        title: 'Pressão e exame do olho',
        text: 'Mede-se a pressão intraocular, e o oftalmologista examina a parte da frente do olho na lâmpada de fenda.',
      },
      {
        title: 'Dilatação e fundo de olho',
        text: 'Quando indicado, a pupila é dilatada com colírio para examinar a retina e o nervo óptico.',
      },
      {
        title: 'Orientações e próximos passos',
        text: 'O oftalmologista explica os achados, indica óculos, tratamento ou exames complementares e combina o retorno.',
      },
    ],
  },
  faq: [
    {
      question: 'Exame de vista e consulta oftalmológica são a mesma coisa?',
      answer: [
        'O exame de vista costuma se referir à medida do grau. A consulta oftalmológica é mais ampla: além do grau, avalia a pressão do olho, a córnea, o cristalino, a retina e o nervo óptico, e pode identificar doenças que não dão sintomas.',
      ],
    },
    {
      question: 'Quanto tempo dura a consulta?',
      answer: [
        'Varia conforme as queixas e se há necessidade de dilatar a pupila ou fazer exames complementares. A equipe informa uma estimativa no momento do agendamento.',
      ],
    },
    {
      question: 'Quem não tem queixas precisa ir ao oftalmologista?',
      answer: [
        'Sim, em termos gerais. Doenças como o glaucoma e alterações da retina podem não dar sintomas no início. A frequência das consultas sem queixas é definida pelo oftalmologista.',
      ],
    },
    {
      question: 'Meu filho precisa de consulta antes de entrar na escola?',
      answer: [
        'A avaliação oftalmológica na infância é importante, porque a criança nem sempre percebe que enxerga mal. O oftalmologista indica o momento adequado e a frequência dos retornos.',
      ],
    },
  ],
  related: {
    doctors: [
      'david-ribeiro-de-mendonca-filho',
      'roberta-andrade-e-nascimento',
      'adriana-bizzarri',
      'adriano-de-morais-ferreira',
    ],
    specialties: ['catarata', 'glaucoma', 'retina', 'oftalmopediatria'],
    exams: ['tonometria', 'mapeamento-de-retina'],
    conditions: ['presbiopia', 'miopia'],
    articles: [
      'problemas-de-visao-mais-comuns',
      'revisao-oftalmologica-por-que-e-importante-comecar-o-ano-com-uma-consulta-ao-oftalmologista',
      'cuidados-com-a-saude-ocular-dicas-do-cemo',
      'impacto-das-telas-saude-ocular',
      'criancas-e-saude-ocular-sinais-de-alerta-para-pais',
    ],
  },
  videoIds: ['tudo-em-um-lugar-so'],
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
    'TODO_CONTENT_VALIDATION: confirmar a sequência real da consulta na CEMO (ordem das etapas, quem faz a refração e a pré-consulta)',
    'TODO_CONTENT_VALIDATION: confirmar duração média da consulta e se a dilatação é de rotina na clínica',
    'TODO_CONTENT_VALIDATION: confirmar atendimento por convênio e orientações sobre lentes de contato antes do exame',
    'TODO_CONTENT_VALIDATION: confirmar faixa etária atendida (consulta pediátrica) e orientação de frequência por idade com o corpo clínico',
    'TODO_CONTENT_VALIDATION: monitorar a posição de “oftalmologista taboão da serra” na Home após a publicação (anti-canibalização, IA §8)',
  ],
};
