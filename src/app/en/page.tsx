import type { Metadata } from "next";
import { HomeClean, type NewsBrief } from "@/components/home/HomeClean";
import { getNews } from "@/lib/notion";
import { pressFallback } from "@/lib/press-fallback";

// ISR — home newsroom strip follows Notion (WEBSITE_NEWS) on a 5-minute cycle, same as the news page.
export const revalidate = 300;

export const metadata: Metadata = {
  // absolute → 루트 layout의 "%s | EX Corporation" 템플릿 접미사를 피해 영문 헤드라인 그대로 노출
  title: {
    absolute: "EX Corporation — Real-time XR & Virtual Production Solutions",
  },
  description:
    "EX connects the capture, tracking, rendering, and streaming of real-time XR and virtual production into a single workflow, with EXLINK, our own integrated solution, proven global partner products, and an XR studio in Hanam, Korea.",
  alternates: {
    canonical: "/en",
    languages: { ko: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    url: "https://excorp.kr/en",
    title: "EX Corporation — Real-time XR & Virtual Production Solutions",
    description:
      "Connecting capture, tracking, rendering, and streaming for real-time XR and virtual production into a single workflow.",
  },
};

export default async function HomePageEn() {
  // Notion first, fallback otherwise — press releases only, latest 3 (titles shown in Korean original, matching /en/news).
  const notionNews = await getNews();
  const news: NewsBrief[] =
    notionNews && notionNews.length > 0
      ? notionNews
          .filter((n) => n.category === "보도자료")
          .slice(0, 3)
          .map((n) => ({ date: n.date, outlet: n.outlet || undefined, title: n.title, href: n.sourceUrl || undefined }))
      : pressFallback.slice(0, 3).map((p) => ({ date: p.year, title: p.title, href: p.href }));

  return <HomeClean locale="en" news={news} />;
}
