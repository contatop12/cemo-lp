import { notFound } from 'next/navigation';
import { DoctorTemplate } from '@/components/templates/DoctorTemplate';
import { content } from '@/content';
import { buildMetadata } from '@/lib/seo/metadata';

export const dynamicParams = false;

async function find(slug: string) {
  const d = await content.getDoctorBySlug(slug);
  return d?.published ? d : null;
}

export async function generateStaticParams() {
  return (await content.listDoctors()).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const d = await find((await params).slug);
  if (!d) return {};
  const name = `${d.honorific} ${d.name}`;
  return buildMetadata({
    title: `${name}, oftalmologista`,
    description: `${name} (${d.crm}) atende no CEMO, em Taboão da Serra: ${d.areas.join(', ').toLowerCase()}. Formação, áreas de atuação e como agendar.`,
    path: d.canonicalPath,
    ...(d.photo ? { ogImage: d.photo } : {}),
  });
}

export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const d = await find((await params).slug);
  if (!d) notFound();
  return <DoctorTemplate doctor={d} />;
}
