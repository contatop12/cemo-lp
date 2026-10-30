import Link from 'next/link';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { DoctorCard } from '@/components/ui/DoctorCard';
import type { ArticleLink, Doctor, MedicalReview, SourceRef } from '@/content/types';
import { formatRegistry } from '@/lib/registry';

export interface RelatedLink {
  name: string;
  summary: string;
  href: string;
}

// "Quem atende": médicos da área com link para o perfil (briefing §59: "Quem vai me atender?").
export function RelatedDoctors({ doctors, title = 'Quem atende' }: { doctors: Doctor[]; title?: string }) {
  if (doctors.length === 0) return null;
  return (
    <section id="quem-atende" aria-labelledby="quem-atende-titulo" className="scroll-mt-28">
      <h2 id="quem-atende-titulo" className="text-h2">
        {title}
      </h2>
      <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
        {doctors.map((d) => (
          <li key={d.slug} className="relative">
            <DoctorCard doctor={d} />
          </li>
        ))}
      </ul>
    </section>
  );
}

// Lista de links com resumo (exames, condições, especialidades): uma linha inteira clicável por item.
export function RelatedList({ id, title, items }: { id: string; title: string; items: RelatedLink[] }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby={`${id}-titulo`}>
      <h3 id={`${id}-titulo`} className="text-h4">
        {title}
      </h3>
      <ul className="mt-3 divide-y divide-borda border-y border-borda">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="group flex min-h-14 flex-col justify-center py-3 no-underline">
              <span className="font-bold text-azul-700 group-hover:underline group-hover:underline-offset-[3px]">{item.name}</span>
              <span className="text-small text-tinta-suave">{item.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RelatedArticles({ articles, title = 'Para ler com calma' }: { articles: ArticleLink[]; title?: string }) {
  if (articles.length === 0) return null;
  return (
    <section aria-labelledby="artigos-relacionados-titulo">
      <h2 id="artigos-relacionados-titulo" className="text-h2">
        {title}
      </h2>
      <ul className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((a) => (
          <li key={a.href}>
            <ArticleCard article={a} />
          </li>
        ))}
      </ul>
    </section>
  );
}

const dateFmt = (iso: string) => new Date(`${iso.slice(0, 10)}T12:00:00`).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

// Autoria, revisão e fontes (E-E-A-T). O selo de revisão médica só aparece quando a revisão existe de fato.
export function ReviewNote({ review, reviewer, sources }: { review: MedicalReview; reviewer: Doctor | null; sources: SourceRef[] }) {
  const reviewed = (review.status === 'APPROVED' || review.status === 'PUBLISHED') && reviewer && review.reviewedAt;
  return (
    <aside aria-label="Sobre este conteúdo" className="border-t border-borda pt-6 text-small text-tinta-suave">
      <p>
        Conteúdo escrito pela {review.author.charAt(0).toLowerCase() + review.author.slice(1)}. Atualizado em{' '}
        <time dateTime={review.updatedAt}>{dateFmt(review.updatedAt)}</time>.
      </p>
      {reviewed ? (
        <p className="mt-1">
          Revisão médica:{' '}
          <Link href={reviewer.canonicalPath} className="font-bold text-azul-700 underline underline-offset-[3px]">
            {`${reviewer.honorific} ${reviewer.name}`}
          </Link>
          , {formatRegistry(reviewer)}, em <time dateTime={review.reviewedAt ?? undefined}>{dateFmt(review.reviewedAt ?? '')}</time>.
        </p>
      ) : null}
      <p className="mt-1">As informações desta página não substituem a consulta com o oftalmologista.</p>
      {sources.length > 0 ? (
        <details className="mt-3">
          <summary className="inline-flex min-h-11 cursor-pointer items-center font-bold text-azul-700">Fontes e referências</summary>
          <ul className="mt-2 list-disc pl-5">
            {sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} rel="noopener" className="text-azul-700 underline underline-offset-[3px]">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </aside>
  );
}
