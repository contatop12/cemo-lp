# Arquitetura de informação e plano de SEO — oftalmologiacemo.com.br (rebuild Next.js)

Público: time de desenvolvimento, design e SEO da agência. Fontes: briefing (PDF), `docs/current-site-audit.md`, `_materiais/analise/*` (crawl de 22/10/2026, GSC 21/07 a 20/10/2026, estudo de palavras-chave, resumo da proposta). Companheiros desta decisão: `docs/seo-migration-map.csv`, `docs/keyword-page-map.csv`, `docs/content-gap-map.csv`.

Diretriz mestra: **reconstruir o site não significa recomeçar o SEO**. Primeiro preservar o patrimônio orgânico (home, institucionais, blog), depois crescer as páginas comerciais (Catarata, Refrativa e demais) em cima de URLs que já existem.

Limites dos dados que sustentam as decisões (tratar como hipóteses a validar):
- O GSC não tem junção consulta × página; toda atribuição de consulta a URL é **inferência** por slug/título (marcada `[inferido]` na coluna `main_queries`). Antes do corte, reexportar com consulta × página e 12-16 meses.
- Não há export de backlinks. A decisão de "410" para tags/URLs sem tráfego assume ausência de links externos relevantes; conferir (GSC > Links, Ahrefs/Semrush) antes de publicar.
- Estudo de palavras-chave é nacional; usado só como sinal de intenção/tamanho relativo. Marcas de terceiros e convênios fora do planejamento de páginas.

---

## 1. Convenções de URL

1. **Preservar sempre que há sinal.** URL com cliques, impressões, ranking ou backlink não muda por estética (briefing, regra de URLs). Por isso os posts continuam na raiz (`/{slug}/`, não `/blog/{slug}/`) e especialidades/exames mantêm `/especialidades/*` e `/exames/*`.
2. Minúsculas, hífen, sem acentos, **barra final** (`trailingSlash: true` no Next.js). Host canônico `https://oftalmologiacemo.com.br` (sem `www`, https).
3. Uma intenção de busca = uma página primária. Menu não é arquitetura SEO: a mesma URL pode aparecer em vários pontos de navegação (seção 4); nunca duplicar página porque pertence a duas camadas.
4. Prefixos por camada: `/especialidades/` (especialidades e as cirurgias-âncora Catarata e Refrativa), `/tratamentos/` (procedimentos filhos de especialidade: pterígio, calázio, YAG laser, fotocoagulação; gated: crosslinking, anel, transplante), `/exames/`, `/condicoes-oculares/`, `/corpo-clinico/{slug}/`, `/convenios/`, `/sobre/`, `/contato/`, `/blog/` (índice), `/lp/` (experimentos de Ads, noindex).
5. **O campo `canonicalPath` é um dado da entidade (content model), não derivado do tipo.** Seis exames moram em slug de artigo preservado; o template renderiza igual. O hub, o menu, os links e o sitemap sempre leem `canonicalPath`.
6. Sem páginas por bairro/cidade (`/oftalmologista-cotia/` etc.). Regiões de influência aparecem de forma natural na Home, Contato e páginas-chave, sem lista de keywords.
7. Slugs reservados para o roteador de posts (`/{slug}/`): `sobre`, `contato`, `convenios`, `corpo-clinico`, `especialidades`, `exames`, `tratamentos`, `condicoes-oculares`, `consulta-oftalmologica`, `estrutura-e-tecnologia`, `blog`, `obrigado`, `privacidade`, `cookies`, `lp`, `category`, `tag`, `author`, `api`. Rotas estáticas têm precedência; build deve falhar se um post usar slug reservado.

---

## 2. Camadas e onde cada entidade mora

| Camada | O que é | Onde mora (URL) | Observações |
|---|---|---|---|
| Institucional | Home, A CEMO, Estrutura e Tecnologia, Convênios, Contato, legais | `/`, `/sobre/`, `/estrutura-e-tecnologia/`, `/convenios/`, `/contato/`, `/privacidade/`, `/cookies/` | `/sobre/` mantém a URL histórica (equivale a "A CEMO"). |
| Consultas | Consulta oftalmológica genérica | `/consulta-oftalmologica/` | Só intenção sem cidade. Intenção local fica na Home. |
| Especialidades | Catarata, Refrativa, Glaucoma, Retina, Córnea, Oftalmopediatria, Estrabismo, Plástica Ocular, Lentes de Contato | `/especialidades/{slug}/` | Retina = hub único. Não existe "Retina & Mácula". |
| Cirurgias e Tratamentos | Cirurgia de Catarata, Cirurgia Refrativa, Crosslinking, Anel Intraestromal, Transplante de Córnea, Tratamento de Glaucoma | Catarata e Refrativa: `/especialidades/catarata/` e `/especialidades/refrativa/` (mesma URL). Glaucoma: `/especialidades/glaucoma/`. Demais: `/tratamentos/{slug}/` | `/tratamentos/` é diretório. Tratamento só tem URL própria se tiver procedimento distinto e confirmado. |
| Exames | Hub + 1 página por exame realizado | `/exames/` + canonicalPath por exame (seção 7) | Template único de exame. |
| Condições Oculares | Entidades evergreen (não são Q&A) | `/condicoes-oculares/{slug}/` ou, quando um artigo já é a entidade, a URL do artigo (presbiopia, uveíte, olho seco). Catarata e Glaucoma = página de especialidade | Condição organiza; artigo responde pergunta específica. Sem duplicar o que já funciona. |
| Corpo Clínico | Hub + perfil por médico | `/corpo-clinico/` e `/corpo-clinico/{slug}/` | Não existe URL de médico hoje; escolha do padrão `/corpo-clinico/{slug}/` mantém o hub (93 cliques) como pai natural. Sem motivo para mudar. |
| Conteúdos | Blog | `/blog/` (índice) + posts em `/{slug}/` | Categorias e tags deixam de ser rotas (seção 10). |

---

## 3. Rotas planejadas (Next.js App Router)

Prioridade: P0 = preservação SEO, Home, Catarata, Refrativa, conversão, analytics; P1 = Retina, Glaucoma, Córnea/Ceratocone, exames principais, Corpo Clínico; P2 = restante. `canonical` autorreferente em todas, exceto onde indicado. Total de rotas listadas: 58 linhas (P0: 13, P1: 27, P2: 18); médicos = 8 páginas.

