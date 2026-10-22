// Imagens otimizadas servidas de public/ (geradas por `npm run assets:optimize` a partir de _materiais/).
import type { ImageAsset } from './types';

const DAVID_ALT = 'Dr. David Ribeiro de Mendonça Filho, diretor técnico do CEMO, de jaleco';

// Descrição só do que é visível — modelo e função de cada aparelho aguardam validação da CEMO.
const equipmentAlts = [
  'Equipamento oftalmológico branco com apoio de queixo e monitor, em sala de exames da clínica',
  'Aparelho de exame com apoio de queixo e testa sobre mesa clara, em sala de exames da clínica',
  'Equipamento oftalmológico de formas arredondadas com tela lateral, em sala de exames da clínica',
  'Equipamento oftalmológico com apoio de queixo e tela lateral, visto de outro ângulo',
  'Aparelho de exame com tela grande voltada ao operador, sobre mesa com teclado',
  'Aparelho de exame com tela grande exibindo a interface, em sala da clínica',
];

export const assets: {
  drDavid: ImageAsset;
  drDavidMobile: ImageAsset;
  ogHome: ImageAsset;
  logoPng: ImageAsset;
  equipment: ImageAsset[];
} = {
  drDavid: { src: '/images/dr-david.jpg', width: 853, height: 1280, alt: DAVID_ALT },
  drDavidMobile: { src: '/images/dr-david-mobile.jpg', width: 728, height: 910, alt: DAVID_ALT },
  ogHome: { src: '/images/og-home.png', width: 1200, height: 630, alt: 'CEMO – Centro de Microcirurgia Ocular' },
  logoPng: { src: '/brand/logo-cemo.png', width: 1000, height: 799, alt: 'CEMO – Centro de Microcirurgia Ocular' },
  equipment: equipmentAlts.map((alt, i) => ({
    src: `/images/equipamentos/equip-${String(i + 1).padStart(2, '0')}.jpg`,
    width: 960,
    height: 1280,
    alt,
  })),
};
