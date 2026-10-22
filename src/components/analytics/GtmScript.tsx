import Script from 'next/script';
import { CONSENT_DEFAULT } from '@/lib/analytics/consent';
import { getPublicEnv } from '@/lib/env';

// O default de consentimento é um <script> inline no HTML inicial: roda antes de qualquer tag.
// O loader do GTM só entra se houver ID e depois da hidratação.
export function GtmScript() {
  const { gtmId } = getPublicEnv();
  const consentDefault = JSON.stringify({ ...CONSENT_DEFAULT, wait_for_update: 500 });

  return (
    <>
      <script
        id="consent-default"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',${consentDefault});`,
        }}
      />
      {gtmId ? (
        <Script id="gtm-loader" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});`}
        </Script>
      ) : null}
    </>
  );
}
