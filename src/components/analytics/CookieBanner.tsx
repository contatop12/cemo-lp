'use client';

import Link from 'next/link';
import { useEffect, useSyncExternalStore } from 'react';
import { CONSENT_CHANGE_EVENT, readConsent, writeConsent, type ConsentChoice } from '@/lib/analytics/consent';

// "Aceitar" e "Recusar" com o mesmo peso visual (sem dark pattern). Enquanto a escolha está pendente,
// html[data-consent="pending"] esconde o StickyMobileCTA para os dois nunca disputarem a base da tela.
const choiceButton =
  'min-h-[3.25rem] min-w-[8rem] rounded-md border-2 border-papel bg-papel px-6 py-3 text-ui font-bold text-azul-profundo ' +
  'transition-colors duration-[var(--duration-fast)] hover:bg-nevoa-2';

const CHANGE_EVENT = CONSENT_CHANGE_EVENT;

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

// No servidor e na hidratação: 'unknown' (banner não renderiza, sem divergência de HTML).
const getServerSnapshot = (): ConsentChoice | 'pending' | 'unknown' => 'unknown';
const getSnapshot = (): ConsentChoice | 'pending' => readConsent() ?? 'pending';

export function CookieBanner() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (consent === 'granted' || consent === 'denied') writeConsent(consent); // reaplica no GTM
    else if (consent === 'pending') document.documentElement.dataset.consent = 'pending';
  }, [consent]);

  function choose(choice: ConsentChoice) {
    writeConsent(choice);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  if (consent !== 'pending') return null;

  return (
    <section
      aria-label="Aviso de cookies"
      className="on-dark fixed inset-x-0 bottom-0 z-50 border-t-4 border-verde-cemo bg-azul-profundo text-papel shadow-3"
    >
      <div className="mx-auto flex max-w-site flex-col gap-4 px-[var(--gutter)] py-5 md:flex-row md:items-center md:justify-between">
        <p className="text-small text-texto-escuro-suave md:max-w-[44rem]">
          Usamos cookies para medir o uso do site e melhorar o atendimento. Nenhum dado de saúde é compartilhado. Veja a{' '}
          <Link href="/cookies/" className="font-bold text-ciano-claro underline underline-offset-[3px]">
            política de cookies
          </Link>
          .
        </p>
        <div className="flex gap-3">
          <button type="button" className={choiceButton} onClick={() => choose('denied')}>
            Recusar
          </button>
          <button type="button" className={choiceButton} onClick={() => choose('granted')}>
            Aceitar
          </button>
        </div>
      </div>
    </section>
  );
}
