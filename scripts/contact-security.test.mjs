import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  CONTACT_MAX_BODY_BYTES,
  parseContactRequest,
  validateContactPayload,
  validateContactRequestMetadata,
} from "../src/lib/contact-validation.ts";
import * as notionData from "../src/lib/notion.ts";
import { serializeJsonLd } from "../src/lib/json-ld.ts";

const validPayload = {
  type: "솔루션 도입",
  company: " EX Corp ",
  name: " 손승오 ",
  email: " soson@excorp.kr ",
  phone: "",
  message: " 상담을 요청합니다. ",
  consent: true,
  marketing: false,
  website: "",
};

const formSource = await readFile(new URL("../src/components/ui/ContactForm.tsx", import.meta.url), "utf8");
const jsonLdSource = await readFile(new URL("../src/components/seo/JsonLd.tsx", import.meta.url), "utf8");
const newsDetailSources = await Promise.all([
  readFile(new URL("../src/app/(ko)/news/[slug]/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/app/en/news/[slug]/page.tsx", import.meta.url), "utf8"),
]);

function request(body = validPayload, init = {}) {
  return new Request("https://excorp.kr/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://excorp.kr",
      ...(init.headers ?? {}),
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("accepts and normalizes the public contact form contract", () => {
  const result = validateContactPayload(validPayload);
  assert.equal(result.ok, true);
  assert.equal(result.value.company, "EX Corp");
  assert.equal(result.value.name, "손승오");
  assert.equal(result.value.email, "soson@excorp.kr");
  assert.equal(result.value.message, "상담을 요청합니다.");
  assert.equal(result.value.isBot, false);
});

test("rejects non-JSON and cross-origin browser submissions", () => {
  const wrongType = new Request("https://excorp.kr/api/contact", {
    method: "POST",
    headers: { "content-type": "text/plain" },
    body: "hello",
  });
  assert.equal(validateContactRequestMetadata(wrongType)?.status, 415);

  const crossOrigin = request(validPayload, { headers: { origin: "https://attacker.example" } });
  assert.equal(validateContactRequestMetadata(crossOrigin)?.status, 403);

  const proxiedSameOrigin = new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://excorp.kr",
      host: "excorp.kr",
      "x-forwarded-proto": "https",
    },
    body: JSON.stringify(validPayload),
  });
  assert.equal(validateContactRequestMetadata(proxiedSameOrigin), null);
});

test("rejects unsupported inquiry types, invalid consent, and structured fields", () => {
  assert.equal(validateContactPayload({ ...validPayload, type: "관리자 권한 요청" }).ok, false);
  assert.equal(validateContactPayload({ ...validPayload, consent: "true" }).ok, false);
  assert.equal(validateContactPayload({ ...validPayload, name: ["손승오"] }).ok, false);
});

test("recognizes the honeypot without sending its contents downstream", () => {
  const result = validateContactPayload({ ...validPayload, website: "https://spam.example" });
  assert.equal(result.ok, true);
  assert.equal(result.value.isBot, true);
  assert.equal("website" in result.value, false);
});

test("caps declared and streamed request bodies", async () => {
  const declared = request(validPayload, { headers: { "content-length": String(CONTACT_MAX_BODY_BYTES + 1) } });
  assert.equal(validateContactRequestMetadata(declared)?.status, 413);

  const streamed = request("x".repeat(CONTACT_MAX_BODY_BYTES + 1));
  const result = await parseContactRequest(streamed);
  assert.equal(result.ok, false);
  assert.equal(result.status, 413);
});

test("parses a valid request and rejects malformed JSON", async () => {
  const valid = await parseContactRequest(request());
  assert.equal(valid.ok, true);
  assert.equal(valid.value.type, "솔루션 도입");

  const malformed = await parseContactRequest(request("{"));
  assert.equal(malformed.ok, false);
  assert.equal(malformed.status, 400);
});

test("the browser form exposes the honeypot and mirrors server length limits", () => {
  assert.match(formSource, /name="website"/);
  assert.match(formSource, /name="name"[\s\S]*?maxLength=\{100\}/);
  assert.match(formSource, /name="company"[\s\S]*?maxLength=\{200\}/);
  assert.match(formSource, /name="email"[\s\S]*?maxLength=\{320\}/);
  assert.match(formSource, /name="message"[\s\S]*?maxLength=\{5000\}/);
});

test("news JSON-LD uses the shared less-than escaping boundary", () => {
  const attack = { title: "</script><script>globalThis.compromised=true</script>" };
  const serialized = serializeJsonLd(attack);

  assert.doesNotMatch(serialized, /<\/script>/i);
  assert.deepEqual(JSON.parse(serialized), attack);
  assert.match(jsonLdSource, /serializeJsonLd\(schema\)/);
  for (const source of newsDetailSources) {
    assert.match(source, /import \{ JsonLd \} from "@\/components\/seo\/JsonLd"/);
    assert.match(source, /<JsonLd\s+schema=/);
    assert.doesNotMatch(source, /dangerouslySetInnerHTML/);
  }
});

test("Notion rich text preserves the full validated 5,000-character inquiry", () => {
  assert.equal(typeof notionData.toNotionRichText, "function");
  const message = "가".repeat(5_000);
  const richText = notionData.toNotionRichText(message);

  assert.equal(richText.map((item) => item.text.content).join(""), message);
  assert.ok(richText.length > 1);
  assert.ok(richText.every((item) => Array.from(item.text.content).length <= 1_900));
});

test("Notion rich text never splits Unicode surrogate pairs", () => {
  const message = `${"가".repeat(1_899)}🙂${"나".repeat(1_900)}🚀`;
  const richText = notionData.toNotionRichText(message);

  assert.equal(richText.map((item) => item.text.content).join(""), message);
  assert.ok(richText.every((item) => !/[\uD800-\uDBFF]$|^[\uDC00-\uDFFF]/u.test(item.text.content)));
});

test("Notion data source queries follow cursors until every page is collected", async () => {
  assert.equal(typeof notionData.queryAllDataSourcePages, "function");
  const calls = [];
  const queryPage = async (request) => {
    calls.push(request);
    if (!request.start_cursor) {
      return { results: Array.from({ length: 100 }, (_, id) => ({ id })), has_more: true, next_cursor: "page-2" };
    }
    return { results: [{ id: 100 }], has_more: false, next_cursor: null };
  };

  const rows = await notionData.queryAllDataSourcePages(queryPage, "data-source-id");

  assert.equal(rows.length, 101);
  assert.deepEqual(calls, [
    { data_source_id: "data-source-id", page_size: 100 },
    { data_source_id: "data-source-id", page_size: 100, start_cursor: "page-2" },
  ]);
});

test("Notion pagination fails closed when has_more omits the next cursor", async () => {
  await assert.rejects(
    notionData.queryAllDataSourcePages(
      async () => ({ results: [], has_more: true, next_cursor: null }),
      "data-source-id",
    ),
    /cursor missing/,
  );
});
