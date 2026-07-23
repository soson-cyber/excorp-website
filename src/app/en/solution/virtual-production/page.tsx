import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { ProblemTrio } from "@/components/page/ProblemTrio";
import { SegmentGrid } from "@/components/page/SegmentGrid";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: { absolute: "Virtual Production Builds — Finished as You Shoot | EX Corporation" },
  description:
    "Virtual production combines digital backgrounds with live shooting in real time, finishing on set. From chroma key and Simulcam to in-camera VFX (ICVFX) and AR, EX supports the build, the quote, and operation.",
  alternates: {
    canonical: "/en/solution/virtual-production",
    languages: {
      "ko-KR": "/solution/virtual-production",
      "en-US": "/en/solution/virtual-production",
      "x-default": "/solution/virtual-production",
    },
  },
};

// Problem Quote Trio (§0-A) — pains when adopting VP for the first time (VP-specific).
const problems = [
  { id: "PAIN 01", quote: "Virtual production: I don’t know where to start.", desc: "Devices and software are all over the place, and overseas solutions are hard to communicate with." },
  { id: "PAIN 02", quote: "I can’t gauge how much the initial rollout will cost.", desc: "Get a quote without knowing the configuration and scale you need, and you lose either way: too much or too little." },
  { id: "PAIN 03", quote: "I can’t confirm on set whether the footage works.", desc: "Without seeing the composited result in-camera, you only catch problems in post." },
];

// Segment slots (§0-C) — where VP fits.
const segments = [
  { tag: "Broadcast · Live commerce", d: "Teams that need to switch live and live-commerce stages instantly, with no set changes." },
  { tag: "Enterprise · Events", d: "Companies running IR sessions, webinars, and conferences on a polished virtual stage." },
  { tag: "Fashion · Commerce", d: "Fashion and product content that needs many spaces and looks shot in one studio." },
];

// Maps the UE workflow (World Capture â Performance Capture â Simulcam â ICVFX) to EX’s owned and distributed assets.
const pipeline: { stage: string; t: string; tech: string; d: string; href?: string }[] = [
  { stage: "01", t: "Camera tracking", tech: "RETracker", d: "Tracks the camera’s 6-DOF position and orientation in real time as the basis for background alignment.", href: "/en/product/retracker" },
  { stage: "02", t: "Performance capture", tech: "Moverse", d: "Captures actor movement markerless to drive CG characters.", href: "/en/product/moverse" },
  { stage: "03", t: "Real-time render · compositing", tech: "Aximmetry · Unreal", d: "Renders virtual backgrounds in real time and aligns and composites them with live action frame by frame.", href: "/en/product/aximmetry" },
  { stage: "04", t: "Integration · streaming", tech: "EXLINK", d: "Runs capture, tracking, rendering, and streaming from a single control flow.", href: "/en/solution/xr-solution" },
  { stage: "05", t: "Shooting stage", tech: "Hanam XR Studio", d: "Shoots on a large green-chroma stage (W10 × D7 × H4 m).", href: "/en/xr-studio" },
];

const exPoints = [
  "Integrated real-time solution EXLINK: from virtual-background creation to real-time compositing and operation, in one",
  "Connected, proven partner technology: combining Aximmetry, Moverse, and RETracker to fit each project",
  "Finished as you shoot: a large green-chroma stage plus real-time tracking minimizes post-production",
];

const process = [
  { step: "Inquiry · planning", desc: "We clarify your goals and budget, then propose the best-fit production approach." },
  { step: "Virtual assets · setup", desc: "We create virtual backgrounds and graphics and set up the studio, cameras, and tracking." },
  { step: "Real-time shoot · compositing", desc: "We shoot in front of the green chroma and composite and check the virtual background in real time." },
  { step: "On-the-spot review · delivery", desc: "We review on set and wrap with video delivery or a live stream." },
];

const useCases = [
  { t: "Broadcast · Live", d: "Live broadcasts enhanced with a virtual studio and real-time graphics" },
  { t: "Corporate IR · presentations", d: "Executive and earnings presentations on a trustworthy virtual stage" },
  { t: "Webinars · conferences", d: "Online sessions using virtual backgrounds and AR graphics" },
  { t: "Fashion · Commerce", d: "Varied virtual spaces that make products and looks stand out" },
  { t: "Events", d: "XR live direction that extends the stage beyond the screen" },
  { t: "Education", d: "Lecture and lab content built on virtual environments" },
  { t: "Home shopping · live commerce", d: "Switch backgrounds by product and season instantly, with no set changes, and add AR product graphics." },
  { t: "Exhibition · immersive content", d: "Immersive content like media walls and interactive video, built on Unreal." },
  { t: "Virtual human · live", d: "Drive virtual idols and characters live with markerless motion capture and real-time compositing." },
  { t: "Performance · XR stage", d: "Extend the stage beyond the screen with XR extension that links LED and tracking." },
];

