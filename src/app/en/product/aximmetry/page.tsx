import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { SpecTable } from "@/components/product/SpecTable";
import { JsonLd, faqPageLd, abs } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Aximmetry — Official Korea Reseller for Virtual Production",
  description:
    "Aximmetry (Broadcast & Film Edition) builds up to 8K real-time virtual studios, XR, and AR with native Unreal Engine integration (built-in plugin) plus its own node-based engine. Unlimited SDI/NDI/SMPTE 2110, Free-D and MOS. EX is the official certified reseller in Korea.",
  alternates: {
    canonical: "/en/product/aximmetry",
    languages: { "ko-KR": "/product/aximmetry", "en-US": "/en/product/aximmetry", "x-default": "/product/aximmetry" },
  },
  openGraph: {
    url: "https://excorp.kr/en/product/aximmetry",
    title: "Aximmetry — Official Korea Reseller for Virtual Production",
    description:
      "Up to 8K real-time virtual studios, XR, and AR with native Unreal Engine integration and a node-based engine. EX is the official certified reseller in Korea.",
  },
};

const quickSpecs = [
  { v: "8K", l: "Real-time rendering" },
  { v: "Node", l: "Node-based graphics UI" },
  { v: "Unlimited", l: "SDI/NDI/2110 I/O" },
  { v: "Unreal", l: "Native integration" },
];

// §02 — Features & technology. Priority order (first item shown as a video banner).
// When img is set, a 16:9 image area is added at the top of the card.
const featureTech: { t: string; d: string; img?: string }[] = [
  {
    t: "State-of-the-art Chroma Keyer",
    d: "A built-in chroma keyer with 3D clean plate support delivers precise keying. (BaM Awards 2023 Create winner.)",
  },
  {
    t: "Node-based editing system",
    d: "Manage complex setups easily as nodes, and build your own custom logic directly.",
    img: "/aximmetry-node-editor.jpg",
  },
  {
    t: "Real-time augmented reality (AR)",
    d: "Overlay high-quality AR graphics on live footage in real time.",
    img: "/aximmetry-ar.jpg",
  },
  {
    t: "ICVFX · LED space extension",
    d: "High-quality setups that extend LED wall virtual production.",
    img: "/aximmetry-icvfx-led.jpg",
  },
  {
    t: "Camera tracking · lens calibration",
    d: "Sync camera and lens data for precise camera moves.",
    img: "/aximmetry-camera-tracking.gif",
  },
  {
    t: "Single control interface",
    d: "Operate visuals and direction flexibly from one intuitive interface.",
    img: "/aximmetry-virtual-production.jpg",
  },
  {
    t: "External controller integration",
    d: "Connect and control via a range of external controllers — MIDI, DMX, OSC, and more.",
    img: "/aximmetry-external-control.png",
  },
];

const bfSpecs: [string, string][] = [
  ["Rendering / Engine", "Native Aximmetry 3D engine + Unreal Engine 5 integration (runs UE5 scenes directly)"],
  ["Resolution", "Real-time rendering up to 8K"],
  ["Graphics", "DLSS · Ray Tracing · RTXGI (real-time global illumination)"],
  ["Color", "10-bit · HDR I/O · color space and gamma handling"],
  ["Chroma key", "Built-in chroma keyer with 3D Clean Plate and Light Wrap"],
  ["I/O", "Unlimited SDI · NDI · SMPTE 2110 (NMOS) · SRT I/O"],
  ["Sync", "SDI Timecode · hardware Genlock"],
  ["Protocols", "Native Free-D · MOS (newsroom integration)"],
  ["Device control", "GPIO · OSC · MIDI · DMX · ArtNet"],
  ["Scalability", "Multi-PC distributed rendering (Renderer Node) · multi-GPU sync"],
];