| Rota | page_type | Template | Prioridade | Canonical | Grupo do sitemap | Observação |
|---|---|---|---|---|---|---|
| `/` | home | HomePage | P0 | `/` | core | Existente (UPDATE). Alvo local principal. |
| `/consulta-oftalmologica/` | consulta | ConsultPage | P1 | `/consulta-oftalmologica/` | core | NOVA. Só intenção sem cidade; ver canibalização. |
| `/especialidades/` | hub_especialidades | HubPage | P0 | `/especialidades/` | especialidades | Existente (22 cliques). |
| `/especialidades/catarata/` | especialidade | SpecialtyPage | P0 | `/especialidades/catarata/` | especialidades | Canônica única de Catarata/Cirurgia de Catarata. Também em Cirurgias e Tratamentos. |
| `/especialidades/refrativa/` | especialidade | SpecialtyPage | P0 | `/especialidades/refrativa/` | especialidades | Canônica única de Refrativa/Cirurgia Refrativa. |
| `/especialidades/glaucoma/` | especialidade | SpecialtyPage | P1 | `/especialidades/glaucoma/` | especialidades | Página forte única. |
| `/especialidades/retina/` | especialidade | SpecialtyHubPage | P1 | `/especialidades/retina/` | especialidades | Hub grande de Retina. |
| `/especialidades/cornea/` | especialidade | SpecialtyHubPage | P1 | `/especialidades/cornea/` | especialidades | Hub de Córnea. |
| `/especialidades/oftalmopediatria/` | especialidade | SpecialtyPage | P2 | `/especialidades/oftalmopediatria/` | especialidades | NOVA. Orientada aos pais. |
| `/especialidades/estrabismo/` | especialidade | SpecialtyPage | P2 | `/especialidades/estrabismo/` | especialidades | NOVA. |
| `/especialidades/plastica-ocular/` | especialidade | SpecialtyHubPage | P2 | `/especialidades/plastica-ocular/` | especialidades | Hub; sub-páginas só se confirmadas. |
| `/especialidades/lentes-de-contato/` | servico | SpecialtyPage | P2 | `/especialidades/lentes-de-contato/` | especialidades | NOVA (serviço). /exames/lentes/ -> 301. |
| `/tratamentos/` | hub_tratamentos | HubPage | P2 | `/tratamentos/` | especialidades | NOVA. Diretório da camada Cirurgias e Tratamentos (lista catarata e refrativa nas URLs canônicas). |
| `/tratamentos/crosslinking-corneano/` | tratamento | TreatmentPage | P1 | `/tratamentos/crosslinking-corneano/` | especialidades | NOVA. Publicar só com confirmação (TODO_CONTENT_VALIDATION). |
| `/tratamentos/anel-intraestromal/` | tratamento | TreatmentPage | P2 | `/tratamentos/anel-intraestromal/` | especialidades | NOVA, GATED (TODO_CONTENT_VALIDATION). Página separada de Crosslinking. |
| `/tratamentos/transplante-de-cornea/` | tratamento | TreatmentPage | P2 | `/tratamentos/transplante-de-cornea/` | especialidades | NOVA, GATED (TODO_CONTENT_VALIDATION). |
| `/tratamentos/pterigio/` | tratamento (cirurgia) | TreatmentPage | P1 | `/tratamentos/pterigio/` | especialidades | NOVA (ajustes 23/10/2026). Filha de Córnea. |
| `/tratamentos/calazio/` | tratamento (cirurgia) | TreatmentPage | P1 | `/tratamentos/calazio/` | especialidades | NOVA (ajustes 23/10/2026). Filha de Plástica Ocular. |
| `/tratamentos/yag-laser/` | tratamento (procedimento) | TreatmentPage | P1 | `/tratamentos/yag-laser/` | especialidades | NOVA (ajustes 23/10/2026). Não cirúrgico; filha de Catarata. Linka o post de capsulotomia. |
| `/tratamentos/fotocoagulacao-a-laser/` | tratamento (procedimento) | TreatmentPage | P1 | `/tratamentos/fotocoagulacao-a-laser/` | especialidades | NOVA (ajustes 23/10/2026). Laser de argônio, não cirúrgico; filha de Retina. |
| `/exames/` | hub_exames | HubPage | P0 | `/exames/` | exames | Existente (45 cliques). Lista cada exame na URL canônica. |
| `/exames/mapeamento/` | exame | ExamPage | P1 | `/exames/mapeamento/` | exames | Primária (absorve 2 posts). |
| `/exame-de-campo-visual-o-que-e-para-que-serve-e-como-e-feito/` | exame | ExamPage | P1 | `/exame-de-campo-visual-o-que-e-para-que-serve-e-como-e-feito/` | exames | Slug de artigo preservado (117 cliques). /exames/campo-visual/ -> 301. |
| `/o-que-voce-precisa-saber-sobre-retinografia/` | exame | ExamPage | P1 | `/o-que-voce-precisa-saber-sobre-retinografia/` | exames | Slug de artigo preservado. /exames/retinografia/ -> 301. |
| `/ceratoscopia-para-que-serve-o-exame/` | exame | ExamPage | P1 | `/ceratoscopia-para-que-serve-o-exame/` | exames | Slug de artigo preservado. /exames/ceratoscopia/ -> 301. |
| `/o-que-e-exame-de-microscopia/` | exame | ExamPage | P1 | `/o-que-e-exame-de-microscopia/` | exames | Slug de artigo preservado. /exames/microscopia/ -> 301. |
| `/exame-de-ctd-curva-tensional-diaria-tudo-sobre/` | exame | ExamPage | P1 | `/exame-de-ctd-curva-tensional-diaria-tudo-sobre/` | exames | Slug de artigo preservado. /exames/ctd/ -> 301. |
| `/exames/tonometria/` | exame | ExamPage | P1 | `/exames/tonometria/` | exames | Primária. |
| `/exames/paquimetria/` | exame | ExamPage | P1 | `/exames/paquimetria/` | exames | Primária (absorve 1 post). |
| `/exames/gonioscopia/` | exame | ExamPage | P1 | `/exames/gonioscopia/` | exames | Primária (absorve 1 post). |
| `/exames/biometria/` | exame | ExamPage | P1 | `/exames/biometria/` | exames | Primária (absorve 1 post). |
| `/exames/ultrassom-ocular/` | exame | ExamPage | P1 | `/exames/ultrassom-ocular/` | exames | NOVA (ajustes 23/10/2026). Absorve o post de ultrassonografia ocular (CONSOLIDATE 301). |
| `/tudo-o-que-voce-precisa-saber-sobre-estereofoto-de-papila/` | exame | ExamPage | P2 | `/tudo-o-que-voce-precisa-saber-sobre-estereofoto-de-papila/` | exames | Slug de artigo preservado. /exames/estereofoto/ -> 301. |
| `/condicoes-oculares/` | hub_condicoes | HubPage | P2 | `/condicoes-oculares/` | condicoes | NOVA. Lista entidades (inclui as que moram em URL de artigo). |
| `/condicoes-oculares/ceratocone/` | condicao | ConditionPage | P1 | `/condicoes-oculares/ceratocone/` | condicoes | NOVA (estudo 9.900). Absorve 4 posts. |
| `/condicoes-oculares/miopia/` | condicao | ConditionPage | P2 | `/condicoes-oculares/miopia/` | condicoes | NOVA. Absorve /tudo-sobre-miopia/. |
| `/condicoes-oculares/hipermetropia/` | condicao | ConditionPage | P2 | `/condicoes-oculares/hipermetropia/` | condicoes | NOVA. Post Q&A de 47 cliques permanece. |
| `/condicoes-oculares/astigmatismo/` | condicao | ConditionPage | P2 | `/condicoes-oculares/astigmatismo/` | condicoes | NOVA. Absorve /tudo-sobre-astigmatismo/. |
| `/condicoes-oculares/baixa-visao/` | condicao | ConditionPage | P2 | `/condicoes-oculares/baixa-visao/` | condicoes | NOVA. |
| `/condicoes-oculares/conjuntivite/` | condicao | ConditionPage | P2 | `/condicoes-oculares/conjuntivite/` | condicoes | NOVA. Absorve /tudo-sobre-conjuntivite/. |
| `/condicoes-oculares/degeneracao-macular/` | condicao | ConditionPage | P2 | `/condicoes-oculares/degeneracao-macular/` | condicoes | NOVA. Liga hub Retina. |
| `/condicoes-oculares/descolamento-de-retina/` | condicao | ConditionPage | P2 | `/condicoes-oculares/descolamento-de-retina/` | condicoes | NOVA (lacuna de conteúdo; revisão médica). |
| `/corpo-clinico/` | corpo_clinico_hub | DoctorsHubPage | P1 | `/corpo-clinico/` | corpo-clinico | Existente (93 cliques). |
| `/corpo-clinico/david-ribeiro-de-mendonca-filho/` | medico | DoctorPage | P1 | `/corpo-clinico/david-ribeiro-de-mendonca-filho/` | corpo-clinico | NOVA. Dr. David Ribeiro de Mendonça Filho (Diretor Técnico). Schema Physician. |
| `/corpo-clinico/priscilla-pires/` | medico | DoctorPage | P1 | `/corpo-clinico/priscilla-pires/` | corpo-clinico | NOVA. Dra. Priscilla Pires. Schema Physician. |
| `/corpo-clinico/cintia-gomes-galvao/` | medico | DoctorPage | P1 | `/corpo-clinico/cintia-gomes-galvao/` | corpo-clinico | REMOVIDO (ajustes da CEMO, 23/10/2026). Dra. Cintia Gomes Galvão. Schema Physician. |
| `/corpo-clinico/rodrigo-arantes/` | medico | DoctorPage | P1 | `/corpo-clinico/rodrigo-arantes/` | corpo-clinico | REMOVIDO (ajustes da CEMO, 23/10/2026). Dr. Rodrigo Arantes. Schema Physician. |
| `/corpo-clinico/adriana-bizzarri/` | medico | DoctorPage | P1 | `/corpo-clinico/adriana-bizzarri/` | corpo-clinico | NOVA. Dra. Adriana Bizzarri. Schema Physician. |
| `/corpo-clinico/adriano-de-morais-ferreira/` | medico | DoctorPage | P1 | `/corpo-clinico/adriano-de-morais-ferreira/` | corpo-clinico | NOVA. Dr. Adriano de Morais Ferreira. Schema Physician. |
| `/corpo-clinico/bruna-de-andrade-nascimento/` | medico | DoctorPage | P1 | `/corpo-clinico/bruna-de-andrade-nascimento/` | corpo-clinico | REMOVIDO (ajustes da CEMO, 23/10/2026). Dra. Bruna de Andrade Nascimento. Schema Physician. |
| `/corpo-clinico/roberta-andrade-e-nascimento/` | medico | DoctorPage | P1 | `/corpo-clinico/roberta-andrade-e-nascimento/` | corpo-clinico | NOVA. Dra. Roberta Andrade e Nascimento. Schema Physician. |
| `/convenios/` | institucional | InstitutionalPage | P1 | `/convenios/` | core | Existente (18 cliques, CTR 3,75%). |
| `/sobre/` | institucional | InstitutionalPage | P1 | `/sobre/` | core | Existente. É a "A CEMO". |
| `/estrutura-e-tecnologia/` | institucional | InstitutionalPage | P2 | `/estrutura-e-tecnologia/` | core | NOVA. Clínica, centro cirúrgico, equipamentos (fotos reais). |
| `/contato/` | institucional | ContactPage | P0 | `/contato/` | core | Existente (51 cliques). Absorve /contato-2/. |
| `/blog/` | blog_index | BlogIndexPage | P0 | `/blog/` | blog | Existente. Paginação /blog/pagina/{n}/ (canônica própria, fora do sitemap). |
| `/{slug}/` | post_blog | PostPage | P0 | `/{slug}/` | blog | Dinâmica. 157 posts atuais -> 119 rotas após consolidação (KEEP+UPDATE; inclui 9 que são entidade de exame/condição). Slug na raiz preservado. |
| `/obrigado/` | utilitaria | ThankYouPage | P0 | `/obrigado/` | (fora) | noindex, follow. Evento de conversão. Fora do sitemap. |
| `/privacidade/` | legal | LegalPage | P0 | `/privacidade/` | core | NOVA. Texto jurídico: TODO_CONTENT_VALIDATION. |
| `/cookies/` | legal | LegalPage | P0 | `/cookies/` | core | NOVA. Consent Mode / banner: TODO_CONTENT_VALIDATION. |
| `/404 (not-found)` | erro | NotFoundPage | P0 | `/404 (not-found)` | (fora) | Humanizada: busca, links úteis, WhatsApp. noindex. Status 404. |
| `/lp/{slug}/` | landing_ads | LandingPage | P2 | `/lp/{slug}/` | (fora) | Reservado para experimentos de Ads. noindex, nofollow, fora do sitemap, sem canibalizar. |
| `/robots.txt, /sitemap.xml` | tecnico | route handlers | P0 | `/robots.txt, /sitemap.xml` | - | Sitemap index com um arquivo por grupo. |

