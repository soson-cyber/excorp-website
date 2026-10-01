import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

// 가상공간 프리셋의 이미지·이름은 국문 /xr-studio(XR Live 활용 사례, `set:`)와 영문 /en/xr-studio(프리셋 8종, `name:`)가
// 같은 것을 쓴다(대표 13차 수정. 스펙 10에서 국문 페이지가 XR Live 본문으로 바뀜, 2026-10-01).
const read = async (p) =>
  (await readFile(new URL(`../src/app/${p}`, import.meta.url), "utf8")).replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
const pages = {
  "xr-studio ko": await read("(ko)/xr-studio/page.tsx"),
  "xr-studio en": await read("en/xr-studio/page.tsx"),
};
const imgOf = (src, key, name) => src.match(new RegExp(`${key}: "${name}",[^}]*img: "([^"]+)"`))?.[1];

test("seminar preset uses the cropped copy without white strips on every page", () => {
  assert.equal(imgOf(pages["xr-studio ko"], "set", "세미나실"), "/studio-preset-seminar.webp");
  assert.equal(imgOf(pages["xr-studio en"], "name", "Seminar Room"), "/studio-preset-seminar.webp");
  for (const [k, src] of Object.entries(pages)) assert.ok(!src.includes("/studio-bg-03.jpg"), `${k} still uses the white-strip original`);
});

test("LED stage preset is not called a cube", () => {
  assert.ok(imgOf(pages["xr-studio ko"], "set", "LED 스테이지"), "xr-studio ko: LED 스테이지");
  assert.ok(imgOf(pages["xr-studio en"], "name", "LED Stage"), "xr-studio en: LED Stage");
  for (const [k, src] of Object.entries(pages)) assert.doesNotMatch(src, /큐브|Cube/, k);
});

test("keynote hall and LED stage presets use the new renders on every page", () => {
  for (const [page, key, keynote, led] of [
    ["xr-studio ko", "set", "키노트 홀", "LED 스테이지"],
    ["xr-studio en", "name", "Keynote Hall", "LED Stage"],
  ]) {
    assert.equal(imgOf(pages[page], key, keynote), "/studio-preset-keynote.webp", `${page}: ${keynote}`);
    assert.equal(imgOf(pages[page], key, led), "/studio-preset-led-stage.webp", `${page}: ${led}`);
  }
  for (const [k, src] of Object.entries(pages)) {
    assert.ok(!src.includes("/studio-bg-06.jpg"), `${k} still uses the old keynote render`);
    assert.ok(!src.includes("/studio-bg-08.jpg"), `${k} still uses the old LED cube render`);
  }
});

test("keynote preset frames both EX CORP. signs in the 4:3 English studio card", () => {
  // 국문은 16:9 활용 사례 칸이라 위치 조정이 필요 없다. 4:3 프리셋 칸은 영문 페이지에만 남는다(스펙 10 D8).
  assert.match(pages["xr-studio en"], /name: "Keynote Hall",[^}]*pos: "75% 50%"/);
  assert.match(pages["xr-studio en"], /<MediaBlank [^>]*position=\{p\.pos\}/);
});
