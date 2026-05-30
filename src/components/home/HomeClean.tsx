import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { MediaBlank } from "@/components/ui/MediaBlank";
import { SectionLabel } from "@/components/home/SectionLabel";
import { CountUp } from "@/components/motion/CountUp";
import Hero3DStage from "@/components/three/Hero3DStage";

/*
  HomeClean — the redesigned WHITE, clean "creative-tech startup" Home.
  Light design language; the rest of the site stays dark. The global dark
  Footer renders after this page (do not add one here).
*/

/* ── small shared bits ──────────────────────────────────────────────── */

function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-[#0F1129] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#23264a]"
    >
      {children}
    </Link>
  );
}

function ArrowLink({
  href,
  children,
  accent = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
        accent ? "text-[#5E2EC0] hover:text-[#4a23a0]" : "text-[#0F1129] hover:text-[#5E2EC0]"
      } ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      >
        →
      </span>
    </Link>
  );
}

function CornerTicks() {
  const base = "pointer-events-none absolute h-3.5 w-3.5 border-[#5e2ec0]/40";
  return (
    <>
      <span className={`${base} left-3 top-3 border-l border-t`} />
      <span className={`${base} right-3 top-3 border-r border-t`} />
      <span className={`${base} bottom-3 left-3 border-b border-l`} />
      <span className={`${base} bottom-3 right-3 border-b border-r`} />
    </>
  );
}

