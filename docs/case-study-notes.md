# CEMO — notas para o case (uso interno da agência)

Registro das decisões estratégicas e técnicas do novo ecossistema digital da CEMO, no formato **problema → decisão → benefício esperado**. Não é exibido no site; serve de base para a apresentação do projeto.

## 2026-10-22 — Fundação

### Replatforming em vez de reforma do WordPress
- **Problema:** site atual em WordPress + Divi + Yoast, com 427 URLs no sitemap, 214 tags finas indexáveis, apenas 42 meta descriptions, sem schema de clínica e com canibalização (8 URLs disputando crosslinking, 9 glaucoma, 8 plástica ocular).
- **Decisão:** reconstrução do zero em Next.js; o WordPress vira apenas fonte de conteúdo, URLs e autoridade. Toda URL atual recebeu uma decisão documentada em `docs/seo-migration-map.csv`.
- **Benefício esperado:** tecnologia nova sem recomeçar o SEO — o patrimônio orgânico (2,7 mil cliques/trimestre, 56% vindos do blog) é preservado.

### Stack
- Next.js 16.4.2 (App Router, Server Components, SSG), React 19.3.1, TypeScript strict (`noUncheckedIndexedAccess`), Tailwind CSS v4 (tokens CSS-first em `@theme`), zod, Vitest + Testing Library, Playwright + axe. Node 24.
- Código sem dependência de APIs exclusivas de uma hospedagem; a plataforma (Vercel, Cloudflare ou equivalente) é decidida no deploy.

### `trailingSlash: true`
- **Problema:** todas as URLs do WordPress terminam com barra (`/especialidades/catarata/`).
- **Decisão:** manter a barra final no Next.js.
- **Benefício:** URLs idênticas às atuais — nenhum redirect desnecessário só por formato.

### Repositório de conteúdo em vez de CMS no primeiro momento
- **Problema:** o CMS headless (recomendação: Sanity) ainda não está configurado, e o projeto não pode ficar bloqueado.
- **Decisão:** interfaces TypeScript + fixtures + camada de repositório + adapter. Trocar a fonte de dados depois não muda páginas nem componentes.
- **Benefício:** desenvolvimento imediato com conteúdo real e tipado; migração para CMS sem retrabalho.

## Como rodar

```bash
npm install
cp .env.example .env.local   # ajuste SITE_ENV e NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
npm test                     # testes unitários/componentes
npm run typecheck && npm run lint
npm run build && npm start
```

## 2026-10-22 — Tipografia e tokens

### Fontes pensadas para baixa visão
- **Problema:** boa parte do público é idoso, tem catarata ou baixa visão; o briefing proíbe sacrificar legibilidade pela estética.
- **Decisão:** corpo em **Atkinson Hyperlegible Next** (Braille Institute; disponível no `next/font/google` como `Atkinson_Hyperlegible_Next`, variável `wght` 200–800 — verificado no `font-data.json` do Next 16.4.2) e títulos em **Literata** (serifa editorial variável, eixos `wght` + `opsz`). Ambas self-hosted pelo `next/font` (sem requisição ao Google em runtime), `display: swap`, subset `latin`. Corpo ≥ 18 px, nada abaixo de 16 px.
- **Benefício:** caracteres desambiguados (I/l/1, 0/O) e leitura confortável sem perder a percepção premium.

### Tokens com contraste testado
- Cores do `docs/design-system.md` §14 copiadas literalmente em `src/app/globals.css` (Tailwind v4 `@theme`). Um teste automatizado calcula o contraste WCAG dos pares críticos e impede que o verde/ciano da marca virem texto sobre fundo claro.

## 2026-10-22 — Fotografia real

