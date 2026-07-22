import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { NewsList, type NewsItem } from "@/components/news/NewsList";
import { getNews, getInsights } from "@/lib/notion";
import { pressFallback } from "@/lib/press-fallback";
import { insights as localInsights } from "@/lib/insights";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

// ISR — Notion(WEBSITE_NEWS) 변경을 5분 주기로 반영. 미설정 시 fallback.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "뉴스 & 인사이트 — 버추얼 프로덕션·XR 가이드",
  alternates: { canonical: "/news", languages: { "ko-KR": "/news", "en-US": "/en/news", "x-default": "/news" } },
  description:
    "버추얼 프로덕션이란 무엇인지, 인카메라 VFX 원리와 언리얼엔진 방송 활용까지. EX의 기술 인사이트와 보도자료, 파트너십·스튜디오 소식을 전합니다.",
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

  // 인사이트: Notion(WEBSITE_INSIGHTS) 우선 → 미연결/빈 경우 lib/insights.ts fallback
  const notionInsights = await getInsights();
  const insightItems: NewsItem[] =
    notionInsights && notionInsights.length > 0
      ? notionInsights.map((i) => ({
          cat: "인사이트" as const,
          year: i.year,
          title: i.title,
          excerpt: i.summary || undefined,
          href: `/news/${i.slug}`,
          thumbnail: i.thumbnail || undefined,
        }))
      : localInsights.map((i) => ({
          cat: "인사이트" as const,
          year: i.year,
          title: i.title,
          excerpt: i.summary,
          href: `/news/${i.slug}`,
          thumbnail: i.thumbnail,
        }));

  return (
    <>
      <JsonLd schema={breadcrumbLd([{ name: "뉴스 & 인사이트", path: "/news" }])} />
      <PageHero
        breadcrumb={[{ label: "News & Insight", href: "/news" }]}
        tag="News & Insight"
        title="EX의 소식과 산업 인사이트"
        lead="보도자료와 기술 인사이트 — 실시간 XR 콘텐츠 제작의 흐름과 EX 소식을 전합니다."
      />

      {/* §01 News list (filterable) — top glow bridges the hero aurora down */}
      <section className="section section--ink news-archive">
        <div className="container-ex">
          <SectionHead index="01" label="Archive" title="전체 소식" />
          <div className="mt-12">
            <NewsList press={press} insights={insightItems} />
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
              구독 문의 →
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
