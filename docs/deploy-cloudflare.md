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
