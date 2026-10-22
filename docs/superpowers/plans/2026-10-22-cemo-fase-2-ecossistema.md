# CEMO — Fase 2: design v2, páginas comerciais, corpo clínico, exames, condições, blog e QA

> Execução inline nesta sessão (preferência do cliente: "direto na seção"). Registro de decisões em
> `2026-10-22-cemo-fase-2-decisoes.md`, no formato `Ruling: o quê — por quê — custo se errado`.

**Goal:** completar o ecossistema descrito no briefing (fases 8 a 15) e elevar o design da Home e de todas as
páginas para uma direção de arte própria, sem perder SEO, acessibilidade ou performance da fase 1.

**Spec:** briefing (`_materiais/dados/briefing-novo-site-cemo.pdf`, reenviado pelo cliente em 22/10) +
`docs/information-architecture.md` (rotas, canonicals, breadcrumbs, linkagem) + `docs/design-system.md` (tokens).

**Arquitetura:** mesma da fase 1 (Next 16 App Router, SSG, ContentRepository + fixtures, OpenNext/Workers).
Conteúdo novo entra como entidades tipadas (especialidade, exame, condição, médico, post) com workflow de revisão
médica; todas as rotas são estáticas (`generateStaticParams`), HTML completo no primeiro byte.

## Global Constraints

- Nada de fato médico, RQE, preço, técnica ou avaliação inventados: o que não está no site atual, nos vídeos ou nos
  materiais vira `TODO_CONTENT_VALIDATION:` e não aparece como fato.
- Conteúdo médico novo nasce com `review.status = 'MEDICAL_REVIEW'` (briefing §76/§82); só `APPROVED`/`PUBLISHED`
  pode ir para produção — o gate é um teste que roda no `launch:check`, não no build de staging.
- CFM: sem promessa, garantia, superlativo, comparação, antes/depois, preço como argumento.
- LGPD: nada de saúde/PII em analytics, URL ou logs (mantém a fase 1).
- URLs: preservar as que têm sinal; um alvo por intenção; 301 em um salto; mapa em `docs/seo-migration-map.csv`.
- Acessibilidade WCAG 2.2 AA; corpo ≥ 18 px; alvos ≥ 48 px; nada dependente de hover; vídeos com legenda.
- Performance: LCP ≤ 2,5 s (campo), CLS ≤ 0,1, nenhum player/mapa antes da interação, JS só onde há interação.
- Nenhuma credencial fora de `.env.cloudflare`; `_materiais/` nunca commitado.

## Design v2 — "Foco"

O site atual (fase 1) ficou correto, mas com cara de kit: cards iguais, eyebrows em caixa-alta, monogramas no lugar de
fotos, avaliações vazias. A v2 parte do mundo da oftalmologia, não de componentes de clínica:

1. **Lente de prova (assinatura, um lugar só: hero).** Dr. David recortado (modelo de segmentação; corpo e rosto
   intocados, só o fundo de estúdio sai) diante de anéis concêntricos finos — os anéis de Plácido da topografia de
   córnea — e de um arco graduado 0°–180° (a escala TABO das armações de prova e das receitas de óculos). Os anéis se
   desenham uma vez no carregamento (único movimento não acionado pelo usuário). A foto não depende de animação (LCP).
2. **Tabela de leitura (Snellen) como índice.** "Como podemos cuidar da sua visão?" vira uma lista tipográfica em
   linhas inteiras clicáveis, com tamanhos que diminuem como numa tabela de acuidade — a ordem de prioridade comercial
   fica visível. O menor tamanho continua ≥ 22 px. Reaproveitada na página 404 ("tabela" com o recado).
3. **Retratos unificados.** As fotos dos médicos (fundos e luzes diferentes, 500×600) são recortadas do fundo e
   recolocadas sobre o mesmo campo névoa com o arco-pálpebra: corpo clínico coeso sem retocar ninguém.
4. **Vídeos verticais como "consultório aberto".** Os vídeos reais (Dr. David, Dr. Adriano, Dra. Danielle) entram como
   cartões 9:16 com pôster, legenda (WebVTT a partir da transcrição revisada) e transcrição em `<details>`; player só
   no clique. Entram nas páginas onde o assunto é o do vídeo.
5. **Quieto no resto.** Sem eyebrows em caixa-alta, sem "A · B · C" como meta, sem cards idênticos onde a informação
   não é uma coleção. Numeração só em jornadas reais (etapas da cirurgia).

Tipografia mantida (Literata nos títulos, Atkinson Hyperlegible Next no corpo — a fonte desenhada para baixa visão é
argumento do próprio produto). Paleta mantida; o ciano do logo (`#27A1CF`) passa a desenhar as linhas finas sobre
fundo escuro.

Ruling sobre §1.3 do design system ("não recortar o médico"): revisado — o risco era alterar o corpo; o recorte por
modelo preserva 100% dos pixels da pessoa e só remove o fundo. Custo se errado: voltar ao painel cinza (uma prop).

## Fases e entregas

Cada fase termina com `npm run typecheck && npm run lint && npm test` verdes e um commit (ou mais).

### F1. Ativos
- Logo SVG reconstruído: símbolo traçado em alta (8×, curvas suavizadas) + "CEMO" e "CENTRO DE MICROCIRURGIA
  OCULAR" a partir dos contornos das fontes reais (Arial Rounded MT Bold confirmada por sobreposição). Teste de
  IoU ≥ 0,97 contra o PNG original; arquivo < 25 KB.
- Recortes (rembg/BiRefNet) do Dr. David e dos 8 médicos → `public/images/medicos/*.webp` (alpha), script
  reprodutível `scripts/cutout-portraits.py` (dev, fora do bundle).