// §08 — Rollout process (shared 4 steps)
const steps = [
  { t: "Consultation · requirements", d: "We assess your site environment and production goals to define the hardware and I/O configuration you need." },
  { t: "Configuration proposal · quote", d: "We design the license, hardware, and I/O configuration and present a transparent quote." },
  { t: "Installation · setup · training", d: "System installation, tracking and keying setup, and on-site operator training." },
  { t: "Operations · technical support", d: "As an official certified reseller, we provide ongoing technical support for issues during operation." },
];

const faqs = [
  { q: "How is this different from existing broadcast graphics solutions?", a: "Aximmetry runs Unreal Engine natively and is a real-time graphics and virtual production platform supporting unlimited SDI, NDI, and SMPTE 2110 (NMOS) I/O along with Free-D and MOS. Rollout cost and license configuration are tailored to your scale during consultation, and EX, as the official certified reseller, provides installation, training, and technical support in Korean." },
  { q: "Which edition does EX supply?", a: "EX officially supplies the Broadcast & Film Edition for professional broadcast and film environments. We propose the license, hardware, and I/O configuration to fit your site and support installation, training, and technical support as the official certified reseller." },
  { q: "How high a resolution can run in real time?", a: "The Broadcast & Film Edition uses DLSS, Ray Tracing, and RTXGI to support real-time rendering up to 8K resolution, and handles 10-bit and HDR I/O." },
  { q: "How does it integrate with broadcast systems?", a: "It supports unlimited SDI, NDI, SMPTE 2110 (NMOS), and SRT I/O along with timecode and hardware Genlock, and integrates into broadcast environments via the Free-D and MOS (newsroom) protocols." },
];

