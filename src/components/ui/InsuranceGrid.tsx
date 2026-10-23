import Image from 'next/image';
import type { InsurancePlan } from '@/content/types';

// Nome sempre em texto (acessível e indexável); o logo, quando existir, é complemento decorativo.
export function InsuranceCard({ plan }: { plan: Pick<InsurancePlan, 'name' | 'logo'> }) {
  return (
    <li className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-xl border border-borda bg-papel px-3 py-4 text-center">
      {plan.logo ? (
        <Image src={plan.logo.src} alt="" width={plan.logo.width} height={plan.logo.height} className="h-auto max-h-12 w-auto max-w-36" />
      ) : null}
      <span className={plan.logo ? 'text-small text-tinta-suave' : 'text-lead font-bold'}>{plan.name}</span>
    </li>
  );
}

export function InsuranceGrid({ plans }: { plans: InsurancePlan[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {plans.map((plan) => (
        <InsuranceCard key={plan.id} plan={plan} />
      ))}
    </ul>
  );
}
