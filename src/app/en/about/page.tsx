import type { Metadata } from "next";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { HistoryTimeline } from "@/components/about/HistoryTimeline";
import { locations } from "@/lib/site";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: { absolute: "About EX | Real-time XR & Virtual Production" },
  description:
    "EX Corporation lowers the barrier to content production with AI and XR technology. Our mission and vision, company history (since 2020), 6 registered patents and venture certification, plus the EX AI Office in Seongnam and EX XR Studio in Hanam, Korea.",
  alternates: {
    canonical: "/en/about",
    languages: { "ko-KR": "/about", "en-US": "/en/about", "x-default": "/about" },
  },
};

const whyEx = [
  { t: "An integrated solution", d: "Cameras, trackers, and media servers: every moving part unified into one." },
  { t: "Real-world project experience and know-how", d: "Hands-on XR project delivery with major Korean companies, including GS Retail." },
  { t: "Customer-focused system design and support", d: "Flexible setups tuned to each site, with full-cycle support." },
  { t: "Expertise bridging culture tech and entertainment", d: "Years of connecting production sets with the technology behind them." },
];

// 4 certifications + 6 patents (requested order). Items with img show the certificate scan, else a placeholder.
const credentials: { tag: string; tagLabel: string; title: string; no?: string; img?: string }[] = [
  { tag: "cert", tagLabel: "Certified", title: "Business Registration", img: "/cert-business-registration.jpg" },
  { tag: "cert", tagLabel: "Certified", title: "Venture Company Certification", img: "/cert-venture.jpg" },
  { tag: "cert", tagLabel: "Certified", title: "Dedicated R&D Department", img: "/cert-rnd.jpg" },
  { tag: "cert", tagLabel: "Certified", title: "Dedicated Creative Department" },
  { tag: "patent", tagLabel: "Patent", title: "Apparatus and method for generating multiple viewpoints", no: "KR 10-2762537", img: "/patent-2762537.jpg" },
  { tag: "patent", tagLabel: "Patent", title: "6DoF SLAM-based multi-stereo-camera positioning estimation method", no: "KR 10-2666600", img: "/patent-2666600.jpg" },
  { tag: "patent", tagLabel: "Patent", title: "Positioning-information correction method using multiple stereo cameras", no: "KR 10-2549811", img: "/patent-2549811.jpg" },
  { tag: "patent", tagLabel: "Patent", title: "Operating method for a multi-sensor multi-tracking camera system in a virtual studio", no: "KR 10-2453561", img: "/patent-2453561.jpg" },
  { tag: "patent", tagLabel: "Patent", title: "Electronic device and capture method for 3D modeling", no: "KR 10-2078198", img: "/patent-2078198.jpg" },
  { tag: "patent", tagLabel: "Patent", title: "Image-processing device and method for determining distortion in composited video", no: "KR 10-2029680", img: "/patent-2029680.jpg" },
];

const history: { year: string; items: string[] }[] = [
  { year: "2026", items: ["Selected for the Korean Ministry of SMEs and Startups TIPS program (R&D on an AI-based XR production solution)"] },
  { year: "2024", items: ["Signed as official Korea distributor for Moverse AI"] },
  {
    year: "2023",
    items: [
      "Certified local partner and reseller for Aximmetry Technology",
      "Signed as official Korea distributor for RETracker (Rassi Engineering LTD)",
      "MOUs signed with Sungkyunkwan University, Chung-Ang University, and Kaywon University of Art & Design",
      "Opened the XR studio in Hanam, Gyeonggi",
    ],
  },
  {
    year: "2022",
    items: [
      "Established a dedicated R&D department",
      "Selected for KIBO Venture Camp Cohort 10 and named a top-performing company",
      "Selected and recognized as an outstanding company in Gyeonggi’s 4th-industry tech startup track",
      "Certified as an innovation-growth-type venture company",
    ],
  },
  { year: "2021", items: ["Renamed to EX Corporation"] },
  { year: "2020", items: ["Incorporated as Space EX Co., Ltd.", "Certified as a venture company"] },
];