/* ── HERO ────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-20 lg:grid-cols-[40fr_60fr] lg:gap-16 lg:px-20 lg:py-28">
        {/* left — copy */}
        <div className="flex flex-col">
          <SectionLabel>REAL-TIME XR CONTENT · EX</SectionLabel>
          <h1 className="mt-7 text-6xl font-bold leading-none tracking-tight text-[#0F1129] sm:text-7xl lg:text-8xl">
            경험을
            <br />
            <span className="text-[#5E2EC0]">확장</span>하다
          </h1>
          <p className="mt-7 max-w-md text-xl leading-relaxed text-[#51545E]">
            실시간 XR · 버추얼 프로덕션 스튜디오와 솔루션.
            <br className="hidden sm:block" />
            콘텐츠 제작의 처음과 끝을 하나로 연결합니다.
          </p>
          <div className="mt-9">
            <PrimaryButton href="/contact">프로젝트 시작 →</PrimaryButton>
          </div>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-wider text-[#6b7280]">
            EXLINK · 파트너 제품 유통 · 하남 XR 스튜디오
          </p>
        </div>

        {/* right — 3D stage */}
        <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-[#E5E7EB] bg-[#F7F8FA] lg:min-h-[520px]">
          <div className="absolute inset-0">
            <Hero3DStage />
          </div>

          {/* HUD framing */}
          <span className="absolute left-5 top-4 z-10 font-mono text-[10px] uppercase tracking-wider text-[#6b7280]">
            MEDIA · 3D / WebGL
          </span>
          <CornerTicks />
          <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-0.5">
            <span className="font-mono text-xs tracking-wide text-[#0F1129]">
              3D ANIMATION
            </span>
            <span className="font-mono text-[10px] tracking-wide text-[#6b7280]">
              WebGL · Realtime XR
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── §01 WHAT WE DO ──────────────────────────────────────────────────── */

const whatWeDo = [
  {
    index: "01",
    tag: "EXLINK",
    title: "통합 XR 솔루션",
    desc: "자체 개발한 올인원 실시간 XR 제작·운영 솔루션",
    href: "/solution/xr-solution",
  },
  {
    index: "02",
    tag: "PARTNER",
    title: "파트너 제품 유통",
    desc: "Aximmetry · Moverse · RETracker — 검증된 글로벌 XR 장비·SW 공급",
    href: "/product",
  },
  {
    index: "03",
    tag: "STUDIO",
    title: "XR 콘텐츠 스튜디오",
    desc: "IR · 웨비나 · 대담을 실시간 XR로 제작하는 하남 스튜디오",
    href: "/xr-studio",
  },
];

function WhatWeDo() {
  return (
    <section className="bg-[#F7F8FA]">
      <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-20 lg:py-28">
        <Reveal>
          <SectionLabel>— [ 01 ] WHAT WE DO</SectionLabel>
          <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-[#0F1129] lg:text-4xl">
            솔루션부터 스튜디오까지, 하나의 흐름으로
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#51545E] lg:text-lg">
            EX는 실시간 XR 콘텐츠 제작의 전 과정을 솔루션 · 장비 · 스튜디오로
            연결합니다.
          </p>
        </Reveal>

        <Reveal className="mt-12 flex flex-col gap-6 lg:flex-row">
          {whatWeDo.map((card) => (
            <div
              key={card.index}
              className="flex flex-1 flex-col rounded-2xl border border-[#E5E7EB] bg-white p-7"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#5E2EC0]">
                  {card.index}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#6b7280]">
                  {card.tag}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-[#0F1129]">
                {card.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#51545E]">
                {card.desc}
              </p>
              <ArrowLink href={card.href} className="mt-6">
                자세히
              </ArrowLink>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── §02 EXLINK — architecture hub diagram ───────────────────────────── */

const exlinkBullets = [
  "멀티캠 · 트래킹 자동 동기화",
  "가상 배경 · 그래픽 실시간 합성",
  "라이브 송출 · 동시 녹화",
  "운영자 1인 중심 워크플로우",
];

function DiagramNode({
  title,
  sub,
  className = "",
}: {
  title: string;
  sub: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-center shadow-sm ${className}`}
    >
      <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#0F1129]">
        {title}
      </div>
      <div className="mt-0.5 text-[11px] text-[#6b7280]">{sub}</div>
    </div>
  );
}

function ExlinkDiagram() {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 lg:p-7">
      <div className="mb-4 flex items-center justify-between border-b border-[#E5E7EB] pb-3">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#6b7280]">
          EXLINK ARCHITECTURE
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#16A34A]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
          LIVE
        </span>
      </div>

      <div className="relative grid grid-cols-3 grid-rows-3 gap-3">
        {/* connector lines behind the nodes */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <g stroke="#5E2EC0" strokeOpacity="0.3" strokeWidth="0.6">
            <line x1="50" y1="50" x2="50" y2="16" />
            <line x1="50" y1="50" x2="16" y2="50" />
            <line x1="50" y1="50" x2="84" y2="50" />
            <line x1="50" y1="50" x2="50" y2="84" />
          </g>
        </svg>

        {/* top */}
        <div className="col-start-2 row-start-1 flex items-center justify-center">
          <DiagramNode title="CAPTURE" sub="멀티캠 입력" className="w-full" />
        </div>
        {/* left */}
        <div className="col-start-1 row-start-2 flex items-center justify-center">
          <DiagramNode title="TRACKING" sub="좌표 동기화" className="w-full" />
        </div>
        {/* center */}
        <div className="col-start-2 row-start-2 flex items-center justify-center">
          <div className="w-full rounded-xl border border-[#5E2EC0] bg-[#5E2EC0]/[0.08] px-4 py-4 text-center">
            <div className="font-mono text-sm font-bold uppercase tracking-wider text-[#5E2EC0]">
              EXLINK
            </div>
            <div className="mt-0.5 text-[11px] text-[#5E2EC0]/80">통합 코어</div>
          </div>
        </div>
        {/* right */}
        <div className="col-start-3 row-start-2 flex items-center justify-center">
          <DiagramNode title="RENDER" sub="실시간 합성" className="w-full" />
        </div>
        {/* bottom */}
        <div className="col-start-2 row-start-3 flex items-center justify-center">
          <DiagramNode title="BROADCAST" sub="송출 · 녹화" className="w-full" />
        </div>
      </div>
    </div>
  );
}

function Exlink() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-16 lg:px-20 lg:py-28">
        <Reveal>
          <SectionLabel>— [ 02 ] CORE SOLUTION</SectionLabel>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#0F1129] lg:text-4xl">
            EXLINK — 흩어진 XR을 하나로 묶다
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#51545E] lg:text-lg">
            촬영 · 트래킹 · 렌더 · 송출을 단일 파이프라인으로 통합한 EX의 자체
            개발 솔루션. 분산된 장비와 워크플로우를 하나로 연결합니다.
          </p>
          <ul className="mt-7 flex flex-col gap-3.5">
            {exlinkBullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-[#0F1129]">
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#5E2EC0]" />
                <span className="text-sm lg:text-base">{b}</span>
              </li>
            ))}
          </ul>
          <ArrowLink href="/solution/xr-solution" accent className="mt-8">
            EXLINK 자세히
          </ArrowLink>
        </Reveal>

        <Reveal>
          <ExlinkDiagram />
        </Reveal>
      </div>
    </section>
  );
}

/* ── FEATURED CASE — EXLINK 구축사례 ─────────────────────────────────── */

function FeaturedCase() {
  return (
    <section className="bg-[#F7F8FA]">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-24 lg:grid-cols-[55fr_45fr] lg:gap-16 lg:px-20 lg:py-28">
        {/* image (first on mobile) */}
        <Reveal>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#E5E7EB]">
            <Image
              src="/uc-broadcast.png"
              alt="EXLINK 구축사례 — 실시간 XR 방송 시스템"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            <span className="absolute left-3 top-3 z-10 rounded bg-black/40 px-2 py-1 font-mono text-[10px] text-white backdrop-blur-sm">
              EXLINK
            </span>
          </div>
        </Reveal>

        {/* copy */}
        <Reveal>
          <SectionLabel>— [ CASE ] EXLINK 구축사례</SectionLabel>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#0F1129] lg:text-4xl">
            실시간 XR 방송 시스템을 하나로 통합
          </h2>
          <div className="mt-7 flex flex-wrap gap-3">
            <div className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3">
              <div className="text-xl font-bold tracking-tight text-[#0F1129]">
                운영 인력 4 → 1
              </div>
            </div>
            <div className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3">
              <div className="text-xl font-bold tracking-tight text-[#0F1129]">
                셋업 시간 −70%
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#51545E] lg:text-lg">
            분산된 촬영·트래킹·렌더·송출 장비를 EXLINK 하나로 묶어, 운영 부담은
            줄이고 실시간 합성 품질은 끌어올리는 대표 활용 시나리오입니다.
          </p>
          <ArrowLink href="/work/exlink-broadcast" accent className="mt-8">
            사례 자세히
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}

/* ── §03 PARTNER PRODUCTS ────────────────────────────────────────────── */

const partnerProducts = [
  {
    name: "Aximmetry",
    role: "RESELLER",
    desc: "리얼타임 버추얼 프로덕션 소프트웨어",
    href: "/product/aximmetry",
    initial: "A",
  },
  {
    name: "Moverse AI",
    role: "DISTRIBUTOR",
    desc: "마커리스 AI 모션캡처 시스템",
    href: "/product/moverse",
    initial: "M",
  },
  {
    name: "RETracker",
    role: "DISTRIBUTOR",
    desc: "정밀 카메라 트래킹 솔루션",
    href: "/product/retracker",
    initial: "R",
  },
];

/* Partner credential chip — name + role; structured so a logo <Image> can be
   added later (e.g. an optional <Image> before the name). */
function CredentialChip({ name, role }: { name: string; role?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm">
      <span className="font-medium text-[#0F1129]">{name}</span>
      {role ? (
        <>
          <span aria-hidden="true" className="text-[#6b7280]">
            ·
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#6b7280]">
            {role}
          </span>
        </>
      ) : null}
    </span>
  );
}

function PartnerProducts() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-20 lg:py-28">
        <Reveal>
          <SectionLabel>— [ 03 ] PARTNER PRODUCTS</SectionLabel>
          <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-[#0F1129] lg:text-4xl">
            검증된 글로벌 XR 기술, 국내에 연결합니다
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#51545E] lg:text-lg">
            EX는 세계적인 XR 솔루션의 공식 리셀러·총판으로 도입부터 기술지원까지
            책임집니다.
          </p>
        </Reveal>

        {/* credential strip */}
        <Reveal className="mt-10">
          <p className="text-[11px] uppercase tracking-wider text-[#6b7280]">
            공식 파트너 · OFFICIAL PARTNERS
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <CredentialChip name="Aximmetry" role="RESELLER" />
            <CredentialChip name="Moverse AI" role="DISTRIBUTOR" />
            <CredentialChip name="RETracker" role="DISTRIBUTOR" />
            <span
              aria-hidden="true"
              className="mx-1 h-6 w-px flex-none bg-[#E5E7EB]"
            />
            <CredentialChip name="NVIDIA Inception" />
            <CredentialChip name="Epic Games · Unreal" />
          </div>
        </Reveal>

        <Reveal className="mt-12 flex flex-col gap-6 lg:flex-row">
          {partnerProducts.map((p) => (
            <div
              key={p.name}
              className="flex flex-1 flex-col rounded-2xl border border-[#E5E7EB] bg-white p-7"
            >
              <div className="flex items-center justify-between gap-4">
                <MediaBlank
                  tag={null}
                  label={p.initial}
                  compact
                  className="h-14 w-14 flex-none"
                />
                <span className="rounded-full bg-[#F2F4F7] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#6b7280]">
                  {p.role}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-[#0F1129]">{p.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#51545E]">
                {p.desc}
              </p>
              <ArrowLink href={p.href} className="mt-6">
                자세히
              </ArrowLink>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── §04 XR STUDIO ───────────────────────────────────────────────────── */

const studioBullets = [
  "메뉴형 콘텐츠 제작 — IR · 웨비나 · 대담",
  "후반 작업 없이 촬영과 동시에 완성",
  "대형 크로마 · 멀티캠 · XR 트래킹",
];

function StudioStage() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#0F1129]">
      <Image
        src="/studio.png"
        alt="EX XR Studio — 하남 그린 크로마 스튜디오"
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
      {/* camera-monitor HUD (dark pills for readability over the photo) */}
      <span className="absolute left-4 top-3.5 z-10 flex items-center gap-1.5 rounded bg-black/40 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a5f]" />
        REC 00:14:22:08
      </span>
      <span className="absolute right-4 top-3.5 z-10 rounded bg-black/40 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-sm">
        CAM 01
      </span>
      {/* corner reticle ticks */}
      <span className="pointer-events-none absolute bottom-3 left-3 h-3.5 w-3.5 border-b border-l border-white/50" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-3.5 w-3.5 border-b border-r border-white/50" />
    </div>
  );
}

function XrStudio() {
  return (
    <section className="bg-[#F7F8FA]">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-16 lg:px-20 lg:py-28">
        <Reveal>
          <StudioStage />
        </Reveal>

        <Reveal>
          <SectionLabel>— [ 04 ] XR STUDIO</SectionLabel>
          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#0F1129] lg:text-4xl">
            촬영이 곧 완성이 되는
            <br />
            실시간 XR 스튜디오
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#51545E] lg:text-lg">
            하남 70㎡ 그린 크로마에서 IR · 웨비나 · 대담을 실시간 XR로
            제작합니다.
          </p>
          <ul className="mt-7 flex flex-col gap-3.5">
            {studioBullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-[#0F1129]">
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#5E2EC0]" />
                <span className="text-sm lg:text-base">{b}</span>
              </li>
            ))}
          </ul>
          <ArrowLink href="/xr-studio" accent className="mt-8">
            스튜디오 둘러보기
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}

/* ── §05 BY THE NUMBERS ──────────────────────────────────────────────── */

const stats = [
  { value: 6, suffix: "+", label: "기술 특허" },
  { value: 3, suffix: "", label: "글로벌 파트너" },
  { value: 3, suffix: "", label: "대학 MOU" },
  { value: 4, suffix: "", label: "제품 인증" },
];

function Numbers() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-20 lg:py-28">
        <Reveal>
          <SectionLabel>— [ 05 ] BY THE NUMBERS</SectionLabel>
        </Reveal>
        <Reveal className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-[#E5E7EB]">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col lg:items-center lg:px-4">
              <CountUp
                value={s.value}
                suffix={s.suffix}
                className="text-5xl font-bold tracking-tight text-[#0F1129] lg:text-6xl"
              />
              <span className="mt-2 text-sm text-[#6b7280]">{s.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── QUOTE BAND — customer voice ─────────────────────────────────────── */

function QuoteBand() {
  return (
    <section className="bg-[#F7F8FA]">
      <div className="mx-auto max-w-[860px] px-6 py-24 text-center lg:px-20 lg:py-28">
        <Reveal>
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-[#5E2EC0]">
            <span className="h-0.5 w-7 bg-[#5E2EC0]" aria-hidden="true" />
            WHAT YOU GET
          </span>
          <p className="mt-6 text-2xl font-semibold leading-relaxed text-[#0F1129] lg:text-3xl">
            촬영과 동시에 결과물이 완성됩니다. 후반 일정에 쫓기지 않고,
            현장에서 바로 확인하고 끝낼 수 있습니다.
          </p>
          <p className="mt-6 text-sm text-[#6b7280]">실시간 XR 제작이 만드는 차이</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── §06 CTA — dark card bridging into the dark footer ──────────────────── */

function Cta() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-20 lg:py-28">
        <Reveal>
          <div className="rounded-3xl border border-[#0F1129] bg-[#0F1129] px-8 py-14 text-center">
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-[#A78BF0]">
              <span className="h-0.5 w-7 bg-[#A78BF0]" aria-hidden="true" />
              START A PROJECT
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white lg:text-4xl">
              당신의 다음 콘텐츠를
              <br />
              실시간 XR로 시작하세요
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[#9BA0B8] lg:text-lg">
              솔루션 도입 · 제품 문의 · 스튜디오 제작 — 무엇이든 상담하세요.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#5E2EC0] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#4a23a0]"
              >
                프로젝트 상담 →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                회사 소개서 받기
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── page ────────────────────────────────────────────────────────────── */

export function HomeClean() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <Exlink />
      <FeaturedCase />
      <PartnerProducts />
      <XrStudio />
      <Numbers />
      <QuoteBand />
      <Cta />
    </>
  );
}

export default HomeClean;
