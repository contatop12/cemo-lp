import { notFound } from 'next/navigation';
import { SpecialtyTemplate } from '@/components/templates/EntityTemplates';
import { content } from '@/content';
import { buildMetadata } from '@/lib/seo/metadata';

// Intenção "consulta/exame de vista" sem cidade; a intenção local continua na Home (anti-canibalização, IA §8).
export async function generateMetadata() {
  const s = await content.getSpecialty('consulta');
  return s ? buildMetadata({ title: s.seo.title, description: s.seo.description, path: s.canonicalPath }) : {};
}

export default async function ConsultaPage() {
  const s = await content.getSpecialty('consulta');
  if (!s?.published) notFound();
  return <SpecialtyTemplate specialty={s} />;
}
