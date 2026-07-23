import type { MetadataRoute } from "next";
import { works } from "@/lib/work";
import { insights } from "@/lib/insights";
import { getInsights, getNews } from "@/lib/notion";

const BASE = "https://excorp.kr";

export const revalidate = 300;

function toLastModified(value: string | Date, fallback: Date): Date {
  if (value instanceof Date) return value;
  const normalized = /^\d{4}$/.test(value) ? `${value}-01-01` : value;
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.valueOf()) ? fallback : parsed;
}

const staticRoutes = [
  "",
  "/about",
  "/solution",
  "/solution/xr-solution",
  "/solution/virtual-production",
  "/product",
  "/product/aximmetry",
  "/product/moverse",
  "/product/retracker",
  "/xr-studio",
  "/work",
  "/support",
  "/news",
  "/careers",
  "/contact",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 매 빌드마다 '오늘'로 신호되면 신뢰도 하락·크롤 낭비 → 마지막 실 콘텐츠 갱신일 상수.
  // 동적(work/news)은 Sanity 연결 시 콘텐츠 소스 날짜로 대체 예정.
  const LAST_UPDATE = new Date("2026-07-17");

  // ko/en 전체 미러 — 각 정적 라우트를 hreflang으로 상호 연결.
  const hreflang = (path: string) => ({
    languages: {
      "ko-KR": `${BASE}${path}`,
      "en-US": `${BASE}/en${path}`,
      "x-default": `${BASE}${path}`,
    },
  });

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: LAST_UPDATE,
    changeFrequency: path === "" || path === "/news" || path === "/work" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
    alternates: hreflang(path),
  }));

  // 영문 미러(/en/*) — 한국어 라우트와 hreflang 상호 연결.
  const enEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${BASE}/en${path}`,
    lastModified: LAST_UPDATE,
    changeFrequency: path === "" || path === "/news" || path === "/work" ? "weekly" : "monthly",
    priority: path === "" ? 0.9 : path.split("/").length > 2 ? 0.5 : 0.7,
    alternates: hreflang(path),
  }));

  // 동적 라우트 — Notion을 우선하고, 미연결·빈 응답이면 저장소 fallback을 사용한다.
  const workEntries: MetadataRoute.Sitemap = works.filter((w) => w.kind === "case").map((w) => ({
    url: `${BASE}/work/${w.slug}`,
    lastModified: LAST_UPDATE,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const [notionNews, notionInsights] = await Promise.all([getNews(), getInsights()]);
  const dynamicNews = new Map<string, { slug: string; updated: string | Date }>();

  const publishedInsights = notionInsights && notionInsights.length > 0 ? notionInsights : insights;

  // Press fallback entries link to external publishers and have no local slug route.
  for (const item of notionNews ?? []) {
    dynamicNews.set(item.slug, { slug: item.slug, updated: item.date || LAST_UPDATE });
  }
  for (const item of publishedInsights) {
    dynamicNews.set(item.slug, { slug: item.slug, updated: item.year || LAST_UPDATE });
  }

  const newsEntries: MetadataRoute.Sitemap = [...dynamicNews.values()].flatMap((item) => {
    const path = `/news/${item.slug}`;
    const alternates = {
      languages: {
        "ko-KR": `${BASE}${path}`,
        "en-US": `${BASE}/en${path}`,
        "x-default": `${BASE}${path}`,
      },
    };

    return [
      {
        url: `${BASE}${path}`,
        lastModified: toLastModified(item.updated, LAST_UPDATE),
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates,
      },
      {
        url: `${BASE}/en${path}`,
        lastModified: toLastModified(item.updated, LAST_UPDATE),
        changeFrequency: "monthly" as const,
        priority: 0.5,
        alternates,
      },
    ];
  });

  return [...staticEntries, ...enEntries, ...workEntries, ...newsEntries];
}
