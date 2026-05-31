/*
  Light-theme section label for the white Home.
  Renders: a 28px × 2px purple bar + mono text, e.g. "— [ 01 ] WHAT WE DO".
  (The dark-theme SectionLabel lives at src/components/ui/SectionLabel.tsx.)
*/
export function SectionLabel({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-primary">
      <span className="h-0.5 w-7 bg-primary" aria-hidden="true" />
      {children}
    </span>
  );
}

export default SectionLabel;
