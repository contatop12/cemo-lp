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
