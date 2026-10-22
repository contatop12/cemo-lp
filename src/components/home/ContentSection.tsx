import Link from 'next/link';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { Section } from '@/components/ui/Section';
import type { ArticleLink } from '@/content/types';

export function ContentSection({ articles }: { articles: ArticleLink[] }) {
  return (
    <Section id="conteudos" labelledBy="conteudos-titulo">
      <div className="mx-auto max-w-wide px-[var(--gutter)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="conteudos-titulo" className="text-h2">
            Para cuidar da visão no dia a dia
          </h2>
          <Link href="/blog/" className="inline-flex min-h-12 items-center font-bold text-azul-700 underline underline-offset-[3px]">
            Ver todos os conteúdos
          </Link>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
