import { TrackedLink } from '@/components/analytics/TrackedLink';
import { LazyMap } from '@/components/media/LazyMap';
import { Section } from '@/components/ui/Section';
import type { SiteSettings } from '@/content/types';
import { directionsHref, formatAddress, formatHoursLines, mapsEmbedSrc, telHref } from '@/lib/contact';

export function LocationSection({ settings }: { settings: SiteSettings }) {
  const address = formatAddress(settings);
  return (
    <Section id="localizacao" tone="nevoa" labelledBy="localizacao-titulo">
      <div className="mx-auto grid max-w-wide gap-10 px-[var(--gutter)] lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="localizacao-titulo" className="text-h2">
            Onde estamos
          </h2>
          <p className="mt-4 text-lead">{address}</p>
          <p className="mt-4 max-w-[52ch] text-tinta-suave">
            Em Taboão da Serra, com acesso fácil para quem vem de Embu das Artes, Cotia, Campo Limpo, Vila Sônia e dos
            bairros vizinhos.
          </p>
          <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            {formatHoursLines(settings).map((line) => {
              const [days, time] = line.split(': ');
              return (
                <div key={line} className="contents">
                  <dt className="font-bold">{days}</dt>
                  <dd>{time}</dd>
                </div>
              );
            })}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedLink
              event="directions_click"
              location="localizacao"
              href={directionsHref(settings)}
              className="inline-flex min-h-[3.25rem] items-center rounded-md bg-azul-cemo px-7 py-4 text-ui font-bold text-papel no-underline hover:bg-azul-700"
            >
              Como chegar
            </TrackedLink>
            <TrackedLink
              event="phone_click"
              location="localizacao"
              href={telHref(settings)}
              className="inline-flex min-h-[3.25rem] items-center rounded-md border-2 border-azul-cemo px-7 py-4 text-ui font-bold text-azul-700 no-underline hover:bg-nevoa-2"
            >
              Ligar {settings.phone.display}
            </TrackedLink>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <LazyMap embedSrc={mapsEmbedSrc(settings)} title={`Mapa: ${settings.shortName} em ${settings.address.city}`} address={address} />
        </div>
      </div>
    </Section>
  );
}
