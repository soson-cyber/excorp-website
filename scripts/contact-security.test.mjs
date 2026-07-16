import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  CONTACT_MAX_BODY_BYTES,
  parseContactRequest,
  validateContactPayload,
  validateContactRequestMetadata,
} from "../src/lib/contact-validation.ts";

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
