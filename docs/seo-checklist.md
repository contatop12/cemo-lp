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

- `src/app/sitemap.ts` lista **apenas** rotas existentes e indexáveis (`sitemapRoutes` em `src/lib/seo/routes.ts`; um teste confere que cada rota tem `page.tsx`). Utilitárias, `/lp/`, paginação e `/api/` são descartadas mesmo se listadas por engano.
- **Decisão:** arquivo único `sitemap.xml` nesta fase. Quando o blog migrar (157 posts), dividir em sitemap index por grupo (`pages`, `services`, `doctors`, `blog`).
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
