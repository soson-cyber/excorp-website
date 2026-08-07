import { NextResponse } from "next/server";
import { parseContactRequest } from "@/lib/contact-validation";
import { createInquiry } from "@/lib/notion";
import { sendChatNotice, sendInquiryEmail } from "@/lib/notify";

const RESPONSE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
  "X-Content-Type-Options": "nosniff",
};

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: RESPONSE_HEADERS });
}

export async function POST(req: Request) {
  const parsed = await parseContactRequest(req);
  if (!parsed.ok) return json({ ok: false, error: parsed.error }, parsed.status);
  const body = parsed.value;

  // 허니팟: 숨김 필드가 채워져 있으면 봇 → 조용히 성공 처리(저장 안 함)
  if (body.isBot) return json({ ok: true });

  const { name, email, message, type } = body;

  // ── 1) Notion WEBSITE_INQUIRY 에 접수 저장 (관리자 = Notion) ──────────
  // 문의 전용 Integration만 쓰기 권한을 갖는다. 저장 실패를 성공으로 응답하지 않는다.
  const stored = await createInquiry({
    name,
    company: body.company,
    email,
    phone: body.phone,
    type,
    message,
    marketing: body.marketing === true,
  });
  if (!stored) {
    console.error("[contact] lead persistence failed", { type });
    return NextResponse.json(
      { ok: false, error: "temporarily unavailable" },
      { status: 503, headers: RESPONSE_HEADERS },
    );
  }

  // ── 2) 알림: 이메일(Resend) + Google Chat ────────────────────────
  // 접수는 이미 Notion에 저장됐다. 알림 실패로 접수를 실패시키지 않고 로그만 남긴다.
  const notice = {
    name,
    company: body.company,
    email,
    phone: body.phone,
    type,
    message,
    marketing: body.marketing === true,
  };
  const [mail, chat] = await Promise.all([sendInquiryEmail(notice), sendChatNotice(notice)]);
  if (mail === "failed" || chat === "failed") {
    console.error("[contact] notification degraded", { type, mail, chat });
  }

  return json({ ok: true });
}
