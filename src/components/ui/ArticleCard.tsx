import Link from 'next/link';
import type { ArticleLink } from '@/content/types';

// Card inteiro clicável por um único link (::after).
export function ArticleCard({ article }: { article: ArticleLink }) {
  const date = new Date(`${article.publishedAt}T12:00:00`).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <article className="relative flex h-full flex-col rounded-lg border border-borda bg-papel p-6 transition-shadow duration-[var(--duration-base)] focus-within:shadow-2 hover:shadow-2">
      <p className="text-small text-tinta-suave">
        <time dateTime={article.publishedAt}>{date}</time>
      </p>
      <h3 className="mt-2 text-h4">
        <Link
          href={article.href}
          className="text-tinta no-underline after:absolute after:inset-0 after:rounded-lg after:content-[''] hover:text-azul-700 hover:underline"
        >
          {article.title}
        </Link>
      </h3>
      {article.excerpt ? <p className="mt-3 text-tinta-suave">{article.excerpt}</p> : null}
    </article>
  );
}
