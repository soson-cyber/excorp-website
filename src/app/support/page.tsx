import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support — 자료실 & 기술 지원",
  description:
    "솔루션 도입 이후에도 EX는 계속 함께합니다. FAQ, 자료실, 기술 지원, 고객 문의를 한 곳에서.",
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
      { q: "견적이나 데모는 어떻게 요청하나요?", a: "Contact의 ‘솔루션 도입’ 문의 또는 유선(031-699-8228)으로 요청하실 수 있습니다." },
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
  { name: "EX 회사 소개서", fmt: "PDF" },
  { name: "EXLINK 솔루션 브로셔", fmt: "PDF" },
  { name: "제품 스펙시트 (Aximmetry · Moverse · RETracker)", fmt: "PDF" },
  { name: "도입 케이스 스터디", fmt: "PDF" },
];

const inquiryTypes = ["솔루션 도입", "제품 도입", "스튜디오 제작", "기술 지원", "일반 문의"];

export default function SupportPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Support", href: "/support" }]}
        tag="Support"
        title="솔루션 도입 이후에도, EX는 계속 함께합니다."
        lead="도입·견적부터 운영·교육, 기술 지원까지 — 필요한 자료와 답변을 한 곳에서."
      />

      {/* §01 Quick Access */}
      <section className="container-ex py-section">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickAccess.map((q) => (
            <Link
              key={q.t}
              href={q.href}
              className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-primary/60"
            >
              <h3 className="text-lg font-semibold">{q.t}</h3>
              <p className="mt-2 text-sm text-muted">{q.d}</p>
              <span className="mt-4 inline-block text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                바로가기 →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* §02 FAQ */}
      <section id="faq" className="bg-surface/40">
        <div className="container-ex py-section">
          <SectionLabel index="01">FAQ</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">자주 묻는 질문</h2>
          <div className="mt-12 max-w-3xl space-y-10">
            {faqGroups.map((g) => (
              <div key={g.cat}>
                <h3 className="font-mono text-xs uppercase tracking-wider text-primary">{g.cat}</h3>
                <div className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
                  {g.items.map((it) => (
                    <details key={it.q} className="group p-6">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-fg">
                        {it.q}
                        <span className="font-mono text-primary transition-transform group-open:rotate-45">+</span>
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
      <section id="tech" className="container-ex py-section">
        <div className="grid items-stretch gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-8">
            <SectionLabel index="02">Technical Support</SectionLabel>
            <h3 className="mt-5 text-2xl font-bold">지원 범위 &amp; 방법</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-muted">
              <li>• 원격 진단 및 시스템 점검</li>
              <li>• 현장 출동 기술 지원</li>
              <li>• 정기 업데이트 및 운영 컨설팅</li>
              <li>• 캘리브레이션·연동 트러블슈팅</li>
            </ul>
          </div>
          <div className="flex flex-col justify-center rounded-2xl border border-accent/40 bg-surface p-8">
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />
              긴급 기술 지원
            </span>
            <p className="mt-4 text-2xl font-bold">
              <a
                href={`tel:${site.contact.tel.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-2.5 transition-colors hover:text-accent"
              >
                <Icon name="phone" className="h-6 w-6 text-accent" aria-hidden="true" />
                <span className="sr-only">Phone</span>
                {site.contact.tel}
              </a>
            </p>
            <p className="mt-2 text-sm text-muted">
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Icon name="mail" className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Email</span>
                {site.contact.email}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* §04 Downloads */}
      <section id="downloads" className="bg-surface/40">
        <div className="container-ex py-section">
          <SectionLabel index="03">Downloads</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">자료실</h2>
          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-surface">
            {downloads.map((d) => (
              <div
                key={d.name}
                className="flex items-center justify-between gap-4 border-b border-border p-6 last:border-0 md:px-8"
              >
                <span className="text-sm font-medium text-fg">
                  {d.name} <span className="font-mono text-xs text-faint">· {d.fmt}</span>
                </span>
                <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-faint">준비 중</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">
            자료가 필요하시면 <Link href="/contact" className="text-primary hover:underline">문의</Link>로 요청해 주세요.
          </p>
        </div>
      </section>

      {/* §05 Quick Inquiry */}
      <section className="container-ex py-section">
        <SectionLabel index="04">Quick Inquiry</SectionLabel>
        <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">무엇을 도와드릴까요?</h2>
        <div className="mt-8 flex max-w-2xl flex-wrap gap-2">
          {inquiryTypes.map((t) => (
            <span key={t} className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-fg">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-8">
          <Button href="/contact" variant="accent">
            문의하기 →
          </Button>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
