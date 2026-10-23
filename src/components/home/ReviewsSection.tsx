import { TrackedLink } from '@/components/analytics/TrackedLink';
import { StarIcon } from '@/components/ui/icons';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { Section } from '@/components/ui/Section';
import type { SiteStats, Testimonial } from '@/content/types';

// Avaliações reais apenas (sem schema autoatribuído). A nota é o elemento grande; depoimentos entram quando a CEMO
// selecionar avaliações reais do Google (com autorização), nunca reescritos.
export function ReviewsSection({ stats, testimonials, reviewsHref }: { stats: SiteStats; testimonials: Testimonial[]; reviewsHref: string }) {
  const { display, reviewsLabel } = stats.googleRating;
  return (
    <Section id="avaliacoes" tone="nevoa" labelledBy="avaliacoes-titulo">
      <div className="mx-auto grid max-w-wide items-center gap-10 px-[var(--gutter)] lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p role="img" aria-label={`Nota ${display} de 5 no Google, ${reviewsLabel}`} className="flex items-end gap-5">
            <span aria-hidden="true" className="font-display text-[clamp(3.5rem,2.5rem+4vw,6rem)] tracking-[-0.04em] font-semibold leading-[0.85] text-azul-cemo">
              {display}
            </span>
            <span aria-hidden="true" className="flex flex-col gap-2 pb-2">
              <span className="flex text-[#8A5A00]">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} filled className="size-7" />
                ))}
              </span>
              <span className="text-small text-tinta-suave">{reviewsLabel}</span>
            </span>
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <h2 id="avaliacoes-titulo" className="text-h2">
            O que os pacientes dizem sobre a CEMO
          </h2>
          <p className="mt-4 max-w-[52ch] text-lead text-tinta-suave">
            As avaliações são públicas e escritas pelos próprios pacientes no perfil da CEMO no Google. Leia as mais recentes antes de agendar.
          </p>
          <TrackedLink
            event="reviews_click"
            location="reviews"
            href={reviewsHref}
            className="mt-7 inline-flex min-h-12 items-center rounded-full border-2 border-azul-cemo px-6 py-3 text-ui font-bold text-azul-700 no-underline hover:bg-nevoa-2"
          >
            Ver avaliações no Google
          </TrackedLink>
        </div>
        {testimonials.length > 0 ? (
          <ul aria-label="Avaliações de pacientes no Google" className="grid gap-5 md:grid-cols-3 lg:col-span-12">
            {testimonials.map((t) => (
              <li key={t.id}>
                <ReviewCard testimonial={t} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Section>
  );
}
