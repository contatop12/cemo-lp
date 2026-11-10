'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useSyncExternalStore } from 'react';
import { CONSENT_CHANGE_EVENT, readConsent } from '@/lib/analytics/consent';

// Pixel da Meta que o WordPress carregava fora do GTM (o outro pixel da CEMO segue dentro do GTM).
// Só carrega com consentimento de cookies de publicidade; "trackSingle" para o PageView não duplicar no
// pixel do GTM, que divide o mesmo fbq.
type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push?: Fbq;
  loaded?: boolean;
  version?: string;
};
type FbqWindow = Window & { fbq?: Fbq; _fbq?: Fbq };

const FBEVENTS = 'https://connect.facebook.net/en_US/fbevents.js';
const initialized = new Set<string>();

// Mesmo stub do snippet oficial: enfileira as chamadas até o fbevents.js carregar.
function ensureFbq(): Fbq {
  const w = window as FbqWindow;
  if (!w.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as Fbq;
    fbq.queue = [];
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    w.fbq = fbq;
    if (!w._fbq) w._fbq = fbq;
    const script = document.createElement('script');
    script.async = true;
    script.src = FBEVENTS;
    document.head.appendChild(script);
  }
  return w.fbq;
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
}

export function MetaPixel({ pixelId }: { pixelId: string }) {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribe, readConsent, () => null);
  const granted = useRef(false);

  useEffect(() => {
    if (consent !== 'granted') {
      if (granted.current) (window as FbqWindow).fbq?.('consent', 'revoke');
      granted.current = false;
      return;
    }
    const fbq = ensureFbq();
    if (!granted.current) fbq('consent', 'grant');
    granted.current = true;
    if (!initialized.has(pixelId)) {
      fbq('init', pixelId);
      initialized.add(pixelId);
    }
    fbq('trackSingle', pixelId, 'PageView');
  }, [consent, pathname, pixelId]);

  return null;
}
