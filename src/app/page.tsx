import type { Metadata } from "next";
import { HomeClean } from "@/components/home/HomeClean";

export const metadata: Metadata = {
  // absolute → 루트 layout의 "%s | EX Corporation" 템플릿 접미사를 피해 슬로건 그대로 노출
  title: {
    absolute: "이엑스(EX Corporation) — 실시간 XR 통합 솔루션",
  },
  description:
    "이엑스는 실시간 XR과 버추얼 프로덕션의 촬영·트래킹·렌더·송출을 하나의 흐름으로 연결합니다. 자체 통합 솔루션 EXLINK와 검증된 글로벌 파트너 제품, 하남 XR 스튜디오까지.",
  alternates: {
    canonical: "/",
    languages: { "ko-KR": "/", "en-US": "/en", "x-default": "/" },
  },
  openGraph: {
    url: "https://excorp.kr/",
    title: "이엑스(EX Corporation) — 실시간 XR 통합 솔루션",
    description:
      "실시간 XR과 버추얼 프로덕션의 촬영·트래킹·렌더·송출을 하나의 흐름으로 연결합니다.",
  },
};

export default function HomePage() {
  return <HomeClean locale="ko" />;
}
