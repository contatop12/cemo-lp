import { TrackedLink } from '@/components/analytics/TrackedLink';
import { Reticle } from '@/components/ui/icons';
import { Section } from '@/components/ui/Section';
import type { EditorialContent } from '@/content/types';

// Grande bloco editorial (Catarata, Refrativa). Texto vem do repositório; pendências de revisão médica
// ficam nos dados (`todos`), nunca na interface.
export function EditorialBlock({ content, tone }: { content: EditorialContent; tone: 'papel' | 'nevoa' }) {
  const titleId = `editorial-${content.id}`;
  return (
    <Section tone={tone} labelledBy={titleId}>
      <div className="mx-auto grid max-w-wide gap-10 px-[var(--gutter)] lg:grid-cols-12">
        <h2 id={titleId} className="text-h2 lg:col-span-5">
          {content.heading}
        </h2>
        <div className="lg:col-span-6 lg:col-start-7">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-5 max-w-[66ch] text-body">
              {paragraph}
            </p>
          ))}
          <ul className="mt-6 flex flex-col gap-3">
            {content.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 font-medium">
                <Reticle className="mt-0.5 size-6 shrink-0 text-azul-cemo" />
                {bullet}
              </li>
            ))}
          </ul>
          <TrackedLink
            event="service_cta_click"
            location={`editorial-${content.id}`}
            href={content.href}
            className="mt-8 inline-flex min-h-[3.25rem] items-center rounded-md border-2 border-azul-cemo px-7 py-4 text-ui font-bold text-azul-700 no-underline hover:bg-nevoa-2"
          >
            {content.ctaLabel}
          </TrackedLink>
        </div>
      </div>
    </Section>
  );
}
