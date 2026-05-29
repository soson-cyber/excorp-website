export function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
      <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
      <span className="text-faint">[ {index} ]</span>
      {children}
    </span>
  );
}
