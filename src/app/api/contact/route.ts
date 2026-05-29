import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  company?: string;
  email?: string;
  type?: string;
  message?: string;
};

// 유형별 수신자 라우팅 (도메인 메일 확정 시 교체)
const ROUTING: Record<string, string> = {
  "솔루션 도입": "sales@excorp.kr",
  "스튜디오 대관": "booking@excorp.kr",
  "일반 문의": "info@excorp.kr",
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid body" }, { status: 400 });
  }

  const { name, email, message, type } = body;
  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "missing fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid email" }, { status: 400 });
  }

  const to = ROUTING[type ?? "일반 문의"] ?? "info@excorp.kr";

  // ── 스캐폴드: 현재는 서버 로그에 접수만 기록 ──────────────────
  // 실제 가동 시(아래 한 번만 작업):
  //   1) `npm i resend` 후 RESEND_API_KEY 환경변수 설정
  //   2) 아래 블록 주석 해제 — 유형별 `to`로 발송 + replyTo=문의자
  //   3) (선택) Notion DB(NOTION_TOKEN/NOTION_DB_ID)에 리드 행 생성
  //
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY!);
  // await resend.emails.send({
  //   from: "EX Website <noreply@excorp.kr>",
  //   to, replyTo: email,
  //   subject: `[웹문의·${type ?? "일반 문의"}] ${name}`,
  //   text: `이름: ${name}\n회사: ${body.company ?? "-"}\n이메일: ${email}\n유형: ${type ?? "-"}\n\n${message}`,
  // });
  console.info("[contact] received lead →", { to, name, email, type });

  return NextResponse.json({ ok: true });
}
