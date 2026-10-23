import type { ReactNode } from 'react';
import { TrackedLink } from '@/components/analytics/TrackedLink';
import { TechStructure } from '@/components/home/TechStructure';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { VideoCard } from '@/components/media/VideoCard';
import { FaqBlock, OnThisPage } from '@/components/page/ContentBlocks';
import { LeadPanel } from '@/components/page/LeadPanel';
import { PageCta } from '@/components/page/PageCta';
import { PageHero } from '@/components/page/PageHero';
import { RelatedArticles, RelatedDoctors, RelatedList, ReviewNote } from '@/components/page/RelatedBlocks';
import { JsonLd } from '@/components/seo/JsonLd';
import { StarIcon, WhatsappIcon } from '@/components/ui/icons';
import { content } from '@/content';
import type { FaqItem, LeadInterestId, MedicalReview, SourceRef, VideoItem } from '@/content/types';
import { reviewsHref, whatsappHref } from '@/lib/contact';
import type { ResolvedRelated } from '@/lib/content/related';
import { buildClinicNode, buildFaqNode, buildGraph, buildVideoNode, buildWebSiteNode, type JsonLdNode } from '@/lib/seo/jsonld';

export interface MedicalBlock {
  id: string;
  label: string;
  node: ReactNode;
}

// Esqueleto comum das páginas de conteúdo médico (especialidade, tratamento, exame, condição). Responde, na ordem, às
// perguntas do briefing §59: estou no lugar certo, eles atendem isso, onde fica, quem atende, posso confiar, como
// funciona, qual o próximo passo.
export async function MedicalPage({
  path,
  breadcrumbs,
  title,
  lead,
  ctaLabel,
  ctaTitle,
  interest,
  formId,
  blocks,
  faq,
  videos,
  related,
  review,
  sources,
  pageNode,
  proof = false,
}: {
  path: string;
  breadcrumbs: Array<{ name: string; path: string }>;
  title: string;
  lead: string;
  ctaLabel: string;
  ctaTitle: string;
  interest: LeadInterestId;
  formId: string;
  blocks: MedicalBlock[];
  faq: FaqItem[];
  videos: VideoItem[];
  related: ResolvedRelated;
  review: MedicalReview;
  sources: SourceRef[];
  pageNode: JsonLdNode;
  /** Páginas P0 (Catarata, Refrativa): estrutura e avaliações completas na página. */
  proof?: boolean;
}) {
  const [settings, stats, interests, equipment, doctors] = await Promise.all([
    content.getSiteSettings(),
    content.getSiteStats(),
    content.listLeadInterests(),
    proof ? content.listEquipment() : Promise.resolve([]),
    content.listDoctors(),
  ]);
  const reviewer = review.medicalReviewerSlug ? (doctors.find((d) => d.slug === review.medicalReviewerSlug) ?? null) : null;

  const graph = buildGraph([
    buildClinicNode(settings),
    buildWebSiteNode(settings),
    pageNode,
    ...(faq.length > 0 ? [buildFaqNode(path, faq, settings)] : []),
    ...videos.map((v) => buildVideoNode(v, settings)),
  ]);

  const toc = [
    ...blocks.map((b) => ({ id: b.id, label: b.label })),
    ...(videos.length > 0 ? [{ id: 'videos', label: 'Vídeos' }] : []),
    ...(faq.length > 0 ? [{ id: 'perguntas-frequentes', label: 'Perguntas frequentes' }] : []),
    ...(related.doctors.length > 0 ? [{ id: 'quem-atende', label: 'Quem atende' }] : []),
  ];
  const hasLinks = related.exams.length + related.conditions.length + related.specialties.length > 0;

  return (
    <>
      <JsonLd data={graph} />
      <PageHero
        breadcrumbs={breadcrumbs}
        title={title}
        lead={lead}
        aside={<LeadPanel title={ctaLabel} interests={interests} defaultInterest={interest} settings={settings} formId={`${formId}_topo`} />}
      >
        <ul aria-label="Por que o CEMO" className="mt-7 flex flex-col gap-2 text-tinta sm:flex-row sm:flex-wrap sm:gap-x-6">
          <li className="flex items-center gap-2">
            <StarIcon filled className="size-5 text-[#8A5A00]" />
            <span>
              <strong>{stats.googleRating.display}</strong> no Google, {stats.googleRating.reviewsLabel}
            </span>
          </li>
          <li>
            <strong>{stats.yearsOfActivity.display}</strong> {stats.yearsOfActivity.label}
          </li>
          <li>Taboão da Serra, {settings.address.streetAddress}</li>
        </ul>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <TrackedLink
            event="whatsapp_click"
            location={`${formId}_hero`}
            href={whatsappHref(settings)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-ui font-bold text-papel no-underline hover:bg-[#095A31]"
          >
            <WhatsappIcon />
            Falar no WhatsApp
          </TrackedLink>
        </div>
      </PageHero>

      <div className="mx-auto grid max-w-wide gap-12 px-[var(--gutter)] py-[var(--space-section)] lg:grid-cols-12 lg:gap-8">
        <div className="hidden lg:col-span-3 lg:block">
          <OnThisPage items={toc} />
        </div>
        <div className="flex min-w-0 flex-col gap-16 lg:col-span-8 lg:col-start-5">
          {blocks.map((b) => (
            <div key={b.id}>{b.node}</div>
          ))}
          {videos.length > 0 ? (
            <section id="videos" aria-labelledby="videos-titulo" className="scroll-mt-28">
              <h2 id="videos-titulo" className="text-h2">
                {videos.length === 1 ? 'Em vídeo' : 'Em vídeo, com quem atende'}
              </h2>
              <ul className="mt-8 grid gap-8 sm:grid-cols-2">
                {videos.map((v) => (
                  <li key={v.id} className="max-w-[22rem]">
                    <VideoCard video={v} location={`${formId}_video`} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          <FaqBlock items={faq} />
          <ReviewNote review={review} reviewer={reviewer} sources={sources} />
        </div>
      </div>

      {related.doctors.length > 0 ? (
        <div className="bg-nevoa py-[var(--space-section)]">
          <div className="mx-auto max-w-wide px-[var(--gutter)]">
            <RelatedDoctors doctors={related.doctors} />
          </div>
        </div>
      ) : null}

      {proof ? <TechStructure items={equipment} /> : null}
      {proof ? <ReviewsSection stats={stats} testimonials={await content.listTestimonials()} reviewsHref={reviewsHref(settings)} /> : null}

      {hasLinks || related.articles.length > 0 ? (
        <div className="mx-auto flex max-w-wide flex-col gap-14 px-[var(--gutter)] py-[var(--space-section)]">
          {hasLinks ? (
            <section aria-labelledby="relacionados-titulo">
              <h2 id="relacionados-titulo" className="text-h2">
                Você também pode se interessar por
              </h2>
              <div className="mt-8 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
                <RelatedList id="rel-exames" title="Exames" items={related.exams} />
                <RelatedList id="rel-condicoes" title="Condições" items={related.conditions} />
                <RelatedList id="rel-especialidades" title="Especialidades e tratamentos" items={related.specialties} />
              </div>
            </section>
          ) : null}
          <RelatedArticles articles={related.articles} />
        </div>
      ) : null}

      <PageCta title={ctaTitle} interests={interests} defaultInterest={interest} settings={settings} formId={`${formId}_final`} />
    </>
  );
}
