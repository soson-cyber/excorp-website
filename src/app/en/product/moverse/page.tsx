import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { Gauge } from "@/components/motion/Gauge";
import { SpecTable } from "@/components/product/SpecTable";
import { JsonLd, faqPageLd, abs } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Moverse — Korea Distributor for Markerless AI Motion Capture",
  description:
    "Moverse is markerless AI motion capture that captures up to 4 people in real time with standard RGB cameras — no markers or suits. Local real-time capture plus cloud Portal AI Reprocessing (jitter removal, finger tracking). Unreal integration and standard rig export. Used for virtual idol and VTuber full body tracking and game motion capture. EX is the official Korea distributor.",
  alternates: {
    canonical: "/en/product/moverse",
    languages: { "ko-KR": "/product/moverse", "en-US": "/en/product/moverse", "x-default": "/product/moverse" },
  },
  openGraph: {
    url: "https://excorp.kr/en/product/moverse",
    title: "Moverse — Korea Distributor for Markerless AI Motion Capture",
    description:
      "Markerless AI motion capture for up to 4 people with standard RGB cameras — no markers or suits. EX is the official Korea distributor.",
  },
};

const quickSpecs: { v: string; l: string; numeric: boolean }[] = [
  { v: "Markerless", l: "No markers or suits", numeric: false },
  { v: "60+ FPS", l: "Real-time, low latency", numeric: true },
  { v: "Up to 4", l: "Simultaneous actors", numeric: true },
  { v: "AI", l: "Automatic motion cleanup", numeric: false },
];

const why = [
  {
    t: "Markerless capture",
    d: "Capture with standard RGB/RGB-IR cameras alone — no dedicated suits or markers to attach. Start right away with no gear to wear and no per-person calibration.",
  },
  {
    t: "Local real-time capture",
    d: "Capture and computation run in the on-site local app, streaming up to 4 people at 60+ FPS with low latency. Send straight into your engine.",
  },
  {
    t: "AI automatic cleanup",
    d: "The cloud Portal’s AI Reprocessing automatically corrects jitter and artifacts in recorded data. Built on patent-pending and peer-reviewed research.",
  },
];

const ecosystem = [
  {
    role: "Capture · Local",
    name: "Moverse Capture Studio",
    desc: "The on-site local app. Captures up to 4 people in real time with low latency and handles camera control, calibration, take recording, and engine streaming.",
    img: "/moverse-eco-studio.jpg",
  },
  {
    role: "Control · Bridge",
    name: "Moverse Capture Hub",
    desc: "The central control for session setup and remote operation. Provides a recording dashboard and VR mode, and manages updates and support.",
    img: "/moverse-eco-hub.jpg",
  },
  {
    role: "Manage · Cloud",
    name: "Moverse Portal",
    desc: "A Google Cloud–based web dashboard. Provides data management and collaboration, AI Reprocessing, standard rig mapping, and multi-format export.",
    img: "/moverse-eco-portal.jpg",
  },
];

const reprocessing = [
  {
    t: "Body Reprocessing",
    d: "Removes jitter and corrects artifacts from body contact and occlusion, turning raw capture into stable motion.",
  },
  {
    t: "Finger Tracking",
    d: "Post-processes body and fingers as one system. Capture hand motion too, with no extra equipment.",
  },
];

const workflow = [
  {
    t: "Real-time engine integration",
    d: "Direct streaming into Unreal Engine, with game-engine plugins, SDK, and APIs (Python REST API, C++ SDK) supporting multiple endpoints and formats.",
  },
  {
    t: "Automatic standard rig mapping",
    d: "Automatically maps capture data to standard rigs such as Mixamo Ybot, Mannequin, and ActorCore, and exports to multiple formats.",
  },
  {
    t: "Moverse Motifs",
    d: "A generative library that creates variations of predefined motions. Generate diverse variants from existing motion.",
  },
  {
    t: "Browser control",
    d: "Control capture from a tablet or phone browser on the same network. Operate on site immediately, with no separate console to install.",
  },
];

