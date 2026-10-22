# CEMO — Fundação + Home: plano de implementação

> **Para agentes executores:** SUB-SKILL OBRIGATÓRIA: use superpowers:subagent-driven-development (recomendado) ou superpowers:executing-plans para implementar este plano tarefa a tarefa. Os passos usam checkboxes (`- [ ]`).

**Goal:** Entregar a fundação técnica (stack, design tokens, camada de conteúdo, SEO, redirects, leads, analytics, shell do site) e a Home completa do novo oftalmologiacemo.com.br, pronta para staging e para a Definition of Done da Home do briefing.

**Architecture:** Next.js App Router com Server Components e SSG por padrão; Client Components só onde há interação (menus, formulário, banner, facades). Conteúdo vem de uma camada `ContentRepository` (interfaces TS + fixtures + adapter) que permite trocar por Sanity depois. Leads passam por um route handler com validação zod, honeypot, rate limit e uma interface `LeadProvider` (webhook + fallback de desenvolvimento). Redirects são gerados do CSV de migração e servidos pelo proxy/middleware do Next.

**Tech Stack:** Next.js (latest stable, verificado: 16.4.2), React 19, TypeScript strict, Tailwind CSS v4 (`@theme`), `next/font`, zod, lucide-react, sharp + potrace (scripts), Vitest + Testing Library, Playwright + axe. npm. Sem dependência de API exclusiva da Vercel.

**Spec (executores leem todos):**
- `docs/information-architecture.md` (rotas, navegação, breadcrumbs, linkagem, redirects §9)
- `docs/design-system.md` (tokens §2–5, tipografia §3, hero §9, componentes §10, bloco Tailwind §14, foto §15)
- `docs/seo-migration-map.csv` (colunas `current_url,new_url,action,page_type,…,notes`)
- `docs/current-site-audit.md` e `_materiais/analise/site-entities.json` (NAP, 8 médicos, convênios, horários)
- `_materiais/dados/briefing-novo-site-cemo.pdf` (hero, Home, formulário, LGPD, atribuição, stack, performance, a11y, analytics, SEO técnico, DoD). Sem `pdftoppm` o Read de PDF falha; use `pdftotext -enc UTF-8 -layout -f N -l M arquivo.pdf -` (disponível no Git Bash).
- Fora deste plano (planos seguintes): Catarata, Refrativa, uma página de exame, Corpo Clínico, blog, demais rotas.

## Global Constraints

Todas as tarefas herdam estas regras.

- **Stack:** Next.js estável mais recente (verificar `npm view next version` na Task 1 e fixar), App Router, `trailingSlash: true`, TypeScript `strict` + `noUncheckedIndexedAccess`, Tailwind v4 CSS-first (bloco `@theme` de `docs/design-system.md` §14 copiado sem renomear tokens), alias `@/*` → `src/*`. Node 24.11 / npm 11.6. Windows: scripts em Node (`.mjs`/`.ts`), nunca `rm -rf`/`cp` de shell nos scripts do projeto.
- **Server Components por padrão.** `"use client"` só em: menus, MobileNav, LeadForm, CookieBanner, StickyMobileCTA, VideoFacade, LazyMap, TrackedLink, AttributionCapture, OpenNowBadge. Componentes de apresentação são síncronos e recebem dados por props (páginas async buscam no repositório). Conteúdo SEO-crítico existe no HTML inicial.
- **Nunca inventar fatos.** Dado ausente → comentário/flag `TODO_CONTENT_VALIDATION: …` no dado (campo `todos: string[]`) e placeholder contextual; nunca lorem ipsum. Proibido inventar RQE, preço, prazo, técnica cirúrgica, nota/avaliação, formação.
- **Números de prova social só na config central** (`src/content/fixtures/stats.ts`): nota Google 4,9, "mais de 2,1 mil avaliações", "+20 anos" (conflito 20 vs 15 anos), "+100 mil atendimentos" — todos `validated: false`. Nenhum componente/página os escreve literalmente (teste-guarda na Task 3).
- **NAP central** (`src/content/fixtures/site-settings.ts`): CEMO – Centro de Microcirurgia Ocular; Rua Levi de Souza e Silva, 81; bairro "Centro" (TODO: discrepância Centro × Jardim Bom Tempo); Taboão da Serra/SP; CEP 06763-170; telefone (11) 4788-3536 (`+551147883536`); WhatsApp (11) 94701-6162 (`5511947016162`); e-mail sac@oftalmologiacemo.com.br; horários seg–qui 08:00–18:00, sex 08:00–17:00, sáb 08:00–12:00; Instagram/Facebook `cemooftalmologia`.
- **Tokens e tipografia:** corpo ≥ 18 px, nenhum texto < 16 px; botões ≥ 52 px de altura, alvos ≥ 48×48 px; verde `#9EC227` e ciano `#27A1CF` nunca como texto sobre claro; WhatsApp usa `--color-whatsapp #0B6B3A`. Fontes: Literata (títulos) + Atkinson Hyperlegible Next (corpo) via `next/font/google`, `display: swap`, subset `latin`; fallback Atkinson Hyperlegible se a família "Next" não existir no `next/font` (Task 2 verifica).
- **Movimento:** só a entrada única do hero (texto sobe 12 px, 480 ms, CSS puro; a foto NÃO faz fade, para proteger o LCP). Sem biblioteca de animação, sem parallax, sem animação infinita. `prefers-reduced-motion` zera tudo; conteúdo nunca nasce `opacity:0` dependente de JS.
- **Performance:** LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1. Imagem do hero: `fetchpriority="high"`, sem lazy, dimensões explícitas, `sizes` corretos, preload; AVIF/WebP via `next/image`; vídeo e mapa só com facade/clique. Sem libs pesadas.
- **A11y WCAG 2.2 AA:** skip link, landmarks, um `h1`, ordem de headings, `:focus-visible`, labels, erros acessíveis, `lang="pt-BR"`, foco não obscurecido pelo sticky CTA. Viewports de QA: 1440, 1280, 820 (tablet), 390, 360.
- **LGPD/analytics:** `dataLayer` só com os 8 eventos genéricos (`lead_form_start`, `lead_form_submit`, `whatsapp_click`, `phone_click`, `schedule_click`, `directions_click`, `reviews_click`, `service_cta_click`); parâmetros permitidos: `location`, `page_type`, `form_id`. Jamais nome, telefone, interesse/serviço ou condição em analytics, logs ou URLs. Mensagem pré-preenchida do WhatsApp é genérica ("Olá! Gostaria de agendar uma consulta no CEMO."), sem informação de saúde. Consent Mode v2: tudo `denied` por padrão.
- **SEO:** `<title>` único terminado em ` | CEMO`; description única; canonical autorreferente; Home com JSON-LD `@graph` com `@id` estáveis; sem `Review`/`AggregateRating` auto-servido; sem RQE, preço, `geo` aproximado. Staging (`SITE_ENV=staging`) = noindex + `Disallow: /`; produção indexável.
- **Segredos:** só em variáveis de ambiente server-side (`LEAD_WEBHOOK_URL`, `LEAD_WEBHOOK_SECRET`); `.env*` ignorado exceto `.env.example`. `_materiais/` é ignorado pelo git e nunca é commitado.
- **Commits:** Conventional Commits, um por tarefa, com o rodapé exato `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` como último parágrafo (`git commit -m "<assunto>" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`). Nunca `--no-verify`.
- **Idioma:** textos de interface e docs em pt-BR; identificadores, comandos e nomes de arquivo em inglês/ASCII.

## Review Focus

Entradas/condições que a spec implica mas nenhuma tarefa de feature testaria sozinha (cada uma tem teste na tarefa dona, marcada "RF-n").

1. **RF-1 WhatsApp em formatos reais e corpos hostis:** `+55 (11) 94701-6162`, `011 94701-6162`, fixo, com letras coladas, `"1234"`; JSON malformado, corpo > 10 KB, `Content-Type` errado, `Origin` de outro site. Esperado: normaliza ou 400/413/415/403, nunca 500. → Task 9.
2. **RF-2 `localStorage`/`sessionStorage` bloqueado ou lançando (aba anônima, Safari ITP):** consentimento, atribuição e banner não podem quebrar a página nem o envio do lead. → Tasks 6 e 10.
3. **RF-3 Redirects com query string e variações:** `?gclid=…`/`?utm_*` preservados; caixa alta, sem barra final, `/index.html`, hífen final; `/_next/*`, `/api/*` e arquivos estáticos nunca interceptados; um único salto (sem cadeia 308+301). → Task 8.
4. **RF-4 Duplo envio e webhook lento/fora do ar:** duplo clique gera uma única requisição; webhook > 8 s ou 5xx → 502 `provider_error` (falha fechada, mostra alternativa WhatsApp, nada logado com PII). → Tasks 9 e 10.
5. **RF-5 Tela estreita e zoom:** 360 px e zoom 200 % sem rolagem horizontal; StickyMobileCTA e banner de cookies não se sobrepõem nem cobrem elemento focado. → Tasks 12 e 17.

---

## Mapa de arquivos

```
.env.example  .nvmrc  next.config.ts  vitest.config.ts  playwright.config.ts  eslint.config.mjs
scripts/       optimize-images.mjs  trace-logo.mjs  generate-redirects.ts  check-redirect-targets.ts  list-todos.mjs
e2e/           *.spec.ts  stub-webhook.mjs
public/        brand/  images/  (derivados otimizados; originais ficam em _materiais/)
src/proxy.ts   (ou middleware.ts, conforme versão — Task 8)
src/app/       layout.tsx fonts.ts globals.css page.tsx not-found.tsx robots.ts sitemap.ts
               obrigado/ privacidade/ cookies/ api/lead/route.ts
src/content/   types.ts navigation.ts assets.ts index.ts adapters/fixtures.ts fixtures/*.ts
src/lib/       env.ts cn.ts contact.ts hours.ts attribution.ts analytics/ leads/ seo/ redirects/ security/
src/components/ ui/ brand/ layout/ analytics/ forms/ media/ home/
docs/          content-model.md analytics-plan.md seo-checklist.md case-study-notes.md
```

---

### Task 1: Bootstrap do repositório, tooling e `env`

**Files:**
- Create: `package.json`, `.nvmrc` (`24`), `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `vitest.config.ts`, `vitest.setup.ts`, `playwright.config.ts`, `.env.example`, `src/lib/cn.ts`, `src/lib/env.ts`, `src/app/layout.tsx` (mínimo), `src/app/page.tsx` (stub com `<h1>`), `docs/case-study-notes.md`
- Modify: `.gitignore`
- Test: `src/lib/cn.test.ts`, `src/lib/env.test.ts`

**Interfaces:**
- Produces (`src/lib/env.ts`):
  ```ts
  export type SiteEnv = 'development' | 'staging' | 'production';
  export function getSiteEnv(): SiteEnv;            // process.env.SITE_ENV; inválido/ausente => 'development'
  export function getSiteUrl(): string;             // NEXT_PUBLIC_SITE_URL sem barra final; default 'http://localhost:3000'
  export function getPublicEnv(): { siteEnv: SiteEnv; siteUrl: string; gtmId: string | undefined };
  export function getServerEnv(): { siteEnv: SiteEnv; leadWebhookUrl: string | undefined; leadWebhookSecret: string | undefined };
  ```
  `getServerEnv` lê `process.env` a cada chamada (nunca em escopo de módulo).
- Produces (`src/lib/cn.ts`): `export function cn(...parts: Array<string | false | null | undefined>): string`

- [ ] **Step 1: Verificar versões e instalar.** `npm view next version` (esperado 16.x). `npm init -y`, depois `npm i next@latest react@latest react-dom@latest zod lucide-react` e `npm i -D typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss postcss eslint eslint-config-next vitest @vitejs/plugin-react jsdom vite-tsconfig-paths @testing-library/react @testing-library/jest-dom @testing-library/user-event @playwright/test @axe-core/playwright sharp potrace csv-parse`. Fixar as versões resolvidas (sem `^` em `next`/`react`). Não usar `create-next-app` (a pasta já tem `.git`, `docs/`, `_materiais/`). `npx playwright install chromium`.
- [ ] **Step 2: Configs.** `tsconfig.json` strict + `noUncheckedIndexedAccess` + `paths`. `next.config.ts`: `trailingSlash: true`, `poweredByHeader: false`, `images.formats: ['image/avif','image/webp']`, `images.qualities: [60, 75, 85]` (Next 16 exige listar qualidades usadas). `vitest.config.ts`: plugin react + `vite-tsconfig-paths`, `environment: 'jsdom'`, `setupFiles: ['./vitest.setup.ts']` (importa `@testing-library/jest-dom/vitest`), `include: ['src/**/*.test.{ts,tsx}', 'scripts/**/*.test.ts']`; testes de Node puro usam `// @vitest-environment node`. `playwright.config.ts` fica para a Task 17 (aqui só um esqueleto com `testDir: 'e2e'`). Scripts npm: `dev`, `build`, `start`, `lint` (`eslint .`), `typecheck` (`tsc --noEmit`), `test` (`vitest run`), `test:e2e` (`playwright test`), `redirects:generate` (`node scripts/generate-redirects.ts`), `assets:optimize`, `todos` (`node scripts/list-todos.mjs`). Nota: Node 24 executa `.ts` com type-stripping; scripts `.ts` usam só `import type` e extensões `.ts` explícitas.
- [ ] **Step 3: Escrever testes que falham.** `cn.test.ts`: `cn('a', false, undefined, 'b') === 'a b'`. `env.test.ts` (com `vi.stubEnv`): `SITE_ENV=staging` → `'staging'`; `SITE_ENV=banana` → `'development'`; `NEXT_PUBLIC_SITE_URL='https://x.com.br/'` → `'https://x.com.br'`; `getServerEnv().leadWebhookUrl` muda após novo `stubEnv` (leitura tardia).
- [ ] **Step 4: Rodar e ver falhar.** `npx vitest run src/lib` → FAIL (módulos inexistentes).
- [ ] **Step 5: Implementar** `cn` e `env` conforme as assinaturas.
- [ ] **Step 6: `.gitignore`.** Acrescentar `/test-results/`, `/playwright-report/`, `coverage/`, `*.tsbuildinfo`, `next-env.d.ts`. Manter `_materiais/`, `.env*`, `!.env.example`. `.env.example` com: `SITE_ENV=development`, `NEXT_PUBLIC_SITE_URL=http://localhost:3000`, `NEXT_PUBLIC_GTM_ID=`, `LEAD_WEBHOOK_URL=`, `LEAD_WEBHOOK_SECRET=`, `CONTENT_SOURCE=fixtures`. Observação no próprio arquivo: `SITE_ENV` precisa existir em tempo de **build** (metadata/robots são estáticos).
- [ ] **Step 7: `docs/case-study-notes.md`** — log de decisões para a agência, iniciado com: stack escolhida e versões, `trailingSlash`, repositório de conteúdo em vez de CMS, e "como rodar". Será ampliado nas Tasks 8, 9 e 17.
- [ ] **Step 8: Verificar.** `npm run typecheck && npm run lint && npm test` → tudo verde; `npm run build` → sucesso; `git check-ignore -v _materiais/fotos/dr-david.jpeg` imprime a regra de `.gitignore`.
- [ ] **Step 9: Commit** (inclui os arquivos já existentes e não rastreados de `docs/` e o `.gitignore`):
  ```bash
  git add .gitignore docs package.json package-lock.json .nvmrc tsconfig.json next.config.ts eslint.config.mjs postcss.config.mjs vitest.config.ts vitest.setup.ts playwright.config.ts .env.example src scripts
  git status --short   # conferir: nada de _materiais/ nem .env
  git commit -m "chore: bootstrap Next.js, tooling e specs do projeto" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
  ```

