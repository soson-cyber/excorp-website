/*
  상품 상세 페이지가 문의 폼에 넘기는 topic(주소의 ?topic=). 대표 승인 2026-10-01(스펙 07 W2).
  - 폼은 topic이 있고, 고른 문의 유형이 topic의 유형과 같을 때만 아래를 적용한다:
    문의 내용 앞에 출처를 붙이고, 완료 화면 문구를 바꾸고, 체크리스트 PDF를 띄우지 않는다.
  - topic이 없거나 모르는 값이거나 유형을 바꾸면 현행 흐름과 같다. API·Notion 스키마는 그대로다.
  - 이 파일은 다른 모듈을 import하지 않는다(scripts/contact-topics.test.mjs가 node로 바로 읽는다).
*/

// 서버 검증(src/lib/contact-validation.ts)의 문의 내용 최대 길이. 테스트가 서버와 맞춰 본다.
export const CONTACT_MESSAGE_MAX = 5000;

export const CONTACT_TOPICS = {
  // XR Live 구성·견적 문의(히어로·가격 카드·Premium·마지막 CTA)
  "xr-live": {
    type: "스튜디오 제작",
    prefix: "[XR Live Presentation]",
    success: {
      title: "구성·견적 문의를 받았습니다.",
      body: "담당자가 영업일 기준 1~2일 안에 회신드립니다. 구성안과 견적은 주제와 일정을 확인한 뒤 보내드립니다.",
      note: "급하시면 031-699-8228로 전화 주세요.",
    },
  },
  // XR Live 과업지시서 초안 요청(히어로·마지막 CTA)
  "xr-live-brief": {
    type: "자료 요청",
    prefix: "[XR Live · 과업지시서 초안]",
    success: {
      title: "과업지시서 초안 요청을 받았습니다.",
      body: "4회 과업 기준 초안을 영업일 기준 1~2일 안에 이메일로 보내드립니다.",
      note: "다른 구성이 필요하시면 문의 내용에 적어 주세요.",
    },
  },
} as const;

export type ContactTopic = keyof typeof CONTACT_TOPICS;

/** 주소의 topic 값과 지금 고른 문의 유형으로 적용할 topic을 정한다. 해당하지 않으면 null. */
export function activeContactTopic(value: string | null | undefined, selectedType: string): ContactTopic | null {
  if (!value || !Object.prototype.hasOwnProperty.call(CONTACT_TOPICS, value)) return null;
  const topic = value as ContactTopic;
  return CONTACT_TOPICS[topic].type === selectedType ? topic : null;
}

/** 문의 내용 앞에 출처를 한 번만 붙인다. topic이 없으면 받은 그대로 돌려준다.
    유형을 바꿨다 되돌리면 입력 한도가 줄어도 이미 쓴 글은 남는다. 붙여서 서버 한도를 넘으면 출처 없이 보낸다. */
export function withTopicPrefix(topic: ContactTopic | null, message: string): string {
  if (!topic) return message;
  const { prefix } = CONTACT_TOPICS[topic];
  const body = message.trim();
  if (body.startsWith(prefix)) return body;
  const tagged = `${prefix} ${body}`;
  return tagged.length <= CONTACT_MESSAGE_MAX ? tagged : body;
}

/** 문의 내용 입력 한도. 출처와 공백 한 칸을 붙여도 서버 한도를 넘지 않게 줄인다. */
export function messageMaxLength(topic: ContactTopic | null): number {
  return topic ? CONTACT_MESSAGE_MAX - CONTACT_TOPICS[topic].prefix.length - 1 : CONTACT_MESSAGE_MAX;
}