Convenções de implementação:
- Posts: `app/[slug]/page.tsx` com `generateStaticParams` a partir do conteúdo migrado; slug original, `datePublished` e `dateModified` preservados (data só muda com revisão substantiva).
- Metadados: `<title>` único e H1 único em todas as páginas; meta description em todas (hoje só 42 de 427 têm). Para posts que ranqueiam, **não mudar título/slug**; só acrescentar meta description e blocos de CTA/links.
- Sitemap: um arquivo por grupo (`core`, `especialidades`, `exames`, `condicoes`, `corpo-clinico`, `blog`), com `lastmod` real. Fora do sitemap: `/obrigado/`, paginação do blog, `/lp/*`, 404.
- Schema: `MedicalClinic` (Home/Contato), `Physician` (médicos), `MedicalProcedure`/`MedicalCondition`/`MedicalTest` conforme template, `FAQPage` só onde houver FAQ visível, `BlogPosting` nos posts, `BreadcrumbList` completo.

---

## 4. Navegação

### 4.1 Header (desktop)
Logo · **Especialidades** (mega) · **Cirurgias e Tratamentos** (mega) · **Exames** (mega) · **Corpo Clínico** · **Conteúdos** (dropdown) · **A CEMO** (dropdown) · botão **Agendar pelo WhatsApp** (primário) · telefone (secundário). O link externo "Exame online" (`cemo.sivoe.med.br`) fica no topo utilitário e no rodapé, não no menu principal (TODO_CONTENT_VALIDATION: continuidade do serviço).

