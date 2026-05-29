import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata: Metadata = {
  title: "News & Insight",
  description:
    "이엑스의 보도자료, 케이스 스터디, 인사이트, 자료실. 실시간으로 확장되는 콘텐츠 제작의 새로운 기준.",
};

const categories = ["전체", "보도자료", "케이스", "인사이트", "자료실"];

const featured = {
  cat: "Press Release",
  date: "2026.04.22",
  title: "Rassi Engineering LTD 공식 한국 총판 계약 체결, 6DoF 광학 트래킹 사업 본격 확장",
  excerpt:
    "EX가 RETracker의 공식 한국 대표·총판으로서 6DoF 광학 트래킹 솔루션의 국내 도입과 기술 지원을 본격화합니다.",
};

const side = [
  { cat: "Case Study", date: "2026.03.19", title: "EX XR Studio, 라이브 방송 프로덕션 도입 사례 — 실시간 가상 배경과 인터랙션 그래픽 합성" },
  { cat: "Insight", date: "2026.02.04", title: "Moverse AI 마커리스 모션캡처, 메타버스·교육 콘텐츠 제작 효율을 어떻게 바꾸는가" },
];

const archive = [
  { cat: "Press Release", date: "2026.01.15", title: "Moverse AI 공식 한국 총판 계약 체결" },
  { cat: "Case Study", date: "2025.12.10", title: "브랜드 이벤트를 위한 실시간 XR 연출 프로젝트" },
  { cat: "Insight", date: "2025.11.22", title: "ICVFX와 LED 월, 버추얼 프로덕션의 다음 단계" },
  { cat: "Press Release", date: "2025.10.05", title: "Aximmetry Technologies 공식 인증 리셀러 선정" },
  { cat: "Case Study", date: "2025.09.18", title: "교육 콘텐츠를 위한 XR 실감형 학습 세트 구축" },
  { cat: "Insight", date: "2025.08.30", title: "실시간 합성 워크플로우가 제작 비용을 줄이는 방식" },
];

function catColor(cat: string) {
  return cat === "Press Release" ? "bg-accent-soft text-accent" : "bg-primary-soft text-primary";
}

export default function NewsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "News & Insight", href: "/news" }]}
        tag="News & Insight"
        title="실시간으로 확장되는 콘텐츠 제작의 새로운 기준."
        lead="EX의 소식과 산업 인사이트 — 보도자료, 도입 사례, 기술 인사이트, 자료실."
      />

      {/* §01 Featured + filter */}
      <section className="container-ex py-section">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((c, i) => (
            <span
              key={c}
              className={`rounded-full border px-4 py-1.5 font-mono text-xs ${
                i === 0 ? "border-primary bg-primary-soft text-primary" : "border-border text-muted"
              }`}
            >
              {c}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <a
            href="#"
            className="group relative flex min-h-[20rem] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-primary/60 lg:col-span-2"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10" />
            <div className="relative flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${catColor(featured.cat)}`}>
                {featured.cat}
              </span>
              <span className="font-mono text-xs text-faint">{featured.date}</span>
            </div>
            <div className="relative">
              <h3 className="text-2xl font-semibold leading-snug">{featured.title}</h3>
              <p className="mt-3 max-w-xl text-sm text-muted">{featured.excerpt}</p>
              <span className="mt-5 inline-block font-medium text-primary transition-transform group-hover:translate-x-1">
                Read More →
              </span>
            </div>
          </a>

          <div className="flex flex-col gap-5">
            {side.map((n) => (
              <a
                key={n.title}
                href="#"
                className="group flex flex-1 flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-primary/60"
              >
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${catColor(n.cat)}`}>
                    {n.cat}
                  </span>
                  <span className="font-mono text-xs text-faint">{n.date}</span>
                </div>
                <h3 className="mt-3 flex-1 text-sm font-medium leading-relaxed">{n.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* §02 Archive */}
      <section className="bg-surface/40">
        <div className="container-ex py-section">
          <SectionLabel index="01">Archive</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">전체 소식</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {archive.map((n) => (
              <a
                key={n.title}
                href="#"
                className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-primary/60"
              >
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${catColor(n.cat)}`}>
                    {n.cat}
                  </span>
                  <span className="font-mono text-xs text-faint">{n.date}</span>
                </div>
                <h3 className="mt-3 flex-1 text-base font-medium leading-relaxed">{n.title}</h3>
                <span className="mt-4 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                  Read →
                </span>
              </a>
            ))}
          </div>
          <p className="mt-8 text-center font-mono text-xs text-faint">콘텐츠는 CMS 연동 시 자동 업데이트됩니다.</p>
        </div>
      </section>

      {/* §03 Newsletter */}
      <section className="container-ex py-section-sm">
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-surface p-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h3 className="text-xl font-bold">뉴스레터 구독</h3>
            <p className="mt-1.5 text-sm text-muted">EX의 새로운 소식과 인사이트를 메일로 받아보세요.</p>
          </div>
          <Button href="/contact" variant="secondary">
            구독 신청 →
          </Button>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
