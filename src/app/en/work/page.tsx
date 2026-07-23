import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { ComingSoon } from "@/components/page/ComingSoon";
import { CtaBanner } from "@/components/layout/CtaBanner";

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

      <CtaBanner locale="en" />
    </>
  );
}
