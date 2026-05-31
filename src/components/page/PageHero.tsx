import Link from "next/link";
import { Fragment } from "react";

export type Crumb = { label: string; href: string };

export function PageHero({
  breadcrumb,
  tag,
  title,
  lead,
}: {
  breadcrumb: Crumb[];
  tag?: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="bg-grid absolute inset-0 opacity-40" />
      <div className="container-ex relative py-24 text-center md:py-32">
        <nav className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-xs text-faint">
          <Link href="/" className="hover:text-fg">
            Home
          </Link>
          {breadcrumb.map((c, i) => (
            <Fragment key={c.href}>
              <span className="text-faint/60">/</span>
              {i === breadcrumb.length - 1 ? (
                <span className="text-muted">{c.label}</span>
              ) : (
                <Link href={c.href} className="hover:text-fg">
                  {c.label}
                </Link>
              )}
            </Fragment>
          ))}
        </nav>

        {tag && (
          <div className="mt-7 inline-flex rounded-full border border-border bg-surface/60 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-primary">
            {tag}
          </div>
        )}

        <h1 className="mt-5 text-balance text-[clamp(2.75rem,6vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-gradient-ex">
          {title}
        </h1>

        {lead && (
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
