// Especialidades, serviços, consulta e tratamentos — ordem = prioridade comercial (menu "Especialidades").
// Pterígio, calázio, YAG laser e fotocoagulação: ajustes da CEMO de 23/10/2026.
import type { Specialty } from '../../types';
import { anelIntraestromal } from './anel-intraestromal';
import { calazio } from './calazio';
import { catarata } from './catarata';
import { consulta } from './consulta';
import { cornea } from './cornea';
import { crosslinkingCorneano } from './crosslinking-corneano';
import { estrabismo } from './estrabismo';
import { fotocoagulacaoALaser } from './fotocoagulacao-a-laser';
import { glaucoma } from './glaucoma';
import { lentesDeContato } from './lentes-de-contato';
import { oftalmopediatria } from './oftalmopediatria';
import { plasticaOcular } from './plastica-ocular';
import { pterigio } from './pterigio';
import { refrativa } from './refrativa';
import { retina } from './retina';
import { transplanteDeCornea } from './transplante-de-cornea';
import { yagLaser } from './yag-laser';

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
  pterigio,
  calazio,
  yagLaser,
  fotocoagulacaoALaser,
];
