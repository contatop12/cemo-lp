'use client';

import { useEffect } from 'react';
import { captureAttribution, safeStorage } from '@/lib/attribution';

// Registra a origem da visita (UTMs, gclid…) na primeira página carregada.
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution({
      href: window.location.href,
      referrer: document.referrer,
      now: new Date(),
      storage: safeStorage(),
    });
  }, []);
  return null;
}
