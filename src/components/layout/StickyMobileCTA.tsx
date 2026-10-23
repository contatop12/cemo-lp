'use client';

import { useCallback, useRef, useSyncExternalStore } from 'react';
import { ScheduleLink } from '@/components/analytics/ScheduleLink';
import { TrackedLink } from '@/components/analytics/TrackedLink';
import { WhatsappIcon } from '@/components/ui/icons';
import type { SiteSettings } from '@/content/types';
import { whatsappHref } from '@/lib/contact';

const HERO_CTA = '[data-hero-cta]';

// Barra inferior só no celular. Aparece quando o CTA do hero sai da tela (ou sempre, se a página não tem hero).
// Enquanto o aviso de cookies está pendente, html[data-consent="pending"] a oculta (globals.css).
export function StickyMobileCTA({ settings }: { settings: SiteSettings }) {
  const heroVisible = useRef(true);

  const subscribe = useCallback((onChange: () => void) => {
    const hero = document.querySelector(HERO_CTA);
    if (!hero || typeof IntersectionObserver === 'undefined') return () => {};
    const observer = new IntersectionObserver((entries) => {
      heroVisible.current = entries.some((e) => e.isIntersecting);
      onChange();
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const visible = useSyncExternalStore(
    subscribe,
    () => !document.querySelector(HERO_CTA) || !heroVisible.current,
    () => false,
  );

  const button = 'inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-md px-4 text-ui font-bold no-underline';

  return (
    <div
      data-sticky-cta=""
      hidden={!visible}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-borda bg-papel px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-3 md:hidden"
    >
      <div className="flex gap-3">
        <TrackedLink event="whatsapp_click" location="sticky_mobile" href={whatsappHref(settings)} className={`${button} bg-whatsapp text-papel`}>
          <WhatsappIcon className="size-5" />
          WhatsApp
        </TrackedLink>
        <ScheduleLink location="sticky_mobile" className={`${button} bg-azul-cemo text-papel`}>
          Agendar
        </ScheduleLink>
      </div>
    </div>
  );
}
