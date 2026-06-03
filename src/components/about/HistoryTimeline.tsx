/*
  연혁 — 중앙 세로줄(스파인) + 연도별 좌우 교차(zigzag) 타임라인.
  각 연도 노드는 중앙선 위의 점에 연결되고, 카드가 좌/우 번갈아 배치된다.
  순수 CSS(반응형: 모바일은 좌측 단일 컬럼). reduced-motion 무관.
*/
export function HistoryTimeline({ items }: { items: { year: string; items: string[] }[] }) {
  return (
    <div className="tl mt-16">
      {items.map((h, i) => (
        <div key={h.year} className={`tl-row ${i % 2 === 0 ? "tl-row--left" : "tl-row--right"}`}>
          <span className="tl-dot" aria-hidden="true" />
          <div className="tl-card card">
            <span className="tl-year">{h.year}</span>
            <ul className="tl-items">
              {h.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
