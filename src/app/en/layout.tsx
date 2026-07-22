import type { Metadata } from "next";

import "../globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "EX Corporation — Real-time XR & Virtual Production Solutions",
    template: "%s | EX Corporation",
  },
  description:
    "EX connects AI, XR, capture, tracking, rendering, and streaming to create real-time content production experiences.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/en`,
    siteName: "EX Corporation",
    title: "EX Corporation — Real-time XR & Virtual Production Solutions",
    description: "Connecting capture, tracking, rendering, and streaming for real-time XR and virtual production.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EX Corporation — Real-time XR & Virtual Production Solutions",
    description: "Connecting capture, tracking, rendering, and streaming for real-time XR and virtual production.",
  },
};

export default function EnglishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
