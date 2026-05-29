import { SectionLabel } from "@/components/ui/SectionLabel";

export type SectionSpec = {
  index: string;
  label: string;
  title: string;
  desc?: string;
  blocks?: number; // number of skeleton blocks to render
  id?: string;
};

/* A scaffolded section: real label/title from the master plan + placeholder body.
   Content is intentionally a skeleton until final copy/assets land. */
export function PlaceholderSection({
  spec,
  surface = false,
}: {
  spec: SectionSpec;
  surface?: boolean;
}) {
  const { index, label, title, desc, blocks = 0, id } = spec;
  return (
    <section id={id} className={surface ? "bg-surface/40" : ""}>
      <div className="container-ex py-section text-center">
        <div className="flex items-center justify-center gap-3">
          <SectionLabel index={index}>{label}</SectionLabel>
          <span className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-faint">
            준비 중
          </span>
        </div>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance text-2xl font-bold leading-snug md:text-3xl">
          {title}
        </h2>
        {desc && <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted">{desc}</p>}

        {blocks > 0 && (
          <div
            className={`mt-10 grid gap-5 sm:grid-cols-2 ${
              blocks >= 4 ? "lg:grid-cols-4" : blocks === 3 ? "lg:grid-cols-3" : ""
            }`}
          >
            {Array.from({ length: blocks }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-surface p-6"
                aria-hidden="true"
              >
                <div className="h-8 w-8 rounded-lg bg-surface-2" />
                <div className="mt-5 h-3 w-2/3 rounded bg-surface-2" />
                <div className="mt-2.5 h-2.5 w-full rounded bg-surface-2/70" />
                <div className="mt-2 h-2.5 w-4/5 rounded bg-surface-2/70" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
