import { Hero } from '@/components/home/Hero';
import { TrustBar } from '@/components/home/TrustBar';
import { content } from '@/content';

// Home — composição completa na Task 15. Todos os números e dados vêm do repositório de conteúdo.
export default async function HomePage() {
  const [settings, stats, doctors] = await Promise.all([
    content.getSiteSettings(),
    content.getSiteStats(),
    content.listDoctors(),
  ]);
  const director = doctors.find((d) => d.slug === settings.technicalResponsibleSlug);
  if (!director?.photo || !director.photoMobile) throw new Error('Foto do diretor técnico ausente no conteúdo');

  return (
    <>
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
    </>
  );
}
