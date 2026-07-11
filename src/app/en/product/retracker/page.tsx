import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { Gauge } from "@/components/motion/Gauge";
import { JsonLd, faqPageLd, abs } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "RETracker — Korea Distributor for Markerless Camera Tracking",
  description:
    "RETracker is 6-DOF markerless camera tracking that runs with under 1cm error per 10m and no ceiling markers. EX, the official Korea distributor, consults on the Bliss G2 sensor and Unreal/Aximmetry integration.",
  alternates: {
    canonical: "/en/product/retracker",
    languages: { "ko-KR": "/product/retracker", "en-US": "/en/product/retracker", "x-default": "/product/retracker" },
  },
  openGraph: {
    url: "https://excorp.kr/en/product/retracker",
    title: "RETracker — Korea Distributor for Markerless Camera Tracking",
    description:
      "6-DOF markerless camera tracking with no ceiling markers — Bliss G2 sensor and Fizz 2 Pro lens encoder. EX is the official Korea distributor.",
  },
};

// quickSpec: numbers in solid text-fg. Numeric specs (<1cm/10m, 500fps) map to a Gauge; non-numeric drop it.
const quickSpecs: { v: string; l: string; gauge?: boolean }[] = [
  { v: "<1cm/10m", l: "Tracking accuracy", gauge: true },
  { v: "500fps", l: "IMU sensor fusion", gauge: true },
  { v: "6-DOF", l: "Position & orientation" },
  { v: "Unreal·Aximmetry", l: "Real-time integration" },
];

const whyPoints = [
  {
    t: "100% markerless",
    d: "No pre-installation of ceiling markers required. Mount the sensor on your camera and it maps the space directly, tracking over a wide range of movement without being tied to pre-installed infrastructure.",
  },
  {
    t: "6-DOF · <1cm/10m · 500fps IMU fusion",
    d: "Tracks 6 degrees of freedom in position and orientation to under 1cm error over 10m of movement (per manufacturer spec), and stays stable in handheld and fast moves with 500fps IMU fusion.",
  },
  {
    t: "Real-time Unreal · Aximmetry integration",
    d: "Sends tracking data to Unreal Engine and Aximmetry with low latency via the broadcast-standard Free-D and LiveLink Bliss.",
  },
];

const lineup: {
  name: string;
  role: string;
  desc: string;
  img: string;
  w: number;
  h: number;
  specs: [string, string][];
}[] = [
  {
    name: "RETracker Bliss G2",
    role: "Tracking Sensor",
    desc: "A 6-DOF markerless camera tracking sensor that runs its own vSLAM independently on an Intel Movidius Myriad X VPU. Tracks the camera’s position and orientation in real time with no ceiling markers.",
    img: "/retracker-bliss.png",
    w: 1672,
    h: 941,
    specs: [
      ["Processor", "Intel Movidius Myriad X VPU (independent on-board vSLAM)"],
      ["AI engine", "High-Speed CNN Engine + SGBM depth engine"],
      ["RGB sensor", "13MP (H.265/JPEG hardware compression, HDR)"],
      ["IMU", "9-axis high-speed IMU (accelerometer, gyroscope, magnetometer, low-drift)"],
      ["Accuracy / speed", "<1cm error per 10m · 500fps IMU fusion"],
      ["Connection / mount", "Single USB Type-C (power + data) · UART · standard hot shoe · 3D-printed mount included"],
      ["Protocols", "LiveLink Bliss · Free-D · OSC · FBX (with LTC)"],
      ["Engine integration", "Unreal 4.27–5.x · Aximmetry · Blender · Ventuz"],
      ["Add-ons", "HW Genlock module · WorldPose automatic calibration"],
    ],
  },
  {
    name: "RETracker Fizz 2 Pro",
    role: "Lens FIZ Encoder",
    desc: "An encoder that physically extracts a lens’s Focus, Iris, and Zoom (FIZ) values. Reflects them in the virtual studio’s depth of field and field of view in real time to match live footage.",
    img: "/retracker-fizz.png",
    w: 1672,
    h: 941,
    specs: [
      ["FIZ data", "Physical extraction of lens Focus/Iris/Zoom → reflected in depth of field and field of view"],
      ["Protocols", "Unreal LiveLink · Free-D"],
      ["Display", "1.3″ OLED screen"],
      ["Dimensions / weight", "155 × 80 × 42 mm · 0.353 kg"],
      ["Power", "5V DC (USB Type-C)"],
      ["I/O", "12-pin LEMO · BNC (Genlock) · RJ45 LAN · USB-C · USB-A"],
    ],
  },
];

