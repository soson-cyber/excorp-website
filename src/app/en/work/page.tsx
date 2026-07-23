import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { ComingSoon } from "@/components/page/ComingSoon";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

// Trust-alternative block (redesign A · P1-5) — the case gallery stays gated;
// this fills the gap with what visitors can verify today (process, configurations, studio demo).
const processSteps = [
  { t: "Consult · site review", d: "We confirm your goals and on-site conditions together." },
  { t: "Configuration · quote", d: "We design an equipment and solution setup that fits your site." },
  { t: "Build · integration", d: "Installation, system integration, and testing." },
  { t: "Training · handover", d: "We train your operating crew, hand over the site, and support what follows." },
];

const configExamples = [
  { t: "Live-broadcast studio XR system", d: "Real-time tracking, compositing, and streaming configured as one flow." },
  { t: "University lab virtual production environment", d: "A hands-on equipment setup students work with directly in class." },
  { t: "Always-on corporate stage configuration", d: "A setup that handles recurring events without set changes." },
];

export const metadata: Metadata = {
  title: "Work — Customer Cases · Portfolio",
  description:
    "Customer case studies and our portfolio are being prepared for upload. They will be published in stages after client approval. Project consultations are available anytime.",
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
        lead="Customer case studies and our portfolio are being prepared for upload. They will be published in stages after client approval."
      />

      <section className="section section--ink section--glow">
        <div className="container-ex">
          <ComingSoon
            locale="en"
            title="Customer cases and portfolio in preparation"
            description="We are organizing projects EX has delivered, including the GS Retail home-shopping XR system, for publication in stages after client approval. If you would like to talk first, reach out anytime."
          />
        </div>
      </section>

      {/* Trust-alternative block — what you can verify before cases open (not a gallery reopen) */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="01">In the Meantime</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            What you can verify before cases open
          </h2>
          <p className="lead" style={{ maxWidth: "42rem" }}>
            Projects run through the process below. And you can see the real operating environment yourself at our Hanam studio.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <div key={s.t} className="card" style={{ padding: 24 }}>
                <span className="font-mono text-2xl font-bold text-faint tabular-nums">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold text-fg">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="card" style={{ padding: 28 }}>
              <span className="font-mono text-[11px] uppercase tracking-wider text-lav">Configurations</span>
              <h3 className="mt-3 text-xl font-semibold text-fg">Configurations we have delivered</h3>
              <ul className="mt-5 space-y-4">
                {configExamples.map((c) => (
                  <li key={c.t} className="border-l-2 border-border pl-4">
                    <p className="font-medium text-fg">{c.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{c.d}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-faint">
                Described at configuration level until clients approve publication.
              </p>
            </div>
            <div className="card flex flex-col justify-between" style={{ padding: 28 }}>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-lav">See It Running</span>
                <h3 className="mt-3 text-xl font-semibold text-fg">See it for yourself at the Hanam studio</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  We show you the real thing instead of documents. Get a free real-time XR demo and technical consultation at the EX Studio in Hanam. Can&apos;t visit? We&apos;ll run a live remote demo.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/en/xr-studio" variant="accent">
                  Explore the studio →
                </Button>
                <Button href={`/en/contact?type=${encodeURIComponent("시연·쇼룸 방문")}#form`} variant="secondary">
                  Book a demo →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner locale="en" />
    </>
  );
}
