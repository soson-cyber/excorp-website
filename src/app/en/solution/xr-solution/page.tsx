import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: { absolute: "EXLINK — All-in-One Real-time XR Solution | EX Corporation" },
  description:
    "EXLINK is EX’s own all-in-one real-time XR solution, tying capture, tracking, rendering, and streaming into a single control flow. From XR studio builds to a one-operator workflow â talk to us about quoting and rollout.",
  alternates: {
    canonical: "/en/solution/xr-solution",
    languages: {
      "ko-KR": "/solution/xr-solution",
      "en-US": "/en/solution/xr-solution",
      "x-default": "/solution/xr-solution",
    },
  },
};

const contrast = [
  { p: "Devices and software are scattered, each with different specs and controls", s: "Run consistently from a single control flow" },
  { p: "Every site needs time-consuming integration and sync setup", s: "Shorter setup and changeover, faster on-set response" },
  { p: "Crew is spread across each part, driving up operational load", s: "Streamlined into a one-operator workflow" },
];

const pipeline = [
  { t: "CAPTURE", k: "Capture · Multicam", d: "Takes in feeds from multiple cameras in real time." },
  { t: "TRACKING", k: "Camera tracking", d: "Tracks camera position and movement with precision." },
  { t: "EXLINK", k: "Integrated core", d: "Orchestrates capture, tracking, rendering, and streaming as one flow.", core: true },
  { t: "RENDER", k: "Real-time compositing", d: "Renders and composites virtual backgrounds and graphics in real time." },
  { t: "BROADCAST", k: "Streaming · Recording", d: "Streams live and records simultaneously." },
];

const connected: { t: string; role: string; d: string; href?: string }[] = [
  { t: "Aximmetry", role: "Linked", d: "EXLINK links the real-time 3D / virtual production render engine.", href: "/en/product/aximmetry" },
  { t: "Moverse AI", role: "Linked", d: "Integrates markerless AI motion capture into the EXLINK flow.", href: "/en/product/moverse" },
  { t: "RETracker", role: "Linked", d: "EXLINK ties in precision camera tracking.", href: "/en/product/retracker" },
  { t: "Media server · Network", role: "Linked", d: "Runs video-source playback and the on-site network together within the control flow." },
];

const adoption = [
  { step: "Adoption consulting", desc: "We review your goals, budget, and site conditions to design the right configuration." },
  { step: "System build · setup", desc: "We build and stabilize the gear and EXLINK to fit your site." },
  { step: "Training", desc: "We train your operators hands-on so they can run it themselves." },
  { step: "Support · operation", desc: "We stay on as a partner with ongoing technical support and operation after rollout." },
];

// Customer cases — real projects. Real client names kept per leadership decision (review gate before publishing).
// Honesty: performance figures and customer quotes are unverified → not shown. Summaries state only what was done.
type CaseStudy = { title: string; sector: string; client: string; summary: string; stack: string[]; period: string; img: string };
const featuredCase: CaseStudy = {
  title: "GS Retail home-shopping XR system build",
  sector: "System Integration",
  client: "GS Retail",
  summary: "Delivered jimmy-jib camera tracking and AR spatial direction in real time on a live home-shopping broadcast.",
  stack: ["EXLINK", "Aximmetry", "RETracker"],
  period: "2026.04",
  img: "/gs_track.png",
};
const cases: CaseStudy[] = [
  {
    title: "Shell Corporation 24FW YETI 2300s Collection",
    sector: "Virtual set · Fashion film",
    client: "Shell Corporation",
    summary: "Produced composited content using a real-time virtual space at our Hanam XR studio.",
    stack: ["Hanam XR Studio"],
    period: "2024.11",
    img: "/shell_vp.png",
  },
  {
    title: "2024 Jarasum Jazz Festival Live AR",
    sector: "Broadcast · Live",
    client: "Cultural Phenomenon",
    summary: "Added audio-reactive real-time AR graphics to the broadcast feed.",
    stack: ["EXLINK", "Aximmetry", "RETracker"],
    period: "2024.10",
    img: "/jarasum_ar.png",
  },
  {
    title: "Project Chowol Jam — Golden Two Piano Remix",
    sector: "Broadcast · Live · Previsualization",
    client: "Magic Hour",
    summary: "Ran previsualization using real-time virtual-space graphics on the broadcast feed.",
    stack: ["Hanam XR Studio"],
    period: "2025.08",
    img: "/jam_jazz.jpg",
  },
];

