# CEMO — Design System (proposta v0.1)

Reconstrução de oftalmologiacemo.com.br · Next.js (App Router) + TypeScript + Tailwind v4
Documento para aprovação do cliente e referência de designers e devs. Nenhum código de app ainda.

---

## 1. Conceito e direção de arte

**Conceito: "Precisão que acolhe".**
CEMO é microcirurgia ocular: o trabalho é medido em mícrons, mas o paciente é, muitas vezes, um idoso nervoso com catarata. O site usa a linguagem da **mira de precisão** (o retículo do olho do logotipo) para a tecnologia e **tipografia editorial com serifa e fotografia humana** para o acolhimento. Saúde premium + tecnologia médica + acolhimento humano, sem nenhum dos três virar clichê.

**Por que não parece template de clínica**

| Clichê de template | O que fazemos |
|---|---|
| Fundo branco + azul + cards iguais com ícone | Ritmo editorial: seções com proporções diferentes, poucos cards, texto bem composto |
| Foto de stock de médico sorrindo | Fotografia real do corpo clínico e do equipamento, tratada com a mesma luz |
| Ícones genéricos de olho/coração | Motivo próprio derivado do logo (1.1) |
| Sans geométrica em tudo | Serifa de leitura (Literata) nos títulos + sans de baixa visão (Atkinson) no corpo |
| Gradiente azul-verde | Cores chapadas; o verde CEMO é ponto de luz, nunca fundo extenso |
| Hero "texto à esquerda, foto retangular à direita" | Painel-pálpebra, retículo e médico em escala editorial (seção 9) |

### 1.1 Dispositivos de marca (o que torna o visual ownable)

1. **Mira (retículo).** Extraído do logo: círculo + cruz fina com pequeno vazado central. Uso: marcas de registro nos cantos de imagens de equipamento, mira sobre o painel do hero, marcador de ponto em listas de procedimentos. Traço 1,5 px, verde `#9EC227` sobre azul-profundo ou azul `#0066B1` sobre claro. Sempre fina e estática, nunca animada em loop.
2. **Pálpebra (arco).** A curva do olho do logo vira **forma de recorte**: o canto superior esquerdo de painéis de foto e a borda de faixas escuras têm uma curva longa e assimétrica (`border-top-left-radius: 40% 55%` ou clip SVG). É o único formato fora do retângulo do site, usado em no máximo 4 lugares: hero, DoctorSpotlight, faixa Estrutura e Tecnologia, rodapé/CTA final.
3. **Grid editorial de 12 colunas.** Texto sempre alinhado à esquerda. Numeração só onde o conteúdo é de fato sequência (ex.: "Como é a consulta").
4. **Voz tipográfica.** Títulos em Literata 600, grandes, em frases completas e sentence case ("Enxergar bem muda o seu dia."), sem destacar uma palavra em cor/itálico, sem eyebrows em caixa-alta. Corpo em Atkinson Hyperlegible, 18-19 px.
5. **Fotografia como estrutura.** Todo painel de foto usa a mesma luz (neutra, levemente fria), a mesma proporção por tipo (retrato 4:5, equipamento 3:2) e o mesmo recorte-pálpebra.

### 1.2 Princípios

1. **Legibilidade antes de estilo.** Se um efeito reduz contraste ou tamanho, ele sai.
2. **Uma coisa memorável por tela** (hero: Dr. David + painel-pálpebra; Estrutura: composição de equipamentos). O resto é quieto.
3. **Poucos elementos, bem espaçados.** Seções respiram: 112 px verticais no desktop.
4. **Movimento responde ao usuário**; há um único momento de entrada (hero). Nada contínuo.
5. **Confiança por fatos**: nota Google, CRM, anos de atuação, convênios, em texto grande e claro.
6. **Consistência**: um raio por papel, uma sombra por elevação, um botão primário por tela.

### 1.3 Revisão contra o briefing (autocrítica)

- Rascunho 1: fundo creme + serifa + terracota (clichê) → descartado; paleta ancorada só no azul/verde/ciano do logo.
- Rascunho 2: hero em azul-escuro cheio com foto recortada → descartado: o fundo cinza da foto (`#C6C7C4`) viraria "caixa" sobre azul, e recortar o médico arrisca alterar o corpo. Solução: **usar o próprio cinza de estúdio como cor do painel**, fundindo a foto sem máscara de recorte.
- Retículo animado → descartado (animação infinita proibida). Retículo estático.

---

## 2. Cores

Base extraída programaticamente do PNG do logo (pixels opacos): **`#0066B1` azul (25.929 px)**, **`#9EC227` verde (13.337 px)**, **`#27A1CF` ciano da linha "Centro de Microcirurgia Ocular" (4.264 px)**. O site atual usa exatamente `#0066b1` e `#9ec227`, com fontes Jost e Montserrat. O azul do logo é a âncora ("alinhado ao azul CEMO").

Ponto crítico: **verde `#9EC227` sobre branco = 2,06:1 e ciano `#27A1CF` sobre branco = 2,96:1. Reprovam para texto e ícones informativos.** São cores de **marca/decoração** (motivos, linhas) e funcionam bem sobre azul-profundo (7,09:1 e 4,92:1).

### 2.1 Tokens

| Token | Hex | Papel |
|---|---|---|
| `azul-cemo` | `#0066B1` | Marca, botão primário, títulos grandes, ícones |
| `azul-700` | `#004F8C` | Links em texto corrido, hover do botão primário, texto azul pequeno |
| `azul-profundo` | `#072A4A` | Fundos escuros (rodapé, faixas, UtilityBar), derivado do azul CEMO |
| `tinta` | `#0F2236` | Texto principal |
| `tinta-suave` | `#3D4F63` | Texto secundário (limite: nada mais claro que isto) |
| `papel` | `#FFFFFF` | Fundo base |
| `nevoa` | `#F2F6FA` | Superfície de seção alternada |
| `nevoa-2` | `#E6EEF5` | Superfície elevada, chips, hover |
| `estudio` | `#C7C8C5` | Painel do hero = fundo da foto do Dr. David (amostrado) |
| `verde-cemo` | `#9EC227` | Acento decorativo: mira, linhas, foco em fundo escuro |
| `verde-texto` | `#4A6A00` | Verde utilizável em texto sobre claro |
| `ciano-cemo` | `#27A1CF` | Decoração em fundo escuro |
| `ciano-claro` | `#8FD3F0` | Texto/ícone ciano sobre azul-profundo |
| `sucesso` | `#1B6E3A` | Confirmações |
| `erro` | `#B3261E` | Erros |
| `aviso` | `#8A5A00` | Avisos |
| `whatsapp` | `#0B6B3A` | Botão WhatsApp (o `#25D366` oficial reprova com texto branco) |
| foco | `azul-cemo` + halo branco (claro) / `verde-cemo` (escuro) | Anel de foco |
| `borda` | `#C9D6E3` | Divisores hairline (decorativo) |
| `borda-campo` | `#6B7F94` | Borda de campos (3,9:1 sobre branco, atende 3:1 de UI) |

