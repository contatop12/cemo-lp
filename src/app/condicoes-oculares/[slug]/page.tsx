import { notFound } from 'next/navigation';
import { ConditionTemplate } from '@/components/templates/EntityTemplates';
import { content } from '@/content';
import { buildMetadata } from '@/lib/seo/metadata';

const PREFIX = '/condicoes-oculares/';
export const dynamicParams = false;

async function find(slug: string) {
  const list = await content.listConditions();
  return list.find((c) => c.canonicalPath === `${PREFIX}${slug}/`) ?? null;
}

export async function generateStaticParams() {
  const list = await content.listConditions();
  return list.map((c) => ({ slug: c.canonicalPath.slice(PREFIX.length, -1) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const c = await find((await params).slug);
  return c ? buildMetadata({ title: c.seo.title, description: c.seo.description, path: c.canonicalPath }) : {};
}

export default async function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = await find((await params).slug);
  if (!c) notFound();
  return <ConditionTemplate condition={c} />;
}
