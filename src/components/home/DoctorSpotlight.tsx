import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import type { Doctor } from '@/content/types';

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter((part) => part.length > 2 || /^[A-ZÁÉÍÓÚ]/.test(part))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

// Autoridade médica com dados do repositório. Sem RQE enquanto não validado; o link vai ao hub do corpo
// clínico até o perfil individual existir.
export function DoctorSpotlight({ doctor }: { doctor: Doctor }) {
  const fullName = `${doctor.honorific} ${doctor.name}`;
  return (
    <Section id="diretor-tecnico" labelledBy="destaque-medico">
      <div className="mx-auto grid max-w-wide items-center gap-10 px-[var(--gutter)] lg:grid-cols-12">
        <div className="relative mx-auto w-full max-w-md overflow-hidden bg-estudio radius-lid lg:col-span-5">
          {doctor.photo ? (
            <Image
              src={doctor.photo.src}
              width={doctor.photo.width}
              height={doctor.photo.height}
              alt={doctor.photo.alt}
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="aspect-[3/4] h-auto w-full object-cover object-[50%_10%]"
            />
          ) : (
            <div aria-hidden="true" className="flex aspect-[3/4] items-center justify-center font-display text-display text-azul-cemo">
              {initials(doctor.name)}
            </div>
          )}
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="text-small font-bold uppercase tracking-[0.08em] text-azul-700">{doctor.role ?? 'Corpo clínico'}</p>
          <h2 id="destaque-medico" className="mt-3 text-h2">
            {fullName}
          </h2>
          <p className="mt-2 text-tinta-suave">{doctor.crm}</p>
          {doctor.areas.length > 0 ? (
            <p className="mt-5 text-lead">Atua em {doctor.areas.join(', ')}.</p>
          ) : null}
          {doctor.credentials.length > 0 ? (
            <ul className="mt-6 flex flex-col gap-2 border-l-4 border-verde-cemo pl-5">
              {doctor.credentials.map((credential) => (
                <li key={credential}>{credential}</li>
              ))}
            </ul>
          ) : null}
          <Link
            href="/corpo-clinico/"
            className="mt-8 inline-flex min-h-[3.25rem] items-center rounded-md border-2 border-azul-cemo px-7 py-4 text-ui font-bold text-azul-700 no-underline hover:bg-nevoa-2"
          >
            Ver todo o corpo clínico
          </Link>
        </div>
      </div>
    </Section>
  );
}