- **Problema:** o briefing exige fotos reais (Dr. David no hero, equipamentos como prova de estrutura), mas o material disponível é limitado: a foto do Dr. David tem 853×1280 px e 47 KB (muito comprimida) e as 6 fotos de equipamentos vieram do WhatsApp (960×1280, ~70 KB).
- **Decisão:** usar o material real já (nunca banco de imagens): a foto do Dr. David é servida como cópia byte a byte (recomprimir pioraria) e o recorte mobile 4:5 é corte puro, sem retoque, upscaling ou alteração de rosto/corpo; equipamentos com orientação corrigida, sem EXIF/GPS e sem ampliação. Pipeline reproduzível em `scripts/optimize-images.mjs` (`npm run assets:optimize`). As fotos foram baixadas direto do Drive compartilhado por link.
- **Pendente:** `TODO_CONTENT_VALIDATION: obter original em alta (≥ 2400 px de altura) da foto do Dr. David` e originais/nova sessão para os equipamentos — o layout já está preparado para trocar os arquivos sem mexer em código.

## 2026-10-22 — SEO técnico e segurança

- **Problema:** o WordPress atual não tem schema de clínica, só 42 meta descriptions e nenhuma proteção contra indexação de ambientes de teste.
- **Decisão:** metadata centralizada (title único com sufixo, canonical absoluto com barra final), JSON-LD em grafo com `@id` estáveis (clínica, site, médicos, breadcrumb) e **nenhum** markup enganoso (sem avaliações autoatribuídas, preço, RQE, coordenadas aproximadas — e sem `medicalSpecialty: Optometric`, que confundiria oftalmologia com optometria). Staging bloqueado em três camadas (robots, meta robots e `X-Robots-Tag`). Headers de segurança com CSP explícita; `'unsafe-inline'` aceito conscientemente para preservar o SSG.
- **Benefício:** entidades compreensíveis para buscadores e sistemas generativos, sem risco de penalização por markup indevido nem de staging indexado.

## 2026-10-22 — Motor de redirects (preservação de SEO)

- **Problema:** 427 URLs do WordPress precisam responder 200 ou 301 para o equivalente correto, sem cadeias (A → B → C), sem "tudo para a Home" e preservando `gclid`/UTMs das campanhas.
- **Decisão:** `docs/seo-migration-map.csv` é a fonte única. `npm run redirects:generate` gera `src/lib/redirects/generated.ts` (158 redirects 301 — 120 REDIRECT + 38 CONSOLIDATE —, 206 respostas 410 para tags finas e páginas sem destino, 4 URLs que viram 404 natural, 19 variações de host/formato cobertas pela normalização). O `src/proxy.ts` (Next 16 renomeou `middleware` para `proxy`) aplica tudo num único salto: caixa alta, ausência de barra final, `/index.html`, `www.` e `http` vão direto ao destino final, com a query preservada. `skipTrailingSlashRedirect: true` evita o 308 automático do Next antes do 301. Testes garantem: sem self-redirect, sem cadeia, só 6 destinos para a Home, tabela gerada sincronizada com o CSV.
- **Bug evitado:** a regra http → https gerava loop quando o proxy da hospedagem envia `x-forwarded-proto=http` e o site configurado não é https; agora o redirect só ocorre quando o destino é de fato outra URL (coberto por teste).
- **Gate de lançamento:** os destinos dos próximos planos (Catarata, Refrativa, exames, blog…) ainda não existem e retornam 404 em staging. `npm run redirects:check-targets` lista os ausentes; o domínio só é apontado com a lista vazia.

## 2026-10-22 — Captura de leads

- **Problema:** o site atual depende do WhatsApp; se o paciente desiste no meio do caminho, o contato se perde. O campo "O que você está buscando?" pode revelar dado de saúde (LGPD).
- **Decisão:** formulário curto (nome, WhatsApp, interesse) que **registra o lead antes** de oferecer o WhatsApp. API `/api/lead/` com validação no cliente e no servidor (zod), normalização de telefone brasileiro (DDD + fixo/celular), sanitização, honeypot, limite de 10 KB, checagem de `Origin` e `Content-Type`, e rate limit (5 envios/10 min por IP). O destino é uma interface `LeadProvider`: hoje um webhook configurável por variável de ambiente (CRM, automação, e-mail ou banco podem entrar sem mudar o site). Nenhum log contém nome, telefone ou interesse.
- **Falha fechada:** em produção sem webhook configurado, a API responde 503 e o formulário mostra a alternativa do WhatsApp — o lead nunca é descartado em silêncio. Webhook lento (> 8 s) ou com erro → 502, sem retry automático (evita lead duplicado).
- **Limitações conhecidas:** o rate limit é em memória, por instância — em ambiente serverless/multi-instância é *best-effort*; o próximo degrau é um store compartilhado ou Cloudflare Turnstile. O IP vem do primeiro valor de `x-forwarded-for`, confiável apenas atrás do proxy da hospedagem.

