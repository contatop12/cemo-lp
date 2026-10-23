# Checklist de lançamento — novo site da CEMO

Público: quem coordena a virada do domínio (agência + CEMO). Ordem de execução de cima para baixo. O comando
`npm run launch:check` automatiza os itens marcados com ⚙ e falha enquanto algum estiver pendente.

## 1. Conteúdo e validações da CEMO (bloqueiam a virada)

- [ ] ⚙ **Revisão médica** de todas as páginas de especialidade, exame e condição (hoje 30 em `MEDICAL_REVIEW`):
      o revisor aprova, o editor preenche `review.status = 'APPROVED'`, `medicalReviewerSlug` e `reviewedAt`
      (fluxo em `docs/medical-content-workflow.md`).
- [ ] ⚙ **Números de prova social** confirmados (nota Google, nº de avaliações, anos de atividade, atendimentos) →
      `validated: true` em `src/content/fixtures/stats.ts`.
- [ ] ⚙ **Link do perfil do Google** (avaliações) em `site-settings.ts`.
- [ ] ⚙ **Falas dos vídeos** revisadas pelo compliance (trechos com "eficaz", "rejuvenescida", "ímpares na região";
      dois trechos [inaudível] no vídeo do Dr. Adriano) → limpar `todos` de `videos.ts`.
- [ ] RQE dos médicos (nenhum publicado no site atual) e bios revisadas por cada um.
- [ ] Dra. Danielle Longo: nome completo, CRM, formação e foto → publicar o perfil.
- [ ] Procedimentos a confirmar: crosslinking, anel intraestromal, transplante de córnea (páginas prontas,
      `published: false`), técnicas de refrativa, tipos de lente intraocular, ptose/órbita, adaptação de lentes.
      Ao publicar crosslinking/transplante: devolver os 7 redirects do CSV para `/tratamentos/...`, rodar
      `npm run redirects:generate` e `node scripts/migrate-wp.mjs`.
- [ ] NAP: bairro (Centro × Jardim Bom Tempo), telefone, WhatsApp, e-mail, horários e feriados.
- [ ] Convênios atuais (e se "Dr. Consulta" é convênio ou cartão).
- [ ] Textos de privacidade e cookies revisados pelo jurídico.
- [ ] Foto do Dr. David em alta resolução; arquivo vetorial original do logo (ou aprovação do SVG reconstruído).
- [ ] Autorização de uso de imagem dos médicos e das falas nos vídeos.
- [ ] Lista completa: `npm run todos` (cada pendência tem o prefixo `TODO_CONTENT_VALIDATION`).

## 2. Técnico (bloqueia a virada)

- [ ] ⚙ Build de produção com `SITE_ENV=production` e `NEXT_PUBLIC_SITE_URL=https://oftalmologiacemo.com.br`
      (build **e** runtime: variáveis no painel do Cloudflare e no Workers Builds).
- [ ] ⚙ `npm run redirects:check-targets` sem destinos ausentes (hoje: 0 de 51).
- [ ] `npm run test:e2e` verde — inclui `e2e/migration.spec.ts`: todas as URLs KEEP/UPDATE respondem 200, todas
      REDIRECT/CONSOLIDATE respondem 301 em um salto para destino 200, REMOVE responde 410.
- [ ] Secrets `LEAD_WEBHOOK_URL` e `LEAD_WEBHOOK_SECRET` no Worker de produção; lead de teste chegando ao CRM.
- [ ] GTM de produção (`NEXT_PUBLIC_GTM_ID`), Consent Mode, GA4 e conversão do Google Ads conferidos no Tag Assistant
      (`docs/analytics-plan.md`); nenhum dado de saúde no `dataLayer`.
- [ ] Backlinks conferidos (GSC → Links / Ahrefs) para as URLs que viram 410; se alguma tiver link relevante, trocar
      para 301 no CSV.
- [ ] Crawl completo do staging com o domínio de teste (Screaming Frog): status, title, description, H1, canonical,
      links internos, imagens sem alt.
- [ ] JSON-LD de amostra no Schema Markup Validator (Home, Catarata, um exame, um perfil, um post).
- [ ] Lighthouse/PageSpeed no staging (LCP ≤ 2,5 s no campo é a meta; ver `docs/seo-checklist.md`).

## 3. Virada

1. Snapshot do GSC (posições das 50 principais consultas, cliques por página) na semana anterior.
2. Backup do WordPress (arquivos + banco) e export XML — o site antigo não é apagado.
3. Deploy de produção (`npm run deploy` com as variáveis de produção, ou push com Workers Builds configurado).
4. Rota do domínio no Worker (`oftalmologiacemo.com.br` e `www.` → apex), HTTPS forçado no Cloudflare.
5. Conferir ao vivo: `/robots.txt` (Allow + Sitemap), ausência de `noindex` (HTML e header), 3 redirects e 1 410 de
   amostra, formulário enviando, WhatsApp abrindo.
6. GSC: verificar a propriedade de domínio, enviar `https://oftalmologiacemo.com.br/sitemap.xml`, inspecionar a Home,
   Catarata e Refrativa.
7. Google Business Profile: conferir o site e o link de agendamento.

## 4. Depois da virada (8 semanas)

- Semanal no GSC: Home ("oftalmologista taboão da serra", hoje posição 1,4), Catarata, Refrativa ("cirurgia
  refrativa", hoje 38), Retina, Glaucoma, exames em slug de artigo (campo visual, retinografia, microscopia,
  ceratoscopia, CTD, estereofoto), corpo clínico e os artigos de maior tráfego.
- Relatório de cobertura: 404 inesperados → 301 no CSV.
- Google Ads: cada grupo apontando para a página da intenção (catarata → `/especialidades/catarata/` etc.), conversão
  primária = lead registrado.
- Depois de 6 meses estáveis: reavaliar mover os exames em slug de artigo para `/exames/{slug}/` (um salto, sem cadeia).
