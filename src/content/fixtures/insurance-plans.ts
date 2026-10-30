// Lista atualizada pela CEMO (PDF "Ajustes Novo site", 23/10/2026), na ordem do PDF.
// Logos: arquivos do site atual (/wp-content/uploads/2020/08/logo-*.jpg) recortados por scripts/convenios-logos.mjs.
import type { ImageAsset, InsurancePlan } from '../types';

function logo(id: string, name: string, width: number, height: number): ImageAsset {
  return { src: `/images/convenios/${id}.webp`, width, height, alt: `Logo ${name}` };
}

const plans: Array<{ id: string; name: string; size: [number, number] | null }> = [
  { id: 'amil', name: 'Amil', size: [177, 69] },
  { id: 'allianz', name: 'Allianz', size: [179, 53] },
  { id: 'bradesco-saude', name: 'Bradesco Saúde', size: [181, 71] },
  { id: 'blue', name: 'Blue', size: [419, 177] }, // Blue Saúde; versão branca sobre azul (única publicada)
  { id: 'saude-caixa', name: 'Saúde Caixa', size: [203, 83] },
  { id: 'cassi', name: 'Cassi', size: [190, 99] },
  { id: 'central-nacional-unimed', name: 'Central Nacional Unimed', size: [193, 70] },
  { id: 'economus', name: 'Economus', size: [182, 36] },
  { id: 'gama-saude', name: 'Gama Saúde', size: [198, 77] },
  { id: 'mediservice', name: 'Mediservice', size: [171, 93] },
  { id: 'notredame-intermedica', name: 'NotreDame Intermédica', size: [189, 73] },
  { id: 'porto-seguro', name: 'Porto Seguro', size: [177, 63] },
  { id: 'saude-itau', name: 'Saúde Itaú', size: [156, 78] },
  { id: 'postal-saude', name: 'Postal Saúde', size: [202, 36] },
  { id: 'unimed-seguros', name: 'Unimed Seguros', size: [202, 202] },
  { id: 'vivest', name: 'Vivest', size: [182, 46] },
];

export const insurancePlans: InsurancePlan[] = plans.map(({ id, name, size }) => ({
  id,
  name,
  logo: size ? logo(id, name, size[0], size[1]) : null,
  todos:
    id === 'blue'
      ? ['TODO_CONTENT_VALIDATION: logo da Blue Saúde tirado de site de corretor (versão branca sobre azul); trocar pelo arquivo oficial da CEMO/operadora']
      : [],
}));
