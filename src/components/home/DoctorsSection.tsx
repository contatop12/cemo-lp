import Link from 'next/link';
import { DoctorCard } from '@/components/ui/DoctorCard';
import { Section } from '@/components/ui/Section';
import type { Doctor } from '@/content/types';

// Deixa claro que a CEMO tem vários profissionais (o Dr. David é o rosto, não o site pessoal).
export function DoctorsSection({ doctors }: { doctors: Doctor[] }) {
  return (
    <Section id="corpo-clinico" labelledBy="corpo-clinico-titulo">
      <div className="mx-auto max-w-wide px-[var(--gutter)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="corpo-clinico-titulo" className="text-h2">
              Corpo clínico
            </h2>
            <p className="mt-3 max-w-[56ch] text-lead text-tinta-suave">
              Oftalmologistas com atuação em diferentes áreas, para cuidar de cada fase da sua visão.
            </p>
          </div>
          <Link href="/corpo-clinico/" className="inline-flex min-h-12 items-center font-bold text-azul-700 underline underline-offset-[3px]">
            Conhecer o corpo clínico
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <li key={doctor.slug} className="relative">
              <DoctorCard doctor={doctor} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