### 2.2 Pares aprovados (razão de contraste calculada, fórmula WCAG)

Corpo: alvo AAA (≥ 7:1). Demais usos: mínimo 4,5:1.

| Texto | Fundo | Razão | Uso | Nível |
|---|---|---|---|---|
| `tinta` #0F2236 | `papel` #FFFFFF | **16,12** | Corpo | AAA |
| `tinta` | `nevoa` #F2F6FA | 14,85 | Corpo em seção alternada | AAA |
| `tinta` | `nevoa-2` #E6EEF5 | 13,75 | Corpo em superfície elevada | AAA |
| `tinta` | `estudio` #C7C8C5 | 9,59 | Texto sobre painel do hero | AAA |
| `tinta-suave` #3D4F63 | `papel` | 8,41 | Texto secundário | AAA |
| `tinta-suave` | `nevoa` | 7,74 | Secundário em superfície | AAA |
| `tinta-suave` | `nevoa-2` | 7,17 | Secundário em superfície elevada | AAA |
| `azul-700` #004F8C | `papel` | 8,41 | Links no corpo | AAA |
| `azul-700` | `nevoa` | 7,74 | Links em superfície | AAA |
| `azul-cemo` #0066B1 | `papel` | 5,94 | Títulos grandes, ícones, links grandes | AA |
| `azul-cemo` | `nevoa` | 5,47 | idem | AA |
| `azul-cemo` | `nevoa-2` | 5,07 | idem | AA |
| `papel` | `azul-cemo` | 5,94 | Texto do botão primário | AA |
| `papel` | `azul-700` | 8,41 | Botão primário em hover | AAA |
| `papel` | `azul-profundo` #072A4A | 14,59 | Texto em fundo escuro | AAA |
| `#E3ECF5` | `azul-profundo` | 12,22 | Texto secundário em escuro | AAA |
| `verde-cemo` #9EC227 | `azul-profundo` | 7,09 | Acento/ícone em escuro | AAA |
| `ciano-claro` #8FD3F0 | `azul-profundo` | 8,86 | Links/ícones em escuro | AAA |
| `ciano-cemo` #27A1CF | `azul-profundo` | 4,92 | Linhas decorativas em escuro | AA |
| `azul-profundo` | `verde-cemo` | 7,09 | Texto sobre selo verde | AAA |
| `tinta` | `verde-cemo` | 7,83 | idem | AAA |
| `verde-texto` #4A6A00 | `papel` | 6,26 | Verde em texto ("Aberto agora") | AA |
| `verde-texto` | `nevoa` | 5,77 | idem | AA |
| `papel` | `whatsapp` #0B6B3A | 6,61 | Botão WhatsApp | AA |
| `sucesso` #1B6E3A | `papel` | 6,29 | Mensagem de sucesso | AA |
| `erro` #B3261E | `papel` | 6,54 | Mensagem de erro | AA |
| `aviso` #8A5A00 | `papel` | 5,93 | Aviso | AA |

**Proibidos (medidos):** `#9EC227` e `#27A1CF` como texto sobre branco (2,06 / 2,96); `#0066B1` sobre `azul-profundo` (2,46: usar branco); `#0066B1` sobre `estudio` (3,53: usar `tinta`); cinza `#8A9AAB` (2,88). Estados de erro nunca dependem só de cor: ícone + texto.

---

## 3. Tipografia

### 3.1 Famílias (Google Fonts via `next/font/google`, self-hosted, `display: swap`, subset `latin`)

| Papel | Família | Eixos/pesos | Por quê |
|---|---|---|---|
| Títulos, citações, números de destaque | **Literata** (variável) | `wght` 500-700 (usar 500 e 600), `opsz` automático (7-72) | Serifa desenhada para leitura em tela, contraste moderado e traços que não afinam: tom editorial e humano, longe da sans geométrica de template de clínica. |
| Corpo, UI, botões, formulários | **Atkinson Hyperlegible Next** (variável) | `wght` 400-700 (usar 400, 500, 700) | Criada pelo Braille Institute para baixa visão: letras inequívocas (I/l/1, 0/O). É também um argumento de marca ("pensado para quem enxerga mal"). |

- Duas famílias, cinco instâncias de peso (Literata 500, 600; Atkinson 400, 500, 700). Variáveis: um arquivo por família.
- **Verificar na implantação** o nome/disponibilidade de "Atkinson Hyperlegible Next" no `next/font/google`. Fallback aprovado: "Atkinson Hyperlegible" estático (400/700).
- Fallbacks de sistema: `Georgia, "Times New Roman", serif` e `system-ui, "Segoe UI", Arial, sans-serif`, com `size-adjust` automático do `next/font` (sem CLS).
- Sem peso < 400, sem itálico decorativo; `tabular-nums` só em horários/telefones.

### 3.2 Escala fluida (clamp entre 360 px e 1440 px)

Corpo nunca abaixo de 18 px. **Nenhum texto abaixo de 16 px** em qualquer lugar (inclui rodapé, legendas, formulário).

| Token | Mobile | Desktop | clamp | Fonte/peso | Line-height | Tracking |
|---|---|---|---|---|---|---|
| `display` (H1 hero) | 36 px / 2,25 rem | 64 px / 4 rem | `clamp(2.25rem, 1.6rem + 2.8vw, 4rem)` | Literata 600 | 1,08 | -0,015em |
| `h1` (internas) | 32 px | 52 px | `clamp(2rem, 1.5rem + 2.2vw, 3.25rem)` | Literata 600 | 1,12 | -0,01em |
| `h2` | 28 px | 44 px | `clamp(1.75rem, 1.3rem + 1.8vw, 2.75rem)` | Literata 600 | 1,18 | -0,01em |
| `h3` | 22 px | 28 px | `clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem)` | Literata 600 | 1,25 | 0 |
| `h4` | 20 px | 22 px | `clamp(1.25rem, 1.2rem + 0.2vw, 1.375rem)` | Atkinson 700 | 1,3 | 0 |
| `lead` | 20 px | 22 px | `clamp(1.25rem, 1.15rem + 0.4vw, 1.375rem)` | Atkinson 400 | 1,55 | 0 |
| `body` | 18 px | 19 px | `clamp(1.125rem, 1.1rem + 0.1vw, 1.1875rem)` | Atkinson 400 | 1,65 | 0,005em |
| `small` | 16 px | 16 px | `1rem` | Atkinson 400/500 | 1,55 | 0,01em |
| `ui` (botão, campo, nav) | 17 px | 18 px | `clamp(1.0625rem, 1.05rem + 0.1vw, 1.125rem)` | Atkinson 700 / 500 | 1,25 | 0,005em |