export default function AximmetryPageEn() {
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
              { "@type": "ListItem", position: 3, name: "Aximmetry", item: abs("/en/product/aximmetry") },
            ],
          },
          faqPageLd(faqs),
        ]}
      />
      <PageHero
        breadcrumb={[
          { label: "Product", href: "/en/product" },
          { label: "Aximmetry", href: "/en/product/aximmetry" },
        ]}
        tag="Certified Reseller"
        title="All-In-One Virtual Production Platform"
        lead="A virtual production compositor that combines its own node-based engine with Unreal Engine to build real-time virtual studios, XR, and AR."
      />

      {/* Quick spec bar */}
      <section className="section--surface" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="container-ex grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
          {quickSpecs.map((s) => (
            <div key={s.l} className="text-center">
              <p className="font-mono text-3xl font-bold text-fg">{s.v}</p>
              <p className="mt-1.5 text-sm text-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* §01 Showcase */}
      <section className="section section--ink">
        <div className="container-ex">
          <SectionHead index="01" label="Showcase" />
          <figure className="mt-12">
            {/* Responsive 16:9 — YouTube embed as a "background video": autoplay + muted
                (required by autoplay policy) + loop (loop=1 + playlist=videoID). controls=0 and
                modestbranding minimize UI; youtube-nocookie domain for privacy. A transparent
                overlay absorbs clicks/pause so the video keeps playing. */}
            <div className="card relative aspect-video" style={{ overflow: "hidden", padding: 0 }}>
              <iframe
                className="pointer-events-none h-full w-full"
                src="https://www.youtube-nocookie.com/embed/vcuQegxG3dA?autoplay=1&mute=1&loop=1&playlist=vcuQegxG3dA&controls=0&playsinline=1&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3"
                title="Aximmetry real-time virtual production demo"
                allow="autoplay; encrypted-media; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ border: 0 }}
              />
              {/* Transparent overlay: absorbs mouse events to prevent pause/hover UI */}
              <span className="absolute inset-0" aria-hidden="true" />
            </div>
          </figure>
        </div>
      </section>

      {/* §02 Features & Technology */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead
            index="02"
            label="Features & Technology"
            title="Features and technology"
            lead="Aximmetry’s node-based editor adapts to the nature of each project â broadcast production, virtual events, previsualization, and LED wall virtual production, as well as complex 3D graphics work â by composing the graph to fit."
            leadMaxWidth="48rem"
          />
          {/* Feature cards — priority order: top 4 (2 columns) + bottom 3 (3 columns) */}
          {/* State-of-the-art chroma keyer — video banner (text/badge overlay, BaM Awards 2023 winner) */}
          <figure className="mt-12">
            <div className="card relative aspect-video" style={{ overflow: "hidden", padding: 0 }}>
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/aximmetry-fig-chroma.jpg"
                aria-label="Aximmetry state-of-the-art chroma keyer real-time keying demo"
                className="h-full w-full object-cover"
              >
                <source src="/aximmetry-chroma-web.mp4" type="video/mp4" />
              </video>

              {/* Top right — BaM Awards 2023 Create winner badge */}
              <Image
                src="/aximmetry-bam-award-2023.png"
                alt="BaM Awards 2023 Winner — NAB Show CREATE (Aximmetry)"
                width={200}
                height={200}
                className="absolute right-4 top-4 z-10 h-16 w-16 drop-shadow-lg sm:h-24 sm:w-24"
              />

              {/* Bottom left — text layer (scrim for legibility) */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-white sm:text-xl">{featureTech[0].t}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80">{featureTech[0].d}</p>
              </div>
            </div>
          </figure>

          {/* Remaining 6 feature cards — fixed 16:9 image area at top (object-cover, no gap).
              Cards without an image use a same-ratio placeholder to keep the layout aligned. */}
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featureTech.slice(1).map((p) => (
              <div key={p.t} className="card flex flex-col" style={{ padding: 0, overflow: "hidden" }}>
                <div className="aspect-video w-full overflow-hidden bg-bg/60">
                  {p.img ? (
                    <Image
                      src={p.img}
                      alt={p.t}
                      width={1280}
                      height={720}
                      unoptimized={p.img.endsWith(".gif")}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-faint">Image coming soon</span>
                    </div>
                  )}
                </div>
                <div style={{ padding: 24 }}>
                  <h3 className="font-semibold text-fg">{p.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §03 Edition — EX supplies only the Broadcast & Film Edition */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionHead
            index="03"
            label="Edition"
            title="Aximmetry Broadcast & Film Edition"
            lead="The professional-studio Broadcast & Film Edition is the top-tier configuration, built for broadcast and film with unlimited broadcast I/O and distributed rendering."
            leadMaxWidth="44rem"
          />

          {/* Detailed specifications */}
          <div className="mx-auto mt-12 max-w-3xl">
            <SpecTable groups={[{ rows: bfSpecs }]} />
          </div>
        </div>
      </section>

      {/* §04 Rollout process */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead index="04" label="Process" title="Rollout process" />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.t} className="card flex flex-col" style={{ padding: 24 }}>
                <span className="font-mono text-sm text-lav">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-semibold text-fg">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* §05 FAQ */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionHead index="05" label="FAQ" title="Frequently asked questions before rollout" />
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

      {/* §06 EX × Aximmetry */}
      <section className="section section--ink">
        <div className="container-ex">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel index="06">EX × Aximmetry</SectionLabel>
              <h2 className="h2" style={{ marginTop: 22 }}>
                EX is the <span className="text-lav">official certified reseller</span> for Aximmetry.
              </h2>
              <p className="lead" style={{ maxWidth: "36rem" }}>
                From edition-selection consulting to system installation, security setup, on-site training, and maintenance, we support the entire rollout as an integrated turnkey. As the official Aximmetry reseller in Korea, we provide rollout quotes and technical support in Korean.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {["Rollout consulting", "Setup", "Training", "Maintenance"].map((x) => (
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
                  src="/cert-aximmetry.png"
                  alt="Aximmetry Certified Reseller authorization certificate — EX Corporation"
                  width={957}
                  height={677}
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 text-center font-mono text-xs text-faint">
                Aximmetry Authorization Certificate — EX Corporation
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <CtaBanner locale="en" />
    </>
  );
}
