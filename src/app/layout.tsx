import type { ReactNode } from 'react';
import { SkipLink } from '@/components/ui/SkipLink';
import { atkinson, literata } from './fonts';
import './globals.css';

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
