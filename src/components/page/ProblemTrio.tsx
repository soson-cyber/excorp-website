/*
  Problem Trio (§0-A) — 공용 컴포넌트.
  solution · solution/virtual-production · product 인덱스 3개 페이지에서 쓰는
  "번호 + 카테고리 라벨 + 선언 헤딩 + 본문" 3열 에디토리얼 패턴.
  (기존 PAIN 인용 카드에서 넘버드 레이아웃으로 개편 — 2026-07-23 대표 승인.
   각주 스탯은 거버넌스상 수치 금지라 사용하지 않는다.)

  반응형:
  - .featgrid 가 1열(모바일) → 3열(≥768px) 전환을 담당.
  - 헤딩은 text-balance + break-keep 으로 어절 단위 줄바꿈.
  - 하단 정리 문구는 text-balance 로 어색한 줄바꿈 방지.
*/
import { SectionHead } from "@/components/ui/SectionHead";

export type Problem = { no: string; cat: string; title: string; desc: string };

export function ProblemTrio({
  index = "00",
  label,
  title,
  problems,
  note,
  tone = "section--surface",
}: {
  index?: string;
  label: string;
  title: string;
  problems: Problem[];
  note: string;
  tone?: string;
}) {
  return (
    <section className={`section ${tone}`}>
      <div className="container-ex">
        <SectionHead index={index} label={label} title={title} />
        <div className="featgrid">
          {problems.map((p) => (
            <div key={p.no} className="border-t pt-7" style={{ borderColor: "var(--color-border-strong)" }}>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-3xl font-bold tabular-nums text-faint">{p.no}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-lav">{p.cat}</span>
              </div>
              <h3 className="mt-5 text-balance break-keep text-xl font-semibold leading-snug text-fg md:text-[1.35rem]">
                {p.title}
              </h3>
              <p className="carddesc" style={{ marginTop: 14 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-2xl text-balance text-center text-[15px] text-muted">
          {note}
        </p>
      </div>
    </section>
  );
}
