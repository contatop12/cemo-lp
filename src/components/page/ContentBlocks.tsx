import { Reticle } from '@/components/ui/icons';
import type { FaqItem, JourneyStep, OptionItem, ProseSection } from '@/content/types';

// Blocos de texto das páginas de conteúdo médico. Todos server components: o texto inteiro está no HTML inicial.

export function DirectAnswer({ id = 'resposta', question, text }: { id?: string; question: string; text: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="scroll-mt-28 rounded-lg border-l-4 border-azul-cemo bg-nevoa px-6 py-6 sm:px-8">
      <h2 id={`${id}-titulo`} className="text-h3">
        {question}
      </h2>
      <p className="mt-3 max-w-[66ch] text-lead">{text}</p>
    </section>
  );
}

const SIGNS_DISCLAIMER = 'Esses sinais podem estar associados a diferentes condições e precisam de avaliação oftalmológica.';

export function SignsBlock({ id = 'sinais', title, intro, items }: { id?: string; title: string; intro: string; items: string[] }) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="scroll-mt-28">
      <h2 id={`${id}-titulo`} className="text-h2">
        {title}
      </h2>
      <p className="mt-4 max-w-[66ch]">{intro}</p>
      <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Reticle className="mt-0.5 size-6 shrink-0 text-azul-cemo" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-[66ch] text-small text-tinta-suave">{SIGNS_DISCLAIMER}</p>
    </section>
  );
}

export function ProseBlock({ section }: { section: ProseSection }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-titulo`} className="scroll-mt-28">
      <h2 id={`${section.id}-titulo`} className="text-h2">
        {section.title}
      </h2>
      {section.paragraphs.map((p) => (
        <p key={p} className="mt-4 max-w-[66ch]">
          {p}
        </p>
      ))}
      {section.bullets?.length ? (
        <ul className="mt-5 flex max-w-[66ch] flex-col gap-2">
          {section.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-azul-cemo" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function JourneyBlock({ id = 'jornada', title, intro, steps }: { id?: string; title: string; intro?: string; steps: JourneyStep[] }) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="scroll-mt-28">
      <h2 id={`${id}-titulo`} className="text-h2">
        {title}
      </h2>
      {intro ? <p className="mt-4 max-w-[66ch]">{intro}</p> : null}
      {/* Etapas reais, em ordem: aqui a numeração é informação. */}
      <ol className="mt-8 flex flex-col">
        {steps.map((step, i) => (
          <li key={step.title} className="relative grid grid-cols-[3rem_1fr] gap-x-5 pb-8 last:pb-0">
            {i < steps.length - 1 ? <span aria-hidden="true" className="absolute left-6 top-12 h-[calc(100%-3rem)] w-px bg-borda" /> : null}
            <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-full border-2 border-azul-cemo font-display text-h4 font-semibold text-azul-cemo">
              {i + 1}
            </span>
            <div className="pt-2">
              <h3 className="text-h4">{step.title}</h3>
              <p className="mt-2 max-w-[60ch] text-tinta-suave">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function OptionsBlock({ id = 'opcoes', title, intro, items, note }: { id?: string; title: string; intro: string; items: OptionItem[]; note?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="scroll-mt-28">
      <h2 id={`${id}-titulo`} className="text-h2">
        {title}
      </h2>
      <p className="mt-4 max-w-[66ch]">{intro}</p>
      <dl className="mt-7 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.name} className="rounded-lg border border-borda bg-papel p-5">
            <dt className="font-display text-h4 font-semibold text-tinta">{item.name}</dt>
            <dd className="mt-2 text-tinta-suave">{item.text}</dd>
          </div>
        ))}
      </dl>
      {note ? <p className="mt-5 max-w-[66ch] text-small text-tinta-suave">{note}</p> : null}
    </section>
  );
}

export function FaqBlock({ id = 'perguntas-frequentes', items, title = 'Perguntas frequentes' }: { id?: string; items: FaqItem[]; title?: string }) {
  if (items.length === 0) return null;
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="scroll-mt-28">
      <h2 id={`${id}-titulo`} className="text-h2">
        {title}
      </h2>
      <div className="mt-6 divide-y divide-borda border-y border-borda">
        {items.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-bold text-tinta [&::-webkit-details-marker]:hidden">
              <h3 className="text-ui font-bold">{item.question}</h3>
              <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" className="shrink-0 text-azul-cemo transition-transform duration-[var(--duration-fast)] group-open:rotate-45">
                <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </summary>
            <div className="pb-5">
              {item.answer.map((p) => (
                <p key={p} className="mt-2 max-w-[66ch] first:mt-0">
                  {p}
                </p>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

/** Índice "Nesta página": âncoras para as seções, fixo ao lado no desktop. */
export function OnThisPage({ items }: { items: Array<{ id: string; label: string }> }) {
  if (items.length < 3) return null;
  return (
    <nav aria-label="Nesta página" className="lg:sticky lg:top-32">
      <p className="text-small font-bold text-tinta">Nesta página</p>
      <ul className="mt-3 border-l border-borda">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="-ml-px flex min-h-11 items-center border-l-2 border-transparent pl-4 text-small text-tinta-suave no-underline hover:border-azul-cemo hover:text-azul-700">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
