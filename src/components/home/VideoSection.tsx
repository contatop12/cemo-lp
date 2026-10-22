import { VideoFacade } from '@/components/media/VideoFacade';
import { Section } from '@/components/ui/Section';
import type { VideoItem } from '@/content/types';

// Omitida por inteiro até o vídeo ser publicado (nada de "em breve" na Home).
export function VideoSection({ video }: { video: VideoItem }) {
  if (!video.youtubeId) return null;
  return (
    <Section id="video" labelledBy="video-titulo">
      <div className="mx-auto max-w-site px-[var(--gutter)]">
        <h2 id="video-titulo" className="text-h2">
          {video.title}
        </h2>
        <div className="mt-8">
          <VideoFacade title={video.title} youtubeId={video.youtubeId} poster={video.poster} />
        </div>
      </div>
    </Section>
  );
}
