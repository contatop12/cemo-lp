import type { ReactNode } from 'react';
import { Breadcrumbs } from './Breadcrumbs';

export function LegalPage({ title, path, updatedNote, children }: { title: string; path: string; updatedNote: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-prose px-[var(--gutter)] py-[var(--space-section)]">
      <Breadcrumbs
        items={[
          { name: 'Início', path: '/' },
          { name: title, path },
        ]}
      />
      <h1 className="mt-6 text-h1">{title}</h1>
      <p role="note" className="mt-6 rounded-md border-l-4 border-aviso bg-nevoa p-4 text-small">
        Versão preliminar, em revisão jurídica. {updatedNote}
      </p>
      <div className="legal-content mt-8 flex flex-col gap-4 [&_h2]:mt-6 [&_h2]:text-h3 [&_li]:ml-6 [&_li]:list-disc">{children}</div>
    </div>
  );
}
