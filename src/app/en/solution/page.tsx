import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import Image from "next/image";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { ProblemTrio } from "@/components/page/ProblemTrio";
import { SegmentGrid } from "@/components/page/SegmentGrid";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: { absolute: "XR Solution Builds & Virtual Production | EX Corporation" },
  description:
    "EXLINK, our own integrated XR solution, plus virtual production builds. EX unifies capture, tracking, rendering, and streaming into a real-time XR environment tailored to your site — and supports you from consultation and quoting through day-to-day operation.",
  alternates: {
    canonical: "/en/solution",
    languages: { "ko-KR": "/solution", "en-US": "/en/solution", "x-default": "/solution" },
  },
};

const approach = [
  { k: "All-in-One", v: "Unified system" },
  { k: "Real-time", v: "Sub-1-frame latency target" },
  { k: "Integrated", v: "Single control UI" },
  { k: "End-to-End", v: "Setup · training · operation" },
];

// Problem Quote Trio (§0-A) — where building XR yourself stalls (customer language).
const problems = [
  { id: "PAIN 01", quote: "Every device has its own spec, and integration stalls.", desc: "Cameras, trackers, renderers, and streaming gear all differ, so wiring and syncing them takes time every single time." },
  { id: "PAIN 02", quote: "Overseas solutions ship English-only manuals, and support is slow when things break.", desc: "When something fails on set, time-zone gaps and language barriers slow the response." },
  { id: "PAIN 03", quote: "The system got built â but there’s no one to run it.", desc: "If a project ends at installation, the gear just sits in storage. You need training and support to run it yourself." },
];

// Segment slots (§0-C) — where the XR solution fits.
const segments = [
  { tag: "Broadcast · Live", d: "Broadcasters and live production teams that need real-time XR and AR graphics layered onto live feeds." },
  { tag: "Enterprise · Commerce", d: "Companies running IR sessions, webinars, and live commerce repeatedly on their own stage — no set changes." },
  { tag: "University · Education", d: "Institutions building a hands-on environment to teach virtual production directly." },
];

// Items with their own page link out via href.
const capability: { step: string; parts: { label: string; href?: string }[] }[] = [
  {
    step: "Capture · Tracking",
    parts: [
      { label: "RETracker", href: "/en/product/retracker" },
      { label: "Moverse AI", href: "/en/product/moverse" },
    ],
  },
  {
    step: "Compositing · Render",
    parts: [{ label: "Unreal Engine" }, { label: "Aximmetry", href: "/en/product/aximmetry" }],
  },
  {
    step: "Media Server · Streaming",
    parts: [{ label: "EXLINK", href: "/en/solution/xr-solution" }],
  },
  {
    step: "Live Direction · Operation",
    parts: [{ label: "EXLINK", href: "/en/solution/xr-solution" }, { label: "Expert crew", href: "/en/xr-studio" }],
  },
];

const proof = [
  { n: "6+", l: "Technology patents" },
  { n: "3", l: "Global partners" },
  { n: "3", l: "University MOUs" },
  { n: "4", l: "Product certifications" },
];

