import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

// Site 100% estático (SSG, sem revalidação): as páginas pré-renderizadas saem dos assets do Worker,
// sem precisar de bucket R2/KV. Trocar por r2IncrementalCache se houver ISR no futuro.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
