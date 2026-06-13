import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { ComingSoon } from "@/components/page/ComingSoon";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata: Metadata = {
  title: "Work — Use Cases · Portfolio",
  description:
    "Use-case scenarios you can build with EX’s real-time XR solution, partner products, and Hanam studio. We outline how content is produced and what to expect across broadcast, conferences, IR, webinars, fashion, virtual sets, and more. Real deployment case studies are rolling out over time.",
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
        lead="Use-case scenarios across fields, realized with our real-time XR solution, partner products, and Hanam studio. Real deployment case studies are rolling out over time."
      />

      <section className="section section--ink section--glow">
        <div className="container-ex">
          <ComingSoon
            locale="en"
            title="We’re preparing our case studies"
            description="We’re documenting projects delivered with EX’s real-time XR solution, partner products, and Hanam studio, and will publish them over time. Need to talk sooner? Reach out anytime."
          />
        </div>
      </section>

      <CtaBanner locale="en" />
    </>
  );
}
