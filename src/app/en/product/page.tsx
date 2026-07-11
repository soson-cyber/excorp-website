import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { CompareTable } from "@/components/product/CompareTable";
import { ProblemTrio } from "@/components/page/ProblemTrio";
import { JsonLd, abs } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Aximmetry·Moverse·RETracker — Official Korea Supply",
  description:
    "EX is the official Korea supplier of core virtual production products: real-time compositing platform Aximmetry (certified reseller), AI markerless motion capture Moverse, and 6-DOF camera tracking RETracker (official distributor). From rollout consulting and quotes to setup, training, and technical support in Korea.",
  alternates: {
    canonical: "/en/product",
    languages: { "ko-KR": "/product", "en-US": "/en/product", "x-default": "/product" },
  },
  openGraph: {
    url: "https://excorp.kr/en/product",
    title: "Aximmetry·Moverse·RETracker — Official Korea Supply",
    description:
      "Proven global virtual production products, supplied and supported in Korea by EX — from rollout consulting to setup, training, and technical support.",
  },
};

const whyEx = [
  { t: "Rollout Consulting", d: "We recommend the right products, configuration, and rollout estimate for your on-site needs." },
  { t: "System Setup", d: "The full process — installation, integration, and calibration." },
  { t: "Training", d: "Hands-on training for your operating crew." },
  { t: "Technical Support", d: "Instead of dealing with an overseas HQ, EX supports the post-rollout phase in Korean, on the ground." },
];

// Problem Quote Trio (§0-A) — the burden of bringing in unproven overseas tools directly.
const problems = [
  { id: "PAIN 01", quote: "Overseas solutions only ship with English manuals.", desc: "Time zones and language slow down issue resolution, and it’s hard to gauge rollout cost or license configuration." },
  { id: "PAIN 02", quote: "Buy the wrong gear and expensive equipment sits in storage.", desc: "Bring in a configuration that doesn’t fit your site and you can’t operate it â capital just stays locked up." },
  { id: "PAIN 03", quote: "When something breaks, who do you even ask?", desc: "If supply is where it ends, setup, training, and operations are left to you. You need a partner for what comes after the rollout." },
];

const lineup = [
  {
    badge: "Certified Reseller",
    title: "Aximmetry",
    copy: "Real-time 3D graphics & virtual production platform for broadcast and entertainment",
    meta: "Real-time Compositing",
    href: "/en/product/aximmetry",
  },
  {
    badge: "Distributor",
    title: "Moverse AI",
    copy: "AI markerless motion capture with no dedicated suits or markers — real-time capture runs 100% locally",
    meta: "Markerless MoCap",
    href: "/en/product/moverse",
  },
  {
    badge: "Distributor",
    title: "RETracker",
    copy: "6-DOF markerless camera tracking with no ceiling markers — Bliss G2 / Fizz 2 Pro",
    meta: "6-DOF Marker-less",
    href: "/en/product/retracker",
  },
];

const compare = [
  { label: "Role", values: ["Real-time compositing & render", "Markerless motion capture", "6-DOF camera tracking"] },
  { label: "Core", values: ["Unreal-compatible · up to 8K", "Markerless · Local real-time capture", "6-DOF · <1cm/10m"] },
  { label: "EX Status", values: ["Official certified reseller", "Official Korea distributor", "Official Korea distributor"] },
];

const certs = [
  { src: "/cert-aximmetry.png", name: "Aximmetry Authorization", href: "/en/product/aximmetry" },
  { src: "/cert-moverse.png", name: "Moverse Certificate", href: "/en/product/moverse" },
  { src: "/cert-retracker.png", name: "RETracker Certificate", href: "/en/product/retracker" },
];

export default function ProductPageEn() {
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
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: lineup.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.title,
              url: abs(p.href),
            })),
          },
        ]}
      />
      <PageHero
        breadcrumb={[{ label: "Product", href: "/en/product" }]}
        tag="Product"
        title="Proven global partner products, owned end to end by EX in Korea."
        lead="We officially supply Aximmetry (certified reseller), Moverse, and RETracker (official distributor) in Korea — from rollout consulting and quotes to setup, training, and technical support, all in Korean."
      />

      {/* Problem Quote Trio — the burden of bringing in overseas tools directly (§0-A) */}
      <ProblemTrio
        index="00"
        label="Before EX"
        title="Is buying the product really where it ends?"
        problems={problems}
        note="As an official reseller and distributor, EX is with you from the rollout quote to operations — all in Korean."
      />

      {/* §01 Why EX */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionHead index="01" label="Why EX" title="Why roll out through EX" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyEx.map((c, i) => (
              <div key={c.t} className="card" style={{ padding: 24 }}>
                <span className="font-mono text-2xl font-bold text-faint tabular-nums">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold text-fg">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §02 Lineup */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead index="02" label="Lineup" title="Product lineup" />
          <div className="card mt-12" style={{ overflow: "hidden", padding: 0 }}>
            {lineup.map((p, i) => (
              <Link
                key={p.title}
                href={p.href}
                className="group flex flex-col gap-3 p-6 transition-colors hover:bg-surface-2 md:flex-row md:items-center md:gap-8 md:px-8"
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-border)" }}
              >
                <span className="w-44 shrink-0">
                  <span className="rounded-full bg-primary-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-lav">
                    {p.badge}
                  </span>
                </span>
                <span className="flex-1">
                  <span className="block text-xl font-semibold text-fg">{p.title}</span>
                  <span className="mt-1 block text-sm text-muted">{p.copy}</span>
                </span>
                <span className="hidden shrink-0 font-mono text-xs uppercase tracking-wider text-faint lg:block">
                  {p.meta}
                </span>
                <span className="arrowlink shrink-0">
                  Explore {p.title}{" "}
                  <span className="ar" aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* §03 Compare */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionHead index="03" label="Compare" title="Compare at a glance" />
          <div className="mt-12">
            <CompareTable columns={lineup.map((p) => p.title)} rows={compare} />
          </div>
        </div>
      </section>

      {/* §04 Authorisation */}
      <section className="section section--surface section--glow">
        <div className="container-ex">
          <SectionHead
            index="04"
            label="Authorisation"
            title="Official reseller & distributor certifications"
            lead="Through official partnerships, we take responsibility for domestic rollout and technical support."
            leadMaxWidth="40rem"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {certs.map((c) => (
              <Link key={c.name} href={c.href} className="card group" style={{ overflow: "hidden", padding: 0 }}>
                <Image src={c.src} alt={c.name} width={957} height={700} className="h-auto w-full" />
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-sm leading-relaxed text-muted">
              Before you buy, try it hands-on at our Hanam studio. A live remote demo is also available.
            </p>
            <Link href="/en/contact" className="arrowlink arrowlink--accent mt-4 inline-flex">
              Request a demo{" "}
              <span className="ar" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner locale="en" />
    </>
  );
}