Mega menu **Especialidades** (ordem = prioridade comercial; cada item aponta para a URL canônica, "Ver todas" → `/especialidades/`):
1. Catarata → `/especialidades/catarata/` 2. Cirurgia Refrativa → `/especialidades/refrativa/` 3. Retina → `/especialidades/retina/` 4. Glaucoma → `/especialidades/glaucoma/` 5. Córnea e Ceratocone → `/especialidades/cornea/` 6. Oftalmopediatria → `/especialidades/oftalmopediatria/` 7. Estrabismo → `/especialidades/estrabismo/` 8. Plástica Ocular → `/especialidades/plastica-ocular/` 9. Lentes de Contato → `/especialidades/lentes-de-contato/`. Destaque lateral: **Consulta Oftalmológica** → `/consulta-oftalmologica/`.

Mega menu **Cirurgias e Tratamentos** ("Ver todos" → `/tratamentos/`): 1. Cirurgia de Catarata → `/especialidades/catarata/` 2. Cirurgia Refrativa → `/especialidades/refrativa/` 3. Tratamento do Glaucoma → `/especialidades/glaucoma/` 4. Crosslinking Corneano → `/tratamentos/crosslinking-corneano/` 5. Anel Intraestromal → `/tratamentos/anel-intraestromal/` 6. Transplante de Córnea → `/tratamentos/transplante-de-cornea/` 7. Cirurgia de Pterígio → `/tratamentos/pterigio/` 8. Cirurgia de Calázio → `/tratamentos/calazio/` 9. Plástica Ocular → `/especialidades/plastica-ocular/` 10. YAG Laser → `/tratamentos/yag-laser/` 11. Fotocoagulação a Laser → `/tratamentos/fotocoagulacao-a-laser/` (7, 8, 10 e 11: ajustes de 23/10/2026; o hub separa cirurgias de procedimentos a laser). Itens 4-6 só aparecem quando a página estiver publicada (flag `published` na entidade; TODO_CONTENT_VALIDATION).

Mega menu **Exames** (ordem: Mapeamento de Retina, Campo Visual, Retinografia, Ceratoscopia (Topografia de Córnea), Microscopia Especular, Curva Tensional Diária, Tonometria, Paquimetria, Gonioscopia, Biometria, Estereofoto de Papila; "Ver todos" → `/exames/`). Cada link usa o `canonicalPath` do exame (seis são slugs de artigo).

Dropdown **Conteúdos**: Condições Oculares → `/condicoes-oculares/` · Blog → `/blog/` · destaques fixos: Ceratocone, Miopia, Hipermetropia, Astigmatismo, Presbiopia (URL do artigo), Degeneração Macular.
Dropdown **A CEMO**: Sobre → `/sobre/` · Estrutura e Tecnologia → `/estrutura-e-tecnologia/` · Convênios → `/convenios/` · Contato / Como chegar → `/contato/`.

### 4.2 Mobile
- Drawer em acordeão com os mesmos 6 grupos; "Ver todas/todos" em cada grupo; busca opcional; botão WhatsApp fixo no topo do drawer.
- **Sticky mobile CTA** (barra inferior, sempre visível, ~56 px): `[ WhatsApp ]  [ Ligar ]` (+ ícone de rota no Contato). Cada clique dispara evento GA4/Ads com a página de origem e o `canonicalPath` da entidade. Não cobrir o banner de cookies nem o conteúdo (padding-bottom no layout).
- Mapa interativo carregado sob demanda (placeholder estático); nada pesado acima da dobra.

### 4.3 Rodapé
Colunas: (1) CEMO: Sobre, Estrutura e Tecnologia, Corpo Clínico, Convênios, Contato; (2) Especialidades (as 9, mesmas URLs); (3) Exames (principais, + "Todos os exames"); (4) Condições e Conteúdos (principais condições, Blog); (5) NAP completo (nome, endereço, telefone, WhatsApp, e-mail, horários), links para Instagram/Facebook, responsável técnico (TODO_CONTENT_VALIDATION: grafia "CRM/SP 98339" x "98.339" e RQE), privacidade, cookies, "Desenvolvido por P12 Digital".

