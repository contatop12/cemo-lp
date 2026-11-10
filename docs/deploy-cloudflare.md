# Deploy no Cloudflare Workers — CEMO

Para quem configura o Cloudflare e publica o site. O projeto usa o adaptador **OpenNext** (`@opennextjs/cloudflare` 1.20.13) e o **Workers Builds** (deploy automático a cada push na `main`).

## Ambiente atual

- **Staging:** https://cemo-lp.contato-097.workers.dev — conta Cloudflare "Contato P12", Worker `cemo-lp`, primeiro deploy em 2026-10-22 (manual, `npm run deploy`, versão `d8c63daa`). Conferido no ar: redirects 301 em um salto, 410, noindex em três camadas, hero em AVIF, fontes, CSP sem violações, API de leads falhando fechado (sem webhook ainda).
- Build variables usadas: `SITE_ENV=staging`, `NEXT_PUBLIC_SITE_URL=https://cemo-lp.contato-097.workers.dev`.

## Como o build funciona

| Etapa (Workers Builds) | Comando | O que faz |
|---|---|---|
| Install | `npm ci` (automático, pelo `package-lock.json`) | Instala as dependências travadas |
| Build | `npm run build` | `next build` e depois `opennextjs-cloudflare build --skipNextBuild` → gera `.open-next/worker.js` e `.open-next/assets/` |
| Deploy | `npx wrangler deploy` | Publica o Worker `cemo-lp` descrito em `wrangler.jsonc` |

Arquivos envolvidos: `wrangler.jsonc` (Worker, bindings, variável `SITE_ENV`), `open-next.config.ts` (cache em assets estáticos — o site é 100% SSG, não precisa de R2/KV), `next.config.ts` (`output: 'standalone'`).

O nome **`cemo-lp`** precisa ser igual no painel, em `package.json`, em `wrangler.jsonc` (`name`) e na auto-referência (`services[].service`). Se o Worker no painel tiver outro nome, troque nos três arquivos.

## Por que o primeiro deploy falhou

```
Cloning repository...
Failed: error occurred while fetching repository
```

O repositório `contatop12/cemo-lp` no GitHub ainda está **vazio** — o código só existe localmente. Também vale conferir em **GitHub → Settings → Applications → Cloudflare Workers and Pages** se o app do Cloudflare tem acesso a esse repositório.

## Passo a passo (staging)

1. **Publicar o código** (no terminal do projeto):
   ```bash
   git push -u origin main
   ```
2. **Painel do Cloudflare → Workers & Pages → `cemo-lp` → Settings → Build:**
   - Git repository: `contatop12/cemo-lp`, branch de produção `main`
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy` (padrão)
   - Root directory: `/`
3. **Build variables** (mesma tela, "Variables and secrets" do build) — são lidas no `next build`:
   - `SITE_ENV` = `staging`
   - `NEXT_PUBLIC_SITE_URL` = URL pública do staging, sem barra final (ex.: `https://cemo-lp.<seu-subdominio>.workers.dev`)
   - `NODE_VERSION` = `24` (o `.nvmrc` já indica 24; a variável garante)
4. **Variáveis do Worker (runtime):** `SITE_ENV=staging` já vai no `wrangler.jsonc` (o deploy sobrescreve variáveis em texto do painel com as do arquivo). Para **receber leads**, cadastre como **secrets** (Settings → Variables and Secrets → Add → Secret), que o deploy preserva:
   - `LEAD_WEBHOOK_URL` — endpoint do CRM/automação (ex.: webhook do n8n)
   - `LEAD_WEBHOOK_SECRET` — valor enviado no header `X-Webhook-Secret`

   Sem webhook, o formulário **falha fechado** (mostra a opção de WhatsApp e não registra nada). Para uma demonstração sem CRM, pode-se definir `LEAD_PROVIDER=dev` — os leads ficam só na memória do Worker e **são perdidos**; nunca usar em produção (o código bloqueia em `SITE_ENV=production`).
5. **Imagens:** o binding `IMAGES` (Cloudflare Images) gera AVIF/WebP da foto do hero e das demais imagens. Confirme que o Images está habilitado na conta (há cota gratuita de transformações; acima dela é cobrado). Sem o binding o site funciona, mas serve as imagens originais.
6. **Disparar o deploy:** cada push na `main` dispara build + deploy. Acompanhe o log em Deployments.

## Conferência após o deploy (staging)

- `/robots.txt` → `Disallow: /`; HTML com `noindex, nofollow` e header `X-Robots-Tag: noindex, nofollow`.
- `/contato-2/` → 301 para `/contato/`; `/post-list/` → 410.
- Formulário: com webhook, chega ao CRM e leva a `/obrigado/`; sem webhook, mostra "Falar no WhatsApp".
- Foto do hero servida como `image/avif` em `/_next/image/…`.

Tudo isso foi verificado localmente no `workerd` (`npm run preview`) antes do primeiro deploy.

## Atenção

- **Middleware Node.js experimental no OpenNext:** o `src/proxy.ts` (redirects 301/410 do mapa de migração) roda como middleware Node.js, que o OpenNext marca como experimental no Cloudflare. Funcionou no teste local; acompanhar os logs (Observability) após o deploy e conferir alguns redirects.
- **Build no Windows:** o OpenNext recomenda Linux/WSL para builds locais. O Workers Builds roda em Linux, sem esse problema.
- **Produção (depois dos portões de lançamento em `docs/seo-checklist.md`):** trocar para `SITE_ENV=production` (build **e** `wrangler.jsonc`), `NEXT_PUBLIC_SITE_URL=https://oftalmologiacemo.com.br`, adicionar os domínios personalizados `oftalmologiacemo.com.br` e `www.oftalmologiacemo.com.br` ao Worker (o código redireciona `www` → apex), ativar "Always Use HTTPS" na zona e configurar os secrets de lead e o GTM.

