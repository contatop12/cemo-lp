// Texto novo organizando a entidade; posts de baixa visão (KEEP) respondem perguntas específicas e são linkados.
import type { Condition } from '../../types';

export const baixaVisao: Condition = {
  id: 'baixa-visao',
  name: 'Baixa Visão',
  canonicalPath: '/condicoes-oculares/baixa-visao/',
  published: true,
  seo: {
    title: 'Baixa visão: o que é, causas e reabilitação',
    description:
      'Entenda o que é baixa visão, quais doenças podem causá-la, como é a avaliação e que recursos de reabilitação visual podem ajudar no dia a dia.',
  },
  h1: 'Baixa visão: o que é, causas e reabilitação',
  lead: 'Baixa visão é a perda de visão que não se resolve totalmente com óculos, lentes ou cirurgia e que interfere nas atividades do dia a dia. Há recursos e acompanhamento que ajudam a manter autonomia.',
  summary: 'Redução importante da visão que não é corrigida por óculos comuns, medicamentos ou cirurgia, com possibilidade de reabilitação.',
  answer: {
    question: 'O que é baixa visão?',
    text: 'Baixa visão é uma redução significativa da capacidade de enxergar que persiste mesmo com óculos, lentes de contato, tratamento clínico ou cirurgia, e que atrapalha atividades como ler, reconhecer rostos ou se locomover. Não é o mesmo que cegueira: a pessoa ainda tem visão útil. Pode ter várias causas e afeta de modo diferente cada pessoa. A avaliação oftalmológica define a causa, e recursos de reabilitação visual ajudam a aproveitar melhor a visão restante.',
  },
  signs: {
    title: 'Sinais que merecem atenção',
    intro:
      'Esses sinais podem estar associados a diferentes condições e precisam de avaliação oftalmológica. Eles não servem como diagnóstico.',
    items: [
      'Dificuldade para ler, mesmo com óculos atualizados',
      'Dificuldade para reconhecer rostos ou objetos',
      'Manchas, áreas escuras ou distorção no centro da visão',
      'Perda de campo de visão, como “túnel” ou áreas apagadas nas laterais',
      'Sensibilidade à luz ou ao ofuscamento',
      'Tropeços e dificuldade em ambientes com pouca luz',
    ],
  },
  sections: [
    {
      id: 'o-que-e',
      title: 'O que significa ter baixa visão?',
      paragraphs: [
        'A baixa visão é definida pela função visual, não por uma doença só. Considera-se que há baixa visão quando o paciente tem perda visual relevante mesmo depois de receber o melhor tratamento possível, e ainda mantém alguma visão útil.',
        'Ela pode afetar a nitidez, o campo de visão, o contraste ou a sensibilidade à luz. Em cada pessoa, o impacto no cotidiano é diferente.',
        'Quem tem visão em um olho só vive uma situação distinta, a visão monocular, que também tem artigo próprio no blog.',
      ],
    },
    {
      id: 'causas',
      title: 'Causas mais comuns',
      paragraphs: [
        'A baixa visão não é uma doença, e sim consequência de condições que afetam o olho ou as vias visuais. Entre as causas frequentes estão:',
      ],
      bullets: [
        'Degeneração macular, que afeta a visão central',
        'Glaucoma, que compromete o campo de visão',
        'Retinopatia diabética e outras doenças da retina',
        'Doenças da córnea e cicatrizes',
        'Condições hereditárias da retina e do nervo óptico',
        'Sequelas de traumas e de condições presentes desde o nascimento',
      ],
    },
    {
      id: 'diagnostico',
      title: 'Como é feita a avaliação?',
      paragraphs: [
        'O primeiro passo é identificar a causa. O oftalmologista avalia a acuidade visual, o campo de visão, a sensibilidade ao contraste e examina a retina e o nervo óptico, usando exames complementares quando necessário.',
        'Em seguida, é avaliada a funcionalidade: o que a pessoa consegue fazer no dia a dia e o que gostaria de recuperar, como ler, cozinhar ou usar o celular.',
      ],
    },
    {
      id: 'tratamento-e-reabilitacao',
      title: 'Tratamento e reabilitação visual',
      paragraphs: [
        'Tratar a doença de base é essencial, quando existe tratamento, para preservar a visão que resta. Isso pode envolver medicação, laser ou cirurgia, conforme a causa.',
        'Além disso, a reabilitação visual ajuda a aproveitar melhor a visão remanescente. Em termos gerais, ela pode incluir:',
      ],
      bullets: [
        'Auxílios ópticos, como lupas e lentes de aumento',
        'Auxílios não ópticos, como boa iluminação, contraste e letras ampliadas',
        'Recursos eletrônicos, como lupas digitais e leitores de tela no celular',
        'Orientação de adaptação da casa e de mobilidade',
        'Apoio de outros profissionais, como terapeutas ocupacionais e psicólogos',
      ],
    },
    {
      id: 'convivencia',
      title: 'Convivência no dia a dia',
      paragraphs: [
        'Receber o diagnóstico de baixa visão pode trazer insegurança. É comum que a pessoa leve um tempo para se adaptar, e conversar com a equipe sobre as dificuldades reais do cotidiano ajuda a escolher onde focar.',
        'Pequenas adaptações fazem diferença: iluminação direcionada, bom contraste entre objetos e fundo, organização dos espaços e uso de tecnologia assistiva.',
        'O apoio da família e o acompanhamento regular ajudam a manter independência e bem-estar emocional, que também fazem parte do cuidado.',
      ],
    },
    {
      id: 'quando-procurar',
      title: 'Quando procurar o oftalmologista?',
      paragraphs: [
        'Procure avaliação se notar piora gradual da visão, dificuldade que não melhora com óculos, manchas ou distorção no centro da visão. Pessoas com diabetes, glaucoma ou histórico familiar de doenças da retina devem manter consultas regulares.',
        'Em crianças, a baixa visão pode passar despercebida; alterações no comportamento visual, como aproximar demais objetos, merecem avaliação.',
        'Perda súbita de visão, clarões de luz ou sombra no campo de visão exigem atendimento oftalmológico com urgência.',
      ],
    },
  ],
  faq: [
    {
      question: 'Baixa visão é a mesma coisa que cegueira?',
      answer: [
        'Não. Na baixa visão a pessoa ainda tem visão útil, que pode ser aproveitada com recursos e treinamento. A avaliação do oftalmologista esclarece o caso de cada um.',
      ],
    },
    {
      question: 'Óculos resolvem a baixa visão?',
      answer: [
        'Em geral, não totalmente. O grau pode e deve ser atualizado, mas por definição a baixa visão persiste mesmo com a melhor correção. Recursos específicos, como lupas e lentes de aumento, podem ajudar.',
      ],
    },
    {
      question: 'A baixa visão é comum na terceira idade?',
      answer: [
        'Sim, porque doenças como a degeneração macular, o glaucoma e a catarata se tornam mais frequentes com a idade. Algumas têm tratamento, e por isso o acompanhamento regular é recomendado.',
      ],
    },
    {
      question: 'Quem tem baixa visão pode ler e usar o celular?',
      answer: [
        'Muitas pessoas conseguem, com auxílio de recursos como ampliação de letra, contraste e lupas digitais. O resultado varia conforme a causa e o grau, e a orientação é individual.',
      ],
    },
  ],
  related: {
    doctors: ['adriano-de-morais-ferreira', 'roberta-andrade-e-nascimento', 'jose-pereira-do-rego-neto'],
    specialties: ['retina', 'glaucoma', 'consulta'],
    exams: [],
    conditions: ['degeneracao-macular'],
    articles: [
      'fatos-sobre-a-baixa-visao',
      'recursos-opticos-para-baixa-visao-cemo',
      'vivendo-com-baixa-visao',
      'baixa-visao-na-terceira-idade',
      'tudo-o-que-voce-precisa-saber-sobre-visao-monocular',
    ],
  },
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
    'TODO_CONTENT_VALIDATION: confirmar se a CEMO oferece avaliação e prescrição de recursos de reabilitação visual (lupas, auxílios ópticos) ou encaminha a outros serviços',
  ],
};