- Vídeos: `scripts/encode-videos.mjs` (ffmpeg) → H.264 540×960 (ou 960×540) CRF 28, faststart, sem áudio extra,
  pôster AVIF/JPEG, `.vtt` a partir da transcrição revisada; fixture `videos.ts` com duração real, data do arquivo.
  Selecionados: Tudo em um lugar só, Especialidades, Exames que realizamos (Dr. David); Catarata (Dr. Adriano);
  Óculos e cirurgia refrativa (Dr. David); Calázio, Blefaroplastia, Entrópio/ectrópio, Vias lacrimais (Dra. Danielle
  Longo). Fora: "Depoimento Eduarda" (depoimento de paciente — exige autorização, briefing §137), Botox (estético; o
  briefing pede evitar cara de clínica estética), clipes brutos IMG_*.
- Fotos do blog migradas para os mesmos caminhos `/wp-content/uploads/...` (preserva URLs de imagem), recomprimidas.

### F2. Design v2 da Home e do layout
Hero "lente de prova", TrustBar, ServicesIndex (tabela de leitura), blocos editoriais Catarata/Refrativa com vídeo,
DoctorSpotlight e DoctorsSection com retratos unificados, Estrutura, Reviews reformulado (nota grande + link + slot
de depoimentos do CMS), Convênios, Localização, Conteúdos, CTA final com o eco dos anéis; header e mega menu com
destaque; remoção de eyebrows caixa-alta e meta com "·". QA visual 1440/1280/820/390/360.

### F3. Modelo de conteúdo e templates
- Tipos: `MedicalReview` (status, author, medicalReviewer, reviewedAt, sources), `FaqItem`, `Specialty` (hero, resposta
  direta, sinais, seções, jornada, técnicas, FAQ, relações), `Exam` (template do briefing §26), `Condition`,
  `Doctor` estendido (bio, formação, relações, vídeos), `Post`.
- Componentes: PageHero, DirectAnswer, SignsList, JourneySteps, FAQAccordion (details/summary + FAQPage só com FAQ
  visível), RelatedServices/Doctors/Exams/Conditions/Articles, LeadPanel (form contextual com interesse
  pré-selecionado), VideoCard, MedicalReviewNote (autor/revisor/data/fontes), SourcesList.
- JSON-LD: MedicalWebPage + MedicalProcedure/MedicalTest/MedicalCondition/Physician/BlogPosting/VideoObject/
  FAQPage/BreadcrumbList, todos ligados por `@id` à clínica.

### F4. Páginas comerciais (P0/P1/P2)
Catarata e Refrativa (P0, landing pages completas), Glaucoma, Retina, Córnea, Oftalmopediatria, Estrabismo, Plástica
Ocular, Lentes de Contato, Consulta Oftalmológica, hubs `/especialidades/` e `/tratamentos/`; Crosslinking, Anel e
Transplante entram como entidades `published:false` (não geram rota nem link) até a CEMO confirmar.

### F5. Exames
Hub `/exames/` + 11 exames no `canonicalPath` decidido (6 em slug de artigo preservado). Template §26.

### F6. Condições
Hub `/condicoes-oculares/` + ceratocone, miopia, hipermetropia, astigmatismo, baixa visão, conjuntivite, degeneração
macular, descolamento de retina; presbiopia/uveíte/olho seco listadas nas URLs de artigo.

### F7. Corpo clínico
Hub com filtro por área (links âncora sem JS + filtro progressivo), 9 perfis (8 do site + Dra. Danielle Longo, CRM
pendente → perfil `published:false` até validar, mas os vídeos entram com o nome dito por ela), página do Dr. David
em nível alto (vídeos, formação, atuação, conteúdos).

### F8. Institucionais
Sobre (A CEMO), Estrutura e Tecnologia, Convênios (busca/filtro + aviso de cobertura), Contato/Como chegar.

### F9. Blog
`scripts/migrate-wp.mjs`: lê o export da API REST (`_materiais/wp-export`), remove shortcodes do Divi, sanitiza
(lista branca de tags), reescreve links internos para o destino final do mapa de migração (sem cadeia), baixa/otimiza
imagens, gera `src/content/posts/*.json` só para KEEP/UPDATE. `/blog/` paginado, `/{slug}/` com BlogPosting, data
original preservada, autor "CEMO" (Organization), CTA e link contextual para a entidade comercial.

### F10. SEO técnico e analytics
Sitemap por grupo (index + core/especialidades/exames/condicoes/corpo-clinico/blog) com `lastmod` real; robots;
`launch:check` (status de revisão, TODOs bloqueantes, noindex); eventos `doctor_view`, `service_cta_click`,
`video_play` (sem dado de saúde).

### F11. QA e entrega
Teste de migração (todas as URLs KEEP/UPDATE → 200; REDIRECT/CONSOLIDATE → 301 para 200 em um salto; REMOVE → 410),
axe em todos os templates, responsivo, Lighthouse, docs (`medical-content-workflow.md`, `launch-checklist.md`,
atualizações), deploy em staging e verificação ao vivo.

## Review Focus

1. Slug na raiz servido por duas entidades (post e exame) — o registro de slugs deve falhar o build.
2. Link interno de post apontando para URL que virou 301 — reescrita para o destino final na migração.
3. Página `published:false` aparecendo em menu, sitemap, relacionados ou JSON-LD.
4. Vídeo sem legenda ou player carregado antes do clique; pôster como LCP em página comercial.
5. HTML migrado com script/iframe/estilo inline do Divi (sanitização).
