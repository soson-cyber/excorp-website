import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { NewsList } from "@/components/news/NewsList";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { getNews } from "@/lib/notion";
import { pressFallback } from "@/lib/press-fallback";

// ISR — Notion(WEBSITE_NEWS) 변경을 5분 주기로 반영. 미설정 시 fallback.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "뉴스 & 인사이트",
  alternates: { canonical: "/news" },
  description:
    "이엑스(EX)의 보도자료와 기술 인사이트. 버추얼 프로덕션·마커리스 카메라 트래킹 등 실시간 XR 콘텐츠 제작을 쉽게 풀어 설명하고, EX의 파트너십·스튜디오 소식을 전합니다.",
};

export default async function NewsPage() {
  // Notion(WEBSITE_NEWS) 보도자료 → 없거나 비면 하드코딩 fallback 사용(사이트 안 깨짐)
  const notion = await getNews();
  const press =
    notion && notion.length > 0
      ? notion.map((n, i) => ({
          cat: "보도자료" as const,
          year: n.date ? n.date.slice(0, 4) : "",
          title: n.title,
          excerpt: n.summary || undefined,
          href: `/news/${n.slug}`, // 사이트 내 요약 랜딩 → 거기서 원문 보기
          thumbnail: n.thumbnail || undefined,
          featured: i === 0,
        }))
      : pressFallback;

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "News & Insight", href: "/news" }]}
        tag="News & Insight"
        title="EX의 소식과 산업 인사이트"
        lead="보도자료 · 도입 사례 · 기술 인사이트 · 자료실 — 실시간 XR 콘텐츠 제작의 흐름을 전합니다."
      />

      {/* §01 News list (filterable) — top glow bridges the hero aurora down */}
      <section className="section section--ink news-archive">
        <div className="container-ex">
          <SectionHead index="01" label="Archive" title="전체 소식" />
          <div className="mt-12">
            <NewsList press={press} />
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
