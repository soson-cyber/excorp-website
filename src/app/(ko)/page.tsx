import type { Metadata } from "next";
import { HomeClean, type NewsBrief } from "@/components/home/HomeClean";
import { getNews } from "@/lib/notion";
import { pressFallback } from "@/lib/press-fallback";

// ISR — 홈 뉴스룸 스트립이 Notion(WEBSITE_NEWS) 변경을 5분 주기로 반영(news 페이지와 동일).
export const revalidate = 300;

export const metadata: Metadata = {
  // absolute → 루트 layout의 "%s | EX Corporation" 템플릿 접미사를 피해 슬로건 그대로 노출
  title: {
    absolute: "이엑스(EX Corporation) — 실시간 XR 통합 솔루션",
  },
  description:
    "이엑스는 실시간 XR과 버추얼 프로덕션의 촬영·트래킹·렌더·송출을 하나의 흐름으로 연결합니다. 자체 통합 솔루션 EXLINK와 검증된 글로벌 파트너 제품, 하남 XR 스튜디오까지.",
  alternates: {
    canonical: "/",
    languages: { "ko-KR": "/", "en-US": "/en", "x-default": "/" },
  },
  openGraph: {
    url: "https://excorp.kr/",
    title: "이엑스(EX Corporation) — 실시간 XR 통합 솔루션",
    description:
      "실시간 XR과 버추얼 프로덕션의 촬영·트래킹·렌더·송출을 하나의 흐름으로 연결합니다.",
  },
};

export default async function HomePage() {
  // Notion 우선, 미설정/장애 시 fallback — 보도자료만 최신 3건.
  const notionNews = await getNews();
  const news: NewsBrief[] =
    notionNews && notionNews.length > 0
      ? notionNews
          .filter((n) => n.category === "보도자료")
          .slice(0, 3)
          .map((n) => ({ date: n.date, outlet: n.outlet || undefined, title: n.title, href: n.sourceUrl || undefined }))
      : pressFallback.slice(0, 3).map((p) => ({ date: p.year, title: p.title, href: p.href }));

  return <HomeClean locale="ko" news={news} />;
}
