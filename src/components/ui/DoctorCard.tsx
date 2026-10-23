import Image from 'next/image';
import Link from 'next/link';
import { initials } from '@/components/home/DoctorSpotlight';
import type { Doctor } from '@/content/types';
import { PortraitFrame } from './PortraitFrame';

// Cartão do corpo clínico: retrato na moldura comum, nome como único link (perfil publicado), áreas e CRM.
// Sem RQE enquanto não validado.
export function DoctorCard({ doctor, headingLevel = 3 }: { doctor: Doctor; headingLevel?: 2 | 3 }) {
  const name = `${doctor.honorific} ${doctor.name}`;
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <article className="group flex h-full flex-col">
      <PortraitFrame>
        {doctor.photo ? (
          <Image
            src={doctor.photo.src}
            width={doctor.photo.width}
            height={doctor.photo.height}
            alt={doctor.photo.alt}
            sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 90vw"
            className="h-full w-full object-cover object-top transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:scale-[1.02]"
          />
        ) : (
          <div aria-hidden="true" className="flex h-full items-center justify-center font-display text-h1 text-azul-cemo">
            {initials(doctor.name)}
          </div>
        )}
      </PortraitFrame>
      <Heading className="mt-4 text-h4">
        {doctor.published ? (
          <Link
            href={doctor.canonicalPath}
            className="text-tinta no-underline after:absolute after:inset-0 hover:text-azul-700 hover:underline hover:underline-offset-[3px]"
          >
            {name}
          </Link>
        ) : (
          name
        )}
      </Heading>
      {doctor.role ? <p className="mt-1 font-bold text-azul-700">{doctor.role}</p> : null}
      {doctor.areas.length > 0 ? <p className="mt-1 text-tinta-suave">{doctor.areas.join(', ')}</p> : null}
      <p className="mt-auto pt-2 text-small text-tinta-suave">{doctor.crm}</p>
    </article>
  );
}
