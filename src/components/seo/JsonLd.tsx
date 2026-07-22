/*
  JSON-LD 주입 헬퍼 + 재사용 스키마 빌더.
  - <JsonLd> : 단일/배열 schema 객체를 <script type="application/ld+json">로 직렬화 주입.
  - breadcrumbLd() : 홈 > (상위) > 현재 BreadcrumbList. item은 절대 URL.
  - productLd() : 가격 비공개 정책 — offers 생략, brand만(SEO 감사 §2-2).
  - faqPageLd() : 화면 Q&A와 1:1 매핑(Google 정책 — 보이는 것만 넣는다).
  - localBusinessLd() : 하남 XR 스튜디오(주소·tel은 site.ts에서 주입).
  허위·미검증 속성 금지: price·aggregateRating·review·openingHours(미확인)는 넣지 않는다.
*/

import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/json-ld";

export const abs = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

type Json = Record<string, unknown>;

export function JsonLd({ schema }: { schema: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}

/** 홈을 자동 prepend. crumbs는 홈 이후의 단계만 전달(예: [{name:"Product",path:"/product"}, …]). */
export function breadcrumbLd(crumbs: { name: string; path: string }[]): Json {
  const items = [{ name: "홈", path: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

/* productLd() 제거 — Product 스키마는 offers/review/aggregateRating 중 하나가 필수인데
   EX는 가격·평점을 공개하지 않으므로(정직성) 유효한 Product 스니펫을 만들 수 없다.
   허위 가격·평점 대신 제품 페이지는 BreadcrumbList + FAQPage만 구조화한다.
   (Google Search Console '제품 스니펫 필수 필드 누락' 오류 해소) */

/** 화면에 보이는 q/a 배열을 그대로 매핑. */
export function faqPageLd(faqs: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** 하남 XR 스튜디오 — 실제 방문·제작이 가능한 사업장. 주소·tel은 site.ts에서 주입. */
export function localBusinessLd(args: {
  name: string;
  address: string;
  zip: string;
  tel: string;
  region?: string;
  locality?: string;
  path: string;
  image?: string; // 스튜디오 대표 이미지(상대경로 → abs 처리)
  geo?: { lat: number; lng: number }; // 위경도
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: args.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: args.address,
      ...(args.locality ? { addressLocality: args.locality } : {}),
      ...(args.region ? { addressRegion: args.region } : {}),
      postalCode: args.zip,
      addressCountry: "KR",
    },
    ...(args.image ? { image: abs(args.image) } : {}),
    ...(args.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: args.geo.lat, longitude: args.geo.lng } }
      : {}),
    telephone: `+82-${args.tel.replace(/^0/, "").replace(/-/g, "-")}`,
    url: abs(args.path),
    parentOrganization: { "@type": "Organization", name: "EX Corporation" },
  };
}
