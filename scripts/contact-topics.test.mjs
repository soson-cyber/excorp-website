import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  CONTACT_MESSAGE_MAX,
  CONTACT_TOPICS,
  activeContactTopic,
  messageMaxLength,
  withTopicPrefix,
} from "../src/lib/contact-topics.ts";
import { validateContactPayload } from "../src/lib/contact-validation.ts";

const formSource = await readFile(new URL("../src/components/ui/ContactForm.tsx", import.meta.url), "utf8");

const basePayload = { company: "", name: "점검", email: "qa@example.com", phone: "", consent: true, marketing: false, website: "" };

test("a topic applies only to its own inquiry type", () => {
  assert.equal(activeContactTopic("xr-live", "스튜디오 제작"), "xr-live");
  assert.equal(activeContactTopic("xr-live-brief", "자료 요청"), "xr-live-brief");
  assert.equal(activeContactTopic("xr-live", "일반 문의"), null);
  assert.equal(activeContactTopic("xr-live-brief", "스튜디오 제작"), null);
});

test("missing or unknown topics fall back to the current flow", () => {
  for (const value of [null, undefined, "", "bogus", "XR-LIVE", "toString", "__proto__", "constructor"]) {
    assert.equal(activeContactTopic(value, "스튜디오 제작"), null, String(value));
    assert.equal(activeContactTopic(value, "자료 요청"), null, String(value));
  }
});

test("every topic points at an inquiry type the server accepts", () => {
  for (const [topic, spec] of Object.entries(CONTACT_TOPICS)) {
    const result = validateContactPayload({ ...basePayload, type: spec.type, message: withTopicPrefix(topic, "확인") });
    assert.equal(result.ok, true, topic);
  }
});

test("the source prefix is added once and only with a topic", () => {
  assert.equal(withTopicPrefix("xr-live", "  구성 문의  "), "[XR Live Presentation] 구성 문의");
  assert.equal(withTopicPrefix("xr-live-brief", "초안 요청"), "[XR Live · 과업지시서 초안] 초안 요청");
  assert.equal(withTopicPrefix("xr-live", "[XR Live Presentation] 구성 문의"), "[XR Live Presentation] 구성 문의");
  assert.equal(withTopicPrefix(null, "  그대로  "), "  그대로  ");
});

test("a full-length message still passes server validation after the prefix", () => {
  assert.equal(CONTACT_MESSAGE_MAX, 5000);
  assert.equal(messageMaxLength(null), CONTACT_MESSAGE_MAX);
  for (const [topic, spec] of Object.entries(CONTACT_TOPICS)) {
    const limit = messageMaxLength(topic);
    const atLimit = withTopicPrefix(topic, "가".repeat(limit));
    assert.ok(atLimit.startsWith(spec.prefix), `${topic} keeps the source tag at ${limit}`);
    assert.equal(validateContactPayload({ ...basePayload, type: spec.type, message: atLimit }).ok, true, `${topic} at ${limit}`);
  }
});

test("a message too long for the source tag is sent without it instead of failing", () => {
  // 유형을 바꿨다 되돌리면 입력 한도는 줄어도 이미 쓴 글은 남는다(브라우저는 maxLength로 값을 자르지 않는다).
  for (const [topic, spec] of Object.entries(CONTACT_TOPICS)) {
    for (const length of [messageMaxLength(topic) + 1, CONTACT_MESSAGE_MAX]) {
      const message = withTopicPrefix(topic, "가".repeat(length));
      assert.ok(!message.startsWith(spec.prefix), `${topic} at ${length} drops the tag`);
      assert.equal(validateContactPayload({ ...basePayload, type: spec.type, message }).ok, true, `${topic} at ${length}`);
    }
  }
});

test("completion copy follows the approved copy kit", () => {
  assert.deepEqual(CONTACT_TOPICS["xr-live"].success, {
    title: "구성·견적 문의를 받았습니다.",
    body: "담당자가 영업일 기준 1~2일 안에 회신드립니다. 구성안과 견적은 주제와 일정을 확인한 뒤 보내드립니다.",
    note: "급하시면 031-699-8228로 전화 주세요.",
  });
  assert.deepEqual(CONTACT_TOPICS["xr-live-brief"].success, {
    title: "과업지시서 초안 요청을 받았습니다.",
    body: "4회 과업 기준 초안을 영업일 기준 1~2일 안에 이메일로 보내드립니다.",
    note: "다른 구성이 필요하시면 문의 내용에 적어 주세요.",
  });
});

test("the contact form reads the topic on the Korean form only and wires every behavior", () => {
  assert.match(formSource, /activeContactTopic\(locale === "ko" \? params\.get\("topic"\) : null, selectedType\)/);
  assert.match(formSource, /message: withTopicPrefix\(topic, String\(data\.message \?\? ""\)\)/);
  assert.match(formSource, /name="message"[\s\S]*?maxLength=\{messageMaxLength\(topic\)\}/);
  assert.match(formSource, /CONTACT_TOPICS\[topic\]\.success/);
  assert.match(formSource, /!topic && selectedType === "자료 요청"/);
});
