// Página nova: exame citado pelo Dr. David no vídeo "Exames que realizamos"; ausente do site atual. Texto com conhecimento médico geral conservador.
import type { Exam } from '../../types';

export const tomografiaDeCoerenciaOptica: Exam = {
  id: 'tomografia-de-coerencia-optica',
  name: 'Tomografia de Coerência Óptica (OCT)',
  aka: ['OCT', 'Tomografia de coerência óptica', 'Tomografia de retina', 'OCT de mácula', 'OCT de nervo óptico'],
  canonicalPath: '/exames/tomografia-de-coerencia-optica/',
  published: true,
  seo: {
    title: 'OCT: tomografia de coerência óptica, como funciona',
    description:
      'Entenda o que é a tomografia de coerência óptica (OCT), para que serve na retina e no glaucoma, como é feita e como se preparar. Taboão da Serra.',
  },
  h1: 'Tomografia de Coerência Óptica (OCT): o que é e para que serve',
  lead: 'O OCT é um exame de imagem que mostra, em cortes, as camadas do olho, como a retina e o nervo óptico. A CEMO realiza a tomografia de coerência óptica em Taboão da Serra. Veja como funciona e quando é pedida.',
  summary: 'Exame de imagem em cortes da retina e do nervo óptico, usado em doenças da retina e no glaucoma.',
  answer: {
    question: 'O que é a tomografia de coerência óptica (OCT)?',
    text: 'A tomografia de coerência óptica, conhecida como OCT, é um exame de imagem que usa luz para produzir cortes detalhados do olho, sem tocá-lo. Ela mostra as camadas da retina, da mácula e do nervo óptico, entre outras estruturas. O oftalmologista usa o exame para investigar e acompanhar doenças da retina e o glaucoma.',
  },
  purpose: [
    'O OCT funciona de modo parecido com um ultrassom, mas usa luz em vez de som. O aparelho monta imagens em corte, que permitem ver a espessura e a organização das camadas do olho.',
    'Na retina, o exame ajuda a avaliar a mácula, a região responsável pela visão central. Ele pode mostrar alterações como inchaço, líquido ou afinamento, que aparecem em doenças como a degeneração macular e as alterações causadas pelo diabetes.',
    'No glaucoma, o OCT mede a espessura das fibras do nervo óptico, que é uma forma de acompanhar se há perda ao longo do tempo. Ele complementa a avaliação do nervo, o campo visual e a pressão.',
    'Alguns aparelhos têm módulos para o segmento anterior, a parte da frente do olho, o que ajuda na avaliação da córnea e do ângulo.',
    'O resultado nunca é lido isoladamente: o médico o interpreta junto com o restante do exame.',
  ],
  whenRequested: [
    'O oftalmologista pode pedir o OCT quando há queixa de visão embaçada ou distorcida no centro da visão, para investigar a mácula, ou quando há suspeita ou acompanhamento de doenças da retina, como a degeneração macular.',
    'No glaucoma, o exame é usado para avaliar e acompanhar o nervo óptico. Pessoas com diabetes também podem fazer o OCT para acompanhar a retina, conforme a indicação médica.',
    'Esses sinais, sozinhos, podem estar associados a diferentes condições e precisam de avaliação oftalmológica. O exame é pedido pelo médico depois da consulta.',
  ],
  howDone: [
    'Você senta diante do aparelho, apoia o queixo e a testa e olha para uma luz fixa. O equipamento escaneia o olho por alguns segundos, sem contato.',
    'Algumas pessoas precisam ter a pupila dilatada com colírio para as imagens saírem nítidas. Nesse caso, o técnico pinga o colírio e aguarda o efeito.',
    'É importante manter o olhar na luz e piscar normalmente. O exame é feito em um olho de cada vez, e pode ser repetido se a imagem sair com qualidade ruim.',
  ],
  preparation: [
    'Em geral, o OCT não exige jejum. Se o médico ou a clínica avisarem que haverá dilatação, vale vir acompanhado e evitar dirigir logo depois. Traga óculos escuros.',
    'Leve exames anteriores, para comparação, a lista de remédios e colírios e os óculos que você usa.',
    'Avise se tem alergia a colírios, glaucoma de ângulo estreito ou qualquer condição que o médico precise saber antes da dilatação.',
  ],
  duration: [
    'A captura das imagens leva poucos minutos. Se houver dilatação, é preciso somar o tempo de espera para a pupila abrir e o período em que a visão fica embaçada.',
    'O tempo total depende dos outros exames do dia. A CEMO informa o previsto no agendamento.',
  ],
  aftercare: [
    'Sem dilatação, você volta às atividades normais. Com dilatação, a visão para perto fica embaçada e a luz incomoda por algumas horas, então evite dirigir até o efeito passar.',
    'O oftalmologista analisa as imagens, compara com as anteriores e explica o resultado. Em algumas situações, o OCT é repetido ao longo do tempo para acompanhar a evolução.',
    'Procure atendimento se, depois da dilatação, surgir dor forte no olho, náuseas ou piora importante da visão.',
  ],
  faq: [
    {
      question: 'O OCT machuca ou usa radiação?',
      answer: [
        'Não. O aparelho usa luz, não toca o olho e não usa radiação como a de um raio X.',
      ],
    },
    {
      question: 'OCT é o mesmo que retinografia?',
      answer: [
        'Não. A retinografia é uma fotografia da superfície do fundo do olho. O OCT mostra cortes das camadas. Os exames se complementam.',
      ],
    },
    {
      question: 'O OCT substitui o campo visual no glaucoma?',
      answer: [
        'Não. O OCT avalia a estrutura do nervo. O campo visual avalia a função da visão. O médico usa os dois.',
      ],
    },
    {
      question: 'Precisa dilatar a pupila?',
      answer: [
        'Nem sempre. Depende do aparelho, da qualidade da imagem e da orientação do médico.',
      ],
    },
    {
      question: 'Quem tem diabetes deve fazer OCT?',
      answer: [
        'O acompanhamento da retina é importante para quem tem diabetes, e o OCT pode fazer parte dele. O médico define a periodicidade.',
      ],
    },
  ],
  related: {
    doctors: ['adriano-de-morais-ferreira', 'roberta-andrade-e-nascimento', 'jose-pereira-do-rego-neto'],
    specialties: ['retina', 'glaucoma'],
    exams: ['retinografia', 'mapeamento-de-retina', 'campo-visual', 'estereofoto-de-papila'],
    conditions: ['degeneracao-macular'],
    articles: ['doencas-na-retina', 'o-que-e-retina', 'qual-a-funcao-da-retina'],
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
    'TODO_CONTENT_VALIDATION: confirmar quais tipos de OCT a clínica faz (retina/mácula, nervo óptico/fibras, segmento anterior); o vídeo do Dr. David só cita "tomografia de coerência óptica (OCT)"',
    'TODO_CONTENT_VALIDATION: confirmar se há OCT-angiografia ou outros módulos, e o tempo do exame e a necessidade de dilatação',
    'TODO_CONTENT_VALIDATION: página nova (exame ausente do site atual): confirmar com a CEMO a publicação e validar com Dr. Adriano (retina)',
  ],
};
