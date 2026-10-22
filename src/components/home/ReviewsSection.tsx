import { GoogleRating } from '@/components/ui/GoogleRating';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { Section } from '@/components/ui/Section';
import type { SiteStats, Testimonial } from '@/content/types';

// Avaliações reais apenas; sem depoimentos selecionados, mostra a nota e o caminho para o Google.
export function ReviewsSection({ stats, testimonials, reviewsHref }: { stats: SiteStats; testimonials: Testimonial[]; reviewsHref: string }) {
  return (
    <Section id="avaliacoes" tone="nevoa" labelledBy="avaliacoes-titulo">
      <div className="mx-auto max-w-wide px-[var(--gutter)]">
        <h2 id="avaliacoes-titulo" className="text-h2">
          O que os pacientes dizem sobre a CEMO
        </h2>
        <div className="mt-6">
          <GoogleRating stats={stats} reviewsHref={reviewsHref} location="reviews" />
        </div>
        {testimonials.length > 0 ? (
          <ul aria-label="Avaliações de pacientes no Google" className="mt-10 grid gap-5 md:grid-cols-3">
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
