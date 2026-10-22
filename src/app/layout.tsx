import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SkipLink } from '@/components/ui/SkipLink';
import { getSiteEnv, getSiteUrl } from '@/lib/env';
import { atkinson, literata } from './fonts';
import './globals.css';

// SITE_ENV é lido no build: staging nunca é indexado.
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  robots: getSiteEnv() === 'production' ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${literata.variable} ${atkinson.variable}`}>
      <body>
        <SkipLink />
        <main id="conteudo" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
