// Especialidades, serviços, consulta e tratamentos — ordem = prioridade comercial (menu "Especialidades").
import type { Specialty } from '../../types';
import { anelIntraestromal } from './anel-intraestromal';
import { catarata } from './catarata';
import { consulta } from './consulta';
import { cornea } from './cornea';
import { crosslinkingCorneano } from './crosslinking-corneano';
import { estrabismo } from './estrabismo';
import { glaucoma } from './glaucoma';
import { lentesDeContato } from './lentes-de-contato';
import { oftalmopediatria } from './oftalmopediatria';
import { plasticaOcular } from './plastica-ocular';
import { refrativa } from './refrativa';
import { retina } from './retina';
import { transplanteDeCornea } from './transplante-de-cornea';

export const specialties: Specialty[] = [
  catarata,
  refrativa,
  retina,
  glaucoma,
  cornea,
  oftalmopediatria,
  estrabismo,
  plasticaOcular,
  lentesDeContato,
  consulta,
  crosslinkingCorneano,
  anelIntraestromal,
  transplanteDeCornea,
];
