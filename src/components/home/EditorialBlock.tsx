import { TrackedLink } from '@/components/analytics/TrackedLink';
import { VideoCard } from '@/components/media/VideoCard';
import { Reticle } from '@/components/ui/icons';
import { Section } from '@/components/ui/Section';
import type { EditorialContent, VideoItem } from '@/content/types';
import { cn } from '@/lib/cn';

// Grande bloco editorial (Catarata, Refrativa). Texto do repositório; com vídeo real do médico ao lado quando houver.
// Pendências de revisão médica ficam nos dados (`todos`), nunca na interface.
export function EditorialBlock({
  content,
  tone,
  video,
  reverse = false,
}: {
  content: EditorialContent;
  tone: 'papel' | 'nevoa';
  video?: VideoItem;
  reverse?: boolean;
}) {
  const titleId = `editorial-${content.id}`;
  return (
    <Section id={content.id} tone={tone} labelledBy={titleId}>
      <div className="mx-auto grid max-w-wide items-center gap-12 px-[var(--gutter)] lg:grid-cols-12 lg:gap-8">
        <div className={cn('lg:col-span-7', reverse && video ? 'lg:order-2 lg:col-start-6' : '')}>
          <h2 id={titleId} className="max-w-[18ch] text-h2">
            {content.heading}
          </h2>
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-5 max-w-[62ch] text-body">
              {paragraph}
            </p>
          ))}
          <ul className="mt-7 flex flex-col gap-3">
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
            className="mt-9 inline-flex min-h-12 items-center rounded-full bg-azul-cemo px-6 py-3 text-ui font-bold text-papel no-underline hover:bg-azul-700"
          >
            {content.ctaLabel}
          </TrackedLink>
        </div>
        {video ? (
          <div className={cn('mx-auto w-full max-w-[20rem] lg:col-span-4', reverse ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-9')}>
            <VideoCard video={video} location={`editorial-${content.id}`} sizes="(min-width: 1024px) 20rem, 80vw" />
          </div>
        ) : null}
      </div>
    </Section>
  );
}
