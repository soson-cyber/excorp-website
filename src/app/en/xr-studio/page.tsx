import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { MediaBlank } from "@/components/ui/MediaBlank";
import { StudioOptions } from "@/components/studio/StudioOptions";
import { site, locations } from "@/lib/site";
import { JsonLd, breadcrumbLd, localBusinessLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Hanam XR Studio — Booking & Virtual Production",
  description:
    "The EX XR Studio in Hanam. A large green-screen chroma stage (W10×D7×H4, ~70㎡) paired with real-time XR technology to produce IR, webinar, and talk content end to end — from planning to shoot to live streaming. Purpose-built menus (S·M·L) and tailored quotes.",
  alternates: {
    canonical: "/en/xr-studio",
    languages: { ko: "/xr-studio", en: "/en/xr-studio", "x-default": "/xr-studio" },
  },
};

const studioLoc = locations.find((l) => l.kind === "Studio")!;

const reasons = [
  { t: "One stage, infinite backgrounds", d: "No need to build a new physical set. Stage spaces that fit the content with virtual backgrounds on the fly, and shoot entirely different looks within the same day. A fit for companies that want to run their own stage instead of repeatedly outsourcing, and for live commerce that needs a fresh visual every time within a limited space." },
  { t: "10m chroma, full group shots", d: "A horizon green-screen chroma stage of W10 × D7 × H4 (~70㎡). It comfortably handles multi-person panels, full shots, and wide framing that cramped self-broadcast studios struggle to capture." },
  { t: "Real-time XR, finished on set", d: "Not simple compositing — dimensional direction driven by camera tracking. Subjects and virtual backgrounds blend naturally, enabling differentiated expression such as AR product-demo graphics and 3D slides." },
  { t: "A dedicated team, from planning to streaming", d: "A dedicated crew handling production, virtual-environment control, and on-site operations runs planning, the shoot, and live streaming in one pass." },
];

const presets = [
  { name: "Garden Lounge", cat: "TALK", img: "/studio-bg-01.jpg" },
  { name: "Executive Office", cat: "IR", img: "/studio-bg-02.jpg" },
  { name: "Seminar Room", cat: "WEBI", img: "/studio-bg-03.jpg" },
  { name: "Immersive Media Art", cat: "TALK", img: "/studio-bg-04.jpg" },
  { name: "Café Kitchen", cat: "TALK", img: "/studio-bg-05.jpg" },
  { name: "Keynote Hall", cat: "IR", img: "/studio-bg-06.jpg" },
  { name: "Immersive Gallery", cat: "TALK", img: "/studio-bg-07.jpg" },
  { name: "LED Cube Stage", cat: "IR", img: "/studio-bg-08.jpg" },
];

const galleryBlanks = [
  { label: "Green-screen chroma stage", tag: "STAGE", img: "/studio_01.jpeg", alt: "Hanam XR Studio green-screen chroma stage — ceiling lighting grid with camera and jib" },
  { label: "Live streaming · control", tag: "CONTROL", img: "/studio_02.jpeg", alt: "Aximmetry Composer live output monitor and Blackmagic DeckLink 8K camera setup" },
  { label: "Makeup · waiting area", tag: "PREP", img: "/studio_03.jpeg", alt: "Waiting area with ring-light makeup mirror, clothing rack, and changing booth" },
];

const guide = [
  "The workflow varies with the format and scale of your content; we’ll guide you according to the schedule and setup.",
  "Share your slides (PPT) and script in advance, and we’ll lock the structure together in a pre-production meeting.",
  "Free parking available · on-location shoot options available on request.",
];

const facilitySpecs = [
  ["Green-screen chroma stage", "W 10m × D 7m × H 4m (~70㎡) horizon"],
  ["Studio floor area", "~210㎡ (ample camera pullback space)"],
  ["Cameras", "Cinema camera (4.6K) + PTZ multi-camera"],
  ["Lenses", "Cinema zoom 20–55mm / 50–125mm"],
];

