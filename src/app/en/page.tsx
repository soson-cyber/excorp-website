import type { Metadata } from "next";
import { HomeClean } from "@/components/home/HomeClean";

export const metadata: Metadata = {
  // absolute → 루트 layout의 "%s | EX Corporation" 템플릿 접미사를 피해 영문 헤드라인 그대로 노출
  title: {
    absolute: "EX Corporation — Real-time XR & Virtual Production Solutions",
  },
  description:
    "EX connects the capture, tracking, rendering, and streaming of real-time XR and virtual production into a single workflow, with EXLINK, our own integrated solution, proven global partner products, and an XR studio in Hanam, Korea.",
  alternates: {
    canonical: "/en",
    languages: { ko: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    url: "https://excorp.kr/en",
    title: "EX Corporation — Real-time XR & Virtual Production Solutions",
    description:
      "Connecting capture, tracking, rendering, and streaming for real-time XR and virtual production into a single workflow.",
  },
};

export default function HomePageEn() {
  return <HomeClean locale="en" />;
}
