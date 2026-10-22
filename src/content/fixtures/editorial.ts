// Blocos editoriais da Home. Texto geral e verdadeiro: sem duração, técnica, preço ou promessa de resultado.
import type { EditorialContent } from '../types';

const REVIEW = 'TODO_CONTENT_VALIDATION: revisão médica do texto';
const TECHNIQUES = 'TODO_CONTENT_VALIDATION: técnicas oferecidas (refrativa)';

export const editorial: Record<EditorialContent['id'], EditorialContent> = {
  catarata: {
    id: 'catarata',
    heading: 'Catarata: avaliação cuidadosa antes de qualquer decisão',
    paragraphs: [
      'A catarata é a perda gradual da transparência do cristalino, a lente natural do olho. É comum com o passar dos anos e costuma deixar a visão embaçada, com cores menos vivas e mais sensibilidade à luz.',
      'Esses sinais podem estar associados a diferentes condições e precisam de avaliação oftalmológica. Na consulta, o médico examina os seus olhos, solicita os exames necessários e explica, com calma, se há indicação de cirurgia e como seria cada etapa.',
    ],
    bullets: [
      'Consulta e exames de avaliação na própria clínica',
      'Indicação definida caso a caso pelo oftalmologista',
      'Acompanhamento antes e depois do procedimento',
    ],
    ctaLabel: 'Conhecer o tratamento da catarata',
    href: '/especialidades/catarata/',
    todos: [REVIEW],
  },
  refrativa: {
    id: 'refrativa',
    heading: 'Cirurgia refrativa: menos dependência de óculos, quando há indicação',
    paragraphs: [
      'A cirurgia refrativa corrige graus de miopia, astigmatismo e hipermetropia, podendo reduzir a dependência de óculos ou lentes de contato.',
      'Nem todas as pessoas têm indicação. Por isso, tudo começa com uma avaliação completa e exames específicos, que mostram se o procedimento é adequado para os seus olhos.',
    ],
    bullets: [
      'Avaliação e exames pré-operatórios',
      'Indicação individual, sem promessas genéricas',
      'Orientação clara sobre recuperação e acompanhamento',
    ],
    ctaLabel: 'Saber se a cirurgia refrativa é para você',
    href: '/especialidades/refrativa/',
    todos: [REVIEW, TECHNIQUES],
  },
};