- **Medida:** corpo 60-68 caracteres (`max-width: 66ch`); leads até 56ch; títulos até ~20ch (`text-wrap: balance`); parágrafos `text-wrap: pretty`.
- Alinhamento à esquerda; sem texto justificado.
- Ênfase = peso 700, nunca cor isolada.
- Tudo em `rem`; testar zoom 200% e texto 200% sem perda de conteúdo.

---

## 4. Espaçamento, raio, borda, sombra, container, breakpoints

### 4.1 Espaçamento (base 4 px)

`1 (4), 2 (8), 3 (12), 4 (16), 5 (20), 6 (24), 8 (32), 10 (40), 12 (48), 16 (64), 20 (80), 24 (96), 32 (128)`.
Seção vertical: **mobile 64, tablet 80, desktop 112 px** (`--space-section`). Gap entre cards 24 (32 no desktop). Gutter lateral 20 / 24 / 32 / 40 px.

### 4.2 Raio

| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | 6 px | campos, chips |
| `radius-md` | 10 px | botões, cards pequenos |
| `radius-lg` | 16 px | cards de serviço/depoimento, drawer |
| `radius-lid` | `40% 0 0 0 / 55% 0 0 0` | recorte-pálpebra (só painéis de foto e faixas) |
| `radius-full` | 9999 px | avatares, selos |

O raio muda com o papel, não é um valor único.

### 4.3 Borda

`borda` 1 px `#C9D6E3` (divisores); campos em repouso 1,5 px `borda-campo`; campo focado/selecionado 2 px `azul-cemo`; linhas decorativas (mira) 1,5 px.

### 4.4 Sombra (uma família, tom azul, baixa difusão)

| Token | Valor |
|---|---|
| `shadow-1` | `0 1px 2px rgb(7 42 74 / .08), 0 1px 1px rgb(7 42 74 / .04)` |
| `shadow-2` (hover de card, header rolado) | `0 6px 20px -6px rgb(7 42 74 / .18)` |
| `shadow-3` (drawer, mega menu) | `0 24px 48px -16px rgb(7 42 74 / .28)` |

Sem glassmorphism, sem blur de fundo, sem sombras coloridas.

### 4.5 Container

| Token | Valor |
|---|---|
| `container-site` | 1216 px de conteúdo (máx. 1280 com gutters) |
| `container-wide` | 1360 px (hero, faixas editoriais) |
| `container-prose` | 720 px (artigos; ~66ch) |

### 4.6 Breakpoints (mobile-first)

| Nome | Largura | Alvo |
|---|---|---|
| base | 0-389 | **360 px** |
| `xs` | 390 px | **iPhone 14/15** |
| `sm` | 640 px | mobile grande / paisagem |
| `md` | 768 px | **tablet** retrato |
| `lg` | 1024 px | tablet paisagem / laptop pequeno (nav desktop e MegaMenu começam aqui) |
| `xl` | 1280 px | **desktop** |
| `2xl` | 1440 px | **desktop largo** (composição de referência do hero) |
| `3xl` | 1760 px | monitores grandes: container trava, fundos continuam |

---

## 5. Movimento

| Token | Valor | Uso |
|---|---|---|
| `duration-instant` | 100 ms | troca de cor de estado |
| `duration-fast` | 160 ms | hover, foco, botão |
| `duration-base` | 240 ms | accordion, dropdown |
| `duration-slow` | 480 ms | drawer, entrada do hero |
| `ease-standard` | `cubic-bezier(.2, 0, 0, 1)` | padrão |
| `ease-out` | `cubic-bezier(0, 0, .2, 1)` | entradas |
| `ease-in` | `cubic-bezier(.4, 0, 1, 1)` | saídas |

**Permitido:** entrada única do hero (texto sobe 12 px, foto em fade 480 ms, defasagem 120 ms, uma vez); hover/pressed; abertura de accordion/drawer/menu; foco.
**Proibido:** parallax pesado, scroll hijacking, cursor custom, animação infinita, reveal em toda seção, vídeo autoplay.
**`prefers-reduced-motion: reduce`:** durações ~0, transforms removidos, apenas cor/opacidade instantâneas; hero renderiza direto (bloco CSS na seção 14). Conteúdo nunca nasce `opacity: 0` dependente de JS.

---

## 6. Foco, botões e campos

### 6.1 Foco visível (WCAG 2.2: 2.4.11 / 2.4.13)

`:focus-visible` = contorno 3 px `azul-cemo` + halo branco 2 px, offset 2 px. Em fundo escuro: 3 px `verde-cemo` (7,09:1 sobre navy). Nunca `outline: none` sem substituto. Skip link "Ir para o conteúdo" visível ao receber foco.

### 6.2 Botões (altura mínima 52 px; alvo mínimo 48 × 48 px; 8 px entre alvos)

| Variante | Fundo / texto | Hover | Uso |
|---|---|---|---|
| Primário | `azul-cemo` / branco (5,94:1) | `azul-700` | 1 por viewport: "Agendar consulta" |
| WhatsApp | `whatsapp` / branco (6,61:1) + ícone | 8% mais escuro | Contato direto |
| Secundário | transparente, borda 2 px `azul-cemo`, texto `azul-700` | fundo `nevoa-2` | "Ver exames de catarata" |
| Sobre escuro | branco / `azul-profundo` (14,59:1) | `nevoa-2` | Faixas navy |
| Link de texto | `azul-700`, sublinhado 2 px, offset 3 px | sublinhado 3 px | Dentro do texto |

