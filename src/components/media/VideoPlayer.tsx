'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { track } from '@/lib/analytics/events';
import type { VideoItem } from '@/content/types';

/** Só o que o player precisa: notas internas e transcrição ficam fora do payload enviado ao navegador. */
export type PlayerVideo = Pick<VideoItem, 'title' | 'src' | 'srcAv1' | 'poster' | 'orientation' | 'captionsSrc'>;

// Fachada: só pôster e botão até o clique; aí o <video> nativo entra com autoplay, controles e legenda.
// Nenhum byte do vídeo é baixado antes da intenção do usuário (briefing §65/§109).
export function VideoPlayer({ video, location, sizes }: { video: PlayerVideo; location: string; sizes: string }) {
  const [playing, setPlaying] = useState(false);
  const player = useRef<HTMLVideoElement>(null);
  // O botão sai do DOM ao virar player: o foco vai para o vídeo, não para o <body>.
  useEffect(() => {
    if (playing) player.current?.focus();
  }, [playing]);
  const aspect = video.orientation === 'vertical' ? 'aspect-[9/16]' : 'aspect-video';

  if (playing) {
    return (
      <div className={`relative overflow-hidden rounded-lg bg-azul-profundo ${aspect}`}>
        <video
          ref={player}
          aria-label={video.title}
          tabIndex={0}
          poster={video.poster.src}
          controls
          autoPlay
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          {/* AV1 primeiro (menor); quem não toca AV1 (Safari antigo, iPhone sem decodificador) cai no H.264. */}
          <source src={video.srcAv1} type='video/webm; codecs="av01.0.04M.08, opus"' />
          <source src={video.src} type='video/mp4; codecs="avc1.640028, mp4a.40.2"' />
          {video.captionsSrc ? <track kind="captions" src={video.captionsSrc} srcLang="pt-BR" label="Português" default /> : null}
        </video>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        track('video_play', { location });
        setPlaying(true);
      }}
      className={`group relative block w-full overflow-hidden rounded-lg bg-azul-profundo ${aspect}`}
    >
      <Image
        src={video.poster.src}
        alt=""
        width={video.poster.width}
        height={video.poster.height}
        sizes={sizes}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-azul-profundo/70 to-transparent" />
      <span className="absolute bottom-5 left-5 flex size-16 items-center justify-center rounded-full bg-papel text-azul-cemo shadow-3 transition-transform duration-[var(--duration-fast)] group-hover:scale-105">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span className="sr-only">Assistir: {video.title}</span>
    </button>
  );
}
