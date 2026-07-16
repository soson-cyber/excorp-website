import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { works } from "../src/lib/work.ts";

async function source(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

test("every published work entry declares whether it is a scenario or verified case", () => {
  assert.ok(works.length > 0);
  assert.equal(new Set(works.map((work) => work.slug)).size, works.length);
  for (const work of works) {
    assert.ok(["scenario", "case"].includes(work.kind), `${work.slug} must declare kind`);
  }
});

test("scenario pages cannot present themselves as customer case studies", async () => {
  const [indexPage, detailPage] = await Promise.all([
    source("../src/app/work/page.tsx"),
    source("../src/app/work/[slug]/page.tsx"),
  ]);
  assert.match(indexPage, /works\.map/);
  assert.match(indexPage, /실제 고객 사례가 아닌/);
  assert.doesNotMatch(detailPage, /활용 사례/);
  assert.match(detailPage, /w\.kind === "scenario"/);
  assert.match(detailPage, /활용 시나리오/);
});

test("marketing integrity policy runs on pull requests", async () => {
  const ci = await source("../.github/workflows/marketing-integrity-ci.yml");
  assert.match(ci, /pull_request:/);
  assert.match(ci, /permissions:\s*\n\s*contents:\s*read/);
  assert.match(ci, /node --experimental-strip-types --test scripts\/marketing-integrity\.test\.mjs/);
  assert.doesNotMatch(ci, /uses:\s*actions\/[^@\s]+@v\d/);
});

test("measurement specification is explicit, privacy-gated, and PII-free", async () => {
  const spec = await source("../docs/analytics-measurement-spec.md");
  for (const event of [
    "cta_click",
    "contact_form_start",
    "contact_form_submit",
    "contact_form_success",
    "contact_form_error",
  ]) {
    assert.match(spec, new RegExp(`\\b${event}\\b`));
  }
  for (const property of ["locale", "source_page", "cta_id", "inquiry_type", "campaign_id"]) {
    assert.match(spec, new RegExp(`\\b${property}\\b`));
  }
  assert.match(spec, /이 PR에서는 추적 코드를 활성화하지 않는다/);
  assert.match(spec, /개인정보 처리방침/);
  assert.match(spec, /이름.*이메일.*전화.*회사.*문의 본문/);
});
