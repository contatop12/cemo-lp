// Prova social — ÚNICO lugar com estes números. Nenhum componente os escreve literalmente
// (guardado por src/content/no-hardcoded-facts.test.ts).
import type { SiteStats } from '../types';

export const siteStats: SiteStats = {
  googleRating: { score: 4.9, display: '4,9', reviewsLabel: 'mais de 2,1 mil avaliações', validated: false },
  yearsOfActivity: { display: '+20', label: 'anos de atividade', validated: false },
  patientsServed: { display: '+100 mil', label: 'atendimentos', validated: false },
  todos: [
    'TODO_CONTENT_VALIDATION: nota e número de avaliações no Google (briefing: 4,9 e mais de 2,1 mil) — conferir no perfil antes da publicação',
    'TODO_CONTENT_VALIDATION: anos de atividade — home e /sobre/ dizem +20, linha do tempo de /sobre/ diz +15',
    'TODO_CONTENT_VALIDATION: número de atendimentos (+100 mil) — fonte do dado',
  ],
};
