import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactForm } from "@/components/ui/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { locations, site } from "@/lib/site";
import { JsonLd, breadcrumbLd, abs } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about EXLINK solution adoption, partner product adoption, or content production at the Hanam XR Studio. Leave us a message and our team will reply within 1–2 business days. Phone +82-31-699-8228.",
  alternates: {
    canonical: "/en/contact",
    languages: { ko: "/contact", en: "/en/contact", "x-default": "/contact" },
  },
};

const inquiries = [
  { tag: "Solution", title: "Solution adoption", desc: "Evaluating EXLINK and quote consultation" },
  { tag: "Product", title: "Product adoption", desc: "Inquiries about Aximmetry · Moverse · RETracker" },
  { tag: "Studio", title: "Studio production", desc: "Discuss content production at the EX XR Studio" },
  { tag: "Demo", title: "Demo · showroom visit", desc: "A free hands-on demo at the Hanam studio · remote video demo if you’re far away" },
  { tag: "Support", title: "Technical support", desc: "Operations and technical support after adoption" },
  { tag: "General", title: "General inquiry", desc: "Careers, press, partnerships, and other inquiries" },
];

export default function ContactPageEn() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbLd([{ name: "Contact", path: "/en/contact" }]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact | EX Corporation",
            url: abs("/en/contact"),
            inLanguage: "en",
          },
        ]}
      />
      <PageHero
        breadcrumb={[{ label: "Contact", href: "/en/contact" }]}
        tag="Contact"
        title="Tell us the story we’ll build together."
        lead="Leave us a message and our team will reply within 1–2 business days."
      />

      {/* §01 Inquiry Type */}
      <section className="section section--ink section--glow">
        <div className="container-ex">
          <SectionLabel index="01">Inquiry Type</SectionLabel>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {inquiries.map((q) => (
              <div key={q.tag} className="card" style={{ padding: 24 }}>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-lav">{q.tag}</span>
                <h3 className="mt-3 text-lg font-semibold text-fg">{q.title}</h3>
                <p className="mt-2 text-sm text-muted">{q.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §02 Form + channels */}
      <section className="section section--surface">
        <div className="container-ex grid gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel index="02">Send a Message</SectionLabel>
            <div className="card mt-8" style={{ padding: 20 }}>
              <p className="flex items-center gap-2 text-sm font-medium text-fg">
                <Icon name="pin" className="h-4 w-4 shrink-0 text-lav" aria-hidden="true" />
                Book a demo at the Hanam studio
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                A free hands-on demo where you operate Aximmetry, RETracker, and Moverse yourself (about 60 minutes, at the Hanam studio).
                If you’re far away, we’ll run a remote video demo. In the form below, set the inquiry type to <strong className="font-medium text-fg">Demo · showroom visit</strong> and
                note your preferred dates.
              </p>
            </div>
            <div id="form" className="mt-6 scroll-mt-24">
              <Suspense fallback={<div className="min-h-[560px]" aria-hidden="true" />}>
                <ContactForm locale="en" />
              </Suspense>
            </div>
          </div>

          <div>
            <SectionLabel index="03">Visit / Reach</SectionLabel>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="card" style={{ padding: 20 }}>
                <dt className="flex items-center gap-2 text-muted">
                  <Icon name="phone" className="h-4 w-4" aria-hidden="true" />
                  <span className="font-mono text-xs uppercase tracking-wider text-faint">Phone</span>
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-fg">
                  <a href={`tel:${site.contact.tel.replace(/[^0-9+]/g, "")}`} className="transition-colors hover:text-lav">
                    {site.contact.tel}
                  </a>
                </dd>
              </div>
              <div className="card" style={{ padding: 20 }}>
                <dt className="flex items-center gap-2 text-muted">
                  <Icon name="fax" className="h-4 w-4" aria-hidden="true" />
                  <span className="font-mono text-xs uppercase tracking-wider text-faint">Fax</span>
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-fg">{site.contact.fax}</dd>
              </div>
              <div className="card col-span-2" style={{ padding: 20 }}>
                <dt className="flex items-center gap-2 text-muted">
                  <Icon name="mail" className="h-4 w-4" aria-hidden="true" />
                  <span className="font-mono text-xs uppercase tracking-wider text-faint">Email</span>
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-fg">
                  <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-lav">
                    {site.contact.email}
                  </a>
                </dd>
              </div>
            </div>
            <div className="mt-6 space-y-5">
              {locations.map((loc) => (
                <div key={loc.kind} className="card" style={{ padding: 24 }}>
                  <span className="font-mono text-xs uppercase tracking-wider text-lav">{loc.kind}</span>
                  <p className="mt-1.5 font-medium text-fg">{loc.name}</p>
                  <p className="flex items-start gap-2 text-sm text-muted">
                    <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-faint" aria-hidden="true" />
                    <span className="sr-only">Address</span>
                    <span>
                      {loc.address} <span className="text-faint">({loc.zip})</span>
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
