// Página atual /exames/lentes/ (adaptação de lentes, vira 301 para esta) + posts KEEP do blog sobre lentes de contato.
import type { Specialty } from '../../types';

export const lentesDeContato: Specialty = {
  id: 'lentes-de-contato',
  kind: 'servico',
  name: 'Lentes de Contato',
  shortName: 'Lentes de contato',
  canonicalPath: '/especialidades/lentes-de-contato/',
  published: true,
  seo: {
    title: 'Adaptação de lentes de contato em Taboão da Serra',
    description:
      'Como é a adaptação de lentes de contato, que tipos existem e quais cuidados evitam problemas. Agende sua avaliação com o oftalmologista no CEMO.',
  },
  h1: 'Adaptação de lentes de contato em Taboão da Serra',
  lead: 'A lente de contato é um dispositivo médico que precisa de indicação e acompanhamento. Na adaptação, o oftalmologista escolhe o tipo e o modelo mais adequados aos seus olhos e ensina a usar e a cuidar com segurança.',
  summary: 'Avaliação e adaptação de lentes de contato, com orientação sobre uso, higiene e acompanhamento.',
  leadInterest: 'lentes-de-contato',
  ctaLabel: 'Agendar adaptação de lentes',
  answer: {
    question: 'Como funciona a adaptação de lentes de contato?',
    text: 'A adaptação é a consulta em que o oftalmologista avalia seus olhos, mede o grau e a curvatura da córnea, escolhe o tipo de lente e testa o modelo no olho. Você aprende a colocar, retirar e cuidar da lente, e retorna para conferir conforto e saúde ocular. Lente de contato não é um produto de prateleira: o tipo e o modelo são indicados caso a caso.',
  },
  sections: [
    {
      id: 'para-quem',
      title: 'Para quem a lente de contato é indicada?',
      paragraphs: [
        'Ela pode ser uma opção para quem tem miopia, hipermetropia, astigmatismo ou presbiopia (vista cansada) e prefere não usar óculos o tempo todo, ou precisa dela por motivo médico, como em alguns casos de ceratocone, quando o óculos não corrige bem a visão.',
        'Nem todos os olhos se adaptam bem. Olho seco importante, alergias, infecções e certas alterações da superfície do olho podem contraindicar ou limitar o uso. A decisão é do oftalmologista, depois da avaliação.',
      ],
    },
    {
      id: 'como-e-adaptacao',
      title: 'Como é a adaptação na CEMO?',
      paragraphs: [
        'Segundo a página atual da clínica, o teste e a adaptação de lentes é feito sem dilatar as pupilas: o médico coloca e retira lentes de teste nos olhos do paciente para avaliar como cada modelo se comporta. Os detalhes do passo a passo são conduzidos pelo oftalmologista na consulta.',
        'Antes de definir a lente, o médico pode pedir exames, como o de topografia de córnea (ceratoscopia), que mapeia a curvatura da superfície do olho. Isso é especialmente importante em córneas irregulares.',
      ],
    },
    {
      id: 'cuidados',
      title: 'Cuidados e higiene no dia a dia',
      paragraphs: [
        'A maior parte dos problemas com lentes de contato vem de hábitos de uso. Os cuidados abaixo são gerais e valem como lembrete, mas a orientação do seu oftalmologista e do fabricante sempre prevalece.',
      ],
      bullets: [
        'Lave e seque bem as mãos antes de manusear as lentes',
        'Use apenas a solução indicada pelo médico, nunca água, soro fisiológico ou saliva',
        'Troque a solução do estojo todos os dias e troque o estojo com regularidade',
        'Respeite o prazo de descarte da lente: diária, semanal, mensal ou anual',
        'Não durma com as lentes, a menos que o médico tenha indicado',
        'Não empreste nem use lentes de outra pessoa',
        'Retire a lente se sentir desconforto e procure o médico se ele persistir',
        'Mantenha as consultas de retorno, mesmo sem sintomas',
      ],
    },
    {
      id: 'sinais-de-alerta',
      title: 'Sinais de alerta: quando tirar a lente e procurar o médico',
      paragraphs: [
        'Olho vermelho, dor, sensibilidade intensa à luz, lacrimejamento, secreção ou visão embaçada que não passa depois de retirar a lente podem estar associados a irritações ou infecções da córnea e precisam de avaliação oftalmológica. Não volte a usar a lente e não espere melhorar sozinho.',
      ],
    },
  ],
  options: {
    title: 'Quais são os tipos de lentes de contato?',
    intro: 'Em termos gerais, as lentes se diferenciam pelo material e pela função. O oftalmologista indica o tipo conforme o seu caso.',
    items: [
      {
        name: 'Gelatinosas (hidrogel e silicone-hidrogel)',
        text: 'São flexíveis e costumam ser mais confortáveis na adaptação. São as mais usadas para miopia, hipermetropia e astigmatismo leve. Existem as de uso diário, semanal, mensal ou anual.',
      },
      {
        name: 'Rígidas (gás permeável)',
        text: 'São firmes e permitem a passagem de oxigênio. Podem ser indicadas em graus mais altos e em córneas irregulares, como no ceratocone, mas a adaptação costuma levar mais tempo.',
      },
      {
        name: 'Tóricas',
        text: 'Têm curvaturas diferentes em cada direção para corrigir o astigmatismo. Podem ser gelatinosas ou rígidas.',
      },
      {
        name: 'Multifocais',
        text: 'Corrigem mais de uma distância na mesma lente e são indicadas para presbiopia. A adaptação exige avaliação cuidadosa e a visão pode ser diferente da dos óculos.',
      },
      {
        name: 'Lentes especiais para ceratocone',
        text: 'Quando a córnea está irregular, o oftalmologista pode indicar lentes rígidas ou combinações específicas, escolhidas após estudo da curvatura da córnea.',
      },
      {
        name: 'Terapêuticas e estéticas',
        text: 'As terapêuticas são usadas sob orientação médica como curativo, por exemplo, após alguns procedimentos. As coloridas ou estéticas também precisam de avaliação, porque não são inofensivas.',
      },
    ],
    note: 'A lista mostra os tipos existentes de forma geral. A disponibilidade de cada um na CEMO é confirmada no agendamento.',
  },
  journey: {
    title: 'Passo a passo da adaptação',
    steps: [
      { title: 'Consulta e exames', text: 'O médico avalia seus olhos, o grau e a superfície da córnea.' },
      { title: 'Escolha e teste da lente', text: 'Lentes de teste são colocadas e retiradas para avaliar conforto e visão.' },
      { title: 'Orientação de uso', text: 'Você aprende a colocar, retirar e cuidar das lentes e recebe as orientações de higiene.' },
      { title: 'Retorno', text: 'O oftalmologista confere como o olho respondeu e ajusta o que for necessário.' },
    ],
  },
  faq: [
    {
      question: 'Posso comprar lente de contato sem receita?',
      answer: [
        'Não é recomendado. A lente fica em contato direto com a córnea, e o modelo errado pode causar desconforto, lesões e infecções. A indicação deve vir de uma avaliação oftalmológica.',
      ],
    },
    {
      question: 'Qual o prazo para descartar a lente?',
      answer: [
        'Depende do tipo: diárias são descartadas após o uso, e as semanais, mensais e anuais têm prazo contado a partir da abertura da embalagem. Respeitar esse prazo é essencial para a saúde dos olhos.',
        'No blog, há um artigo completo sobre o prazo para descartar lente de contato.',
      ],
    },
    {
      question: 'Quem tem astigmatismo pode usar lente?',
      answer: [
        'Em muitos casos, sim. Existem lentes tóricas, desenvolvidas para o astigmatismo. A avaliação define se são adequadas.',
      ],
    },
    {
      question: 'Quem tem ceratocone pode usar lente de contato?',
      answer: [
        'Muitas pessoas com ceratocone usam lentes de contato quando o óculos não corrige bem a visão. Existem modelos específicos para córneas irregulares, e a escolha depende do estudo da córnea feito pelo oftalmologista.',
      ],
    },
    {
      question: 'Posso dormir com a lente de contato?',
      answer: [
        'Em geral, não. Dormir com a lente aumenta o risco de infecção, a menos que ela seja indicada especificamente para uso prolongado e o médico autorize.',
      ],
    },
  ],
  related: {
    doctors: ['david-ribeiro-de-mendonca-filho'],
    specialties: ['consulta', 'cornea', 'refrativa'],
    exams: ['ceratoscopia'],
    conditions: ['ceratocone', 'miopia', 'astigmatismo', 'hipermetropia', 'presbiopia'],
    articles: [
      'prazo-para-descartar-lente-de-contato',
      'tipos-de-lentes-de-contato',
      'oculos-vs-lentes-de-contato',
      'lentes-de-contato-o-que-voce-sabe-sobre-elas',
      'lente-de-contato-miopia',
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
    'TODO_CONTENT_VALIDATION: confirmar quais tipos de lentes a CEMO adapta (gelatinosas, rígidas, tóricas, multifocais, lentes para ceratocone, terapêuticas)',
    'TODO_CONTENT_VALIDATION: nenhum médico do corpo clínico publicado tem lentes de contato como área; Dr. David listado pela córnea e ceratocone, confirmar quem faz a adaptação',
    'TODO_CONTENT_VALIDATION: confirmar duração da consulta de adaptação e se há retorno incluído',
    'TODO_CONTENT_VALIDATION: o site atual cita “preços acessíveis e parcelas”; a frase foi removida por conflito com a Resolução CFM nº 2.336/2023',
  ],
};
