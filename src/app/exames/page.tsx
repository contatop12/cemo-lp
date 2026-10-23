import { VideoCard } from '@/components/media/VideoCard';
import { HubPage } from '@/components/templates/HubPage';
import { content } from '@/content';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Exames oftalmológicos em Taboão da Serra',
  description: 'Mapeamento de retina, campo visual, topografia de córnea, biometria, OCT e outros exames feitos na própria clínica do CEMO.',
  path: '/exames/',
});

export default async function ExamesPage() {
  const [exams, video] = await Promise.all([content.listExams(), content.getVideo('exames-que-realizamos')]);
  return (
    <HubPage
      path="/exames/"
      breadcrumbs={[{ name: 'Início', path: '/' }, { name: 'Exames', path: '/exames/' }]}
      title="Exames oftalmológicos"
      lead="O que é cada exame, para que serve, como é feito e como se preparar. Os exames são feitos na própria clínica, muitas vezes no mesmo dia da consulta."
      groups={[{ id: 'exames', items: exams.map((e) => ({ name: e.name, summary: e.summary, href: e.canonicalPath })) }]}
      aside={<VideoCard video={video} location="hub_exames" />}
      ctaTitle="Agende seu exame no CEMO"
      interest="exames"
      formId="hub_exames"
    />
  );
}
