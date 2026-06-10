/*
  Problem Quote Trio (§0-A) — 공용 컴포넌트.
  solution · solution/virtual-production · product 인덱스 3개 페이지에서 동일하게 쓰던
  "PAIN 인용 카드 3개 + 하단 정리 문구" 패턴을 단일 컴포넌트로 추출했다.

  반응형:
  - .featgrid 가 1열(모바일) → 3열(≥768px) 전환을 담당.
  - 인용문은 .quote-txt 의 clamp(1.35rem→1.875rem) 폰트 스케일에 맡긴다(기존 inline
    fontSize 1.25rem 오버라이드 제거 → 모바일 과대치 방지·반응형 일관).
  - 하단 정리 문구는 text-balance 로 어색한 줄바꿈 방지.
*/
import { SectionHead } from "@/components/ui/SectionHead";

export type Problem = { id: string; quote: string; desc: string };

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
            <div key={p.id} className="card cardpad">
              <blockquote style={{ margin: 0 }}>
                <span className="quote-ey">
                  <span className="quote-bar" aria-hidden="true" />
                  {p.id}
                </span>
                <p className="quote-txt" style={{ lineHeight: 1.5 }}>
                  “{p.quote}”
                </p>
                <p className="carddesc" style={{ marginTop: 16 }}>
                  {p.desc}
                </p>
              </blockquote>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-balance text-center text-[15px] text-muted">
          {note}
        </p>
      </div>
    </section>
  );
}
