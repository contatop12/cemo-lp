# Modelo de conteúdo — CEMO

Para a equipe de desenvolvimento e conteúdo. Define as entidades do site, onde ficam hoje (fixtures tipadas) e como migram para um CMS headless (recomendação do briefing: Sanity).

## Arquitetura

```
páginas / componentes  ──►  content (ContentRepository)  ──►  adapter  ──►  fonte
                              src/content/index.ts          fixtures.ts     src/content/fixtures/*.ts
                                                            (futuro) sanity.ts  →  Sanity
```

- **Tipos:** `src/content/types.ts` — contrato único; ninguém define formas de conteúdo fora daqui.
- **Repositório:** `src/content/index.ts` exporta a interface `ContentRepository` e a instância `content`, escolhida por `CONTENT_SOURCE` (padrão `fixtures`).
- **Páginas** são Server Components async que chamam `content.*` e passam dados por props; componentes de apresentação não buscam dados.

### Como trocar a fonte (ex.: Sanity)

1. Criar `src/content/adapters/sanity.ts` com `createSanityRepository(): ContentRepository` (consultas GROQ mapeadas para os tipos de `types.ts`).
2. Adicionar o caso `'sanity'` em `createRepository()` (`src/content/index.ts`).
3. Definir `CONTENT_SOURCE=sanity` e as credenciais **somente em variáveis server-side**.
4. Os testes de `src/content/repository.test.ts` servem como contrato: o novo adapter deve passar neles com os dados reais.

## Entidades atuais

| Tipo | Fixture | Uso | Mapeamento Sanity (briefing §102) |
|---|---|---|---|
| `SiteSettings` | `site-settings.ts` | NAP, horários, redes, GBP, responsável técnico | `SiteSettings` |
| `SiteStats` | `stats.ts` | Nota Google, anos, atendimentos (prova social) | `SiteSettings` (bloco "prova") |
| `Doctor` | `doctors.ts` | 8 médicos (CRM, áreas, formação transcrita) | `Doctors` |
| `Service` | `services.ts` | 8 cards da Home → URLs canônicas | `Specialties` / `Treatments` / `Exams` (hubs) |
| `LeadInterest` | `lead-interests.ts` | Opções do campo "O que você está buscando?" | derivado de serviços confirmados |
| `InsurancePlan` | `insurance-plans.ts` | 16 convênios identificados | `InsurancePlans` |
| `Testimonial` | `testimonials.ts` | Avaliações reais selecionadas (vazio) | `Testimonials` |
| `VideoItem` | `videos.ts` | "Tudo em um lugar só" (facade) | `Videos` |
| `ArticleLink` | `articles.ts` | Posts em destaque (URLs preservadas) | `Articles` |
| `EquipmentItem` | `equipment.ts` | Fotos reais da estrutura | `SiteSettings`/galeria "Estrutura" |
| `EditorialContent` | `editorial.ts` | Blocos Catarata e Refrativa da Home | campos editoriais em `Specialties` |
| `NavGroup` / `NavLink` | `navigation.ts` (Task 11) | Header, mega menu, rodapé | `SiteSettings` (menu) |

Entidades do briefing ainda não usadas nesta fase: `Conditions`, `Treatments`, `Exams` completos, `Categories`, `Redirects` (hoje gerados do CSV — ver `docs/information-architecture.md`), `SEO` por documento. Conteúdo médico estratégico terá `author`, `medicalReviewer`, `reviewedAt`, `sources` e status `DRAFT → MEDICAL_REVIEW → APPROVED → PUBLISHED` (briefing §76) — entra com as páginas de especialidade.

## Convenção `todos`

Todo dado não confirmado pela CEMO carrega, no próprio registro, um item em `todos: string[]` começando com `TODO_CONTENT_VALIDATION:`. Um teste garante o prefixo. `npm run todos` (Task 17) lista todas as pendências do repositório.

Regras: nada é inventado (RQE, preço, prazo, técnica, nota, formação); números de prova social existem **apenas** em `stats.ts` (teste-guarda `no-hardcoded-facts.test.ts` impede que apareçam escritos em componentes ou páginas); NAP existe **apenas** em `site-settings.ts`.

## Pendências abertas (TODO_CONTENT_VALIDATION)

- **Médicos:** RQE de todos (nenhum aparece no site atual); bios humanizadas; revisão da formação transcrita; autorização de imagem e fotos profissionais (só há foto do Dr. David); grafia do CRM do Dr. David (98339 × 98.339).
- **Prova social:** nota e quantidade de avaliações no Google; anos de atividade (+20 × +15); fonte do "+100 mil atendimentos".
- **Convênios:** lista atual (logos de 2020–2022), 17º logo não identificado, natureza do Dr. Consulta.
- **NAP:** bairro (Centro × Jardim Bom Tempo); URLs do Google Business Profile; continuidade do "Exame online" (cemo.sivoe.med.br).
- **Depoimentos:** seleção de avaliações reais do Google aprovada pela CEMO.
- **Vídeo:** publicação web de "Tudo em um lugar só", poster e transcrição.
- **Editoriais:** revisão médica dos textos de Catarata e Refrativa; técnicas refrativas efetivamente oferecidas.
- **Equipamentos:** identificação e função de cada aparelho fotografado.


## Fase 2 — entidades de conteúdo médico (2026-10-22)

| Entidade | Tipo (`types.ts`) | Onde mora | Rota |
|---|---|---|---|
| Especialidade / serviço / consulta / tratamento | `Specialty` | `fixtures/specialties/*.ts` | `/especialidades/{slug}/`, `/consulta-oftalmologica/`, `/tratamentos/{slug}/` (só `published`) |
| Exame | `Exam` (template §26) | `fixtures/exams/*.ts` | `canonicalPath` (6 em slug de artigo preservado, servidos por `/[slug]/`) |
| Condição ocular | `Condition` + `ConditionLink` (condições que moram em post) | `fixtures/conditions/*.ts` | `/condicoes-oculares/{slug}/` |
| Médico | `Doctor` (+ `bio`, `specialtyIds`, `videoIds`) | `fixtures/doctors.ts` | `/corpo-clinico/{slug}/` (só `published`) |
| Vídeo | `VideoItem` (MP4 local, pôster, VTT, transcrição) | `fixtures/videos.ts` | — |
| Post do blog | `PostSummary` / `Post` (HTML sanitizado) | `src/content/posts/*.json` (gerado por `scripts/migrate-wp.mjs`) | `/{slug}/`, `/blog/`, `/blog/pagina/{n}/` |

- Toda entidade médica tem `review: MedicalReview` (`status`, `author`, `medicalReviewerSlug`, `reviewedAt`, `updatedAt`, `sources`) — fluxo em `docs/medical-content-workflow.md`.
- `related` (`doctors`, `specialties`, `exams`, `conditions`, `articles`) liga as entidades; `src/content/integrity.test.ts` garante que todo id existe e está publicado.
- `answer` = resposta direta de 40–100 palavras (GEO/AEO); `faq` vira `FAQPage` só porque está visível na página.
- Para trocar fixtures por um CMS (Sanity), o adapter novo implementa a mesma interface `ContentRepository` (`src/content/index.ts`).
