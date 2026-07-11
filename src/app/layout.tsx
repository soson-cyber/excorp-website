import type { Metadata } from "next";
import Script from "next/script";
import { Poppins, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { site, sameAs, SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { ui } from "@/lib/i18n";

// 국내 전화번호(031-699-8228) → E.164(+82-31-699-8228). JSON-LD telephone 단일 변환.
const telE164 = `+82-${site.contact.tel.replace(/^0/, "")}`;

// Official EX brand typeface (브랜딩 가이드 p.10): Poppins (영문) + Noto Sans KR (국문)
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "EX Corporation — 기술의 연결로 경험을 확장하다",
    template: "%s | EX Corporation",
  },
  description:
    "이엑스 주식회사(EX Corporation)는 AI와 XR 기술을 연결하여 현실과 가상이 융합되는 새로운 콘텐츠 경험을 만듭니다. All-in-One, Real-time XR Content Production Solution.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "EX Corporation",
    title: "EX Corporation — 기술의 연결로 경험을 확장하다",
    description:
      "AI와 XR 기술을 연결하여 현실과 가상이 융합되는 새로운 콘텐츠 경험을 만듭니다.",
    // OG 이미지는 app/opengraph-image.tsx(브랜드 1200×630 생성기)가 전 라우트에 자동 적용.
  },
  twitter: {
    card: "summary_large_image",
    title: "EX Corporation — 기술의 연결로 경험을 확장하다",
    description:
      "AI와 XR 기술을 연결하여 현실과 가상이 융합되는 새로운 콘텐츠 경험을 만듭니다.",
    // 트위터 이미지는 og:image(생성된 opengraph-image)로 폴백된다.
  },
  verification: {
    other: { "naver-site-verification": "2b9d03e1bfbf29fbf1e6d732fd0c70eb68f26156" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 전 페이지 정적 생성 유지를 위해 서버에서 locale을 읽지 않는다(headers() 미사용).
  // <html lang>은 정적 ko로 출력하고, /en 경로면 hydration 이전(beforeInteractive)에
  // 스크립트로 'en'으로 보정한다 — JS 실행 크롤러(구글)는 정확, hreflang(각 페이지 metadata)로 보완.
  return (
    <html
      lang="ko"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${poppins.variable} ${notoSansKr.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <GoogleAnalytics />
        {/* Enable scroll-reveal only when motion is allowed (pre-hydration, no-flash, no-JS safe).
            Also corrects <html lang> for /en routes before paint (static HTML stays ko). */}
        <Script id="anim-gate" strategy="beforeInteractive">
          {`try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.setAttribute('data-anim','')}if(location.pathname==='/en'||location.pathname.indexOf('/en/')===0){document.documentElement.lang='en'}}catch(e){}`}
        </Script>
        <a href="#main" className="skip-link">
          {ui.ko.skipToContent}
        </a>
        {/* Organization·WebSite 스키마 — 서버 렌더로 첫 HTML에 포함(비-JS 크롤러도 수집). */}
        <JsonLd
          schema={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "EX Corporation",
              alternateName: "이엑스 주식회사",
              url: SITE_URL,
              logo: `${SITE_URL}/ex-logo.png`,
              description:
                "AI와 XR 기술을 연결하는 All-in-One 실시간 XR 콘텐츠 제작 솔루션 기업",
              email: site.contact.email,
              telephone: telE164,
              address: {
                "@type": "PostalAddress",
                streetAddress: "금토동 327, 스타트업스퀘어 B동 3층",
                addressLocality: "성남시 수정구",
                addressRegion: "경기도",
                postalCode: "13453",
                addressCountry: "KR",
              },
              // sameAs = site.ts의 sameAs(= site.social 3채널) 단일 출처. 잘못된 ex.studio 핸들 교정.
              sameAs,
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "EX Corporation",
              alternateName: "이엑스 주식회사",
              url: SITE_URL,
              inLanguage: "ko-KR",
              publisher: { "@type": "Organization", name: "EX Corporation" },
            },
          ]}
        />
        <div className="grain-overlay" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg">
            <filter id="ex-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#ex-grain)" />
          </svg>
        </div>
        <CustomCursor />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
