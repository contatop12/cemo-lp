import { ContentSection } from '@/components/home/ContentSection';
import { ConversionBlock } from '@/components/home/ConversionBlock';
import { DoctorSpotlight } from '@/components/home/DoctorSpotlight';
import { DoctorsSection } from '@/components/home/DoctorsSection';
import { EditorialBlock } from '@/components/home/EditorialBlock';
import { FinalCta } from '@/components/home/FinalCta';
import { Hero } from '@/components/home/Hero';
import { InsuranceSection } from '@/components/home/InsuranceSection';
import { LocationSection } from '@/components/home/LocationSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { TechStructure } from '@/components/home/TechStructure';
import { TrustBar } from '@/components/home/TrustBar';
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
  const [settings, stats, doctors, services, interests, equipment, video, testimonials, plans, articles, catarata, refrativa] =
    await Promise.all([
      content.getSiteSettings(),
      content.getSiteStats(),
      content.listDoctors(),
      content.listServices(),
      content.listLeadInterests(),
      content.listEquipment(),
      content.getVideo('tudo-em-um-lugar-so'),
      content.listTestimonials(),
      content.listInsurancePlans(),
      content.listFeaturedArticles(3),
      content.getEditorial('catarata'),
      content.getEditorial('refrativa'),
    ]);

  const director = doctors.find((d) => d.slug === settings.technicalResponsibleSlug);
  if (!director?.photo || !director.photoMobile) throw new Error('Foto do diretor técnico ausente no conteúdo');

  const graph = buildGraph([buildClinicNode(settings), buildWebSiteNode(settings), buildPersonNode(director, settings)]);

  return (
    <>
      <JsonLd data={graph} />
      <Hero
        eyebrow="CEMO • Centro de Microcirurgia Ocular"
        headline="Clínica de Oftalmologia em Taboão da Serra"
        lead="Consulta, exames, tratamentos e cirurgias oftalmológicas, com equipe médica e estrutura reunidas em um só lugar, em Taboão da Serra."
        primaryCta={{ label: 'Agendar consulta', href: '#agendar' }}
        secondaryCta={{ label: 'Conhecer especialidades', href: '#especialidades' }}
        proof={[
          { id: 'google', text: `${stats.googleRating.display} no Google` },
          { id: 'anos', text: `${stats.yearsOfActivity.display} ${stats.yearsOfActivity.label}` },
          { id: 'atendimentos', text: `${stats.patientsServed.display} ${stats.patientsServed.label}` },
        ]}
        doctor={{
          name: `${director.honorific} ${director.name}`,
          role: director.role ?? 'Diretor Técnico',
          crm: director.crm,
          image: director.photo,
          mobileImage: director.photoMobile,
        }}
      />
      <TrustBar stats={stats} doctorsCount={doctors.length} />
      <ConversionBlock interests={interests} settings={settings} />
      <ServicesGrid services={services} />
      <EditorialBlock content={catarata} tone="nevoa" />
      <EditorialBlock content={refrativa} tone="papel" />
      <DoctorSpotlight doctor={director} />
      <TechStructure items={equipment} />
      <VideoSection video={video} />
      <DoctorsSection doctors={doctors} />
      <ReviewsSection stats={stats} testimonials={testimonials} reviewsHref={reviewsHref(settings)} />
      <InsuranceSection plans={plans} settings={settings} />
      <LocationSection settings={settings} />
      <ContentSection articles={articles} />
      <FinalCta settings={settings} />
    </>
  );
}
