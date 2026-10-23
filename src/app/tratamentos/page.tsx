import { HubPage } from '@/components/templates/HubPage';
import { content } from '@/content';
import { buildMetadata } from '@/lib/seo/metadata';

// Camada "Cirurgias e Tratamentos": as cirurgias-âncora moram nas URLs canônicas das especialidades (IA §2);
// tratamentos com URL própria só entram quando publicados.
export const metadata = buildMetadata({
  title: 'Cirurgias e tratamentos oftalmológicos',
  description: 'Cirurgia de catarata, cirurgia refrativa, tratamento do glaucoma e plástica ocular no CEMO, em Taboão da Serra.',
  path: '/tratamentos/',
});

export default async function TratamentosPage() {
  const specialties = await content.listSpecialties();
  const byId = (id: string) => specialties.find((s) => s.id === id);
  const anchors = [
    ['catarata', 'Cirurgia de catarata'],
    ['refrativa', 'Cirurgia refrativa'],
    ['glaucoma', 'Tratamento do glaucoma'],
    ['retina', 'Tratamentos de retina'],
    ['plastica-ocular', 'Plástica ocular'],
  ] as const;
  const items = [
    ...anchors.flatMap(([id, name]) => {
      const s = byId(id);
      return s ? [{ name, summary: s.summary, href: s.canonicalPath }] : [];
    }),
    ...specialties.filter((s) => s.kind === 'tratamento').map((s) => ({ name: s.name, summary: s.summary, href: s.canonicalPath })),
  ];
  return (
    <HubPage
      path="/tratamentos/"
      breadcrumbs={[{ name: 'Início', path: '/' }, { name: 'Cirurgias e tratamentos', path: '/tratamentos/' }]}
      title="Cirurgias e tratamentos"
      lead="Cada tratamento começa por uma avaliação completa: a indicação é individual e explicada com calma antes de qualquer decisão."
      groups={[{ id: 'tratamentos', items }]}
      ctaTitle="Agende sua avaliação"
      formId="hub_tratamentos"
    />
  );
}
