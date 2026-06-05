import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { CompareTable } from "@/components/product/CompareTable";
import { MediaBlank } from "@/components/ui/MediaBlank";

export const metadata: Metadata = {
  title: "버추얼 프로덕션 제품 — Aximmetry · Moverse AI · RETracker",
  alternates: { canonical: "/product" },
  description:
    "버추얼 프로덕션 핵심 제품을 EX가 한국에서 공식 공급합니다. 실시간 합성 Aximmetry(공식 리셀러), AI 마커리스 모션캡처 Moverse·6-DOF 카메라 트래킹 RETracker(공식 총판). 도입 컨설팅·셋업·교육·기술 지원까지.",
};

const whyEx = [
  { t: "도입 컨설팅", d: "현장 요구에 맞는 제품·구성 제안" },
  { t: "시스템 셋업", d: "설치·연동·캘리브레이션 전 과정" },
  { t: "교육", d: "운영 인력 대상 실무 교육" },
  { t: "기술 지원", d: "도입 이후 지속 기술 대응" },
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
    badge: "Korea Distributor",
    title: "Moverse AI",
    copy: "전용 수트·마커 없이 동작하는 AI 마커리스 모션캡처 (100% On-Premise)",
    meta: "Markerless MoCap",
    href: "/product/moverse",
  },
  {
    badge: "Korea Distributor",
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
      <PageHero
        breadcrumb={[{ label: "Product", href: "/product" }]}
        tag="Product"
        title="검증된 글로벌 파트너 제품, EX가 한국에서 책임집니다."
        lead="도입 컨설팅부터 셋업·교육·기술 지원까지, EX가 공식 리셀러·총판으로서 전 과정을 지원합니다."
      />

      {/* §00 Hero media band — 제품군 비주얼 밴드 자리 */}
      <section className="section section--ink">
        <div className="container-ex">
          <MediaBlank
            ratio="16/9"
            kind="image"
            tag="VIRTUAL PRODUCTION LINEUP"
            label="버추얼 프로덕션 핵심 제품군"
            sublabel="Aximmetry · Moverse AI · RETracker · 자산 준비 중"
            className="w-full"
          />
        </div>
      </section>

      {/* §01 Why EX */}
      <section className="section section--ink section--glow">
        <div className="container-ex">
          <SectionLabel index="01">Why EX</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            왜 EX를 통해 도입하나요
          </h2>
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
          <SectionLabel index="02">Lineup</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            제품 라인업
          </h2>
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
          <SectionLabel index="03">Compare</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            한눈에 비교
          </h2>
          <div className="mt-12">
            <CompareTable columns={lineup.map((p) => p.title)} rows={compare} />
          </div>
        </div>
      </section>

      {/* §04 Authorisation */}
      <section className="section section--surface section--glow">
        <div className="container-ex">
          <SectionLabel index="04">Authorisation</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            공식 총판·리셀러 인증
          </h2>
          <p className="lead" style={{ maxWidth: "40rem" }}>
            공식 파트너십을 통해 국내 도입과 기술 지원을 책임집니다.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {certs.map((c) => (
              <Link key={c.name} href={c.href} className="card group" style={{ overflow: "hidden", padding: 0 }}>
                <Image src={c.src} alt={c.name} width={957} height={700} className="h-auto w-full" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
