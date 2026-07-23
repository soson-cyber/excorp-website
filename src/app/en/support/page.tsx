import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";
import { JsonLd, breadcrumbLd, faqPageLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Support — Resources & Technical Support",
  description:
    "EX stays with you well beyond adoption. Frequently asked questions, a resource library of company and product spec sheets, remote and on-site technical support, and an urgent hotline (+82-31-699-8228), all in one place.",
  alternates: {
    canonical: "/en/support",
    languages: { ko: "/support", en: "/en/support", "x-default": "/support" },
  },
};

const quickAccess = [
  { t: "FAQ", d: "Frequently asked questions", href: "#faq" },
  { t: "Resources", d: "Download brochures · spec sheets", href: "#downloads" },
  { t: "Technical support", d: "Remote · on-site support", href: "#tech" },
  { t: "Contact us", d: "Submit an inquiry by type", href: "/en/contact" },
];

const faqGroups = [
  {
    cat: "Adoption · Quotes",
    items: [
      { q: "How is the cost calculated?", a: "We provide a tailored quote based on your setup, scale, and operating model. Get in touch and we’ll work it out after a consultation." },
      { q: "How do I request a quote or a demo?", a: "You can request one via Contact under 'Demo · showroom visit' or 'Solution adoption,' or by phone (+82-31-699-8228). Demos at the Hanam studio are free, and remote customers can join a video demo." },
      { q: "How long does adoption take?", a: "It varies with the scale of the setup; we’ll lock the schedule and scope together in a pre-production meeting." },
    ],
  },
  {
    cat: "Operations · Training",
    items: [
      { q: "Do you provide operations training?", a: "Yes. Hands-on training for your operating staff is included at adoption." },
      { q: "Can non-developers run it?", a: "EXLINK offers a single control UI, designed so it can be operated without complex technical skills." },
    ],
  },
  {
    cat: "Technical Support",
    items: [
      { q: "What’s covered by technical support after adoption?", a: "We provide remote and on-site technical support, including system checks and update handling." },
      { q: "How are urgent incidents handled?", a: "We respond first via the urgent hotline and escalate to on-site support depending on the issue." },
    ],
  },
];

const downloads = [
  {
    name: "Virtual studio readiness self-assessment",
    fmt: "Survey",
    desc: "6 questions to review before drafting your budget. 3 minutes, in Korean",
    href: "https://tally.so/r/yPRMBd",
    cta: "Start",
  },
  { name: "EX company introduction", fmt: "PDF" },
  { name: "EXLINK solution brochure", fmt: "PDF" },
  { name: "Product spec sheets (Aximmetry · Moverse · RETracker)", fmt: "PDF" },
  { name: "Adoption case studies", fmt: "PDF" },
];

const inquiryTypes = ["Solution adoption", "Product adoption", "Studio production", "Technical support", "General inquiry"];

export default function SupportPageEn() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbLd([{ name: "Support", path: "/en/support" }]),
          faqPageLd(faqGroups.flatMap((g) => g.items)),
        ]}
      />
      <PageHero
        breadcrumb={[{ label: "Support", href: "/en/support" }]}
        tag="Support"
        title="Even after adoption, EX stays with you."
        lead="From adoption and quotes to operations, training, and technical support. Find the materials and answers you need in one place."
      />

      {/* §01 Quick Access */}
      <section className="section section--ink section--glow">
        <div className="container-ex">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {quickAccess.map((q) => (
              <Link key={q.t} href={q.href} className="card group" style={{ padding: 24 }}>
                <h3 className="text-lg font-semibold text-fg">{q.t}</h3>
                <p className="mt-2 text-sm text-muted">{q.d}</p>
                <span className="arrowlink mt-4 inline-flex">
                  Go{" "}
                  <span className="ar" aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* §02 FAQ */}
      <section id="faq" className="section section--surface">
        <div className="container-ex">
          <SectionHead index="01" label="FAQ" title="Frequently asked questions" />
          <div className="mt-12 max-w-3xl space-y-10">
            {faqGroups.map((g) => (
              <div key={g.cat}>
                <h3 className="font-mono text-xs uppercase tracking-wider text-lav">{g.cat}</h3>
                <div className="card mt-4" style={{ overflow: "hidden", padding: 0 }}>
                  {g.items.map((it, i) => (
                    <details key={it.q} className="group p-6" style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-border)" }}>
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-fg">
                        {it.q}
                        <span className="font-mono text-lav transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{it.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §03 Technical Support */}
      <section id="tech" className="section section--white">
        <div className="container-ex">
          <div className="grid items-stretch gap-5 lg:grid-cols-2">
            <div className="card" style={{ padding: 32 }}>
              <SectionLabel index="02">Technical Support</SectionLabel>
              <h3 className="mt-5 text-2xl font-bold text-fg">Scope &amp; methods</h3>
              <ul className="mt-5 space-y-2.5 text-sm text-muted">
                <li>• Remote diagnostics and system checks</li>
                <li>• On-site technical support</li>
                <li>• Regular updates and operations consulting</li>
                <li>• Calibration and integration troubleshooting</li>
              </ul>
            </div>
            <div className="card flex flex-col justify-center" style={{ padding: 32, borderColor: "rgba(210,6,238,.4)" }}>
              <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />
                Urgent technical support
              </span>
              <p className="mt-4 text-2xl font-bold text-fg">
                <a href={`tel:${site.contact.tel.replace(/[^0-9+]/g, "")}`} className="inline-flex items-center gap-2.5 transition-colors hover:text-accent">
                  <Icon name="phone" className="h-6 w-6 text-accent" aria-hidden="true" />
                  <span className="sr-only">Phone</span>
                  {site.contact.tel}
                </a>
              </p>
              <p className="mt-2 text-sm text-muted">
                <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-lav">
                  <Icon name="mail" className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Email</span>
                  {site.contact.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §04 Downloads */}
      <section id="downloads" className="section section--surface">
        <div className="container-ex">
          <SectionHead index="03" label="Downloads" title="Resource library" />
          <div className="card mt-12" style={{ overflow: "hidden", padding: 0 }}>
            {downloads.map((d, i) => (
              <div
                key={d.name}
                className="flex items-center justify-between gap-4 p-6 md:px-8"
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-border)" }}
              >
                <div>
                  <span className="text-sm font-medium text-fg">
                    {d.name} <span className="font-mono text-xs text-faint">· {d.fmt}</span>
                  </span>
                  {"desc" in d && d.desc ? <p className="mt-1 text-xs text-muted">{d.desc}</p> : null}
                </div>
                <Link
                  href={"href" in d && d.href ? d.href : `/en/contact?type=${encodeURIComponent("일반 문의")}#form`}
                  className="arrowlink shrink-0 text-sm"
                  {...("href" in d && d.href?.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                >
                  {"cta" in d && d.cta ? d.cta : "Request by email"}{" "}
                  <span className="ar" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">
            Materials are being published in stages. Need one now? Request it via{" "}
            <Link href={`/en/contact?type=${encodeURIComponent("일반 문의")}#form`} className="text-lav hover:underline">
              Contact
            </Link>
            .
          </p>
        </div>
      </section>

      {/* §05 Quick Inquiry */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="04">Quick Inquiry</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            How can we help?
          </h2>
          <div className="mt-8 flex max-w-2xl flex-wrap gap-2">
            {inquiryTypes.map((t) => (
              <span key={t} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-fg">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/en/contact" variant="accent">
              Contact us →
            </Button>
          </div>
        </div>
      </section>

      <CtaBanner locale="en" />
    </>
  );
}
