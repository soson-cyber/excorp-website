/*
  Segment slot (§0-C) — 공용 컴포넌트.
  solution · solution/virtual-production 의 "For Whom — 이런 곳에 맞습니다" 패턴
  (SectionLabel + h2 + tag 카드 3개)을 단일 컴포넌트로 추출했다.

  반응형: .featgrid 가 1열(모바일) → 3열(≥768px) 전환을 담당.
*/
import { SectionLabel } from "@/components/ui/SectionLabel";

export type Segment = { tag: string; d: string };

export function SegmentGrid({
  index,
  label = "For Whom",
  title = "이런 곳에 맞습니다",
  segments,
  tone = "section--white",
}: {
  index: string;
  label?: string;
  title?: string;
  segments: Segment[];
  tone?: string;
}) {
  return (
    <section className={`section ${tone}`}>
      <div className="container-ex">
        <SectionLabel index={index}>{label}</SectionLabel>
        <h2 className="h2" style={{ marginTop: 22 }}>
          {title}
        </h2>
        <div className="featgrid">
          {segments.map((s) => (
            <div key={s.tag} className="card cardpad">
              <span className="tag">{s.tag}</span>
              <p className="mt-4 text-sm leading-relaxed text-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
