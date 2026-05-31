import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { NewsList } from "@/components/news/NewsList";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata: Metadata = {
  title: "News & Insight",
  description:
    "이엑스의 보도자료·도입 사례·기술 인사이트·자료실. 실시간으로 확장되는 콘텐츠 제작의 새로운 기준.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "News & Insight", href: "/news" }]}
        tag="News & Insight"
        title="EX의 소식과 산업 인사이트"
        lead="보도자료 · 도입 사례 · 기술 인사이트 · 자료실 — 실시간 XR 콘텐츠 제작의 흐름을 전합니다."
      />

      {/* §01 News list (filterable) */}
      <section className="container-ex py-section">
        <SectionLabel index="01">Archive</SectionLabel>
        <h2 className="mt-5 text-balance text-4xl font-semibold md:text-5xl">전체 소식</h2>
        <div className="mt-12">
          <NewsList />
        </div>
      </section>

      {/* §02 Newsletter */}
      <section className="bg-surface">
        <div className="container-ex py-section-sm">
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-card p-8 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h3 className="text-xl font-bold text-fg">뉴스레터 구독</h3>
              <p className="mt-1.5 text-sm text-muted">EX의 새로운 소식과 인사이트를 메일로 받아보세요.</p>
            </div>
            <Button href="/contact" variant="secondary">
              구독 신청 →
            </Button>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
