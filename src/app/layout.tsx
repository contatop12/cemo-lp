import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AttributionCapture } from '@/components/analytics/AttributionCapture';
import { CookieBanner } from '@/components/analytics/CookieBanner';
import { GtmScript } from '@/components/analytics/GtmScript';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { StickyMobileCTA } from '@/components/layout/StickyMobileCTA';
import { SkipLink } from '@/components/ui/SkipLink';
import { content } from '@/content';
import { getSiteEnv, getSiteUrl } from '@/lib/env';
import { atkinson, manrope } from './fonts';
import './globals.css';

// SITE_ENV é lido no build: staging nunca é indexado.
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  robots: getSiteEnv() === 'production' ? { index: true, follow: true } : { index: false, follow: false },
};

// #app-root envolve cabeçalho, conteúdo e rodapé: o diálogo do menu mobile (portal) aplica `inert` nele.
export default async function RootLayout({ children }: { children: ReactNode }) {
  const [settings, navigation] = await Promise.all([content.getSiteSettings(), content.getNavigation()]);
  const technicalResponsible = await content.getDoctorBySlug(settings.technicalResponsibleSlug);

  return (
    <html lang="pt-BR" className={`${manrope.variable} ${atkinson.variable}`}>
      <body>
        <GtmScript />
        <SkipLink />
        <AttributionCapture />
        <div id="app-root">
          <Header settings={settings} navigation={navigation} />
          <main id="conteudo" tabIndex={-1}>
            {children}
          </main>
          <Footer settings={settings} navigation={navigation} technicalResponsible={technicalResponsible} />
        </div>
        <StickyMobileCTA settings={settings} />
        <CookieBanner />
      </body>
    </html>
  );
}