### 4.4 Uma URL, vários lugares (exemplos)
| URL canônica | Aparece em |
|---|---|
| /especialidades/catarata/ | Header Especialidades (#1) · Header Cirurgias e Tratamentos (#1, rótulo "Cirurgia de Catarata") · Home (bloco de serviços) · rodapé · sticky nas páginas de exame relacionadas (biometria) |
| /especialidades/refrativa/ | Header Especialidades (#2, "Cirurgia Refrativa") · Cirurgias e Tratamentos (#2) · Home · rodapé · bloco "Condições" (miopia, astigmatismo, hipermetropia) |
| /especialidades/glaucoma/ | Especialidades (#4) · Cirurgias e Tratamentos (#3, "Tratamento do Glaucoma") · exames de glaucoma (campo visual, tonometria, gonioscopia, CTD) |
| /especialidades/plastica-ocular/ | Especialidades (#8) · Cirurgias e Tratamentos (#7) |
| /especialidades/cornea/ | Especialidades (#5, "Córnea e Ceratocone") · Condições (Ceratocone) · exames (ceratoscopia, microscopia, paquimetria) |
| /exame-de-campo-visual-.../ (exame) | Exames (#2) · Glaucoma · Retina · Condições |
| /consulta-oftalmologica/ | Destaque do mega menu Especialidades · Home · CTA de rodapé · /contato/ |
| /corpo-clinico/{slug}/ | Hub Corpo Clínico · Home (Dr. David no hero) · páginas de especialidade/tratamento (médicos relacionados) · exames |

---

## 5. Breadcrumbs

Visíveis em todas as páginas exceto a Home, com `BreadcrumbList` JSON-LD completo (a Home hoje tem item único). A trilha é **semântica, não derivada da URL**:

- Especialidade: Home > Especialidades > {nome}. Catarata/Refrativa: Home > Especialidades > Catarata (mesma trilha mesmo vindo do menu "Cirurgias e Tratamentos").
- Tratamento: Home > Especialidades > {especialidade-mãe} > {tratamento} (ex.: Home > Especialidades > Córnea > Crosslinking Corneano).
- Exame: Home > Exames > {nome} (inclusive para exames em slug de artigo).
- Condição: Home > Condições Oculares > {nome} (presbiopia/uveíte/olho seco idem, apesar do slug de artigo).
- Médico: Home > Corpo Clínico > {nome}.
- Post: Home > Conteúdos (Blog) > {título}; quando o post é entidade (exame/condição), segue a trilha da entidade.
- Institucional: Home > {página}. Utilitárias (obrigado/404) sem breadcrumb.

---

## 6. Regras de linkagem interna (grafo)

Direção principal: tráfego de blog e exames (88% das impressões) deve escoar para páginas comerciais. Regras:

1. **condição → tratamento/especialidade**: miopia/astigmatismo/hipermetropia → Refrativa; ceratocone → Crosslinking, Anel, Transplante (os que estiverem publicados) e Córnea; degeneração macular/descolamento → Retina; baixa visão → Corpo Clínico/Retina.
2. **tratamento/especialidade → médico**: cada página comercial exibe 1-3 médicos relacionados com link para `/corpo-clinico/{slug}/` (Dr. David em Catarata, Refrativa, Ceratocone, Retina clínica; demais conforme especialidade informada no site atual: TODO_CONTENT_VALIDATION para confirmar).
3. **médico → entidades**: o perfil lista especialidades, tratamentos e exames com link recíproco.
4. **exame → condição/especialidade**: cada exame linka as condições que ajuda a diagnosticar (campo visual/tonometria/gonioscopia/CTD → Glaucoma; mapeamento/retinografia → Retina; biometria → Catarata; ceratoscopia/paquimetria/microscopia → Córnea/Ceratocone/Refrativa) e 2-3 exames complementares.
5. **artigo → serviço**: todo post tem, no máximo, 1 link contextual forte para a entidade comercial relacionada (coluna `notes` do migration map) + bloco CTA "Agendar" ao final. Posts de tração (≥5 cliques) não são reescritos; recebem apenas CTA, meta description e links.
6. **serviço → artigo**: cada página comercial lista 3-5 artigos de apoio (os que sobraram da consolidação), com âncora descritiva.
7. **Home → distribuidora**: links para Catarata, Refrativa, Retina, Glaucoma, Córnea, Exames, Corpo Clínico e Contato; não lista todos os serviços.
8. **Intenção local**: posts locais ("como escolher oftalmologista em Taboão", "benefícios de consultar um oftalmo", "importância da clínica de olhos") linkam para a **Home** com âncora local, nunca para outra página que pretenda ranquear localmente.
9. Âncoras: descritivas, uma entidade = poucas variações; nada de âncora exata repetida em lista de keywords.
10. Sem links entre dois URLs concorrentes de mesma intenção; um redirect 301 resolve o que consolidou.
11. Média de 3-8 links contextuais por página; evitar rodapé/menu como único sinal.

---

## 7. Exames: decisão de URL primária

Critério: o artigo vira primário quando tem **≥5 cliques ou ≥1.000 impressões em posição ≤10 no período** e a página `/exames/x/` tem <250 impressões; caso contrário, a URL limpa `/exames/x/` é primária e o artigo é consolidado. Em todos os casos o template de exame é o mesmo (o que é, para que serve, quando é solicitado, como é feito, preparo, duração, orientação posterior; depois especialidades, condições, médicos e exames complementares; CTA "Agendar exame").

| Exame | URL primária | O que acontece com a outra URL | Dados / justificativa |
|---|---|---|---|
| Campo visual | /exame-de-campo-visual-o-que-e-para-que-serve-e-como-e-feito/ (UPDATE → template exame) | /exames/campo-visual/ → 301 para a primária. Post /exame-de-campo-visual-doencas-diagnosticadas-e-tratamentos/ (1.264 impr., 5 cliques) KEEP informativo, linka a primária. | Artigo: 117 cliques, 18.762 impr., pos. 5,83; "campo visual" pos. 2,5 (2.963 impr.). Página /exames/: 16 impr., pos. 9,4. |
| Ceratoscopia | /ceratoscopia-para-que-serve-o-exame/ (UPDATE) | /exames/ceratoscopia/ → 301. | Artigo: 86 cliques, 9.552 impr., pos. 5,56. Página: 36 impr., pos. 22. Incluir "topografia de córnea" (estudo 720). |
| Microscopia especular | /o-que-e-exame-de-microscopia/ (UPDATE) | /exames/microscopia/ → 301. /casos-indicados-para-microscopia/ (9 cliques, 1.395 impr.) KEEP informativo. | Artigo: 62 cliques, 21.249 impr., pos. 6,16. Página: 225 impr., 0 cliques. |
| Curva tensional diária (CTD) | /exame-de-ctd-curva-tensional-diaria-tudo-sobre/ (UPDATE) | /exames/ctd/ → 301. /ctd-curva-tensional-diaria-principais-duvidas/ → CONSOLIDATE 301 (FAQ migra para a primária). | Artigo: 42 cliques, 8.646 impr., pos. 6,6. Página: 602 impr., 0 cliques, pos. 11,3. Post de dúvidas: 478 impr., 2 cliques. |
| Retinografia | /o-que-voce-precisa-saber-sobre-retinografia/ (UPDATE) | /exames/retinografia/ → 301. /retinografia-e-gonioscopia-no-diagnostico-de-doencas-oculares/ (7.362 impr.) KEEP informativo, linka retinografia e gonioscopia. | Artigo: 24 cliques, 30.597 impr., pos. 7,0, CTR 0,08% (otimizar snippet). Página: 21 impr., pos. 18,7. |
| Estereofoto de papila | /tudo-o-que-voce-precisa-saber-sobre-estereofoto-de-papila/ (UPDATE) | /exames/estereofoto/ → 301. | Post: 7 cliques, 1.124 impr., pos. 8,6. Página: 117 impr., pos. 31,9. |
| Mapeamento de retina | /exames/mapeamento/ (UPDATE; absorve conteúdo) | /o-que-voce-precisa-saber-sobre-exame-de-mapeamento-de-retina/ e /mapeamento-retina-importancia/ (62 palavras) → CONSOLIDATE 301. | Três URLs fracas (pos. 7 / 13 / 68; ≤147 impr.). Consulta "mapeamento de retina" pos. 37. URL limpa é a melhor aposta de P1. |
| Tonometria | /exames/tonometria/ (UPDATE) | Sem outra URL. | 80 impr., pos. 13,8; sem artigo. |
| Paquimetria | /exames/paquimetria/ (UPDATE) | /tudo-o-que-voce-precisa-saber-sobre-o-exame-de-paquimetria/ → CONSOLIDATE 301. | Post: 986 impr., pos. 18,4, 1 clique (539 palavras); página: 20 impr. Ambos fracos: URL limpa. Post "paquimetria e microscopia" (título errado) KEEP/UPDATE de título. |
| Gonioscopia | /exames/gonioscopia/ (UPDATE) | /tudo-o-que-voce-precisa-saber-sobre-gonioscopia/ → CONSOLIDATE 301. | Página: 5 cliques, 330 impr., pos. 11,1. Post: 909 impr., pos. 15,7, 1 clique. |
| Biometria | /exames/biometria/ (UPDATE) | /tudo-o-que-voce-precisa-saber-sobre-exame-de-biometria/ → CONSOLIDATE 301. | Página: 379 impr., pos. 10,2. Post: 884 impr., pos. 18,2, 1 clique. |
| Adaptação de lentes | /especialidades/lentes-de-contato/ (nova, SERVIÇO) | /exames/lentes/ → 301. | Briefing: lentes de contato é serviço, não exame. Página: 97 impr., 1 clique, pos. 14,4. |
| Ultrassonografia ocular | Post atual KEEP (informativo) | n/a | Não consta em /exames/. Se a CEMO realiza o exame, o post vira primária (TODO_CONTENT_VALIDATION). |

Revisão posterior (opcional, 6 meses): se as páginas migradas ficarem estáveis, avaliar mover os seis exames em slug de artigo para `/exames/{slug}/` com 301 (um passo, sem cadeia). Não fazer na migração.

---

## 8. Decisões de canibalização

| Tema | URL primária | Concorrentes e destino | Observações |
|---|---|---|---|
| Catarata / Cirurgia de catarata | /especialidades/catarata/ (preservada) | CONSOLIDATE 301: /catarata-buscando-tratamento/, /como-funciona-o-tratamento-da-catarata-no-cemo/, /tratamentos-avancados-para-catarata-taboao-da-serra/. Permanecem informativos: lentes premium (2.023 impr.), diabetes e catarata, melhor técnica, benefícios da microcirurgia, causas, tem cura, quando operar, congênita, evolução, tipos, capsulotomia YAG. /cirurgia-de-catarata-taboao-da-serra/ (404 hoje) → 301 para a primária. | Nunca "Catarata" + "Cirurgia de Catarata". Resto linka a primária. |
| Refrativa / Cirurgia refrativa | /especialidades/refrativa/ (preservada) | CONSOLIDATE 301: /cirurgia-refrativa-o-que-e-e-quais-sao-os-casos-indicados/, /cirurgia-refrativa-quando-procurar-por-esse-procedimento/, /refrativa-tudo-sobre/; /precos-de-cirurgias-astigmatismo-2/ → /precos-de-cirurgias-astigmatismo/. Permanecem: quem pode fazer, pós-operatório (2), astigmatismo pós-cirúrgico, preços (ponte). | Termo "cirurgia refrativa": 948 impr., pos. 38. |
| Glaucoma (9 URLs) | /especialidades/glaucoma/ | CONSOLIDATE 301 para a primária: /tudo-sobre-glaucoma/, /entendendo-o-glaucoma-causas-sintomas-e-tratamentos/, /glaucoma-como-e-feito-o-tratamento/. /glaucoma-saiba-como-a-doenca-pode-causar-cegueira/ → /o-glaucoma-pode-causar-cegueira-em-quanto-tempo/. Permanecem: sintomas, quando operar, tipos, causas, cirurgia, tempo até cegueira. | Sem "Tratamento de Glaucoma" separado. |
| Crosslinking (8 URLs) | /tratamentos/crosslinking-corneano/ (nova; gated) | CONSOLIDATE 301: /crosslinking-cirurgia-de-ceratocone/, /crosslinking-corneano-o-tratamento-mais-eficaz-.../, /crosslinking-corneano-tratamento-ceratocone/, /crosslinking-de-cornea/, /crosslink-corneano-no-cemo/. Permanecem: pós-operatório (27 cliques), como é feita (11), FAQ (1.769 impr.). | Se a CEMO não confirmar o procedimento, o destino das 5 vira TODO_CONTENT_VALIDATION: /especialidades/cornea/. |
| Ceratocone | /condicoes-oculares/ceratocone/ (nova) | CONSOLIDATE 301: /causas-e-tratamentos-da-ceratocone/, /sintomas-e-tratamento-para-ceratocone/, /o-que-e-ceratocone/, /opcoes-de-tratamento-para-o-ceratocone/. Permanecem: causa cegueira (4.925 impr.), em crianças (19 cliques), transplante e ceratocone. | Maior demanda do estudo (9.900). |
| Transplante de córnea | /tratamentos/transplante-de-cornea/ (gated) | CONSOLIDATE 301: /tudo-sobre-transplante-de-cornea/. Permanece: /transplante-de-cornea-ceratocone/. | TODO_CONTENT_VALIDATION. |
| Plástica ocular (8 URLs) | /especialidades/plastica-ocular/ | CONSOLIDATE 301: /plastica-ocular-cirurgia/, /plastica-ocular-no-cemo/, /plastica-ocular-entenda-como-funciona/, /pra-quem-e-recomendado-a-cirurgia-de-plastica-ocular/. Permanecem: tudo sobre (330 impr.), procedimentos em Taboão (pos. 3,98; título corrigido), pós-operatório, avanços. | Sub-páginas só se confirmadas. |
| Mapeamento de retina (3) | /exames/mapeamento/ | Ver seção 7. |  |
| Home x posts locais | / | Posts locais KEEP informativos, linkando a Home. /consulta-oftalmologica/ não usa "Taboão da Serra" no H1 e mira "consulta/exame de vista" sem cidade. | Monitorar posição de "oftalmologista taboão da serra" (1,44) no GSC semanalmente nos 30 dias após o corte. |
| Presbiopia | /presbiopia-entenda-a-vista-cansada-e-suas-opcoes-de-correcao/ (vira a entidade) | CONSOLIDATE 301: /presbiopia-entendendo-vista-cansada/. | Não criar /condicoes-oculares/presbiopia/. |
| Condições evergreen | /condicoes-oculares/{{miopia,astigmatismo,conjuntivite,degeneracao-macular}}/ | CONSOLIDATE 301: /tudo-sobre-miopia/, /tudo-sobre-astigmatismo/, /tudo-sobre-conjuntivite/, /degeneracao-macular-relacionada-a-idade-dmri-como-prevenir-e-tratar/. Posts Q&A (hipermetropia 47 cliques, conjuntivite 72, astigmatismo cegueira 42, DM causas 19) permanecem. | Evergreen x artigo: intenções distintas, linkadas entre si. |
| Duplicatas editoriais | posts mais fortes | /impacto-telas-saude-ocular/ → /impacto-das-telas-saude-ocular/; /saude-ocular-dicas-do-cemo/ → /cuidados-com-a-saude-ocular-dicas-do-cemo/. Pares poluição (2 URLs, ambas com cliques) mantidos; revisar em 90 dias. |  |
| /contato/ x /contato-2/ | /contato/ | /contato-2/ → 301. | Conteúdo idêntico. |

---

## 9. Redirecionamentos: resumo

Fonte única de verdade: `docs/seo-migration-map.csv` (526 linhas = 427 URLs do sitemap + 2 URLs 404 testadas + 97 URLs só do GSC). Implementar em build: script lê o CSV e gera `redirects.json` (301) e `gone.json` (410); middleware do Next.js aplica; testes automatizados validam (a) todos os `new_url` respondem 200, (b) nenhum `new_url` é origem de outro redirect (sem cadeias), (c) nenhuma regra redireciona em massa para a Home.

Contagem por ação (total das 526 linhas):
| Ação | Sitemap (427) | Fora do sitemap (2 URLs 404 testadas + 97 só no GSC) | Total |
|---|---|---|---|
| KEEP | 108 | 0 | 108 |
| UPDATE | 31 | 0 | 31 |
| CONSOLIDATE | 38 | 0 | 38 |
| REDIRECT | 44 | 95 | 139 |
| REMOVE | 206 | 4 | 210 |
| Total | 427 | 99 | 526 |

Por tipo de página:
| page_type | KEEP | UPDATE | CONSOLIDATE | REDIRECT | REMOVE | Total |
|---|---|---|---|---|---|---|
| autor | 0 | 0 | 0 | 1 | 0 | 1 |
| blog_index | 0 | 1 | 0 | 0 | 0 | 1 |
| condicao | 0 | 3 | 0 | 0 | 0 | 3 |
| corpo_clinico_hub | 0 | 1 | 0 | 0 | 0 | 1 |
| especialidade | 0 | 6 | 0 | 0 | 0 | 6 |
| exame | 0 | 11 | 0 | 7 | 0 | 18 |
| home | 0 | 1 | 0 | 0 | 0 | 1 |
| hub_especialidades | 0 | 1 | 0 | 0 | 0 | 1 |
| hub_exames | 0 | 1 | 0 | 0 | 0 | 1 |
| institucional | 0 | 3 | 0 | 1 | 0 | 4 |
| post_blog | 108 | 2 | 38 | 0 | 0 | 148 |
| taxonomia_categoria | 0 | 0 | 0 | 26 | 0 | 26 |
| taxonomia_tag | 0 | 0 | 0 | 9 | 205 | 214 |
| url_404_preventiva | 0 | 0 | 0 | 2 | 0 | 2 |
| url_malformada | 0 | 0 | 0 | 93 | 4 | 97 |
| utilitaria | 0 | 1 | 0 | 0 | 1 | 2 |

Leitura:
- **KEEP/UPDATE (139):** mesma URL; 301 não é necessário. Posts de tração permanecem intocados no texto.
- **CONSOLIDATE (38):** 301 server-side direto para o destino final; todos são posts quase-duplicados com 0-2 cliques (ver seção 8). Conteúdo útil é incorporado ao destino antes do corte.
- **REDIRECT (139):** `/contato-2/`, 6 `/exames/{x}/` fracos, `/exames/lentes/`, autor, 26 categorias (para a entidade equivalente, nunca para a Home), 9 tags com equivalência clara, 2 URLs 404 preventivas, e variantes malformadas do GSC (barra final, caixa, `www`, host no path, slug truncado/antigo) apontadas para o post correto.
- **REMOVE (210):** 205 tags + `/post-list/` = 206 URLs com **410 Gone**; 4 URLs GSC-only sem correspondente confiável -> 404 natural.

Regras globais (edge/middleware, antes do mapa): `http→https`; `www→apex`; barra final obrigatória (308/301); caixa baixa; remoção de hífen final; `/index.html`. Redirecionamentos individuais usam 301. 410 apenas para tags e `/post-list/`.
O único destino "Home" são as 4 tags locais, `/oftalmologia-cemo` e `/oftalmologista` (intenção de marca/local idêntica à Home), conforme regra do briefing.

---

## 10. Blog, categorias, tags, autor

- **Posts:** todos permanecem em `/{slug}/` com URL, slug, título, conteúdo, imagens, autor, data de publicação e links internos preservados. Dos 157: 108 KEEP, 11 UPDATE (viram página primária de exame/condição, ajuste de título, ou título de plástica), 38 CONSOLIDATE.
- **Autor:** "CEMO Oftalmologia" como `Organization` no JSON-LD; sem página de autor. `/author/cemox/` → 301 `/blog/`. Fase seguinte: campo "revisado por" (médico + CRM + RQE + data de revisão) em páginas estratégicas, conforme CFM 2.336/2023 e proposta (TODO_CONTENT_VALIDATION).
- **Categorias (26):** viram entidades (especialidade, condição, exame) e deixam de ser rotas. 301 1:1 para a página da entidade equivalente (tabela no migration map). As genéricas (cegueira, dicas, dicas/dicas) → `/blog/`; tecnologia → `/estrutura-e-tecnologia/`; cirurgias → `/tratamentos/`. Motivo: 0 cliques, até 33 impr. (pos. 95), ~60 palavras e conflito direto com as páginas comerciais de mesma intenção. Navegação por tema no `/blog/` via filtro por query (`?tema=`; `noindex`, canonical `/blog/`), alimentada pelo campo `tema` migrado das categorias.
- **Tags (214):** 410 Gone, **não noindex**: o novo site não gera páginas de tag, então manter 214 URLs só para dar `noindex` seria custo sem benefício; 205 viram 410 e 9 exceções vão por 301 (4 locais → Home, DMRI → condição, EPIs → post de proteção ocular, 3 de retinoplastia → `/retinoplastia-oque-e/`). Justificativa: 214 arquivos de ~60 palavras sem H1/description; só 14 têm alguma impressão (máx. 48) e 0 cliques. Tags continuam como metadado interno para "relacionados". Conferir backlinks antes (seção de pendências).
- **Paginação do blog:** `/blog/pagina/{n}/` com canonical autorreferente, fora do sitemap. O `/blog/` atual (6.350 palavras numa página) e `/post-list/` (6.378, título "1Post List") deixam de existir como listas gigantes: `/blog/` vira índice paginado; `/post-list/` → 410.
- **Conteúdo novo de blog** está fora do escopo da proposta; a regra para posts futuros: slug na raiz, sem categorias como URL, 1 entidade comercial vinculada.

---

## 11. Decisões que precisam de validação da CEMO

Nada abaixo deve ser publicado como fato até ser confirmado. Itens estão marcados `TODO_CONTENT_VALIDATION` nas colunas dos CSVs.

1. **Serviços realmente oferecidos:** Crosslinking corneano, Anel intraestromal, Transplante de córnea (realizado ou só encaminhado?), Ceratocone (adaptação de lentes rígidas/especiais), uveítes, tumores. As três primeiras páginas ficam gated (`published=false`) até confirmação.
2. **Refrativa:** quais técnicas são realizadas (LASIK, PRK, outras; cirurgia da presbiopia?); critérios de indicação/contraindicação aprovados pelo médico.
3. **Plástica ocular:** lista de procedimentos (blefaroplastia, ptose, vias lacrimais, órbita, pterígio, botox/preenchimento estão em post genérico, sem prova de oferta). Nenhuma sub-página sem confirmação.
4. **Retinoplastia:** terminologia médica correta, se é serviço comercial e como tratar o termo; preservar `/retinoplastia-oque-e/` até lá.
5. **Exames realizados:** confirmar a lista de 11 + ultrassonografia ocular, tomografia de córnea/OCT; preparo, duração e orientações de cada um; aparelhos.
6. **Médicos:** RQE de todos (nenhum no site), CRM e grafias oficiais, se os 8 seguem ativos, foto do Dr. Rodrigo Arantes (arquivo de WhatsApp), áreas por médico, autorização de uso de nome/imagem, formação completa, quem revisa cada tema.
7. **Números:** 20+ x 15+ anos de atividade (Home x timeline de /sobre/), ano de fundação, 100 mil atendimentos, "8 médicos", nota Google 4,9/2.000+ avaliações (proposta; site não tem), link do Google Business.
8. **Convênios:** lista atual (17 logos de 2020-2022; 1 não identificado; Dr. Consulta é convênio ou cartão de desconto?), texto de cobertura ("convênio cobre sem nenhum custo" exige revisão CFM).
9. **Promessas e tempos:** "preços acessíveis e parcelas que cabem no seu bolso", cirurgia de catarata ~20 min, refrativa ~1 h, glaucoma ~4 semanas, retina 45-60 dias; política de preço (publicar ou não; "gratuito" nas buscas).
10. **Urgência/pronto atendimento:** a CEMO atende? Horário de funcionamento é 08-18h (seg-qui), 08-17h (sex), 08-12h (sáb).
11. **Contato e NAP:** telefone fixo, WhatsApp, e-mail `sac@`, horário em feriados/domingo, endereço (bairro Centro x Jardim Bom Tempo), CNPJ/razão social, Responsável técnico.
12. **Rastreamento:** continuidade de GTM-PH3D5ZS, UA (descontinuado), AW-16676786938, Pixel Meta 423546515361032, "Exame online" (`cemo.sivoe.med.br`).
13. **Pode descontinuar** o autor `/author/cemox/`, as 214 tags e 38 posts consolidados? (impacto estimado: 0-2 cliques cada).
14. **Posts de 2020-2022** (100 dos 157): manter, atualizar ou consolidar; revisão médica dos que viram páginas primárias.
15. **Jurídico:** textos de privacidade/cookies (LGPD), Consent Mode.

### Pendências de dados antes do corte
- Reexport do GSC com consulta × página (12-16 meses) para validar as atribuições `[inferido]`, em especial: qual URL ranqueia "oftalmologista taboão da serra" (candidata: Home), "campo visual" (pos. 2,5) e "ceratocone" (pos. 5,6).
- Backlinks por URL (GSC Links / ferramenta) para todas as URLs marcadas REMOVE ou CONSOLIDATE.
- Snapshot de posições das 50 principais consultas na semana anterior ao corte; monitorar por 8 semanas.

---

## 12. Ajustes da fase 2 (2026-10-22)

- **Nova rota** `/exames/tomografia-de-coerencia-optica/` (OCT): exame citado pelo Dr. David no vídeo "Exames que realizamos"; entra no mega menu de Exames e no sitemap. Tipos de OCT a confirmar (TODO).
- **Tratamentos não confirmados** (crosslinking, anel, transplante): páginas prontas com `published: false` (fora de menu, sitemap, relacionados e JSON-LD). Os 7 redirects que apontavam para elas foram para `/especialidades/cornea/`, como a §8 previa.
- **Perfis médicos publicados** (8): `/corpo-clinico/{slug}/`. Dra. Danielle Longo (vídeos de plástica ocular) fica sem perfil até a validação.
- **Blog**: 113 posts em `/{slug}/`, índice `/blog/` + `/blog/pagina/{n}/` (canonical própria, fora do sitemap). Filtro por tema (`?tema=`) não implementado no MVP.
- **Sitemap**: arquivo único gerado do conteúdo (ver `docs/seo-checklist.md`).