---

### Task 2: Design tokens, fontes e primitivos de UI

**Files:**
- Create: `src/app/globals.css`, `src/app/fonts.ts`, `src/components/ui/{Button,Container,Section,SkipLink}.tsx`, `src/components/ui/icons.tsx`
- Modify: `src/app/layout.tsx`
- Test: `src/components/ui/ui.test.tsx`, `src/app/tokens.test.ts`

**Interfaces:**
- Consumes: `cn` (Task 1).
- Produces:
  ```ts
  // src/app/fonts.ts
  export const literata: NextFontWithVariable;   // variable '--font-literata'
  export const atkinson: NextFontWithVariable;   // variable '--font-atkinson'
  // src/components/ui/Button.tsx  (server-compatible; <a> via next/link quando href, senão <button>)
  export type ButtonVariant = 'primary' | 'whatsapp' | 'secondary' | 'onDark' | 'link';
  export type ButtonProps = { variant?: ButtonVariant; href?: string; children: React.ReactNode; className?: string }
    & Omit<React.ComponentPropsWithoutRef<'button'>, 'className' | 'children'>;
  export function Button(props: ButtonProps): JSX.Element;
  // Container.tsx
  export function Container(p: { size?: 'site' | 'wide' | 'prose'; as?: 'div' | 'section'; className?: string; children: React.ReactNode }): JSX.Element;
  // Section.tsx
  export function Section(p: { id?: string; tone?: 'papel' | 'nevoa' | 'escuro'; labelledBy?: string; className?: string; children: React.ReactNode }): JSX.Element; // <section aria-labelledby>, padding vertical var(--space-section); tone 'escuro' adiciona classe on-dark
  // SkipLink.tsx
  export function SkipLink(): JSX.Element;       // <a href="#conteudo">Ir para o conteúdo</a>, visível só no foco
  // icons.tsx — SVGs inline, aria-hidden
  export function WhatsappIcon(p: { className?: string }): JSX.Element;
  export function StarIcon(p: { filled?: boolean; className?: string }): JSX.Element;
  export function Reticle(p: { className?: string }): JSX.Element;   // círculo + cruz com vazado central, traço 1,5px, currentColor
  ```
- [ ] **Step 1: Verificar a família de fonte.** Localizar `font-data.json` do `next/font/google` em `node_modules/next/dist/compiled/@next/font/dist/google/` e procurar `Atkinson Hyperlegible Next` (`grep -o '"Atkinson Hyperlegible[^"]*"'`). Se existir, usar o export `Atkinson_Hyperlegible_Next`; senão, `Atkinson_Hyperlegible` com `weight: ['400','700']`. Registrar o resultado em `docs/case-study-notes.md`. Literata: variável, `axes: ['opsz']` se aceito pelo font-data.
- [ ] **Step 2: Testes (falham).** `tokens.test.ts` (Node, lê `globals.css`): contém `@import "tailwindcss"` e cada token de cor de `docs/design-system.md` §2.1 (`--color-azul-cemo: #0066B1`, `--color-azul-700: #004F8C`, `--color-azul-profundo: #072A4A`, `--color-tinta: #0F2236`, `--color-tinta-suave: #3D4F63`, `--color-nevoa: #F2F6FA`, `--color-estudio: #C7C8C5`, `--color-whatsapp: #0B6B3A`, `--color-erro: #B3261E`…), `prefers-reduced-motion`, `--breakpoint-xs: 24.375rem`. Mais um teste de contraste calculado (fórmula WCAG no próprio teste): `tinta/papel ≥ 16`, `papel/azul-cemo ≥ 5.9`, `papel/whatsapp ≥ 6.5`, `verde-texto/papel ≥ 6`, e `verde-cemo/papel < 3` (guarda: nunca como texto). `ui.test.tsx`: `<Button href="/x">Agendar</Button>` renderiza `a[href="/x"]`; sem href renderiza `button` com `type="button"` por padrão; classes incluem `min-h-[3.25rem]`; `SkipLink` tem `href="#conteudo"`; `Section tone="escuro"` aplica `on-dark`.
- [ ] **Step 3: Rodar → FAIL.** `npx vitest run src/app src/components/ui`.
- [ ] **Step 4: Implementar.** `globals.css` = bloco do §14 do design-system copiado **verbatim** (inclui `@layer base`, `@utility radius-lid`, `@utility min-target`); acrescentar utilitário `.sr-only-focusable` (SkipLink) e keyframes `hero-rise` (transform 12 px → 0, 480 ms, `animation-fill-mode: both`) dentro de `@media (prefers-reduced-motion: no-preference)`. `layout.tsx`: `<html lang="pt-BR" className={`${literata.variable} ${atkinson.variable}`}>`, `<body>` com `SkipLink` e `<main id="conteudo" tabIndex={-1}>`.
- [ ] **Step 5: Verificar.** `npm test && npm run build`; abrir `npm run dev` e conferir visualmente que fontes carregam (Network: arquivos `.woff2` próprios, sem chamada a fonts.googleapis em runtime).
- [ ] **Step 6: Commit.** `git add src docs/case-study-notes.md && git commit -m "feat(ui): tokens Tailwind v4, fontes e primitivos de UI" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

### Task 3: Modelo de conteúdo, fixtures, repositório e helpers de contato

**Files:**
- Create: `src/content/types.ts`, `src/content/fixtures/{site-settings,stats,doctors,services,insurance-plans,testimonials,videos,articles,lead-interests,editorial}.ts`, `src/content/adapters/fixtures.ts`, `src/content/index.ts`, `src/lib/contact.ts`, `src/lib/hours.ts`, `docs/content-model.md`
- Test: `src/content/repository.test.ts`, `src/content/no-hardcoded-facts.test.ts`, `src/lib/contact.test.ts`, `src/lib/hours.test.ts`

**Interfaces:**
- Produces (`src/content/types.ts` — nomes exatos; todas as tarefas seguintes importam daqui):
  ```ts
  export interface ImageAsset { src: string; width: number; height: number; alt: string }
  export type DayOfWeek = 'Monday'|'Tuesday'|'Wednesday'|'Thursday'|'Friday'|'Saturday'|'Sunday';
  export interface OpeningHoursSpec { days: DayOfWeek[]; opens: string; closes: string }   // 'HH:mm'
  export interface SiteSettings {
    name: string; shortName: string; siteUrl: string;
    address: { streetAddress: string; neighborhood: string; city: string; region: string; postalCode: string; country: 'BR' };
    phone: { display: string; e164: string };
    whatsapp: { display: string; e164: string; digits: string };
    email: string; hours: OpeningHoursSpec[];
    social: { instagram: string; facebook: string };
    googleBusiness: { profileUrl: string | null; reviewsUrl: string | null };
    externalExamOnlineUrl: string | null;     // https://cemo.sivoe.med.br (TODO continuidade)
    technicalResponsibleSlug: string;         // 'david-ribeiro-de-mendonca-filho'
    todos: string[];
  }
  export interface SiteStats {
    googleRating: { score: number; display: string; reviewsLabel: string; validated: boolean };      // 4.9 / '4,9' / 'mais de 2,1 mil avaliações'
    yearsOfActivity: { display: string; label: string; validated: boolean };                          // '+20' / 'anos de atividade'
    patientsServed: { display: string; label: string; validated: boolean };                           // '+100 mil' / 'atendimentos'
    todos: string[];
  }
  export interface Doctor {
    slug: string; name: string; honorific: 'Dr.' | 'Dra.'; crm: string; rqe: string | null; role: string | null;
    areas: string[]; credentials: string[];          // transcritos do site atual, validated=false
    photo: ImageAsset | null; photoMobile?: ImageAsset;
    canonicalPath: string;                           // '/corpo-clinico/{slug}/'
    published: boolean;                              // perfil individual existe? (false nesta fase)
    featured: boolean; todos: string[];
  }
  export type ServiceId = 'consulta'|'catarata'|'refrativa'|'retina'|'glaucoma'|'cornea'|'oftalmopediatria'|'exames';
  export interface Service { id: ServiceId; title: string; summary: string; href: string; ctaLabel: string; homeOrder: number }
  export const LEAD_INTEREST_IDS = ['consulta','catarata','refrativa','retina','glaucoma','cornea','oftalmopediatria','estrabismo','plastica-ocular','exames','convenios','outro'] as const;
  export type LeadInterestId = (typeof LEAD_INTEREST_IDS)[number];
  export interface LeadInterest { id: LeadInterestId; label: string }
  export interface InsurancePlan { id: string; name: string; logo: ImageAsset | null; todos: string[] }
  export interface Testimonial { id: string; author: string; text: string; rating: number; date: string; sourceUrl: string }
  export interface VideoItem { id: string; title: string; youtubeId: string | null; poster: ImageAsset | null; transcriptUrl: string | null; todos: string[] }
  export interface ArticleLink { slug: string; title: string; href: string; excerpt: string | null; publishedAt: string; image: ImageAsset | null }
  export interface EquipmentItem { id: string; photo: ImageAsset; caption: string; objectPosition: string; todos: string[] }
  export interface EditorialContent { id: 'catarata' | 'refrativa'; heading: string; paragraphs: string[]; bullets: string[]; ctaLabel: string; href: string; todos: string[] }
  export interface NavLink { label: string; href: string; published?: boolean; external?: boolean }
  export interface NavGroup { id: 'especialidades'|'cirurgias'|'exames'|'corpo-clinico'|'conteudos'|'a-cemo'; label: string; kind: 'mega'|'dropdown'|'link'; href?: string; links: NavLink[]; viewAll?: NavLink; featured?: NavLink }
  ```
  `src/content/index.ts`:
  ```ts
  export interface ContentRepository {
    getSiteSettings(): Promise<SiteSettings>;
    getSiteStats(): Promise<SiteStats>;
    listDoctors(): Promise<Doctor[]>;                    // featured primeiro (Dr. David), depois ordem do site atual
    getDoctorBySlug(slug: string): Promise<Doctor | null>;
    listServices(): Promise<Service[]>;                  // os 8 cards da Home, ordenados por homeOrder
    listLeadInterests(): Promise<LeadInterest[]>;        // 12 opções do select
    listInsurancePlans(): Promise<InsurancePlan[]>;      // 16
    listTestimonials(): Promise<Testimonial[]>;          // [] por ora
    getVideo(id: 'tudo-em-um-lugar-so'): Promise<VideoItem>;
    listEquipment(): Promise<EquipmentItem[]>;           // 6
    getEditorial(id: 'catarata' | 'refrativa'): Promise<EditorialContent>;
    listFeaturedArticles(limit: number): Promise<ArticleLink[]>;
    getNavigation(): Promise<NavGroup[]>;                // preenchido na Task 11 (aqui retorna [])
  }
  export const content: ContentRepository;               // adapter escolhido por CONTENT_SOURCE ('fixtures' padrão)
  ```
  `src/lib/contact.ts`: `whatsappHref(s: SiteSettings, message?: string): string` (`https://wa.me/{digits}?text=…`, default "Olá! Gostaria de agendar uma consulta no CEMO."), `telHref(s: SiteSettings): string` (`tel:+551147883536`), `directionsHref(s: SiteSettings): string` (`https://www.google.com/maps/dir/?api=1&destination=<endereço codificado>`), `mapsEmbedSrc(s: SiteSettings): string` (`https://www.google.com/maps?q=<endereço codificado>&output=embed`), `reviewsHref(s: SiteSettings): string` (usa `googleBusiness.reviewsUrl`, senão busca no Maps por nome+cidade; TODO no dado), `formatAddress(s: SiteSettings): string`, `formatHoursLines(s: SiteSettings): string[]`.
  `src/lib/hours.ts`: `isOpenNow(hours: OpeningHoursSpec[], now: Date): boolean` (fuso `America/Sao_Paulo`; `closes` exclusivo).

