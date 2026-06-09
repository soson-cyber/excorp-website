import type { ReactNode } from "react";

export type Crumb = { label: string; href: string };

export function PageHero({
  tag,
  eyebrow,
  title,
  lead,
  bgImage,
}: {
  /** Accepted for back-compat but no longer rendered — the top nav covers it. */
  breadcrumb?: Crumb[];
  tag?: string;
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  /** Optional full-bleed background image (key visual). When set, the aurora is suppressed and a scrim keeps text legible. */
  bgImage?: string;
}) {
  return (
    <section
      className={`pagehero relative overflow-hidden ${
        bgImage ? "flex items-center min-h-[max(440px,min(56.25vw,820px))]" : ""
      }`}
    >
      {bgImage ? (
        <>
          {/* 데코 배경 — 가로폭 기준 16:9로 채움(섹션 높이=폭×9/16). next/image 최적화 우회(풀블리드), alt 비움 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bgImage} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div
            className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/55 to-bg"
            aria-hidden="true"
          />
        </>
      ) : (
        <div className="pagehero-aurora" aria-hidden="true" />
      )}
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
          className={`text-balance break-keep [overflow-wrap:anywhere] text-[clamp(1.9rem,6vw,5.25rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-gradient-ex-bright sm:leading-[1.02] ${
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
