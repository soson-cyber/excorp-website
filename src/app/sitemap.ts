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
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/news" || path === "/work" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
  }));

  // 동적 라우트 — 정적 데이터(Sanity 연결 전)로 slug 생성. CMS 연결 시 소스 기반으로 전환.
  const workEntries: MetadataRoute.Sitemap = works.map((w) => ({
    url: `${BASE}/work/${w.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const newsEntries: MetadataRoute.Sitemap = insights.map((a) => ({
    url: `${BASE}/news/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...workEntries, ...newsEntries];
}
