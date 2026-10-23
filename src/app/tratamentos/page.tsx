import { HubPage, type HubItem } from '@/components/templates/HubPage';
import { content } from '@/content';
import type { Specialty } from '@/content/types';
import { buildMetadata } from '@/lib/seo/metadata';

// Camada "Cirurgias e Tratamentos": as cirurgias-âncora moram nas URLs canônicas das especialidades (IA §2);
// tratamentos com URL própria só entram quando publicados, no grupo do seu `treatmentType`.
export const metadata = buildMetadata({
  title: 'Cirurgias e tratamentos oftalmológicos',
  description:
    'Cirurgia de catarata, refrativa, pterígio, calázio e plástica ocular, YAG laser e fotocoagulação a laser no CEMO, em Taboão da Serra.',
  path: '/tratamentos/',
});

export default async function TratamentosPage() {
  const specialties = await content.listSpecialties();
  const anchor = (id: string, name: string): HubItem[] => {
    const s = specialties.find((x) => x.id === id);
    return s ? [{ name, summary: s.summary, href: s.canonicalPath }] : [];
  };
  const treatments = (type: Specialty['treatmentType']): HubItem[] =>
    specialties
      .filter((s) => s.kind === 'tratamento' && s.treatmentType === type)
      .map((s) => ({ name: s.name, summary: s.summary, href: s.canonicalPath }));
  return (
    <HubPage
      path="/tratamentos/"
      breadcrumbs={[{ name: 'Início', path: '/' }, { name: 'Cirurgias e tratamentos', path: '/tratamentos/' }]}
      title="Cirurgias e tratamentos"
      lead="Cada tratamento começa por uma avaliação completa: a indicação é individual e explicada com calma antes de qualquer decisão."
      groups={[
        {
          id: 'cirurgias',
          title: 'Cirurgias',
          items: [
            ...anchor('catarata', 'Cirurgia de catarata'),
            ...anchor('refrativa', 'Cirurgia refrativa'),
            ...treatments('cirurgia'),
            ...anchor('plastica-ocular', 'Plástica ocular'),
          ],
        },
        { id: 'procedimentos', title: 'Procedimentos a laser, sem corte', items: treatments('procedimento') },
        {
          id: 'acompanhamento',
          title: 'Acompanhamento e tratamento',
          items: [...anchor('glaucoma', 'Tratamento do glaucoma'), ...anchor('retina', 'Tratamentos de retina')],
        },
      ]}
      ctaTitle="Agende sua avaliação"
      formId="hub_tratamentos"
    />
  );
}
