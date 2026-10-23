import { notFound } from 'next/navigation';
import { ExamTemplate } from '@/components/templates/EntityTemplates';
import { content } from '@/content';
import { buildMetadata } from '@/lib/seo/metadata';

// Exames com URL limpa em /exames/{slug}/; os que moram em slug de artigo preservado são servidos por /[slug]/.
const PREFIX = '/exames/';
export const dynamicParams = false;

async function find(slug: string) {
  const list = await content.listExams();
  return list.find((e) => e.canonicalPath === `${PREFIX}${slug}/`) ?? null;
}

export async function generateStaticParams() {
  const list = await content.listExams();
  return list.filter((e) => e.canonicalPath.startsWith(PREFIX)).map((e) => ({ slug: e.canonicalPath.slice(PREFIX.length, -1) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const e = await find((await params).slug);
  return e ? buildMetadata({ title: e.seo.title, description: e.seo.description, path: e.canonicalPath }) : {};
}

export default async function ExamPage({ params }: { params: Promise<{ slug: string }> }) {
  const e = await find((await params).slug);
  if (!e) notFound();
  return <ExamTemplate exam={e} />;
}
