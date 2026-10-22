# Auditoria do site atual — oftalmologiacemo.com.br

Data do crawl: 2026-10-22. Método: GET sequencial (~0,5 s de intervalo), UA de navegador, sem seguir redirects, sem envio de formulários.
Fonte dos dados: `_materiais/analise/site-crawl.csv` (1 linha por URL) e `_materiais/analise/site-entities.json` (entidades).
Regra: tudo abaixo foi lido no site; o que não existe está dito explicitamente. Itens que dependem do cliente estão marcados `TODO_CONTENT_VALIDATION`.

## 1. Resumo do inventário

Stack: WordPress + tema Divi (classes `et_pb_*`), Yoast SEO v21.0, Cloudflare na frente. Sem CPT: tudo é `page`, `post`, categoria, tag ou autor.

| Tipo | Qtde | Origem |
|---|---|---|
| Posts (blog) | 157 | `post-sitemap.xml` |
| Páginas | 29 (inclui home) | `page-sitemap.xml` |
| Categorias | 26 | `category-sitemap.xml` |
| Tags | 214 | `post_tag-sitemap.xml` |
| Autor | 1 (`/author/cemox/`) | `author-sitemap.xml` |
| **Total no sitemap** | **427** | `sitemap_index.xml` |
| Testadas fora do sitemap | 2 (ambas 404) | brief |

Detalhe das 29 páginas: home, `/sobre/`, `/especialidades/` + 6 especialidades, `/exames/` + 12 exames, `/corpo-clinico/`, `/convenios/`, `/blog/`, `/post-list/`, `/contato/`, `/contato-2/`, `/obrigado/`.

Posts por ano de publicação: 2020 = 16, 2022 = 84, 2023 = 24, 2024 = 22, 2025 = 11. Média de ~985 palavras por post; 1 post com menos de 300.

robots.txt (bloco Yoast): `User-agent: *` / `Disallow:` (vazio, tudo liberado) + `Sitemap: https://oftalmologiacemo.com.br/sitemap_index.xml`. A resposta de `robots.txt` traz `X-Robots-Tag: noindex, follow`, o que é comportamento normal para o arquivo de robots e não afeta as páginas.
`/sitemap.xml` e `/wp-sitemap.xml` fazem 301 para `/sitemap_index.xml`.

## 2. Padrões de URL

| Padrão | Exemplo | Observação |
|---|---|---|
| Home | `/` | |
| Institucional | `/sobre/`, `/corpo-clinico/`, `/convenios/`, `/contato/`, `/blog/` | slugs na raiz, com barra final |
| Hub especialidades | `/especialidades/` | filhos: `/especialidades/{catarata,glaucoma,retina,plastica-ocular,cornea,refrativa}/` |
| Hub exames | `/exames/` | filhos: `/exames/{biometria,campo-visual,ceratoscopia,ctd,estereofoto,gonioscopia,mapeamento,lentes,microscopia,paquimetria,retinografia,tonometria}/` |
| Posts | `/{slug}/` na raiz (sem `/blog/` no caminho) | 157 URLs |
| Categoria | `/category/{slug}/` | uma é filha: `/category/dicas-e-curiosidades-sobre-os-olhos-e-visao/dicas/` |
| Tag | `/tag/{slug}/` | 214 |
| Autor | `/author/cemox/` | usuário "Cemo Oftalmologia" |

Atenção para o rebuild: os posts vivem na raiz do domínio. Mudar para `/blog/{slug}/` exige 301 de 157 URLs.

## 3. Status das URLs do brief

| URL | Status |
|---|---|
| `/especialidades/catarata/` | 200 |
| `/especialidades/refrativa/` | 200 |
| `/exames/campo-visual/` | 200 |
| `/blog/` | 200 |
| `/contato/` | 200 (existe também `/contato-2/`, 200) |
| `/convenios/` | 200 |
| `/corpo-clinico/` | 200 |
| `/sobre/` | 200 |
| `/cirurgia-de-catarata-taboao-da-serra/` | **404** |
| `/a-cemo/` | **404** |

