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
  title: "고객 지원 — 자료실 & 기술 지원",
  alternates: { canonical: "/support", languages: { "ko-KR": "/support", "en-US": "/en/support", "x-default": "/support" } },
  description:
    "솔루션 도입 이후에도 EX는 계속 함께합니다. 자주 묻는 질문, 회사 소개서·제품 스펙시트 자료실, 원격·현장 기술 지원, 긴급 핫라인(031-699-8228)을 한 곳에서.",
};

const quickAccess = [
  { t: "FAQ", d: "자주 묻는 질문", href: "#faq" },
  { t: "자료실", d: "소개서·스펙시트 다운로드", href: "#downloads" },
  { t: "기술 지원", d: "원격·현장 지원 안내", href: "#tech" },
  { t: "고객 문의", d: "유형별 문의 접수", href: "/contact" },
];

const faqGroups = [
  {
    cat: "도입 · 견적",
    items: [
      { q: "도입 비용은 어떻게 산정되나요?", a: "구성·규모·운영 방식에 따라 맞춤 견적을 제공합니다. 문의 주시면 상담 후 산정해 드립니다." },
      { q: "견적이나 데모는 어떻게 요청하나요?", a: "Contact의 ‘시연·쇼룸 방문’ 또는 ‘솔루션 도입’ 문의, 유선(031-699-8228)으로 요청하실 수 있습니다. 하남 스튜디오 시연은 무료이며, 원거리 고객은 화상 데모로 진행합니다." },
      { q: "도입까지 기간은 얼마나 걸리나요?", a: "구성 규모에 따라 상이하며, 사전 미팅에서 일정과 범위를 함께 확정합니다." },
    ],
  },
  {
    cat: "운영 · 교육",
    items: [
      { q: "운영 교육을 제공하나요?", a: "도입 시 운영 인력 대상 실무 교육을 포함하여 제공합니다." },
      { q: "비개발자도 운영할 수 있나요?", a: "EXLINK는 단일 제어 UI를 제공해, 복잡한 기술 없이도 운영할 수 있도록 설계되었습니다." },
    ],
  },
  {
    cat: "기술 지원",
    items: [
      { q: "도입 후 기술 지원 범위는 어떻게 되나요?", a: "원격 및 현장 기술 지원을 제공하며, 시스템 점검·업데이트 대응을 포함합니다." },
      { q: "긴급 장애는 어떻게 대응하나요?", a: "긴급 핫라인을 통해 우선 대응하며, 사안에 따라 현장 지원으로 이어집니다." },
    ],
  },
];

const downloads = [
  {
    name: "버추얼 스튜디오 구축 준비도 자가진단",
    fmt: "설문",
    desc: "예산 기안 전에 확인할 6가지. 3분 자가진단으로 결과와 가이드를 보내드립니다",
    href: "https://tally.so/r/yPRMBd",
    cta: "진단 시작",
  },
  { name: "EX 회사 소개서", fmt: "PDF" },
  { name: "EXLINK 솔루션 브로셔", fmt: "PDF" },
  { name: "제품 스펙시트 (Aximmetry · Moverse · RETracker)", fmt: "PDF" },
  { name: "도입 케이스 스터디", fmt: "PDF" },
];

const inquiryTypes = ["솔루션 도입", "제품 도입", "스튜디오 제작", "기술 지원", "일반 문의"];

export default function SupportPage() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbLd([{ name: "Support", path: "/support" }]),
          faqPageLd(faqGroups.flatMap((g) => g.items)),
        ]}
      />
      <PageHero
        breadcrumb={[{ label: "Support", href: "/support" }]}
        tag="Support"
        title="솔루션 도입 이후에도, EX는 계속 함께합니다."
        lead="도입·견적부터 운영·교육, 기술 지원까지, 필요한 자료와 답변을 한 곳에서."
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
                  바로가기{" "}
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
          <SectionHead index="01" label="FAQ" title="자주 묻는 질문" />
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
              <h3 className="mt-5 text-2xl font-bold text-fg">지원 범위 &amp; 방법</h3>
              <ul className="mt-5 space-y-2.5 text-sm text-muted">
                <li>• 원격 진단 및 시스템 점검</li>
                <li>• 현장 출동 기술 지원</li>
                <li>• 정기 업데이트 및 운영 컨설팅</li>
                <li>• 캘리브레이션·연동 트러블슈팅</li>
              </ul>
            </div>
            <div className="card flex flex-col justify-center" style={{ padding: 32, borderColor: "rgba(210,6,238,.4)" }}>
              <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />
                긴급 기술 지원
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
          <SectionHead index="03" label="Downloads" title="자료실" />
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
                  href={"href" in d && d.href ? d.href : `/contact?type=${encodeURIComponent("일반 문의")}#form`}
                  className="arrowlink shrink-0 text-sm"
                  {...("href" in d && d.href?.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                >
                  {"cta" in d && d.cta ? d.cta : "이메일로 요청"}{" "}
                  <span className="ar" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">
            자료는 순차 공개 예정입니다. 지금 필요하시면{" "}
            <Link href={`/contact?type=${encodeURIComponent("일반 문의")}#form`} className="text-lav hover:underline">
              문의
            </Link>
            로 요청해 주세요.
          </p>
        </div>
      </section>

      {/* §05 Quick Inquiry */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="04">Quick Inquiry</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            무엇을 도와드릴까요?
          </h2>
          <div className="mt-8 flex max-w-2xl flex-wrap gap-2">
            {inquiryTypes.map((t) => (
              <span key={t} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-fg">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/contact" variant="accent">
              문의하기 →
            </Button>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
