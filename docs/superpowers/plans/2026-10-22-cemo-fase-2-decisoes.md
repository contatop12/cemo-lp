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
