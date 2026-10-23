import type { VideoItem } from '@/content/types';
import { cn } from '@/lib/cn';
import { VideoPlayer } from './VideoPlayer';

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m === 0 ? `${s} s` : `${m} min ${String(s).padStart(2, '0')} s`;
}

// Vídeo real da CEMO: player sob demanda + quem fala + transcrição no HTML (acessibilidade e semântica, §67).
export function VideoCard({
  video,
  location,
  className,
  sizes = '(min-width: 1024px) 22rem, 80vw',
  headingLevel = 3,
}: {
  video: VideoItem;
  location: string;
  className?: string;
  sizes?: string;
  headingLevel?: 3 | 4;
}) {
  const Heading = headingLevel === 3 ? 'h3' : 'h4';
  return (
    <figure className={cn('relative flex flex-col', className)}>
      <VideoPlayer video={video} location={location} sizes={sizes} />
      <figcaption className="mt-4">
        <Heading className="font-display text-h4 font-semibold text-tinta">{video.title}</Heading>
        <p className="mt-1 text-small text-tinta-suave">
          <span>{video.speakerName}</span>
          <span aria-hidden="true">, </span>
          <span className="sr-only">. Duração: </span>
          <span>{formatDuration(video.durationSeconds)}</span>
        </p>
      </figcaption>
      <details className="group mt-3 rounded-md border border-borda bg-papel">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 font-bold text-azul-700 [&::-webkit-details-marker]:hidden">
          Ler a transcrição
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" className="shrink-0 transition-transform group-open:rotate-180">
            <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>
        <div className="px-4 pb-4 text-small text-tinta">
          {video.transcript.map((p) => (
            <p key={p} className="mt-3 first:mt-0">
              {p}
            </p>
          ))}
        </div>
      </details>
    </figure>
  );
}