Nenhum redirect (3xx) encontrado entre as 429 URLs testadas. As duas 404 retornam `noindex, follow` e H1 "Nenhum resultado encontrado".
Não há URL dedicada de "cirurgia de catarata em Taboão da Serra": a única página de catarata é `/especialidades/catarata/` (H1 "ESPECIALISTA EM CIRURGIA DE CATARATA"). Também não há duplicata catarata/refrativa; há um post sobre lentes premium: `/lentes-intraoculares-premium-catarata/`.

## 4. Achados de SEO técnico

**Indexação e canonicals**
- Todas as 427 URLs do sitemap respondem 200, com `index, follow, max-image-preview:large, ...` e canonical autorreferente. Não há noindex em nenhuma URL do sitemap (inclusive tags, categorias e autor).
- 214 páginas de tag + 26 de categoria estão indexáveis, sem meta description, com ~60 palavras em média nas tags (conteúdo fino). Duas tags colidem em título com a categoria homônima ("Arquivo de Retina - CEMO", "Arquivo de Lentes de Contato - CEMO").

**Títulos**
- Padrão: `{TÍTULO} - CEMO`; páginas institucionais saem curtas e genéricas ("Sobre - CEMO", "Exames - CEMO", "CATARATA - CEMO"). Home: "Clínica de Oftalmologia em Taboão da Serra".
- Nenhum título ausente. Duplicados: 4 grupos.
  - `/contato/` e `/contato-2/` ("Contato - CEMO");
  - `/procedimentos-plastica-ocular-taboao-da-serra/` e `/importancia-da-paquimetria-e-microscopia-na-avaliacao-da-cornea/` ("Procedimentos de Plástica Ocular Disponíveis em Taboão da Serra - CEMO"; o título do segundo post não corresponde ao assunto da URL, e a home mostra esse título com a descrição de paquimetria/microscopia);
  - as duas colisões tag x categoria acima.
- 44 URLs têm título com mais de 60 caracteres (42 são posts).
- `/post-list/` tem título "1Post List - CEMO" e entra no sitemap (página utilitária de ~6.400 palavras listando posts).

**Meta description**
- Só 42 das 427 URLs têm meta description (home e 41 posts). Faltam em todas as páginas de especialidade, exame, institucionais, categorias e tags, e em 116 de 157 posts.

**H1**
- 242 URLs sem H1 (todas as 214 tags, 26 categorias, autor, `/post-list/`).
- 30 URLs com vários H1: home (4: "Oftalmologista", "Taboão da Serra", "Quem Somos", "Sobre a saúde dos olhos!"), `/sobre/` (muitos), `/corpo-clinico/` (cada médico é um H1, nome e CRM em H1 separados), `/exames/` e `/especialidades/` (títulos de cards em H1), e 5 posts.
- Páginas de exame/especialidade: H1 do tipo "EXAME DE CAMPO VISUAL", seguido de H1 de FAQ ("Pra que serve o exame de Campo Visual?") e H1 do bloco "Sobre a saúde dos olhos!" — ou seja, 2 a 3 H1 por página. O H1 do hub /exames/ é "APARELHAGENS MODERNAS E" (fragmentado).
- `/convenios/` tem H1 "AGENDE A SUA CONSULTA" (não cita convênios). `/blog/` tem H1 "TUDO SOBRE".

**Schema (JSON-LD, gerado pelo Yoast)**
- Presentes apenas: `WebPage`, `ReadAction`, `ImageObject`, `BreadcrumbList`, `WebSite` + `SearchAction`, `Person` (autor nos posts), `CollectionPage` (arquivos), `ProfilePage` (autor). `BreadcrumbList` na home tem um único item.
- Ausentes: `Organization`/`MedicalClinic`/`LocalBusiness`, `Physician`, `MedicalProcedure`, `FAQPage`, `Article`/`BlogPosting` (posts usam `WebPage`), `AggregateRating`. NAP não está em schema nenhum.

