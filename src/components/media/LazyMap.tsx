'use client';

import { useState } from 'react';

// Prévia estática local (nenhuma requisição externa); o mapa do Google só carrega quando a pessoa pede.
export function LazyMap({ embedSrc, title, address }: { embedSrc: string; title: string; address: string }) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-borda lg:aspect-auto lg:h-full lg:min-h-[24rem]">
        <iframe src={embedSrc} title={title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" />
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[4/3] flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border border-borda bg-nevoa p-6 text-center lg:aspect-auto lg:h-full lg:min-h-[24rem]">
      <svg viewBox="0 0 48 48" width="56" height="56" aria-hidden="true" className="text-azul-cemo">
        <path d="M24 4c-7.7 0-14 6.1-14 13.7C10 28 24 44 24 44s14-16 14-26.3C38 10.1 31.7 4 24 4Zm0 19a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z" fill="currentColor" />
      </svg>
      <p className="max-w-[28ch] font-medium">{address}</p>
      <button
        type="button"
        onClick={() => setActive(true)}
        className="inline-flex min-h-12 items-center rounded-md border-2 border-azul-cemo bg-papel px-5 font-bold text-azul-700 hover:bg-nevoa-2"
      >
        Carregar mapa interativo
      </button>
    </div>
  );
}
