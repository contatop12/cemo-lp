import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import type { EquipmentItem } from '@/content/types';

// Grade de fotos do mesmo tamanho (4:3), alinhadas em linha — a composição com âncora e recortes de tamanhos
// diferentes saiu a pedido do cliente (26/10/2026). O recorte 4:3 ainda disfarça a baixa resolução das fotos atuais.
export function TechStructure({ items }: { items: EquipmentItem[] }) {
  if (items.length === 0) return null;

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

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-3 lg:gap-x-6">
          {items.map((item) => (
            <figure key={item.id} className="min-w-0">
              <div className="overflow-hidden rounded-md bg-papel">
                <Image
                  src={item.photo.src}
                  width={item.photo.width}
                  height={item.photo.height}
                  alt={item.photo.alt}
                  sizes="(min-width: 1024px) 24rem, 45vw"
                  className="aspect-[4/3] h-auto w-full object-cover"
                  style={{ objectPosition: item.objectPosition }}
                />
              </div>
              <figcaption className="mt-2 text-small text-tinta-suave">{item.caption}</figcaption>
            </figure>
          ))}
        </div>

        <Link href="/estrutura-e-tecnologia/" className="mt-8 inline-flex min-h-12 items-center font-bold text-azul-700 underline underline-offset-[3px]">
          Conhecer a estrutura da CEMO
        </Link>
      </div>
    </Section>
  );
}