## Deploy manual a partir de uma máquina (alternativa ao Workers Builds)

1. Copie `.env.cloudflare.example` para **`.env.cloudflare`** e preencha `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` (o arquivo é ignorado pelo git).
2. Defina no shell as variáveis de build do ambiente (ex.: `SITE_ENV=staging`, `NEXT_PUBLIC_SITE_URL=...`).
3. `npm run cf:whoami` (confere o token) e depois `npm run deploy`.

**Nunca coloque credenciais do Cloudflare em `.env`, `.env.local` ou `.env.production`.** O OpenNext embute os valores desses arquivos no Worker publicado (`.open-next/cloudflare/next-env.mjs`) — o token ficaria dentro do código do site. O `npm run deploy` usa `scripts/cloudflare-env.mjs`, que carrega `.env.cloudflare` só para o wrangler e **bloqueia o deploy** se encontrar variáveis `*CLOUDFLARE*` nos arquivos lidos pelo build.

## Vídeos no R2 (bucket `cemo-videos`)

Os vídeos não ficam no repositório nem nos assets do Worker: os assets estáticos do Workers não atendem pedidos de
trecho (`Range`) e o Safari do iPhone só toca vídeo com resposta `206`. Fluxo:

1. `node scripts/encode-videos.mjs` → `media/videos/<id>.webm` (AV1 + Opus) e `<id>.mp4` (H.264 + AAC, faststart),
   540×960, 30 fps, áudio normalizado; pôster em `public/videos/<id>-poster.jpg`. `media/` é ignorado pelo git.
2. `npm run videos:upload` → envia tudo para o R2 `cemo-videos` (credenciais só do `.env.cloudflare`; o token precisa
   de "Workers R2 Storage: Edit").
3. O Worker lê pelo binding `VIDEOS` (`wrangler.jsonc`) na rota `/v/<arquivo>` (`src/app/v/[file]/route.ts`), que
   responde `206` com `Content-Range`. O player oferece o AV1 primeiro e o MP4 como alternativa.

Novo vídeo: copiar o original para `_materiais/videos/src/`, incluir o id em `scripts/encode-videos.mjs`, codificar,
enviar e cadastrar em `src/content/fixtures/videos.ts` (com transcrição) — não precisa de novo deploy só pelo arquivo.

## Produção (https://oftalmologiacemo.com.br) — migração de 10/11/2026

**Como está montado.** O domínio continua no Cloudflare (zona `oftalmologiacemo.com.br`, conta Contato P12). O
registro A do apex (com proxy) segue apontando para a hospedagem do WordPress na UOL, e o `www` é CNAME com proxy
para o apex. O site novo entra por **Workers Routes** (`oftalmologiacemo.com.br/*` e `www.oftalmologiacemo.com.br/*`)
do Worker `cemo-producao` (`env.production` no `wrangler.jsonc`): a rota intercepta a requisição antes da
hospedagem. DNS e e-mail (MX, IMAP, SMTP, webmail da UOL) **não mudam**. O TXT de verificação do Search Console fica.

**Deploy de produção:** `npm run deploy:producao` (build com `SITE_ENV=production`, URL canônica, GTM-PH3D5ZS e o
pixel da Meta fora do GTM; token `CLOUDFLARE_API_TOKEN_ZONA_CEMO` do `.env.cloudflare`, o único com permissão na zona).
Só build: `npm run build:producao`.

**Segredos em runtime** (sem novo deploy): `LEAD_WEBHOOK_URL` e `LEAD_WEBHOOK_SECRET` no Worker `cemo-producao`
(`npx wrangler secret put LEAD_WEBHOOK_URL --env production` pelo `scripts/cloudflare-env.mjs`). Sem webhook o
formulário falha fechado e oferece o WhatsApp.

**Configurações da zona ajustadas na troca:** "Always Use HTTPS" ligado (HTTP → HTTPS no Cloudflare; o Worker não
decide protocolo) e "Email Obfuscation" desligado (reescreve o HTML e quebra a hidratação do React).

**Voltar ao WordPress (segundos, sem mexer em DNS):** apagar as duas rotas do Worker `cemo-producao`
(Painel → Workers Routes, ou `DELETE /zones/<zona>/workers/routes/<id>`). O WordPress na UOL volta a responder na
hora. Para desfazer as configurações: Always Use HTTPS = off, Email Obfuscation = on (valores anteriores em
`_materiais/backup-migracao-2026-11-10/cloudflare/settings.json`).

**Backups (fora do git, em `_materiais/backup-migracao-2026-11-10/`):** zona do Cloudflare (DNS em JSON e BIND,
configurações, regras), Search Console (páginas de 16 e 3 meses, Imagens), sitemaps e o HTML das 428 páginas do
WordPress, e a validação das 551 URLs contra o build de produção.

**Conferência depois da troca:** `/`, `/robots.txt` e `/sitemap.xml` no domínio; amostra das URLs antigas (200,
301 e 410); `www` → apex; GTM e conversões do Ads (telefone, WhatsApp e `/obrigado/`); envio do sitemap novo no
Search Console.
