// OpenNext for Cloudflare — Next.js 16 앱을 Cloudflare Workers에서 실행.
// ISR/SSG 증분 캐시는 R2(NEXT_INC_CACHE_R2_BUCKET)에 저장 → Notion ISR(revalidate=300) 동작.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  // ISR(revalidate=300) 재검증 큐. 미설정 시 dummy 큐가 throw하여("Dummy queue is not
  // implemented") stale 페이지가 갱신되지 않거나 폴백으로 잘못 재생성된다. memory-queue는
  // WORKER_SELF_REFERENCE 서비스 바인딩(wrangler.jsonc)으로 자기 워커를 호출해 백그라운드 재검증한다.
  queue: memoryQueue,
});
