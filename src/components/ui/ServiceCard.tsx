import { TrackedLink } from '@/components/analytics/TrackedLink';
import type { Service } from '@/content/types';
import { Reticle } from './icons';

// Card inteiro clicável por um único link (pseudo-elemento ::after), sem links aninhados.
export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-borda bg-papel p-6 transition-shadow duration-[var(--duration-base)] focus-within:shadow-2 hover:shadow-2">
      <Reticle className="size-8 text-verde-cemo" />
      <h3 className="mt-4 text-h4">{service.title}</h3>
      <p className="mt-2 flex-1 text-tinta-suave">{service.summary}</p>
      <TrackedLink
        event="service_cta_click"
        location="home_services"
        href={service.href}
        className="mt-5 inline-flex min-h-12 items-center font-bold text-azul-700 underline decoration-2 underline-offset-[3px] after:absolute after:inset-0 after:rounded-lg after:content-['']"
      >
        {service.ctaLabel}
      </TrackedLink>
    </article>
  );
}
