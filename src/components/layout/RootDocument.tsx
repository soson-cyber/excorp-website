import { Noto_Sans_KR, Poppins } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { type Locale, ui } from "@/lib/i18n";
import { sameAs, site, SITE_URL } from "@/lib/site";

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

const telE164 = `+82-${site.contact.tel.replace(/^0/, "")}`;
const motionGate =
  "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.setAttribute('data-anim','')}}catch(e){}";

type RootDocumentProps = Readonly<{
  children: React.ReactNode;
  locale: Locale;
}>;

export function RootDocument({ children, locale }: RootDocumentProps) {
  const isEnglish = locale === "en";

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${notoSansKr.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <GoogleAnalytics />
        <script id="anim-gate" dangerouslySetInnerHTML={{ __html: motionGate }} />
        <a href="#main" className="skip-link">
          {ui[locale].skipToContent}
        </a>
        <JsonLd
          schema={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "EX Corporation",
              alternateName: "이엑스 주식회사",
              url: SITE_URL,
              logo: `${SITE_URL}/ex-logo.png`,
              description: isEnglish
                ? "An all-in-one real-time XR content production company connecting AI and XR technologies"
                : "AI와 XR 기술을 연결하는 All-in-One 실시간 XR 콘텐츠 제작 솔루션 기업",
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
              sameAs,
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "EX Corporation",
              alternateName: "이엑스 주식회사",
              url: isEnglish ? `${SITE_URL}/en` : SITE_URL,
              inLanguage: locale === "en" ? "en-US" : "ko-KR",
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
