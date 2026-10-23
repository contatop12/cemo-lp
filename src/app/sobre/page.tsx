import { DoctorSpotlight } from '@/components/home/DoctorSpotlight';
import { VideoCard } from '@/components/media/VideoCard';
import { PageCta } from '@/components/page/PageCta';
import { PageHero } from '@/components/page/PageHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { content } from '@/content';
import { buildClinicNode, buildGraph, buildVideoNode, buildWebSiteNode, schemaIds } from '@/lib/seo/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Sobre o CEMO, Centro de Microcirurgia Ocular',
  description: 'Conheça o CEMO, em Taboão da Serra: corpo clínico por especialidade, exames na mesma unidade e atendimento do primeiro contato ao acompanhamento.',
  path: '/sobre/',
});

// Princípios do site atual (/sobre/), reescritos sem superlativo nem preço (CFM): não é sequência, então sem números.
const PRINCIPLES = [
  {
    title: 'O especialista certo desde o começo',
    text: 'O corpo clínico é formado por oftalmologistas de áreas diferentes. A avaliação já acontece com quem cuida do seu caso.',
  },
  {
    title: 'Exames na mesma unidade',
    text: 'Os exames complementares são feitos na própria clínica, com o apoio de tecnólogos — muitas vezes no mesmo dia da consulta.',
  },
  {
    title: 'Tecnologia a serviço da indicação',
    text: 'Equipamentos de diagnóstico ajudam o médico a decidir com segurança o que é indicado para cada olho, e o que não é.',
  },
  {
    title: 'Atendimento com respeito e calma',
    text: 'Cada etapa é explicada com clareza, do primeiro contato ao acompanhamento depois do tratamento.',
  },
];

const lower = (display: string) => display.replace('+', 'mais de ');

export default async function SobrePage() {
  const [settings, stats, doctors, video, interests] = await Promise.all([
    content.getSiteSettings(),
    content.getSiteStats(),
    content.listDoctors(),
    content.getVideo('tudo-em-um-lugar-so'),
    content.listLeadInterests(),
  ]);
  const director = doctors.find((d) => d.slug === settings.technicalResponsibleSlug);
  const ids = schemaIds(settings.siteUrl);
  const graph = buildGraph([
    buildClinicNode(settings),
    buildWebSiteNode(settings),
    { '@type': 'AboutPage', '@id': ids.page('/sobre/'), url: `${settings.siteUrl}/sobre/`, name: 'Sobre o CEMO', inLanguage: 'pt-BR', about: { '@id': ids.organization }, isPartOf: { '@id': ids.website } },
    buildVideoNode(video, settings),
  ]);
  return (
    <>
      <JsonLd data={graph} />
      <PageHero
        breadcrumbs={[{ name: 'Início', path: '/' }, { name: 'Sobre o CEMO', path: '/sobre/' }]}
        title="Sobre o CEMO"
        lead="O Centro de Microcirurgia Ocular reúne consulta, exames, tratamentos e cirurgias oftalmológicas em um só lugar, em Taboão da Serra."
      />
      <section aria-labelledby="historia-titulo" className="mx-auto grid max-w-wide gap-12 px-[var(--gutter)] py-[var(--space-section)] lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h2 id="historia-titulo" className="text-h2">
            Uma clínica de olhos completa, perto de você
          </h2>
          <p className="mt-5 max-w-[62ch] text-lead">
            São {lower(stats.yearsOfActivity.display)} {stats.yearsOfActivity.label} e {lower(stats.patientsServed.display)}{' '}
            {stats.patientsServed.label} cuidando da visão de quem vive em Taboão da Serra e na região.
          </p>
          <p className="mt-5 max-w-[62ch]">
            O CEMO atende dos casos mais comuns aos de maior complexidade, com médicos nas áreas de catarata, cirurgia refrativa, retina,
            glaucoma, córnea e ceratocone, oftalmopediatria, estrabismo, plástica ocular e lentes de contato.
          </p>
          <p className="mt-5 max-w-[62ch]">
            A ideia é simples: quem procura a clínica não deveria precisar ir a vários lugares para entender o que tem. Por isso a consulta,
            os exames e, quando indicada, a cirurgia acontecem na mesma estrutura.
          </p>
        </div>
        <div className="mx-auto w-full max-w-[20rem] lg:col-span-4 lg:col-start-9">
          <VideoCard video={video} location="sobre" />
        </div>
      </section>
      <section aria-labelledby="como-trabalhamos-titulo" className="bg-nevoa py-[var(--space-section)]">
        <div className="mx-auto max-w-wide px-[var(--gutter)]">
          <h2 id="como-trabalhamos-titulo" className="text-h2">
            Como trabalhamos
          </h2>
          <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <li key={p.title} className="border-t-2 border-azul-cemo pt-5">
                <h3 className="text-h3">{p.title}</h3>
                <p className="mt-3 max-w-[52ch] text-tinta-suave">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {director ? <DoctorSpotlight doctor={director} /> : null}
      <PageCta title="Agende sua consulta no CEMO" interests={interests} settings={settings} formId="sobre" />
    </>
  );
}