Texto 18 px / 700, padding 16 × 28 px, `radius-md`, 1 ícone de 24 px no máximo. Estados: repouso, hover (160 ms), `:active` (translateY 1 px), foco, desabilitado (`tinta-suave` sobre `nevoa-2`, `aria-disabled`, nunca só opacidade), carregando ("Enviando…" em texto). Rótulos dizem a ação ("Agendar consulta", "Falar no WhatsApp"), sem "→" decorativo.

### 6.3 Campos de formulário

Altura 56 px, texto 18 px (evita zoom no iOS), **rótulo sempre visível acima** (18 px / 500; nunca só placeholder), ajuda abaixo (16 px `tinta-suave`), borda 1,5 px `borda-campo`, fundo branco, `radius-sm`. Foco: borda 2 px `azul-cemo` + anel. Erro: borda `erro` + ícone + mensagem em texto ("Informe um telefone com DDD, por exemplo (11) 91234-5678"), `aria-invalid`, `aria-describedby`, resumo de erros recebe foco no envio. Obrigatório escrito ("obrigatório"), não só asterisco. `autocomplete` correto. Máscara de telefone sem bloquear colagem. Checkbox/radio com alvo de 48 px e marca de 24 px.

---

## 7. Imagens, fotografia e iconografia

### 7.1 Fotografia

- **Real, sempre.** Corpo clínico em fundo de estúdio neutro; equipamentos na própria clínica. Sem stock. Rostos nunca alterados (sem retoque, stretch ou upscaling por IA).
- **Tratamento uniforme:** correção neutra levemente fria (`brightness 1.02`, `saturate .95`), sem duotone, sem gradiente sobre rostos. Overlay só em foto com texto, chapado `azul-profundo` ≥ 60%.
- **Proporções:** retrato 4:5 (cards), 2:3 ou 3:4 (spotlight/hero), equipamento 3:2, ambiente 16:9. `object-position` definido por foto; rosto sempre a ≥ 8% da borda superior.
- **Formatos:** AVIF/WebP via `next/image`, `sizes` corretos. `priority` + `fetchpriority="high"` só no hero. Alt descritivo ("Dr. David Ribeiro de Mendonça Filho, diretor técnico do CEMO, de jaleco"); decorativas com `alt=""`.
- Hero é o LCP: peso alvo ≤ 120 KB mobile / ≤ 180 KB desktop, dimensões explícitas, sem lazy, sem carrossel.
- **Vídeo:** só VideoFacade (pôster + botão; iframe `youtube-nocookie` no clique).

### 7.2 Estrutura e Tecnologia (composição editorial dos equipamentos)

Existem 6 fotos de equipamentos em sala clara, compressão WhatsApp. Não fazer galeria uniforme.

```
+--------------------------------------------------------------+
| h2 "Tecnologia que mede em mícrons"      | texto (cols 8-12)  |
+-------------------------------+------------------------------+
|                               |  +-----------+               |
|  FOTO 1 grande (3:2)          |  | foto 2    |  legenda:     |
|  equipamento principal        |  | (crop)    |  nome do      |
|  marcas de mira nos 4 cantos  |  +-----------+  aparelho +   |
|  legenda técnica abaixo       |  +-----------+  o que ele    |
|                               |  | foto 3    |  permite      |
|                               |  +-----------+               |
+-------------------------------+------------------------------+
| foto 4 | foto 5 | foto 6: recortes de detalhe 1:1 e 4:5,      |
| alturas diferentes, cada uma com legenda de 2 linhas         |
+--------------------------------------------------------------+
```

Regras: 1 foto-âncora grande; as demais em **recortes de detalhe** do aparelho (esconde a baixa resolução e cria o efeito de "ficha técnica"); cada foto tem legenda de 2 linhas (nome do equipamento + o que isso significa para o paciente, 16-18 px); marcas de registro de mira nos cantos da foto-âncora; fundo `nevoa`; faixa com recorte-pálpebra. Uniformizar balanço de branco (paredes claras → neutro frio). **Risco:** compressão WhatsApp; limitar a 640-800 px renderizados ou pedir originais.

### 7.3 Iconografia

Conjunto único, traço 2 px, cantos arredondados, grade de 24 px, cor `tinta` ou `azul-700` (Lucide ou Phosphor "regular"; peso fino proibido). Ícone nunca sozinho em ação importante: sempre com rótulo. Alvo mínimo 48 px. Seis a oito ícones de marca (olho, mira, lente, retina, relógio, pin, calendário) desenhados a partir do traço do logo.

### 7.4 Logo (TODO: SVG)

Só existem PNG/JPG (`Logo CEMO - Transparente.png`, 1000 × 799, RGBA). **Falta SVG.** Abordagem:
1. Solicitar ao cliente/criador o vetor original (AI/PDF/EPS).
2. Se não existir, **vetorizar** o PNG (ampliar 4x com Lanczos, VTracer/Potrace com 3 cores indexadas `#0066B1`, `#9EC227`, `#27A1CF`), limpar curvas em Figma/Illustrator **sem redesenhar** o logo.
3. Entregar variantes: **colorida** (fundo claro), **branca** (fundo `azul-profundo`; o `#0066B1` tem só 2,46:1 sobre navy), **monocromática navy**, **símbolo isolado** (olho + mira) para favicon, avatar e motivo gráfico.
4. Área de proteção = altura do "O" de CEMO. Largura mínima do logo completo 120 px; abaixo disso (header compacto) usar versão sem a linha "Centro de Microcirurgia Ocular", com `alt="CEMO – Centro de Microcirurgia Ocular"`.
Até lá, usar o PNG otimizado como placeholder.

---

## 8. Layout geral

Grid de 12 colunas (desktop), 8 (tablet), 4 (mobile). Seções alternam `papel` / `nevoa`, com **uma** faixa `azul-profundo` por página (Estrutura ou CTA). Serviços e médicos usam **listas editoriais** (linha com título grande, descrição e link, divididas por borda hairline) tanto quanto cards; no máximo 6 cards por bloco.

---

## 9. Hero da Home (Dr. David na primeira dobra)

### 9.1 Conceito: "o médico em escala, o olho como mira"

Painel-pálpebra à direita na cor do próprio fundo da foto (`estudio` `#C7C8C5`): a foto **se funde ao painel sem recorte do corpo**. O canto superior esquerdo do painel tem a curva assimétrica da pálpebra. Sobre o painel, **a mira** (círculo + cruz, 1,5 px) alinhada ao olhar do doutor, estática. O H1 invade o painel em até ~72 px, sobre área de fundo vazia (9,59:1). Cartão-nome sólido branco na base do painel. Fundo esquerdo `papel`. Sem gradiente, sem glass, sem vídeo.

