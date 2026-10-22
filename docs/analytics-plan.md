# Plano de analytics e mensuração — CEMO

Para a equipe de mídia/analytics e desenvolvimento. Define o que é medido, como, e o que **nunca** é enviado.

## Princípios

1. **Dado de saúde não vai para analytics.** O campo "O que você está buscando?" pode revelar condição de saúde (LGPD, dado sensível). Nome, telefone, serviço procurado, mensagem, condição e diagnóstico **nunca** chegam ao GA4, Google Ads, Meta, pixels ou logs.
2. **Só eventos genéricos.** `track()` (`src/lib/analytics/events.ts`) aceita apenas os 8 eventos abaixo e só os parâmetros `location`, `page_type` e `form_id`; qualquer outra chave é descartada antes do `dataLayer` (coberto por teste).
3. **Conversão primária = lead registrado.** `lead_form_submit` só dispara depois de a API responder 200 (lead gravado no destino). Cliques em WhatsApp e telefone são conversões secundárias. Não otimizar campanhas só por microconversões.

## Eventos

| Evento | Quando dispara | `location` (exemplos) | Emissor |
|---|---|---|---|
| `lead_form_start` | Primeira interação com um campo do formulário (uma vez por formulário) | `home-conversao`, `final` | `LeadForm` |
| `lead_form_submit` | Resposta 200 da API `/api/lead/` | idem (`form_id` = id do formulário) | `LeadForm` |
| `whatsapp_click` | Clique em qualquer link para o WhatsApp | `utility-bar`, `hero`, `sticky`, `obrigado`, `footer` | `TrackedLink` |
| `phone_click` | Clique em `tel:` | `utility-bar`, `location`, `footer` | `TrackedLink` |
| `schedule_click` | Clique em "Agendar consulta" (leva ao formulário) | `header`, `hero`, `sticky`, `final` | `TrackedLink` |
| `directions_click` | Clique em "Como chegar" | `location` | `TrackedLink` |
| `reviews_click` | Clique em "Ver avaliações no Google" | `trust-bar`, `reviews` | `TrackedLink` |
| `service_cta_click` | Clique em card/CTA de especialidade | `services`, `editorial-catarata`, `editorial-refrativa` | `TrackedLink` |

Parâmetros permitidos: `location`, `page_type`, `form_id`. **Proibidos:** qualquer outro — em especial nome, telefone, e-mail, interesse/serviço, condição, texto livre, URL com dados pessoais.

Adiado para os próximos planos: `doctor_view` (perfis individuais de médicos ainda não publicados).

## Status da implementação (2026-10-22)

Todos os 8 eventos estão implementados e cobertos por testes: `lead_form_start`/`lead_form_submit` (LeadForm), `whatsapp_click` (utility bar, hero, conversão, convênios, sticky mobile, menu mobile, CTA final, rodapé, /obrigado/, 404), `phone_click` (utility bar, conversão, localização, rodapé), `schedule_click` (header, hero, sticky mobile, CTA final), `directions_click` (localização), `reviews_click` (avaliações), `service_cta_click` (cards de serviço e blocos editoriais). O E2E confirma que o `dataLayer` não recebe nome, telefone nem interesse.

## Consent Mode v2

- **Padrão** (antes de qualquer tag, `beforeInteractive`): `ad_storage`, `analytics_storage`, `ad_user_data` e `ad_personalization` = `denied`, com `wait_for_update: 500`.
- **"Aceitar"**: `analytics_storage` e `ad_storage` = `granted`; `ad_user_data` e `ad_personalization` **seguem `denied`** — contexto de saúde (briefing §121: enhanced conversions/PII para plataformas de anúncio só após revisão jurídica, de política da plataforma e consentimento específico).
- **"Recusar"**: tudo `denied`.
- A escolha fica em `localStorage` (`cemo.consent.v1`) e é reaplicada a cada carregamento. Se o storage estiver bloqueado (aba anônima, Safari ITP), o banner reaparece e nada quebra.
- Enquanto a escolha está pendente, `html[data-consent="pending"]` oculta a barra fixa de CTA no mobile para que banner e barra nunca se sobreponham.

## Implementação

- **GTM** por variável de ambiente (`NEXT_PUBLIC_GTM_ID`); vazio = GTM desligado (desenvolvimento/staging sem medição). GA4, Google Ads e demais tags são configurados **dentro do GTM**, ouvindo os eventos do `dataLayer`.
- **Atribuição first-party**: UTMs, `gclid`, `wbraid`, `gbraid`, landing page e referrer guardados no navegador (30 dias) e enviados **apenas com o lead** ao destino interno (CRM/webhook), nunca ao analytics. `TODO_CONTENT_VALIDATION: confirmar com o jurídico se o armazenamento de atribuição exige consentimento prévio.`
- Mensagem pré-preenchida do WhatsApp é genérica ("Olá! Gostaria de agendar uma consulta no CEMO."), sem informação de saúde.

## Pendências

- `TODO_CONTENT_VALIDATION:` o site atual carrega GTM-PH3D5ZS, Google Ads AW-16676786938, Universal Analytics (descontinuado) e Pixel Meta. Confirmar quais contas continuam, criar/reaproveitar a propriedade GA4 e definir o ID de GTM do novo site.
- `TODO_CONTENT_VALIDATION:` criar no Google Ads a conversão primária a partir de `lead_form_submit` e as secundárias de `whatsapp_click`/`phone_click`.
- `TODO_CONTENT_VALIDATION:` Search Console — verificar a propriedade de domínio antes do lançamento para acompanhar a migração.
