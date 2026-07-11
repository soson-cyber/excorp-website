import type { MetadataRoute } from "next";
import { works } from "@/lib/work";
import { insights } from "@/lib/insights";

const BASE = "https://excorp.kr";

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

export default function sitemap(): MetadataRoute.Sitemap {
  // 매 빌드마다 '오늘'로 신호되면 신뢰도 하락·크롤 낭비 → 마지막 실 콘텐츠 갱신일 상수.
  // 동적(work/news)은 Sanity 연결 시 콘텐츠 소스 날짜로 대체 예정.
  const LAST_UPDATE = new Date("2026-06-24");

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

  // 동적 라우트 — 정적 데이터(Sanity 연결 전)로 slug 생성. CMS 연결 시 소스 기반으로 전환.
  const workEntries: MetadataRoute.Sitemap = works.map((w) => ({
    url: `${BASE}/work/${w.slug}`,
    lastModified: LAST_UPDATE,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const newsEntries: MetadataRoute.Sitemap = insights.map((a) => ({
    url: `${BASE}/news/${a.slug}`,
    lastModified: LAST_UPDATE,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...enEntries, ...workEntries, ...newsEntries];
}