export default function XrStudioPageEn() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbLd([{ name: "XR Studio", path: "/en/xr-studio" }]),
          localBusinessLd({
            name: studioLoc.name,
            address: studioLoc.address,
            zip: studioLoc.zip,
            tel: studioLoc.tel || site.contact.tel,
            region: "Gyeonggi-do",
            locality: "Hanam-si",
            path: "/en/xr-studio",
          }),
        ]}
      />
      <PageHero
        breadcrumb={[{ label: "XR Studio", href: "/en/xr-studio" }]}
        tag="Hanam · Virtual Production Studio"
        title="XR content finished on a virtual background"
        lead="The EX XR Studio in Hanam is a virtual production studio that, with a large green-screen chroma stage and real-time XR technology, completes everything in one pass — from planning to shoot to live streaming."
      />

      {/* Studio photo */}
      <section className="container-ex" style={{ paddingTop: 48 }}>
        <div className="card" style={{ overflow: "hidden", padding: 0 }}>
          <Image src="/xr-studio.jpg" alt="EX XR Studio — Hanam green-screen virtual production studio, full view" width={1672} height={941} priority className="h-auto w-full" />
        </div>
      </section>

      {/* §01 Why EX Studio */}
      <section className="section section--surface section--glow">
        <div className="container-ex">
          <SectionHead index="01" label="Why EX XR Studio" title="What makes EX XR Studio different" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.t} className="card" style={{ padding: 28 }}>
                <h3 className="text-lg font-semibold text-fg">{r.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §02 Background presets */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionHead
            index="02"
            label="Backgrounds"
            title="Background presets"
            lead="Choose a virtual background to match your content. Beyond the default presets, we also build custom brand backgrounds."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {presets.map((p) => (
              <MediaBlank key={p.name} ratio="4/3" src={p.img} alt={`${p.name} virtual background preset`} tag={p.cat} label={p.name} />
            ))}
          </div>
        </div>
      </section>

      {/* §03 Options */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead
            index="03"
            label="Options"
            title="Optional services"
            lead="Add the options you need on top of the base setup."
          />
          <div className="mt-12">
            <StudioOptions locale="en" />
          </div>
        </div>
      </section>

      {/* §04 Guide */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionHead index="04" label="Guide" title="How it works" />
          <ul className="mt-12 max-w-3xl space-y-4">
            {guide.map((g) => (
              <li key={g} className="flex gap-3 text-fg">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                <span className="leading-relaxed">{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* §05 Studio tour */}
      <section id="facilities" className="section section--surface">
        <div className="container-ex">
          <SectionHead index="05" label="Studio" title="Take a look around" />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {galleryBlanks.map((b) => (
              <MediaBlank key={b.label} ratio="16/9" kind="image" src={b.img} alt={b.alt} tag={b.tag} label={b.label} />
            ))}
          </div>
          <div className="card mt-12 max-w-3xl" style={{ overflow: "hidden", padding: 0 }}>
            <dl>
              {facilitySpecs.map(([k, v], i) => (
                <div
                  key={k}
                  className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:gap-6"
                  style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-border)" }}
                >
                  <dt className="w-44 shrink-0 font-mono text-xs uppercase tracking-wider text-faint">{k}</dt>
                  <dd className="text-sm text-fg">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA — quote & booking */}
      <section className="section section--white section--glow">
        <div className="container-ex">
          <div className="card px-6 py-12 text-center sm:px-8 sm:py-14" style={{ borderRadius: 24 }}>
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-lav">
              <span className="h-0.5 w-7 bg-primary" aria-hidden="true" />
              Book a visit & request a quote
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl text-balance text-4xl font-semibold leading-snug text-fg md:text-5xl">
              We’ll propose a setup that fits your goal.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Seeing it beats reading about it. We’ll demo the virtual stage for free at our Hanam studio, along with a quote tailored to your content format, scale, and options. If you’re far away, we’ll run a remote video demo.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/en/contact" variant="accent">
                Book a free demo →
              </Button>
              <Button href="/en/contact" variant="secondary">
                Request a quote →
              </Button>
              <Button href={`tel:${site.contact.tel.replace(/[^0-9+]/g, "")}`} variant="glow">
                Call {site.contact.tel}
              </Button>
            </div>
            <p className="mt-6 font-mono text-xs text-faint">
              <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-muted">
                {site.contact.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
