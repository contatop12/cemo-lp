// Opções de "O que você está buscando?". A lista final deve refletir só serviços confirmados pela CEMO.
import type { LeadInterest } from '../types';

export const leadInterests: LeadInterest[] = [
  { id: 'consulta', label: 'Consulta oftalmológica' },
  { id: 'catarata', label: 'Catarata' },
  { id: 'refrativa', label: 'Cirurgia refrativa' },
  { id: 'retina', label: 'Retina' },
  { id: 'glaucoma', label: 'Glaucoma' },
  { id: 'cornea', label: 'Córnea / Ceratocone' },
  { id: 'oftalmopediatria', label: 'Oftalmopediatria' },
  { id: 'estrabismo', label: 'Estrabismo' },
  { id: 'plastica-ocular', label: 'Plástica ocular' },
  { id: 'exames', label: 'Exames' },
  { id: 'convenios', label: 'Convênios' },
  { id: 'outro', label: 'Outro assunto' },
];
