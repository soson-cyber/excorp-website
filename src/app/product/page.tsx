import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata: Metadata = {
  title: "Product — Aximmetry · Moverse AI · RETracker",
  description:
    "EX가 한국에서 책임지는 글로벌 파트너 제품. Aximmetry(공식 리셀러), Moverse AI·RETracker(공식 총판).",
};

const whyEx = [
  { t: "도입 컨설팅", d: "현장 요구에 맞는 제품·구성 제안" },
  { t: "시스템 셋업", d: "설치·연동·캘리브레이션 전 과정" },
  { t: "교육", d: "운영 인력 대상 실무 교육" },
  { t: "기술 지원", d: "도입 이후 지속 기술 대응" },
];

const lineup = [
  {
    badge: "Authorised Reseller",
    title: "Aximmetry",
    copy: "방송·엔터테인먼트를 위한 실시간 3D 그래픽 & 버추얼 프로덕션 플랫폼",
    meta: "Real-time Compositing",
    href: "/product/aximmetry",
  },
  {
    badge: "Korea Distributor",
    title: "Moverse AI",
    copy: "센서 없이 동작하는 AI 기반 마커리스 모션 인식 솔루션",
    meta: "Markerless MoCap",
    href: "/product/moverse",
  },
  {
    badge: "Korea Distributor",
    title: "RETracker",
    copy: "실시간 6DoF 기반 고정밀 광학 트래킹 — Bliss / Fizz",
    meta: "6DoF Optical Tracker",
    href: "/product/retracker",
  },
];

const compare = [
  { label: "역할", values: ["실시간 합성·렌더", "마커리스 모션캡처", "6DoF 카메라 트래킹"] },
  { label: "핵심", values: ["Unreal 기반 노드", "AI 비전 · 150ms 미만", "평생 라이선스 · VPU"] },
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

      {/* §01 Why EX as partner */}
      <section className="container-ex py-section">
        <div className="text-center">
          <SectionLabel index="01">Why EX</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">왜 EX를 통해 도입하나요</h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-x-12 gap-y-8 sm:grid-cols-2">
          {whyEx.map((c, i) => (
            <div key={c.t} className="flex gap-5 border-t border-border pt-6">
              <span className="font-mono text-2xl font-bold text-faint">0{i + 1}</span>
              <div>
                <h3 className="text-lg font-semibold">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* §02 Lineup (directory rows) */}
      <section className="bg-surface/40">
        <div className="container-ex py-section">
          <SectionLabel index="02">Lineup</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">제품 라인업</h2>
          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-surface">
            {lineup.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group flex flex-col gap-3 border-b border-border p-6 transition-colors last:border-0 hover:bg-surface-2 md:flex-row md:items-center md:gap-8 md:px-8"
              >
                <span className="w-44 shrink-0">
                  <span className="rounded-full bg-primary-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-primary">
                    {p.badge}
                  </span>
                </span>
                <span className="flex-1">
                  <span className="block text-xl font-semibold">{p.title}</span>
                  <span className="mt-1 block text-sm text-muted">{p.copy}</span>
                </span>
                <span className="hidden shrink-0 font-mono text-xs uppercase tracking-wider text-faint lg:block">
                  {p.meta}
                </span>
                <span className="shrink-0 font-medium text-primary transition-transform group-hover:translate-x-1">
                  Discover →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* §03 Compare matrix */}
      <section className="container-ex py-section">
        <SectionLabel index="03">Compare</SectionLabel>
        <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">한눈에 비교</h2>
        <div className="mt-12 overflow-x-auto">
          <div className="grid min-w-[40rem] grid-cols-4 gap-px overflow-hidden rounded-2xl border border-border bg-border">
            <div className="bg-surface-2 p-4" />
            {lineup.map((p) => (
              <div key={p.title} className="bg-surface-2 p-4 text-center font-semibold">
                {p.title}
              </div>
            ))}
            {compare.map((row) => (
              <div key={row.label} className="contents">
                <div className="bg-surface p-4 font-mono text-xs uppercase tracking-wider text-faint">
                  {row.label}
                </div>
                {row.values.map((v, i) => (
                  <div key={i} className="bg-surface p-4 text-center text-sm text-muted">
                    {v}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §04 Certifications strip */}
      <section className="bg-surface/40">
        <div className="container-ex py-section">
          <div className="text-center">
            <SectionLabel index="04">Authorisation</SectionLabel>
            <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">공식 총판·리셀러 인증</h2>
            <p className="mt-4 text-muted">공식 파트너십을 통해 국내 도입과 기술 지원을 책임집니다.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {certs.map((c) => (
              <Link
                key={c.name}
                href={c.href}
                className="group overflow-hidden rounded-2xl border border-border transition-colors hover:border-primary/60"
              >
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
