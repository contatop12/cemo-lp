import type { SiteStats } from '@/content/types';

// Prova imediata logo abaixo do hero. Números vêm sempre de SiteStats (validação pendente com a CEMO).
export function TrustBar({ stats, doctorsCount }: { stats: SiteStats; doctorsCount: number }) {
  const items = [
    { id: 'google', value: stats.googleRating.display, label: `no Google · ${stats.googleRating.reviewsLabel}` },
    { id: 'anos', value: stats.yearsOfActivity.display, label: stats.yearsOfActivity.label },
    { id: 'atendimentos', value: stats.patientsServed.display, label: stats.patientsServed.label },
    { id: 'medicos', value: String(doctorsCount), label: 'médicos no corpo clínico' },
  ];
  return (
    <div className="border-y border-borda bg-nevoa">
      <ul className="mx-auto grid max-w-wide grid-cols-2 gap-x-6 gap-y-6 px-[var(--gutter)] py-8 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.id} className="flex flex-col">
            <span className="font-display text-h2 font-semibold text-azul-cemo">{item.value}</span>
            <span className="mt-1 text-small text-tinta-suave">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
