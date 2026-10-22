import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import type { EquipmentItem } from '@/content/types';
import { cn } from '@/lib/cn';

// Composição editorial (design-system §7.2), não galeria: 1 foto-âncora com marcas de registro e recortes
// de detalhe em proporções diferentes. Os recortes escondem a baixa resolução das fotos atuais.
const DETAIL_SHAPES = ['aspect-square', 'aspect-[4/5]', 'aspect-square'];

function Detail({ item, shape, offset = false }: { item: EquipmentItem; shape: string; offset?: boolean }) {
  return (
    <figure data-detail="" className={cn(offset && 'md:mt-10')}>
      <div className="overflow-hidden rounded-md bg-papel">
        <Image
          src={item.photo.src}
          width={item.photo.width}
          height={item.photo.height}
          alt={item.photo.alt}
          sizes="(min-width: 1024px) 24rem, 45vw"
          className={cn('h-auto w-full object-cover', shape)}
          style={{ objectPosition: item.objectPosition }}
        />
      </div>
      <figcaption className="mt-2 text-small text-tinta-suave">{item.caption}</figcaption>
    </figure>
  );
}

function RegistrationMarks() {
  const mark = 'pointer-events-none absolute size-6 border-azul-cemo';
  return (
    <span aria-hidden="true">
      <span className={cn(mark, 'left-3 top-3 border-l-2 border-t-2')} />
      <span className={cn(mark, 'right-3 top-3 border-r-2 border-t-2')} />
      <span className={cn(mark, 'bottom-3 left-3 border-b-2 border-l-2')} />
      <span className={cn(mark, 'bottom-3 right-3 border-b-2 border-r-2')} />
    </span>
  );
}

export function TechStructure({ items }: { items: EquipmentItem[] }) {
  const [anchor, ...details] = items;
  if (!anchor) return null;
  // Âncora + 2 recortes ao lado; os demais numa faixa abaixo, com alturas diferentes (design-system §7.2).
  const side = details.slice(0, 2);
  const row = details.slice(2);

  return (
    <Section id="estrutura" tone="nevoa" labelledBy="estrutura-titulo" className="radius-lid">
      <div className="mx-auto max-w-wide px-[var(--gutter)]">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="estrutura-titulo" className="text-h2 lg:col-span-6">
            Estrutura própria para exames e diagnóstico
          </h2>
          <p className="max-w-[56ch] text-lead text-tinta-suave lg:col-span-5 lg:col-start-8">
            Consulta, exames e cirurgias acontecem na própria clínica, com equipamentos em salas preparadas para cada etapa do
            seu atendimento.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <figure data-anchor="" className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-lg bg-papel">
              <Image
                src={anchor.photo.src}
                width={anchor.photo.width}
                height={anchor.photo.height}
                alt={anchor.photo.alt}
                sizes="(min-width: 1024px) 44rem, 100vw"
                className="aspect-[3/2] h-auto w-full object-cover"
                style={{ objectPosition: anchor.objectPosition }}
              />
              <RegistrationMarks />
            </div>
            <figcaption className="mt-3 font-medium">{anchor.caption}</figcaption>
          </figure>

          {side.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:grid-cols-1">
              {side.map((item) => (
                <Detail key={item.id} item={item} shape="aspect-[16/10]" />
              ))}
            </div>
          ) : null}
        </div>

        {row.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {row.map((item, i) => (
              <Detail key={item.id} item={item} shape={DETAIL_SHAPES[i % DETAIL_SHAPES.length] ?? 'aspect-square'} offset={i === 1} />
            ))}
          </div>
        ) : null}

        <Link href="/estrutura-e-tecnologia/" className="mt-8 inline-flex min-h-12 items-center font-bold text-azul-700 underline underline-offset-[3px]">
          Conhecer a estrutura da CEMO
        </Link>
      </div>
    </Section>
  );
}
