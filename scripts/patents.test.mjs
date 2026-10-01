import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

// 등록특허 목록·개수(대표 지시 2026-10-01: 특허증 추가 — KR 10-3026293, 등록 2026-09-28).
// 번호·명칭은 특허증 그대로 쓴다. 개수는 등록 건수만 쓴다("+" 없음, 대표 선택).
const read = (p) => readFile(new URL(`../${p}`, import.meta.url), "utf8");
const NEW = { no: "KR 10-3026293", ko: "가상 카메라 조작을 이용한 영상 출력 조절 장치 및 방법", img: "/patent-3026293.jpg" };
const files = {
  koAbout: "src/app/(ko)/about/page.tsx",
  enAbout: "src/app/en/about/page.tsx",
  home: "src/components/home/HomeClean.tsx",
  koSol: "src/app/(ko)/solution/page.tsx",
  enSol: "src/app/en/solution/page.tsx",
  enStudio: "src/app/en/xr-studio/page.tsx",
};
const nos = (src) => [...src.matchAll(/no: "(KR 10-\d{7})"/g)].map((m) => m[1]);

test("patents: the new patent is listed first on About (ko·en) with its certificate", async () => {
  for (const f of [files.koAbout, files.enAbout]) {
    const src = await read(f);
    const list = nos(src);
    assert.equal(list.length, 7, f);
    assert.equal(list[0], NEW.no, f);
    assert.match(src, new RegExp(`no: "${NEW.no}", img: "${NEW.img}"`), f);
  }
  assert.match(await read(files.koAbout), new RegExp(`title: "${NEW.ko}", no: "${NEW.no}"`));
});

test("patents: the home slider lists 7 patents in each language, newest first", async () => {
  const list = nos(await read(files.home));
  assert.equal(list.length, 14);
  assert.equal(list[0], NEW.no);
  assert.equal(list[7], NEW.no);
});

test("patents: every listed patent has its certificate image in public/", async () => {
  const all = new Set([...nos(await read(files.koAbout)), ...nos(await read(files.enAbout)), ...nos(await read(files.home))]);
  for (const no of all) await access(new URL(`../public/patent-${no.replace("KR 10-", "")}.jpg`, import.meta.url));
});

test("patent counts say 7 registered patents, with no '+'", async () => {
  const src = Object.fromEntries(await Promise.all(Object.entries(files).map(async ([k, f]) => [k, await read(f)])));
  assert.match(src.koAbout, /보유 특허 7건/);
  assert.match(src.koAbout, /기술 특허 7건 보유/);
  assert.match(src.enAbout, /7 registered patents/);
  assert.match(src.enAbout, /7 technology patents · venture-company certification/);
  assert.match(src.home, /\{ v: 7, s: "", l: "기술 특허" \}/);
  assert.match(src.home, /\{ v: 7, s: "", l: "Technology patents" \}/);
  assert.match(src.home, /"7 registered patents" : "등록 특허 7건"/);
  assert.match(src.koSol, /\{ n: "7", l: "기술 특허" \}/);
  assert.match(src.enSol, /\{ n: "7", l: "Technology patents" \}/);
  assert.match(src.enStudio, /proven by 7 technology patents/);
  for (const [k, s] of Object.entries(src)) {
    assert.doesNotMatch(s, /특허 6건|6 patents|6 registered patents|6 technology patents|v: 6, s: "\+"|n: "6\+"/, k);
  }
});