const specGroups: { title: string; rows: [string, string][] }[] = [
  {
    title: "Moverse Capture Studio (local app)",
    rows: [
      ["Capture method", "Markerless · standard RGB/RGB-IR cameras (no markers or suits)"],
      ["Real-time performance", "60+ FPS · low-latency live MoCap · up to 4 actors captured at once"],
      ["Camera operation", "Camera control · calibration · take recording"],
      ["Engine streaming", "Multiple endpoints · multiple formats · custom plugin"],
      ["Setup sizes", "Compact 4×4m/4 cams · Pro 8×8m/8 cams · Max 10×10m/16 cams"],
    ],
  },
  {
    title: "Moverse Capture Hub (central control)",
    rows: [
      ["Session control", "Session setup · remote control"],
      ["Recording management", "Recording dashboard · multi-take"],
      ["Add-on features", "VR mode"],
      ["Operations", "Updates · support management"],
    ],
  },
  {
    title: "Moverse Portal (cloud · Google Cloud)",
    rows: [
      ["Foundation", "Google Cloud–based web dashboard"],
      ["Data", "Data management · team collaboration"],
      ["AI Reprocessing", "Automatic cleanup of uploaded recordings — Body Reprocessing (jitter and artifact correction) · Finger Tracking · built on patent-pending and peer-reviewed research"],
      ["Rig mapping", "Automatic mapping to Mixamo Ybot · Mannequin · ActorCore"],
      ["Export", "Multiple industry-standard formats"],
      ["Motifs", "A generative library that creates variations of predefined motions"],
    ],
  },
  {
    title: "Integration · cameras",
    rows: [
      ["Engine integration", "Unreal Engine direct streaming · game-engine plugins"],
      ["SDK / API", "Python REST API · C++ SDK"],
      ["Remote control", "Tablet/phone browser control on the network"],
      ["Cameras", "Luxonis OAK family (OAK-1 W · OAK-D Pro W PoE, etc.)"],
    ],
  },
];

const useCases = [
  { t: "Virtual idols · VTubers", d: "Drive virtual idols and VTubers live with markerless full body capture and real-time streaming. With no suits or markers, prep is fast." },
  { t: "Live music · performance", d: "Move characters in real time on game and live-music stages with live capture." },
  { t: "Virtual production", d: "Integrate live into virtual studio and LED wall production with local low-latency streaming." },
  { t: "Games · animation", d: "Send markerless capture data to Unreal and standard rigs for character animation." },
  { t: "Education · students", d: "Teach and practice motion capture with standard cameras alone — no suits or markers." },
  { t: "Research · interactive", d: "Turn the movement of multiple people into data for research and interactive content." },
  { t: "Tricky-lighting live shows", d: "Capture reliably with markerless tech even in difficult lighting conditions on live sets." },
  { t: "Hand-motion capture", d: "Post-process body and fingers as one system to capture detailed hand motion." },
];

const process = [
  { step: "01", t: "Consultation · requirements", d: "We assess your capture environment, number of people, target engine, and operating scale." },
  { step: "02", t: "Configuration proposal · quote", d: "We design the camera count, capture volume, and Studio/Hub/Portal configuration and present a quote." },
  { step: "03", t: "Installation · setup · training", d: "We complete on-site installation, calibration, and engine integration, then run operator training." },
  { step: "04", t: "Operations · technical support", d: "As the distributor, we provide ongoing operations, updates, and technical support after rollout." },
];

const faqs = [
  { q: "How is this different from existing optical motion capture?", a: "Moverse is a markerless approach that captures with standard RGB cameras alone â no dedicated suits or markers. You can start right away with no gear to wear and no per-person calibration, and it streams up to 4 people in real time at 60+ FPS locally. Suitability varies with environment and precision requirements, so tell us your capture goals and we’ll review the configuration with you." },
  { q: "Do I need markers or a suit?", a: "No. It captures with standard RGB/RGB-IR cameras alone, and anyone can use it right away with no gear to wear and no per-person calibration." },
  { q: "Does it support real-time live integration?", a: "Yes. The local Capture Studio captures up to 4 people at 60+ FPS and direct-streams to Unreal Engine and others with low latency." },
  { q: "What is AI Reprocessing?", a: "It’s post-processing that automatically cleans up recordings once you upload them to the cloud Portal. It reduces jitter and artifacts and post-processes fingers as well, built on patent-pending and peer-reviewed research." },
  { q: "Where is the data processed?", a: "It’s a hybrid approach: capture and real-time computation run in the on-site local app, while data management, collaboration, and AI Reprocessing run in the Google Cloudâbased Moverse Portal." },
  { q: "What cameras does it use?", a: "It uses the Luxonis OAK family (OAK-1 W, OAK-D Pro W PoE, etc.). We’ll advise on the required count and configuration for your capture volume during consultation." },
  { q: "Which engines and rigs does it integrate with?", a: "It supports Unreal Engine direct streaming and game-engine plugins, SDK, and APIs (Python REST API, C++ SDK), and automatically maps and exports to standard rigs such as Mixamo Ybot, Mannequin, and ActorCore." },
];

