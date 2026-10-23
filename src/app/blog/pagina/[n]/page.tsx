import { notFound } from 'next/navigation';
import { BlogIndex, blogPagePath, pageCount } from '@/components/templates/BlogIndex';
import { buildMetadata } from '@/lib/seo/metadata';

export const dynamicParams = false;

export async function generateStaticParams() {
  const total = await pageCount();
  return Array.from({ length: total - 1 }, (_, i) => ({ n: String(i + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ n: string }> }) {
  const n = Number((await params).n);
  return buildMetadata({
    title: `Blog: conteúdos sobre saúde ocular, página ${n}`,
    description: `Página ${n} dos artigos da equipe do CEMO sobre saúde ocular, exames e tratamentos.`,
    path: blogPagePath(n),
  });
}

export default async function BlogPaginaPage({ params }: { params: Promise<{ n: string }> }) {
  const n = Number((await params).n);
  if (!Number.isInteger(n) || n < 2 || n > (await pageCount())) notFound();
  return <BlogIndex page={n} />;
}
