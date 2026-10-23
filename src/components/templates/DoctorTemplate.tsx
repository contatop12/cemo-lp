import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { VideoCard } from '@/components/media/VideoCard';
import { PageCta } from '@/components/page/PageCta';
import { RelatedList } from '@/components/page/RelatedBlocks';
import { JsonLd } from '@/components/seo/JsonLd';
import { initials } from '@/components/home/DoctorSpotlight';
import { PortraitFrame } from '@/components/ui/PortraitFrame';
import { content } from '@/content';
import type { Doctor } from '@/content/types';
import { buildClinicNode, buildGraph, buildPersonNode, buildProfilePageNode, buildVideoNode, buildWebSiteNode } from '@/lib/seo/jsonld';

// Perfil do médico (briefing §72–§74): quem é, formação, onde atua no CEMO, vídeos e o caminho para agendar.
// RQE só aparece quando validado; nada além do que a CEMO já publicou.
export async function DoctorTemplate({ doctor: d }: { doctor: Doctor }) {
  const [settings, interests, specialties, videos, exams] = await Promise.all([
    content.getSiteSettings(),
    content.listLeadInterests(),
    content.listSpecialties(),
    content.listVideos(d.videoIds),
    content.listExams(),
  ]);
  const name = `${d.honorific} ${d.name}`;
  const areas = specialties.filter((s) => d.specialtyIds.includes(s.id));
  const examLinks = exams.filter((e) => e.related.doctors.includes(d.slug)).map((e) => ({ name: e.name, summary: e.summary, href: e.canonicalPath }));
  const interest = areas[0]?.leadInterest ?? 'consulta';
  const graph = buildGraph([
    buildClinicNode(settings),
    buildWebSiteNode(settings),
    buildProfilePageNode(d, settings),
    buildPersonNode(d, settings),
    ...videos.map((v) => buildVideoNode(v, settings)),
  ]);

  return (
    <>
      <JsonLd data={graph} />
      <section aria-labelledby="page-title" className="border-b border-borda bg-nevoa">
        <div className="mx-auto grid max-w-wide gap-10 px-[var(--gutter)] pb-14 pt-6 lg:grid-cols-12 lg:gap-8 lg:pb-20">
          <div className="lg:col-span-7">
            <Breadcrumbs items={[{ name: 'Início', path: '/' }, { name: 'Corpo clínico', path: '/corpo-clinico/' }, { name, path: d.canonicalPath }]} />
            {d.role ? <p className="mt-8 text-ui font-bold text-azul-700">{d.role}</p> : null}
            <h1 id="page-title" className={d.role ? 'mt-2 text-h1 lg:text-display' : 'mt-8 text-h1 lg:text-display'}>
              {name}
            </h1>
            <p className="mt-3 text-lead text-tinta-suave">
              Oftalmologista, {d.crm}
              {d.rqe ? `, RQE ${d.rqe}` : ''}
            </p>
            {d.bio.map((p) => (
              <p key={p} className="mt-5 max-w-[60ch] text-lead">
                {p}
              </p>
            ))}
            {areas.length > 0 ? (
              <ul aria-label="Áreas de atuação no CEMO" className="mt-7 flex flex-wrap gap-2">
                {areas.map((a) => (
                  <li key={a.id}>
                    <Link href={a.canonicalPath} className="inline-flex min-h-11 items-center rounded-full border border-azul-cemo bg-papel px-4 text-small font-bold text-azul-700 no-underline hover:bg-nevoa-2">
                      {a.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            <a
              href="#agendar-final"
              className="mt-8 inline-flex min-h-[3.25rem] items-center rounded-md bg-azul-cemo px-7 py-4 text-ui font-bold text-papel no-underline hover:bg-azul-700"
            >
              Agendar consulta
            </a>
          </div>
          <div className="mx-auto w-full max-w-sm lg:col-span-4 lg:col-start-9 lg:max-w-none">
            <PortraitFrame size="lg">
              {d.photo ? (
                <Image src={d.photo.src} width={d.photo.width} height={d.photo.height} alt={d.photo.alt} sizes="(min-width: 1024px) 26rem, 90vw" priority className="h-full w-full object-cover object-top" />
              ) : (
                <div aria-hidden="true" className="flex h-full items-center justify-center font-display text-display text-azul-cemo">
                  {initials(d.name)}
                </div>
              )}
            </PortraitFrame>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-wide gap-14 px-[var(--gutter)] py-[var(--space-section)] lg:grid-cols-12 lg:gap-8">
        <section aria-labelledby="formacao-titulo" className="lg:col-span-7">
          <h2 id="formacao-titulo" className="text-h2">
            Formação e atuação
          </h2>
          <ul className="mt-6 divide-y divide-borda border-y border-borda">
            {d.credentials.map((c) => (
              <li key={c} className="py-4">
                {c}
              </li>
            ))}
          </ul>
        </section>
        <div className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9">
          <RelatedList
            id="areas"
            title="Onde atende no CEMO"
            items={areas.map((a) => ({ name: a.name, summary: a.summary, href: a.canonicalPath }))}
          />
          <RelatedList id="exames-medico" title="Exames relacionados" items={examLinks.slice(0, 5)} />
        </div>
      </div>

      {videos.length > 0 ? (
        <section aria-labelledby="videos-medico-titulo" className="bg-nevoa py-[var(--space-section)]">
          <div className="mx-auto max-w-wide px-[var(--gutter)]">
            <h2 id="videos-medico-titulo" className="text-h2">
              {`${d.honorific} ${d.name.split(' ')[0]} explica`}
            </h2>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {videos.map((v) => (
                <li key={v.id}>
                  <VideoCard video={v} location="perfil_medico" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <PageCta title={`Agende uma consulta no CEMO`} interests={interests} defaultInterest={interest} settings={settings} formId="perfil_medico" />
    </>
  );
}