**Open Graph**
- `og:type` = `article` em 425 URLs, `website` na home, `profile` no autor. A `og:image` da home é o logo (`Prancheta-69.png`, 208x74).

**Datas**
- `article:published_time` e `modified_time` existem nos posts. Home modificada em 2025-05-08; especialidade catarata em 2025-04-14; exames em 2024-10-22; `/sobre/` em 2020-08-31.

**Outros**
- `/contato/` e `/contato-2/` têm conteúdo idêntico, ambos indexáveis, sem canonical cruzado: duplicata. `/obrigado/` (página de agradecimento) está indexável e no sitemap.
- Pop-up de Natal 2024 (`Feliz-natal-mensagem-empresa-simples-branco-instagram-post.png`) ainda carregado no HTML de todas as páginas.
- Link `tel:114788-3536` malformado no cabeçalho (outro link usa `tel:1147883536`).
- Imagens: `alt` vazio nos logos de convênios; nomes de arquivo sem semântica (`Prancheta-69.png`).
- Todas as páginas carregam GTM, Universal Analytics antigo (UA-, descontinuado), Google Ads e Pixel Meta (ver seção 8).

## 5. Inventário de entidades

### 5.1 Corpo clínico (`/corpo-clinico/`, sem URL individual por médico)

Texto de abertura: "A nossa equipe é composta por especialistas na área da oftalmologia, atendemos os casos clínicos nas especialidades de catarata, glaucoma, córnea, uveítes, plástica ocular, lentes de contato, retina e mácula, tumores, oftalmopediatria, cirurgia refrativa. Além disso, contamos com uma equipe de tecnólogos que auxiliam na realização de exames."

| Nome (como no site) | CRM | RQE | Especialidade (como no site) | Foto |
|---|---|---|---|---|
| DR. DAVID RIBEIRO DE MENDONÇA FILHO (Diretor Técnico) | CRM/SP 98339 | não consta | Cirurgias Refrativas, Catarata, Ceratocone e Retina Clínica | `/2020/05/dr.david-ribeiro.jpg` |
| DRA. PRISCILLA PIRES | CRM/SP 84340 | não consta | Catarata e Refrativa | `/2020/05/dra.priscilla-pires.jpg` |
| DRA. CINTIA GOMES GALVÃO | CRM/SP 97952 | não consta | Plástica Ocular | `/2020/10/dra-cintia-gomes-novo.jpg` |
| DR. RODRIGO ARANTES | CRM/SP 141481 | não consta | Catarata | `/2024/06/Imagem-do-WhatsApp-de-2024-05-22-as-17.20.31_7fd39446.jpg` |
| DRA. ADRIANA BIZZARRI | CRM/SP 91030 | não consta | Estrabismo e Oftalmopediatria | `/2020/05/dra.adriana-bizzarri.jpg` |
| DR. ADRIANO DE MORAIS FERREIRA | CRM/SP 152423 | não consta | Retina | `/2020/05/dr.adriano-de-morais.jpg` |
| DRA. BRUNA DE ANDRADE NASCIMENTO | CRM/SP 128889 | não consta | Catarata e Refrativa | `/2020/05/dra.bruna-andrade.jpg` |
| DRA. ROBERTA ANDRADE E NASCIMENTO | CRM/SP 144576 | não consta | Glaucoma Clínico, Cirúrgico e Catarata | `/2020/05/dra.roberta-andrade.jpg` |

