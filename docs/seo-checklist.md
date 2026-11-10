# Checklist de SEO técnico — CEMO

Para quem cria ou revisa páginas e para o lançamento. A infraestrutura fica em `src/lib/seo/` (metadata, rotas/sitemap/robots, JSON-LD) e `src/lib/security/headers.ts`.

## Por página (toda rota indexável)

- [ ] **Title** único via `buildMetadata()`, terminado em ` | CEMO`, sem empilhar keywords (ex.: `Cirurgia de Catarata em Taboão da Serra | CEMO`).
- [ ] **Meta description** única, escrita para clique e clareza (sem keyword stuffing).
- [ ] **Canonical** autorreferente, absoluto, **com barra final** (`trailingSlash: true` preserva o formato do WordPress).
- [ ] **Um único H1**, com a intenção principal da página (ver `docs/keyword-page-map.csv`); headings em ordem.
- [ ] **Conteúdo crítico no HTML inicial** (Server Components/SSG) — nada essencial depende de JS no cliente.
- [ ] **JSON-LD** com `@id` estáveis: clínica (`/#organization`, `Organization` + `MedicalClinic`), site (`/#website`), médicos (`/corpo-clinico/{slug}/#person`, `worksFor` → clínica), breadcrumb. Nunca `Review`/`AggregateRating` autoatribuídos, preço, RQE não validado, `geo` aproximado ou `medicalSpecialty` impreciso.
- [ ] **Breadcrumb** visível + `BreadcrumbList` (exceto Home).
- [ ] **Links internos** semânticos (condição → tratamento → médico → exame → artigo), conforme `docs/information-architecture.md`.
- [ ] **Imagens** com `alt` descritivo, dimensões explícitas, AVIF/WebP via `next/image`; só o hero com prioridade.
- [ ] Página utilitária (`/obrigado/`, `/lp/...`) com `noindex` e **fora do sitemap**.

## Sitemap e robots

- `src/app/sitemap.ts` é gerado do conteúdo (`src/lib/seo/sitemap-routes.ts`): institucionais, hubs, entidades **publicadas**, perfis publicados e os 112 posts migrados, com `lastmod` real (revisão do conteúdo / modificação do post). Utilitárias, `/lp/`, paginação do blog, tratamentos não confirmados e URLs que redirecionam ficam de fora (testado).
- **Decisão (fase 2):** arquivo único `sitemap.xml` (~170 URLs, muito abaixo do limite de 50 mil); o grupo de cada URL fica no dado.
- `robots.txt`: produção = `Allow: /`, `Disallow: /api/` e `Sitemap:`; staging/development = `Disallow: /` sem sitemap.
- Além disso, fora de produção todo HTML sai com `<meta name="robots" content="noindex, nofollow">` e header `X-Robots-Tag: noindex, nofollow`.

## Headers de segurança

`X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy` restritiva, `HSTS` (só produção) e CSP.

**Limitação conhecida da CSP:** `script-src` inclui `'unsafe-inline'`. Nonces exigiriam renderização dinâmica de todas as páginas (perda do SSG/CDN); o script inline necessário é o default do Consent Mode, que precisa rodar antes do GTM. Mitigações: `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'self'`, origens externas explícitas (GTM, GA, YouTube sem cookies, Maps). Reavaliar com hashes se o conteúdo inline estabilizar.

## Lançamento (gate)

- [ ] `SITE_ENV=production` e `NEXT_PUBLIC_SITE_URL=https://oftalmologiacemo.com.br` **no build**.
- [ ] `robots.txt` de produção conferido; nenhum `noindex` residual de staging (`curl -I` e HTML).
- [ ] Redirects 301/410 gerados de `docs/seo-migration-map.csv` validados (sem cadeias, sem 404 acidental) — `npm run redirects:check-targets`.
- [ ] Sitemap enviado no Google Search Console; propriedade de domínio verificada.
- [ ] GTM com o ID de produção; eventos do `docs/analytics-plan.md` disparando; nenhum dado de saúde no `dataLayer`.
- [ ] JSON-LD validado no Rich Results Test / Schema Markup Validator.
- [ ] Crawl completo (Screaming Frog ou equivalente) conferindo title, description, H1, canonical, status e links internos.
- [ ] Monitorar no GSC: Home, Catarata, Refrativa, Retina, Glaucoma, páginas de exame, corpo clínico e artigos principais (cliques, impressões, CTR, posição).

## Definition of Done — Home (briefing §158) — status em 2026-10-22

