import { VideoCard } from '@/components/media/VideoCard';
import { HubPage } from '@/components/templates/HubPage';
import { content } from '@/content';
import { buildMetadata } from '@/lib/seo/metadata';

const TITLE = 'Especialidades oftalmológicas';
const LEAD = 'Da consulta de rotina às cirurgias: as áreas atendidas no CEMO, cada uma com médicos da especialidade e exames na própria clínica.';

export const metadata = buildMetadata({
  title: 'Especialidades em oftalmologia em Taboão da Serra',
  description: 'Catarata, cirurgia refrativa, retina, glaucoma, córnea, oftalmopediatria, estrabismo, plástica ocular e lentes de contato no CEMO.',
  path: '/especialidades/',
});

export default async function EspecialidadesPage() {
  const [specialties, video] = await Promise.all([content.listSpecialties(), content.getVideo('especialidades')]);
  const areas = specialties.filter((s) => s.kind === 'especialidade' || s.kind === 'servico');
  const consulta = specialties.find((s) => s.kind === 'consulta');
  return (
    <HubPage
      path="/especialidades/"
      breadcrumbs={[{ name: 'Início', path: '/' }, { name: 'Especialidades', path: '/especialidades/' }]}
      title={TITLE}
      lead={LEAD}
      groups={[
        { id: 'areas', items: areas.map((s) => ({ name: s.name, summary: s.summary, href: s.canonicalPath, ...(s.kind === 'servico' ? { kind: 'Serviço' } : {}) })) },
        ...(consulta ? [{ id: 'consulta', title: 'Começar pela consulta', items: [{ name: consulta.name, summary: consulta.summary, href: consulta.canonicalPath }] }] : []),
      ]}
      aside={<VideoCard video={video} location="hub_especialidades" />}
      ctaTitle="Agende sua avaliação no CEMO"
      formId="hub_especialidades"
    />
  );
}