Dados obrigatórios (valores exatos):
- Médicos (slug → CRM, áreas do site atual): `david-ribeiro-de-mendonca-filho` CRM/SP 98339 (Diretor Técnico; Cirurgias Refrativas, Catarata, Ceratocone, Retina Clínica; `featured`), `priscilla-pires` 84340 (Catarata e Refrativa), `cintia-gomes-galvao` 97952 (Plástica Ocular), `rodrigo-arantes` 141481 (Catarata), `adriana-bizzarri` 91030 (Estrabismo e Oftalmopediatria), `adriano-de-morais-ferreira` 152423 (Retina), `bruna-de-andrade-nascimento` 128889 (Catarata e Refrativa), `roberta-andrade-e-nascimento` 144576 (Glaucoma Clínico, Cirúrgico e Catarata). `rqe: null` em todos; `credentials` transcritas de `site-entities.json`; todos com `todos` (RQE, grafia do CRM `98339` × `98.339`, bio, autorização de imagem).
- Serviços (title → href): Consulta Oftalmológica → `/consulta-oftalmologica/`; Catarata → `/especialidades/catarata/`; Cirurgia Refrativa → `/especialidades/refrativa/`; Retina → `/especialidades/retina/`; Glaucoma → `/especialidades/glaucoma/`; Córnea e Ceratocone → `/especialidades/cornea/`; Oftalmologia Infantil → `/especialidades/oftalmopediatria/`; Exames → `/exames/`. `summary` de 1–2 frases genéricas e verdadeiras, sem promessas.
- Convênios (16, `logo: null`): Allianz, Amil, Bradesco Saúde, CAASP, Cassi, CNEN, Economus, Mediservice, Notre Dame Intermédica, Porto Seguro, Postal Saúde, Saúde Caixa, Saúde Itaú, Unimed Seguros, Vivest, Dr. Consulta — todos com todo (lista de 2020–2022; Dr. Consulta é convênio ou cartão de desconto?; 17º logo não identificado).
- Vídeo `tudo-em-um-lugar-so`: título "Tudo em um lugar só", `youtubeId: null`, todo de asset.
- Artigos (3, KEEP do mapa de migração): `/alimentos-que-auxiliam-na-visao/` "10 Alimentos que auxiliam na visão: saiba quais são" (2022-10-21); `/prazo-para-descartar-lente-de-contato/` "Qual é o prazo para descartar uma lente de contato? Entenda!" (2022-11-28); `/o-que-acontece-se-nao-tratar-conjuntivite/` "O que acontece se não tratar conjuntivite? Saiba as sequelas da doença" (2023-04-28). `image: null`.
- Editorial Catarata/Refrativa: texto geral e verdadeiro (o que é a condição, avaliação individual define a indicação), **sem** duração, técnica, preço ou resultado; `todos: ['TODO_CONTENT_VALIDATION: revisão médica do texto', 'TODO_CONTENT_VALIDATION: técnicas oferecidas (refrativa)']`.
- Equipamentos: preenchidos na Task 4 (aqui `listEquipment` lê de `src/content/assets.ts` quando existir; começar com `[]`). Legendas serão genéricas ("Tecnologia em uso na clínica") — a identidade do aparelho não é inferida das fotos.

- [ ] **Step 1: Testes (falham).**
  `repository.test.ts`: `listDoctors()` → 8 itens, primeiro `slug === 'david-ribeiro-de-mendonca-filho'` com `role === 'Diretor Técnico'` e `crm === 'CRM/SP 98339'`; `new Set(crms).size === 8`; todos `rqe === null`; todos `canonicalPath === '/corpo-clinico/' + slug + '/'` e `published === false`. `listServices()` → 8, hrefs exatamente a lista acima, ordenados. `listLeadInterests()` → 12 com ids == `LEAD_INTEREST_IDS` e `label` do id `cornea` = "Córnea / Ceratocone". `listInsurancePlans()` → 16 nomes exatos. `listTestimonials()` → `[]`. `getSiteStats()` → três métricas com `validated === false` e `todos.length > 0`. `getSiteSettings()` → `phone.e164 === '+551147883536'`, `whatsapp.digits === '5511947016162'`, `address.postalCode === '06763-170'`, 3 specs de horário (Mon–Thu 08:00–18:00; Fri 08:00–17:00; Sat 08:00–12:00). Todo item de `todos` de todas as entidades começa com `TODO_CONTENT_VALIDATION:`. `listFeaturedArticles(3)` → 3 com `href` iniciando por `/` e terminando em `/`.
  `contact.test.ts`: `whatsappHref(s) === 'https://wa.me/5511947016162?text=' + encodeURIComponent('Olá! Gostaria de agendar uma consulta no CEMO.')`; o texto padrão não contém `catarata|glaucoma|cirurgia|diagn`; `telHref(s) === 'tel:+551147883536'`; `directionsHref` contém `Rua%20Levi%20de%20Souza%20e%20Silva`.
  `hours.test.ts` (datas em UTC-3): segunda 09:00 → true; sexta 17:00 → false; sexta 16:59 → true; sábado 12:00 → false; sábado 11:59 → true; domingo 10:00 → false.
  `no-hardcoded-facts.test.ts` (Node): varre `src/components` e `src/app` (exceto `*.test.*`) e falha se encontrar `/4,9|2,1 mil|100 mil|\+20|4788-3536|94701-6162|98339|06763/`.
