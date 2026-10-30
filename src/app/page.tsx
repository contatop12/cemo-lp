import { ContentSection } from '@/components/home/ContentSection';
import { ConversionBlock } from '@/components/home/ConversionBlock';
import { DoctorSpotlight } from '@/components/home/DoctorSpotlight';
import { DoctorsSection } from '@/components/home/DoctorsSection';
import { EditorialBlock } from '@/components/home/EditorialBlock';
import { FinalCta } from '@/components/home/FinalCta';
import { Hero } from '@/components/home/Hero';
import { formatRegistry } from '@/lib/registry';
import { InsuranceSection } from '@/components/home/InsuranceSection';
import { LocationSection } from '@/components/home/LocationSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { ServicesIndex } from '@/components/home/ServicesIndex';
import { TechStructure } from '@/components/home/TechStructure';
import { VideoSection } from '@/components/home/VideoSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { content } from '@/content';
import { assets } from '@/content/assets';
import { reviewsHref } from '@/lib/contact';
import { buildClinicNode, buildGraph, buildPersonNode, buildWebSiteNode } from '@/lib/seo/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Clínica de Oftalmologia em Taboão da Serra',
  description:
    'Consulta, exames, tratamentos e cirurgias oftalmológicas em Taboão da Serra, com equipe médica e estrutura reunidas em um só lugar no CEMO.',
  path: '/',
  ogImage: assets.ogHome,
});

// Jornada da Home (briefing §47): apresentar, provar, converter, direcionar. Todo dado vem do repositório.
export default async function HomePage() {
  const [settings, stats, doctors, services, interests, equipment, homeVideos, testimonials, plans, articles, catarata, refrativa, editorialVideos] =
    await Promise.all([
      content.getSiteSettings(),
      content.getSiteStats(),
      content.listDoctors(),
      content.listServices(),
      content.listLeadInterests(),
      content.listEquipment(),
      content.listVideos(['tudo-em-um-lugar-so', 'especialidades', 'exames-que-realizamos']),
      content.listTestimonials(),
      content.listInsurancePlans(),
      content.listFeaturedArticles(3),
      content.getEditorial('catarata'),
      content.getEditorial('refrativa'),
      content.listVideos(['dr-adriano-catarata', 'dr-david-oculos']),
    ]);
  const [catarataVideo, refrativaVideo] = editorialVideos;

  const director = doctors.find((d) => d.slug === settings.technicalResponsibleSlug);
  if (!director?.photo) throw new Error('Foto do diretor técnico ausente no conteúdo');

  const graph = buildGraph([buildClinicNode(settings), buildWebSiteNode(settings), buildPersonNode(director, settings)]);

  return (
    <>
      <JsonLd data={graph} />
      <Hero
        kicker="Centro de Microcirurgia Ocular"
        headline="Clínica de Oftalmologia em Taboão da Serra"
        lead="Consulta, exames, tratamentos e cirurgias oftalmológicas, com equipe médica e estrutura reunidas em um só lugar."
        primaryCta={{ label: 'Agendar consulta', href: '#agendar' }}
        secondaryCta={{ label: 'Conhecer especialidades', href: '#especialidades' }}
        proof={[
          { id: 'google', value: stats.googleRating.display, label: `no Google, ${stats.googleRating.reviewsLabel}` },
          { id: 'anos', value: stats.yearsOfActivity.display, label: stats.yearsOfActivity.label },
          { id: 'atendimentos', value: stats.patientsServed.display, label: stats.patientsServed.label },
        ]}
        doctor={{
          name: `${director.honorific} ${director.name}`,
          role: director.role ?? 'Diretor Técnico',
          registry: formatRegistry(director),
          image: assets.drDavidCutout,
        }}
      />
      <ConversionBlock interests={interests} settings={settings} />
      <ServicesIndex services={services} />
      <EditorialBlock content={catarata} tone="nevoa" video={catarataVideo} />
      <EditorialBlock content={refrativa} tone="papel" video={refrativaVideo} reverse />
      <DoctorSpotlight doctor={director} />
      <TechStructure items={equipment} />
      <VideoSection videos={homeVideos} />
      <DoctorsSection doctors={doctors} />
      <ReviewsSection stats={stats} testimonials={testimonials} reviewsHref={reviewsHref(settings)} />
      <InsuranceSection plans={plans} settings={settings} />
      <LocationSection settings={settings} />
      <ContentSection articles={articles} />
      <FinalCta settings={settings} />
    </>
  );
}
