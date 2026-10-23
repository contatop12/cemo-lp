// Condições oculares evergreen + as que já moram num post (presbiopia, uveíte, olho seco: a URL do artigo é a entidade).
import type { Condition, ConditionLink } from '../../types';
import { astigmatismo } from './astigmatismo';
import { baixaVisao } from './baixa-visao';
import { ceratocone } from './ceratocone';
import { conjuntivite } from './conjuntivite';
import { degeneracaoMacular } from './degeneracao-macular';
import { descolamentoDeRetina } from './descolamento-de-retina';
import { hipermetropia } from './hipermetropia';
import { miopia } from './miopia';

export const conditions: Condition[] = [
  ceratocone,
  miopia,
  hipermetropia,
  astigmatismo,
  degeneracaoMacular,
  descolamentoDeRetina,
  conjuntivite,
  baixaVisao,
];

export const conditionLinks: ConditionLink[] = [
  {
    id: 'presbiopia',
    name: 'Presbiopia (vista cansada)',
    summary: 'A dificuldade para enxergar de perto que costuma aparecer por volta dos 40 anos e as opções de correção.',
    href: '/presbiopia-entenda-a-vista-cansada-e-suas-opcoes-de-correcao/',
  },
  {
    id: 'uveite',
    name: 'Uveíte',
    summary: 'Inflamação da camada média do olho: sinais, causas e por que precisa de acompanhamento.',
    href: '/uveite-inflamacao-ocular/',
  },
  {
    id: 'olho-seco',
    name: 'Síndrome do olho seco',
    summary: 'Ardor, sensação de areia e vista cansada: quando o olho não fica bem lubrificado.',
    href: '/sindrome-do-olho-seco/',
  },
];