export default function MoversePageEn() {
  return (
    <>
      <JsonLd
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: abs("/en") },
              { "@type": "ListItem", position: 2, name: "Product", item: abs("/en/product") },
              { "@type": "ListItem", position: 3, name: "Moverse", item: abs("/en/product/moverse") },
            ],
          },
          faqPageLd(faqs),
        ]}
      />
      <PageHero
        breadcrumb={[
          { label: "Product", href: "/en/product" },
          { label: "Moverse", href: "/en/product/moverse" },
        ]}
        tag="Distributor"
        title="No suits, no markers. AI reads the motion."
        lead={
          <>
            <span className="inline-block">Markerless AI motion capture for up to 4 people in real time with standard RGB cameras alone.</span>{" "}
            <span className="inline-block">Stream locally at 60+ FPS with low latency, and organize and manage the data in the cloud Portal.</span>
          </>
        }
        bgImage="/moverse-hero.jpg"
        bgImageNoUpscale
      />

      {/* Quick spec bar */}
      <section className="section--surface" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="container-ex grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
          {quickSpecs.map((s) => (
            <div key={s.l} className="text-center">
              <p className="font-mono text-3xl font-bold text-fg">{s.v}</p>
              <p className="mt-1.5 text-sm text-muted">{s.l}</p>
              <Gauge className={`mx-auto mt-3 ${s.numeric ? "w-3/4" : "w-full"}`} />
            </div>
          ))}
        </div>
      </section>

      {/* §01 Showcase */}
      <section className="section section--ink">
        <div className="container-ex">
          <SectionHead index="01" label="Showcase" title="Motion Capture for Everyone" />
          <figure className="mt-12">
            {/* Self-hosted 16:9 — muted autoplay/loop. poster as a fallback before load.
                Web-optimized (720p30 · muted · ~5MB · faststart). */}
            <div className="card aspect-video" style={{ overflow: "hidden", padding: 0 }}>
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/moverse-showcase-poster.jpg"
                aria-label="Moverse markerless AI motion capture demo"
                className="h-full w-full object-cover"
              >
                <source src="/moverse-showcase-web.mp4" type="video/mp4" />
              </video>
            </div>
          </figure>
        </div>
      </section>

      {/* §02 Why Moverse */}
      <section className="section section--white section--glow">
        <div className="container-ex">
          <SectionHead index="02" label="Why Moverse" title="Why Moverse" />
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {why.map((w) => (
              <div key={w.t} className="card" style={{ padding: 28 }}>
                <h3 className="text-xl font-semibold text-fg">{w.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §03 Ecosystem */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead
            index="03"
            label="Ecosystem"
            title="One ecosystem, from capture to organizing and collaboration"
            lead="Capture in real time on site (Studio), control sessions centrally (Hub), and organize and share data in the cloud (Portal). The three pieces connect into one workflow."
            leadMaxWidth="46rem"
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {ecosystem.map((e) => (
              <div key={e.name} className="card flex flex-col" style={{ padding: 0, overflow: "hidden" }}>
                <div className="aspect-video w-full overflow-hidden bg-bg/60">
                  <Image src={e.img} alt={`${e.name} screen`} width={1280} height={720} className="h-full w-full object-cover" />
                </div>
                <div style={{ padding: 24 }}>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-lav">{e.role}</span>
                  <h3 className="mt-1 text-lg font-semibold text-fg">{e.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §04 AI Reprocessing */}
      <section className="section section--white section--glow">
        <div className="container-ex">
          <SectionHead
            index="04"
            label="AI Reprocessing"
            title="AI refines your recorded data automatically"
            lead="Uploaded recordings are cleaned up automatically in the cloud. Built on patent-pending and peer-reviewed research, it reduces jitter and artifacts in raw capture to produce stable motion."
            leadMaxWidth="46rem"
          />
          {/* Raw / AI Reprocessed 2-up comparison — self-hosted 16:9 muted autoplay/loop */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {[
              { src: "/moverse-raw-web.mp4", poster: "/moverse-raw-poster.jpg", tag: "RAW", label: "Raw capture", aria: "Before AI reprocessing — raw capture footage" },
              { src: "/moverse-rendered-web.mp4", poster: "/moverse-rendered-poster.jpg", tag: "AI REPROCESSED", label: "After AI reprocessing", aria: "After AI reprocessing — aligned motion footage" },
            ].map((v) => (
              <figure key={v.src} className="card relative aspect-video" style={{ overflow: "hidden", padding: 0 }}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={v.poster}
                  aria-label={v.aria}
                  className="h-full w-full object-cover"
                >
                  <source src={v.src} type="video/mp4" />
                </video>
                <span
                  className={`absolute left-4 top-4 z-10 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider ${
                    v.tag === "RAW" ? "border-border bg-black/60 text-white/80" : "border-lav/40 bg-black/60 text-lav"
                  }`}
                >
                  {v.tag}
                </span>
              </figure>
            ))}
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {reprocessing.map((r) => (
              <div key={r.t} className="card" style={{ padding: 24 }}>
                <h3 className="font-semibold text-fg">{r.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §05 Engine, Rig & Motifs */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead
            index="05"
            label="Engine & Workflow"
            title="From engine integration to a motion library"
            lead="Setups scale from Compact (4×4m · 4 cams) to Pro (8×8m · 8 cams) and Max (10×10m · 16 cams). Captured data flows straight into engines and standard rigs."
            leadMaxWidth="46rem"
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map((w) => (
              <div key={w.t} className="card" style={{ padding: 24 }}>
                <h3 className="font-semibold text-fg">{w.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §06 Specifications */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionHead index="06" label="Specifications" title="Detailed specifications" />
          <div className="mx-auto mt-12 max-w-3xl">
            <SpecTable groups={specGroups} />
            <p className="mt-4 text-center text-xs text-faint">
              These specifications are for the Moverse product; EX, as the official Korea distributor, handles rollout and technical support.
            </p>
          </div>
        </div>
      </section>

      {/* §07 Use Cases */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead index="07" label="Use Cases" title="Use cases" />
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u) => (
              <div key={u.t} className="card" style={{ padding: 24 }}>
                <span className="inline-block rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-fg">
                  {u.t}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-muted">{u.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §08 Process */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionHead index="08" label="Process" title="Rollout process" />
          <ol className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <li key={p.step} className="card" style={{ padding: 24 }}>
                <span className="font-mono text-sm font-bold text-lav">{p.step}</span>
                <h3 className="mt-2 font-semibold text-fg">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* §09 FAQ */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead index="09" label="FAQ" title="Frequently asked questions before rollout" />
          <div className="card mx-auto mt-12 max-w-3xl" style={{ overflow: "hidden", padding: 0 }}>
            {faqs.map((f, i) => (
              <details key={f.q} className="group p-6" style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-border)" }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-fg">
                  {f.q}
                  <span className="font-mono text-lav transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* §10 EX × Moverse */}
      <section className="section section--ink section--glow">
        <div className="container-ex">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel index="10">EX × Moverse</SectionLabel>
              <h2 className="h2" style={{ marginTop: 22 }}>
                EX is the <span className="text-lav">official Korea distributor</span> for Moverse.
              </h2>
              <p className="lead" style={{ maxWidth: "36rem" }}>
                Beyond hardware and software supply, we own the entire domestic rollout as an integrated turnkey — system installation, calibration, engine integration, and on-site training.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {["Rollout consulting", "System setup", "Engine integration", "Training & support"].map((x) => (
                  <li key={x} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-fg">
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/en/contact" variant="accent">
                  Talk to us →
                </Button>
                <Button href="/en/support" variant="glow">
                  Request a spec sheet →
                </Button>
              </div>
            </div>
            <figure>
              <div className="card" style={{ overflow: "hidden", padding: 0 }}>
                <Image
                  src="/cert-moverse.png"
                  alt="Moverse Capture official Korea distributor certificate (Certificate of Excellence — EX Corporation)"
                  width={948}
                  height={670}
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 text-center font-mono text-xs text-faint">
                Moverse Certificate of Excellence — EX Corporation
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <CtaBanner locale="en" />
    </>
  );
}
