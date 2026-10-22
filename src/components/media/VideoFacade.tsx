'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ImageAsset } from '@/content/types';

// Nenhum player carrega antes do clique (performance + privacidade: youtube-nocookie).
export function VideoFacade({ title, youtubeId, poster }: { title: string; youtubeId: string; poster: ImageAsset | null }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-lg bg-azul-profundo">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?autoplay=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-lg bg-azul-profundo"
    >
      {poster ? (
        <Image src={poster.src} alt="" width={poster.width} height={poster.height} sizes="(min-width: 1024px) 60rem, 100vw" className="absolute inset-0 h-full w-full object-cover" />
      ) : null}
      <span className="absolute left-1/2 top-1/2 flex size-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-papel text-azul-cemo shadow-3 transition-transform duration-[var(--duration-fast)] group-hover:scale-105">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span className="sr-only">Assistir: {title}</span>
    </button>
  );
}
