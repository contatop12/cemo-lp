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
