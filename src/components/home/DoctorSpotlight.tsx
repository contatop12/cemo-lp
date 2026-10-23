import Image from 'next/image';
import Link from 'next/link';
import { PortraitFrame } from '@/components/ui/PortraitFrame';
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

// Autoridade médica com dados do repositório: retrato no arco-pálpebra, bio só com fatos publicados, formação
// completa. Sem RQE enquanto não validado.
export function DoctorSpotlight({ doctor }: { doctor: Doctor }) {
  const fullName = `${doctor.honorific} ${doctor.name}`;
  return (
    <Section id="diretor-tecnico" labelledBy="destaque-medico">
      <div className="mx-auto grid max-w-wide items-start gap-10 px-[var(--gutter)] lg:grid-cols-12 lg:gap-8">
        <div className="mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          <PortraitFrame size="lg">
            {doctor.photo ? (
              <Image
                src={doctor.photo.src}
                width={doctor.photo.width}
                height={doctor.photo.height}
                alt={doctor.photo.alt}
                sizes="(min-width: 1024px) 30rem, 90vw"
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div aria-hidden="true" className="flex h-full items-center justify-center font-display text-display text-azul-cemo">
                {initials(doctor.name)}
              </div>
            )}
          </PortraitFrame>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          {doctor.role ? <p className="text-ui font-bold text-azul-700">{doctor.role}</p> : null}
          <h2 id="destaque-medico" className="mt-2 text-h2">
            {fullName}
          </h2>
          <p className="mt-2 text-tinta-suave">{doctor.crm}</p>
          {doctor.bio.map((paragraph) => (
            <p key={paragraph} className="mt-5 max-w-[60ch] text-lead">
              {paragraph}
            </p>
          ))}
          {doctor.credentials.length > 0 ? (
            <div className="mt-8">
              <h3 className="text-h4">Formação e atuação</h3>
              <ul className="mt-3 divide-y divide-borda border-y border-borda">
                {doctor.credentials.map((credential) => (
                  <li key={credential} className="py-3 text-body">
                    {credential}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {doctor.published ? (
              <Link
                href={doctor.canonicalPath}
                aria-label={`Ver o perfil do ${fullName}`}
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-md bg-azul-cemo px-7 py-4 text-ui font-bold text-papel no-underline hover:bg-azul-700"
              >
                Ver o perfil completo
              </Link>
            ) : null}
            <Link
              href="/corpo-clinico/"
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-md border-2 border-azul-cemo px-7 py-4 text-ui font-bold text-azul-700 no-underline hover:bg-nevoa-2"
            >
              Ver todo o corpo clínico
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