const process = [
  { n: "01", t: "Consultation · requirements", d: "We assess your shooting environment, target engine, and operating scale to diagnose how RETracker should be applied." },
  { n: "02", t: "Configuration proposal · quote", d: "We propose a Bliss G2 + Fizz 2 Pro + Bliss Software configuration and add-on modules, and produce a quote." },
  { n: "03", t: "Installation · setup · training", d: "Hot shoe mounting → WorldPose automatic calibration → Unreal/Aximmetry engine integration → shooting setup, all done on site, plus operator training." },
  { n: "04", t: "Operations · technical support", d: "As the distributor, we handle issue resolution, updates, and technical support during operation after rollout." },
];

const faqs = [
  { q: "How is this different from existing marker-based tracking?", a: "No pre-installation of ceiling or stage markers required. Mount the sensor on your camera and it maps the space directly, tracking with no limit on range of movement. It tracks 6-DOF to under 1cm error over 10m of movement (per manufacturer spec) and integrates in real time with Unreal and Aximmetry via Free-D and LiveLink. We’ll advise on rollout quotes and configuration to fit your site." },
  { q: "Do I need markers or tracking infrastructure?", a: "No. Bliss G2 is a 100% markerless approach that needs no ceiling markers â mount it on the camera with no extra infrastructure and it maps the space directly. Unlike ceiling-marker systems, it isn’t constrained by a range tied to pre-installed infrastructure, so you can move the camera freely and track across large spaces." },
  { q: "How accurate is the tracking?", a: "Ultra-precise error of under 1cm (<1cm) over 10m of movement (per manufacturer spec), with 500fps IMU sensor fusion keeping it stable in handheld and fast moves." },
  { q: "How do Bliss and Fizz work together?", a: "Bliss G2 tracks the camera’s position and orientation (6-DOF), while Fizz 2 Pro extracts the lens’s Focus, Iris, and Zoom values to match the virtual background’s depth of field and field of view to live footage." },
  { q: "Which engines does it integrate with?", a: "It’s compatible with Unreal Engine (4.27â5.x), Aximmetry, Blender, and Ventuz, and supports the LiveLink Bliss, Free-D, OSC, and FBX (with LTC) protocols." },
  { q: "Which cameras can it mount on?", a: "It works with most cameras that accept a standard hot shoe. The sensor mounts on top of the camera with a standard hot shoe and sends data to a PC over LAN/USB â a camera-agnostic approach, with a dedicated 3D-printed mount included by default. Special rigs or mounting conditions are confirmed during consultation. It works both indoors and outdoors across a wide range of movement." },
  { q: "Can we see a live demo?", a: "Yes. You can see camera tracking firsthand at our Hanam XR studio, and we run a video demo if you are remote. We arrange the demo schedule during consultation." },
  { q: "What about rollout cost?", a: "It depends on the Bliss G2, Fizz 2 Pro, and Bliss Software configuration and any add-on modules. Tell us your shooting environment and operating scale, and we will propose a configuration and quote together." },
  { q: "Does it work in low-feature environments like a green screen?", a: "vSLAM tracks based on features in the space, so in low-feature environments such as a uniform green screen, tracking accuracy can vary with conditions. Tell us your site environment and we will review complementary methods — tracking markers, lighting, and more — during consultation." },
];

