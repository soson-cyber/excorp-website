import type { MetadataRoute } from "next";

const BASE = "https://excorp.kr";

const routes = [
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
  "/support",
  "/news",
  "/careers",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/news" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
