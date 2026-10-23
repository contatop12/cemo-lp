import { notFound } from 'next/navigation';
import { SpecialtyTemplate } from '@/components/templates/EntityTemplates';
import { content } from '@/content';
import { buildMetadata } from '@/lib/seo/metadata';

const PREFIX = '/especialidades/';
export const dynamicParams = false;

async function find(slug: string) {
  const list = await content.listSpecialties();
  return list.find((s) => s.canonicalPath === `${PREFIX}${slug}/`) ?? null;
}

export async function generateStaticParams() {
  const list = await content.listSpecialties();
  return list.filter((s) => s.canonicalPath.startsWith(PREFIX)).map((s) => ({ slug: s.canonicalPath.slice(PREFIX.length, -1) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const s = await find((await params).slug);
  return s ? buildMetadata({ title: s.seo.title, description: s.seo.description, path: s.canonicalPath }) : {};
}

export default async function SpecialtyPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = await find((await params).slug);
  if (!s) notFound();
  return <SpecialtyTemplate specialty={s} />;
}
