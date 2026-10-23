# Workflow de conteúdo médico — CEMO

Público: equipe editorial da agência, médicos revisores da CEMO e quem mantiver o CMS. Base: briefing §75–§83 e
§136–§139, Resolução CFM nº 2.336/2023 (publicidade médica) e Manual de Publicidade Médica do CFM.

## 1. Estados

Todo conteúdo médico (especialidade, tratamento, exame, condição, FAQ, artigo novo ou reescrito) tem um bloco
`review` no modelo (`src/content/types.ts → MedicalReview`):

| Estado | Quem move | Significado | Pode ir para produção? |
|---|---|---|---|
| `DRAFT` | redator | rascunho, incompleto | não |
| `MEDICAL_REVIEW` | redator | texto completo, aguardando o médico revisor | não |
| `APPROVED` | médico revisor | revisado; `medicalReviewerSlug` e `reviewedAt` preenchidos | sim |
| `PUBLISHED` | editor | no ar | sim |

Regras:
- Staging mostra qualquer estado (é onde o médico revisa). Produção só aceita `APPROVED`/`PUBLISHED`: o
  `npm run launch:check` falha se uma página publicada estiver em outro estado.
- Ao aprovar, o revisor confere fatos, linguagem e fontes; o editor preenche `medicalReviewerSlug` (slug do médico em
  `/corpo-clinico/`), `reviewedAt` (AAAA-MM-DD) e mantém `updatedAt` = data da última mudança substantiva.
- A página exibe "Revisado por Dr(a). Nome — CRM — data" só quando há revisor. Antes disso, nada de selo.
- Posts migrados do WordPress mantêm data e texto originais; só entram no fluxo se forem reescritos.

## 2. Quem revisa o quê (proposta — TODO_CONTENT_VALIDATION)

| Tema | Revisor sugerido (área no site atual) |
|---|---|
| Catarata, Refrativa, Ceratocone, Córnea, Retina clínica | Dr. David Ribeiro de Mendonça Filho |
| Catarata | Dr. Rodrigo Arantes, Dra. Priscilla Pires, Dra. Bruna de Andrade Nascimento |
| Glaucoma (e exames de glaucoma) | Dra. Roberta Andrade e Nascimento |
| Retina (e mapeamento, retinografia) | Dr. Adriano de Morais Ferreira |
| Estrabismo, Oftalmopediatria | Dra. Adriana Bizzarri |
| Plástica ocular | Dra. Cintia Gomes Galvão |

## 3. Regras de redação (valem para qualquer pessoa ou IA que escreva)

**Fatos**
- Fato sobre a CEMO (o que faz, aparelhos, técnicas, tempos, médicos) só com fonte da própria CEMO: site atual,
  vídeos entregues, materiais. Sem fonte → `TODO_CONTENT_VALIDATION: …` no campo `todos` e o fato fica fora do texto.
- Fato médico geral: conservador, consensual, sem números que dependam de estudo específico. Fontes externas só de
  instituições reconhecidas (CBO, sociedades de especialidade, Ministério da Saúde, manuais médicos de referência) e
  só com URL conferida; nada de citar sem abrir a página.
- Nunca inventar RQE, preço, prazo, taxa de sucesso, avaliação, depoimento, aparelho ou técnica.

**CFM / tom**
- Proibido: "melhor", "mais moderno", "referência", "garantido", "100%", "sem dor", "resultado definitivo",
  "independência dos óculos", "rápido e fácil", preço/parcelamento como argumento, antes e depois, comparação com
  outras clínicas, sensacionalismo, medo ("você pode ficar cego").
- Benefícios sempre condicionados à avaliação: "quando há indicação médica", "pode reduzir", "em muitos casos".
- Sinais e sintomas nunca como diagnóstico: "Esses sinais podem estar associados a diferentes condições e precisam
  de avaliação oftalmológica."
- Tom: humano, acolhedor, claro, seguro. Frases curtas. Explicar termo técnico na primeira vez. Escrever para a
  pessoa (muitas vezes com mais de 60 anos ou para os pais), não para o buscador: nada de listas de palavras-chave,
  nada de "oftalmologista perto de mim".
- Taboão da Serra aparece com naturalidade no H1/abertura de páginas comerciais e na localização; bairros e cidades
  vizinhas só onde ajudam a pessoa (como chegar), nunca em lista.

**Estrutura (GEO/AEO)**
- Abrir com resposta direta à pergunta principal (40–100 palavras), depois aprofundar.
- Headings em forma de pergunta ou de tópico claro; uma ideia por seção.
- FAQ com perguntas reais (as que o paciente faz no WhatsApp), 4–6 por página, sem repetir o corpo do texto.
- Fontes em "Fontes e referências" discreto no fim, só quando sustentam afirmação clínica relevante.

## 4. Checklist do revisor médico

1. As informações estão corretas e atuais?
2. Há algo que soe como promessa, garantia ou comparação?
3. O que está escrito corresponde ao que a CEMO realmente faz (técnicas, exames, aparelhos)?
4. As indicações e contraindicações estão corretas e suficientemente cautelosas?
5. Alguma frase pode levar o paciente a se autodiagnosticar ou adiar uma consulta?
6. As fontes são adequadas?

## 5. Vídeos e depoimentos

- Vídeos: legenda (WebVTT ou legenda aberta) e transcrição revisada; falas com promessa ("rápida e eficaz") passam
  pela revisão de compliance antes da produção.
- Depoimentos de pacientes só com autorização por escrito arquivada pela CEMO e revisão de compliance (briefing §137).
  O vídeo "Depoimento Eduarda" fica fora até isso existir.
- Avaliações do Google: exibir as reais, sem editar o sentido, sem schema de review autoatribuído (§70–§71).