export default function VirtualProductionPageEn() {
  return (
    <>
      <JsonLd
        schema={breadcrumbLd([
          { name: "Solution", path: "/en/solution" },
          { name: "Virtual Production", path: "/en/solution/virtual-production" },
        ])}
      />
      <PageHero
        breadcrumb={[
          { label: "Solution", href: "/en/solution" },
          { label: "Virtual Production", href: "/en/solution/virtual-production" },
        ]}
        tag="Methodology"
        title="Virtual Production: the content is done the moment you shoot."
        lead="By combining digital backgrounds with live shooting in real time, you direct and finish right on set. No long, complex post-production."
      />

      {/* Problem Quote Trio — pains when adopting VP for the first time (§0-A) */}
      <ProblemTrio
        index="00"
        label="The Problem"
        title="What we hear most from first-time adopters"
        problems={problems}
        note="So first-time adopters never get stuck, we’re with you in Korean, from configuration design to operator training."
      />

      {/* §01 What is VP */}
      <section className="section section--ink section--glow">
        <div className="container-ex">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <figure className="card" style={{ overflow: "hidden", padding: 0 }}>
              <Image src="/xr-studio.jpg" alt="XR content finished on top of a virtual background — virtual production at the Hanam XR studio" width={1672} height={941} priority className="h-auto w-full" />
            </figure>
            <div>
              <SectionLabel index="01">What is VP</SectionLabel>
              <h2 className="h2" style={{ marginTop: 22 }}>
                What is virtual production?
              </h2>
              <p className="lead" style={{ maxWidth: "36rem" }}>
                Virtual production is a method that combines the digital and physical worlds in real time. Computer-made virtual backgrounds and sets are merged with live shooting on the spot, so you direct the virtual background right on set, just as you would a real shoot. The background follows naturally as the camera moves, and you check the result on set without long post-production.
              </p>
              <p className="mt-6 border-l-2 border-primary pl-4 text-lg font-medium text-fg">
                A way of making video where you shoot for real on a virtual background and finish on the spot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §02 VP Pipeline — mapped to EX assets */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead
            index="02"
            label="VP Pipeline"
            title="We connect every VP stage with EX assets"
            lead="From camera tracking to performance capture, real-time render, and streaming, we connect each stage of virtual production with EX’s solution and partner technology."
            leadMaxWidth="46rem"
          />
          <figure className="card mt-10 overflow-hidden" style={{ padding: 0 }}>
            <Image
              src="/vp-workflow-diagram.png"
              alt="Virtual production workflow — Preproduction (Story · Physical Art · Virtual Art · Visual Effects) → Production (Filming · Visualization · Hybrid Camera · Motion Capture · LED Live Action) → Postproduction (Editing · Post VFX) → Showtime"
              width={1672}
              height={941}
              sizes="(max-width: 768px) 100vw, 1100px"
              className="h-auto w-full"
            />
          </figure>
          <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pipeline.map((p) => {
              const inner = (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-sm font-bold text-lav tabular-nums">{p.stage}</span>
                    <span className="rounded-full border border-border bg-card px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                      {p.tech}
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold text-fg">{p.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
                  {p.href && (
                    <span className="arrowlink mt-4 text-sm">
                      Learn more{" "}
                      <span className="ar" aria-hidden="true">
                        →
                      </span>
                    </span>
                  )}
                </>
              );
              return p.href ? (
                <li key={p.stage}>
                  <Link href={p.href} className="card group flex h-full flex-col" style={{ padding: 24 }}>
                    {inner}
                  </Link>
                </li>
              ) : (
                <li key={p.stage} className="card flex flex-col" style={{ padding: 24 }}>
                  {inner}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* §05 EX Virtual Production */}
      <section className="section section--white">
        <div className="container-ex">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel index="03">EX Virtual Production</SectionLabel>
              <h2 className="h2" style={{ marginTop: 22 }}>
                Virtual production at EX
              </h2>
              <p className="lead" style={{ maxWidth: "36rem" }}>
                EX connects its own solution EXLINK, proven partner technology, and the Hanam XR studio into one production pipeline. Built on a large green-chroma stage (W10m × D7m × H4m), cinema cameras, and real-time XR tracking, we shoot and composite at once to finish the result on set. So first-time adopters never get stuck, we’re with you in Korean, from configuration design to operator training.
              </p>
              <ul className="mt-7 space-y-3">
                {exPoints.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-fg">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/en/solution/xr-solution" variant="glow">
                  Explore EXLINK →
                </Button>
                <Button href="/en/contact">Talk to us →</Button>
              </div>
            </div>
            <figure className="card" style={{ overflow: "hidden", padding: 0 }}>
              <Image src="/exlink-vp-core.png" alt="EXLINK virtual production core — a node-based real-time workflow" width={1672} height={941} className="h-auto w-full" />
            </figure>
          </div>
        </div>
      </section>

      {/* §06 Process */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead index="04" label="Process" title="Production process" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <div key={p.step} className="card" style={{ padding: 24 }}>
                <span className="font-mono text-3xl font-bold text-lav tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-semibold text-fg">{p.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §07 Use Cases */}
      <section className="section section--white section--glow">
        <div className="container-ex">
          <SectionHead index="05" label="Use Cases" title="Where it’s used" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u) => (
              <div key={u.t} className="card" style={{ padding: 24 }}>
                <h3 className="font-semibold text-fg">{u.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{u.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Segment slot — where this fits (§0-C) */}
      <SegmentGrid index="06" label="For Whom" title="Where this fits" segments={segments} tone="section--surface" />

      <CtaBanner locale="en" />
    </>
  );
}
