export type Crumb = { label: string; href: string };

export function PageHero({
  tag,
  eyebrow,
  title,
  lead,
}: {
  /** Accepted for back-compat but no longer rendered — the top nav covers it. */
  breadcrumb?: Crumb[];
  tag?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="pagehero relative overflow-hidden">
      <div className="pagehero-aurora" aria-hidden="true" />
      <div className="bg-grid absolute inset-0 opacity-40" />
      <div className="pagehero-fade" aria-hidden="true" />
      <div className="container-ex pagehero__inner relative text-center">
        {tag && (
          <div className="inline-flex rounded-full border border-border bg-surface/60 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-lav">
            {tag}
          </div>
        )}

        {eyebrow && (
          <p
            className={`mx-auto max-w-4xl text-balance bg-gradient-to-b from-white to-[#8b90a3] bg-clip-text text-2xl font-semibold text-transparent md:text-[2.5rem] md:leading-tight ${
              tag ? "mt-7" : ""
            }`}
          >
            {eyebrow}
          </p>
        )}

        <h1
          className={`text-balance text-[clamp(2.75rem,6vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-gradient-ex-bright ${
            tag || eyebrow ? "mt-3" : ""
          }`}
        >
          {title}
        </h1>

        {lead && (
          <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-muted">{lead}</p>
        )}
      </div>
      {/* Header watches this: while it sits below the bar the header stays
          transparent so the aurora bleeds through; scrolling past it → solid. */}
      <span className="pagehero__sentinel" data-hero-sentinel aria-hidden="true" />
    </section>
  );
}
