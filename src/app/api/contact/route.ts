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

// 유형별 수신자 라우팅 (이메일 알림 가동 시 사용)
const ROUTING: Record<string, string> = {
  "솔루션 도입": "sales@excorp.kr",
  "제품 도입": "sales@excorp.kr",
  "스튜디오 제작": "booking@excorp.kr",
  "기술 지원": "support@excorp.kr",
  "일반 문의": "info@excorp.kr",
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

  const to = ROUTING[type ?? "일반 문의"] ?? "info@excorp.kr";

  // ── 1) Notion WEBSITE_INQUIRY 에 접수 저장 (관리자 = Notion) ──────────
  // NOTION_TOKEN + NOTION_DS_INQUIRY 설정 시 동작. 실패해도 사용자 응답은 성공 유지.
  // createInquiry가 토큰/DS 미설정 시 false 반환(예외 없음) — 별도 게이트 불필요.
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
    // Notion 미설정/실패 시 최소한 서버 로그로 유실 방지
    console.info("[contact] lead (Notion 미저장) →", { to, name, email, type });
  }

  // ── 2) (선택) 이메일 알림 ────────────────────────────────────────
  //   `npm i resend` + RESEND_API_KEY 후 아래 활성화 — 유형별 `to`로 발송, replyTo=문의자
  //   import { Resend } from "resend";
  //   await new Resend(process.env.RESEND_API_KEY!).emails.send({
  //     from: "EX Website <noreply@excorp.kr>", to, replyTo: email,
  //     subject: `[웹문의·${type ?? "일반 문의"}] ${name}`,
  //     text: `이름:${name}\n회사:${body.company ?? "-"}\n이메일:${email}\n유형:${type ?? "-"}\n\n${message}`,
  //   });

  return NextResponse.json({ ok: true });
}
