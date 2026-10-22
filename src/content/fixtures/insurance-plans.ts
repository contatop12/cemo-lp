// Identificados pelo nome dos arquivos dos 17 logos de /convenios/ (sem texto nem alt no site atual).
import type { InsurancePlan } from '../types';

const LIST_TODO = 'TODO_CONTENT_VALIDATION: lista de convênios vem de logos de 2020–2022; confirmar os atuais e o 17º logo não identificado';

const names = [
  'Allianz',
  'Amil',
  'Bradesco Saúde',
  'CAASP',
  'Cassi',
  'CNEN',
  'Economus',
  'Mediservice',
  'Notre Dame Intermédica',
  'Porto Seguro',
  'Postal Saúde',
  'Saúde Caixa',
  'Saúde Itaú',
  'Unimed Seguros',
  'Vivest',
  'Dr. Consulta',
];

function toId(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const insurancePlans: InsurancePlan[] = names.map((name) => ({
  id: toId(name),
  name,
  logo: null,
  todos:
    name === 'Dr. Consulta'
      ? [LIST_TODO, 'TODO_CONTENT_VALIDATION: Dr. Consulta é convênio ou cartão de desconto?']
      : [LIST_TODO],
}));