### 9.2 Desktop (1440 × 900; UtilityBar 40 + Header 80; hero `min-height: clamp(640px, calc(100svh - 120px), 820px)`)

```
+-----------------------------------------------------------------------------+
| UtilityBar: telefone | WhatsApp | endereço | horário                         |
+-----------------------------------------------------------------------------+
| [logo]   Serviços  Exames  Corpo clínico  Convênios  Contato   [Agendar]     |
+-----------------------------------------------------------------------------+
|                                            ________________________________ |
|  Oftalmologia em Taboão da Serra        .-'   painel "estudio" #C7C8C5      |
|                                       .'                                    |
|  Enxergar bem                        /          ---(+)---  <- mira no olhar |
|  muda o seu dia.    (display 64)    |              |                        |
|                                     |       [ Dr. David em 3/4, jaleco ]    |
|  Cirurgia de catarata, retina,      |       altura = 100% do painel,        |
|  glaucoma e exames com tecnologia   |       cabeça a ~10% do topo,          |
|  de ponta, em Taboão da Serra.      |       centrada nas colunas 8-11       |
|  (lead, 56ch)                       |                                       |
|                                     |                                       |
|  [ Agendar consulta ] [ WhatsApp ]  |   +------------------------------+    |
|                                     |   | Dr. David Ribeiro de         |    |
|  Google 4,9 | CRM-SP ... | desde ...  |   | Mendonça Filho               |    |
|  (3 provas em texto 18px)           |   | Diretor Técnico · CRM-SP ... |    |
+-----------------------------------------------------------------------------+
| TrustBar: nota Google | anos de atuação | convênios | equipe                 |
+-----------------------------------------------------------------------------+
Colunas: texto 1-6 | painel 7-12 sangrando até a borda direita da viewport
```

Especificação:
- Painel em `grid-column: 7 / -1`, sangra à direita, altura total do hero, começa abaixo do header (header sólido, sem transparência).
- Foto: `object-fit: cover; object-position: 50% 8%`; largura natural entre 546 e 620 px (limite do arquivo atual, seção 15). Máscara horizontal de 12% nas bordas esquerda/direita dissolve a foto no fundo `estudio` (mesmo tom, sem borda visível). O corpo nunca é recortado nem deformado.
- Mira: SVG de ~420 px centrado entre os olhos do doutor (aprox. x 47%, y 18% da foto), traço 1,5 px `azul-cemo`, `aria-hidden`, posicionado em % da imagem para acompanhar cada breakpoint. Decorativa (3,53:1 sobre o painel).
- H1 `display`, 3 linhas, sem palavra destacada. Lead de 56ch.
- Prova social: 3 itens em linha (nota Google em número + "no Google", CRM do diretor, anos de atuação), 18 px/500. **Números reais a confirmar com o cliente.**
- Entrada: foto em fade 480 ms, texto translateY(12px) → 0 em 480 ms com 120 ms de defasagem; reduced-motion: nenhuma.
- LCP: `<Image priority fetchPriority="high" sizes="(min-width:1280px) 620px, 100vw">`.

### 9.3 Mobile (360 / 390 px, projetado separadamente)

```
+--------------------------+
| [logo]            [Menu] |  header 64 px
+--------------------------+
|        estudio           |
|  +--------------------+  |
|  |  rosto bem         |  |  foto 4:5 sangrando nas laterais,
|  |  enquadrado:       |  |  recorte cabeça + ombros + peito,
|  |  olhos a ~34% da   |  |  object-position 50% 4%,
|  |  altura            |  |  altura ~48svh (máx. 460 px)
|  |                    |  |
|  '-._             _.-'   |  borda inferior = arco-pálpebra (SVG)
|      '-----------'       |
| Dr. David R. M. Filho    |  16 px: "Diretor Técnico · CRM-SP ..."
|                          |
| Enxergar bem muda        |  H1 36 px, 3 linhas
| o seu dia.               |
| Catarata, retina e       |  lead 18-20 px, 2-3 linhas
| glaucoma em Taboão.      |
|                          |
| [   Agendar consulta   ] |  100% largura, 56 px
| [  Falar no WhatsApp   ] |
|                          |
|  Google 4,9 · CRM · ...  |  prova em 1-2 linhas
+--------------------------+
| StickyMobileCTA (depois  |
| de rolar além do hero)   |
+--------------------------+
```

- Pré-gerar o recorte `dr-david-mobile` (4:5, ~720 px de largura, cabeça + tronco) sem alterar o rosto; olhos a ~34% da altura, folga de 8-10% sobre o cabelo.
- Hierarquia: foto → H1 → CTA primário; CTA primário visível sem rolar em 390 × 844 (verificar em protótipo). Sem mira no mobile (limpeza), só o arco-pálpebra.
- Sem UtilityBar no mobile (telefone e WhatsApp ficam no StickyMobileCTA e no rodapé).

---

## 10. Componentes

Convenções: alvos ≥ 48 px; nada só em hover; foco visível (6.1); texto ≥ 16 px.

**Header** — Navegação principal + agendamento. Logo (esq.), nav (centro, `lg`+), botão "Agendar consulta" (dir.). Altura 80 px (64 mobile). Estados: topo sem sombra; rolado `shadow-2`, altura 68, fundo sólido; item ativo com sublinhado 3 px + `aria-current`. A11y: `<header><nav aria-label="Principal">`, skip link, sticky com `scroll-padding-top`.

**UtilityBar** — Barra de 40 px, `azul-profundo`, texto branco 16 px: telefone, WhatsApp, endereço, horário ("Aberto agora" em `verde-cemo`, 7,09:1 sobre navy). Só `lg`+. Links `tel:` e `wa.me`.

**MegaMenu** — Abre por clique/Enter (e hover com atraso de 150 ms em desktop; nunca só hover). Painel de 3 colunas (Serviços, Condições, Exames) + coluna lateral com DoctorCard e CTA; `shadow-3`, `radius-lg`. A11y: botão com `aria-expanded` e `aria-controls`, Esc fecha e devolve o foco, setas navegam, sem trap. Links 18 px com altura 48.

**MobileNav** — Tela cheia em `papel` (legibilidade), botão "Menu" com rótulo visível + ícone (48 px). Grupos em acordeão, CTA fixo no rodapé do painel. A11y: `role="dialog"`, `aria-modal`, foco preso, Esc, retorno de foco, `inert` no fundo, scroll travado.

