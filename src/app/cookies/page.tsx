import { CookiePreferencesButton } from '@/components/analytics/CookiePreferencesButton';
import { LegalPage } from '@/components/layout/LegalPage';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Política de cookies',
  description: 'Quais cookies o site da CEMO usa e como alterar a sua escolha.',
  path: '/cookies/',
});

// TODO_CONTENT_VALIDATION: lista final de cookies conforme as tags configuradas no GTM de produção.
export default async function CookiesPage() {
  return (
    <LegalPage title="Política de cookies" path="/cookies/" updatedNote="Reflete a configuração atual do site.">
      <h2>Cookies necessários</h2>
      <p>
        Guardam a sua escolha sobre cookies e a origem da visita para o formulário de contato. Ficam apenas no seu navegador.
      </p>
      <h2>Medição e publicidade</h2>
      <p>
        Ferramentas de análise e de publicidade (carregadas pelo Google Tag Manager) só gravam cookies se você clicar em
        “Aceitar”. Mesmo assim, nenhum dado pessoal ou de saúde é enviado a elas.
      </p>
      <h2>Como alterar a sua escolha</h2>
      <p>Você pode mudar de ideia a qualquer momento:</p>
      <CookiePreferencesButton />
    </LegalPage>
  );
}
