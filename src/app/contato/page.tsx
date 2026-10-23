import { LocationSection } from '@/components/home/LocationSection';
import { LeadPanel } from '@/components/page/LeadPanel';
import { PageHero } from '@/components/page/PageHero';
import { TrackedLink } from '@/components/analytics/TrackedLink';
import { JsonLd } from '@/components/seo/JsonLd';
import { WhatsappIcon } from '@/components/ui/icons';
import { content } from '@/content';
import { telHref, whatsappHref } from '@/lib/contact';
import { buildClinicNode, buildGraph, buildWebSiteNode, schemaIds } from '@/lib/seo/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Contato e como chegar ao CEMO',
  description: 'Endereço, telefone, WhatsApp e horários do CEMO em Taboão da Serra. Veja como chegar e agende sua consulta.',
  path: '/contato/',
});

export default async function ContatoPage() {
  const [settings, interests] = await Promise.all([content.getSiteSettings(), content.listLeadInterests()]);
  const ids = schemaIds(settings.siteUrl);
  const graph = buildGraph([
    buildClinicNode(settings),
    buildWebSiteNode(settings),
    {
      '@type': 'ContactPage',
      '@id': ids.page('/contato/'),
      url: `${settings.siteUrl}/contato/`,
      name: 'Contato',
      inLanguage: 'pt-BR',
      about: { '@id': ids.organization },
      isPartOf: { '@id': ids.website },
    },
  ]);
  return (
    <>
      <JsonLd data={graph} />
      <PageHero
        breadcrumbs={[{ name: 'Início', path: '/' }, { name: 'Contato', path: '/contato/' }]}
        title="Contato e como chegar"
        lead="Fale com a equipe pelo WhatsApp, por telefone ou deixe seu contato: retornamos para encontrar o melhor horário."
        aside={<LeadPanel title="Agendar consulta" interests={interests} settings={settings} formId="contato" />}
      >
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <TrackedLink
            event="whatsapp_click"
            location="contato_hero"
            href={whatsappHref(settings)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-ui font-bold text-papel no-underline hover:bg-[#095A31]"
          >
            <WhatsappIcon />
            WhatsApp {settings.whatsapp.display}
          </TrackedLink>
          <TrackedLink
            event="phone_click"
            location="contato_hero"
            href={telHref(settings)}
            className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-azul-cemo px-6 py-3 text-ui font-bold text-azul-700 no-underline hover:bg-nevoa-2"
          >
            Ligar {settings.phone.display}
          </TrackedLink>
        </div>
        <p className="mt-5 text-tinta-suave">
          E-mail:{' '}
          <a href={`mailto:${settings.email}`} className="font-bold text-azul-700 underline underline-offset-[3px]">
            {settings.email}
          </a>
        </p>
      </PageHero>
      <LocationSection settings={settings} />
    </>
  );
}
