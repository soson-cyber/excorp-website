import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const pageSource = await readFile(new URL("../src/app/(ko)/xr-studio/page.tsx", import.meta.url), "utf8");
const ogSource = await readFile(new URL("../src/app/(ko)/xr-studio/opengraph-image.tsx", import.meta.url), "utf8").catch(() => "");
const topicsSource = await readFile(new URL("../src/lib/contact-topics.ts", import.meta.url), "utf8").catch(() => "");

// 주석(지시 이력)은 화면에 나가지 않는다. 블록 주석과 줄 첫머리 주석을 걷어 낸 코드만 본다.
const code = pageSource.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
const between = (start, end) => {
  const a = code.indexOf(start);
  const b = code.indexOf(end, a + start.length);
  return a < 0 || b < 0 ? "" : code.slice(a, b);
};

const BANNED = ["올인원", "All-in-One", "운영자 1인", "3+1", "1,800만원", "6K", "고품격", "혁신적", "차세대", "게임체인저", "압도적", "원활한", "방송급", "PMF", "독점", "국내 유일"];

test("xr-live: banned claims are absent", () => {
  // "6K"는 6K 촬영 주장을 막는 금지어다. 스튜디오 사양의 카메라 이름 "4.6K"(스펙 10 §3.1) 안의 글자는 주장이 아니라 뺀다.
  const has = (w) => (w === "6K" ? /(?<![\d.])6K/.test(code) : code.includes(w));
  for (const word of BANNED) assert.ok(!has(word), `banned: ${word}`);
});

test("xr-live: no unconfirmed placeholders", () => {
  assert.doesNotMatch(code, /"[^"\n]*\[[^\]"\n]*[가-힣][^\]"\n]*\][^"\n]*"/, "bracket placeholder in a string");
  assert.doesNotMatch(code, />[^<>{}\n]*\[[^\]\n]*[가-힣][^\]\n]*\][^<>{}\n]*</, "bracket placeholder in JSX text");
});

test("xr-live: only confirmed amounts and no Premium price", () => {
  const amounts = [...new Set([...code.matchAll(/([\d,]+)만원/g)].map((m) => m[1]))].sort();
  assert.deepEqual(amounts, ["1,990", "2,189", "600", "660"]);
  const premiumData = between("const premium", "];");
  const premiumJsx = between('<SectionLabel tone="mint">PREMIUM CONTENTS</SectionLabel>', "<SectionLabel>FAQ</SectionLabel>");
  assert.ok(premiumData && premiumJsx, "Premium data or section not found");
  assert.doesNotMatch(premiumData + premiumJsx, /만원|\d{3,}원/);
});

test("xr-live: VAT answer follows card prices", () => {
  const price = (name) => {
    const m = code.match(new RegExp(`name: "${name}",\\s*price: "([\\d,]+)만원"`));
    assert.ok(m, `price for ${name}`);
    return Number(m[1].replace(/,/g, ""));
  };
  const withVat = (n) => `${Math.round(n * 1.1).toLocaleString("en-US")}만원`;
  const line = `VAT를 포함하면 단편 ${withVat(price("XR Live Broadcast 단편"))}, Package ${withVat(price("XR Live Broadcast Package"))}입니다.`;
  assert.ok(code.includes(line), line);
});

