import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const notionSource = await readFile(new URL("../src/lib/notion.ts", import.meta.url), "utf8");
const contactRoute = await readFile(
  new URL("../src/app/api/contact/route.ts", import.meta.url),
  "utf8",
);
const contactForm = await readFile(
  new URL("../src/components/ui/ContactForm.tsx", import.meta.url),
  "utf8",
);
const envExample = await readFile(new URL("../.env.example", import.meta.url), "utf8");
const workerConfig = await readFile(new URL("../wrangler.jsonc", import.meta.url), "utf8");

function functionBody(source, declaration, nextDeclaration) {
  const start = source.indexOf(declaration);
  assert.notEqual(start, -1, `Missing declaration: ${declaration}`);
  const end = nextDeclaration ? source.indexOf(nextDeclaration, start + declaration.length) : source.length;
  assert.notEqual(end, -1, `Missing boundary: ${nextDeclaration}`);
  return source.slice(start, end);
}

const publicQuery = functionBody(
  notionSource,
  "async function queryPublished",
  "export async function getNews",
);
const insightBody = functionBody(
  notionSource,
  "async function readInsightBody",
  "export async function getInsightItem",
);
const inquiryWrite = functionBody(notionSource, "export async function createInquiry");
const failedPersistence = functionBody(contactRoute, "if (!stored)", "// ── 2)");

assert.match(notionSource, /type NotionTokenKey = "NOTION_PUBLIC_TOKEN" \| "NOTION_INQUIRY_TOKEN"/);
assert.match(publicQuery, /notion\("NOTION_PUBLIC_TOKEN"\)/);
assert.match(insightBody, /notion\("NOTION_PUBLIC_TOKEN"\)/);
assert.doesNotMatch(publicQuery + insightBody, /NOTION_INQUIRY_TOKEN/);

assert.match(inquiryWrite, /notion\("NOTION_INQUIRY_TOKEN"\)/);
assert.match(inquiryWrite, /NOTION_DS_INQUIRY/);
assert.doesNotMatch(inquiryWrite, /NOTION_PUBLIC_TOKEN/);

for (const source of [notionSource, contactRoute, envExample, workerConfig]) {
  assert.doesNotMatch(source, /\bNOTION_TOKEN\b/, "Legacy shared NOTION_TOKEN must stay removed");
}

assert.match(failedPersistence, /status:\s*503/);
assert.match(failedPersistence, /temporarily unavailable/);
assert.doesNotMatch(failedPersistence, /\b(name|email|phone|message)\b/);
assert.match(contactForm, /if \(!res\.ok\) throw new Error\("request failed"\)/);
assert.ok(
  contactForm.indexOf("if (!res.ok)") < contactForm.indexOf('setStatus("success")'),
  "The form must reject failed persistence before showing success",
);

assert.match(envExample, /^NOTION_PUBLIC_TOKEN=$/m);
assert.match(envExample, /^NOTION_INQUIRY_TOKEN=$/m);

for (const dataSourceKey of [
  "NOTION_DS_NEWS",
  "NOTION_DS_WORK",
  "NOTION_DS_CAREER",
  "NOTION_DS_INSIGHTS",
  "NOTION_DS_INQUIRY",
]) {
  assert.match(envExample, new RegExp(`^${dataSourceKey}=[0-9a-f-]{36}$`, "m"));
  assert.match(workerConfig, new RegExp(`"${dataSourceKey}": "[0-9a-f-]{36}"`));
}

console.log("Notion credential boundary checks passed.");
