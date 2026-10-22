import type { LeadProvider } from './provider';
import type { LeadRecord } from './types';

// Desenvolvimento/staging sem webhook: guarda em memória e loga só o id (nunca dados pessoais).
export function createDevProvider(): LeadProvider & { readonly received: LeadRecord[] } {
  const received: LeadRecord[] = [];
  return {
    name: 'dev',
    received,
    async submit(lead) {
      received.push(lead);
      console.info('[lead:dev] received', lead.id);
      return { ok: true };
    },
  };
}
