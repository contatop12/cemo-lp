import { notFound } from 'next/navigation';
import { ExamTemplate } from '@/components/templates/EntityTemplates';
import { PostTemplate } from '@/components/templates/PostTemplate';
import { content } from '@/content';
import { assertRootSlugs } from '@/lib/content/root-slugs';
import { buildMetadata } from '@/lib/seo/metadata';

// URLs na raiz (preservadas do WordPress): posts do blog e os exames que moram em slug de artigo (IA §7).
// Todas estáticas: dynamicParams=false → slug desconhecido é 404 (redirects/410 já resolvidos no proxy).
export const dynamicParams = false;

async function resolve(slug: string) {
  const exams = await content.listExams();
  const exam = exams.find((e) => e.canonicalPath === `/${slug}/`);
  if (exam) return { kind: 'exam' as const, exam };
  const post = await content.getPost(slug);
  return post ? { kind: 'post' as const, post } : null;
}

export async function generateStaticParams() {
  const [exams, posts] = await Promise.all([content.listExams(), content.listPosts()]);
  const examSlugs = exams.filter((e) => !e.canonicalPath.startsWith('/exames/')).map((e) => e.canonicalPath.slice(1, -1));
  return assertRootSlugs([...examSlugs, ...posts.map((p) => p.slug)]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const r = await resolve((await params).slug);
  if (!r) return {};
  if (r.kind === 'exam') return buildMetadata({ title: r.exam.seo.title, description: r.exam.seo.description, path: r.exam.canonicalPath });
  const { post } = r;
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/${post.slug}/`,
    ...(post.image ? { ogImage: post.image } : {}),
  });
}

export default async function RootSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const r = await resolve((await params).slug);
  if (!r) notFound();
  return r.kind === 'exam' ? <ExamTemplate exam={r.exam} /> : <PostTemplate post={r.post} />;
}
