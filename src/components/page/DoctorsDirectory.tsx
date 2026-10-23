'use client';

import { useState } from 'react';
import { DoctorCard, type DoctorCardData } from '@/components/ui/DoctorCard';
import { cn } from '@/lib/cn';

// Filtro por área (briefing §72). Sem JS, todos os médicos aparecem; o filtro só reduz a lista visível e anuncia o
// resultado para leitores de tela.
export function DoctorsDirectory({ doctors, areas }: { doctors: DoctorCardData[]; areas: Array<{ id: string; label: string }> }) {
  const [area, setArea] = useState<string | null>(null);
  const visible = area ? doctors.filter((d) => d.specialtyIds.includes(area)) : doctors;
  const options = [{ id: null, label: 'Todas as áreas' }, ...areas.filter((a) => doctors.some((d) => d.specialtyIds.includes(a.id)))];
  return (
    <div>
      <div role="group" aria-label="Filtrar por área" className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.id ?? 'todas'}
            type="button"
            aria-pressed={area === o.id}
            onClick={() => setArea(o.id)}
            className={cn(
              'inline-flex min-h-12 items-center rounded-full border-2 px-5 font-bold transition-colors duration-[var(--duration-fast)]',
              area === o.id ? 'border-azul-cemo bg-azul-cemo text-papel' : 'border-borda-campo bg-papel text-tinta hover:border-azul-cemo',
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
      <p role="status" className="mt-6 text-small text-tinta-suave">
        {visible.length === 1 ? '1 médico' : `${visible.length} médicos`}
        {area ? ` em ${options.find((o) => o.id === area)?.label.toLowerCase()}` : ' no corpo clínico'}
      </p>
      <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 xl:grid-cols-4">
        {visible.map((d) => (
          <li key={d.slug} className="relative">
            <DoctorCard doctor={d} />
          </li>
        ))}
      </ul>
    </div>
  );
}
