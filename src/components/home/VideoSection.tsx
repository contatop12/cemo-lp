import { VideoCard } from '@/components/media/VideoCard';
import { Section } from '@/components/ui/Section';
import type { VideoItem } from '@/content/types';

// "Consultório aberto": vídeos verticais reais do Dr. David, lado a lado no desktop e em faixa rolável no celular.
// Nenhum player carrega antes do clique; transcrição de cada um no HTML.
export function VideoSection({ videos }: { videos: VideoItem[] }) {
  if (videos.length === 0) return null;
  return (
    <Section id="video" labelledBy="video-titulo">
      <div className="mx-auto max-w-wide px-[var(--gutter)]">
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-8">
          <h2 id="video-titulo" className="max-w-[16ch] text-h2 lg:col-span-6">
            Tudo em um lugar só, explicado por quem atende
          </h2>
          <p className="max-w-[48ch] text-lead text-tinta-suave lg:col-span-5 lg:col-start-8 lg:self-end">
            Consulta com o especialista da área e exames no mesmo dia, sem precisar voltar em outra data.
          </p>
        </div>
        <ul className="relative -mx-[var(--gutter)] mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-4 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0">
          {videos.map((video) => (
            <li key={video.id} className="w-[min(78vw,20rem)] shrink-0 snap-start lg:w-auto">
              <VideoCard video={video} location="home_videos" />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
