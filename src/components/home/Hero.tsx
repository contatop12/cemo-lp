import type { CSSProperties } from 'react';
import { getImageProps } from 'next/image';
import { preload } from 'react-dom';
import { TrackedLink } from '@/components/analytics/TrackedLink';
import type { ImageAsset } from '@/content/types';

export interface HeroProps {
  kicker: string;
  headline: string;
  lead: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  proof: Array<{ id: string; value: string; label: string }>;
  /** registry: CRM e RQE já formatados (formatRegistry). */
  doctor: { name: string; role: string; registry: string; image: ImageAsset };
}

// "Lente de prova" (docs/superpowers/plans/2026-10-22-cemo-fase-2-ecossistema.md, Design v2): o Dr. David, recortado do
// fundo de estúdio, diante dos anéis de Plácido (topografia de córnea) e do arco graduado 0°–180° das armações de prova.
// Os anéis se desenham uma vez no carregamento; a foto é o LCP e nunca anima.
export function Hero({ kicker, headline, lead, primaryCta, secondaryCta, proof, doctor }: HeroProps) {
  const image = getImageProps({
    src: doctor.image.src,
    width: doctor.image.width,
    height: doctor.image.height,
    alt: doctor.image.alt,
    sizes: '(min-width: 1024px) 40rem, 90vw',
    loading: 'eager',
    fetchPriority: 'high',
  }).props;
  preload(image.src, { as: 'image', imageSrcSet: image.srcSet, imageSizes: image.sizes, fetchPriority: 'high' });

  return (
    <section id="inicio" aria-labelledby="hero-title" className="hero relative overflow-hidden bg-papel">
      <div className="relative mx-auto grid max-w-wide px-[var(--gutter)] lg:min-h-[clamp(640px,calc(100svh-8rem),840px)] lg:grid-cols-12 lg:gap-x-8">
        <div className="relative z-10 pb-10 pt-4 lg:col-span-6 lg:self-center lg:py-16">
          {/* Celular: quem é o médico da foto vem logo abaixo dela (o cartão sobre a foto cobriria o rosto). */}
          <p className="text-small text-tinta-suave lg:hidden">
            <strong className="font-bold text-tinta">{doctor.name}</strong>
            <br />
            {doctor.role}, {doctor.registry}
          </p>
          <p className="hidden text-ui font-bold text-azul-700 lg:block">{kicker}</p>
          <h1 id="hero-title" className="mt-4 max-w-[13ch] text-h1 lg:mt-3 lg:text-display">
            {headline}
          </h1>
          <p className="mt-4 max-w-[46ch] text-body text-tinta-suave lg:mt-6 lg:text-lead">{lead}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-9">
            <TrackedLink
              event="schedule_click"
              location="hero"
              href={primaryCta.href}
              data-hero-cta=""
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-azul-cemo px-6 py-3 text-ui font-bold text-papel no-underline hover:bg-azul-700"
            >
              {primaryCta.label}
            </TrackedLink>
            <a
              href={secondaryCta.href}
              className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-azul-cemo px-6 py-3 text-ui font-bold text-azul-700 no-underline hover:bg-nevoa-2"
            >
              {secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="hero-visual relative order-first -mx-[var(--gutter)] h-[min(40svh,20rem)] overflow-hidden bg-nevoa sm:h-[26rem] lg:order-none lg:col-span-6 lg:mx-0 lg:h-auto lg:overflow-visible lg:bg-transparent">
          <Lens className="absolute left-1/2 top-[3%] w-[min(38rem,125%)] -translate-x-[48%] lg:top-[5%] lg:w-[min(46rem,118%)] lg:-translate-x-1/2" />
          {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element -- otimizado via getImageProps; alt vem dele */}
          <img
            {...image}
            className="absolute left-1/2 top-[2%] h-[200%] w-auto max-w-none -translate-x-[40%] sm:h-[190%] lg:top-[3%] lg:h-[124%] lg:-translate-x-1/2"
          />
          {/* Arco-pálpebra na base do visual (só celular). */}
          <svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-x-0 bottom-0 h-6 w-full text-papel lg:hidden">
            <path d="M0 0 Q50 20 100 0 L100 10 L0 10 Z" fill="currentColor" />
          </svg>
          <div
            data-testid="hero-doctor-card"
            className="absolute bottom-12 left-[2%] hidden max-w-[19rem] rounded-md bg-papel/95 px-5 py-4 shadow-2 lg:block"
          >
            <p className="font-display text-h4 font-semibold leading-snug text-tinta">{doctor.name}</p>
            <p className="mt-1 text-small font-bold text-azul-700">{doctor.role}</p>
            <p className="text-small text-tinta-suave">{doctor.registry}</p>
          </div>
        </div>
      </div>

      {proof.length > 0 ? (
        <div className="relative border-t border-borda bg-papel">
          <ul aria-label="Números do CEMO" className="mx-auto grid max-w-wide grid-cols-2 px-[var(--gutter)] sm:grid-cols-3">
            {proof.map((item) => (
              <li key={item.id} className="flex items-baseline gap-3 border-borda py-5 max-sm:last:odd:col-span-2 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0">
                <span className="font-display text-h3 font-semibold text-azul-cemo">{item.value}</span>
                <span className="text-small leading-snug text-tinta-suave">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

const RINGS = 9;
const R = 280;

// Anéis de Plácido (mais próximos na periferia, como o reflexo na córnea) + escala TABO 0°–180° no semicírculo
// superior. Puramente decorativo.
function Lens({ className }: { className?: string }) {
  const rings = Array.from({ length: RINGS }, (_, i) => Math.round(R * ((i + 1) / RINGS) ** 0.72));
  const ticks = Array.from({ length: 37 }, (_, i) => i * 5);
  const point = (deg: number, r: number) => {
    const a = (deg * Math.PI) / 180;
    return [300 + r * Math.cos(a), 300 - r * Math.sin(a)] as const;
  };
  return (
    <svg data-lens="" viewBox="-80 -40 760 660" aria-hidden="true" focusable="false" className={className}>
      <circle cx="300" cy="300" r={R} className="fill-nevoa-2" />
      {rings.map((r, i) => (
        <circle
          key={r}
          data-ring=""
          cx="300"
          cy="300"
          r={r}
          pathLength={1}
          fill="none"
          className="lens-ring stroke-azul-cemo"
          strokeOpacity={0.14 + i * 0.025}
          strokeWidth={1.25}
          style={{ '--i': i } as CSSProperties}
        />
      ))}
      <g className="stroke-azul-cemo" strokeWidth={1.25} strokeOpacity={0.55}>
        {ticks.map((deg) => {
          const major = deg % 30 === 0;
          const [x1, y1] = point(deg, R + 8);
          const [x2, y2] = point(deg, R + (major ? 26 : 16));
          return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      <g className="fill-tinta-suave" fontSize="17" fontFamily="var(--font-sans)" textAnchor="middle">
        {[0, 90, 180].map((deg) => {
          const [x, y] = point(deg, R + 44);
          return (
            <text key={deg} x={x} y={y + 6}>
              {deg}°
            </text>
          );
        })}
      </g>
    </svg>
  );
}