## 2026-10-22 — Hero com o Dr. David

- **Decisão de direção de arte:** painel-pálpebra na cor exata do fundo da foto (a foto se funde sem recorte do corpo), curva assimétrica da pálpebra no canto, cartão-nome sólido na base e a mira da logo como motivo de marca.
- **Correção de rota (QA visual):** o design previa a mira centrada no olhar do médico. No protótipo, cruz + círculo sobre a cabeça liam como **mira de arma** — inaceitável para a imagem do Dr. David e da clínica. A mira passou a ser um detalhe pequeno sobre o fundo do painel, junto à curva da pálpebra, ecoando a logo sem tocar o rosto.
- **Mobile projetado à parte:** recorte 4:5 com arco-pálpebra; foto limitada a 32svh para que "Agendar consulta" apareça sem rolar em 390×844 e 360×740 (medido com Playwright no build de produção). O logo do header deixou de ter prioridade alta para não competir com a foto, que é o LCP (`<picture>` com preload das duas fontes por `media`).
- **Pendente:** foto original em alta resolução — a atual (853×1280, 47 KB) funciona no layout, mas perde nitidez em telas retina.

## 2026-10-22 — Home completa (QA visual)

- **Jornada implementada (briefing §47):** hero → prova → agendamento → "Como podemos cuidar da sua visão?" (8 intenções) → Catarata → Refrativa → Dr. David → estrutura → corpo clínico → avaliações → convênios → localização → conteúdos → CTA final. A seção de vídeo existe, mas fica omitida até o vídeo ser publicado (sem "em breve").
- **QA em 1440, 1280, 820, 390 e 360 px (Playwright, build de produção):** 0 px de rolagem horizontal; menor fonte visível 16 px; CTA principal visível sem rolar no celular.
- **Correções vindas do QA:** (1) o título do CTA final ficava sob a curva-pálpebra (texto branco sobre fundo branco) → raio fixo e espaço superior; (2) a composição dos equipamentos deixava um vazio sob a foto-âncora → âncora + 2 recortes ao lado + faixa de 3 recortes com alturas diferentes (§7.2); (3) imagens "em branco" na captura de página inteira eram artefato do *lazy loading* — confirmado que carregam ao rolar (0 falhas no otimizador).
- **Observação de tipografia:** os zeros "cortados" nos horários são o zero com barra da Atkinson Hyperlegible — intencional, para não confundir 0 e O.
- **Pendências que impactam a Home:** fotos dos demais médicos (hoje monogramas), seleção de avaliações reais do Google, publicação do vídeo, logos dos convênios, identificação dos equipamentos.

## 2026-10-22 — 404 e páginas legais

- **404 humanizada sem busca:** o site ainda não tem busca interna (o briefing permite deixá-la fora do primeiro MVP). A 404 oferece os caminhos mais úteis (início, especialidades, exames, corpo clínico, contato) e o WhatsApp; status HTTP 404 real e `noindex`.
- **Privacidade e cookies preliminares:** descrevem apenas o que o site de fato coleta (nome, WhatsApp, interesse e parâmetros de campanha, com a finalidade de retornar o contato). Nada de CNPJ, encarregado (DPO) ou prazos de retenção inventados — marcados como `TODO_CONTENT_VALIDATION` para o jurídico. A página de cookies tem um botão que apaga a escolha e reabre o banner.

## 2026-10-22 — Qualidade e trade-offs finais da fundação

