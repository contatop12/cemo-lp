import Image from 'next/image';
import type { InsurancePlan } from '@/content/types';

// Nome sempre em texto (acessível e indexável); o logo, quando existir, é complemento.
export function InsuranceGrid({ plans }: { plans: InsurancePlan[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {plans.map((plan) => (
        <li key={plan.id} className="flex min-h-16 min-w-[7.5rem] items-center gap-3 rounded-xl border border-borda bg-papel px-4 py-3 font-medium">
          {plan.logo ? (
            <Image src={plan.logo.src} alt="" width={plan.logo.width} height={plan.logo.height} className="h-8 w-auto" aria-hidden="true" />
          ) : null}
          <span>{plan.name}</span>
        </li>
      ))}
    </ul>
  );
}
