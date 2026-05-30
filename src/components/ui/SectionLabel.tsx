/*
  Section label (inner pages). Visually unified with the Home label
  (src/components/home/SectionLabel.tsx): solid purple bar + all-purple
  mono text → "[ 01 ] LABEL". Left-aligned by default; works inside
  text-center wrappers too.
*/
export function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-primary">
      <span className="h-0.5 w-7 bg-primary" aria-hidden="true" />
      [ {index} ] {children}
    </span>
  );
}
