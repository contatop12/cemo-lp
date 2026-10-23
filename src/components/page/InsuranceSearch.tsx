'use client';

import { useId, useState } from 'react';
import type { InsurancePlan } from '@/content/types';

const normalize = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();

// Busca por nome do convênio (briefing §90). Sem JS a lista inteira continua visível.
export function InsuranceSearch({ plans }: { plans: InsurancePlan[] }) {
  const [query, setQuery] = useState('');
  const id = useId();
  const visible = query ? plans.filter((p) => normalize(p.name).includes(normalize(query))) : plans;
  return (
    <div>
      <label htmlFor={id} className="block font-bold">
        Procure o seu convênio
      </label>
      <input
        id={id}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
        className="mt-2 block min-h-14 w-full max-w-md rounded-md border-2 border-borda-campo bg-papel px-4 text-body"
      />
      <p role="status" className="mt-3 text-small text-tinta-suave">
        {visible.length === 0
          ? 'Nenhum convênio com esse nome na lista. Fale com a equipe para confirmar.'
          : `${visible.length} ${visible.length === 1 ? 'convênio' : 'convênios'}`}
      </p>
      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((plan) => (
          <li key={plan.id} className="flex min-h-16 items-center rounded-md border border-borda bg-papel px-4 py-3 font-medium">
            {plan.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
