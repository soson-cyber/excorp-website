import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactForm } from "@/components/ui/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { locations, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "문의하기",
  alternates: { canonical: "/contact" },
  description:
    "EXLINK 솔루션 도입, 파트너 제품 도입, 하남 XR 스튜디오 제작 문의를 받습니다. 문의를 남기시면 담당자가 영업일 기준 1~2일 내 회신드립니다. 전화 031-699-8228.",
};

const inquiries = [
  { tag: "Solution", title: "솔루션 도입", desc: "EXLINK 도입 검토 및 견적 상담" },
  { tag: "Product", title: "제품 도입", desc: "Aximmetry · Moverse · RETracker 도입 문의" },
  { tag: "Studio", title: "스튜디오 제작", desc: "EX XR Studio 콘텐츠 제작 협의" },
  { tag: "Support", title: "기술 지원", desc: "도입 이후 운영 · 기술 지원 문의" },
  { tag: "General", title: "일반 문의", desc: "채용 · 취재 · 파트너십 등 기타 문의" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Contact", href: "/contact" }]}
        tag="Contact"
        title="함께 만들어 갈 이야기를 들려주세요."
        lead="문의를 남겨주시면 담당자가 영업일 기준 1~2일 내에 회신드립니다."
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
            <div className="mt-8">
              <ContactForm />
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
              <div className="flex gap-5 text-muted">
                <a href={site.social.instagram} className="transition-colors hover:text-lav" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <Icon name="instagram" />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
