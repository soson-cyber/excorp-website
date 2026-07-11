import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { ComingSoon } from "@/components/page/ComingSoon";
import { CtaBanner } from "@/components/layout/CtaBanner";

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
        lead="We’re preparing real deployment case studies. We’ll reveal use cases by field over time — and project consultations are available right now."
      />

      <section className="section section--ink section--glow">
        <div className="container-ex">
          <ComingSoon
            locale="en"
            title="We’re preparing our case studies"
            description="We’re documenting projects EX has delivered — including the GS Retail home-shopping XR system — and will publish them over time. Need to talk sooner? Reach out anytime."
          />
        </div>
      </section>

      <CtaBanner locale="en" />
    </>
  );
}