- **Testes:** 378 testes unitários/componentes (Vitest) e 53 E2E (Playwright em 5 viewports: Home, SEO técnico, leads com webhook falso, redirects, acessibilidade com axe e responsividade). O E2E encontrou e corrigiu: `aria-label` proibido em `<p>` (nota do Google), link do rodapé com alvo estreito, e duas metodologias de teste que mediam errado (meta robots duplicada na 404 é o `noindex` do próprio Next; zoom 200% = viewport de 640 px).
- **Performance:** desktop 99 no Lighthouse; mobile simulado 80 — medição local contaminada por antivírus (injeção bloqueada no navegador de teste). Fonte de títulos reduzida pela metade (sem eixo `opsz`). Medição de campo fica para o staging.
- **CSP:** `'unsafe-inline'` em scripts (para manter SSG e o default do Consent Mode inline); `unsafe-eval` nunca em produção — o `zod` foi configurado sem o modo JIT para não disparar violação.
- **Rate limit em memória**, por instância (best-effort em serverless) — próximo degrau: store compartilhado ou Turnstile.
- **Hero sem fade na foto** (protege o LCP); só o texto sobe 12 px, e nada anima com movimento reduzido.
- **Sitemap único** nesta fase; sitemap index por grupo quando o blog migrar.
- **Barra fixa no celular oculta enquanto o aviso de cookies está pendente** — nunca disputam a base da tela.
- **Nenhum depoimento, número, RQE, preço ou técnica inventados;** convênios exibidos por nome (sem logos até a CEMO fornecer).
- **Destinos de redirect pendentes:** 52 destinos do mapa de migração dependem das páginas dos próximos planos; o domínio só é apontado com `redirects:check-targets` vazio.

## 2026-10-22 — Revisão final independente e correções

Uma revisão independente do branch inteiro não encontrou falhas críticas. Corrigimos (cada uma com teste que falhava antes):
- **Banner de cookies preso com o armazenamento bloqueado** → a escolha passa a valer em memória na página atual.
- **Nomes com apóstrofo tipográfico (’)** — padrão do iPhone em "D’Ávila" — eram recusados → normalizados.
- **Falha aberta por configuração:** sem `SITE_ENV` em runtime, leads iriam para um destino em memória → o provider de memória agora exige `next dev` ou opt-in explícito (`LEAD_PROVIDER=dev`) e nunca vale em produção.
- **CSP pronta para a conversão do Google Ads e o Pixel da Meta** carregados via GTM.
- **429 também oferece o WhatsApp** (o paciente nunca fica sem caminho).
- **Sem redirect por `x-forwarded-proto`:** HTTPS fica com a hospedagem + HSTS (evita loop atrás de proxy TLS).
- **Mega menu fecha quando o foco de teclado sai** (WCAG 2.4.11).
- **HSTS sem `includeSubDomains; preload`** até o dono do domínio confirmar.

## 2026-10-22 — Hospedagem no Cloudflare Workers

- **Decisão:** Cloudflare Workers com o adaptador OpenNext (`@opennextjs/cloudflare`) e deploy automático (Workers Builds) a cada push na `main`. Primeiro ambiente: **staging** (noindex em três camadas).
- **Cache:** site 100% estático → cache incremental em assets do próprio Worker (sem bucket R2/KV para criar ou pagar).
- **Imagens:** binding Cloudflare Images para servir AVIF/WebP (a foto do hero cai para ~11 KB no celular).
- **Ajuste de código:** a API de leads passou a aceitar também a própria origem da requisição (além do domínio configurado), para o staging em `*.workers.dev` funcionar sem depender de a URL de build estar perfeita — sites de terceiros continuam recusados.
- **Verificação:** build completo (Next + OpenNext) e smoke test no `workerd` local: Home, redirects 301 em um salto, 410, staging noindex, imagens AVIF e falha fechada da API sem webhook.
- **Risco aceito:** o middleware Node.js (proxy de redirects) é experimental no OpenNext para Cloudflare — monitorar após o deploy. Guia completo em `docs/deploy-cloudflare.md`.
