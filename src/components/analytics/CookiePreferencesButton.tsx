'use client';

import { resetConsent } from '@/lib/analytics/consent';

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={resetConsent}
      className="inline-flex min-h-[3.25rem] w-fit items-center rounded-md border-2 border-azul-cemo px-7 py-4 text-ui font-bold text-azul-700 hover:bg-nevoa-2"
    >
      Alterar minhas preferências de cookies
    </button>
  );
}
