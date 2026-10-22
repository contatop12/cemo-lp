import { TrackedLink } from '@/components/analytics/TrackedLink';
import type { SiteStats } from '@/content/types';
import { StarIcon } from './icons';

// Avaliação exibida visualmente (sem markup de review autoatribuído). Estrelas são decorativas;
// o rótulo acessível carrega a informação completa.
export function GoogleRating({
  stats,
  reviewsHref,
  location = 'rating',
}: {
  stats: SiteStats;
  reviewsHref: string;
  location?: string;
}) {
  const { display, reviewsLabel } = stats.googleRating;
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <p role="img" aria-label={`Nota ${display} de 5 no Google, ${reviewsLabel}`} className="flex items-center gap-3">
        <span aria-hidden="true" className="font-display text-h2 font-semibold text-tinta">
          {display}
        </span>
        <span aria-hidden="true" className="flex text-[#B07A00]">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} filled className="size-6" />
          ))}
        </span>
        <span aria-hidden="true" className="text-small text-tinta-suave">
          {reviewsLabel}
        </span>
      </p>
      <TrackedLink
        event="reviews_click"
        location={location}
        href={reviewsHref}
        className="inline-flex min-h-12 items-center font-bold text-azul-700 underline underline-offset-[3px]"
      >
        Ver avaliações no Google
      </TrackedLink>
    </div>
  );
}
