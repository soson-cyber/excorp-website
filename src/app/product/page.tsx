import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { CompareTable } from "@/components/product/CompareTable";
import { ProblemTrio } from "@/components/page/ProblemTrio";
import { JsonLd, breadcrumbLd, abs } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Aximmetry · Moverse · RETracker 한국 공식 공급",
  alternates: { canonical: "/product", languages: { "ko-KR": "/product", "en-US": "/en/product", "x-default": "/product" } },
  description:
    "버추얼 프로덕션 핵심 제품을 EX가 한국에서 공식 공급합니다. 실시간 합성 Aximmetry(공식 리셀러), AI 마커리스 모션캡처 Moverse·6-DOF 카메라 트래킹 RETracker(공식 총판). 도입 컨설팅·셋업·교육·기술 지원까지.",
};

const whyEx = [
  { t: "도입 컨설팅", d: "현장 요구에 맞는 제품·구성과 도입 견적을 제안합니다." },
  { t: "시스템 셋업", d: "설치·연동·캘리브레이션 전 과정" },
  { t: "교육", d: "운영 인력 대상 실무 교육" },
  { t: "기술 지원", d: "해외 본사 대신 EX가 한국어로 도입 이후를 지속 대응합니다." },
];

// Problem Quote Trio (§0-A) — 검증 안 된 해외 도구를 직접 들이는 부담.
const problems = [
  { id: "PAIN 01", quote: "해외 솔루션은 영어 매뉴얼뿐입니다.", desc: "본사 시차·언어로 문제 대응이 늦고, 도입 비용·라이선스 구성도 가늠하기 어렵습니다." },
  { id: "PAIN 02", quote: "잘못 사면 비싼 장비가 창고에 잠깁니다.", desc: "현장에 맞지 않는 구성을 들이면 운영하지 못하고 자산만 묶입니다." },
  { id: "PAIN 03", quote: "사고 나면 누구에게 물어보죠?", desc: "공급으로 끝나면 셋업·교육·운영이 막막합니다. 도입 이후를 함께할 곳이 필요합니다." },
];

const lineup = [
  {
    badge: "Certified Reseller",
    title: "Aximmetry",
    copy: "방송·엔터테인먼트를 위한 실시간 3D 그래픽 & 버추얼 프로덕션 플랫폼",
    meta: "Real-time Compositing",
    href: "/product/aximmetry",
  },
  {
    badge: "Distributor",
    title: "Moverse AI",
    copy: "전용 수트·마커 없이 동작하는 AI 마커리스 모션캡처 (100% On-Premise)",
    meta: "Markerless MoCap",
    href: "/product/moverse",
  },
  {
    badge: "Distributor",
    title: "RETracker",
    copy: "천장 마커 없는 6-DOF 마커리스 카메라 트래킹 — Bliss G2 / Fizz 2 Pro",
    meta: "6-DOF Marker-less",
    href: "/product/retracker",
  },
];

const compare = [
  { label: "역할", values: ["실시간 합성·렌더", "마커리스 모션캡처", "6-DOF 카메라 트래킹"] },
  { label: "핵심", values: ["Unreal 호환 · 최대 8K", "마커리스 · On-Premise", "6-DOF · <1cm/10m"] },
  { label: "EX 자격", values: ["공식 인증 리셀러", "공식 한국 총판", "공식 한국 총판"] },
];

const certs = [
  { src: "/cert-aximmetry.png", name: "Aximmetry Authorization", href: "/product/aximmetry" },
  { src: "/cert-moverse.png", name: "Moverse Certificate", href: "/product/moverse" },
  { src: "/cert-retracker.png", name: "RETracker Certificate", href: "/product/retracker" },
];

export default function ProductPage() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbLd([{ name: "Product", path: "/product" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: lineup.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.title,
              url: abs(p.href),
            })),
          },
        ]}
      />
      <PageHero
        breadcrumb={[{ label: "Product", href: "/product" }]}
        tag="Product"
        title="검증된 글로벌 파트너 제품, EX가 한국에서 책임집니다."
        lead="Aximmetry(공식 리셀러)·Moverse·RETracker(공식 총판)를 한국에서 공식 공급합니다. 도입 컨설팅·견적부터 셋업·교육·기술 지원까지 한국어로 지원합니다."
      />

      {/* Problem Quote Trio — 해외 도구를 직접 들이는 부담(§0-A) */}
      <ProblemTrio
        index="00"
        label="Before EX"
        title="제품만 사면 끝일까요."
        problems={problems}
        note="EX는 공식 리셀러·총판으로서 도입 견적부터 운영까지 한국어로 함께합니다."
      />

      {/* §01 Why EX */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionHead index="01" label="Why EX" title="왜 EX를 통해 도입하나요" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyEx.map((c, i) => (
              <div key={c.t} className="card" style={{ padding: 24 }}>
                <span className="font-mono text-2xl font-bold text-faint tabular-nums">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold text-fg">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §02 Lineup */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead index="02" label="Lineup" title="제품 라인업" />
          <div className="card mt-12" style={{ overflow: "hidden", padding: 0 }}>
            {lineup.map((p, i) => (
              <Link
                key={p.title}
                href={p.href}
                className="group flex flex-col gap-3 p-6 transition-colors hover:bg-surface-2 md:flex-row md:items-center md:gap-8 md:px-8"
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-border)" }}
              >
                <span className="w-44 shrink-0">
                  <span className="rounded-full bg-primary-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-lav">
                    {p.badge}
                  </span>
                </span>
                <span className="flex-1">
                  <span className="block text-xl font-semibold text-fg">{p.title}</span>
                  <span className="mt-1 block text-sm text-muted">{p.copy}</span>
                </span>
                <span className="hidden shrink-0 font-mono text-xs uppercase tracking-wider text-faint lg:block">
                  {p.meta}
                </span>
                <span className="arrowlink shrink-0">
                  Discover{" "}
                  <span className="ar" aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* §03 Compare */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionHead index="03" label="Compare" title="한눈에 비교" />
          <div className="mt-12">
            <CompareTable columns={lineup.map((p) => p.title)} rows={compare} />
          </div>
        </div>
      </section>

      {/* §04 Authorisation */}
      <section className="section section--surface section--glow">
        <div className="container-ex">
          <SectionHead
            index="04"
            label="Authorisation"
            title="공식 리셀러·총판 인증"
            lead="공식 파트너십을 통해 국내 도입과 기술 지원을 책임집니다."
            leadMaxWidth="40rem"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {certs.map((c) => (
              <Link key={c.name} href={c.href} className="card group" style={{ overflow: "hidden", padding: 0 }}>
                <Image src={c.src} alt={c.name} width={957} height={700} className="h-auto w-full" />
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-sm leading-relaxed text-muted">
              구매 전, 하남 스튜디오에서 직접 작동해볼 수 있습니다. 화상 데모도 가능합니다.
            </p>
            <Link href="/contact" className="arrowlink arrowlink--accent mt-4 inline-flex">
              시연 문의{" "}
              <span className="ar" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
