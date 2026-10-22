'use client';

import { useSyncExternalStore } from 'react';
import type { OpeningHoursSpec } from '@/content/types';
import { isOpenNow } from '@/lib/hours';

// Calculado só no navegador (no servidor e na hidratação não renderiza): evita HTML divergente.
function subscribe(onChange: () => void) {
  const timer = setInterval(onChange, 60_000);
  return () => clearInterval(timer);
}

export function OpenNowBadge({ hours }: { hours: OpeningHoursSpec[] }) {
  const open = useSyncExternalStore(
    subscribe,
    () => isOpenNow(hours, new Date()),
    () => null,
  );
  if (open === null) return null;
  return (
    <span className="inline-flex items-center gap-1.5 font-bold">
      <span aria-hidden="true" className={open ? 'size-2.5 rounded-full bg-verde-cemo' : 'size-2.5 rounded-full bg-texto-escuro-suave'} />
      {open ? 'Aberto agora' : 'Fechado agora'}
    </span>
  );
}