(Caminhos de foto relativos a `https://oftalmologiacemo.com.br/wp-content/uploads`.) A formação completa de cada um (universidades, residências, títulos) está em `site-entities.json`, transcrita do site.
Observações: nenhum RQE em todo o site; nenhum perfil individual; nome do rodapé "Dr David Ribeiro de Mendonça Filho CRM-SP 98.339" (grafia diferente de "CRM/SP 98339"). Na página `/sobre/` ele aparece como "Dr. David Mendonça Filho CRM/SP 98339".

### 5.2 Especialidades (6)
Catarata, Glaucoma, Retina, Plástica Ocular, "Córnea e Externa" (card: "(ANEL INTRA-ESTROMAL, CROSSLINKING CORNEANO E TRANSPLANTES)"; no menu aparece só "CÓRNEA"; o card tem o erro de digitação "CÓRNEA E EXTENA") e Refrativa ("(MIOPIA, HIPERMETROPIA E ASTIGMATISMO)").
Estrutura de cada página: H1 "ESPECIALISTA EM CIRURGIA DE X", subtítulo "Com preços acessíveis e parcelas que cabem no seu bolso!", CTA WhatsApp, bloco "Quais são os sintomas de X?", 3 posts relacionados da categoria, 5 posts recentes, rodapé. Entre 490 e 580 palavras.
Não há páginas próprias para estrabismo/oftalmopediatria, ceratocone, uveítes, lentes de contato (cuja adaptação existe como exame) nem para tumores, embora citados no corpo clínico e no sobre.

### 5.3 Exames (12)
Biometria, Campo Visual, Ceratoscopia, CTD (Curva Tensional Diária), Estereofoto de Papila, Gonioscopia, Mapeamento de Retina, Adaptação de Lentes de Contato (slug `lentes`), Microscopia Especular, Paquimetria, Retinografia, Tonometria. Cada página: ~340 a 470 palavras, H1 "EXAME DE X", bloco "Pra que serve o exame de X?" e CTA "AGENDE SEU EXAME". Não há descrição de preparo, duração ou aparelho.

### 5.4 Cirurgias e tratamentos citados
Não há páginas de cirurgia separadas das especialidades. Citados no texto: ceratocone, catarata, doenças corneanas, pterígio, conjuntivites, tumores conjuntivais, astigmatismo, miopia, hipermetropia, presbiopia, cirurgias refrativas, crosslinking corneano, anel corneano (Ferrara), lentes de contato, transplante de córnea; cirurgia de catarata "em média 20 minutos"; cirurgia refrativa "em torno de 1 hora"; recuperação de glaucoma "em média de quatro semanas"; retina "45 a 60 dias". `TODO_CONTENT_VALIDATION`: confirmar com a equipe médica antes de reutilizar esses números.

### 5.5 Convênios (`/convenios/`)
Texto: "O CEMO faz atendimento particular e também temos parcerias com os melhores planos para você cuidar da sua visão. Dependendo do grau o convênio cobre sem nenhum custo!" A lista é apenas de logos (sem texto, `alt` vazio), 17 logos, 16 identificados pelo nome do arquivo:
Allianz, Amil, Bradesco Saúde, CAASP, Cassi, CNEN, Economus, Mediservice, Notre Dame Intermédica, Porto Seguro, Postal Saúde, Saúde Caixa, Saúde Itaú, Unimed Seguros, Vivest, Dr. Consulta. O 17º logo é `layout_set_logo.jpg` (operadora não identificada).
`TODO_CONTENT_VALIDATION`: lista atualizada de convênios (logos de 2020/2021/2022, possivelmente desatualizados), identificar o 17º, e se Dr. Consulta é convênio ou cartão de desconto.