**Hero** — Seção 9. Props: `headline`, `lead`, `primaryCta`, `secondaryCta`, `proof[]`, `doctor {name, role, crm, image}`. Único H1 da página.

**TrustBar** — Faixa `nevoa` logo abaixo do hero com 4 fatos em texto grande (Literata 600, 32-40 px + rótulo 18 px): nota Google, anos de atuação, convênios, equipe. Sem ícones pequenos, sem contadores animados.

**GoogleRating** — Número grande + 5 estrelas em SVG (24 px, preenchidas em `tinta`, nunca só cor) + "N avaliações no Google" em texto + link ao perfil. `aria-label="Nota 4,9 de 5 no Google, 320 avaliações"` (valores a confirmar).

**ServiceCard** — h3 (Literata), 2 linhas de descrição (18 px), link com texto específico ("Saiba mais sobre catarata"), ícone opcional 32 px, imagem opcional 3:2. Card inteiro clicável pelo link do título (`::after`), sem links aninhados. Estados: hover (`shadow-2`, borda 2 px azul, translateY -2 px), foco, active. Em listas > 4 usar a variante "linha editorial" (sem borda, divisor hairline).

**DoctorCard** — Retrato 4:5 com recorte-pálpebra no topo, nome (h3), especialidade, CRM/RQE, "Ver perfil" e "Agendar". Fundo `nevoa`. Mesmo fundo de estúdio em todas as fotos. Hover: imagem escala 1,02 em 240 ms (só sem reduced-motion). Foco no card.

**DoctorSpotlight** — Bloco grande para o Dr. David (e outros): foto 3:4 em painel `estudio` com recorte-pálpebra à esquerda; à direita nome, cargo, 2 parágrafos (66ch), 3 fatos (formação, CRM/RQE, áreas), citação curta em Literata 28 px, CTA. Repete o dispositivo do hero.

**LeadForm** — Campos: nome, telefone/WhatsApp, interesse (radio grande ou select), melhor horário (opcional), consentimento LGPD (checkbox + link à política, 16 px). Botão "Solicitar contato". Validação ao sair do campo + resumo no envio. Sucesso em texto com `role="status"` ("Recebemos seu pedido. Entraremos em contato em até X horas úteis", prazo a confirmar). Anti-spam Turnstile invisível. Máximo 4 campos + consentimento.

**LeadDrawer** — Painel lateral (desktop: direita, 480 px; mobile: folha inferior 92svh) com LeadForm, aberto pelos CTAs "Agendar consulta". `role="dialog"`, `aria-modal`, foco no título, Esc e botão "Fechar" (48 px, texto + ícone), foco devolvido ao gatilho, entrada 480 ms (instantânea com reduced-motion), `shadow-3`, véu `azul-profundo` 50% sem blur. Sem JS: link para `/agendar`.

**StickyMobileCTA** — Barra fixa inferior só abaixo de `md`: "Agendar" (primário) + botão WhatsApp 56 px. Aparece após o CTA do hero sair da tela (IntersectionObserver). Padding-bottom no body e `scroll-padding-bottom` para não cobrir conteúdo ou foco; respeita safe-area. Fundo `papel` sólido, borda superior hairline, `shadow-2`.

**ReviewCard** — Citação em Literata 20 px (sem itálico), nome, origem "Google", data, estrelas com texto. Fundo `papel` sobre `nevoa`, `radius-lg`, borda hairline. Conteúdo real e atribuído. Sem carrossel automático: grade de 3 (desktop) / lista (mobile) + "Ver mais avaliações".

**VideoFacade** — Pôster 16:9 (`next/image`) + botão play de 72 px com rótulo "Assistir: [título], 2 min". No clique, iframe `youtube-nocookie` com autoplay. Link para transcrição. Sem vídeo no hero.

**FAQAccordion** — Botão-título (dentro de h3, mín. 56 px, 20 px/600), ícone +/− de 24 px, `aria-expanded`, painel 18 px com 66ch. Múltiplos abertos permitidos. Altura anima em 240 ms (zero com reduced-motion). Emite JSON-LD `FAQPage` a partir dos mesmos dados.

**Breadcrumbs** — `nav aria-label="Você está aqui"`, `ol`, 16-17 px, `azul-700`, separador `/` com `aria-hidden`, último item `aria-current="page"`. Quebra em linhas no mobile, sem truncar. JSON-LD `BreadcrumbList`.

**RelatedServices / RelatedDoctors / RelatedConditions / RelatedExams** — Mesmo esqueleto: h2 em frase ("Outros cuidados com a sua visão"), 3-4 itens. Serviços → ServiceCard (linha), Médicos → DoctorCard compacto, Condições e Exames → lista editorial (título + 1 linha + link específico). Ordem por relevância (mesma especialidade primeiro). Sem carrossel.

**ArticleCard** — Imagem 3:2, categoria (texto sentence-case), título h3 (Literata, até 3 linhas), resumo 2 linhas, data e tempo de leitura (16 px), autor médico com CRM. Card inteiro clicável. Grade 3/2/1.

**LocationSection** — Mapa estático (interativo só ao clicar) + endereço, horários (`dl`), telefone, como chegar (transporte/estacionamento), botões "Abrir no Google Maps" e "Ligar". Duas colunas, fundo `nevoa`; fachada em foto 3:2 com recorte-pálpebra. Marcação `MedicalClinic`/`LocalBusiness` consistente.

**InsuranceGrid** — Grade de logotipos em células `papel` com borda hairline, mín. 120 × 64 px, **nome em texto abaixo**; logos em cor original ou cinza escuro (nunca clareados). Sem marquee. Nota "Consulte a cobertura do seu plano" + CTA WhatsApp. Acima de 12 convênios, filtro por texto.

**Footer** — Fundo `azul-profundo`, texto `#E3ECF5` 16-17 px (12,22:1), links brancos com sublinhado visível em repouso. Colunas: logo branca + descrição, serviços, institucional, contato (endereço, telefone, WhatsApp, horário), redes com ícone + texto, CRM do diretor técnico, política de privacidade, CNPJ. Arco-pálpebra na borda superior. Botão "Voltar ao topo" de 48 px.

---

## 11. Do / Don't

**Faça**
- Texto grande, escuro, alinhado à esquerda, com espaço.
- Fotografia real, mesma luz, rostos intactos.
- Um CTA primário por viewport, com rótulos que dizem o que acontece.
- Foco visível, teclado completo, zoom 200%.
- Dados reais (nota, CRM, convênios) confirmados com o cliente.
- Usar mira e pálpebra com parcimônia (4-6 lugares no site).

