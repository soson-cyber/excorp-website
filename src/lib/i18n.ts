// 경량 자체 i18n — /en 미러 방식. 외부 라이브러리 없음.
// 한국어는 루트 경로(/solution 등) 그대로, 영어는 /en 접두로 순수 추가.
// locale 판단은 pathname 기반(클라이언트 usePathname / 정적 페이지는 경로로 분기).

export type Locale = "ko" | "en";
export const locales = ["ko", "en"] as const;
export const defaultLocale: Locale = "ko";

/** /en 또는 /en/... 이면 "en", 아니면 "ko". */
export function localeFromPathname(p: string): Locale {
  return p === "/en" || p.startsWith("/en/") ? "en" : "ko";
}

/** en 경로에서 /en 제거해 ko 기준 경로 반환(루트는 "/"). ko 경로는 그대로. */
export function stripLocale(p: string): string {
  if (p === "/en") return "/";
  if (p.startsWith("/en/")) return p.slice(3); // "/en/foo" → "/foo"
  return p;
}

/** locale이 en이면 /en + path(path가 "/"면 "/en"), ko면 path 그대로. */
export function withLocale(path: string, locale: Locale): string {
  if (locale !== "en") return path;
  if (path === "/") return "/en";
  return `/en${path}`;
}

/** 현재 경로의 반대 언어 경로(언어 토글용). */
export function oppositePath(p: string): string {
  const current = localeFromPathname(p);
  const base = stripLocale(p);
  return current === "en" ? base : withLocale(base, "en");
}

type UiStrings = {
  headerCta: string;
  langLabel: string;
  skipToContent: string;
  langToggleAria: string;
  // Footer 컬럼 제목·링크 라벨(한글 라벨의 영문판)
  footerColumns: {
    solution: { title: string; xrSolution: string; virtualProduction: string; exlink: string };
    product: { title: string };
    company: { title: string; aboutEx: string; news: string; career: string; work: string; xrStudio: string };
    support: { title: string; contact: string; support: string };
  };
  footerPrivacy: string;
  footerTerms: string;
  footerRights: string;
  // nav children desc(site.ts nav 한글 desc들의 영문판)
  navDesc: Record<string, string>;
  // nav featured 영문 카피
  navFeatured: Record<string, { eyebrow: string; title: string; desc: string; cta: string }>;
};

export const ui: Record<Locale, UiStrings> = {
  ko: {
    headerCta: "문의하기",
    langLabel: "언어",
    skipToContent: "본문 바로가기",
    langToggleAria: "언어 전환",
    footerColumns: {
      solution: { title: "Solution", xrSolution: "XR Solution", virtualProduction: "Virtual Production", exlink: "EXLINK" },
      product: { title: "Product" },
      company: { title: "Company", aboutEx: "About EX", news: "News & Insight", career: "Career", work: "Work", xrStudio: "XR Studio" },
      support: { title: "Support", contact: "Contact", support: "Support" },
    },
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Use",
    footerRights: "All rights reserved.",
    navDesc: {
      "/solution/xr-solution": "현실과 가상을 실시간으로 연결하는 통합 XR 솔루션, EXLINK",
      "/solution/virtual-production": "카메라·배경 합성·라이브 연출이 동시에 일어나는 영상 제작 기법",
      "/product/aximmetry": "실시간 3D 그래픽 & 버추얼 프로덕션 플랫폼",
      "/product/moverse": "센서 없이 동작하는 AI 마커리스 모션캡처",
      "/product/retracker": "6-DOF 마커리스 카메라 트래킹 — Bliss / Fizz",
      "/about": "회사 소개 · 미션 · 비전",
      "/news": "EX의 소식과 인사이트",
      "/careers": "함께할 동료를 찾습니다",
    },
    navFeatured: {
      Solution: { eyebrow: "EX ORIGINAL", title: "EXLINK", desc: "현실과 가상을 실시간으로 잇는 올인원 XR 솔루션", cta: "솔루션 보기" },
      Product: { eyebrow: "PARTNER PRODUCTS", title: "검증된 글로벌 XR 도구", desc: "EX가 직접 연결·조율하는 파트너 제품군", cta: "제품 전체 보기" },
      Company: { eyebrow: "ABOUT EX", title: "경험을 확장하다", desc: "기술의 연결로 새로운 콘텐츠 경험을 만드는 사람들", cta: "회사 소개" },
    },
  },
  en: {
    headerCta: "Contact",
    langLabel: "Language",
    skipToContent: "Skip to content",
    langToggleAria: "Switch language",
    footerColumns: {
      solution: { title: "Solution", xrSolution: "XR Solution", virtualProduction: "Virtual Production", exlink: "EXLINK" },
      product: { title: "Product" },
      company: { title: "Company", aboutEx: "About EX", news: "News & Insight", career: "Career", work: "Work", xrStudio: "XR Studio" },
      support: { title: "Support", contact: "Contact", support: "Support" },
    },
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Use",
    footerRights: "All rights reserved.",
    navDesc: {
      "/solution/xr-solution": "EXLINK — an all-in-one XR solution that links the physical and virtual in real time",
      "/solution/virtual-production": "A production method where camera, compositing, and live direction happen at once",
      "/product/aximmetry": "Real-time 3D graphics & virtual production platform",
      "/product/moverse": "Markerless AI motion capture — no sensors required",
      "/product/retracker": "6-DOF markerless camera tracking — Bliss / Fizz",
      "/about": "Company · Mission · Vision",
      "/news": "News and insights from EX",
      "/careers": "We're looking for people to build with",
    },
    navFeatured: {
      Solution: { eyebrow: "EX ORIGINAL", title: "EXLINK", desc: "An all-in-one XR solution that links the real and virtual in real time", cta: "Explore the solution" },
      Product: { eyebrow: "PARTNER PRODUCTS", title: "Proven global XR tools", desc: "Partner products EX integrates and orchestrates end to end", cta: "View all products" },
      Company: { eyebrow: "ABOUT EX", title: "Expanding experiences", desc: "People building new content experiences by connecting technology", cta: "About the company" },
    },
  },
};
