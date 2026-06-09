// OpenNext for Cloudflare — Next.js 16 앱을 Cloudflare Workers에서 실행.
// ISR/SSG 증분 캐시는 R2(NEXT_INC_CACHE_R2_BUCKET)에 저장 → Notion ISR(revalidate=300) 동작.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});
