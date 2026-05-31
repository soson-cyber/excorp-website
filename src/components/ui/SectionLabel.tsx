/*
  Section label — "[ 01 ] LABEL" with a lavender bar + uppercase wide-tracking
  sans (dark theme). Uses the .seclabel kit class. Left-aligned by default;
  works inside text-center wrappers too.
*/
export function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <span className="seclabel">
      <span className="bar" aria-hidden="true" />
      [ {index} ] {children}
    </span>
  );
}
