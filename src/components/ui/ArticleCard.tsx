import Image from 'next/image';
import Link from 'next/link';
import type { ArticleLink } from '@/content/types';

// Card inteiro clicável por um único link (::after). Imagem do post quando existe (lazy, abaixo da dobra).
export function ArticleCard({ article, headingLevel = 3 }: { article: ArticleLink; headingLevel?: 2 | 3 }) {
  const date = new Date(`${article.publishedAt}T12:00:00`).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-lg border border-borda bg-papel transition-shadow duration-[var(--duration-base)] focus-within:shadow-2 hover:shadow-2">
      {article.image ? (
        <Image
          src={article.image.src}
          alt=""
          width={article.image.width}
          height={article.image.height}
          sizes="(min-width: 1280px) 24rem, (min-width: 768px) 45vw, 90vw"
          className="aspect-[16/9] h-auto w-full object-cover"
        />
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-small text-tinta-suave">
          <time dateTime={article.publishedAt}>{date}</time>
        </p>
        <Heading className="mt-2 text-h4">
          <Link
            href={article.href}
            className="text-tinta no-underline after:absolute after:inset-0 after:rounded-lg after:content-[''] hover:text-azul-700 hover:underline"
          >
            {article.title}
          </Link>
        </Heading>
        {article.excerpt ? <p className="mt-3 line-clamp-3 text-tinta-suave">{article.excerpt}</p> : null}
      </div>
    </article>
  );
}
