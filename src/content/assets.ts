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

const LOGO_ALT = 'CEMO – Centro de Microcirurgia Ocular';

// Retratos do corpo clínico com o fundo removido (scripts/portraits/): mesma moldura e mesmo campo de cor
// para todos, sem retoque. Dimensões = arquivo gerado por scripts/portraits/frame.mjs.
const PORTRAIT_SIZES: Record<string, [number, number]> = {
  'david-ribeiro-de-mendonca-filho': [553, 691],
  'adriano-de-morais-ferreira': [453, 566],
  'cintia-gomes-galvao': [341, 426],
  'adriana-bizzarri': [480, 600],
  'bruna-de-andrade-nascimento': [350, 438],
  'priscilla-pires': [444, 555],
  'roberta-andrade-e-nascimento': [406, 508],
  'rodrigo-arantes': [640, 800],
};

export function portrait(slug: string, alt: string): ImageAsset | null {
  const size = PORTRAIT_SIZES[slug];
  return size ? { src: `/images/medicos/${slug}.webp`, width: size[0], height: size[1], alt } : null;
}

export const assets: {
  drDavid: ImageAsset;
  drDavidMobile: ImageAsset;
  /** Corpo inteiro com fundo removido — hero da Home (LCP). */
  drDavidCutout: ImageAsset;
  ogHome: ImageAsset;
  logoPng: ImageAsset;
  // Reconstruído do PNG original (scripts/logo/): mira e ponto geométricos, demais formas em traço suavizado.
  // QA de silhueta em scripts/logo/logo.test.ts (IoU ≥ 0,97). Horizontal: mesma arte, olho à esquerda do texto.
  logoSvg?: ImageAsset;
  logoSvgWhite?: ImageAsset;
  logoHorizontal: ImageAsset;
  logoHorizontalWhite: ImageAsset;
  equipment: ImageAsset[];
} = {
  logoSvg: { src: '/brand/logo-cemo.svg', width: 648, height: 508, alt: LOGO_ALT },
  logoSvgWhite: { src: '/brand/logo-cemo-white.svg', width: 648, height: 508, alt: LOGO_ALT },
  logoHorizontal: { src: '/brand/logo-cemo-horizontal.svg', width: 1111.25, height: 211.3, alt: LOGO_ALT },
  logoHorizontalWhite: { src: '/brand/logo-cemo-horizontal-white.svg', width: 1111.25, height: 211.3, alt: LOGO_ALT },
  drDavid: { src: '/images/dr-david.jpg', width: 853, height: 1280, alt: DAVID_ALT },
  drDavidMobile: { src: '/images/dr-david-mobile.jpg', width: 728, height: 910, alt: DAVID_ALT },
  drDavidCutout: { src: '/images/dr-david-recorte.webp', width: 853, height: 1280, alt: DAVID_ALT },
  ogHome: { src: '/images/og-home.png', width: 1200, height: 630, alt: 'CEMO – Centro de Microcirurgia Ocular' },
  logoPng: { src: '/brand/logo-cemo.png', width: 1000, height: 799, alt: 'CEMO – Centro de Microcirurgia Ocular' },
  equipment: equipmentAlts.map((alt, i) => ({
    src: `/images/equipamentos/equip-${String(i + 1).padStart(2, '0')}.jpg`,
    width: 960,
    height: 1280,
    alt,
  })),
};
