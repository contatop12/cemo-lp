import { TechStructure } from '@/components/home/TechStructure';
import { VideoCard } from '@/components/media/VideoCard';
import { PageCta } from '@/components/page/PageCta';
import { PageHero } from '@/components/page/PageHero';
import { RelatedList } from '@/components/page/RelatedBlocks';
import { JsonLd } from '@/components/seo/JsonLd';
import { content } from '@/content';
import { buildClinicNode, buildGraph, buildVideoNode, buildWebSiteNode, schemaIds } from '@/lib/seo/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Estrutura e tecnologia do CEMO',
  description: 'Salas de exame, equipamentos de diagnóstico e centro cirúrgico do CEMO, em Taboão da Serra: consulta, exames e cirurgia no mesmo lugar.',
  path: '/estrutura-e-tecnologia/',
});

export default async function EstruturaPage() {
  const [settings, equipment, exams, videos, interests] = await Promise.all([
    content.getSiteSettings(),
    content.listEquipment(),
    content.listExams(),
    content.listVideos(['exames-que-realizamos', 'dr-adriano-catarata']),
    content.listLeadInterests(),
  ]);
  const ids = schemaIds(settings.siteUrl);
  const graph = buildGraph([
    buildClinicNode(settings),
    buildWebSiteNode(settings),
    {
      '@type': 'WebPage',
      '@id': ids.page('/estrutura-e-tecnologia/'),
      url: `${settings.siteUrl}/estrutura-e-tecnologia/`,
      name: 'Estrutura e tecnologia',
      inLanguage: 'pt-BR',
      about: { '@id': ids.organization },
      isPartOf: { '@id': ids.website },
    },
    ...videos.map((v) => buildVideoNode(v, settings)),
  ]);
  return (
    <>
      <JsonLd data={graph} />
      <PageHero
        breadcrumbs={[{ name: 'Início', path: '/' }, { name: 'Estrutura e tecnologia', path: '/estrutura-e-tecnologia/' }]}
        title="Estrutura e tecnologia"
        lead="Salas de exame, equipamentos de diagnóstico e centro cirúrgico na mesma unidade: menos idas e vindas, mais informação para o médico decidir."
      />
      <TechStructure items={equipment} />
      <section
        aria-labelledby="exames-na-clinica-titulo"
        className="mx-auto grid max-w-wide gap-12 px-[var(--gutter)] py-[var(--space-section)] lg:grid-cols-12 lg:gap-8"
      >
        <div className="lg:col-span-6">
          <h2 id="exames-na-clinica-titulo" className="text-h2">
            Exames feitos na clínica
          </h2>
          <p className="mt-4 max-w-[52ch] text-tinta-suave">
            Do mapeamento de retina à biometria para a cirurgia de catarata, os exames complementares são realizados aqui mesmo.
          </p>
          <div className="mt-8">
            <RelatedList id="lista-exames" title="Conheça cada exame" items={exams.map((e) => ({ name: e.name, summary: e.summary, href: e.canonicalPath }))} />
          </div>
        </div>
        <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
          {videos.map((v) => (
            <li key={v.id}>
              <VideoCard video={v} location="estrutura" />
            </li>
          ))}
        </ul>
      </section>
      <PageCta title="Agende sua consulta ou exame" interests={interests} settings={settings} formId="estrutura" />
    </>
  );
}
