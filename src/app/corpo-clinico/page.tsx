import { DoctorSpotlight } from '@/components/home/DoctorSpotlight';
import { DoctorsDirectory } from '@/components/page/DoctorsDirectory';
import { PageCta } from '@/components/page/PageCta';
import { PageHero } from '@/components/page/PageHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { toDoctorCardData } from '@/components/ui/DoctorCard';
import { content } from '@/content';
import { buildClinicNode, buildGraph, buildPersonNode, buildWebSiteNode, schemaIds } from '@/lib/seo/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Corpo clínico: oftalmologistas do CEMO',
  description: 'Conheça os oftalmologistas do CEMO em Taboão da Serra: catarata, refrativa, retina, glaucoma, plástica ocular, estrabismo e oftalmopediatria.',
  path: '/corpo-clinico/',
});

export default async function CorpoClinicoPage() {
  const [settings, doctors, specialties, interests] = await Promise.all([
    content.getSiteSettings(),
    content.listDoctors(),
    content.listSpecialties(),
    content.listLeadInterests(),
  ]);
  const director = doctors.find((d) => d.slug === settings.technicalResponsibleSlug);
  const ids = schemaIds(settings.siteUrl);
  const graph = buildGraph([
    buildClinicNode(settings),
    buildWebSiteNode(settings),
    {
      '@type': 'CollectionPage',
      '@id': ids.page('/corpo-clinico/'),
      url: `${settings.siteUrl}/corpo-clinico/`,
      name: 'Corpo clínico',
      inLanguage: 'pt-BR',
      isPartOf: { '@id': ids.website },
      mainEntity: { '@type': 'ItemList', itemListElement: doctors.map((d, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@id': ids.person(d.slug) } })) },
    },
    ...doctors.map((d) => buildPersonNode(d, settings)),
  ]);
  return (
    <>
      <JsonLd data={graph} />
      <PageHero
        breadcrumbs={[{ name: 'Início', path: '/' }, { name: 'Corpo clínico', path: '/corpo-clinico/' }]}
        title="Corpo clínico"
        lead="Oftalmologistas com atuação em áreas diferentes, para que cada etapa do seu cuidado seja acompanhada por quem é da área."
        compact
      />
      <div className="mx-auto max-w-wide px-[var(--gutter)] py-[var(--space-section)]">
        <DoctorsDirectory
          doctors={doctors.map(toDoctorCardData)}
          areas={specialties.filter((s) => s.kind === 'especialidade').map((s) => ({ id: s.id, label: s.shortName }))}
        />
      </div>
      {director ? <DoctorSpotlight doctor={director} /> : null}
      <PageCta title="Agende sua consulta" interests={interests} settings={settings} formId="hub_corpo_clinico" />
    </>
  );
}