**Não faça**
- Texto menor que 16 px, cinza claro, peso < 400, verde/ciano como texto sobre claro.
- Hover como único meio de revelar informação.
- Gradientes, glassmorphism, 3D, sombras coloridas, parallax, cursor custom, animação infinita, vídeo no hero, carrossel automático.
- Muitos cards iguais; ícones genéricos de estetoscópio/coração/DNA.
- Eyebrow em caixa-alta, uma palavra destacada no título, "→" nos botões, numeração sem sequência real.
- Recortar, esticar, suavizar ou "melhorar" rostos e corpos.
- Parecer clínica popular (promoções, selos berrantes) ou hospital frio (branco clínico + ciano chapado).

---

## 12. Acessibilidade (checklist de entrega)

WCAG 2.2 AA no mínimo; corpo AAA. Alvos de 48 px (2.5.8 exige 24). Foco não obscurecido por header/StickyMobileCTA (2.4.11). Ajuda consistente (3.2.6): WhatsApp/telefone na mesma posição em todas as páginas. Entrada redundante evitada (3.3.7). `lang="pt-BR"`, landmarks, headings sequenciais, alt, legendas em vídeo, `prefers-reduced-motion`, `prefers-contrast: more`. Testes: axe, Lighthouse a11y ≥ 98, NVDA/VoiceOver, simulação de catarata/baixo contraste, zoom 200-400%.

## 13. Performance

Duas fontes variáveis via `next/font`, só `latin`, preload; ícones em SVG (sem icon-font); LCP ≤ 2,0 s em 4G, CLS < 0,05, INP < 200 ms. Componentes cliente apenas onde necessário (Header/MegaMenu, MobileNav, LeadDrawer, FAQAccordion, StickyMobileCTA); o restante em Server Components.

---

## 14. Bloco Tailwind v4 (`app/globals.css`)

```css
@import "tailwindcss";

@theme {
  /* ---------- Cores ---------- */
  --color-azul-cemo: #0066B1;
  --color-azul-700: #004F8C;
  --color-azul-profundo: #072A4A;
  --color-tinta: #0F2236;
  --color-tinta-suave: #3D4F63;
  --color-papel: #FFFFFF;
  --color-nevoa: #F2F6FA;
  --color-nevoa-2: #E6EEF5;
  --color-estudio: #C7C8C5;
  --color-verde-cemo: #9EC227;
  --color-verde-texto: #4A6A00;
  --color-ciano-cemo: #27A1CF;
  --color-ciano-claro: #8FD3F0;
  --color-sucesso: #1B6E3A;
  --color-erro: #B3261E;
  --color-aviso: #8A5A00;
  --color-whatsapp: #0B6B3A;
  --color-borda: #C9D6E3;
  --color-borda-campo: #6B7F94;
  --color-texto-escuro-suave: #E3ECF5;

  /* ---------- Tipografia ---------- */
  --font-display: var(--font-literata), Georgia, "Times New Roman", serif;
  --font-sans: var(--font-atkinson), system-ui, "Segoe UI", Arial, sans-serif;

  --text-display: clamp(2.25rem, 1.6rem + 2.8vw, 4rem);
  --text-display--line-height: 1.08;
  --text-display--letter-spacing: -0.015em;
  --text-h1: clamp(2rem, 1.5rem + 2.2vw, 3.25rem);
  --text-h1--line-height: 1.12;
  --text-h2: clamp(1.75rem, 1.3rem + 1.8vw, 2.75rem);
  --text-h2--line-height: 1.18;
  --text-h3: clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem);
  --text-h3--line-height: 1.25;
  --text-h4: clamp(1.25rem, 1.2rem + 0.2vw, 1.375rem);
  --text-h4--line-height: 1.3;
  --text-lead: clamp(1.25rem, 1.15rem + 0.4vw, 1.375rem);
  --text-lead--line-height: 1.55;
  --text-body: clamp(1.125rem, 1.1rem + 0.1vw, 1.1875rem);
  --text-body--line-height: 1.65;
  --text-small: 1rem;
  --text-small--line-height: 1.55;
  --text-ui: clamp(1.0625rem, 1.05rem + 0.1vw, 1.125rem);
  --text-ui--line-height: 1.25;

  /* ---------- Espaçamento (base 4px: p-4 = 16px) ---------- */
  --spacing: 0.25rem;

  /* ---------- Raio ---------- */
  --radius-sm: 0.375rem;
  --radius-md: 0.625rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;

  /* ---------- Sombra ---------- */
  --shadow-1: 0 1px 2px rgb(7 42 74 / 0.08), 0 1px 1px rgb(7 42 74 / 0.04);
  --shadow-2: 0 6px 20px -6px rgb(7 42 74 / 0.18);
  --shadow-3: 0 24px 48px -16px rgb(7 42 74 / 0.28);

  /* ---------- Breakpoints ---------- */
  --breakpoint-xs: 24.375rem;  /* 390 */
  --breakpoint-sm: 40rem;      /* 640 */
  --breakpoint-md: 48rem;      /* 768 */
  --breakpoint-lg: 64rem;      /* 1024 */
  --breakpoint-xl: 80rem;      /* 1280 */
  --breakpoint-2xl: 90rem;     /* 1440 */
  --breakpoint-3xl: 110rem;    /* 1760 */

  /* ---------- Container ---------- */
  --container-prose: 45rem;    /* 720 */
  --container-site: 76rem;     /* 1216 */
  --container-wide: 85rem;     /* 1360 */

  /* ---------- Movimento ---------- */
  --duration-instant: 100ms;
  --duration-fast: 160ms;
  --duration-base: 240ms;
  --duration-slow: 480ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
}

@layer base {
  :root { --space-section: 4rem; --gutter: 1.25rem; }
  @media (min-width: 40rem) { :root { --gutter: 1.5rem; } }
  @media (min-width: 48rem) { :root { --space-section: 5rem; } }
  @media (min-width: 64rem) { :root { --space-section: 7rem; --gutter: 2rem; } }
  @media (min-width: 90rem) { :root { --gutter: 2.5rem; } }

  html {
    font-family: var(--font-sans);
    color: var(--color-tinta);
    background: var(--color-papel);
    -webkit-text-size-adjust: 100%;
    scroll-padding-top: 6rem;
    scroll-padding-bottom: 6rem;
  }
  body { font-size: var(--text-body); line-height: 1.65; text-wrap: pretty; }
  h1, h2, h3 {
    font-family: var(--font-display);
    font-weight: 600;
    text-wrap: balance;
    color: var(--color-tinta);
  }
  :focus-visible {
    outline: 3px solid var(--color-azul-cemo);
    outline-offset: 2px;
    box-shadow: 0 0 0 5px var(--color-papel);
  }
  .on-dark :focus-visible { outline-color: var(--color-verde-cemo); box-shadow: none; }

  @media (prefers-contrast: more) {
    :root { --color-tinta-suave: #0F2236; --color-borda-campo: #3D4F63; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}

@utility radius-lid { border-top-left-radius: 40% 55%; }
@utility min-target { min-height: 3rem; min-width: 3rem; }
```