export default function XrSolutionPageEn() {
  return (
    <>
      <JsonLd
        schema={breadcrumbLd([
          { name: "Solution", path: "/en/solution" },
          { name: "XR Solution", path: "/en/solution/xr-solution" },
        ])}
      />
      <PageHero
        breadcrumb={[
          { label: "Solution", href: "/en/solution" },
          { label: "XR Solution", href: "/en/solution/xr-solution" },
        ]}
        tag="XR Solution · EX Original"
        title="Real-time XR production, finished in one flow"
        lead="From capture and tracking to virtual-background rendering and streaming â EXLINK ties a scattered XR pipeline into a single control flow. It’s EX’s own all-in-one real-time XR solution."
      />

      {/* §01 What is EXLINK */}
      <section className="section section--ink">
        <div className="container-ex">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel index="01">What is EXLINK</SectionLabel>
              <h2 className="h2" style={{ marginTop: 22 }}>
                What is EXLINK?
              </h2>
              <p className="lead" style={{ maxWidth: "36rem" }}>
                EXLINK is EX’s own all-in-one solution that unifies the capture, camera tracking, virtual-background rendering, compositing, media server, and streaming needed for real-time XR production into a single control flow. Instead of wiring up many devices and software separately, EXLINK orchestrates proven technologies from one place.
              </p>
              <p className="mt-6 border-l-2 border-primary pl-4 text-lg font-medium text-fg">
                A scattered real-time XR pipeline, brought into one control flow.
              </p>
            </div>
            <figure className="card" style={{ overflow: "hidden", padding: 0 }}>
              <Image src="/exlink_solution.png" alt="EXLINK all-in-one real-time XR solution — unified control flow across capture, tracking, rendering, and streaming" width={1672} height={941} priority className="h-auto w-full" />
            </figure>
          </div>
        </div>
      </section>

      {/* §02 Why integrated */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionLabel index="02">Why Integrated</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            Why an integrated solution
          </h2>
          <p className="lead" style={{ maxWidth: "42rem" }}>
            Build real-time XR yourself and your cameras, tracking, render, media server, and streaming all stand apart. EXLINK ties this into one flow â cutting complexity and letting you run faster with fewer people. Because a single drop is fatal in live broadcast, EX doesn’t stop at the build; we stay on as a partner through operation.
          </p>
          <p className="mt-5 border-l-2 border-primary pl-4 text-base italic leading-relaxed text-muted">
            &ldquo;Handling each device separately means it takes several people&rdquo; — this is exactly what integration solves.
          </p>
          {/* Two-column contrast — left: scattered setup (✕) / right: EXLINK integrated (✓), aligned 1:1 */}
          <div className="mx-auto mt-12 max-w-5xl">
            {/* Convergence visual — scattered components → (flow line) → EXLINK single integration */}
            <div className="grid items-stretch gap-3 sm:grid-cols-[1fr_64px_1fr] sm:gap-4">
              <div className="flex flex-col justify-center rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-xs uppercase tracking-wider text-faint">Scattered Setup</span>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {["Camera", "Tracker", "Render", "Media server", "Streaming"].map((x) => (
                    <span key={x} className="rounded-lg border border-dashed border-border bg-bg/40 px-3 py-1.5 text-sm text-muted">
                      {x}
                    </span>
                  ))}
                </div>
              </div>

              {/* Flow line — horizontal on desktop / vertical on mobile */}
              <div className="flex items-center justify-center">
                <span className="hidden w-full items-center gap-1.5 sm:flex" aria-hidden="true">
                  <span className="flowline-x" />
                  <span className="text-lg leading-none text-lav">▶</span>
                </span>
                <span className="flex flex-col items-center gap-1.5 sm:hidden" aria-hidden="true">
                  <span className="flowline-y" />
                  <span className="text-base leading-none text-lav">▼</span>
                </span>
              </div>

              <div
                className="flex flex-col justify-center rounded-2xl border border-primary/50 bg-primary-soft p-6 text-center"
                style={{ boxShadow: "0 0 36px -6px var(--color-primary)" }}
              >
                <span className="font-mono text-xs uppercase tracking-wider text-lav">EXLINK Integrated</span>
                <p className="mt-3 text-4xl font-bold tracking-tight text-lav md:text-5xl">EXLINK</p>
                <p className="mt-1 text-base text-muted">One control flow</p>
              </div>
            </div>

            {/* Item rows */}
            <div className="mt-4 space-y-4">
              {contrast.map((c) => (
                <div key={c.s} className="grid items-stretch gap-3 sm:grid-cols-[1fr_64px_1fr] sm:gap-4">
                  <div className="card flex items-start gap-3" style={{ padding: 22 }}>
                    <span className="mt-0.5 shrink-0 text-lg font-semibold text-faint" aria-hidden="true">✕</span>
                    <p className="text-base leading-relaxed text-muted">{c.p}</p>
                  </div>
                  <span className="flex rotate-90 items-center justify-center text-lg text-lav sm:rotate-0" aria-hidden="true">
                    →
                  </span>
                  <div className="card flex items-start gap-3 border-primary/40" style={{ padding: 22 }}>
                    <span className="mt-0.5 shrink-0 text-lg font-semibold text-lav" aria-hidden="true">✓</span>
                    <p className="text-base font-medium leading-relaxed text-fg">{c.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* §03 Architecture */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="03">Architecture</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            Configuration / architecture
          </h2>
          <p className="mt-4 font-mono text-xs uppercase tracking-wider text-faint">
            CAPTURE → TRACKING → EXLINK CORE → RENDER → BROADCAST
          </p>
          <div className="mt-10 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-stretch">
            {pipeline.map((n, i) => (
              <Fragment key={n.t}>
                <div
                  className={`flex-1 rounded-2xl border p-5 lg:basis-[180px] ${
                    n.core ? "border-primary bg-primary-soft" : "border-border bg-card"
                  }`}
                >
                  <span className={`font-mono text-xs uppercase tracking-wider ${n.core ? "text-lav" : "text-faint"}`}>{n.t}</span>
                  <h3 className={`mt-2 font-semibold ${n.core ? "text-lav" : "text-fg"}`}>{n.k}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{n.d}</p>
                </div>
                {i < pipeline.length - 1 && (
                  <span className="flex items-center justify-center self-center rotate-90 text-lav lg:rotate-0" aria-hidden="true">
                    →
                  </span>
                )}
              </Fragment>
            ))}
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-border">
            <Image
              src="/exlink-vp-core.png"
              alt="EX-LINK VP Production Core unified signal flow — an isometric diagram connecting camera and tracking systems, the media server, the broadcast system, and platform streaming into one"
              width={1672}
              height={941}
              sizes="(max-width: 768px) 100vw, 960px"
              className="h-auto w-full"
            />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-faint">
            * The node flow above is a conceptual configuration, rendered as an isometric diagram of the EX-LINK unified signal flow.
          </p>
        </div>
      </section>

      {/* §04 Connected tech */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionLabel index="04">Connected Tech</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            Technologies we connect
          </h2>
          <p className="lead" style={{ maxWidth: "42rem" }}>
            <span className="inline-block">EXLINK doesn’t build proven specialist technology itself â it orchestrates it within one flow.</span>{" "}
            <span className="inline-block">The partner products below are technologies EX supplies in Korea,</span>{" "}
            <span className="inline-block">and EXLINK links and integrates them.</span>
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {connected.map((c) => {
              const inner = (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-fg">{c.t}</h3>
                    <span className="shrink-0 rounded-full bg-primary-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-lav">
                      {c.role}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.d}</p>
                  {c.href && (
                    <span className="arrowlink mt-4 text-sm">
                      View product{" "}
                      <span className="ar" aria-hidden="true">
                        →
                      </span>
                    </span>
                  )}
                </>
              );
              return c.href ? (
                <Link key={c.t} href={c.href} className="card group flex flex-col" style={{ padding: 24 }}>
                  {inner}
                </Link>
              ) : (
                <div key={c.t} className="card flex flex-col" style={{ padding: 24 }}>
                  {inner}
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-faint">
            * Aximmetry, Moverse AI, and RETracker are products of their respective manufacturers; EXLINK links and orchestrates them. The in-house development is the integrated core (EXLINK).
          </p>
        </div>
      </section>

      {/* §07 Adoption */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="05">Adoption</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            <span className="inline-block">How adoption works —</span>{" "}
            <span className="inline-block">from consulting to operation</span>
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {adoption.map((a, i) => (
              <div key={a.step} className="card" style={{ padding: 24 }}>
                <span className="font-mono text-3xl font-bold text-lav tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-semibold text-fg">{a.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/en/contact">Talk to us →</Button>
            <Button href="/en/solution/virtual-production" variant="glow">
              Explore Virtual Production →
            </Button>
          </div>
        </div>
      </section>

      {/* §06 Customer cases — featured 1 + grid */}
      <section className="section section--surface section--glow">
        <div className="container-ex">
          <SectionLabel index="06">Customer Cases</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            Customer cases
          </h2>
          <p className="lead" style={{ maxWidth: "42rem" }}>
            Projects delivered on real sets with EXLINK and our Hanam XR studio.
          </p>

          {/* Featured case */}
          <div className="card mt-12 grid items-stretch gap-0 overflow-hidden p-0 lg:grid-cols-2">
            <div className="aspect-video overflow-hidden bg-bg/60 lg:aspect-auto">
              <Image src={featuredCase.img} alt={`${featuredCase.title} — ${featuredCase.summary}`} width={1280} height={720} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-9">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary-soft px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-lav">Featured</span>
                <span className="font-mono text-xs uppercase tracking-wider text-faint">{featuredCase.sector}</span>
              </div>
              <h3 className="mt-4 text-2xl font-bold leading-snug text-fg">{featuredCase.title}</h3>
              <p className="mt-1.5 text-sm font-medium text-lav">{featuredCase.client}</p>
              <p className="mt-3 leading-relaxed text-muted">{featuredCase.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {featuredCase.stack.map((s) => (
                  <li key={s} className="rounded-full border border-border bg-card px-3 py-1 text-xs text-fg">{s}</li>
                ))}
              </ul>
              <p className="mt-5 font-mono text-xs text-faint">{featuredCase.period}</p>
            </div>
          </div>

          {/* Secondary case grid */}
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cases.map((c) => (
              <div key={c.title} className="card flex flex-col" style={{ padding: 0, overflow: "hidden" }}>
                <div className="aspect-video w-full overflow-hidden bg-bg/60">
                  <Image src={c.img} alt={`${c.title} — ${c.summary}`} width={1280} height={720} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-faint">{c.sector}</span>
                  <h3 className="mt-2 font-semibold leading-snug text-fg">{c.title}</h3>
                  <p className="mt-1 text-sm font-medium text-lav">{c.client}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {c.stack.map((s) => (
                      <li key={s} className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] text-muted">{s}</li>
                    ))}
                  </ul>
                  <p className="mt-3 font-mono text-[11px] text-faint">{c.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner variant="studio" locale="en" />
    </>
  );
}
