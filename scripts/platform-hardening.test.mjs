import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("production responses declare the baseline security headers", async () => {
  const config = await read("next.config.ts");

  assert.match(config, /poweredByHeader:\s*false/);
  for (const header of [
    "Strict-Transport-Security",
    "Content-Security-Policy",
    "X-Content-Type-Options",
    "Referrer-Policy",
    "Permissions-Policy",
    "X-Frame-Options",
  ]) {
    assert.match(config, new RegExp(header));
  }
});

test("the Cloudflare runtime compatibility date is intentionally current", async () => {
  const wrangler = await read("wrangler.jsonc");

  assert.match(wrangler, /"compatibility_date": "2026-07-22"/);
});

test("the sitemap merges published Notion content and localized alternates", async () => {
  const sitemap = await read("src/app/sitemap.ts");

  assert.match(sitemap, /getNews/);
  assert.match(sitemap, /getInsights/);
  assert.match(sitemap, /notionNews \?\? \[\]/);
  assert.match(sitemap, /export default async function sitemap/);
  assert.match(sitemap, /en-US/);
});

test("the English work index exposes the same scenario inventory", async () => {
  const page = await read("src/app/en/work/page.tsx");

  assert.match(page, /works/);
  assert.doesNotMatch(page, /<ComingSoon/);
  assert.match(page, /Korean original/);
});

test("Korean and English routes have distinct server-rendered root documents", async () => {
  const [koreanLayout, englishLayout, rootDocument] = await Promise.all([
    read("src/app/(ko)/layout.tsx"),
    read("src/app/en/layout.tsx"),
    read("src/components/layout/RootDocument.tsx"),
  ]);

  assert.match(koreanLayout, /locale="ko"/);
  assert.match(englishLayout, /locale="en"/);
  assert.match(rootDocument, /lang=\{locale\}/);
  assert.match(rootDocument, /ui\[locale\]\.skipToContent/);
  assert.match(rootDocument, /locale === "en" \? "en-US" : "ko-KR"/);
  assert.doesNotMatch(rootDocument, /document\.documentElement\.lang/);
  await assert.rejects(read("src/app/layout.tsx"), /ENOENT/);
});

test("each root layout owns a localized Open Graph image", async () => {
  const [koreanImage, englishImage] = await Promise.all([
    read("src/app/(ko)/opengraph-image.tsx"),
    read("src/app/en/opengraph-image.tsx"),
  ]);

  assert.match(koreanImage, /기술의 연결로 경험을 확장하다/);
  assert.match(englishImage, /Expand Experiences Through Connected Technology/);
});
