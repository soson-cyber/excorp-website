import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { ComingSoon } from "@/components/page/ComingSoon";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

const applyMailto = `mailto:${site.contact.careersEmail}?subject=${encodeURIComponent(
  "[Job Application] Name / Role",
)}`;

export const metadata: Metadata = {
  title: { absolute: "Careers — Join the team building XR | EX Corporation" },
  description:
    "Careers at EX. We aim to be a company where the people who work here are happy. Our hiring content is in the works â if there’s a role you’re interested in, reach out first.",
  alternates: {
    canonical: "/en/careers",
    languages: { "ko-KR": "/careers", "en-US": "/en/careers", "x-default": "/careers" },
  },
};

export default function CareersPageEn() {
  return (
    <>
      <JsonLd schema={breadcrumbLd([{ name: "Career", path: "/en/careers" }])} />
      <PageHero
        breadcrumb={[{ label: "Career", href: "/en/careers" }]}
        tag="Career"
        title="A company where people are happy to work."
        lead="We’re looking for people to build technology that widens what everyone can create. Our hiring details are on the way."
      />

      <section className="section section--ink section--glow">
        <div className="container-ex">
          <ComingSoon
            locale="en"
            title="Our hiring details are on the way"
            description="We’re putting together EX’s values, how we work, and our open positions â coming soon. If there’s a role you’re interested in, apply by email first."
            ctaHref={null}
          />

          <div className="mx-auto max-w-xl text-center">
            <Link href={applyMailto} className="btn btn--accent">
              Apply by email
            </Link>
            <p className="mx-auto mt-5 max-w-md text-pretty text-sm leading-relaxed text-faint">
              The resume and documents you submit are used solely for the hiring process. They are kept for one year
              after the process closes and then destroyed. You can request deletion at any time.{" "}
              <Link href="/en/privacy" className="font-medium text-lav underline-offset-4 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBanner locale="en" />
    </>
  );
}
