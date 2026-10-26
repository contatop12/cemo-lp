import Link from 'next/link';
import { TrackedLink } from '@/components/analytics/TrackedLink';
import { Reticle } from '@/components/ui/icons';
import { Section } from '@/components/ui/Section';
import type { Service } from '@/content/types';

// Lista de intenções principais em linhas inteiras clicáveis, todas com o mesmo tamanho de título (a "tabela de
// leitura" com tamanhos decrescentes saiu a pedido do cliente, 26/10/2026). A ordem continua sendo a prioridade.

export function ServicesIndex({ services }: { services: Service[] }) {
  return (
    <Section id="especialidades" labelledBy="servicos-titulo">
      <div className="mx-auto grid max-w-wide gap-10 px-[var(--gutter)] lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 id="servicos-titulo" className="max-w-[14ch] text-h2">
              Como podemos cuidar da sua visão?
            </h2>
            <p className="mt-4 max-w-[34ch] text-tinta-suave">
              Da consulta de rotina à cirurgia, com o especialista de cada área e os exames no mesmo lugar.
            </p>
            <Link
              href="/especialidades/"
              className="mt-6 inline-flex min-h-12 items-center font-bold text-azul-700 underline underline-offset-[3px]"
            >
              Ver todas as especialidades
            </Link>
          </div>
        </div>
        <ul aria-label="Especialidades e serviços" className="border-t border-borda lg:col-span-8">
          {services.map((service) => (
            <li key={service.id} className="border-b border-borda">
              <TrackedLink
                event="service_cta_click"
                location="home_services"
                href={service.href}
                className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 py-6 text-tinta no-underline transition-colors duration-[var(--duration-fast)] hover:bg-nevoa focus-visible:bg-nevoa md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_auto] md:px-4"
              >
                <h3 className="font-display text-h3 font-semibold text-tinta group-hover:text-azul-700">
                  {service.title}
                </h3>
                <span className="col-span-2 row-start-2 max-w-[44ch] text-small text-tinta-suave md:col-span-1 md:row-start-auto">
                  {service.summary}
                </span>
                <Reticle className="col-start-2 row-start-1 size-8 text-azul-cemo transition-transform duration-[var(--duration-base)] group-hover:rotate-45 group-focus-visible:rotate-45 md:col-start-3" />
              </TrackedLink>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