### 5.6 NAP (idêntico no rodapé de todas as páginas)
- Nome: CEMO – Centro de Microcirurgia Ocular
- Endereço: Rua Levi de Souza e Silva, 81 Centro - Taboão da Serra - SP CEP: 06763-170
- Telefone: (11) 4788-3536
- WhatsApp: (11) 94701-6162 (`api.whatsapp.com/send?phone=5511947016162`)
- E-mail: sac@oftalmologiacemo.com.br (ofuscado pelo Cloudflare no HTML)
- Horário: Segunda-feira a Quinta-feira: 08:00 as 18:00; Sexta-feira: 08:00 as 17:00; Sábado: 08:00 as 12:00 (domingo e feriados não citados)
- Responsável técnico: Dr David Ribeiro de Mendonça Filho CRM-SP 98.339
- Mapa: embed do Google Maps em `/contato/`.
- CNPJ, razão social, link do Google Business e nota/quantidade de avaliações Google: não constam no site.

### 5.7 Estatísticas / prova social
- Home: "Com mais de 20 anos de atividade o CEMO – Centro de Microcirurgia Ocular já atendeu mais de 100 mil pacientes em todo o território nacional".
- `/sobre/`: "MAIS DE 20 ANOS DE ATIVIDADE E 100 mil atendimentos"; a linha do tempo da mesma página diz "mais de 15 anos de atividade e quase 100 mil atendimentos bem sucedidos" (inconsistência). Linha do tempo com marcos 2005, 2008, 2012, 2014, 2016, 2018, 2020 (apenas como imagens; "ANO DE FUNDAÇÃO" sem ano em texto).
- Sem depoimentos, sem nota Google, sem selos.
- `TODO_CONTENT_VALIDATION`: ano de fundação, tempo de atividade e total de atendimentos atuais.

### 5.8 Redes sociais
Instagram: `https://instagram.com/cemooftalmologia`; Facebook: `https://facebook.com/cemooftalmologia` (ambos "@CEMOOFTALMOLOGIA"). Sem YouTube, TikTok, LinkedIn ou Google Business.

## 6. Menu principal

HOME · SOBRE · ESPECIALIDADES (CATARATA, GLAUCOMA, RETINA, PLÁSTICA OCULAR, CÓRNEA, REFRATIVA) · EXAMES (BIOMETRIA, CAMPO VISUAL, CERATOSCOPIA, CTD, ESTEREOFOTO, GONIOSCOPIA, MAPEAMENTO, LENTES, MICROSCOPIA, PAQUIMETRIA, RETINOGRAFIA, TONOMETRIA) · CORPO CLÍNICO · CONVÊNIOS · BLOG · CONTATO.
Topo: telefones, Instagram e Facebook. Rodapé: CTA, endereço, horários, telefone/e-mail, botão "EXAME ONLINE" (`https://cemo.sivoe.med.br/`), crédito "Desenvolvido por P12 Digital".

## 7. Home (referência de conteúdo)
Título: "Clínica de Oftalmologia em Taboão da Serra". Meta: "CEMO Oftalmologia: excelência em saúde ocular, com atendimento particular e por convênio. Cuidado completo para seus olhos." Seções: hero "Oftalmologista Taboão da Serra — Clínica Oftalmológica Completa — Consultas, Exames, Tratamentos e Cirurgias" + CTA "AGENDE AGORA MESMO"; links para especialidades e exames; "Quem Somos"; 5 posts recentes; CTA final com NAP. ~340 palavras, 43 links internos.
Imagens principais: logo `/2020/05/Prancheta-69.png`, `/2020/09/especialidades-home.jpg`, `/2020/09/img-home3.png`, `/2020/09/img2.jpg`, `/2020/09/Prancheta-65.png`. Especialidade catarata: `/2024/04/60bfc41e741b95c492f71af9_what-is-cataract.jpg`, `/2020/05/Prancheta-66/67/68.png`. Mídia toda em `/wp-content/uploads/AAAA/MM/`.

## 8. Pontos de conversão e rastreamento