Fontes (`app/layout.tsx`, referência): `Literata({ subsets: ['latin'], variable: '--font-literata', display: 'swap' })` (variável; usar 500/600) e `Atkinson_Hyperlegible_Next({ subsets: ['latin'], variable: '--font-atkinson', display: 'swap' })` (confirmar nome do export).

---

## 15. Foto do Dr. David (análise do arquivo)

Salva em `_materiais/fotos/dr-david.jpeg`.

- **Dimensões:** 853 × 1280 px (2:3), RGB, sem metadado de DPI. **47 KB: muito comprimido** (~0,34 bits/px).
- **Fundo:** cinza liso de estúdio, **uniforme** (amostras dos cantos e topo: RGB 197-202 / 198-202 / 193-197, média ≈ `#C6C7C4`; token `estudio`). Ideal para fundir ao painel.
- **Enquadramento:** corpo 3/4 (cabeça até a coxa), centralizado, sorrindo, mãos nos bolsos, jaleco CEMO com nome bordado. Cabeça com ~200 px de largura (~23% da largura do arquivo); **headroom ≈ 7% (~90 px)** acima do cabelo; ~16% de fundo livre em cada lado.
- **Recortes possíveis:** (a) hero desktop: arquivo inteiro, ancorado embaixo; (b) mobile 4:5: x 60-790, y 0-910 (cabeça + tronco); (c) card 4:5: y 0-1000, rosto no terço superior; (d) avatar 1:1: y 70-470, só até ~220 px de exibição.
- **Veredito de resolução:** **insuficiente para 2x** em hero desktop. Exibida a 620 px de largura, a imagem é 1,37x (nítida em DPR 1, aceitável em 1,5, suave em retina). Em 800-900 px (o pedido do briefing), fica 0,95-1,07x do arquivo: borrada em tela retina, com artefatos JPEG visíveis no tecido e no bordado. Para 2x a 800 px é preciso arquivo com ≥ 1600 px de largura (≈ 1600 × 2400).
- **Recomendações:** (1) **pedir o original** (JPEG/RAW ≥ 2400 px de altura, sem compressão de WhatsApp/Drive); (2) até lá, limitar o hero a ≤ 620 px de largura, sem upscaling por IA (altera o rosto); (3) mobile: o recorte 4:5 tem ~730 px de largura e será exibido a 360-390 px (≈ 1,9x): ok até DPR 2.

---

## 16. Riscos e pendências

1. **Resolução da foto do Dr. David** (seção 15) e das 6 fotos de equipamento (WhatsApp) são o maior risco para o "parecer caro". Solicitar originais.
2. **SVG do logo** inexistente (7.4). Verde e ciano reprovam como texto: nunca usar para informação.
3. **Dados reais** para TrustBar, GoogleRating, convênios, CRM: não inventar.
4. **Atkinson Hyperlegible Next** no `next/font`: validar nome; fallback definido.
5. **Painel `estudio` cinza** pode parecer "sujo" ao lado de branco: validar em protótipo; plano B: levar o fundo da seção para `nevoa-2` ao redor do painel, ou refotografar com fundo azul-profundo.
6. **Mira sobre a foto**: validar alinhamento por breakpoint (SVG posicionado em % da imagem).
7. **Aprovação do cliente** dos dispositivos pálpebra e mira (derivados do logo) antes de produzir assets.

---

## 17. Design v2 — "Foco" (fase 2, 2026-10-22)

Evolução aprovada pelo pedido do cliente de um design "mais criativo e otimizado". Tokens, tipografia e paleta continuam
os mesmos; mudam os dispositivos de marca e a composição.

| Dispositivo | Onde | Regra |
|---|---|---|
| **Lente de prova** (anéis de Plácido + arco 0°–180°) | Hero da Home (assinatura, um lugar só); eco discreto no CTA final, no topo das páginas internas e na moldura dos retratos | Linhas de 1–1,25 px em `azul-cemo` (claro) ou `ciano-cemo` (escuro), opacidade baixa; anéis mais próximos na periferia; desenho único no carregamento, só com `prefers-reduced-motion: no-preference` |
| **Recorte do retrato** | Hero (Dr. David de corpo inteiro), cartões e perfis | Só o fundo de estúdio sai (modelo BiRefNet local, `scripts/portraits/`); nada no rosto ou no corpo. Revisa a decisão do §1.3 ("não recortar"), cujo risco era alterar o corpo |
| **Moldura em arco** (`PortraitFrame`) | Todos os retratos | Campo `nevoa-2`, topo em arco (a pálpebra do logo), 4:5, anéis a 12% ao fundo |
| **Tabela de leitura** | "Como podemos cuidar da sua visão?" | Linhas inteiras clicáveis; três tamanhos (ênfase 1–3) que caem como numa tabela de acuidade; o menor ≥ 22 px |
| **Vídeo vertical** (`VideoCard`) | Blocos editoriais, páginas comerciais, hubs, perfis | 9:16, pôster + botão; player só no clique; quem fala + duração; transcrição em `<details>` |
| **Resposta direta** | Topo de toda página de conteúdo médico | Caixa `nevoa` com filete azul à esquerda, pergunta como h2, 40–100 palavras |
| **Jornada numerada** | Só onde o conteúdo é sequência real (etapas do paciente) | Círculo com número em Literata + filete vertical |

Removidos por serem "cara de template": eyebrows em caixa-alta com tracking, metadados unidos por "·", cards idênticos
para conteúdo que não é coleção, faixa de números duplicada logo abaixo do hero (os números viraram a base do hero).

Header: logo horizontal (o subtítulo fica legível); menu completo a partir de 1280 px, gaveta abaixo disso.
