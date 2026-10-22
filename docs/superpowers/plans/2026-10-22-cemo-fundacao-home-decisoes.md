# Decisões de execução — Fundação + Home (2026-10-22)

Registro integral das decisões ("rulings") tomadas durante a implementação do plano `2026-10-22-cemo-fundacao-home.md`, da revisão final e dos itens menores adiados. Cada linha: o que foi decidido — por quê — custo se estiver errado.

## Decisões

- Setup: Ruling: repo has no commits (unborn main) so no worktree possible; work on new branch feat/fundacao-home in place — main stays untouched — cost if wrong: none, branch can be moved to a worktree later.
- Task 1: Ruling: vite-tsconfig-paths removed; vitest uses native `resolve.tsconfigPaths: true` — Vite 8/Vitest 5 warns the plugin is redundant (pristine output) — cost if wrong: re-add one plugin.
- Task 1: Ruling: package.json `"type":"module"` — Node 24 runs .ts/.mjs scripts as ESM per plan note — cost if wrong: rename config files to .cjs.
- Task 1: Ruling: dev-only audit findings (braces, phin via potrace/jimp) accepted; prod deps `npm audit --omit=dev` = 0 — dev tooling never ships — cost if wrong: swap potrace for another tracer.
- Task 2: Ruling: Atkinson_Hyperlegible_Next exists in next/font (variable wght 200–800) → used; Next has no fallback override metrics for it (build warning) → `adjustFontFallback:false` + explicit fallback Arial/system-ui — CLS to be measured in Task 17 — cost if wrong: small CLS on font swap; fix with manual @font-face size-adjust.
- Task 2: Ruling: Tailwind v4 has no `--duration-*` utility namespace → Button uses `duration-[var(--duration-fast)]` — cost if wrong: none.
- Task 2: Ruling: visual font check done via build artifacts (self-hosted .woff2 in .next/static/media, 0 fonts.googleapis refs in index.html) instead of opening dev server — same evidence, less context — cost if wrong: none.
- Task 2: Ruling: added .gitattributes (`* text=auto eol=lf`, binaries) to stop CRLF churn on Windows — cost if wrong: none.
- Task 3: Ruling: equipment lives in `src/content/fixtures/equipment.ts` (starts []), filled by Task 4 — brief said "read from assets.ts when it exists"; a fixture keeps the adapter static and typed — cost if wrong: Task 4 writes to a different file.
- Task 3: Ruling: doctors fixture generated from _materiais/analise/site-entities.json (credentials transcribed verbatim); Roberta's areas normalized to ["Glaucoma clínico e cirúrgico","Catarata"] (naive split broke "Glaucoma Clínico, Cirúrgico e Catarata") — cost if wrong: wording tweak.
- Task 3: Ruling: no-hardcoded-facts guard passes before implementation by nature; proven able to fail with a temporary probe file (1 failed → removed → green).
- Task 4: Ruling: equipment photos downloaded with curl from drive.usercontent.google.com (folder is link-shared) instead of the Drive connector base64 path — same files (200 image/jpeg), avoids ~6× large base64 payloads — cost if wrong: none.
- Task 4: Ruling: mobile crop is 728×910 at x=62 (exact 4:5) instead of 730×910 (0.802, outside the 4:5 test tolerance) — still pure crop, face centered — cost if wrong: 2px.
- Task 4: Ruling: photos 3≈4 and 5≈6 are near-duplicate angles; all 6 kept in assets, TechStructure (Task 15) should feature distinct ones (1,2,3,5) — cost if wrong: visual repetition.
- Task 5: Ruling: SVG traced from the TRIMMED logo (+8px pad) with viewBox 648×508 instead of 1000×799 — the PNG has ~35% transparent margin that would shrink the mark in the header; QA test uses the same trim — cost if wrong: none (silhouette IoU ≥ 0.97 vs original, visual side-by-side approved in _materiais/logo-qa.png).
- Task 5: Ruling: coordinates rounded to 1 decimal at 4× scale → SVG 77 KB raw / 29 KB gzip (was 100 KB); acceptable for a non-LCP header image — cost if wrong: simplify with higher turdSize/optTolerance later.
- Task 5: Ruling: Logo uses plain <img> (eslint no-img-element disabled inline) — static SVG gains nothing from next/image — cost if wrong: none.
- Task 6: Ruling: CookieBanner uses useSyncExternalStore (server snapshot 'unknown') instead of setState-in-effect — React compiler lint rule forbids sync setState in effects; also avoids hydration mismatch — cost if wrong: none.
- Task 6: Ruling: consent default is an inline <script> in GtmScript instead of next/script beforeInteractive (lint: pages-only strategy) — same ordering (HTML-initial, before GTM loader afterInteractive) — cost if wrong: none; requires CSP 'unsafe-inline' (already planned in Task 7).
- Task 6: Ruling: vitest `env.__NEXT_TRAILING_SLASH='true'` mirrors next.config trailingSlash for next/link in tests; Task 2 Button test href updated to '/consulta-oftalmologica/' (site convention) — cost if wrong: none.
- Task 6: Ruling: extra test file events.node.test.ts covers "sem window não lança" in a node environment (jsdom always has window) — cost if wrong: none.
- Task 7: Ruling: removed `medicalSpecialty` from the clinic node (I had added "Optometric") — schema.org has no ophthalmology value and optometry is a different (sensitive) profession; guard added to jsonld test — cost if wrong: none.
- Task 7: Ruling: jsonld test file is .tsx (renders JsonLd) — cost if wrong: none.
- Task 7: Ruling: next.config imports src/lib via relative paths (alias not available in config) — cost if wrong: none.
- Task 8: Ruling: normalizePath lives in src/lib/redirects/normalize.ts (re-exported by build.ts) so the proxy bundle never imports csv-parse (devDependency) — cost if wrong: none.
- Task 8: Ruling: relative imports inside src/lib/redirects use explicit `.ts` extensions (generator runs under Node type-stripping) — cost if wrong: none.
- Task 8: Ruling: stats.hostOnlyDropped also counts format-only variants (no slash/uppercase) and same-target duplicates from GSC-only rows (19 total); conflicting duplicates throw — brief assumed only www rows — cost if wrong: stat naming only.
- Task 8: Ruling: resolver compares normalized key with decoded pathname and encodes the Location (avoids redirect loop on %-encoded paths) — cost if wrong: none.
- Task 8: Ruling: host/proto rule only when target truly differs: host === `www.${siteHost}` or (site is https && x-forwarded-proto=http). Found by curl: `next start` sends x-forwarded-proto=http → every page 301'd to itself (loop). Regression test src/proxy.test.ts RED→GREEN — cost if wrong: none.
- Task 8: Ruling: skipTrailingSlashRedirect:true (curl showed 308 then 301) — trailing slash now added by proxy in the same single 301 — verified with curl (/contato-2 → 301 /contato/).
- Task 8: Ruling: extra test file src/proxy.test.ts (5 tests) beyond brief — cost if wrong: none.
- Task 9: Ruling: sanitizeText turns whitespace controls (\n \t) into spaces and removes the other control chars — brief said "remove controles"; collapsing line breaks to spaces keeps names readable — cost if wrong: none.
- Task 9: Ruling: name must match /^[\p{L}\p{M}][\p{L}\p{M}' .-]*$/u after sanitizing (2–80 chars) — "<script>…" is rejected rather than stored sanitized — cost if wrong: unusual names with digits rejected (none expected).
- Task 9: Ruling: attribution is optional and lenient (missing → empty strings) so blocked storage never blocks a lead (RF-2) — cost if wrong: none.
- Task 9: Ruling: webhook 4xx → retryable:false, 5xx/429/network/timeout → retryable:true; any unexpected handler error → 400 bad_request (never 500) — cost if wrong: status semantics only.
- Task 10: Ruling: LeadForm POSTs to '/api/lead/' (trailing slash, site convention; proxy bypasses /api) — test accepts /^\/api\/lead\/?$/; e2e in Task 17 confirms — cost if wrong: one string.
- Task 10: Ruling: client validation reuses validateLeadInput (zod in the client bundle, per Consumes) — cost if wrong: a few KB of JS on pages with the form; swap for a zod-free validator if the perf budget complains in Task 17.
- Task 10: Ruling: required fields say "(obrigatório)" in the label (design-system §6.3); FieldError hoisted to module scope (lint: no components created during render); honeypot wrapper is aria-hidden + off-screen.
- Task 10: Ruling: a code comment with the real WhatsApp number tripped the no-hardcoded-facts guard → replaced with a fictitious example (guard working as intended).
- Task 11: Ruling: header shrink/shadow via CSS scroll-driven animation (`animation-timeline: scroll(root)` + registered `--header-h`) instead of IntersectionObserver — zero JS, same visual; unsupported browsers keep a static 80px header — cost if wrong: no shrink on Firefox.
- Task 11: Ruling: OpenNowBadge uses useSyncExternalStore (server snapshot null, 60s tick) — avoids setState-in-effect lint and hydration mismatch.
- Task 11: Ruling: ArrowDown focus handled by a post-commit effect (focusOnOpen ref) — focusing inside a still-hidden panel fails in real browsers.
- Task 11: Ruling: "Ver todos os tratamentos" (/tratamentos/) and "Ver todos os exames" labels chosen by me; brief only fixed the specialties label — cost if wrong: copy tweak.
- Task 12: Ruling: Header keeps rendering UtilityBar (Task 11 shape) — layout renders Header only, same DOM order as the brief — cost if wrong: none.
- Task 12: Ruling: TrackedLink adds rel="noopener" by default to external http(s) links (Footer test caught WhatsApp link without rel) — cost if wrong: none.
- Task 12: Ruling: MobileNav focus trap ignores focusables inside [hidden] accordion panels (test caught focus escaping); portal mounted via useSyncExternalStore client flag; StickyMobileCTA visibility via useSyncExternalStore + IntersectionObserver (no setState in effects).
- Task 12: Ruling: viewport check done with a Playwright script on the production build instead of manual dev inspection — 0px horizontal overflow at 360/390/820/1280/1440; sticky hidden while consent pending.
- Task 13: Ruling: reticle moved OFF the doctor's face (design §9 centered it between the eyes) — visual QA showed crosshair-on-head reads as a gun scope; now a small brand motif on the panel near the lid curve — cost if wrong: client may want the original concept; one class change.
- Task 13: Ruling: mobile hero photo h-[min(32svh,300px)], eyebrow hidden below lg, tighter spacing — required for CTA above the fold (390×844 → 774px; 360×740 → 738px), measured with Playwright on the production build.
- Task 13: Ruling: header Logo no longer `priority` (it had fetchpriority=high competing with the hero LCP image).
- Task 13: Ruling: Reticle accepts data-* attrs and uses vector-effect non-scaling-stroke (1.5px at any size); GoogleRating gets optional `location` prop (default 'rating').
- Task 13: Ruling: hero preload media split '(min-width: 1024px)' / '(max-width: 1023.98px)' so only one source is fetched per device.
- Task 14: Ruling: the 4 component test files of the brief consolidated into src/components/home/HomePartA.test.tsx (7 tests, same assertions); ServiceCard link text asserted against fixture ctaLabel ("Saber mais sobre …") rather than the brief's example wording — cost if wrong: none.
- Task 14: Ruling: DoctorSpotlight exports `initials()` (monogram) for reuse by DoctorCard in Task 15.
- Task 15: Ruling: equipment captions are single-line, varied and generic (no device names) instead of "name + patient meaning" 2-line captions — device identity unvalidated — cost if wrong: copy update when CEMO identifies devices.
- Task 15: Ruling: TechStructure = anchor + 2 side details + row of 3 (design §7.2) after visual QA showed an empty area with 5 stacked details; still 1 anchor + 5 details (test).
- Task 15: Ruling: FinalCta uses a fixed lid radius (rounded-tl-[6rem_4rem] / lg [14rem_9rem]) + larger top padding — radius-lid clipped the H2 (white on white) — cost if wrong: none.
- Task 15: Ruling: section ids added for page order test: inicio, agendar, especialidades, catarata, refrativa, diretor-tecnico, estrutura, corpo-clinico, avaliacoes, convenios, localizacao, conteudos, agende (video omitted while unpublished).
- Task 15: Ruling: component tests consolidated in HomePartB.test.tsx (one describe per component) + src/app/page.test.tsx.
- Task 16: Ruling: LegalPage takes an extra `path` prop (needed for its breadcrumb); Breadcrumbs reads the canonical domain from the site-settings fixture (sync component; same domain the Home JSON-LD uses) — cost if wrong: when a CMS adapter lands, pass siteUrl as a prop.
- Task 16: Ruling: consent.ts gains CONSENT_CHANGE_EVENT + resetConsent() (used by /cookies/ "Alterar minhas preferências"); CookieBanner listens to the shared event.
- Task 17: Ruling: viewport targeting via playwright.config `testMatch` per project (test.skip callback form has no testInfo) — seo/lead/redirects only on desktop-1440; a11y on 1440+390.
- Task 17: Ruling: 3101 server also gets SITE_ENV=production (otherwise dev provider masks fail-closed); fail-closed asserted via API 503 + UI fallback; added `build:e2e`/`test:e2e` scripts.
- Task 17: Ruling: e2e found real a11y bugs → fixed: GoogleRating `<p aria-label>` → role="img"; footer links min-w-12. Test-method fixes: 404 has Next's own noindex meta + ours (assert all contain noindex); 200% zoom tested as 640px viewport (CSS zoom on <html> measures in mixed units).
- Task 17: Ruling: Lighthouse run with --blocked-url-patterns="*kaspersky-labs.com*" — local antivirus injects ~850KB render-blocking assets; did NOT touch the machine's AV. Results: desktop 99/100/73/100 (LCP 0.9s), mobile 80/100/73/100 (LCP 4.5s simulated). Best-practices 73 = http + prefetch 404 of /corpo-clinico/ (future route).
- Task 17: Ruling: perf fixes applied from Lighthouse: Literata without opsz axis (110→53KB), favicon via src/app/icon.svg (console 404), zod z.config({ jitless: true }) (CSP eval violation from JIT probe).

## Revisão final

- Final review: opus reviewer — 0 Critical, 4 Important, 14 Minor. Re-graded by effect: promoted 4 minors (429 hides WhatsApp; proto-based redirect loop risk; menu stays open on focusout; HSTS includeSubDomains/preload).
- Final: fixed RF-2 consent stuck with blocked storage — consent.test "writeConsent + readConsent funcionam com getItem/setItem lançando" + CookieBanner.test "Aceitar fecha o banner mesmo sem conseguir salvar" RED→GREEN, suite 397/397
- Final: fixed curly apostrophe rejected in names — schema.test "fix: apóstrofo tipográfico" ×3 + sanitize.test "normaliza apóstrofos" RED→GREEN, suite 397/397
- Final: fixed fail-open dev provider on missing runtime SITE_ENV — handler.test "fix: provider de desenvolvimento só com opt-in" ×3 + env.test "fix: allowDevLeadProvider" ×3 RED→GREEN, suite 397/397
- Final: fixed CSP blocking Google Ads/Meta via GTM — headers.test "fix: CSP para Google tag/Ads e Meta Pixel" ×4 RED→GREEN, suite 397/397
- Final: fixed 429 without WhatsApp fallback (promoted) — LeadForm.test "fix: 429 também oferece o WhatsApp" RED→GREEN, suite 397/397
- Final: fixed proto-based redirect loop risk (promoted) — proxy.test "fix: produção não redireciona só pelo x-forwarded-proto" RED→GREEN, suite 397/397
- Final: fixed mega menu open after focus leaves (promoted, WCAG 2.4.11) — NavMenu.test "fix: foco de teclado sai do menu" RED→GREEN, suite 397/397
- Final: fixed HSTS includeSubDomains/preload without owner sign-off (promoted) — headers.test "fix: HSTS só max-age" RED→GREEN, suite 397/397; e2e 53 passed / 8 skipped after fixes.

## Itens menores adiados

- /-/ path normalizes to // and proxy throws → 500 (collapse slashes after hyphen trim).
- e2e fail-closed UI on :3101 hits 403 (Origin mismatch, NEXT_PUBLIC_SITE_URL inlined) instead of 503 — API-level 503 is asserted separately.
- lead body read before size cap for chunked bodies without content-length; exclude /api from proxy matcher.
- rate-limit key uses first x-forwarded-for hop (client-controlled behind some proxies) — use platform client-IP header once host is chosen.
- cookie banner (~200px at 360px) may obscure focused element while consent pending — raise scroll-padding-bottom while pending (unverified).
- StickyMobileCTA observes only the hero present at mount (client-side return to Home).
- LeadForm aria-describedby points to the summary id before it exists.
- DoctorCard imports initials() from home/DoctorSpotlight (layer inversion).
- lucide-react is an unused dependency.
- webhook response body never consumed.
