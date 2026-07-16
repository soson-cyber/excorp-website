import { NextResponse } from "next/server";
import { parseContactRequest } from "@/lib/contact-validation";
import { createInquiry } from "@/lib/notion";

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

  // ── 2) (선택) 이메일 알림 ────────────────────────────────────────
  //   `npm i resend` + RESEND_API_KEY 후 아래 활성화 — 유형별 `to`로 발송, replyTo=문의자
  //   import { Resend } from "resend";
  //   await new Resend(process.env.RESEND_API_KEY!).emails.send({
  //     from: "EX Website <noreply@excorp.kr>", to: "info@excorp.kr", replyTo: email,
  //     subject: `[웹문의·${type ?? "일반 문의"}] ${name}`,
  //     text: `이름:${name}\n회사:${body.company ?? "-"}\n이메일:${email}\n유형:${type ?? "-"}\n\n${message}`,
  //   });

  return json({ ok: true });
}