test("xr-live: compare columns follow card names", () => {
  // 12차 수정(2026-10-01): 비교표 열 이름 = 가격 카드 이름의 끝말(Package · 단편) + Premium.
  const cols = code.match(/const compareCols = \[([^\]]*)\];/);
  assert.ok(cols, "compareCols");
  const colNames = [...cols[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  const cardNames = [...between("const plans = [", "];").matchAll(/^\s*name: "([^"]+)",$/gm)].map((m) => m[1]);
  assert.equal(cardNames.length, 2, "two plan cards");
  assert.deepEqual(colNames, [...cardNames.map((n) => n.replace(/^XR Live Broadcast /, "")), "Premium"]);
  assert.ok(code.includes(`<caption className="sr-only">${colNames.join(" · ")} 사양 비교</caption>`), "caption follows columns");
});

test("xr-live: inquiry buttons use product inquiry types", () => {
  assert.ok(code.includes('quote: `/contact?type=${encodeURIComponent("스튜디오 제작")}&topic=xr-live#form`'));
  assert.ok(code.includes('brief: `/contact?type=${encodeURIComponent("자료 요청")}&topic=xr-live-brief#form`'));
  assert.ok(code.includes('demo: `/contact?type=${encodeURIComponent("시연·쇼룸 방문")}#form`'));
  assert.ok(!code.includes('"솔루션 도입"'), "quote must not route to 솔루션 도입");
  assert.match(topicsSource, /"xr-live": \{\s*type: "스튜디오 제작"/);
  assert.match(topicsSource, /"xr-live-brief": \{\s*type: "자료 요청"/);
});

test("xr-live: illustrative images keep labels", () => {
  // 구도 카드 1곳(9차 수정으로 받는 것 구간 삭제)
  assert.equal((code.match(/<ShotTag>구성 예시<\/ShotTag>/g) ?? []).length, 1);
  assert.match(code, /useCases\.map[\s\S]*?<ShotTag>예시 렌더<\/ShotTag>/);
});

test("xr-live: buyer terms stay verbatim", () => {
  for (const item of ["실시간 프로그램 송출 1회", "다시보기 영상(롱폼) 1편", "짧은 영상(Shortform) 2편", "4K UHD 프로그램 마스터", "국문 자막 또는 SRT 파일", "배포용 H.264 MP4", "검수 확인용 파일", "납품 파일 목록"]) {
    assert.ok(code.includes(`"${item}"`), item);
  }
  for (const [k, v] of [
    ["촬영 원본 영상", "4K"],
    ["촬영 원본 음향", "48kHz / 32bit Float"],
    ["편집 타임라인", "4K UHD"],
    ["프로그램 마스터", "4K UHD / 3840×2160"],
    ["프레임레이트", "29.97p (사전 협의로 변경 가능)"],
    ["배포용 포맷", "H.264 MP4"],
    ["색 규격", "Rec.709"],
    ["음향 규격", "48kHz Stereo"],
  ]) {
    assert.ok(code.includes(`["${k}", "${v}"]`), k);
  }
  assert.equal((between("const extras = [", "];").match(/^\s*"[^"]+",$/gm) ?? []).length, 14);
  assert.ok(code.includes("별도 협의 항목은 별건 계약으로 진행합니다."));
});

test("xr-live: curated-out blocks stay removed", () => {
  for (const gone of ["const steps", "const capWide", "const capStat", "const buyers", "컨셉", "Live-to-Post 제작 과정", "수행 역량", "발주 담당자 안내",
    // 대표 3차 수정(2026-10-01)으로 뺀 문구
    "이용·송출 범위", "과업지시서 표기를 따릅니다", "Premium은 이 가운데", "가상공간 프리셋 예시입니다",
    // 9차 수정: 받는 것 구간 삭제
    "WHAT YOU GET", "const shorts", "const getShot",
    // 14차 수정: 사례 카드 4장 삭제(영상 1편으로). 사례 제목은 AFTER 카드의 대체 텍스트·캡션에도 쓰여
    // 전체에서 찾지 않고, REFERENCES 구간에 카드(li·h3)가 없는지로 본다(references 영상 테스트).
    "const references"]) {
    assert.ok(!code.includes(gone), gone);
  }
});

test("xr-live: Premium-included extras are marked", () => {
  // 대표 3차 수정(2026-10-01): 별도 협의 칩 가운데 Premium 기본 포함 항목을 민트색 표시로 알린다.
  const block = between("const premiumIncluded", "};");
  const keys = [...block.matchAll(/^\s*"([^"]+)": "Premium[^"]*",$/gm)].map((m) => m[1]);
  assert.deepEqual(keys.sort(), ["맞춤 XR 가상공간", "신규 3D·복잡한 VFX", "외국어 번역·더빙·자막", "전문 MC·아나운서"].sort());
  const extras = between("const extras = [", "];");
  for (const k of keys) assert.ok(extras.includes(`"${k}",`), `${k} is an extras item`);
  assert.match(code, /<ChipList items=\{extras\} label="별도 협의 항목" notes=\{premiumIncluded\} \/>/);
});

test("xr-live: references are one looping reel video", () => {
  // 14차 수정(2026-10-01): 사례 카드 4장 삭제 → 대표가 준 사례 영상 1편을 소리 없이 반복 재생
  // (Aximmetry 페이지의 ControlledVideo: muted·loop·동작 줄이기 존중·일시정지 버튼)
  assert.match(code, /import \{ ControlledVideo \} from "@\/components\/ui\/ControlledVideo";/);
  const refs = between("<SectionLabel>REFERENCES</SectionLabel>", "</section>");
  assert.ok(refs, "REFERENCES section");
  assert.equal((code.match(/<ControlledVideo\b/g) ?? []).length, 1, "one video on the page");
  assert.match(refs, /<ControlledVideo\s+src="\/xr-live-reel\.mp4"\s+poster="\/xr-live-reel-poster\.webp"/);
  assert.doesNotMatch(refs, /<li\b|<h3\b/, "no case cards");
  assert.doesNotMatch(code, /<video/, "videos go through ControlledVideo (pause control, reduced motion)");
});

test("xr-live: reel files are web-sized", async () => {
  // 원본 xrlive.mp4는 27.8MB(20Mbps)라 Cloudflare 정적 파일 한도(25MiB)를 넘는다 → 웹용으로 다시 인코딩한 사본만 둔다.
  const mp4 = await stat(new URL("../public/xr-live-reel.mp4", import.meta.url));
  const poster = await stat(new URL("../public/xr-live-reel-poster.webp", import.meta.url));
  assert.ok(mp4.size < 8 * 1024 * 1024, `reel ${mp4.size} bytes (budget 8MB)`);
  assert.ok(poster.size < 300 * 1024, `poster ${poster.size} bytes`);
});

test("xr-live: hero flow has no piece counts", () => {
  assert.ok(code.includes('const flow = ["라이브", "롱폼 영상", "숏폼 영상", "4K UHD 마스터"];'));
});

test("xr-studio: public search metadata and link preview", () => {
  // 스펙 10 §2.3(2026-10-01): /xr-live를 /xr-studio로 옮기고 공개(검색 허용)한다.
  assert.ok(code.includes('const TITLE = "하남 XR 스튜디오 · XR Live Presentation · XR 가상공간 라이브 영상 제작";'));
  assert.ok(code.includes("const FULL_TITLE = `${TITLE} | EX Corporation`;"));
  assert.ok(code.includes('"원고와 발표자료를 보내주시면, 기획부터 포스트 프로덕션까지 EX가 하나의 흐름으로 연결합니다. 라이브가 끝나면 영상도 납품합니다."'));
  assert.match(code, /export const metadata: Metadata = \{\s*title: TITLE,/);
  assert.match(code, /openGraph: \{[^}]*url: "\/xr-studio",[^}]*title: FULL_TITLE,[^}]*description: DESCRIPTION/);
  assert.match(code, /twitter: \{[^}]*title: FULL_TITLE,[^}]*description: DESCRIPTION/);
  assert.doesNotMatch(code, /robots:/, "public page keeps the site default (index)");
  assert.ok(code.includes('alternates: { canonical: "/xr-studio", languages: { "ko-KR": "/xr-studio", "en-US": "/en/xr-studio", "x-default": "/xr-studio" } }'));
  assert.ok(!code.includes('"/xr-live"'), "no canonical or links to the old path");
  assert.ok(ogSource.length > 0, "opengraph-image.tsx missing");
  assert.ok(ogSource.includes("XR Live Presentation · TALK SHOW"));
  assert.ok(ogSource.includes("XR 가상공간"));
  assert.doesNotMatch(ogSource, /\.(webp|jpe?g|png)["'`]|<img|fetch\(/, "brand card only (CF-10)");
});

test("xr-studio: studio specs and photos moved from the old XR Studio page", () => {
  // 스펙 10 §3.1(2026-10-01): 옛 XR Studio 시설 스펙 + 사진 2장. 위치는 site.ts locations(Studio)에서 가져온다.
  assert.ok(code.includes('const studioLoc = locations.find((l) => l.kind === "Studio")!;'));
  const specs = between("const studioSpecs", "];");
  for (const row of [
    '["크로마 무대", "W 10m × D 7m × H 4m (약 70㎡) 호리존"]',
    '["스튜디오 면적", "약 210㎡"]',
    '["카메라", "시네마 카메라(4.6K) + PTZ 멀티카메라"]',
    '["렌즈", "시네마 줌 20–55mm / 50–125mm"]',
    '["위치", studioLoc.address.split(",")[0]]',
  ]) assert.ok(specs.includes(row), row);
  const shots = between("const studioShots", "];");
  assert.ok(shots.includes('src: "/studio-control.webp", label: "실시간 송출 · 제어"'));
  assert.ok(shots.includes('src: "/studio-prep.webp", label: "메이크업 · 대기 공간"'));
  assert.doesNotMatch(shots, /DeckLink/, "alt describes the photo (DeckLink is not a camera)");
  assert.match(code, /studioSpecs\.map\(\(\[k, v\]\) => \(\s*<Row key=\{k\} k=\{k\} v=\{v\} \/>/);
});

test("xr-studio: FAQ adds the four studio questions", () => {
  // 스펙 10 §3.2: 기존 5문항 뒤에 스튜디오 4문항(위치·주차, 사전 방문, 출장 촬영 D6, 복장 D7)
  const block = between("const faqs", "];");
  for (const [q, a] of [
    ["스튜디오는 어디에 있고, 주차가 되나요?", "`${studioLoc.address}(${studioLoc.name})입니다. 무료로 주차하실 수 있습니다.`"],
    ["계약 전에 스튜디오를 볼 수 있나요?", '"네. 방문을 예약하시면 하남 스튜디오에서 가상 무대를 무료로 시연해 드립니다. 멀리 계시면 화상 데모로 진행합니다."'],
    ["출장 촬영도 되나요?", '"스튜디오 촬영이 기본입니다. 출장 촬영은 별도 협의로 진행합니다."'],
    ["촬영 날 어떤 옷을 입으면 되나요?", '"초록색 옷은 피해 주세요. 크로마키 무대라 초록색이 배경과 함께 지워집니다."'],
  ]) {
    assert.ok(block.includes(`q: "${q}"`), q);
    assert.ok(block.includes(`a: ${a}`), a);
  }
  assert.equal((block.match(/\bq: "/g) ?? []).length, 9, "5 product + 4 studio questions");
});

test("xr-studio: structured data matches the visible page", () => {
  // 스펙 10 §2.4: 이동 경로·사업장·FAQ. 화면에 보이는 정보만 넣는다.
  assert.ok(code.includes('import { JsonLd, breadcrumbLd, localBusinessLd, faqPageLd } from "@/components/seo/JsonLd";'));
  assert.ok(code.includes('breadcrumbLd([{ name: "XR Studio", path: "/xr-studio" }])'));
  assert.match(code, /localBusinessLd\(\{[^}]*name: studioLoc\.name,[^}]*path: "\/xr-studio",/);
  assert.ok(code.includes("faqPageLd(faqs)"));
});

test("xr-studio: no venue rental wording (spec 10 D1)", () => {
  assert.ok(!code.includes("대관"));
});
