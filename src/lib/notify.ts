import { resolveEnv } from "./runtime-env";

/*
  문의 접수 알림 — 이메일(Resend) + Google Chat(Incoming Webhook).

  설계 원칙
  - 정본 저장은 Notion WEBSITE_INQUIRY다. 알림은 부가 채널이므로 실패해도 접수를 실패시키지 않는다.
    (실패는 서버 로그로 남기고, 호출부가 결과를 받아 함께 기록한다.)
  - 외부 SDK를 추가하지 않고 fetch로 호출한다(Workers 번들 최소화).
  - 시크릿이 없으면 조용히 건너뛴다("skipped") — 로컬/미설정 환경에서 접수가 막히지 않도록.
*/

export type InquiryNotice = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  type?: string;
  message: string;
  marketing: boolean;
};

export type NotifyResult = "sent" | "skipped" | "failed";

const DEFAULT_TO = "info@excorp.kr";
const DEFAULT_FROM = "EX Website <noreply@excorp.kr>";
const TIMEOUT_MS = 8000;

/** 외부 호출이 매달리지 않도록 타임아웃을 건다(문의 응답 지연 방지). */
function withTimeout(init: RequestInit): RequestInit & { signal: AbortSignal } {
  return { ...init, signal: AbortSignal.timeout(TIMEOUT_MS) };
}

const line = (label: string, value?: string) => `${label}: ${value?.trim() ? value : "-"}`;

function plainBody(i: InquiryNotice): string {
  return [
    line("이름", i.name),
    line("회사", i.company),
    line("이메일", i.email),
    line("연락처", i.phone),
    line("유형", i.type),
    line("마케팅 수신동의", i.marketing ? "동의" : "미동의"),
    "",
    "[문의 내용]",
    i.message,
  ].join("\n");
}

/** 관리자에게 접수 메일 발송. 회신하면 문의자에게 바로 가도록 replyTo를 문의자로 둔다. */
export async function sendInquiryEmail(i: InquiryNotice): Promise<NotifyResult> {
  const env = await resolveEnv();
  const key = env.RESEND_API_KEY;
  if (!key) return "skipped";

  const to = (env.CONTACT_NOTIFY_TO ?? DEFAULT_TO).split(",").map((s) => s.trim()).filter(Boolean);
  try {
    const res = await fetch(
      "https://api.resend.com/emails",
      withTimeout({
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: env.CONTACT_NOTIFY_FROM ?? DEFAULT_FROM,
          to,
          reply_to: i.email,
          subject: `[웹문의·${i.type ?? "일반 문의"}] ${i.name}`,
          text: plainBody(i),
        }),
      }),
    );
    if (!res.ok) {
      console.error("[notify] email failed", res.status, (await res.text()).slice(0, 200));
      return "failed";
    }
    return "sent";
  } catch (e) {
    console.error("[notify] email error:", (e as Error).message);
    return "failed";
  }
}

/** Google Chat 스페이스로 접수 알림. Incoming Webhook URL 하나만 있으면 된다. */
export async function sendChatNotice(i: InquiryNotice): Promise<NotifyResult> {
  const env = await resolveEnv();
  const url = env.GOOGLE_CHAT_WEBHOOK_URL;
  if (!url) return "skipped";

  // Chat 메시지는 길이 제한(4096자)이 있어 본문을 잘라 보낸다. 전문은 Notion에서 확인.
  const msg = i.message.length > 1200 ? `${i.message.slice(0, 1200)}…` : i.message;
  const text = [
    `*새 문의 접수* · ${i.type ?? "일반 문의"}`,
    line("이름", i.name),
    line("회사", i.company),
    line("이메일", i.email),
    line("연락처", i.phone),
    "",
    msg,
  ].join("\n");

  try {
    const res = await fetch(
      url,
      withTimeout({
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ text }),
      }),
    );
    if (!res.ok) {
      console.error("[notify] chat failed", res.status, (await res.text()).slice(0, 200));
      return "failed";
    }
    return "sent";
  } catch (e) {
    console.error("[notify] chat error:", (e as Error).message);
    return "failed";
  }
}
