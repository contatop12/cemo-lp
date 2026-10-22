// Fotos reais de equipamentos da clínica. A identidade/função de cada aparelho NÃO é inferida pela foto:
// legendas genéricas até a CEMO validar.
import { assets } from '../assets';
import type { EquipmentItem } from '../types';

const IDENTIFY = 'TODO_CONTENT_VALIDATION: identificar o equipamento e o exame/procedimento em que é usado';
const QUALITY = 'TODO_CONTENT_VALIDATION: foto comprimida pelo WhatsApp (960×1280) — pedir original ou nova sessão fotográfica';

const objectPositions = ['45% 55%', '50% 50%', '45% 50%', '40% 55%', '55% 45%', '55% 45%'];

export const equipment: EquipmentItem[] = assets.equipment.map((photo, i) => ({
  id: `equip-${String(i + 1).padStart(2, '0')}`,
  photo,
  caption: 'Tecnologia em uso na clínica',
  objectPosition: objectPositions[i] ?? '50% 50%',
  todos: [IDENTIFY, QUALITY],
}));