export default function AboutPageEn() {
  return (
    <>
      <JsonLd schema={breadcrumbLd([{ name: "About EX", path: "/en/about" }])} />
      {/* About hero — logo + title with concentric-ring backdrop (EXpansion of EXperience) */}
      <section className="pagehero relative overflow-hidden">
        <div className="pagehero-aurora" aria-hidden="true" />
        <div className="exrings" aria-hidden="true">
          <span className="exring exring--1" />
          <span className="exring exring--2" />
          <span className="exring exring--3" />
          <span className="exring exring--4" />
          <span className="exring exring--5" />
        </div>
        <div className="pagehero-fade" aria-hidden="true" />
        <div className="container-ex pagehero__inner relative text-center">
          <div className="inline-flex rounded-full border border-border bg-surface/60 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-lav">
            About EX
          </div>
          <div className="mt-8 flex justify-center">
            <Image
              src="/ex-logo.png"
              alt="EX Corporation"
              width={1001}
              height={201}
              priority
              sizes="(min-width:640px) 440px, 78vw"
              className="h-auto w-full max-w-[300px] drop-shadow-[0_0_40px_rgba(139,92,246,0.35)] sm:max-w-[440px]"
            />
          </div>
          <h1 className="mt-7 text-balance break-keep text-[clamp(1.9rem,6vw,4.5rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-gradient-ex-bright">
            EXpansion of EXperience.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            EX is a technology company that connects the tools of XR production on set and turns that operational experience into products that are easier to use.
          </p>
        </div>
        <span className="pagehero__sentinel" data-hero-sentinel aria-hidden="true" />
      </section>

      {/* §01 Vision & Mission */}
      <section className="section section--ink section--glow">
        <div className="container-ex">
          <Reveal className="text-center">
            <SectionLabel index="01">Vision &amp; Mission</SectionLabel>
            <h2 className="h2" style={{ marginTop: 22 }}>
              The world we&apos;re building toward
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-12 text-center lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-lav">Vision</span>
              <p className="mt-6 text-balance text-[1.65rem] font-medium leading-[1.45] tracking-[-0.01em] text-fg md:text-[2.15rem]">
                A world where everyone crosses boundaries to create{" "}
                <span className="text-gradient-ex-bright">&lsquo;new experiences&rsquo;</span>.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-lav">Mission</span>
              <p className="mt-6 text-balance text-[1.65rem] font-medium leading-[1.45] tracking-[-0.01em] text-fg md:text-[2.15rem]">
                We lower the barrier to cultural-content production with fused AI + XR technology, so anyone can build immersive experiences.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* §02 Why EX */}
      <section className="section section--surface">
        <div className="container-ex">
          <Reveal className="text-center">
            <SectionLabel index="02">Why EX</SectionLabel>
            <h2 className="h2" style={{ marginTop: 22 }}>
              Why EX
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {whyEx.map((c, i) => (
              <Reveal key={c.t} className="card flex gap-5 p-7" delay={i * 80}>
                <span className="font-mono text-2xl font-bold text-faint tabular-nums">0{i + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold text-fg">{c.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* §03 Patents */}
      <section className="section section--white">
        <div className="container-ex">
          <Reveal className="text-center">
            <SectionLabel index="03">Patents &amp; Certifications</SectionLabel>
            <h2 className="h2" style={{ marginTop: 22 }}>
              Patents &amp; Certifications
            </h2>
            <p className="lead" style={{ maxWidth: "40rem", marginInline: "auto" }}>
              6 technology patents · venture-company certification · government and public certifications
            </p>
          </Reveal>
          <ol className="mt-12 grid list-none gap-4 p-0 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {credentials.map((c, i) => (
              <Reveal key={c.title} className="card patent-card" delay={(i % 5) * 50}>
                <li className="patent-card__inner">
                  <div className="patent-card__media">
                    {c.img ? (
                      <Image
                        src={c.img}
                        alt={`${c.tagLabel} — ${c.title}${c.no ? ` (${c.no})` : ""}`}
                        fill
                        sizes="(min-width:1024px) 240px, (min-width:640px) 33vw, 50vw"
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="patent-card__ph">
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-lav">{c.tagLabel}</span>
                        {c.no ? (
                          <span className="mt-1 font-mono text-xs text-faint">{c.no}</span>
                        ) : (
                          <span className="mt-1 px-3 text-center text-xs text-faint">{c.title}</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="patent-card__body">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{c.tagLabel}</span>
                      {c.no && <span className="font-mono text-[11px] font-semibold text-lav">{c.no}</span>}
                    </div>
                    <h3 className="mt-2 text-[13px] font-medium leading-snug text-fg">{c.title}</h3>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* §04 History */}
      <section className="section section--surface">
        <div className="container-ex">
          <Reveal className="text-center">
            <SectionLabel index="04">History</SectionLabel>
            <h2 className="h2" style={{ marginTop: 22 }}>
              History
            </h2>
            <p className="lead" style={{ maxWidth: "40rem", marginInline: "auto" }}>
              The road EX has traveled since its founding in 2020.
            </p>
          </Reveal>
          <Reveal>
            <HistoryTimeline items={history} />
          </Reveal>
        </div>
      </section>

      {/* §05 Locations */}
      <section className="section section--white">
        <div className="container-ex">
          <Reveal className="text-center">
            <SectionLabel index="05">Location</SectionLabel>
            <h2 className="h2" style={{ marginTop: 22 }}>
              Visit us
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {locations.map((loc, i) => (
              <Reveal key={loc.kind} className="card overflow-hidden p-0" delay={i * 90}>
                <div className="p-6">
                  <span className="font-mono text-xs uppercase tracking-wider text-lav">
                    {loc.kind === "Office" ? "Head Office" : "XR Studio"}
                  </span>
                  <p className="mt-1.5 font-medium text-fg">{loc.name}</p>
                  <p className="text-sm text-muted">
                    {loc.addressEn} <span className="text-faint">({loc.zip})</span>
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-lav transition-colors hover:text-lav-hover"
                  >
                    Get directions on Google Maps <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <iframe
                  title={`${loc.name} location map`}
                  src={loc.mapEmbed}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block aspect-[16/10] w-full border-0"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner locale="en" />
    </>
  );
}
