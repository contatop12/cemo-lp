# Decisões de execução — Fase 2 (2026-10-22)

Registro das decisões tomadas na execução de `2026-10-22-cemo-fase-2-ecossistema.md`. Cada linha: o que foi
decidido — por quê — custo se estiver errado.

## Decisões

- Setup: Ruling: trabalho no branch `feat/fase-2` a partir de `main` (10d0df7) — main é o que está em staging — custo se errado: nenhum.
- Setup: Ruling: briefing reenviado pelo cliente tratado como spec; sem rodada de perguntas (o próprio briefing pede para só perguntar o que bloqueia, §156) — custo se errado: retrabalho pontual de copy/escopo.
- F1 logo: Ruling: "CEMO" não é Arial Rounded (sobreposição mostrou M e C diferentes; provavelmente VAG Rounded, indisponível) → letras por traço suavizado, não por contorno de fonte — custo se errado: nenhum; arquivo vetorial original da marca segue como TODO_CONTENT_VALIDATION (pedir .ai/.pdf ao cliente).
- F1 logo: Ruling: mira (linhas) e ponto central reconstruídos como geometria exata medida do PNG; arcos curtos, pálpebras, íris e textos por potrace sobre a cobertura ampliada 4× e suavizada; fill-rule evenodd — IoU de silhueta 0,97+ (teste), 37 KB — custo se errado: nenhum.
- F1 logo: Ruling: criada versão horizontal (olho à esquerda do texto) para header/rodapé — no vertical a 56 px de altura o subtítulo fica com ~4 px — custo se errado: o cliente pode preferir só o vertical (uma prop).
- F1 vídeos: Ruling: selecionados 9 vídeos editados; fora "Depoimento Eduarda" (depoimento de paciente sem autorização documentada, briefing §137), "Botox" (estético; briefing §95 evita cara de clínica estética) e clipes brutos IMG_* — custo se errado: incluir depois é só uma entrada no fixture.
- F1 vídeos: Ruling: vídeo "Dr. Adriano - Catarata" atribuído ao Dr. Adriano de Morais Ferreira (único Adriano no corpo clínico atual) com TODO_CONTENT_VALIDATION — custo se errado: troca de nome no fixture.
- F1 vídeos: Ruling: Dra. Danielle Longo (vídeos de plástica ocular) não está no site atual e não tem CRM conhecido → perfil `published:false`; os vídeos usam o nome que ela diz no vídeo — custo se errado: nenhum (perfil só publica após validação).
- F1 fotos: Ruling: recorte de fundo dos retratos com rembg/BiRefNet (modelo local) — remove só o fundo de estúdio; pixels da pessoa intactos (briefing §41 permite crop e tratamento, proíbe alterar rosto/corpo); revisa a decisão §1.3 do design system — custo se errado: voltar às fotos com fundo.
- F1 vídeos: Ruling: transcrição com Whisper medium + prompt de vocabulário (nomes, termos); legendas revisadas à mão; trechos incompreensíveis ficam "[inaudível]" em vez de adivinhados (2 trechos no vídeo do Dr. Adriano) — custo se errado: a CEMO completa os trechos.
- F1 vídeos: Ruling: vídeos da Dra. Danielle têm legenda aberta (queimada) → sem <track>; transcrição completa no HTML mesmo assim — custo se errado: gerar .vtt depois.
- F1 vídeos: Ruling: MOV "Óculos" tem rotação -90° no metadado → tratado como vertical; todos os vídeos saem 540×960, CRF 27, sem metadados (GPS do iPhone) — 25 MB no total em public/videos — custo se errado: mover para R2 se o repositório pesar.
- F2: Ruling: TrustBar removida; os 4 números viraram a faixa de base do hero (evita repetir a prova duas vezes na primeira dobra) — custo se errado: nenhum.
- F2: Ruling: menu completo só a partir de 1280 px (xl); entre 1024 e 1279 px usa a gaveta — com o logo horizontal os seis grupos não cabem em uma linha; o CTA do header vira "Agendar" (nome acessível "Agendar consulta") abaixo de 1440 px — custo se errado: nenhum.
- F2: Ruling: no celular o nome do Dr. David sai do cartão sobreposto (cobria o pescoço) e vira texto logo abaixo da foto; o "Centro de Microcirurgia Ocular" do topo do texto só aparece no desktop — custo se errado: nenhum.
- F2: Ruling: sr-only dentro de faixa rolável escapava do contêiner (sem ancestral posicionado) e criava 542 px de rolagem lateral no celular → `relative` no cartão de vídeo e na lista — custo se errado: nenhum.
- F3 conteúdo: Ruling: 39 páginas redigidas por 6 redatores em paralelo com brief comum (_materiais/briefs/redacao.md) e revisadas por amostragem; todas em MEDICAL_REVIEW, fontes externas vazias (nenhuma URL conferida) com TODO — custo se errado: revisão médica pega erros antes da produção (gate do launch:check).
- F3 conteúdo: Ruling: Tomografia de Coerência Óptica ganhou página nova (/exames/tomografia-de-coerencia-optica/) porque o Dr. David cita o exame no vídeo; não estava no site atual — custo se errado: despublicar (flag).
- F3 conteúdo: Ruling: perfis dos 8 médicos publicados (dados já públicos no site atual: nome, CRM, formação, áreas); Dra. Danielle Longo fica `published:false` até a validação — custo se errado: nenhum.
- F9 blog: Ruling: 113 posts migrados (108 KEEP + 2 UPDATE + 3 condições em URL de post); HTML sanitizado com jsdom por lista branca; caixa de autor do Divi removida; links internos reescritos para o destino final (permalinks por data /AAAA/MM/DD/slug/ → /slug/; 410 vira texto; 1 link já quebrado no site atual corrigido); 132 imagens migradas para o MESMO caminho /wp-content/uploads/ (preserva URLs de imagem), recomprimidas (≤1600 px) — custo se errado: rodar o script de novo.
- F9 blog: Ruling: posts ficam em src/content/posts/*.json lidos com fs só no build (SSG, dynamicParams=false) — evita embutir ~1,2 MB de HTML no Worker — custo se errado: rota renderizada em runtime no Worker falharia; teste de build garante que todas são estáticas.
