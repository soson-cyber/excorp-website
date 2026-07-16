import { NextResponse } from "next/server";
import { createInquiry } from "@/lib/notion";

type Payload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  type?: string;
  message?: string;
  consent?: boolean; // 개인정보 수집·이용 동의(필수)
  marketing?: boolean; // 마케팅 정보 수신 동의(선택)
  website?: string; // 허니팟(봇 차단용 — 사람은 비워둠)
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid body" }, { status: 400 });
  }

  // 허니팟: 숨김 필드가 채워져 있으면 봇 → 조용히 성공 처리(저장 안 함)
  if (body.website) return NextResponse.json({ ok: true });

  const { name, email, message, type } = body;
  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "missing fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid email" }, { status: 400 });
  }
  if (body.consent !== true) {
    return NextResponse.json({ ok: false, error: "consent required" }, { status: 400 });
  }

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
    console.error("[contact] lead persistence failed", { type: type ?? "일반 문의" });
    return NextResponse.json(
      { ok: false, error: "temporarily unavailable" },
      { status: 503 },
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

  return NextResponse.json({ ok: true });
}
