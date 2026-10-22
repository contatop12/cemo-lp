import Link from 'next/link';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { Section } from '@/components/ui/Section';
import type { Service } from '@/content/types';

// A Home direciona: 8 intenções principais, não a lista completa de serviços.
export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <Section id="especialidades" labelledBy="servicos-titulo">
      <div className="mx-auto max-w-wide px-[var(--gutter)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="servicos-titulo" className="max-w-[20ch] text-h2">
            Como podemos cuidar da sua visão?
          </h2>
          <Link href="/especialidades/" className="inline-flex min-h-12 items-center font-bold text-azul-700 underline underline-offset-[3px]">
            Ver todas as especialidades
          </Link>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.id}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
