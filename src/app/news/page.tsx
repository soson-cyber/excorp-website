import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { NewsList } from "@/components/news/NewsList";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata: Metadata = {
  title: "뉴스 & 인사이트",
  description:
    "이엑스(EX)의 보도자료와 기술 인사이트. 버추얼 프로덕션·마커리스 카메라 트래킹 등 실시간 XR 콘텐츠 제작을 쉽게 풀어 설명하고, EX의 파트너십·스튜디오 소식을 전합니다.",
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
      <section className="section section--ink section--glow">
        <div className="container-ex">
          <SectionLabel index="01">Archive</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            전체 소식
          </h2>
          <div className="mt-12">
            <NewsList />
          </div>
        </div>
      </section>

      {/* §02 Newsletter */}
      <section className="section section--surface">
        <div className="container-ex">
          <div className="card flex flex-col items-center gap-5 text-center md:flex-row md:justify-between md:text-left" style={{ padding: 32 }}>
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
