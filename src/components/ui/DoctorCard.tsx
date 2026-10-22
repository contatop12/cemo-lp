import Image from 'next/image';
import { initials } from '@/components/home/DoctorSpotlight';
import type { Doctor } from '@/content/types';
import { cn } from '@/lib/cn';

// Sem link de perfil enquanto `published` for false; sem RQE enquanto não validado.
export function DoctorCard({ doctor, compact = false }: { doctor: Doctor; compact?: boolean }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-borda bg-papel">
      <div className={cn('overflow-hidden rounded-t-lg bg-estudio', compact ? 'aspect-square' : 'aspect-[4/5]')}>
        {doctor.photo ? (
          <Image
            src={doctor.photo.src}
            width={doctor.photo.width}
            height={doctor.photo.height}
            alt={doctor.photo.alt}
            sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 90vw"
            className="h-full w-full object-cover object-[50%_10%]"
          />
        ) : (
          <div aria-hidden="true" className="flex h-full items-center justify-center font-display text-h1 text-azul-cemo">
            {initials(doctor.name)}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-h4">{`${doctor.honorific} ${doctor.name}`}</h3>
        {doctor.role ? <p className="mt-1 font-bold text-azul-700">{doctor.role}</p> : null}
        {doctor.areas.length > 0 ? <p className="mt-2 text-tinta-suave">{doctor.areas.join(' · ')}</p> : null}
        <p className="mt-auto pt-3 text-small text-tinta-suave">{doctor.crm}</p>
      </div>
    </article>
  );
}
