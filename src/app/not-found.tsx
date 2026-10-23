import Link from 'next/link';
import { TrackedLink } from '@/components/analytics/TrackedLink';
import { WhatsappIcon } from '@/components/ui/icons';
import { content } from '@/content';
import { whatsappHref } from '@/lib/contact';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Página não encontrada',
  description: 'A página procurada não existe ou mudou de endereço.',
  path: '/404/',
  noindex: true,
});

const usefulLinks = [
  { label: 'Página inicial', href: '/' },
  { label: 'Especialidades', href: '/especialidades/' },
  { label: 'Exames', href: '/exames/' },
  { label: 'Corpo clínico', href: '/corpo-clinico/' },
  { label: 'Contato e como chegar', href: '/contato/' },
];

// Sem busca (o site ainda não tem busca interna): links úteis + WhatsApp resolvem o próximo passo.
export default async function NotFound() {
  const settings = await content.getSiteSettings();
  return (
    <div className="mx-auto max-w-prose px-[var(--gutter)] py-[var(--space-section)]">
      <h1 className="text-h1">Não encontramos esta página</h1>
      <p className="mt-4 text-lead text-tinta-suave">
        O endereço pode ter mudado ou estar digitado de outro jeito. Estes caminhos podem ajudar:
      </p>
      <ul className="mt-6 flex flex-col">
        {usefulLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="inline-flex min-h-12 items-center font-bold text-azul-700 underline underline-offset-[3px]">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8">Prefere falar com a gente?</p>
      <TrackedLink
        event="whatsapp_click"
        location="404"
        href={whatsappHref(settings)}
        className="mt-3 inline-flex min-h-12 items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-ui font-bold text-papel no-underline hover:bg-[#095A31]"
      >
        <WhatsappIcon />
        Falar no WhatsApp
      </TrackedLink>
    </div>
  );
}
