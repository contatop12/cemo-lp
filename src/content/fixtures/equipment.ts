// Fotos reais de equipamentos da clínica. A identidade/função de cada aparelho NÃO é inferida pela foto:
// legendas genéricas até a CEMO validar.
import { assets } from '../assets';
import type { EquipmentItem } from '../types';

const IDENTIFY = 'TODO_CONTENT_VALIDATION: identificar o equipamento e o exame/procedimento em que é usado';
const QUALITY = 'TODO_CONTENT_VALIDATION: foto comprimida pelo WhatsApp (960×1280) — pedir original ou nova sessão fotográfica';

const objectPositions = ['45% 55%', '50% 50%', '45% 50%', '40% 55%', '55% 45%', '55% 45%'];

// Legendas verdadeiras e genéricas: não nomeiam aparelho nem função até a validação da CEMO.
const captions = [
  'Tecnologia em uso na clínica',
  'Exames realizados na própria clínica',
  'Estrutura para avaliação completa',
  'Salas de exame preparadas para cada etapa',
  'Diagnóstico com apoio de tecnologia',
  'Consulta, exames e cirurgia em um só lugar',
];

export const equipment: EquipmentItem[] = assets.equipment.map((photo, i) => ({
  id: `equip-${String(i + 1).padStart(2, '0')}`,
  photo,
  caption: captions[i] ?? 'Tecnologia em uso na clínica',
  objectPosition: objectPositions[i] ?? '50% 50%',
  todos: [IDENTIFY, QUALITY],
}));
