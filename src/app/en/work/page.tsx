import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { works } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work — Use Cases · Portfolio",
  description:
    "EX is rolling out deployment case studies delivered with our real-time XR solution, partner products, and Hanam studio. Project consultations across broadcast, conferences, IR, webinars, fashion, virtual sets, and more are available right now.",
  alternates: {
    canonical: "/en/work",
    languages: { ko: "/work", en: "/en/work", "x-default": "/work" },
  },
};

export default function WorkPageEn() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Work", href: "/en/work" }]}
        tag="Work"
        title="What you can build with EX’s technology"
        lead="Verified customer case studies are being prepared. The current library shows six clearly labelled application scenarios, with Korean originals available for technical detail."
      />

      <section className="section section--ink section--glow">
        <div className="container-ex">
          <SectionLabel index="01">Use Scenarios</SectionLabel>
          <div className="mt-5 max-w-3xl">
            <h2 className="text-balance text-2xl font-bold text-fg md:text-3xl">Application scenarios by field</h2>
            <p className="mt-4 leading-relaxed text-muted">
              These are not verified customer case studies. They illustrate possible configurations and outcomes, which vary by production environment. Detailed pages are currently provided as a Korean original.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((work) => (
              <Link
                key={work.slug}
                href={`/work/${work.slug}`}
                hrefLang="ko"
                className="card group"
                style={{ overflow: "hidden", padding: 0 }}
                aria-label={`${work.title} — open Korean original`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={work.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-lav">Use scenario · Korean original</span>
                  <h3 lang="ko" className="mt-1.5 font-semibold text-fg">{work.title}</h3>
                  <p lang="ko" className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{work.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner locale="en" />
    </>
  );
}
