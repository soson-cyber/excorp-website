// Cloudflare 존 캐시 전체 퍼지 — cf:deploy 마지막 단계에서 자동 실행.
// 페이지 HTML이 s-maxage=1y로 엣지 캐시되므로, 퍼지 없이는 배포 후에도 옛 페이지가 서빙된다.
// 필요 env(.env.local): CLOUDFLARE_ZONE_ID, CLOUDFLARE_CACHE_TOKEN(Zone>Cache Purge 권한)
import { readFileSync } from "node:fs";

for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.+)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
}

const zone = process.env.CLOUDFLARE_ZONE_ID;
const token = process.env.CLOUDFLARE_CACHE_TOKEN;
if (!zone || !token) {
  console.warn("[cf-purge] CLOUDFLARE_ZONE_ID/CLOUDFLARE_CACHE_TOKEN 미설정 — 퍼지 생략 (배포 반영이 지연될 수 있음)");
  process.exit(0);
}

const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone}/purge_cache`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({ purge_everything: true }),
});
const body = await res.json();
if (!body.success) {
  console.error("[cf-purge] 퍼지 실패:", JSON.stringify(body.errors));
  process.exit(1);
}
console.log("[cf-purge] excorp.kr 엣지 캐시 퍼지 완료");
