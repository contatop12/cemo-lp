import { getImageProps } from 'next/image';
import { preload } from 'react-dom';
import { TrackedLink } from '@/components/analytics/TrackedLink';
import { Reticle } from '@/components/ui/icons';
import type { ImageAsset } from '@/content/types';

export interface HeroProps {
  eyebrow: string;
  headline: string;
  lead: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  proof: Array<{ id: string; text: string }>;
  doctor: { name: string; role: string; crm: string; image: ImageAsset; mobileImage: ImageAsset };
}

const DESKTOP_MEDIA = '(min-width: 1024px)';
const MOBILE_MEDIA = '(max-width: 1023.98px)';

// "O médico em escala, o olho como mira" (docs/design-system.md §9). A mira é motivo de marca sobre o
// fundo do painel — nunca sobre o rosto (centrada na cabeça leria como mira de arma). A foto é o LCP: <picture> com o
// original no desktop e o recorte 4:5 no celular, ambos pré-carregados com prioridade alta e nunca animados.
export function Hero({ eyebrow, headline, lead, primaryCta, secondaryCta, proof, doctor }: HeroProps) {
  const desktop = getImageProps({
    src: doctor.image.src,
    width: doctor.image.width,
    height: doctor.image.height,
    alt: doctor.image.alt,
    sizes: '(min-width: 1280px) 620px, 50vw',
  }).props;
  const mobile = getImageProps({
    src: doctor.mobileImage.src,
    width: doctor.mobileImage.width,
    height: doctor.mobileImage.height,
    alt: doctor.image.alt,
    sizes: '100vw',
    loading: 'eager',
    fetchPriority: 'high',
  }).props;

  preload(desktop.src, { as: 'image', imageSrcSet: desktop.srcSet, imageSizes: desktop.sizes, fetchPriority: 'high', media: DESKTOP_MEDIA });
  preload(mobile.src, { as: 'image', imageSrcSet: mobile.srcSet, imageSizes: mobile.sizes, fetchPriority: 'high', media: MOBILE_MEDIA });

  const roleLine = `${doctor.role} · ${doctor.crm}`;

  return (
    <section aria-labelledby="hero-title" className="hero relative overflow-hidden bg-papel">
      {/* Painel-pálpebra com a foto: no celular vem primeiro; no desktop sangra à direita. */}
      <div className="hero-panel relative bg-estudio lg:absolute lg:inset-y-0 lg:left-[52%] lg:right-0 lg:radius-lid">
        <div className="hero-photo-box relative mx-auto aspect-[4/5] h-[min(32svh,300px)] lg:absolute lg:bottom-0 lg:left-1/2 lg:aspect-[853/1280] lg:h-full lg:max-h-[56rem] lg:-translate-x-1/2">
          <picture>
            <source media={DESKTOP_MEDIA} srcSet={desktop.srcSet} sizes={desktop.sizes} width={doctor.image.width} height={doctor.image.height} />
            {/* eslint-disable-next-line jsx-a11y/alt-text -- alt vem de getImageProps */}
            <img {...mobile} className="hero-photo absolute inset-0 h-full w-full object-cover object-[50%_4%] lg:object-[50%_8%]" />
          </picture>
          <Reticle
            data-reticle=""
            className="pointer-events-none absolute left-[11%] top-[19%] hidden h-auto w-[20%] -translate-x-1/2 -translate-y-1/2 text-azul-cemo lg:block"
          />
        </div>
        {/* Arco-pálpebra na base da foto (só celular). */}
        <svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-x-0 bottom-0 h-6 w-full text-papel lg:hidden">
          <path d="M0 0 Q50 20 100 0 L100 10 L0 10 Z" fill="currentColor" />
        </svg>
        <div className="absolute bottom-8 left-1/2 hidden w-[min(22rem,80%)] -translate-x-1/2 rounded-md bg-papel px-5 py-4 shadow-2 lg:block">
          <p className="font-display text-h4 font-semibold text-tinta">{doctor.name}</p>
          <p className="mt-1 text-small text-tinta-suave">{roleLine}</p>
        </div>
      </div>

      <div className="relative mx-auto max-w-wide px-[var(--gutter)] lg:flex lg:min-h-[clamp(640px,calc(100svh-120px),820px)] lg:items-center">
        <div className="animate-hero-rise relative z-10 pb-10 pt-3 lg:w-[58%] lg:py-16">
          <div className="lg:hidden">
            <p className="font-display text-h4 font-semibold text-tinta">{doctor.name}</p>
            <p className="text-small text-tinta-suave">{roleLine}</p>
          </div>
          <p className="hidden text-small font-bold uppercase tracking-[0.08em] text-azul-700 lg:block">{eyebrow}</p>
          <h1 id="hero-title" className="mt-4 max-w-[14ch] text-h1 lg:mt-3 lg:text-display">
            {headline}
          </h1>
          <p className="mt-3 max-w-[56ch] text-body text-tinta-suave lg:mt-5 lg:max-w-[44ch] lg:text-lead">{lead}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-8">
            <TrackedLink
              event="schedule_click"
              location="hero"
              href={primaryCta.href}
              data-hero-cta=""
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-md bg-azul-cemo px-7 py-4 text-ui font-bold text-papel no-underline hover:bg-azul-700"
            >
              {primaryCta.label}
            </TrackedLink>
            <a
              href={secondaryCta.href}
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-md border-2 border-azul-cemo px-7 py-4 text-ui font-bold text-azul-700 no-underline hover:bg-nevoa-2"
            >
              {secondaryCta.label}
            </a>
          </div>
          {proof.length > 0 ? (
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-medium text-tinta">
              {proof.map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-2 rounded-full bg-verde-cemo" />
                  {item.text}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
