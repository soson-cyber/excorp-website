import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

// 스펙 10(2026-10-01): /xr-live 페이지를 /xr-studio로 옮기고 옛 주소는 301로 넘긴다.
// 실제 요청 동작은 렌더 점검(v8_impl_check.mjs)이 개발 서버에 보내 확인한다. 여기는 소스 가드다.
const src = (p) => readFile(new URL(`../${p}`, import.meta.url), "utf8");

test("routing: the old /xr-live route files are gone", async () => {
  await assert.rejects(access(new URL("../src/app/(ko)/xr-live/page.tsx", import.meta.url)));
  await assert.rejects(access(new URL("../src/app/(ko)/xr-live/opengraph-image.tsx", import.meta.url)));
});

test("routing: /xr-live is a 301 to /xr-studio in next.config", async () => {
  const cfg = await src("next.config.ts");
  assert.match(cfg, /async redirects\(\) \{/);
  assert.ok(cfg.includes('{ source: "/xr-live", destination: "/xr-studio", statusCode: 301 }'));
});

test("routing: no middleware — the legacy xr-live subdomain is a Cloudflare zone Redirect Rule (spec 10 §10, decision b)", async () => {
  // 대표 결정 b(2026-10-01): xr-live.excorp.kr은 워커에 연결하지 않고 excorp.kr 존의 Redirect Rule로 301한다.
  // 그래서 워커 미들웨어는 필요 없다(모든 요청이 거치던 엣지 실행도 없어진다).
  await assert.rejects(access(new URL("../src/middleware.ts", import.meta.url)));
  await assert.rejects(access(new URL("../src/proxy.ts", import.meta.url)));
});

test("en xr-studio: no rental or booking wording in title, description, hero (spec 10 §4)", async () => {
  const en = await src("src/app/en/xr-studio/page.tsx");
  assert.ok(en.includes('const TITLE = "Hanam XR Studio — Chroma-Key Studio Production";'));
  assert.ok(en.includes('"Hanam chroma-key studio production. A large green-screen chroma stage'));
  assert.ok(en.includes('title="Hanam XR Studio: from planning to production and streaming"'));
  const visible = en.replace(/\{\/\*[\s\S]*?\*\/\}/g, "").replace(/\/\*[\s\S]*?\*\//g, "");
  assert.doesNotMatch(visible, /[Rr]ental|from booking/);
});

test("en xr-studio: share preview uses this page's title and URL and keeps the /en brand card (대표 지시 2026-10-01)", async () => {
  // 페이지에 openGraph를 쓰면 /en 레이아웃의 openGraph(이미지·사이트 이름·언어)를 통째로 덮는다.
  // 그래서 제목·주소만 넣으면 공유 이미지가 사라진다(영문 Aximmetry가 그 상태다). 이미지까지 직접 단다.
  const en = await src("src/app/en/xr-studio/page.tsx");
  const og = en.match(/openGraph: \{([\s\S]*?)\n  \},/)?.[1] ?? "";
  assert.match(og, /url: "\/en\/xr-studio"/);
  assert.match(og, /title: FULL_TITLE/);
  assert.match(og, /images: \[OG_IMAGE\]/);
  assert.match(og, /siteName: "EX Corporation"/);
  assert.match(og, /locale: "en_US"/);
  assert.match(en, /const OG_IMAGE = \{ url: "\/en\/opengraph-image"/);
  const tw = en.match(/twitter: \{([\s\S]*?)\n  \},/)?.[1] ?? "";
  assert.match(tw, /title: FULL_TITLE/);
  assert.match(tw, /images: \[OG_IMAGE\]/);
});