- WhatsApp: botão em todas as páginas ("AGENDE AGORA MESMO", "AGENDE SUA CONSULTA", "AGENDE SEU EXAME", "VER PREÇO" nos cards de especialidades), link `api.whatsapp.com/send?phone=5511947016162&text=Olá, Estou entrando em contato através do site CEMO!`. Não há botão flutuante identificado no HTML estático.
- Telefone: `tel:` no topo e no rodapé.
- Formulário: apenas `/contato/` (e a duplicata `/contato-2/`): Nome, Telefone, E-mail, Mensagem, ENVIAR → `/obrigado/`. Não foi enviado/testado.
- "VER PREÇO" abre o WhatsApp; nenhum preço é publicado ("Com preços acessíveis e parcelas que cabem no seu bolso!").
- Exame online / resultados: link externo `cemo.sivoe.med.br`.
- Tags de rastreamento no HTML: GTM-PH3D5ZS, UA-176900431-1, AW-16676786938 (Google Ads), Pixel Meta 423546515361032. `TODO_CONTENT_VALIDATION`: confirmar quais ainda estão ativos antes de migrar.

## 9. Recomendações para o rebuild (preservação de SEO)

1. Manter as URLs de especialidades, exames, corpo-clinico, convenios, sobre, contato e blog idênticas, ou 301 um-para-um.
2. Decidir o destino dos 157 posts (hoje na raiz): manter slug na raiz ou migrar para `/blog/{slug}/` com 301 em massa.
3. 301 de `/contato-2/` → `/contato/`; retirar `/post-list/` e `/obrigado/` do índice (noindex ou remoção do sitemap).
4. Tags (214): avaliar noindex ou consolidação (conteúdo fino, sem H1/description); categorias: manter as de maior valor (catarata, glaucoma, retina, refrativa, etc.).
5. Criar H1 único por página, meta description para todas as páginas e títulos únicos.
6. Adicionar schema `MedicalClinic`/`LocalBusiness`, `Physician` por médico, `FAQPage` onde houver FAQ, `BlogPosting` nos posts e `BreadcrumbList` completo.
7. Corrigir o título do post `/importancia-da-paquimetria-e-microscopia-na-avaliacao-da-cornea/`.
8. Páginas que não existem hoje e que o brief pode querer: `/cirurgia-de-catarata-taboao-da-serra/` (404 atual, sem tráfego a preservar), perfis individuais de médicos, estrabismo/oftalmopediatria, ceratocone.

## 10. Itens para validação do cliente (`TODO_CONTENT_VALIDATION`)

- `TODO_CONTENT_VALIDATION`: RQE de cada médico (não consta no site) e CRM/grafias oficiais; confirmar se os 8 médicos seguem ativos (fotos de 2020).
- `TODO_CONTENT_VALIDATION`: a foto de Dr. Rodrigo Arantes é um arquivo "Imagem do WhatsApp" de 2024 (qualidade/uso autorizado).
- `TODO_CONTENT_VALIDATION`: lista atual de convênios (17 logos; 1 não identificado).
- `TODO_CONTENT_VALIDATION`: telefone fixo e WhatsApp, e-mail `sac@`, horários (domingo/feriados), endereço.
- `TODO_CONTENT_VALIDATION`: anos de atividade (15 vs 20), ano de fundação e número de atendimentos (100 mil).
- `TODO_CONTENT_VALIDATION`: tempos de cirurgia/recuperação (20 min, 1 h, 4 semanas, 45 a 60 dias) e promessas ("parcelas que cabem no seu bolso", "convênio cobre sem nenhum custo") — revisão médica/CFM.
- `TODO_CONTENT_VALIDATION`: nota e quantidade de avaliações Google (não há no site) e link do Google Business.
- `TODO_CONTENT_VALIDATION`: continuidade do "EXAME ONLINE" (cemo.sivoe.med.br) e dos pixels/GTM/Ads.
- `TODO_CONTENT_VALIDATION`: se o autor `/author/cemox/` e as 214 tags podem ser descontinuados.
- `TODO_CONTENT_VALIDATION`: posts de 2020 a 2022 (100 dos 157) — manter, atualizar ou consolidar.