- [ ] **Step 2: Rodar → FAIL.** `npx vitest run src/content src/lib/contact src/lib/hours`
- [ ] **Step 3: Implementar** tipos, fixtures, adapter `createFixturesRepository(): ContentRepository` em `src/content/adapters/fixtures.ts` e `content` em `index.ts`; `contact.ts`; `hours.ts` (usar `Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })`).
- [ ] **Step 4: Rodar → PASS** (`npm test`).
- [ ] **Step 5: `docs/content-model.md`:** entidades acima, mapa para as entidades Sanity do briefing (Doctors, Specialties→Service, Exams, Articles, InsurancePlans, Videos, Testimonials, SiteSettings, Redirects, SEO), como trocar o adapter, convenção `todos`, lista dos TODOs abertos (RQE, números, convênios, bairro, depoimentos, bios, vídeo).
- [ ] **Step 6: Commit.** `git add src docs/content-model.md && git commit -m "feat(content): modelo de conteudo, fixtures e repositorio" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

### Task 4: Ingestão e otimização de imagens

**Files:**
- Create: `scripts/optimize-images.mjs`, `src/content/assets.ts`, `public/images/*`, `public/brand/logo-cemo.png`, `_materiais/fotos/equipamentos/` (ignorado pelo git)
- Modify: `src/content/adapters/fixtures.ts` (`listEquipment`, foto do Dr. David), `src/content/fixtures/doctors.ts`, `package.json` (script `assets:optimize`)
- Test: `src/content/assets.test.ts`

**Interfaces:**
- Produces (`src/content/assets.ts`):
  ```ts
  export const assets: {
    drDavid: ImageAsset;          // /images/dr-david.jpg   853x1280 (cópia byte a byte do original)
    drDavidMobile: ImageAsset;    // /images/dr-david-mobile.jpg  recorte 4:5 (730x910)
    ogHome: ImageAsset;           // /images/og-home.png  1200x630 (logo centralizado sobre branco)
    logoPng: ImageAsset;          // /brand/logo-cemo.png 1000x799
    equipment: ImageAsset[];      // /images/equipamentos/equip-01..06.jpg (lado maior ≤ 1600, sem upscaling, sem EXIF)
  };
  ```
- [ ] **Step 1: Baixar as 6 fotos do Google Drive.** Carregar a ferramenta com `ToolSearch("select:mcp__claude_ai_Google_Drive__download_file_content,mcp__claude_ai_Google_Drive__get_file_metadata")`. Para cada fileId — `1dikGDtXZH5zmPEuZ5ds3T2By1Xvh_GGV`, `1CW3r8RLfM1dZJXe-1MqKACUhZRiIEL_c`, `161NtdV8zwfdz7IYkMBtycOg4M8dzoafz`, `1BM2pwPt-mPBlOwMsKekiXUanc5goAEwy`, `18NppmhJzijWJ3I-JTUb3KyUKzHINGkqF`, `1NDKAhPufydAzzYd917KaL4VxG6Du-6dR` — chamar `get_file_metadata` (mimeType, tamanho) e `download_file_content`. Se a ferramenta devolver base64, gravar em `_materiais/fotos/equipamentos/equip-0N.b64` e decodificar com `node -e "require('fs').writeFileSync(out, Buffer.from(require('fs').readFileSync(b64,'utf8').trim(),'base64'))"`; apagar o `.b64`. Nomear `equip-01…06` na ordem acima, extensão conforme o mimeType. Se algum download falhar, registrar o ID em `docs/case-study-notes.md` e seguir com as demais (`equipment` aceita menos de 6; teste usa `>= 1` e o número real).
- [ ] **Step 2: Inspecionar** cada foto com `Read` (visualização). Para cada uma, anotar: dimensões reais, orientação, melhor `object-position` para recorte de detalhe e um `alt` factual do que está visível (sem nomear modelo/função do aparelho). Preencher `EquipmentItem.objectPosition` e `caption` genérica.
- [ ] **Step 3: Teste (falha).** `assets.test.ts` (`// @vitest-environment node`, usa `sharp`): para cada `ImageAsset` em `assets`, o arquivo existe em `public/` e `width/height` batem com `sharp(...).metadata()`; `drDavid` 853×1280 e idêntico em bytes ao original (`_materiais/fotos/dr-david.jpeg`, se existir na máquina; `it.skipIf(!exists)`); `drDavidMobile` razão 4:5 (±1 px); nenhum equipamento sem `alt`; nenhuma imagem de `public/images/equipamentos` possui EXIF/GPS (`metadata().exif === undefined`).
- [ ] **Step 4: Rodar → FAIL.**
- [ ] **Step 5: Implementar `scripts/optimize-images.mjs`** (sharp; idempotente): copia o JPEG do Dr. David sem recomprimir; gera o recorte mobile por **corte puro** (extract x 60–790, y 0–910, `mozjpeg` q 92, sem redimensionar, sem retoque, sem alterar rosto/corpo); equipamentos: `.rotate()` (EXIF), `resize({ width:1600, height:1600, fit:'inside', withoutEnlargement:true })`, JPEG q 85, metadados removidos; logo PNG: `png({ palette:true, quality:90, effort:10 })`; OG: logo centralizado em 1200×630 branco. Registrar no `assets.ts` e em `listEquipment`/`doctors.ts` (David recebe `photo`/`photoMobile` com o alt do design-system §7.1).
- [ ] **Step 6: Rodar** `npm run assets:optimize && npm test` → PASS. Anotar em `docs/case-study-notes.md` e como `todos` do David: `TODO_CONTENT_VALIDATION: obter original em alta (≥ 2400 px de altura) da foto do Dr. David; arquivo atual 853×1280 muito comprimido` e idem para as fotos de equipamento (compressão WhatsApp).
- [ ] **Step 7: Commit.** `git add scripts src public docs/case-study-notes.md package.json && git status --short` (garantir que `_materiais/` não aparece) `&& git commit -m "feat(assets): otimiza fotos do Dr. David, equipamentos e logo PNG" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

### Task 5: Logo em SVG (vetorização) e componente `Logo`

**Files:**
- Create: `scripts/trace-logo.mjs`, `public/brand/logo-cemo.svg`, `public/brand/logo-cemo-white.svg`, `src/components/brand/Logo.tsx`
- Modify: `src/content/assets.ts` (acrescenta `logoSvg`, `logoSvgWhite` somente se passarem no QA)
- Test: `src/components/brand/Logo.test.tsx`, `scripts/trace-logo.test.ts`

**Interfaces:**
- Consumes: `assets.logoPng` (Task 4).
- Produces: `export function Logo(p: { variant?: 'color' | 'white'; className?: string; height?: number; priority?: boolean }): JSX.Element` — `<img>` do SVG se `assets.logoSvg` existir, senão do PNG; `alt="CEMO – Centro de Microcirurgia Ocular"` (a versão branca só em fundo `azul-profundo`); largura/altura explícitas para evitar CLS.
- [ ] **Step 1: Teste do QA da vetorização (falha).** `trace-logo.test.ts` (Node, sharp): renderiza `public/brand/logo-cemo.svg` a 1000 px de largura e compara a máscara alfa com o PNG original: IoU ≥ 0.97; as únicas cores de preenchimento no SVG são `#0066B1`, `#9EC227`, `#27A1CF`; o SVG não contém `<image`. (`it.skipIf` se o SVG ainda não existir NÃO é permitido: o teste deve falhar até o SVG existir.)
- [ ] **Step 2: Rodar → FAIL.**
- [ ] **Step 3: Implementar `trace-logo.mjs`:** ampliar 4× (Lanczos3) → classificar cada pixel opaco pela cor de marca mais próxima (3 máscaras binárias + fundo) → `potrace.trace` de cada máscara (`turdSize` pequeno, `optTolerance` ~0.4) → montar SVG com `viewBox="0 0 1000 799"`, 3 `<path fill=…>`; variante branca = mesmo SVG com todos os fills `#FFFFFF`. Não redesenhar o logo.
- [ ] **Step 4: Rodar → PASS**; gerar um PNG lado a lado (original × SVG renderizado) em `_materiais/` e conferir com `Read` que não há perda de detalhe (linha "Centro de Microcirurgia Ocular", retículo, curva do olho). Se reprovar, ajustar parâmetros; se ainda reprovar, **não** registrar `logoSvg` em `assets.ts` (o `Logo` cai no PNG) e registrar o TODO `solicitar vetor original ao cliente` em `docs/case-study-notes.md` (então o teste do Step 1 passa a ser `it.skipIf(!assets.logoSvg)` com o motivo documentado).
- [ ] **Step 5: Teste do componente.** `Logo.test.tsx`: renderiza `img` com alt exato; `variant="white"` aponta para `logoSvgWhite` (ou PNG); `width`/`height` atributos presentes. Implementar.
- [ ] **Step 6: Commit.** `git add scripts public/brand src && git commit -m "feat(brand): vetoriza logo e cria componente Logo" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

### Task 6: Analytics, Consent Mode v2 e banner de cookies

**Files:**
- Create: `src/lib/analytics/{events,consent}.ts`, `src/components/analytics/{GtmScript,CookieBanner,TrackedLink}.tsx`, `docs/analytics-plan.md`
- Test: `src/lib/analytics/events.test.ts`, `src/lib/analytics/consent.test.ts`, `src/components/analytics/CookieBanner.test.tsx`, `src/components/analytics/TrackedLink.test.tsx`

**Interfaces:**
- Consumes: `getPublicEnv` (Task 1), `Button` (Task 2).
- Produces:
  ```ts
  // events.ts
  export type AnalyticsEventName = 'lead_form_start'|'lead_form_submit'|'whatsapp_click'|'phone_click'|'schedule_click'|'directions_click'|'reviews_click'|'service_cta_click';
  export interface TrackParams { location?: string; page_type?: string; form_id?: string }   // únicas chaves permitidas
  export function track(name: AnalyticsEventName, params?: TrackParams): void;               // push em window.dataLayer; no-op sem window; remove chaves fora da allowlist
  // consent.ts
  export type ConsentChoice = 'granted' | 'denied';
  export const CONSENT_STORAGE_KEY = 'cemo.consent.v1';
  export function readConsent(): ConsentChoice | null;               // null se ausente OU storage indisponível (try/catch)
  export function writeConsent(choice: ConsentChoice): void;         // tenta persistir; sempre aplica no GTM e atualiza html[data-consent]
  export const CONSENT_DEFAULT: Record<'ad_storage'|'analytics_storage'|'ad_user_data'|'ad_personalization', 'denied'>;
  export function consentUpdateFor(choice: ConsentChoice): Record<string, 'granted' | 'denied'>;   // granted => só analytics_storage e ad_storage; ad_user_data/ad_personalization seguem denied
  // componentes
  export function GtmScript(): JSX.Element | null;                   // server; sempre inicializa dataLayer + gtag('consent','default',{...CONSENT_DEFAULT, wait_for_update: 500}); carrega GTM só se NEXT_PUBLIC_GTM_ID
  export function CookieBanner(): JSX.Element | null;                // client; region aria-label="Aviso de cookies"; botões "Aceitar" e "Recusar" com o mesmo peso visual; link /cookies/; define document.documentElement.dataset.consent = 'pending'|'granted'|'denied'
  export function TrackedLink(p: { event: AnalyticsEventName; location: string; href: string; params?: Omit<TrackParams,'location'> } & Omit<React.ComponentPropsWithoutRef<'a'>, 'href'>): JSX.Element;  // client; <a> (next/link para rotas internas) que chama track no clique sem impedir navegação
  ```
- [ ] **Step 1: Testes (falham).**
  `events.test.ts`: `track('whatsapp_click', { location: 'hero', page_type: 'home' })` → `window.dataLayer` recebe `{ event: 'whatsapp_click', location: 'hero', page_type: 'home' }`; chamada com `{ service: 'catarata', name: 'Ana', phone: '11999999999' } as never` não grava nenhuma dessas chaves; sem `window` não lança.
  `consent.test.ts`: `CONSENT_DEFAULT` tem as 4 chaves `denied`; `consentUpdateFor('granted')` → `{ analytics_storage:'granted', ad_storage:'granted', ad_user_data:'denied', ad_personalization:'denied' }`; `readConsent()` com `localStorage.getItem` lançando → `null` sem erro (RF-2); `writeConsent('granted')` com `setItem` lançando não lança e ainda empurra o `consent update` no `dataLayer` (formato de `arguments` do gtag: primeiro item `'consent'`, segundo `'update'`).
  `CookieBanner.test.tsx`: sem escolha → região visível com botões "Aceitar" e "Recusar"; clicar "Recusar" some o banner e `document.documentElement.dataset.consent === 'denied'`; com escolha salva não renderiza; com storage lançando renderiza o banner e não quebra (RF-2).
  `TrackedLink.test.tsx`: clique empurra o evento e o `href` permanece.
- [ ] **Step 2: Rodar → FAIL.**
- [ ] **Step 3: Implementar** conforme assinaturas. `GtmScript` usa `next/script` (`beforeInteractive` para o default de consentimento; `afterInteractive` para o loader do GTM). CSS global: `html[data-consent="pending"] [data-sticky-cta] { display: none }` (o sticky CTA fica oculto até a escolha — decisão: o banner nunca compete com a barra inferior).
- [ ] **Step 4: Rodar → PASS.**
- [ ] **Step 5: `docs/analytics-plan.md`:** tabela dos 8 eventos (quando dispara, `location`, quem emite), parâmetros permitidos × proibidos, Consent Mode (defaults, mapeamento de "Aceitar" = analytics+ad_storage, `ad_user_data`/`ad_personalization` negados por contexto de saúde — briefing §121), conversão primária = lead registrado (`lead_form_submit` só após resposta 200 da API), WhatsApp/telefone secundários, GTM por env, atribuição first-party em `localStorage` (30 dias; TODO jurídico se exige consentimento), eventos adiados (`doctor_view`), pendências (GTM-PH3D5ZS, AW-16676786938, Pixel Meta, GA4 — confirmar continuidade).
- [ ] **Step 6: Commit.** `git add src docs/analytics-plan.md && git commit -m "feat(analytics): track(), Consent Mode v2 e banner de cookies" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

### Task 7: Infra de SEO (metadata, robots, sitemap, JSON-LD, headers de segurança)

**Files:**
- Create: `src/lib/seo/{metadata,jsonld,routes}.ts`, `src/components/seo/JsonLd.tsx`, `src/lib/security/headers.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`, `docs/seo-checklist.md`
- Modify: `next.config.ts` (headers), `src/app/layout.tsx` (`metadataBase`, robots por ambiente)
- Test: `src/lib/seo/{metadata,jsonld,routes}.test.ts`, `src/lib/security/headers.test.ts`, `src/app/robots.test.ts`

**Interfaces:**
- Consumes: `SiteSettings`, `Doctor` (Task 3), `getSiteEnv`, `getSiteUrl` (Task 1), `assets` (Task 4).
- Produces:
  ```ts
  // metadata.ts
  export interface PageSeo { title: string; description: string; path: string; noindex?: boolean; ogImage?: ImageAsset }
  export function absoluteUrl(path: string): string;                  // getSiteUrl() + path
  export function buildMetadata(seo: PageSeo): import('next').Metadata;   // title.absolute = `${title} | CEMO` (sem duplicar o sufixo); alternates.canonical; openGraph {type:'website', locale:'pt_BR', siteName:'CEMO'}; robots noindex,follow se noindex
  // routes.ts
  export type SitemapGroup = 'core'|'especialidades'|'exames'|'condicoes'|'corpo-clinico'|'blog';
  export interface SitemapRoute { path: string; group: SitemapGroup; lastModified: string }   // ISO date; só rotas EXISTENTES e indexáveis
  export const sitemapRoutes: readonly SitemapRoute[];                // '/', '/privacidade/', '/cookies/' (as duas últimas entram na Task 16)
  export function buildSitemap(routes: readonly SitemapRoute[], siteUrl: string): import('next').MetadataRoute.Sitemap;
  export function buildRobots(env: SiteEnv, siteUrl: string): import('next').MetadataRoute.Robots;   // staging/development => disallow '/'; production => allow '/', disallow ['/api/'], sitemap
  // jsonld.ts
  export type JsonLdNode = Record<string, unknown>;
  export function schemaIds(siteUrl: string): { organization: string; website: string; person: (slug: string) => string };   // `${siteUrl}/#organization`, `${siteUrl}/#website`, `${siteUrl}/corpo-clinico/${slug}/#person`
  export function buildClinicNode(s: SiteSettings): JsonLdNode;       // @type ['Organization','MedicalClinic']; name, url, logo, telephone (e164), email, address PostalAddress, openingHoursSpecification, sameAs; SEM geo, rating, priceRange
  export function buildWebSiteNode(s: SiteSettings): JsonLdNode;      // @type WebSite, publisher {@id organization}; sem SearchAction
  export function buildPersonNode(d: Doctor, s: SiteSettings): JsonLdNode;   // @type Person; name, jobTitle (role), worksFor {@id organization}, identifier CRM; url só se d.published; nunca RQE
  export function buildBreadcrumbNode(items: Array<{ name: string; path: string }>, s: SiteSettings): JsonLdNode;
  export function buildGraph(nodes: JsonLdNode[]): { '@context': 'https://schema.org'; '@graph': JsonLdNode[] };
  // JsonLd.tsx
  export function JsonLd(p: { data: object }): JSX.Element;           // <script type="application/ld+json">; escapa '<' como <
  // security/headers.ts
  export function buildSecurityHeaders(env: SiteEnv): Array<{ key: string; value: string }>;
  ```
- [ ] **Step 1: Testes (falham).**
  `metadata.test.ts`: `buildMetadata({title:'Clínica de Oftalmologia em Taboão da Serra', …}).title` → `{ absolute: 'Clínica de Oftalmologia em Taboão da Serra | CEMO' }`; título já terminado em `| CEMO` não duplica; `alternates.canonical` é URL absoluta com barra final; `noindex` gera `robots: { index:false, follow:true }`.
  `routes.test.ts`: `buildSitemap` nunca inclui `/obrigado/`, `/lp/`, paginação nem rotas com `noindex`; cada `url` termina em `/`; toda rota de `sitemapRoutes` tem `src/app/<path>/page.tsx` (ou `src/app/page.tsx` para `/`).
  `robots.test.ts`: `buildRobots('staging', u)` → `rules.disallow === '/'` e sem `sitemap`; `'production'` → `allow '/'` e `sitemap: u + '/sitemap.xml'`.
  `jsonld.test.ts`: `schemaIds` estáveis (mesma entrada → mesma saída); clínica contém `@id` organization, telefone `+551147883536`, `postalCode '06763-170'`, 3 `openingHoursSpecification` (`dayOfWeek` em nomes schema.org); `JSON.stringify(graph)` **não** contém `Review`, `AggregateRating`, `rqe`, `RQE`, `priceRange`, `geo`; Person do Dr. David tem `worksFor['@id']` igual ao id da organização e `jobTitle: 'Diretor Técnico'` e sem `url` enquanto `published=false`; `JsonLd` com string contendo `</script>` não fecha a tag (escape `<`).
  `headers.test.ts`: contém `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera, microphone, geolocation `()`), `X-Frame-Options: SAMEORIGIN`; `Strict-Transport-Security` **só** em `production`; CSP contém `https://www.googletagmanager.com`, `frame-src` com `https://www.youtube-nocookie.com` e `https://www.google.com`, `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'self'`; `X-Robots-Tag: noindex, nofollow` em staging/development e ausente em production.
- [ ] **Step 2: Rodar → FAIL.**
- [ ] **Step 3: Implementar.** CSP sem nonce (nonce forçaria renderização dinâmica e mataria o SSG): `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com` (+ `'unsafe-eval'` apenas quando `env==='development'`), `img-src 'self' data: https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com`, `connect-src 'self' https://www.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.g.doubleclick.net`, `style-src 'self' 'unsafe-inline'`, `font-src 'self'`, `form-action 'self'`. Documentar a limitação (`'unsafe-inline'`) em `docs/seo-checklist.md` e `docs/case-study-notes.md`. `next.config.ts` → `headers()` aplica `buildSecurityHeaders(getSiteEnv())` em `/:path*`. `layout.tsx` exporta `metadata` com `metadataBase`, `robots` conforme ambiente (staging ⇒ `{index:false, follow:false}`). `sitemap.ts`/`robots.ts` apenas delegam.
- [ ] **Step 4: Rodar → PASS** (`npm test`, `npm run build`; `curl -I` no `npm start` mostra os headers).
- [ ] **Step 5: `docs/seo-checklist.md`:** checklist por tipo (título/description/canonical/H1/schema/links), regras de sitemap (arquivo único nesta fase; sitemap index por grupo fica para quando houver posts — decisão registrada), checklist de lançamento (SITE_ENV, robots, redirects, GSC, GTM, schema).
- [ ] **Step 6: Commit.** `git add src docs next.config.ts && git commit -m "feat(seo): metadata, robots, sitemap, JSON-LD e headers de seguranca" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

### Task 8: Motor de redirects (CSV → módulo tipado → proxy)

**Files:**
- Create: `scripts/generate-redirects.ts`, `scripts/check-redirect-targets.ts`, `src/lib/redirects/{build,resolve,generated}.ts`, `src/proxy.ts`
- Modify: `next.config.ts` (se necessário `skipTrailingSlashRedirect`), `docs/case-study-notes.md`
- Test: `src/lib/redirects/build.test.ts`, `src/lib/redirects/resolve.test.ts`, `src/lib/redirects/generated.test.ts`

**Interfaces:**
- Consumes: `docs/seo-migration-map.csv`, `getSiteEnv`, `getSiteUrl`.
- Produces:
  ```ts
  // build.ts (puro; sem fs)
  export interface RedirectTables { redirects: Record<string, string>; gone: string[]; stats: { redirect: number; consolidate: number; gone: number; hostOnlyDropped: number; naturalNotFound: number } }
  export function normalizePath(pathname: string): string;   // decodeURI (try/catch), minúsculas, colapsa '//', remove '/index.html', remove hífen final do último segmento, garante barra final (exceto caminhos com extensão de arquivo)
  export function buildRedirectTables(csvText: string): RedirectTables;
  // resolve.ts
  export type RedirectDecision = { kind: 'redirect'; location: string } | { kind: 'gone' } | { kind: 'pass' };
  export function shouldBypass(pathname: string): boolean;  // /_next/*, /api/*, /favicon.ico, /robots.txt, /sitemap.xml e qualquer caminho com extensão != .html
  export function resolveRedirect(input: { pathname: string; search: string }, tables?: RedirectTables): RedirectDecision;
  // generated.ts (gerado; commitado)
  export const redirectTables: RedirectTables;
  // proxy.ts
  export function proxy(request: NextRequest): NextResponse;   // nome do arquivo/export conforme a versão instalada (ver Step 1)
  ```
  Regras do builder: usa `csv-parse/sync`; linhas `REDIRECT|CONSOLIDATE` com `new_url` → `redirects[normalizePath(path(current_url))] = new_url`; **ignora (e conta em `hostOnlyDropped`) linhas cuja origem difere do destino só pelo host** (`www.`; path == `new_url`) — são tratadas pela regra de host; linhas `REMOVE` com `notes` iniciando por `410` → `gone` (206 linhas esperadas); `REMOVE` com `notes` de "404 natural" → não geram regra (`naturalNotFound`, 4 linhas). `resolveRedirect`: 1) bypass → `pass`; 2) chave normalizada em `gone` → `gone`; 3) em `redirects` → `redirect` para o destino + `search` original (preserva `gclid`/`utm_*`); 4) se `normalizePath(pathname) !== pathname` → `redirect` para o normalizado + `search`; 5) senão `pass`.
- [ ] **Step 1: Verificar a convenção da versão.** `npx next --version`; consultar a documentação/changelog em `node_modules/next` (no Next 16 `middleware.ts` virou `proxy.ts` com export `proxy`, runtime Node; se a versão instalada ainda usa `middleware`, usar `src/middleware.ts` com export `middleware`). Registrar em `docs/case-study-notes.md`.
- [ ] **Step 2: Testes do builder (falham)** com mini-CSV inline e com o CSV real:
  `build.test.ts`: `normalizePath('/EXAME-DE-CAMPO-VISUAL/') === '/exame-de-campo-visual/'`; `'/oftalmologia-cemo' → '/oftalmologia-cemo/'`; `'/slug-/' → '/slug/'`; `'/index.html' → '/'`; `'//a//b' → '/a/b/'`; `'/a/b.pdf'` permanece. Com o CSV real: `stats.gone === 206`; `stats.naturalNotFound === 4`; `redirect + consolidate` = 139 + 38 − `hostOnlyDropped`; **sem self-redirects** (nenhuma chave == destino); **sem cadeias** (nenhum destino é chave de `redirects` nem de `gone`); nenhum destino absoluto (`http`); exatamente 6 destinos `'/'`; todo destino começa e termina com `/`.
  `resolve.test.ts` (amostras do CSV): `/contato-2/` → 301 `/contato/`; `/exames/lentes/` → `/especialidades/lentes-de-contato/`; `/author/cemox/` → `/blog/`; `/post-list/` → `gone`; primeira URL de `/tag/…` do CSV → `gone`; `/blog/criancas-oftalmologista-como-define/` → `pass`; `/contato-2/?gclid=abc&utm_source=g` → `location` `/contato/?gclid=abc&utm_source=g` (RF-3); `/CONTATO-2` (caixa + sem barra) → **um** salto direto a `/contato/`; `/Sobre` → redirect para `/sobre/`; `/_next/static/x.js`, `/api/lead`, `/robots.txt`, `/images/dr-david.jpg` → `pass` (RF-3); `/index.html` → `/`.
  `generated.test.ts`: `redirectTables` deep-equal a `buildRedirectTables(<CSV atual>)` (impede módulo gerado defasado).
- [ ] **Step 3: Rodar → FAIL.**
- [ ] **Step 4: Implementar** `build.ts`, `resolve.ts`, `scripts/generate-redirects.ts` (lê o CSV, escreve `generated.ts` com cabeçalho "GERADO — não editar"; `npm run redirects:generate`), `proxy.ts` (aplica `resolveRedirect`: `redirect` → `NextResponse.redirect(url, 301)`; `gone` → `new NextResponse('Página removida', { status: 410, headers: { 'X-Robots-Tag': 'noindex', 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })`; em `production`: host `www.` → 301 para o apex **já com o destino do mapa aplicado** e `x-forwarded-proto: http` → https, num único salto). Matcher do proxy exclui `_next/static`, `_next/image` e `favicon.ico`.
- [ ] **Step 5: Rodar → PASS**; `npm run redirects:generate` não deve alterar `generated.ts` (idempotente: `git diff --exit-code src/lib/redirects/generated.ts`).
- [ ] **Step 6: Teste de integração local de saltos.** `npm run build && npm start` e, com `curl -sI -o /dev/null -w "%{http_code} %{redirect_url}\n"`: `/contato-2/` → `301 …/contato/`; `/contato-2` (sem barra) → deve ser `301` direto. Se vier `308` para `/contato-2/` antes do 301 (duas etapas), definir `skipTrailingSlashRedirect: true` em `next.config.ts` e deixar `normalizePath` fazer a barra final (RF-3). `/post-list/` → `410`.
- [ ] **Step 7: `scripts/check-redirect-targets.ts`** (`npm run redirects:check-targets`, informativo, exit 0): lista destinos do mapa que ainda não existem em `sitemapRoutes` nem em `/{slug}/` conhecidos — o corte de produção exige a lista vazia (item do `docs/seo-checklist.md`). Registrar em `docs/case-study-notes.md` a decisão: o motor gera todas as regras já agora; destinos de planos futuros (Catarata, Refrativa, exames, blog…) ainda dão 404 em staging.
- [ ] **Step 8: Commit.** `git add scripts src next.config.ts docs package.json && git commit -m "feat(seo): motor de redirects 301/410 gerado do mapa de migracao" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

### Task 9: Backend de leads (zod, sanitização, rate limit, provider, route handler)

**Files:**
- Create: `src/lib/leads/{types,schema,sanitize,rate-limit,provider,webhook-provider,dev-provider,handler}.ts`, `src/app/api/lead/route.ts`
- Test: `src/lib/leads/{schema,sanitize,rate-limit,webhook-provider,handler}.test.ts`

**Interfaces:**
- Consumes: `LEAD_INTEREST_IDS`, `LeadInterestId` (Task 3), `getServerEnv`, `getSiteUrl`, `SiteEnv` (Task 1).
- Produces:
  ```ts
  // types.ts
  export interface Attribution { utm_source?: string; utm_medium?: string; utm_campaign?: string; utm_term?: string; utm_content?: string; gclid?: string; wbraid?: string; gbraid?: string; landingPage: string; referrer: string; timestamp: string }
  export interface LeadAttribution extends Attribution { conversionPage: string }
  export interface LeadSubmission { name: string; whatsapp: string; interest: LeadInterestId; attribution: LeadAttribution }   // whatsapp já normalizado (só dígitos, com 55)
  export interface LeadRecord extends LeadSubmission { id: string; receivedAt: string; source: 'cemo-site' }
  export type LeadFieldErrors = Partial<Record<'name' | 'whatsapp' | 'interest', string>>;
  // schema.ts
  export function normalizeWhatsapp(input: string): string | null;   // '(11) 94701-6162'|'+55 11 94701-6162'|'011 94701-6162' => '5511947016162'; '11 4788-3536' => '551147883536'; <10 ou >11 dígitos nacionais, ou letras misturadas inválidas => null
  export function validateLeadInput(raw: unknown): { ok: true; data: LeadSubmission; honeypotFilled: boolean } | { ok: false; errors: LeadFieldErrors };
  // sanitize.ts
  export function sanitizeText(input: string, maxLength: number): string;   // trim, colapsa espaços, remove controles e '<' '>' ; corta em maxLength
  // rate-limit.ts  (em memória, por instância — limitação documentada)
  export interface RateLimiter { check(key: string): { allowed: boolean; retryAfterSeconds: number } }
  export function createRateLimiter(opts: { windowMs: number; max: number; now?: () => number }): RateLimiter;
  // provider.ts
  export type ProviderResult = { ok: true } | { ok: false; retryable: boolean };
  export interface LeadProvider { readonly name: string; submit(lead: LeadRecord): Promise<ProviderResult> }
  export function resolveLeadProvider(env: { siteEnv: SiteEnv; leadWebhookUrl?: string; leadWebhookSecret?: string }): LeadProvider | null;
  //   webhook configurado => createWebhookProvider; sem webhook e siteEnv !== 'production' => createDevProvider; sem webhook em production => null (falha fechada)
  // webhook-provider.ts
  export function createWebhookProvider(cfg: { url: string; secret?: string; timeoutMs?: number; fetchImpl?: typeof fetch }): LeadProvider;   // POST JSON, header 'X-Webhook-Secret', timeout padrão 8000 ms, sem retry, nunca loga o corpo
  // dev-provider.ts
  export function createDevProvider(): LeadProvider & { readonly received: LeadRecord[] };   // memória; console.info('[lead:dev] received', id) SEM PII
  // handler.ts
  export interface LeadHandlerDeps { getProvider(): LeadProvider | null; rateLimiter: RateLimiter; allowedOrigin: string; now?: () => Date; randomId?: () => string }
  export function createLeadHandler(deps: LeadHandlerDeps): (request: Request) => Promise<Response>;
  // Contrato HTTP:
  //  200 {ok:true}                                    (inclui honeypot preenchido: responde 200 sem chamar provider)
  //  400 {ok:false,error:'invalid',errors:LeadFieldErrors} | {ok:false,error:'bad_request'}
  //  403 {ok:false,error:'forbidden'}  (Origin presente e diferente de allowedOrigin)
  //  413 {ok:false,error:'too_large'}  (corpo > 10_000 bytes)
  //  415 {ok:false,error:'unsupported_media_type'}  (não é application/json)
  //  429 {ok:false,error:'rate_limited'} + Retry-After
  //  502 {ok:false,error:'provider_error'}
  //  503 {ok:false,error:'provider_unavailable'}  (provider null em produção)
  ```
  `route.ts`: `export const dynamic = 'force-dynamic'; export async function POST(request: Request)` delegando a `createLeadHandler` (chave do rate limit = primeiro IP de `x-forwarded-for`, senão `'unknown'`; 5 requisições/10 min).
- [ ] **Step 1: Testes (falham).**
  `schema.test.ts` (RF-1): tabela de `normalizeWhatsapp`: `'(11) 94701-6162'`, `'+55 11 94701-6162'`, `'55 (11) 94701-6162'`, `'011 94701-6162'`, `'11947016162'` → `'5511947016162'`; `'11 4788-3536'` → `'551147883536'`; `'1234'`, `''`, `'abc'`, `'119470161620000'`, `'(11) 94701-61AB'` → `null`. `validateLeadInput`: nome com 1 caractere → erro `name`; nome `"<script>alert(1)</script>"` → sanitizado/recusado (sem `<`); `interest: 'banana'` → erro `interest`; mensagem do whatsapp inválido exatamente "Informe um telefone com DDD, por exemplo (11) 91234-5678"; campos não-string (`name: 123`, `null`, array) → `ok:false` sem lançar; `website: 'x'` (honeypot) → `ok:true, honeypotFilled:true`; nome com acentos/apóstrofo ("D'Ávila José") válido.
  `sanitize.test.ts`: remove `\u0000`-`\u001f`, `<`, `>`; colapsa `"  a   b "` → `"a b"`; corta no limite.
  `rate-limit.test.ts` (relógio injetado): 5 permitidos, 6º `allowed:false` com `retryAfterSeconds > 0`; após a janela volta a permitir; chaves independentes.
  `webhook-provider.test.ts` (fetch mock): envia `POST`, `content-type: application/json`, `X-Webhook-Secret` e corpo com o `LeadRecord`; resposta 500 → `{ok:false, retryable:true}`; `fetch` que rejeita por `AbortError` (timeout) → `{ok:false, retryable:true}` (RF-4); resposta 200 → `{ok:true}`; `console.*` espionado nunca recebe nome nem telefone.
  `handler.test.ts` (provider fake): válido → 200 e o provider recebe `LeadRecord` com `whatsapp:'5511947016162'`, `source:'cemo-site'`, `id`, `receivedAt` ISO; honeypot → 200 e provider **não** chamado; inválido → 400 com `errors`; JSON malformado → 400 `bad_request`; corpo de 10.001 bytes → 413; `text/plain` → 415; `Origin: https://evil.example` → 403; Origin igual ao permitido → segue; 6ª chamada do mesmo IP → 429 com `Retry-After`; `getProvider` retorna `null` → 503 e `console` espionado sem PII (falha fechada); provider `{ok:false}` → 502; provider que lança → 502, nunca 500 (RF-1, RF-4).
  `provider.test.ts` (dentro de `handler.test.ts` ou arquivo próprio): `resolveLeadProvider({siteEnv:'production'})` → `null`; `{siteEnv:'staging'}` → provider `dev`; com `leadWebhookUrl` → provider `webhook` em qualquer ambiente.
- [ ] **Step 2: Rodar → FAIL.** `npx vitest run src/lib/leads`
- [ ] **Step 3: Implementar** conforme assinaturas (zod só dentro de `schema.ts`; limites: nome 2–80 caracteres, atribuição: strings ≤ 500, chaves desconhecidas descartadas; leitura do corpo com `await request.text()` e checagem de tamanho antes do `JSON.parse`).
- [ ] **Step 4: Rodar → PASS** (`npm test`).
- [ ] **Step 5: Docs.** Em `docs/case-study-notes.md`: limitação do rate limit em memória (por instância; em serverless/multi-instância é best-effort, trocar por store compartilhado — Turnstile é o próximo degrau), `x-forwarded-for` confiável só atrás de proxy conhecido, falha fechada em produção.
- [ ] **Step 6: Commit.** `git add src docs/case-study-notes.md && git commit -m "feat(leads): API de leads com validacao, rate limit e leadProvider" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

### Task 10: Atribuição first-party, `LeadForm` e página `/obrigado/`

**Files:**
- Create: `src/lib/attribution.ts`, `src/components/analytics/AttributionCapture.tsx`, `src/components/forms/LeadForm.tsx`, `src/app/obrigado/page.tsx`
- Test: `src/lib/attribution.test.ts`, `src/components/forms/LeadForm.test.tsx`, `src/app/obrigado/page.test.tsx`

**Interfaces:**
- Consumes: `Attribution`/`LeadAttribution`/`LeadFieldErrors` (Task 9), `validateLeadInput` (Task 9), `track` (Task 6), `LeadInterest`/`LeadInterestId` (Task 3), `whatsappHref` (Task 3), `buildMetadata` (Task 7), `Button`.
- Produces:
  ```ts
  // attribution.ts
  export const ATTRIBUTION_STORAGE_KEY = 'cemo.attribution.v1';
  export const TRACKING_PARAMS = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','wbraid','gbraid'] as const;
  export function safeStorage(): Storage | null;                       // localStorage dentro de try/catch; null se indisponível (RF-2)
  export function parseAttributionParams(search: string): Partial<Record<(typeof TRACKING_PARAMS)[number], string>>;
  export function captureAttribution(ctx: { href: string; referrer: string; now: Date; storage: Storage | null }): Attribution;
  //   first-touch por 30 dias; parâmetros de campanha novos (utm/gclid/wbraid/gbraid) na URL substituem o registro; sem storage devolve o objeto calculado sem persistir
  export function getLeadAttribution(ctx: { href: string; referrer: string; now: Date; storage: Storage | null }): LeadAttribution;   // conversionPage = pathname atual
  // AttributionCapture.tsx
  export function AttributionCapture(): null;                          // client; useEffect => captureAttribution(...)
  // LeadForm.tsx
  export interface LeadFormProps { interests: LeadInterest[]; defaultInterest?: LeadInterestId; formId: string; location: string; whatsappFallbackHref: string }
  export function LeadForm(p: LeadFormProps): JSX.Element;             // client
  ```
  Contrato com a API: `POST /api/lead` JSON `{ name, whatsapp, interest, website: '', attribution: LeadAttribution }`.
- [ ] **Step 1: Testes (falham).**
  `attribution.test.ts`: `parseAttributionParams('?utm_source=google&gclid=abc&foo=1')` → só chaves de `TRACKING_PARAMS`; `captureAttribution` na primeira visita grava `landingPage` (pathname+search sem fragmento), `referrer`, `timestamp` ISO; segunda visita sem parâmetros mantém o first-touch; visita com `gclid` novo substitui; registro com 31 dias expira; `storage` que lança em `getItem`/`setItem` não propaga erro (RF-2); `storage: null` devolve atribuição calculada; `getLeadAttribution` acrescenta `conversionPage: '/'`.
  `LeadForm.test.tsx` (mock `fetch`, `next/navigation` `useRouter`): três campos com label visível "Nome", "WhatsApp", "O que você está buscando?"; opções vindas das props; `defaultInterest="catarata"` vem selecionado; envio vazio → `role="alert"` com resumo de erros que recebe foco, campos com `aria-invalid="true"` e `aria-describedby`, `fetch` não chamado; WhatsApp inválido mostra "Informe um telefone com DDD, por exemplo (11) 91234-5678"; primeiro foco em qualquer campo dispara `lead_form_start` **uma** vez (`dataLayer` com `{event:'lead_form_start', form_id, location}`); envio válido → `fetch('/api/lead', POST)` com corpo contendo `attribution.conversionPage` e `website: ''`, depois `lead_form_submit` no `dataLayer` (sem nome, telefone ou interesse — afirmar com `JSON.stringify(dataLayer)`) e `router.push('/obrigado/')`; duplo clique no botão → 1 única chamada de `fetch`, botão com texto "Enviando…" e `aria-disabled="true"` (RF-4); resposta 503 e `fetch` que rejeita → mensagem de falha com link "Falar no WhatsApp" apontando para `whatsappFallbackHref` e nenhum `lead_form_submit`; 429 → "Muitas tentativas. Tente novamente em alguns minutos."; 400 com `errors` do servidor → mostra por campo; campo honeypot `name="website"` está fora do fluxo de leitura (`aria-hidden`, `tabIndex=-1`, `autoComplete="off"`); `localStorage` lançando não impede o envio (RF-2); aviso de privacidade com link para `/privacidade/` sob o botão "Solicitar contato".
  `obrigado/page.test.tsx`: `metadata.robots` com `index:false`; um `h1` "Recebemos o seu pedido"; link "Continuar atendimento pelo WhatsApp" com `href` igual a `whatsappHref(settings)` (mensagem genérica); a página não lê nem exibe query string/dados do lead.
- [ ] **Step 2: Rodar → FAIL.**
- [ ] **Step 3: Implementar.** Campos 56 px, rótulo sempre visível, `autocomplete="name"` / `"tel"` (`inputMode="tel"`), erro com ícone + texto (nunca só cor), máscara sem bloquear colagem (formatar ao sair do campo). Estados: `idle | submitting | failed`. `/obrigado/`: Server Component, usa `buildMetadata({ …, noindex: true })`, sem breadcrumb, tom humano sem prazo numérico (`TODO_CONTENT_VALIDATION: prazo de retorno`).
- [ ] **Step 4: Rodar → PASS.**
- [ ] **Step 5: Commit.** `git add src && git commit -m "feat(leads): atribuicao first-party, LeadForm acessivel e pagina de obrigado" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

### Task 11: Navegação de dados, Header, UtilityBar e MegaMenu

**Files:**
- Create: `src/content/navigation.ts`, `src/components/layout/{Header,UtilityBar,NavMenu,OpenNowBadge}.tsx`
- Modify: `src/content/adapters/fixtures.ts` (`getNavigation` passa a retornar `navigation`)
- Test: `src/content/navigation.test.ts`, `src/components/layout/Header.test.tsx`, `src/components/layout/NavMenu.test.tsx`

**Interfaces:**
- Consumes: `NavGroup`/`NavLink` (Task 3), `SiteSettings`, `whatsappHref`/`telHref` (Task 3), `isOpenNow` (Task 3), `TrackedLink`/`track` (Task 6), `Logo` (Task 5), `Button`.
- Produces:
  ```ts
  export const navigation: NavGroup[];   // src/content/navigation.ts — 6 grupos na ordem de IA §4.1
  export function Header(p: { settings: SiteSettings; navigation: NavGroup[] }): JSX.Element;    // server: <header>, <nav aria-label="Principal">, CTA "Agendar consulta" (href '/#agendar', TrackedLink schedule_click location 'header')
  export function UtilityBar(p: { settings: SiteSettings }): JSX.Element;                        // server, só lg+; tel (phone_click), WhatsApp (whatsapp_click), endereço, horário + <OpenNowBadge>
  export function NavMenu(p: { groups: NavGroup[] }): JSX.Element;                               // client: mega/dropdown/link
  export function OpenNowBadge(p: { hours: OpeningHoursSpec[] }): JSX.Element | null;            // client, calcula após montar (evita hidratação divergente)
  ```
  Dados de navegação (IA §4.1): **Especialidades** (mega; viewAll "Ver todas as especialidades" → `/especialidades/`; featured "Consulta Oftalmológica" → `/consulta-oftalmologica/`; links Catarata `/especialidades/catarata/`, Cirurgia Refrativa `/especialidades/refrativa/`, Retina `/especialidades/retina/`, Glaucoma `/especialidades/glaucoma/`, Córnea e Ceratocone `/especialidades/cornea/`, Oftalmopediatria `/especialidades/oftalmopediatria/`, Estrabismo `/especialidades/estrabismo/`, Plástica Ocular `/especialidades/plastica-ocular/`, Lentes de Contato `/especialidades/lentes-de-contato/`); **Cirurgias e Tratamentos** (mega; viewAll `/tratamentos/`; Cirurgia de Catarata → catarata, Cirurgia Refrativa → refrativa, Tratamento do Glaucoma → glaucoma, Crosslinking Corneano `/tratamentos/crosslinking-corneano/`, Anel Intraestromal `/tratamentos/anel-intraestromal/`, Transplante de Córnea `/tratamentos/transplante-de-cornea/` (estes três `published:false`, todo de validação), Plástica Ocular); **Exames** (mega; viewAll `/exames/`; 11 exames: Mapeamento de Retina `/exames/mapeamento/`, Campo Visual `/exame-de-campo-visual-o-que-e-para-que-serve-e-como-e-feito/`, Retinografia `/o-que-voce-precisa-saber-sobre-retinografia/`, Ceratoscopia (Topografia de Córnea) `/ceratoscopia-para-que-serve-o-exame/`, Microscopia Especular `/o-que-e-exame-de-microscopia/`, Curva Tensional Diária `/exame-de-ctd-curva-tensional-diaria-tudo-sobre/`, Tonometria `/exames/tonometria/`, Paquimetria `/exames/paquimetria/`, Gonioscopia `/exames/gonioscopia/`, Biometria `/exames/biometria/`, Estereofoto de Papila `/tudo-o-que-voce-precisa-saber-sobre-estereofoto-de-papila/`); **Corpo Clínico** (link `/corpo-clinico/`); **Conteúdos** (dropdown: Condições Oculares `/condicoes-oculares/`, Blog `/blog/`, destaques Ceratocone `/condicoes-oculares/ceratocone/`, Miopia, Hipermetropia, Astigmatismo `/condicoes-oculares/{slug}/`, Presbiopia `/presbiopia-entenda-a-vista-cansada-e-suas-opcoes-de-correcao/`, Degeneração Macular `/condicoes-oculares/degeneracao-macular/`); **A CEMO** (dropdown: Sobre `/sobre/`, Estrutura e Tecnologia `/estrutura-e-tecnologia/`, Convênios `/convenios/`, Contato / Como chegar `/contato/`). "Exame online" (`externalExamOnlineUrl`) fica no UtilityBar (TODO continuidade), não no menu.
- [ ] **Step 1: Testes (falham).**
  `navigation.test.ts`: 6 grupos nesta ordem de ids; Exames tem 11 links com os caminhos acima; todo `href` começa e termina com `/`, exceto externos; os 3 itens gated têm `published:false`; nenhum caminho repetido dentro de um grupo.
  `NavMenu.test.tsx` (user-event): botão do grupo mega tem `aria-expanded="false"` e `aria-controls` válido; Enter/clique abre (`true`) e mostra links; `Escape` fecha e devolve foco ao botão; `ArrowDown` no botão move o foco para o primeiro link; clicar fora fecha; abrir outro grupo fecha o anterior; links `published:false` **não** renderizam; "Ver todas as especialidades" renderiza com `href="/especialidades/"`; grupo `link` (Corpo Clínico) é `<a>` simples.
  `Header.test.tsx`: `nav` com nome acessível "Principal"; botão "Agendar consulta" com `href="/#agendar"`; clique registra `schedule_click` com `location:'header'`; logo com link para `/` e alt; `UtilityBar` tem `tel:+551147883536` e `href` do WhatsApp, ambos com targets ≥ 48 px (classe `min-target`).
- [ ] **Step 2: Rodar → FAIL.**
- [ ] **Step 3: Implementar.** Header `position: sticky; top: 0`, 80 px → 68 px com sombra quando rolado, detectado por IntersectionObserver em um sentinel (sem listener de scroll); fundo sólido; item ativo `aria-current="page"` (via `usePathname`). Hover abre com atraso de 150 ms mas clique/Enter é o caminho principal. Painéis `shadow-3`, `radius-lg`, links 48 px de altura.
- [ ] **Step 4: Rodar → PASS.**
- [ ] **Step 5: Commit.** `git add src && git commit -m "feat(layout): header, utility bar e mega menu acessiveis" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

### Task 12: MobileNav, StickyMobileCTA, Footer e montagem do layout raiz

**Files:**
- Create: `src/components/layout/{MobileNav,StickyMobileCTA,Footer}.tsx`
- Modify: `src/components/layout/Header.tsx` (inclui o botão do MobileNav), `src/app/layout.tsx`, `src/app/globals.css`
- Test: `src/components/layout/{MobileNav,StickyMobileCTA,Footer}.test.tsx`

**Interfaces:**
- Consumes: Task 11 (`NavGroup`, `Header`), Task 6 (`CookieBanner`, `GtmScript`, `TrackedLink`), Task 10 (`AttributionCapture`), `content` (Task 3).
- Produces:
  ```ts
  export function MobileNav(p: { groups: NavGroup[]; settings: SiteSettings }): JSX.Element;   // client; botão "Menu" (48px, rótulo visível, aria-expanded/aria-controls) + diálogo em portal (document.body) role="dialog" aria-modal="true" aria-label="Menu"
  export function StickyMobileCTA(p: { settings: SiteSettings }): JSX.Element;                 // client; <div data-sticky-cta> abaixo de md; botões "WhatsApp" (whatsapp_click, location 'sticky_mobile') e "Agendar" (href '/#agendar', schedule_click)
  export function Footer(p: { settings: SiteSettings; navigation: NavGroup[]; technicalResponsible: Doctor | null }): JSX.Element;   // server
  ```
  Contrato de DOM: o layout raiz envolve cabeçalho+conteúdo+rodapé em `<div id="app-root">`; o diálogo do MobileNav vive fora dele (portal) para poder aplicar `inert` ao `#app-root`. O alvo do hero CTA é `[data-hero-cta]` (Task 13): o StickyMobileCTA só aparece depois que ele sai da viewport; se não existe na página, aparece sempre.
- [ ] **Step 1: Testes (falham).**
  `MobileNav.test.tsx`: abrir move o foco para dentro do diálogo e aplica `inert` em `#app-root` e `overflow:hidden` no `html`; Tab/Shift+Tab ciclam dentro do diálogo; `Escape` fecha, remove `inert`/scroll lock e devolve foco ao botão "Menu"; grupos em acordeão (`aria-expanded`), cada um com "Ver todas/todos"; botão WhatsApp fixo no topo do painel; links `published:false` ocultos.
  `StickyMobileCTA.test.tsx` (IntersectionObserver mockado): com `[data-hero-cta]` visível → barra oculta; depois de sair → visível; sem `[data-hero-cta]` → visível; os dois botões têm altura mínima 56 px e eventos corretos; usa `padding-bottom: env(safe-area-inset-bottom)`; atributo `data-sticky-cta` presente (a regra CSS da Task 6 a oculta enquanto o consentimento está pendente).
  `Footer.test.tsx`: NAP renderizado a partir de `SiteSettings` (endereço, telefone, WhatsApp, e-mail, 3 linhas de horário); colunas CEMO, Especialidades (as 9), Exames (+ "Todos os exames"), Condições e Conteúdos; "Responsável técnico: Dr. David Ribeiro de Mendonça Filho — CRM/SP 98339" vindo do repositório; links de privacidade e cookies; "Desenvolvido por P12 Digital" (texto, sem URL inventada); links externos com `rel="noopener"`; sem texto < 16 px (classes `text-small` ou maiores).
- [ ] **Step 2: Rodar → FAIL.**
- [ ] **Step 3: Implementar.** `layout.tsx` (async): carrega `content.getSiteSettings()`, `getNavigation()`, responsável técnico; ordem do `<body>`: `GtmScript`, `SkipLink`, `AttributionCapture`, `<div id="app-root">` { `UtilityBar`, `Header`, `<main id="conteudo" tabIndex={-1}>`, `Footer` }, `StickyMobileCTA`, `CookieBanner`. CSS: `body` ganha `padding-bottom` igual à altura da barra apenas abaixo de `md`; `scroll-padding-bottom` e `scroll-padding-top` já cobrem foco (2.4.11).
- [ ] **Step 4: Rodar → PASS**; `npm run build` e inspeção manual em 360 e 390 px no `npm run dev`: sem rolagem horizontal (RF-5), barra e banner nunca simultâneos.
- [ ] **Step 5: Commit.** `git add src && git commit -m "feat(layout): MobileNav, StickyMobileCTA, Footer e layout raiz" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

### Task 13: Hero (direção de arte), TrustBar e GoogleRating

**Files:**
- Create: `src/components/home/{Hero,TrustBar}.tsx`, `src/components/ui/GoogleRating.tsx`
- Modify: `src/app/globals.css` (classes do hero), `src/app/page.tsx` (hero + trust provisórios)
- Test: `src/components/home/Hero.test.tsx`, `src/components/home/TrustBar.test.tsx`, `src/components/ui/GoogleRating.test.tsx`

**Interfaces:**
- Consumes: `ImageAsset`, `SiteStats`, `Doctor` (Task 3), `assets` (Task 4), `Reticle`/`StarIcon` (Task 2), `TrackedLink` (Task 6), `Button`.
- Produces:
  ```ts
  export interface HeroProps {
    eyebrow: string; headline: string; lead: string;
    primaryCta: { label: string; href: string }; secondaryCta: { label: string; href: string };
    proof: Array<{ id: string; text: string }>;
    doctor: { name: string; role: string; crm: string; image: ImageAsset; mobileImage: ImageAsset };
  }
  export function Hero(p: HeroProps): JSX.Element;            // server; <section aria-labelledby="hero-title"> com o único <h1 id="hero-title">
  export function TrustBar(p: { stats: SiteStats; doctorsCount: number }): JSX.Element;
  export function GoogleRating(p: { stats: SiteStats; reviewsHref: string }): JSX.Element;   // aria-label="Nota 4,9 de 5 no Google, mais de 2,1 mil avaliações" montado a partir de stats; 5 estrelas SVG + texto + link
  ```
  Conteúdo: eyebrow "CEMO • Centro de Microcirurgia Ocular"; H1 exatamente "Clínica de Oftalmologia em Taboão da Serra"; lead "Consulta, exames, tratamentos e cirurgias oftalmológicas, com equipe médica e estrutura reunidas em um só lugar, em Taboão da Serra."; CTA primário "Agendar consulta" → `#agendar` (com `data-hero-cta`, evento `schedule_click` location `hero`); secundário "Conhecer especialidades" → `#especialidades`; `proof` montado na página a partir de `SiteStats` (nunca literais); cartão-nome "Dr. David Ribeiro de Mendonça Filho / Diretor Técnico · CRM/SP 98339" a partir do repositório.
- [ ] **Step 1: Testes (falham).**
  `Hero.test.tsx`: exatamente 1 `h1` com o texto acima; `img` da foto com `fetchpriority="high"`, **sem** `loading="lazy"`, com `width`/`height` e `alt` "Dr. David Ribeiro de Mendonça Filho, diretor técnico do CEMO, de jaleco"; estrutura `<picture>` com `source[media="(min-width: 1024px)"]` (foto original) e a `img` padrão/mobile usando o recorte 4:5; `ReactDOM.preload` das duas fontes com `media` correspondente (afirmar via espionagem de `react-dom` `preload` chamado 2× com `fetchPriority:'high'`); CTA primário tem `data-hero-cta` e altura ≥ 52 px; mira (`Reticle`) tem `aria-hidden="true"` e classe `hidden lg:block` (sem mira no mobile); o texto do hero não depende de JS (nenhum `"use client"` no arquivo); `globals.css` define `hero-rise` apenas dentro de `prefers-reduced-motion: no-preference` e a foto não tem animação de opacidade.
  `TrustBar.test.tsx`: exibe `stats.googleRating.display`, `yearsOfActivity.display`, `patientsServed.display` e `doctorsCount` vindos das props (usar o fixture nos asserts, não literais); lista semântica (`ul`); números em Literata.
  `GoogleRating.test.tsx`: `aria-label` construído de `stats`; 5 `svg` de estrela com `aria-hidden`; link "Ver avaliações no Google" usa `reviewsHref` e dispara `reviews_click`.
- [ ] **Step 2: Rodar → FAIL.**
- [ ] **Step 3: Implementar.** Art direction conforme `docs/design-system.md` §9: usar `getImageProps` de `next/image` para as duas fontes dentro de `<picture>`; na versão do Next instalada verificar se `priority` está depreciado em favor de `preload` e usar o prop vigente **mantendo** `fetchPriority="high"` e `loading="eager"`; `sizes="(min-width:1280px) 620px, (min-width:1024px) 50vw, 100vw"`; `qualities` já liberadas na Task 1. Desktop: grid 12 colunas, texto 1–6, painel `bg-estudio` em `7 / -1` sangrando à direita, `radius-lid` no canto superior esquerdo, foto `object-position: 50% 8%` com máscara horizontal de 12 % nas bordas, mira SVG posicionada em % da imagem (≈ x 47 %, y 18 %), H1 `display` invadindo o painel em até ~72 px sobre fundo vazio, cartão-nome branco sólido na base. Mobile: foto 4:5 (altura ~48svh, máx. 460 px), olhos a ~34 % da altura, borda inferior em arco SVG, nome do médico, H1 36 px, lead, CTAs 100 % de largura, prova em 1–2 linhas, sem mira, sem UtilityBar. `min-height: clamp(640px, calc(100svh - 120px), 820px)` no desktop.
- [ ] **Step 4: Rodar → PASS.** Conferir visualmente nos viewports 1440, 1280, 820, 390, 360 (`npm run dev` + Playwright screenshot ad hoc ou captura manual): rosto sempre enquadrado, nada cortado ou deformado; anotar capturas em `_materiais/qa/` (ignorado). CTA primário visível sem rolar em 390×844.
- [ ] **Step 5: Commit.** `git add src && git commit -m "feat(home): hero com Dr. David, TrustBar e GoogleRating" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

### Task 14: Home, parte A — conversão, serviços, Catarata, Refrativa e Dr. David

**Files:**
- Create: `src/components/home/{ConversionBlock,ServicesGrid,EditorialBlock,DoctorSpotlight}.tsx`, `src/components/ui/ServiceCard.tsx`
- Test: `src/components/home/{ConversionBlock,ServicesGrid,EditorialBlock,DoctorSpotlight}.test.tsx`

**Interfaces:**
- Consumes: `Service`, `EditorialContent`, `Doctor`, `LeadInterest`, `SiteSettings` (Task 3), `LeadForm` (Task 10), `TrackedLink` (Task 6), `Section`, `Container`, `Reticle`, `contact.ts`.
- Produces:
  ```ts
  export function ConversionBlock(p: { interests: LeadInterest[]; settings: SiteSettings }): JSX.Element;   // <Section id="agendar" tone="nevoa">; h2 "Quer agendar uma consulta?"; LeadForm (formId 'home_conversion', location 'home_conversion') + coluna com telefone, WhatsApp e horários
  export function ServicesGrid(p: { services: Service[] }): JSX.Element;            // <Section id="especialidades">; h2 "Como podemos cuidar da sua visão?"; 8 ServiceCard; link "Ver todas as especialidades" → /especialidades/
  export function ServiceCard(p: { service: Service }): JSX.Element;                // h3 + resumo + link específico (ctaLabel); card inteiro clicável via ::after no link; service_cta_click location 'home_services'
  export function EditorialBlock(p: { content: EditorialContent; tone: 'papel' | 'nevoa' }): JSX.Element;   // h2 grande, parágrafos (66ch), bullets com marcador de mira, CTA "Conhecer …" (service_cta_click)
  export function DoctorSpotlight(p: { doctor: Doctor }): JSX.Element;              // foto 3:4 em painel estudio com radius-lid; nome, cargo, áreas, CRM, credenciais; link "Ver todo o corpo clínico" → /corpo-clinico/ (nunca para perfil enquanto published=false)
  ```
- [ ] **Step 1: Testes (falham).**
  `ConversionBlock`: contém o `LeadForm` (3 campos); `id="agendar"`; mostra telefone e WhatsApp com links `tel:`/`wa.me`; `h2` único.
  `ServicesGrid`: exatamente 8 cards nesta ordem e com estes `href`: `/consulta-oftalmologica/`, `/especialidades/catarata/`, `/especialidades/refrativa/`, `/especialidades/retina/`, `/especialidades/glaucoma/`, `/especialidades/cornea/`, `/especialidades/oftalmopediatria/`, `/exames/`; cada card tem um único link (sem links aninhados) com texto específico (ex.: "Saiba mais sobre catarata"); existe "Ver todas as especialidades" → `/especialidades/`; clique no link do card registra `service_cta_click` com `location:'home_services'` e **sem** o nome do serviço no `dataLayer`.
  `EditorialBlock`: renderiza `heading` como `h2`, todos os parágrafos, CTA com `href` do conteúdo; `todos` não aparecem no DOM; alterna `tone`.
  `DoctorSpotlight`: `img` com alt do design-system; texto "CRM/SP 98339" vindo do `doctor`; com `rqe: null` nenhum texto "RQE" é renderizado; credenciais listadas; com `photo: null` renderiza monograma sem quebrar; link do corpo clínico aponta para `/corpo-clinico/`.
- [ ] **Step 2: Rodar → FAIL.**
- [ ] **Step 3: Implementar** (cópias de texto pequenas e verdadeiras; os textos longos de Catarata/Refrativa vêm das fixtures da Task 3). Marcar nos dados, não na UI, os TODOs de revisão médica. Seções alternam `papel`/`nevoa` conforme `docs/design-system.md` §8.
- [ ] **Step 4: Rodar → PASS.**
- [ ] **Step 5: Commit.** `git add src && git commit -m "feat(home): conversao, servicos, blocos editoriais e destaque do Dr. David" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

### Task 15: Home, parte B — estrutura, vídeo, corpo clínico, avaliações, convênios, localização, conteúdos, CTA final e composição da página

**Files:**
- Create: `src/components/home/{TechStructure,VideoSection,DoctorsSection,ReviewsSection,InsuranceSection,LocationSection,ContentSection,FinalCta}.tsx`, `src/components/media/{VideoFacade,LazyMap}.tsx`, `src/components/ui/{DoctorCard,ReviewCard,InsuranceGrid,ArticleCard}.tsx`
- Modify: `src/app/page.tsx` (composição final + metadata + JSON-LD), `src/lib/seo/routes.ts` (garantir `/`)
- Test: um `.test.tsx` por componente novo + `src/app/page.test.tsx`

**Interfaces:**
- Consumes: Tasks 3, 4, 6, 7, 13, 14.
- Produces:
  ```ts
  export function TechStructure(p: { items: EquipmentItem[] }): JSX.Element;       // composição editorial (design-system §7.2): foto-âncora 3:2 com marcas de mira nos 4 cantos + recortes de detalhe com objectPosition; legendas de 2 linhas; faixa com radius-lid; NÃO é galeria uniforme; funciona com 1..6 itens
  export function VideoSection(p: { video: VideoItem }): JSX.Element | null;      // retorna null (seção inteira omitida) enquanto video.youtubeId for null — nada de "em breve" na Home
  export function VideoFacade(p: { title: string; youtubeId: string; poster: ImageAsset | null }): JSX.Element;   // client; só é renderizado com id; botão play 72px "Assistir: {title}" que, ao clicar, troca por <iframe src="https://www.youtube-nocookie.com/embed/{id}?autoplay=1" title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen>
  export function DoctorsSection(p: { doctors: Doctor[] }): JSX.Element;           // 8 DoctorCard (nome, especialidade, CRM; monograma se photo null; sem "Ver perfil" enquanto published=false); link "Conhecer o corpo clínico" → /corpo-clinico/
  export function DoctorCard(p: { doctor: Doctor; compact?: boolean }): JSX.Element;
  export function ReviewsSection(p: { stats: SiteStats; testimonials: Testimonial[]; reviewsHref: string }): JSX.Element;   // GoogleRating + "Ver avaliações no Google"; lista de ReviewCard SOMENTE se testimonials.length > 0
  export function InsuranceSection(p: { plans: InsurancePlan[]; settings: SiteSettings }): JSX.Element;   // InsuranceGrid (nome em texto, logo se existir), "Consulte a cobertura do seu plano", CTA WhatsApp, link /convenios/
  export function LocationSection(p: { settings: SiteSettings }): JSX.Element;     // NAP, <dl> de horários, Como chegar (directions_click), Ligar (phone_click), LazyMap, frase natural com regiões (Embu das Artes, Cotia, Campo Limpo, Vila Sônia…)
  export function LazyMap(p: { embedSrc: string; title: string; address: string }): JSX.Element;   // client; prévia estática local (cartão com pino SVG + endereço) + botão "Carregar mapa interativo"; iframe lazy só após o clique
  export function ContentSection(p: { articles: ArticleLink[] }): JSX.Element;     // h2 "Para cuidar da visão no dia a dia"; ArticleCard (3) + link "Ver todos os conteúdos" → /blog/
  export function FinalCta(p: { settings: SiteSettings }): JSX.Element;            // única faixa azul-profundo (on-dark) com borda radius-lid; "Agendar consulta" (onDark, '#agendar') e WhatsApp
  ```
  Ordem final em `page.tsx`: Hero, TrustBar, ConversionBlock, ServicesGrid, EditorialBlock(catarata), EditorialBlock(refrativa), DoctorSpotlight(David), TechStructure, VideoSection, DoctorsSection, ReviewsSection, InsuranceSection, LocationSection, ContentSection, FinalCta. `generateMetadata`/`metadata` via `buildMetadata({ title: 'Clínica de Oftalmologia em Taboão da Serra', description: 'Consulta, exames, tratamentos e cirurgias oftalmológicas em Taboão da Serra, com equipe médica e estrutura reunidas em um só lugar no CEMO.', path: '/', ogImage: assets.ogHome })`; JSON-LD `buildGraph([buildClinicNode, buildWebSiteNode, buildPersonNode(David)])` via `<JsonLd>`.
- [ ] **Step 1: Testes (falham).**
  `ReviewsSection`: com `testimonials: []` → **sem** lista (`queryByRole('list', {name:/avaliações/})` nulo e nenhum `ReviewCard`) mas com nota e link "Ver avaliações no Google" que dispara `reviews_click`; com 1 depoimento → renderiza autor, texto e origem "Google".
  `VideoSection`: `youtubeId:null` → `container.firstChild` nulo (seção omitida). `VideoFacade`: clique troca por `iframe` cujo `src` começa com `https://www.youtube-nocookie.com/embed/ID`, com `title`; antes do clique não existe `iframe` (um único player por vez).
  `LazyMap`: antes do clique não há `iframe`; após o clique há um `iframe` com `loading="lazy"` e `title`; a prévia estática não faz requisição externa.
  `TechStructure`: com 6 itens renderiza 1 figura-âncora + 5 recortes, cada `img` com `alt` e `width/height`; legendas presentes; com 1 item não quebra; nenhuma legenda contém "TODO".
  `DoctorsSection`: 8 cards, CRM de cada um do fixture, nenhum "RQE", nenhum link de perfil (published=false), monogramas quando sem foto.
  `InsuranceSection`: 16 nomes em texto; nenhuma `img` com `alt=""` para convênio; texto "Consulte a cobertura do seu plano".
  `LocationSection`: NAP igual a `formatAddress(settings)`; botão "Como chegar" com `href` de `directionsHref` e evento `directions_click`; horários em `<dl>`; menção às regiões em prosa (sem lista de keywords).
  `ContentSection`: 3 `ArticleCard` com os `href` `/alimentos-que-auxiliam-na-visao/`, `/prazo-para-descartar-lente-de-contato/`, `/o-que-acontece-se-nao-tratar-conjuntivite/`; card inteiro clicável com um único link.
  `page.test.tsx`: `render(await HomePage())` — exatamente 1 `h1`; ordem das seções por `id` conforme lista acima; sequência de headings sem saltos (h1→h2→h3); toda `img` com `alt`; landmarks `main`; `application/ld+json` parseável com `@graph` contendo `MedicalClinic`, `WebSite`, `Person` e **sem** `Review`/`AggregateRating`/`rqe`; `metadata.title` igual a `{ absolute: 'Clínica de Oftalmologia em Taboão da Serra | CEMO' }`; nenhum texto `TODO_CONTENT_VALIDATION` nem "lorem" no DOM.
- [ ] **Step 2: Rodar → FAIL.**
- [ ] **Step 3: Implementar** os componentes (um arquivo por componente; sem componentes gigantes) e compor a página. Convênios: nenhuma imagem de logo ainda (`logo:null`); cada célula `papel` com borda hairline ≥ 120×64 px. Vídeo: nada de player carregado antes do clique.
- [ ] **Step 4: Rodar → PASS** (`npm test && npm run typecheck && npm run lint && npm run build`).
- [ ] **Step 5: QA visual manual** em 1440, 1280, 820, 390, 360: sem rolagem horizontal, sem texto < 16 px, foco visível em todos os controles; registrar achados em `docs/case-study-notes.md`.
- [ ] **Step 6: Commit.** `git add src && git commit -m "feat(home): secoes restantes e composicao completa da Home" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

### Task 16: 404 humanizada, páginas legais (placeholders) e registro de rotas

**Files:**
- Create: `src/app/not-found.tsx`, `src/app/privacidade/page.tsx`, `src/app/cookies/page.tsx`, `src/components/layout/LegalPage.tsx`, `src/components/layout/Breadcrumbs.tsx`
- Modify: `src/lib/seo/routes.ts` (`/privacidade/`, `/cookies/` em `core`)
- Test: `src/app/not-found.test.tsx`, `src/app/legal.test.tsx`, `src/components/layout/Breadcrumbs.test.tsx`

**Interfaces:**
- Consumes: `buildMetadata`, `buildBreadcrumbNode`, `JsonLd` (Task 7), `whatsappHref` (Task 3), `Button`.
- Produces:
  ```ts
  export function LegalPage(p: { title: string; updatedNote: string; children: React.ReactNode }): JSX.Element;   // h1 único; aviso role="note" "Versão preliminar, em revisão jurídica"
  export function Breadcrumbs(p: { items: Array<{ name: string; path: string }> }): JSX.Element;   // nav aria-label="Você está aqui", ol, último item aria-current="page", separador aria-hidden; emite BreadcrumbList JSON-LD
  ```
- [ ] **Step 1: Testes (falham).**
  `not-found.test.tsx`: um `h1` ("Não encontramos esta página"); links para `/`, `/especialidades/`, `/exames/`, `/corpo-clinico/`, `/contato/`; botão WhatsApp com mensagem genérica; `metadata.robots` noindex.
  `legal.test.tsx`: `/privacidade/` e `/cookies/` exportam `metadata` indexável (sem `noindex`), um `h1`, aviso `role="note"`; `/privacidade/` descreve **apenas** o que o site realmente coleta (nome, WhatsApp e interesse informados no formulário; parâmetros de campanha; finalidade: retornar o contato; operador/controlador CEMO; contato sac@oftalmologiacemo.com.br) — sem inventar CNPJ, DPO ou prazos de retenção (`TODO_CONTENT_VALIDATION` no código); `/cookies/` lista categorias (necessários; analytics/publicidade via GTM somente com consentimento) e como alterar a escolha (botão que limpa `cemo.consent.v1` e reabre o banner).
  `Breadcrumbs.test.tsx`: `ol` com itens e `aria-current="page"` no último; JSON-LD `BreadcrumbList` com `position` sequencial e URLs absolutas.
  Teste de `routes.test.ts` (Task 7) continua verde: toda rota do sitemap tem `page.tsx`.
- [ ] **Step 2: Rodar → FAIL.**
- [ ] **Step 3: Implementar.** Sem busca na 404 (não há busca no site ainda — decisão registrada em `docs/case-study-notes.md`; links úteis + WhatsApp cobrem a necessidade).
- [ ] **Step 4: Rodar → PASS.**
- [ ] **Step 5: Commit.** `git add src docs/case-study-notes.md && git commit -m "feat: pagina 404, paginas legais preliminares e Breadcrumbs" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

### Task 17: E2E, acessibilidade, performance e fechamento da documentação

**Files:**
- Create: `e2e/{home,seo,lead,redirects,a11y,responsive}.spec.ts`, `e2e/stub-webhook.mjs`, `scripts/list-todos.mjs`
- Modify: `playwright.config.ts`, `docs/seo-checklist.md`, `docs/analytics-plan.md`, `docs/case-study-notes.md`

**Interfaces:**
- Consumes: app construído (`npm run build`), `redirectTables` (Task 8).
- Produces: `playwright.config.ts` com dois `webServer` (build uma vez: `SITE_ENV=production NEXT_PUBLIC_SITE_URL=http://localhost:3100 npm run build`): porta **3100** com `LEAD_WEBHOOK_URL=http://localhost:3199/lead` + `LEAD_WEBHOOK_SECRET=test-secret`, porta **3101** sem webhook (falha fechada); `e2e/stub-webhook.mjs` sobe na 3199, guarda as requisições em memória e expõe `GET /received` / `DELETE /received`. Projects por viewport: `desktop-1440`, `desktop-1280`, `tablet-820`, `mobile-390`, `mobile-360`. `scripts/list-todos.mjs` (`npm run todos`): varre `src/` e `docs/` e imprime contagem e linhas de `TODO_CONTENT_VALIDATION` agrupadas por arquivo (exit 0; `--strict` sai com 1 se houver).
- [ ] **Step 1: Escrever as specs (falham até a app estar consistente).**
  `home.spec.ts` (todos os viewports): `GET /` 200; exatamente 1 `h1` com texto "Clínica de Oftalmologia em Taboão da Serra"; `img` do hero com `fetchpriority="high"` e `loading` ≠ `lazy`; existe `link[rel=preload][as=image]`; o elemento LCP medido com `PerformanceObserver('largest-contentful-paint')` é a imagem do hero (`src` contém `dr-david`) e `expect.soft(lcp).toBeLessThan(2500)`; sem JS (`javaScriptEnabled:false`) o `h1`, o CTA e as seções principais existem no HTML; com `reducedMotion:'reduce'` o texto do hero tem `opacity:1` imediatamente; as 15 seções aparecem na ordem definida.
  `seo.spec.ts`: `<title>` "Clínica de Oftalmologia em Taboão da Serra | CEMO"; `link[rel=canonical]` `http://localhost:3100/`; `meta[name=robots]` com `index`; JSON-LD parseável, `@id`s únicos e estáveis entre duas cargas, sem `Review`/`AggregateRating`; `/robots.txt` com `Allow: /` e `Sitemap:`; `/sitemap.xml` lista `/`, `/privacidade/`, `/cookies/` e **não** `/obrigado/`; headers (`x-content-type-options`, `strict-transport-security`, `referrer-policy`, `permissions-policy`, `content-security-policy`) presentes; `/nao-existe/` → 404 com `noindex` e link do WhatsApp.
  `lead.spec.ts`: (3100) caminho feliz — preencher "Nome", "WhatsApp" `(11) 91234-5678`, escolher "Catarata", enviar → URL `/obrigado/`, stub recebeu 1 lead com `whatsapp:'5511912345678'`, `interest:'catarata'`, `X-Webhook-Secret: test-secret`, e `attribution.landingPage`/`utm_source` quando a visita começou em `/?utm_source=teste&gclid=abc`; `dataLayer` sem nome/telefone/interesse; erros de validação — envio vazio mostra resumo `role=alert`, foco no resumo, mensagem de telefone inválido; (3101) sem webhook — envio mostra falha fechada com link "Falar no WhatsApp" e nenhum `/obrigado/`; honeypot via `request.post('/api/lead')` com `website` preenchido → 200 e stub **sem** nova entrada; sexta requisição seguida do mesmo cliente → 429.
  `redirects.spec.ts` (`request` com `maxRedirects:0`): `/contato-2/` → 301 `Location` `/contato/`; `/contato-2/?utm_source=x` preserva a query; `/CONTATO-2` → 301 direto (um salto); `/exames/lentes/` → 301 `/especialidades/lentes-de-contato/`; `/post-list/` → 410; primeira tag do CSV → 410; `/robots.txt` e `/_next/static/…` não são redirecionados.
  `a11y.spec.ts` (1440 e 390): `@axe-core/playwright` com tags `wcag2a, wcag2aa, wcag21aa, wcag22aa` → 0 violações, com o banner de cookies aberto e depois de escolher; primeiro Tab foca o skip link "Ir para o conteúdo" e Enter move o foco para `#conteudo`; menu: Enter abre um grupo mega, Esc fecha e devolve o foco; todos os controles interativos têm bounding box ≥ 44×44 (soft ≥ 48).
  `responsive.spec.ts` (RF-5): em cada viewport `document.documentElement.scrollWidth <= window.innerWidth`; em 390/360 com banner pendente a barra sticky está oculta, após "Recusar" aparece depois de rolar além do hero e **não** intersecta o banner (banner já removido) nem o elemento focado via Tab (rolar com Tab por todos os links do rodapé e checar `elementFromPoint` do centro do foco ≠ barra); com `page.addStyleTag({content:'html{zoom:2}'})` em 1280 ainda sem rolagem horizontal.
- [ ] **Step 2: Rodar → FAIL/ajustes.** `npm run build` (com as envs acima) e `npx playwright test`. Corrigir a causa de cada falha no componente dono (não relaxar o teste), anotar no log de decisões.
- [ ] **Step 3: Lighthouse (informativo).** Com `npm start` (3100): `npx lighthouse http://localhost:3100/ --form-factor=mobile --only-categories=performance,accessibility,seo,best-practices --output=json --output-path=_materiais/qa/lh-mobile.json` (e desktop). Metas: a11y ≥ 98, SEO ≥ 95, LCP ≤ 2,5 s, CLS ≤ 0,1; INP verificado manualmente (interações do menu e do formulário < 200 ms). Registrar números e gargalos em `docs/seo-checklist.md`.
- [ ] **Step 4: Fechar a documentação.** `docs/seo-checklist.md`: Definition of Done da Home (briefing §158: Dr. David em destaque, visual premium, mobile, SEO, CTA, formulário, prova social, serviços, médicos, estrutura, localização, reviews, performance, a11y) com status; **portões de lançamento** (dados `TODO_CONTENT_VALIDATION` abertos — saída de `npm run todos` colada; `redirects:check-targets` vazio; `SITE_ENV=production`; `LEAD_WEBHOOK_URL` configurado; GTM/consent revisados; textos legais revisados; foto de alta resolução; vídeo; vetor do logo; revisão médica dos textos de Catarata/Refrativa). `docs/analytics-plan.md`: confirmar eventos implementados. `docs/case-study-notes.md`: decisões e trade-offs finais (CSP com `unsafe-inline`, rate limit em memória, hero sem fade na foto, fonte escolhida, destinos de redirect pendentes, sitemap único, sticky CTA oculto durante consentimento pendente, nenhum depoimento inventado, convênios sem logos).
- [ ] **Step 5: Verificação final.** `npm run typecheck && npm run lint && npm test && npx playwright test` todos verdes; `npm run todos` executado e colado no checklist; `git status --short` limpo de `_materiais/`/`.env`.
- [ ] **Step 6: Commit.** `git add e2e scripts playwright.config.ts docs package.json && git commit -m "test(e2e): suite de smoke, a11y e responsividade; fecha docs da Home" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

## Auto-revisão

- **Cobertura da spec:** stack/estrutura (T1–2), conteúdo sem CMS (T3), assets e logo (T4–5), analytics/consent (T6), SEO infra e headers (T7), redirects 301/410 (T8), leads + segurança de formulário (T9–10), header/mega/mobile/sticky/footer (T11–12), hero com direção de arte (T13), jornada da Home de 15 blocos (T14–15), 404/legais/breadcrumbs (T16), e2e/a11y/perf/DoD/docs (T17). Docs `content-model` (T3), `analytics-plan` (T6), `seo-checklist` (T7/T17), `case-study-notes` (T1→T17).
- **Consistência de tipos:** `SiteSettings`, `SiteStats`, `Doctor`, `Service`, `LeadInterest(Id)`, `LeadAttribution`, `LeadSubmission`, `LeadRecord`, `LeadProvider`, `RateLimiter`, `RedirectTables`, `track`, `TrackedLink`, `buildMetadata`, `buildGraph`, `Logo`, `assets` aparecem com a mesma assinatura em produção e consumo. `getNavigation()` retorna `[]` na T3 e passa a retornar `navigation` na T11 (declarado).
- **Cobertura de Review Focus:** RF-1 (T9), RF-2 (T6, T10), RF-3 (T8, T17), RF-4 (T9, T10), RF-5 (T12, T17).
- **Dependências entre tarefas:** a Home linka páginas que só existem nos planos seguintes (Catarata, Refrativa, Retina, exames, Corpo Clínico, blog); em staging esses links dão 404 até lá, e o sitemap lista apenas rotas existentes.
