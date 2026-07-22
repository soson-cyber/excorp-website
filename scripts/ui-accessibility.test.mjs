import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

test("the mobile navigation behaves like a modal and restores focus", async () => {
  const header = await source("../src/components/layout/Header.tsx");

  assert.match(header, /mobileToggleRef/);
  assert.match(header, /mobileToggleRef\.current\?\.focus\(\)/);
  assert.match(header, /background\.inert = true/);
  assert.match(header, /background\.setAttribute\("aria-hidden", "true"\)/);
  assert.match(header, /role="dialog"/);
  assert.match(header, /aria-modal="true"/);
});

test("product motion is user-controllable and reduced-motion safe", async () => {
  const [controlledVideo, youtubePreview, aximmetry, moverse] = await Promise.all([
    source("../src/components/ui/ControlledVideo.tsx"),
    source("../src/components/ui/YouTubePreview.tsx"),
    source("../src/app/(ko)/product/aximmetry/page.tsx"),
    source("../src/app/(ko)/product/moverse/page.tsx"),
  ]);

  assert.match(controlledVideo, /prefers-reduced-motion: reduce/);
  assert.match(controlledVideo, /video\.play\(\)/);
  assert.match(controlledVideo, /video\.pause\(\)/);
  assert.match(controlledVideo, /aria-pressed=\{playing\}/);
  assert.doesNotMatch(controlledVideo, /\sautoPlay(?:\s|=)/);

  assert.match(youtubePreview, /poster/);
  assert.match(youtubePreview, /controls=1/);
  assert.match(youtubePreview, /aria-label=\{playLabel\}/);
  assert.doesNotMatch(youtubePreview, /controls=0|pointer-events-none/);

  assert.match(aximmetry, /<YouTubePreview/);
  assert.match(aximmetry, /<ControlledVideo/);
  assert.doesNotMatch(aximmetry, /<video|controls=0/);
  assert.equal((moverse.match(/<ControlledVideo/g) ?? []).length, 2);
  assert.match(moverse, /src="\/moverse-showcase-web\.mp4"/);
  assert.match(moverse, /src: "\/moverse-raw-web\.mp4"/);
  assert.match(moverse, /src: "\/moverse-rendered-web\.mp4"/);
  assert.doesNotMatch(moverse, /<video/);
});

test("page heroes render the supplied breadcrumb trail", async () => {
  const pageHero = await source("../src/components/page/PageHero.tsx");

  assert.match(pageHero, /aria-label="Breadcrumb"/);
  assert.match(pageHero, /breadcrumb\.map/);
  assert.match(pageHero, /aria-current="page"/);
  assert.match(pageHero, /href=\{homeHref\}/);
});

test("news filters avoid dead ends and disclose Korean originals on English pages", async () => {
  const newsList = await source("../src/components/news/NewsList.tsx");

  assert.match(newsList, /availableCategories/);
  assert.match(newsList, /count > 0/);
  assert.doesNotMatch(newsList, /cmsNote/);
  assert.match(newsList, /Korean original/);
  assert.match(newsList, /lang=\{isKoreanOriginal \? "ko" : undefined\}/);
});
