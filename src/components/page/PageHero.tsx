import type { ReactNode } from "react";

export type Crumb = { label: string; href: string };

export function PageHero({
  tag,
  eyebrow,
  title,
  lead,
  bgImage,
  bgImageNoUpscale = false,
}: {
  /** Accepted for back-compat but no longer rendered — the top nav covers it. */
  breadcrumb?: Crumb[];
  tag?: string;
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  /** Optional full-bleed background image (key visual). When set, the aurora is suppressed and a scrim keeps text legible. */
  bgImage?: string;
  /** Keep the background key visual at or below its intrinsic size instead of scaling it past 100%. */
  bgImageNoUpscale?: boolean;
}) {
  return (
    <section
      className={`pagehero relative overflow-hidden ${
        bgImage ? "flex items-center min-h-[max(440px,min(56.25vw,820px))]" : ""
      }`}
    >
      {bgImage ? (
        <>
          {/* 데코 배경 — 기본은 풀블리드 cover. no-upscale 키비주얼은 원본 크기를 유지하고, 좌우 여백은 같은 이미지를 흐린 컬러 필드로 깔아 자연스럽게 연결한다. */}
          {bgImageNoUpscale && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bgImage}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-45 blur-2xl saturate-125"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-bg)_82%)]" aria-hidden="true" />
            </>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bgImage}
            alt=""
            aria-hidden="true"
            className={
              bgImageNoUpscale
                ? "absolute left-1/2 top-1/2 h-auto w-auto max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain"
                : "absolute inset-0 h-full w-full object-cover object-center"
            }
          />
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