export default function SolutionPageEn() {
  return (
    <>
      <JsonLd schema={breadcrumbLd([{ name: "Solution", path: "/en/solution" }])} />
      <PageHero
        breadcrumb={[{ label: "Solution", href: "/en/solution" }]}
        tag="Solution"
        title="We build the XR environment your site needs."
        lead={
          <>
            <span className="inline-block">From EXLINK, our own integrated solution, to proven global partner technology and a working production studio</span>{" "}
            <span className="inline-block">— we support content production from start to finish.</span>
          </>
        }
      />

      {/* Problem Quote Trio — where building XR yourself stalls (§0-A) */}
      <ProblemTrio
        index="00"
        label="Before EX"
        title="Ever stalled trying to build XR on your own?"
        problems={problems}
        note="EX closes these gaps with EXLINK, our own solution, and Korean-language technical support."
      />

      {/* §00 Hero media band — EXLINK integrated solution diagram */}
      <section className="section section--ink">
        <div className="container-ex">
          <Image
            src="/exlink_solution.png"
            alt="EXLINK integrated XR solution — pipeline diagram linking capture, tracking, rendering, and streaming into one"
            width={1672}
            height={941}
            sizes="(max-width: 1280px) 100vw, 1216px"
            className="h-auto w-full rounded-2xl border border-border"
          />
        </div>
      </section>

      {/* §01 Approach */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionHead
            index="01"
            label="Approach"
            titleMaxWidth="48rem"
            title={
              <>
                <span className="inline-block">Our own technology and global partners —</span>{" "}
                <span className="inline-block">two pillars for every kind of set.</span>
              </>
            }
            lead={
              <>
                EX holds the assets a VP project needs — our own integrated solution, proven partner products, and a
                working studio. Whatever the XR environment, you can start it with EX.
              </>
            }
          />
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {approach.map((a) => (
              <div key={a.k} className="card" style={{ padding: 22 }}>
                <span className="cap" style={{ color: "var(--color-lav)" }}>
                  {a.k}
                </span>
                <p className="mt-2 text-base font-semibold text-fg">{a.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §02 Two Routes */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead
            index="02"
            label="Two Routes"
            titleMaxWidth="48rem"
            title={
              <>
                <span className="inline-block">Our own solution and a proven methodology —</span>{" "}
                <span className="inline-block">two ways to begin.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <Link
              href="/en/solution/xr-solution"
              className="card group relative flex flex-col justify-between lg:col-span-2"
              style={{ padding: 32 }}
            >
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-lav">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                  EX Original
                </span>
                <h3 className="mt-5 text-3xl font-bold text-fg">
                  XR Solution <span className="text-lav">EXLINK</span>
                </h3>
                <p className="mt-4 max-w-xl text-muted">
                  EX’s own integrated XR solution that ties cameras, trackers, motion sensors, networking, and the
                  media server into a single control flow — run by one operator.
                </p>
              </div>
              <span className="arrowlink arrowlink--accent" style={{ marginTop: 32 }}>
                Explore EXLINK{" "}
                <span className="ar" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
            <Link href="/en/solution/virtual-production" className="card group flex flex-col justify-between" style={{ padding: 32 }}>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-lav">Methodology</span>
                <h3 className="mt-3 text-2xl font-semibold text-fg">Virtual Production</h3>
                <p className="mt-3 text-muted">
                  A production method where shooting, compositing, and direction happen at once. Chroma key · real-time XR tracking · AR · ICVFX · LED Wall.
                </p>
              </div>
              <span className="arrowlink" style={{ marginTop: 32 }}>
                Learn how it works{" "}
                <span className="ar" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* §03 Capability */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionHead index="03" label="Capability" title="We cover every stage of production" />
          <div className="card mt-12" style={{ overflow: "hidden", padding: 0 }}>
            {capability.map((c, i) => (
              <div
                key={c.step}
                className="flex flex-col gap-1 p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8"
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-border)" }}
              >
                <span className="text-lg font-semibold text-fg">{c.step}</span>
                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                  {c.parts.map((p, j) => (
                    <span key={p.label + j}>
                      {j > 0 && <span aria-hidden="true"> · </span>}
                      {p.href ? (
                        <Link
                          href={p.href}
                          className="underline-offset-4 transition-colors hover:text-lav hover:underline"
                        >
                          {p.label} ↗
                        </Link>
                      ) : (
                        p.label
                      )}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §04 Proof */}
      <section className="section section--surface section--glow">
        <div className="container-ex">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {proof.map((p) => (
              <div key={p.l} className="text-center">
                <p className="font-mono text-4xl font-bold text-lav tabular-nums md:text-5xl">{p.n}</p>
                <p className="mt-2 text-sm text-muted">{p.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Segment slot — where this fits (§0-C) */}
      <SegmentGrid index="05" label="For Whom" title="Where this fits" segments={segments} />

      <CtaBanner locale="en" />
    </>
  );
}