| Item | Status | Evidência / pendência |
|---|---|---|
| Dr. David em destaque na primeira dobra | ✅ | Hero com foto real, cartão-nome e CTA; testes unitários + E2E (LCP = foto do hero) |
| Visual premium | ✅ (validar com cliente) | Direção de arte própria (painel-pálpebra, mira da marca, Literata + Atkinson); QA visual em 5 viewports |
| Mobile excelente | ✅ | Hero projetado à parte; CTA visível sem rolar em 390×844 e 360×740; sem rolagem horizontal (E2E em 5 viewports + 200% de zoom) |
| SEO implementado | ✅ | Title/description/canonical únicos, um H1, JSON-LD (clínica, site, Dr. David), robots/sitemap por ambiente; Lighthouse SEO 100 |
| CTA funcional | ✅ | "Agendar consulta" → formulário; WhatsApp/telefone com eventos genéricos |
| Formulário funcional | ✅ | E2E: lead chega ao webhook com atribuição; falha fechada sem webhook; honeypot; rate limit |
| Prova social | ⚠️ dados a validar | Nota Google, anos e atendimentos centralizados em `stats.ts` com `validated: false` |
| Serviços | ✅ | 8 intenções → URLs canônicas |
| Médicos | ⚠️ | 7 médicos com CRM, RQE (também no JSON-LD) e foto; bios revisadas pendentes |
| Estrutura | ⚠️ | Composição editorial com 6 fotos reais; identificação dos aparelhos e fotos em alta pendentes |
| Localização | ✅ | NAP central, horários, "Como chegar", mapa sob demanda |
| Reviews | ⚠️ | Nota + link para o Google; depoimentos reais aguardam seleção da CEMO |
| Performance | ✅ desktop / ⚠️ mobile simulado | Ver números abaixo |
| Acessibilidade | ✅ | axe (WCAG 2.2 AA) 0 violações em 1440 e 390, com e sem banner; skip link; foco; alvos ≥ 44 px; Lighthouse a11y 100 |

### Lighthouse local (build de produção, `next start`, 2026-10-22)

Medido com os domínios do antivírus Kaspersky bloqueados no navegador de teste — o antivírus desta máquina injeta ~850 KB de scripts/CSS em todas as páginas e distorce o resultado.

| | Performance | A11y | Boas práticas | SEO | LCP | CLS | TBT | FCP |
|---|---|---|---|---|---|---|---|---|
| Desktop | 99 | 100 | 73* | 100 | 0,9 s | 0 | 0 ms | 0,6 s |
| Mobile (4G lento simulado, CPU 4×) | 80 | 100 | 73* | 100 | 4,5 s | 0 | 30 ms | 2,3 s |

\* "Boas práticas" penaliza HTTP local (`is-on-https`) e o 404 do *prefetch* de `/corpo-clinico/` (rota dos próximos planos). Ambos somem em produção/staging com HTTPS e as páginas publicadas.

**Gargalos e ações:** a imagem do hero (AVIF, 13 KB no celular) chega em ~130 ms; o LCP mobile simulado é dominado por *render delay* na simulação Lantern. Já aplicado: fonte de títulos sem o eixo `opsz` (110 → 53 KB), logo sem prioridade alta, `zod` sem probe de `eval`. **Medir LCP/INP reais no staging (PageSpeed Insights / CrUX)** antes de novas otimizações; candidatos se necessário: `preload: false` na Literata (títulos) e CSS crítico.

## Portões de lançamento (bloqueiam o apontamento do domínio)

- [ ] `npm run todos` sem pendências críticas — hoje: **95 ocorrências em 20 arquivos** (src: médicos 26, NAP 4, prova social 3, vídeo 2, convênios 2, equipamentos 2, editoriais 2, demais 1 cada; o restante em docs).
- [x] `npm run redirects:check-targets` com lista vazia (fase 2: 51 de 51 destinos gerados pelo build; o script falha com código 1 se faltar algum).
- [ ] `SITE_ENV=production` e `NEXT_PUBLIC_SITE_URL=https://oftalmologiacemo.com.br` no build de produção; staging com `SITE_ENV=staging`.
- [ ] `LEAD_WEBHOOK_URL` e `LEAD_WEBHOOK_SECRET` configurados (sem eles o formulário falha fechado em produção). `SITE_ENV` definido no build **e** em runtime.
- [ ] HTTPS forçado pela hospedagem (o proxy do site só canonicaliza `www.` → apex). HSTS está com `max-age=31536000`; acrescentar `includeSubDomains; preload` apenas após o dono do domínio confirmar HTTPS em todos os subdomínios.
- [ ] Tag Assistant no staging: conversão do Google Ads e GA4 disparando sem bloqueios de CSP.
- [ ] GTM de produção, Consent Mode e conversões revisados (`docs/analytics-plan.md`).
- [ ] Textos de privacidade e cookies revisados pelo jurídico.
- [ ] Foto do Dr. David em alta resolução; vetor original do logo (ou aprovação do SVG vetorizado); vídeo "Tudo em um lugar só" publicado.
- [ ] Revisão médica de todas as páginas de conteúdo (`npm run launch:check`; roteiro completo em `docs/launch-checklist.md`).
- [ ] Backlinks conferidos antes dos 410 (não havia export de backlinks na análise).
