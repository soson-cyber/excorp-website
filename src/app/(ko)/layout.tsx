import type { Metadata } from "next";

import "../globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { SITE_URL } from "@/lib/site";

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
    description: "AI와 XR 기술을 연결하여 현실과 가상이 융합되는 새로운 콘텐츠 경험을 만듭니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EX Corporation — 기술의 연결로 경험을 확장하다",
    description: "AI와 XR 기술을 연결하여 현실과 가상이 융합되는 새로운 콘텐츠 경험을 만듭니다.",
  },
  verification: {
    other: { "naver-site-verification": "2b9d03e1bfbf29fbf1e6d732fd0c70eb68f26156" },
  },
};

export default function KoreanRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="ko">{children}</RootDocument>;
}
