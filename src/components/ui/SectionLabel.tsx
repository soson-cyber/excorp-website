/*
  Section label — "[ 01 ] LABEL" with a lavender bar + uppercase wide-tracking
  sans (dark theme). Uses the .seclabel kit class. Left-aligned by default;
  works inside text-center wrappers too. index를 생략하면 번호 없이 "LABEL"만 표시한다.
*/
export function SectionLabel({
  index,
  children,
  tone = "lav",
}: {
  /** 생략하면 번호 없이 라벨만 표시한다. */
  index?: string;
  children: string;
  /** 라벤더(기본) 또는 민트. 민트는 "다른 상품/다른 축"을 알리는 신호로만 쓴다. */
  tone?: "lav" | "mint";
}) {
  return (
    // 라벨은 항상 영문이다 — lang을 명시해 한국어 음성 합성이 뭉개지 않게 한다.
    <span lang="en" className={tone === "mint" ? "seclabel seclabel--mint" : "seclabel"}>
      <span className="bar" aria-hidden="true" />
      {index ? `[ ${index} ] ${children}` : children}
    </span>
  );
}
