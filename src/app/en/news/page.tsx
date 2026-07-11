import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { NewsList, type NewsItem } from "@/components/news/NewsList";
import { getNews, getInsights } from "@/lib/notion";
import { pressFallback } from "@/lib/press-fallback";
import { insights as localInsights } from "@/lib/insights";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

// ISR — reflects Notion (WEBSITE_NEWS) changes every 5 minutes. Falls back when unset.
export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: "News & Insight — Virtual Production & XR Guides | EX Corporation" },
  description:
    "What virtual production is, how in-camera VFX works, and using Unreal Engine for broadcast. EX shares its technical insights, press releases, and partnership and studio news.",
  alternates: {
    canonical: "/en/news",
    languages: { "ko-KR": "/news", "en-US": "/en/news", "x-default": "/news" },
  },
};

export default async function NewsPageEn() {
  // Notion (WEBSITE_NEWS) press releases → hardcoded fallback when missing/empty (page never breaks).
  // Article body data (insights.ts) is Korean-only, so EN cards reuse the existing ko data for now;
  // only the index UI (header, categories, newsletter) is localized.
  const notion = await getNews();
  const press =
    notion && notion.length > 0
      ? notion.map((n, i) => ({
          cat: "보도자료" as const,
          year: n.date ? n.date.slice(0, 4) : "",
          title: n.title,
          excerpt: n.summary || undefined,
          href: `/en/news/${n.slug}`, // English summary landing → source link from detail
          thumbnail: n.thumbnail || undefined,
          featured: i === 0,
        }))
      : pressFallback;

  const notionInsights = await getInsights();
  const insightItems: NewsItem[] =
    notionInsights && notionInsights.length > 0
      ? notionInsights.map((i) => ({
          cat: "인사이트" as const,
          year: i.year,
          title: i.title,
          excerpt: i.summary || undefined,
          href: `/en/news/${i.slug}`,
          thumbnail: i.thumbnail || undefined,
        }))
      : localInsights.map((i) => ({
          cat: "인사이트" as const,
          year: i.year,
          title: i.title,
          excerpt: i.summary,
          href: `/en/news/${i.slug}`,
          thumbnail: i.thumbnail,
        }));

  return (
    <>
      <JsonLd schema={breadcrumbLd([{ name: "News & Insight", path: "/en/news" }])} />
      <PageHero
        breadcrumb={[{ label: "News & Insight", href: "/en/news" }]}
        tag="News & Insight"
        title="EX news and industry insights"
        lead="Press releases and technical insights — the pulse of real-time XR content production and news from EX."
      />

      {/* §01 News list (filterable) — top glow bridges the hero aurora down */}
      <section className="section section--ink news-archive">
        <div className="container-ex">
          <SectionHead index="01" label="Archive" title="All news" />
          <div className="mt-12">
            <NewsList press={press} insights={insightItems} locale="en" />
          </div>
        </div>
      </section>

      {/* §02 Newsletter */}
      <section className="section section--surface">
        <div className="container-ex">
          <div className="card flex flex-col items-center gap-5 text-center md:flex-row md:justify-between md:text-left" style={{ padding: 32 }}>
            <div>
              <h3 className="text-xl font-bold text-fg">Subscribe to our newsletter</h3>
              <p className="mt-1.5 text-sm text-muted">Get EX news and insights delivered to your inbox.</p>
            </div>
            <Button href="/en/contact" variant="secondary">
              Ask to subscribe →
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
