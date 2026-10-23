// Conteúdo consolidado de: página atual /especialidades/glaucoma/ e posts tudo-sobre-glaucoma,
// entendendo-o-glaucoma-causas-sintomas-e-tratamentos e glaucoma-como-e-feito-o-tratamento (reescritos).
import type { Specialty } from '../../types';

export const glaucoma: Specialty = {
  id: 'glaucoma',
  kind: 'especialidade',
  name: 'Glaucoma',
  shortName: 'Glaucoma',
  canonicalPath: '/especialidades/glaucoma/',
  published: true,
  seo: {
    title: 'Glaucoma: diagnóstico e tratamento em Taboão',
    description:
      'Entenda o que é o glaucoma, por que ele costuma não dar sintomas no início, quais exames fazem o diagnóstico e como é o tratamento e o acompanhamento.',
  },
  h1: 'Glaucoma: diagnóstico e tratamento em Taboão da Serra',
  lead: 'O glaucoma é uma doença crônica do nervo óptico que, na maioria dos casos, avança em silêncio. Aqui você entende como ele é investigado, tratado e acompanhado, e por que a consulta de rotina faz diferença.',
  summary: 'Diagnóstico, tratamento e acompanhamento contínuo do glaucoma, com exames e especialista no mesmo lugar.',
  leadInterest: 'glaucoma',
  ctaLabel: 'Agendar avaliação de glaucoma',
  answer: {
    question: 'O que é glaucoma e como é tratado?',
    text: 'Glaucoma é um grupo de doenças que lesionam o nervo óptico, o cabo que leva a imagem do olho ao cérebro, geralmente associadas a uma pressão intraocular que o nervo não suporta. A lesão é irreversível, mas pode ser controlada. O tratamento é definido pelo oftalmologista conforme o tipo e a fase da doença e inclui colírios, laser e, quando indicada, cirurgia. Como o glaucoma é crônico, o acompanhamento é contínuo.',
  },
  signs: {
    title: 'Quando procurar um oftalmologista',
    intro:
      'Na maioria dos casos o glaucoma não causa sintomas no início. Por isso, a avaliação periódica importa mais do que esperar um sinal. Procure atendimento se notar:',
    items: [
      'Manchas escuras ou áreas que “somem” no campo de visão',
      'Perda da visão lateral, como se estivesse olhando por um tubo',
      'Dor forte e súbita em um olho, com olho vermelho, visão embaçada, náusea ou vômito',
      'Histórico de glaucoma na família e nenhuma avaliação recente',
    ],
  },
  sections: [
    {
      id: 'o-que-e',
      title: 'O que é o glaucoma?',
      paragraphs: [
        'O glaucoma é uma doença que danifica progressivamente o nervo óptico, a estrutura que leva as imagens captadas pela retina até o cérebro. Quando as fibras desse nervo se perdem, partes do campo de visão deixam de ser percebidas.',
        'Em muitos casos o dano está ligado à pressão intraocular, que depende do equilíbrio entre a produção e a drenagem do humor aquoso, o líquido transparente que nutre estruturas da parte da frente do olho. Quando a drenagem não acompanha a produção, a pressão pode subir. Há também pessoas que desenvolvem glaucoma com pressão dentro dos valores habituais, por isso o diagnóstico nunca depende de um único número.',
        'Existem diferentes tipos. O de ângulo aberto é o mais frequente e costuma ser lento. O de ângulo fechado pode evoluir mais depressa e, em crises, causar dor intensa. O congênito está presente desde o nascimento, e o secundário decorre de outras condições, como traumas, inflamações e uso de certos medicamentos.',
      ],
    },
    {
      id: 'fatores-de-risco',
      title: 'Quem tem mais risco de desenvolver glaucoma?',
      paragraphs: [
        'O glaucoma pode surgir em qualquer idade, mas se torna mais comum a partir dos 40 anos. Alguns fatores aumentam a chance de a doença aparecer, e quem os reconhece deve conversar com o oftalmologista sobre a frequência dos exames.',
      ],
      bullets: [
        'Histórico de glaucoma em familiares próximos',
        'Idade mais avançada',
        'Pressão intraocular elevada',
        'Diabetes',
        'Traumas oculares e uso prolongado de alguns medicamentos, como corticoides',
        'Miopia alta',
      ],
    },
    {
      id: 'sem-sintomas',
      title: 'Por que o glaucoma costuma não dar sintomas no início?',
      paragraphs: [
        'Na forma mais comum, a perda de visão começa pelas laterais, o que é chamado de visão periférica. O cérebro compensa as falhas, e o outro olho ajuda a preencher o que está faltando. Por isso a pessoa pode demorar a perceber que algo mudou.',
        'Quando surgem sintomas claros, como manchas no campo de visão ou sensação de enxergar por um túnel, a doença costuma estar em fase mais avançada. A visão já perdida não volta, mas o tratamento pode frear a evolução. É por isso que o diagnóstico precoce é o principal aliado de quem tem glaucoma.',
        'No glaucoma de ângulo fechado, as crises podem causar dor forte e súbita, olho vermelho, visão embaçada, náusea e vômito. Esses sinais podem estar associados a diferentes condições e precisam de avaliação oftalmológica imediata.',
      ],
    },
    {
      id: 'diagnostico',
      title: 'Como é feito o diagnóstico: quais exames avaliam o glaucoma?',
      paragraphs: [
        'O diagnóstico combina a conversa sobre seu histórico, o exame clínico do olho e exames complementares. Nenhum deles decide sozinho: o oftalmologista cruza os resultados e acompanha a evolução ao longo do tempo. Os exames mais usados são:',
      ],
      bullets: [
        'Tonometria: mede a pressão intraocular',
        'Curva tensional diária: mede a pressão em horários diferentes do dia, para ver como ela varia',
        'Gonioscopia: observa o ângulo de drenagem do olho e ajuda a distinguir o tipo de glaucoma',
        'Estereofoto de papila: registra o nervo óptico em imagens para comparar ao longo do tempo',
        'Tomografia de coerência óptica (OCT): analisa as camadas do nervo óptico e da retina',
        'Campo visual: mapeia a visão central e a periférica e mostra falhas que o paciente ainda não percebe',
        'Paquimetria: mede a espessura da córnea, que influencia a leitura da pressão',
      ],
    },
    {
      id: 'tratamento',
      title: 'Como é o tratamento do glaucoma?',
      paragraphs: [
        'O objetivo do tratamento é controlar a evolução da doença, em geral reduzindo a pressão intraocular. O que funciona para uma pessoa pode não servir para outra: a escolha depende do tipo de glaucoma, da fase, dos exames e do seu estado geral de saúde.',
        'O tratamento costuma começar com colírios, que reduzem a produção do líquido do olho ou facilitam a sua drenagem. Eles precisam ser usados todos os dias, nos horários combinados, mesmo sem sintomas. Em alguns casos o oftalmologista indica medicamentos por via oral, em geral por períodos curtos.',
        'O laser é uma das possibilidades de tratamento, e a CEMO realiza tratamento de glaucoma com laser quando há indicação. Quando colírios e laser não bastam, ou conforme o tipo de glaucoma, a cirurgia pode ser indicada para criar ou melhorar um caminho de drenagem.',
        'No caso da cirurgia, o tempo de recuperação varia de pessoa para pessoa e as orientações do pós-operatório são individuais. Seguir as consultas de retorno faz parte do tratamento.',
      ],
    },
    {
      id: 'acompanhamento',
      title: 'Por que o acompanhamento é para a vida toda?',
      paragraphs: [
        'O glaucoma é uma doença crônica: o tratamento controla, mas não elimina a condição. Interromper os colírios ou faltar às consultas pode permitir que a doença volte a avançar sem que você perceba.',
        'Nas consultas de retorno, o oftalmologista repete exames como tonometria, campo visual e OCT e compara com os anteriores. Isso permite ajustar o tratamento antes que a visão seja afetada. A frequência desses retornos é definida caso a caso.',
        'Se você tem familiares com glaucoma ou algum dos fatores de risco, vale conversar com o oftalmologista sobre a rotina de exames, mesmo que enxergue bem.',
      ],
    },
    {
      id: 'na-cemo',
      title: 'Como é o atendimento de glaucoma na CEMO?',
      paragraphs: [
        'A CEMO reúne as especialidades da oftalmologia em um só lugar. Na avaliação, o paciente já é atendido pelo especialista da área e faz os exames no mesmo dia, sem precisar voltar em outras datas. Para o glaucoma, a clínica realiza exames como o campo visual e o tratamento com laser.',
        'O atendimento de glaucoma conta com a Dra. Roberta Andrade e Nascimento, que atua em glaucoma clínico e cirúrgico. A clínica fica no Centro de Taboão da Serra.',
      ],
    },
  ],
  faq: [
    {
      question: 'Glaucoma tem cura?',
      answer: [
        'O glaucoma não tem cura, mas tem controle. A visão já perdida não é recuperada, e por isso o tratamento busca frear a progressão da doença e preservar a visão que a pessoa ainda tem.',
      ],
    },
    {
      question: 'Quem tem pressão ocular normal pode ter glaucoma?',
      answer: [
        'Pode. Existem pessoas com glaucoma e pressão intraocular dentro dos valores habituais. Por isso o diagnóstico considera o nervo óptico, o campo visual e outros exames, e não apenas a medida da pressão.',
      ],
    },
    {
      question: 'Preciso usar colírio para sempre?',
      answer: [
        'Em muitos casos, sim. Como o glaucoma é crônico, o tratamento costuma ser contínuo. Nunca suspenda ou troque o colírio por conta própria: o oftalmologista é quem ajusta o tratamento conforme os exames de acompanhamento.',
      ],
    },
    {
      question: 'Quando a cirurgia de glaucoma é indicada?',
      answer: [
        'Quando a pressão não é controlada com colírios e laser, quando a doença continua avançando ou conforme o tipo de glaucoma. A decisão é individual e tomada após avaliação e exames.',
      ],
    },
    {
      question: 'A partir de que idade devo fazer exames para glaucoma?',
      answer: [
        'Em termos gerais, a avaliação se torna mais importante a partir dos 40 anos, ou antes se houver histórico familiar, diabetes ou outros fatores de risco. A frequência ideal é definida pelo oftalmologista.',
      ],
    },
  ],
  related: {
    doctors: ['roberta-andrade-e-nascimento', 'igor-seidi-sekiguchi'],
    specialties: ['consulta', 'catarata'],
    exams: [
      'tonometria',
      'campo-visual',
      'gonioscopia',
      'curva-tensional-diaria',
      'estereofoto-de-papila',
      'tomografia-de-coerencia-optica',
      'paquimetria',
    ],
    conditions: [],
    articles: [
      'os-principais-sintomas-do-glaucoma',
      'tipos-de-glaucoma',
      'as-principais-causas-do-glaucoma',
      'quando-operar-o-glaucoma',
      'como-e-feita-a-cirurgia-de-glaucoma',
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
    'TODO_CONTENT_VALIDATION: confirmar quais exames de glaucoma a CEMO realiza no local (tonometria, curva tensional diária, gonioscopia, estereofoto de papila, OCT, paquimetria); só campo visual, OCT e YAG laser constam em vídeo',
    'TODO_CONTENT_VALIDATION: confirmar quais tipos de laser a CEMO realiza no glaucoma (o vídeo cita apenas YAG laser)',
    'TODO_CONTENT_VALIDATION: confirmar quais cirurgias de glaucoma a CEMO realiza e se há tempo de recuperação padrão a informar (o site antigo citava “em média quatro semanas”, sem fonte)',
    'TODO_CONTENT_VALIDATION: confirmar com a Dra. Roberta a descrição de sua atuação e a idade sugerida para início dos exames',
  ],
};
