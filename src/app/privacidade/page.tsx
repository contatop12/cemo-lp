import { LegalPage } from '@/components/layout/LegalPage';
import { content } from '@/content';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Política de privacidade',
  description: 'Como o site da CEMO trata os dados informados no formulário de contato e os dados de navegação.',
  path: '/privacidade/',
});

// TODO_CONTENT_VALIDATION: texto final pelo jurídico da CEMO — razão social, CNPJ, encarregado (DPO),
// base legal, prazos de retenção e operadores (hospedagem, CRM/webhook, GTM) NÃO foram informados e não
// devem ser inventados.
export default async function PrivacidadePage() {
  const settings = await content.getSiteSettings();
  return (
    <LegalPage title="Política de privacidade" path="/privacidade/" updatedNote="Descreve apenas o que este site coleta hoje.">
      <h2>Quais dados o site coleta</h2>
      <ul>
        <li>
          No formulário de contato: seu nome, seu número de WhatsApp e a opção escolhida em “O que você está buscando?”.
        </li>
        <li>
          Dados de navegação: parâmetros de campanha presentes no endereço da página (como utm_source ou gclid), a página de
          entrada, a página de origem e o horário da visita — enviados apenas junto com o seu pedido de contato.
        </li>
      </ul>
      <h2>Para que usamos</h2>
      <p>Para retornar o contato e agendar o seu atendimento, e para saber por qual canal você chegou até nós.</p>
      <h2>O que não fazemos</h2>
      <p>
        Não enviamos nome, telefone nem o assunto do seu interesse para ferramentas de análise ou de publicidade. O formulário
        não pede CPF, endereço, e-mail, data de nascimento, diagnóstico ou histórico clínico.
      </p>
      <h2>Quem é responsável</h2>
      <p>
        {settings.name}, {settings.address.streetAddress}, {settings.address.city}/{settings.address.region}.
      </p>
      <h2>Seus direitos</h2>
      <p>
        Você pode pedir acesso, correção ou exclusão dos seus dados pelo e-mail{' '}
        <a href={`mailto:${settings.email}`} className="text-azul-700 underline">
          {settings.email}
        </a>
        .
      </p>
    </LegalPage>
  );
}