export default function RetrackerPageEn() {
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
              { "@type": "ListItem", position: 3, name: "RETracker", item: abs("/en/product/retracker") },
            ],
          },
          faqPageLd(faqs),
        ]}
      />
      <PageHero
        breadcrumb={[
          { label: "Product", href: "/en/product" },
          { label: "RETracker", href: "/en/product/retracker" },
        ]}
        tag="Distributor"
        title="No ceiling markers — the camera reads the space."
        lead="6-DOF markerless camera tracking that runs its own vSLAM independently. The Bliss G2 sensor and Fizz 2 Pro lens encoder match live and virtual frame by frame."
      />

      {/* Quick spec bar */}
      <section className="section--surface" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="container-ex grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
          {quickSpecs.map((s) => (
            <div key={s.l} className="text-center">
              <p className="font-mono text-3xl font-bold text-fg">{s.v}</p>
              <p className="mt-1.5 text-sm text-muted">{s.l}</p>
              {s.gauge && <Gauge className="mx-auto mt-3 w-3/4" />}
            </div>
          ))}
        </div>
      </section>

      {/* §01 Showcase */}
      <section className="section section--white section--glow">
        <div className="container-ex">
          <SectionHead
            index="01"
            label="Showcase"
            title={
              <>
                <span className="inline-block">As the camera moves,</span>{" "}
                <span className="inline-block">the virtual space follows</span>
              </>
            }
            lead={
              <>
                <span className="inline-block">A markerless real-time 6-DoF vSLAM-based camera tracking system,</span>{" "}
                <span className="inline-block">a complete camera tracking solution for XR and virtual production.</span>
              </>
            }
            leadMaxWidth="40rem"
          />
          <figure className="mt-12">
            <div className="card" style={{ overflow: "hidden", padding: 0 }}>
              <Image
                src="/retracker-tracking.png"
                alt="RETracker markerless camera tracking on set — virtual space aligned to camera moves"
                width={1280}
                height={720}
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </figure>
        </div>
      </section>

      {/* §02 Why RETracker */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead index="02" label="Why RETracker" title="What sets RETracker apart" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {whyPoints.map((p, i) => (
              <div key={p.t} className="card" style={{ padding: 24 }}>
                <span className="font-mono text-sm text-lav">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-semibold text-fg">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §03 Lineup */}
      <section className="section section--white section--glow">
        <div className="container-ex">
          <SectionHead
            index="03"
            label="Lineup"
            title={
              <>
                <span className="inline-block">A tracking sensor and</span>{" "}
                <span className="inline-block">a lens encoder</span>
              </>
            }
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {lineup.map((p) => (
              <div key={p.name} className="card flex flex-col" style={{ padding: 24 }}>
                <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-bg/60">
                  <Image src={p.img} alt={p.name} width={p.w} height={p.h} className="h-full w-full object-cover" />
                </div>
                <span className="mt-5 font-mono text-[11px] uppercase tracking-wider text-lav">{p.role}</span>
                <h3 className="mt-1 text-xl font-semibold text-fg">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
                <dl className="mt-5 border-t border-border/60 pt-5">
                  {p.specs.map(([k, v]) => (
                    <div key={k} className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:gap-4">
                      <dt className="w-32 shrink-0 font-mono text-[11px] uppercase tracking-wider text-faint">{k}</dt>
                      <dd className="text-sm text-fg">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-muted">
            ※ Bliss Software is the control software that calibrates, integrates, and outputs tracking data from the Bliss G2 sensor.
          </p>
        </div>
      </section>

      {/* §04 Rollout process */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead
            index="04"
            label="Process"
            title="Rollout process"
            lead="From consultation to installation and operations, EX is with you for the entire rollout as the official Korea distributor."
            leadMaxWidth="40rem"
          />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <li key={p.n} className="card" style={{ padding: 24 }}>
                <span className="font-mono text-sm text-lav">{p.n}</span>
                <h3 className="mt-2 font-semibold text-fg">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
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

      {/* §06 EX × RETracker */}
      <section className="section section--surface section--glow">
        <div className="container-ex">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel index="06">EX × RETracker</SectionLabel>
              <h2 className="h2" style={{ marginTop: 22 }}>
                EX is the <span className="text-lav">official Korea distributor</span> for RETracker.
              </h2>
              <p className="lead" style={{ maxWidth: "36rem" }}>
                Beyond hardware and software supply, we own the entire rollout as an integrated turnkey — system installation, security setup, and on-site training included.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {["Rollout consulting", "Calibration", "Training", "Technical support"].map((x) => (
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
                  src="/cert-retracker.png"
                  alt="RETracker official Korea distributor certificate (Certificate of Excellence — EX Corporation)"
                  width={958}
                  height={740}
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 text-center font-mono text-xs text-faint">
                RETracker Certificate of Excellence — EX Corporation
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <CtaBanner locale="en" />
    </>
  );
}
