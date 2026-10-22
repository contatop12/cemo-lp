import { TrackedLink } from '@/components/analytics/TrackedLink';
import { Container } from '@/components/ui/Container';
import { WhatsappIcon } from '@/components/ui/icons';
import { content } from '@/content';
import { whatsappHref } from '@/lib/contact';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Recebemos o seu pedido',
  description: 'Seu pedido de contato foi recebido pela equipe do CEMO.',
  path: '/obrigado/',
  noindex: true,
});

// Não lê query string nem exibe dados do lead (LGPD).
export default async function ObrigadoPage() {
  const settings = await content.getSiteSettings();
  return (
    <Container size="prose" className="py-[var(--space-section)]">
      <h1 className="text-h1">Recebemos o seu pedido</h1>
      <p className="mt-6 text-lead text-tinta-suave">
        Obrigado pela confiança. Nossa equipe de atendimento vai entrar em contato pelo WhatsApp informado para
        combinar o melhor horário para você.
        {/* TODO_CONTENT_VALIDATION: prazo de retorno do atendimento (não prometer prazo sem confirmação) */}
      </p>
      <p className="mt-4">Se preferir adiantar a conversa, fale agora com a gente:</p>
      <TrackedLink
        event="whatsapp_click"
        location="obrigado"
        href={whatsappHref(settings)}
        className="mt-8 inline-flex min-h-[3.25rem] items-center gap-2 rounded-md bg-whatsapp px-7 py-4 text-ui font-bold text-papel no-underline hover:bg-[#095A31]"
      >
        <WhatsappIcon />
        Continuar atendimento pelo WhatsApp
      </TrackedLink>
    </Container>
  );
}
