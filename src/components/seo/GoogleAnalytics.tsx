import Script from "next/script";

/**
 * Google Analytics 4 (gtag.js) 연결.
 * 측정 ID는 NEXT_PUBLIC_GA_ID 환경변수에서 읽는다.
 * 미설정이면 null을 반환해 아무것도 렌더하지 않는다(로컬·미연결 환경에서 안전).
 * 쿠키 기반 행태정보 수집 — 개인정보 처리방침 제12조 참조.
 */
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
