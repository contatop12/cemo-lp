// Exames — ordem do mega menu (docs/information-architecture.md §4.1); OCT entrou pelo vídeo "Exames que realizamos";
// ultrassom ocular, pelos ajustes da CEMO de 23/10/2026.
import type { Exam } from '../../types';
import { biometria } from './biometria';
import { campoVisual } from './campo-visual';
import { ceratoscopia } from './ceratoscopia';
import { curvaTensionalDiaria } from './curva-tensional-diaria';
import { estereofotoDePapila } from './estereofoto-de-papila';
import { gonioscopia } from './gonioscopia';
import { mapeamentoDeRetina } from './mapeamento-de-retina';
import { microscopiaEspecular } from './microscopia-especular';
import { paquimetria } from './paquimetria';
import { retinografia } from './retinografia';
import { tomografiaDeCoerenciaOptica } from './tomografia-de-coerencia-optica';
import { tonometria } from './tonometria';
import { ultrassomOcular } from './ultrassom-ocular';

export const exams: Exam[] = [
  mapeamentoDeRetina,
  campoVisual,
  retinografia,
  ceratoscopia,
  microscopiaEspecular,
  curvaTensionalDiaria,
  tomografiaDeCoerenciaOptica,
  tonometria,
  paquimetria,
  gonioscopia,
  biometria,
  estereofotoDePapila,
  ultrassomOcular,
];
