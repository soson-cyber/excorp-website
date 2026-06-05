import type { Metadata } from "next";
import Script from "next/script";
import { Poppins, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";

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
  metadataBase: new URL("https://excorp.kr"),
  title: {
    default: "EX Corporation — 기술의 연결로 경험을 확장하다",
    template: "%s | EX Corporation",
  },
  description:
    "이엑스 주식회사(EX Corporation)는 AI와 XR 기술을 연결하여 현실과 가상이 융합되는 새로운 콘텐츠 경험을 만듭니다. All-in-One, Real-time XR Content Production Solution.",
  keywords: [
    "버추얼 프로덕션",
    "XR",
    "실시간 콘텐츠",
    "EXLINK",
    "모션캡처",
    "Aximmetry",
    "Moverse",
    "RETracker",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://excorp.kr",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${poppins.variable} ${notoSansKr.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        {/* Enable scroll-reveal only when motion is allowed (pre-hydration, no-flash, no-JS safe).
            Sets a data attribute (not className) to avoid hydration mismatch on <html>. */}
        <Script id="anim-gate" strategy="beforeInteractive">
          {`try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.setAttribute('data-anim','')}}catch(e){}`}
        </Script>
        <a href="#main" className="skip-link">
          본문 바로가기
        </a>
        <Script
          id="org-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "EX Corporation",
              alternateName: "이엑스 주식회사",
              url: "https://excorp.kr",
              logo: "https://excorp.kr/ex-logo.png",
              description:
                "AI와 XR 기술을 연결하는 All-in-One 실시간 XR 콘텐츠 제작 솔루션 기업",
              email: "contact@excorp.kr",
              telephone: "+82-31-699-8228",
              address: {
                "@type": "PostalAddress",
                streetAddress: "금토동 327, 스타트업스퀘어 B동 3층",
                addressLocality: "성남시 수정구",
                addressRegion: "경기도",
                postalCode: "461380",
                addressCountry: "KR",
              },
              sameAs: ["https://instagram.com/ex.studio"],
            }),
          }}
        />
        <Script
          id="website-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "EX Corporation",
              alternateName: "이엑스 주식회사",
              url: "https://excorp.kr",
              inLanguage: "ko-KR",
              publisher: { "@type": "Organization", name: "EX Corporation" },
            }),
          }}
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
