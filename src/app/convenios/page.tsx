import { TrackedLink } from '@/components/analytics/TrackedLink';
import { InsuranceSearch } from '@/components/page/InsuranceSearch';
import { PageCta } from '@/components/page/PageCta';
import { PageHero } from '@/components/page/PageHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { WhatsappIcon } from '@/components/ui/icons';
import { content } from '@/content';
import { whatsappHref } from '@/lib/contact';
import { buildClinicNode, buildGraph, buildWebSiteNode, schemaIds } from '@/lib/seo/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Convênios aceitos no CEMO',
  description: 'Veja os convênios atendidos no CEMO, em Taboão da Serra, e confirme a cobertura do seu plano pelo WhatsApp antes de agendar.',
  path: '/convenios/',
});

export default async function ConveniosPage() {
  const [settings, plans, interests] = await Promise.all([content.getSiteSettings(), content.listInsurancePlans(), content.listLeadInterests()]);
  const ids = schemaIds(settings.siteUrl);
  const graph = buildGraph([
    buildClinicNode(settings),
    buildWebSiteNode(settings),
    { '@type': 'WebPage', '@id': ids.page('/convenios/'), url: `${settings.siteUrl}/convenios/`, name: 'Convênios', inLanguage: 'pt-BR', isPartOf: { '@id': ids.website } },
  ]);
  return (
    <>
      <JsonLd data={graph} />
      <PageHero
        breadcrumbs={[{ name: 'Início', path: '/' }, { name: 'Convênios', path: '/convenios/' }]}
        title="Convênios"
        lead="O CEMO atende os convênios da lista abaixo. A cobertura depende do plano, do procedimento e da autorização da operadora: confirme antes de agendar."
        compact
      >
        <TrackedLink
          event="whatsapp_click"
          location="convenios_hero"
          href={whatsappHref(settings, 'Olá! Quero confirmar a cobertura do meu convênio no CEMO.')}
          className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-ui font-bold text-papel no-underline hover:bg-[#095A31]"
        >
          <WhatsappIcon />
          Confirmar cobertura
        </TrackedLink>
      </PageHero>
      <section aria-label="Lista de convênios" className="mx-auto max-w-wide px-[var(--gutter)] py-[var(--space-section)]">
        <InsuranceSearch plans={plans.map(({ id, name }) => ({ id, name }))} />
        <p className="mt-10 max-w-[66ch] text-small text-tinta-suave">
          A lista pode mudar. Planos com rede ou categoria específica, exames e cirurgias podem exigir autorização prévia da operadora —
          a equipe do CEMO ajuda a conferir.
        </p>
      </section>
      <PageCta title="Agende sua consulta" interests={interests} defaultInterest="convenios" settings={settings} formId="convenios" />
    </>
  );
}
