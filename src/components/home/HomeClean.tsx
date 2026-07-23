import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "./Hero";
import { FeatureCard } from "./FeatureCard";
import { PatentSlider } from "./PatentSlider";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { withLocale, type Locale } from "@/lib/i18n";

/* ── data (locale-keyed dicts) ───────────────────────────────────────────── */
type Loc<T> = Record<Locale, T>;

const WHAT: Loc<{ i: string; tag: string; title: string; desc: string; href: string }[]> = {
  ko: [
    { i: "01", tag: "EXLINK", title: "통합 XR 솔루션", desc: "자체 개발한 통합 실시간 XR 제작·운영 솔루션", href: "/solution/xr-solution" },
    { i: "02", tag: "PARTNER", title: "파트너 제품 유통", desc: "Aximmetry · Moverse · RETracker 등 검증된 글로벌 XR 장비·SW 공급", href: "/product" },
    { i: "03", tag: "STUDIO", title: "XR 콘텐츠 스튜디오", desc: "IR · 웨비나 · 대담을 실시간 XR로 제작하는 하남 스튜디오", href: "/xr-studio" },
  ],
  en: [
    { i: "01", tag: "EXLINK", title: "Integrated XR solution", desc: "Our own integrated real-time XR production and operations solution", href: "/solution/xr-solution" },
    { i: "02", tag: "PARTNER", title: "Partner product distribution", desc: "Aximmetry · Moverse · RETracker: proven global XR hardware and software", href: "/product" },
    { i: "03", tag: "STUDIO", title: "XR content studio", desc: "Our Hanam studio produces IR sessions, webinars, and talks in real-time XR", href: "/xr-studio" },
  ],
};

const PARTNERS: Loc<{ name: string; role: string; desc: string; initial: string; href: string; img?: string; objPos?: string }[]> = {
  ko: [
    { name: "Aximmetry", role: "Certified Reseller", desc: "리얼타임 버추얼 프로덕션 소프트웨어", initial: "A", href: "/product/aximmetry", img: "/aximmetry-vp.jpg" },
    { name: "Moverse AI", role: "DISTRIBUTOR", desc: "마커리스 AI 모션캡처 시스템", initial: "M", href: "/product/moverse", img: "/moverse-mocap.jpg" },
    { name: "RETracker", role: "DISTRIBUTOR", desc: "정밀 카메라 트래킹 솔루션", initial: "R", href: "/product/retracker", img: "/retracker-tracking.jpg" },
  ],
  en: [
    { name: "Aximmetry", role: "Certified Reseller", desc: "Real-time virtual production software", initial: "A", href: "/product/aximmetry", img: "/aximmetry-vp.jpg" },
    { name: "Moverse AI", role: "DISTRIBUTOR", desc: "Markerless AI motion capture system", initial: "M", href: "/product/moverse", img: "/moverse-mocap.jpg" },
    { name: "RETracker", role: "DISTRIBUTOR", desc: "Precision camera tracking solution", initial: "R", href: "/product/retracker", img: "/retracker-tracking.jpg" },
  ],
};

const STUDIO_BULLETS: Loc<string[]> = {
  ko: ["후반 작업 없이 촬영과 동시에 완성", "대형 크로마 · 멀티캠 · XR 트래킹"],
  en: ["Finished as you shoot, no post-production wait", "Large chroma stage · multicam · XR tracking"],
};

/** 홈 뉴스룸 스트립용 최소 데이터 — 서버(page.tsx)에서 Notion/fallback을 매핑해 주입한다. */
export type NewsBrief = { date: string; outlet?: string; title: string; href?: string };

/* 등록특허 6건 — 번호·명칭은 About(특허청 공보)과 동일, 설명은 명칭의 쉬운 풀이(성능 주장 없음). */
const PATENTS: Loc<{ no: string; title: string; desc: string }[]> = {
  ko: [
    { no: "KR 10-2762537", title: "다중 뷰포인트 생성 장치·방법", desc: "하나의 촬영에서 여러 시점의 화면을 만들어내는 기술." },
    { no: "KR 10-2666600", title: "6DoF SLAM 기반 복수 스테레오 카메라 포지셔닝 추정", desc: "여러 대의 스테레오 카메라 위치·방향을 실시간으로 추정하는 기술." },
    { no: "KR 10-2549811", title: "복수 스테레오 카메라 포지셔닝 정보 보정", desc: "다중 카메라의 위치 정보를 보정해 정합 정확도를 높이는 기술." },
    { no: "KR 10-2453561", title: "가상 스튜디오 복합 센서 다중 추적 카메라 시스템", desc: "가상 스튜디오에서 여러 카메라를 복합 센서로 동시에 추적하는 기술." },
    { no: "KR 10-2078198", title: "3차원 모델링을 위한 촬영 방법", desc: "3D 모델링에 필요한 촬영을 돕는 전자 장치 기술." },
    { no: "KR 10-2029680", title: "합성 영상의 왜곡 결정 영상 처리", desc: "합성 화면의 왜곡을 감지·판정하는 영상 처리 기술." },
  ],
  en: [
    { no: "KR 10-2762537", title: "Apparatus and method for generating multiple viewpoints", desc: "Creates views from multiple perspectives out of a single shoot." },
    { no: "KR 10-2666600", title: "6DoF SLAM-based multi-stereo-camera positioning estimation", desc: "Estimates the position and orientation of multiple stereo cameras in real time." },
    { no: "KR 10-2549811", title: "Positioning-information correction using multiple stereo cameras", desc: "Corrects multi-camera positioning data to improve alignment accuracy." },
    { no: "KR 10-2453561", title: "Multi-sensor multi-tracking camera system for virtual studios", desc: "Tracks multiple cameras simultaneously with fused sensors in a virtual studio." },
    { no: "KR 10-2078198", title: "Capture method for 3D modeling", desc: "Electronic-device technology that assists capture for 3D modeling." },
    { no: "KR 10-2029680", title: "Image processing for detecting distortion in composited video", desc: "Detects and evaluates distortion in composited footage." },
  ],
};

const STATS: Loc<{ v: number; s: string; l: string }[]> = {
  ko: [
    { v: 6, s: "+", l: "기술 특허" },
    { v: 3, s: "", l: "글로벌 파트너" },
    { v: 3, s: "", l: "대학 MOU" },
    { v: 4, s: "", l: "제품 인증" },
  ],
  en: [
    { v: 6, s: "+", l: "Technology patents" },
    { v: 3, s: "", l: "Global partners" },
    { v: 3, s: "", l: "University MOUs" },
    { v: 4, s: "", l: "Product certifications" },
  ],
};

/* Static section copy keyed by locale. */
const COPY = {
  ko: {
    s01Label: "WHAT WE DO",
    s01Title: (
      <>
        솔루션부터 스튜디오까지,{" "}
        <br className="hidden sm:block" />
        하나의 흐름으로
      </>
    ),
    s01Lead: "EX는 실시간 XR 콘텐츠 제작의 전 과정을 솔루션 · 장비 · 스튜디오로 연결합니다.",
    caseLabel: "EXLINK 활용 시나리오",
    caseTitle: (
      <>
        실시간{" "}
        <br className="hidden lg:block" />
        XR 방송 시스템을{" "}
        <br className="hidden lg:block" />
        하나로 통합
      </>
    ),
    caseChip1: "촬영·트래킹·렌더·송출 통합",
    caseChip2: "통합 제어 워크플로우",
    caseLead:
      "분산된 촬영·트래킹·렌더·송출 장비를 EXLINK로 통합하여, 운영 부담은 줄이고 실시간 합성 품질은 끌어올리는 대표 활용 시나리오입니다.",
    caseNote: "※ 실제 구성·효과는 현장 환경에 따라 달라지며, 자세한 내용은 상담 시 안내드립니다.",
    caseLink: "EXLINK 자세히 보기",
    partnersLabel: "PARTNER PRODUCTS",
    partnersTitle: (
      <>
        검증된 글로벌 XR 기술을,{" "}
        <br className="hidden sm:block" />
        국내에 공급합니다
      </>
    ),
    partnersLead:
      "EX는 세계적인 XR 솔루션의 공식 리셀러·총판으로 도입부터 기술지원과 운영교육까지 전 주기를 책임집니다.",
    learnMore: "자세히",
    studioTitle: (
      <>
        촬영이 곧 완성이 되는{" "}
        <br className="hidden sm:block" />
        실시간 XR 스튜디오
      </>
    ),
    studioLead: "하남 70㎡ 그린 크로마에서 실시간 XR 콘텐츠를 제작합니다.",
    studioLink: "스튜디오 둘러보기",
    patentsTitle: (
      <>
        현장에서 검증해 온 기술을,{" "}
        <br className="hidden sm:block" />
        특허로 증명합니다
      </>
    ),
    patentsLink: "특허·인증 전체 보기",
    newsTitle: (
      <>
        미디어가 기록한{" "}
        <br className="hidden sm:block" />
        EX의 오늘
      </>
    ),
    newsLink: "뉴스 전체 보기",
    invTitle: (
      <>
        EX의 다음 단계에,{" "}
        <br className="hidden sm:block" />
        함께할 파트너를 찾습니다
      </>
    ),
    invLead:
      "2026년 중소벤처기업부 TIPS에 선정되어 AI 기반 XR 제작 솔루션 R&D를 진행하고 있습니다. IR 관련 문의를 환영합니다.",
    invLink: "IR 문의하기",
    ctaLabel: "START A PROJECT",
    ctaTitle: (
      <>
        당신의 다음 콘텐츠를{" "}
        <br className="hidden sm:block" />
        실시간 XR로 시작하세요
      </>
    ),
    ctaLead: "솔루션 도입 · 제품 문의 · 스튜디오 제작, 무엇이든 상담하세요.",
    ctaPrimary: "도입 상담 →",
    ctaSecondary: "회사 소개서 요청",
  },
  en: {
    s01Label: "WHAT WE DO",
    s01Title: (
      <>
        From solution to studio,{" "}
        <br className="hidden sm:block" />
        in one workflow
      </>
    ),
    s01Lead: "EX connects every stage of real-time XR content production: solution, hardware, and studio.",
    caseLabel: "EXLINK USE CASE",
    caseTitle: (
      <>
        A real-time{" "}
        <br className="hidden lg:block" />
        XR broadcast system,{" "}
        <br className="hidden lg:block" />
        unified into one
      </>
    ),
    caseChip1: "Capture · tracking · render · streaming unified",
    caseChip2: "Unified control workflow",
    caseLead:
      "A representative scenario where EXLINK unifies scattered capture, tracking, rendering, and streaming hardware, lowering operational load while raising real-time compositing quality.",
    caseNote: "* Actual setup and results vary by on-site conditions; we'll walk you through the details during consultation.",
    caseLink: "Explore EXLINK",
    partnersLabel: "PARTNER PRODUCTS",
    partnersTitle: (
      <>
        Proven global XR technology,{" "}
        <br className="hidden sm:block" />
        brought to your market
      </>
    ),
    partnersLead:
      "As an official reseller and distributor for world-class XR solutions, EX takes responsibility for the full cycle, from rollout to technical support and operator training.",
    learnMore: "Learn more",
    studioTitle: (
      <>
        A real-time XR studio{" "}
        <br className="hidden sm:block" />
        where the shoot is the finish
      </>
    ),
    studioLead: "We produce real-time XR content in our 70㎡ green-chroma stage in Hanam.",
    studioLink: "Tour the studio",
    patentsTitle: (
      <>
        Technology proven on set,{" "}
        <br className="hidden sm:block" />
        backed by registered patents
      </>
    ),
    patentsLink: "View all patents & certifications",
    newsTitle: (
      <>
        EX in the media,{" "}
        <br className="hidden sm:block" />
        the latest coverage
      </>
    ),
    newsLink: "See all news",
    invTitle: (
      <>
        For EX&apos;s next chapter,{" "}
        <br className="hidden sm:block" />
        we&apos;re looking for partners
      </>
    ),
    invLead:
      "Selected for the Korean Ministry of SMEs and Startups TIPS program in 2026, EX is advancing R&D on an AI-based XR production solution. Investor relations inquiries are welcome.",
    invLink: "Contact IR",
    ctaLabel: "START A PROJECT",
    ctaTitle: (
      <>
        Start your next content{" "}
        <br className="hidden sm:block" />
        in real-time XR
      </>
    ),
    ctaLead: "Solution rollout · product inquiries · studio production, talk to us about anything.",
    ctaPrimary: "Talk to us →",
    ctaSecondary: "Request company profile",
  },
} satisfies Record<Locale, Record<string, ReactNode>>;

function SectionHead({
  index,
  label,
  title,
  lead,
  narrow,
  center,
}: {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  narrow?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      <SectionLabel index={index}>{label}</SectionLabel>
      <h2
        className="h2"
        style={{ marginTop: 22, maxWidth: narrow ? "48rem" : "none", marginInline: center ? "auto" : undefined }}
      >
        {title}
      </h2>
      {lead && (
        <p className="lead" style={{ maxWidth: center ? "none" : "40rem", marginInline: center ? "auto" : undefined }}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}

export function HomeClean({ locale = "ko", news }: { locale?: Locale; news?: NewsBrief[] }) {
  const c = COPY[locale];
  const what = WHAT[locale];
  const partners = PARTNERS[locale];
  const studioBullets = STUDIO_BULLETS[locale];
  const stats = STATS[locale];
  const patents = PATENTS[locale];

  return (
    <>
      <Hero locale={locale} />

      {/* §01 — What we do (centered header + symmetric 3-card grid) */}
      <section className="section section--ink section--glow">
        <div className="container-ex">
          <SectionHead index="01" label={c.s01Label as string} title={c.s01Title} lead={c.s01Lead} center />
          <div className="featgrid">
            {what.map((card, i) => (
              <FeatureCard
                key={card.i}
                idx={card.i}
                tag={card.tag}
                title={card.title}
                desc={card.desc}
                href={withLocale(card.href, locale)}
                delay={i * 90}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured case */}
      <section className="section section--surface">
        <div className="container-ex twocol twocol--media">
          <Reveal>
            <div className="photo" style={{ aspectRatio: "16 / 9" }}>
              <Image src="/exlink-control-room.jpg" alt="EXLINK 구축사례 — 실시간 XR 통합 제어실(멀티뷰·프로그램·트래킹)" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
              <span className="hud" style={{ left: 12, top: 12 }}>
                EXLINK
              </span>
            </div>
          </Reveal>
          <Reveal>
            <SectionLabel index="CASE">{c.caseLabel}</SectionLabel>
            <h2 className="h2" style={{ marginTop: 22 }}>
              {c.caseTitle}
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
              <div className="statchip">
                <div className="statchip-v">{c.caseChip1}</div>
              </div>
              <div className="statchip">
                <div className="statchip-v">{c.caseChip2}</div>
              </div>
            </div>
            <p className="lead" style={{ maxWidth: "36rem" }}>
              {c.caseLead}
            </p>
            <p style={{ marginTop: 12, fontSize: 13, color: "var(--color-faint)", maxWidth: "36rem" }}>
              {c.caseNote}
            </p>
            <Link href={withLocale("/solution/xr-solution", locale)} className="arrowlink arrowlink--accent" style={{ marginTop: 30 }}>
              {c.caseLink}{" "}
              <span className="ar" aria-hidden="true">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* §03 — Partner products */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionHead index="03" label={c.partnersLabel as string} title={c.partnersTitle} lead={c.partnersLead} narrow />
          <div className="partner-bento">
            {partners.map((p, i) => (
              <Reveal key={p.name} delay={i * 90} className={`card cardpad${p.img ? " card--media" : ""}`}>
                {p.img && (
                  <>
                    <Image src={p.img} alt={`${p.name} 버추얼 프로덕션 합성 예시`} fill sizes="(min-width:768px) 60vw, 100vw" className="pcard-bg" style={p.objPos ? { objectPosition: p.objPos } : undefined} />
                    <span className="pcard-scrim" aria-hidden="true" />
                  </>
                )}
                <div className="cardpad-head">
                  <span className="initial">{p.initial}</span>
                  <span className="rolepill">{p.role}</span>
                </div>
                <h3 className="cardtitle">{p.name}</h3>
                <p className="carddesc">{p.desc}</p>
                <Link href={withLocale(p.href, locale)} className="arrowlink" style={{ marginTop: 24 }}>
                  {c.learnMore}{" "}
                  <span className="ar" aria-hidden="true">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          {/* 공식 파트너 로고 스트립 — §03 하단.
              기반 기준(실측 정규화): 주 워드마크 캡하이트 14px 앵커 · 의미 보조행 ≥9px · 폭 ≤220px.
              원본은 투명 여백이 18~52%로 제각각이라 *-trim.png(알파 bbox 크롭) 사본 사용 → height=콘텐츠 높이.
              대표 조정(2026-07-24): 기준 계산값에서 Aximmetry ×1.3(25→33)·Moverse ×1.2(47→56)·
              RETracker는 변경 전 시각 크기 복구(원본 h-8=캔버스 32px ≒ 콘텐츠 26px). NVIDIA 43 유지. */}
          {/* -mb-12: 섹션 하단 패딩 96px로 로고 아래 여백(96)이 위(49)보다 커지는 것을 48px로 보정(상하 대칭).
              높이는 --h(실측 기준값) × --logo-scale(뷰포트별 1 / 1.15 / 1.35 — .plogos, globals.css)로 반응형 확대. */}
          <div className="plogos -mb-12 mt-14 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 border-t border-border pt-12">
            {[
              { src: "/partner-aximmetry-trim.png", alt: "Aximmetry", w: 3724, h: 1036, px: 33 },
              { src: "/partner-moverse-trim.png", alt: "Moverse AI", w: 947, h: 702, px: 56 },
              { src: "/partner-retracker-trim.png", alt: "RETracker Bliss", w: 7134, h: 1328, px: 26 },
              { src: "/partner-nvidia-trim.png", alt: "NVIDIA Inception Program", w: 926, h: 322, px: 43 },
            ].map((p) => (
              <Image
                key={p.src}
                src={p.src}
                alt={p.alt}
                width={p.w}
                height={p.h}
                className="w-auto object-contain opacity-90"
                style={{ "--h": `${p.px}px` } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      </section>

      {/* §04 — XR Studio */}
      <section className="section section--surface">
        <div className="container-ex twocol twocol--media">
          <Reveal>
            <div className="photo" style={{ aspectRatio: "16 / 9" }}>
              <Image src="/xr-studio.jpg" alt="EX XR Studio — 가상 세트 기반 콘텐츠 촬영" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
              <span className="hud" style={{ left: 14, top: 12 }}>
                <span className="recdot" />
                REC 00:14:22:08
              </span>
              <span className="hud" style={{ right: 14, top: 12 }}>
                CAM 01
              </span>
              <span style={{ position: "absolute", bottom: 12, left: 12, width: 14, height: 14, borderBottom: "1px solid rgba(255,255,255,.5)", borderLeft: "1px solid rgba(255,255,255,.5)" }} />
              <span style={{ position: "absolute", bottom: 12, right: 12, width: 14, height: 14, borderBottom: "1px solid rgba(255,255,255,.5)", borderRight: "1px solid rgba(255,255,255,.5)" }} />
            </div>
          </Reveal>
          <Reveal>
            <SectionLabel index="04">XR STUDIO</SectionLabel>
            <h2 className="h2" style={{ marginTop: 22 }}>
              {c.studioTitle}
            </h2>
            <p className="lead" style={{ maxWidth: "36rem" }}>
              {c.studioLead}
            </p>
            <ul className="bullets">
              {studioBullets.map((b) => (
                <li key={b}>
                  <span className="bdot" />
                  {b}
                </li>
              ))}
            </ul>
            <Link href={withLocale("/xr-studio", locale)} className="arrowlink arrowlink--accent" style={{ marginTop: 30 }}>
              {c.studioLink}{" "}
              <span className="ar" aria-hidden="true">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* §05 — Proven technology (숫자 + 등록특허 카드: 검증된 신뢰 신호의 전면 배치) */}
      <section className="section section--white section--glow">
        <div className="container-ex">
          <SectionHead index="05" label="PROVEN TECHNOLOGY" title={c.patentsTitle} narrow />
          <Reveal className="statgrid">
            {stats.map((s) => (
              <div key={s.l} className="statcell">
                <CountUp value={s.v} suffix={s.s} className="statnum" />
                <span className="statlabel">{s.l}</span>
              </div>
            ))}
          </Reveal>
          <Reveal>
            <PatentSlider
              items={patents.map((p) => ({ ...p, img: `/patent-${p.no.replace("KR 10-", "")}.jpg` }))}
              prevLabel={locale === "en" ? "Previous patent" : "이전 특허 보기"}
              nextLabel={locale === "en" ? "Next patent" : "다음 특허 보기"}
              certLabel={locale === "en" ? "patent certificate" : "특허증"}
              pauseLabel={locale === "en" ? "Pause auto-rotation" : "자동 회전 정지"}
              playLabel={locale === "en" ? "Resume auto-rotation" : "자동 회전 재생"}
            />
          </Reveal>
          <Reveal>
            <Link href={withLocale("/about", locale)} className="arrowlink" style={{ marginTop: 32 }}>
              {c.patentsLink}{" "}
              <span className="ar" aria-hidden="true">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* §06 — Newsroom (Notion WEBSITE_NEWS 상위 3건, 서버에서 주입 — 없으면 섹션 생략) */}
      {news && news.length > 0 && (
        <section className="section section--ink">
          <div className="container-ex">
            <SectionHead index="06" label="NEWSROOM" title={c.newsTitle} narrow />
            <div className="mt-10">
              {news.map((n) => {
                const inner = (
                  <>
                    <span className="font-mono text-xs text-faint shrink-0" style={{ minWidth: 88 }}>{n.date}</span>
                    {n.outlet && <span className="cap shrink-0">{n.outlet}</span>}
                    <span className="flex-1 font-medium text-fg leading-snug">{n.title}</span>
                    <span className="ar text-lav" aria-hidden="true">↗</span>
                  </>
                );
                const rowCls = "flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b py-5 transition-colors hover:bg-white/[0.03]";
                return n.href ? (
                  <a key={n.title} href={n.href} target="_blank" rel="noopener noreferrer" className={rowCls} style={{ borderColor: "var(--color-border)" }}>
                    {inner}
                  </a>
                ) : (
                  <div key={n.title} className={rowCls} style={{ borderColor: "var(--color-border)" }}>
                    {inner}
                  </div>
                );
              })}
            </div>
            <Reveal>
              <Link href={withLocale("/news", locale)} className="arrowlink" style={{ marginTop: 28 }}>
                {c.newsLink}{" "}
                <span className="ar" aria-hidden="true">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* §07 — For Investors (공개 사실만: TIPS 선정·특허·파트너. 라운드 조건·재무는 게시하지 않음) */}
      <section className="section section--surface">
        <div className="container-ex" style={{ maxWidth: "54rem", textAlign: "center" }}>
          <SectionHead index="07" label="FOR INVESTORS" title={c.invTitle} center />
          <Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28, justifyContent: "center" }}>
              <div className="statchip">
                <div className="statchip-v">{locale === "en" ? "TIPS 2026 (Ministry of SMEs and Startups)" : "2026 중소벤처기업부 TIPS 선정"}</div>
              </div>
              <div className="statchip">
                <div className="statchip-v">{locale === "en" ? "6 registered patents" : "등록 특허 6건"}</div>
              </div>
              <div className="statchip">
                <div className="statchip-v">{locale === "en" ? "3 global partners" : "글로벌 파트너 3사"}</div>
              </div>
            </div>
            <p className="lead" style={{ maxWidth: "36rem", marginInline: "auto" }}>
              {c.invLead}
            </p>
            {/* 히어로 'EXLINK 둘러보기'와 동일한 버튼 스타일(btn--glow) — 대표 지시 */}
            <Link href={withLocale("/contact", locale)} className="btn btn--glow focus-on-dark" style={{ marginTop: 26 }}>
              {c.invLink}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--white">
        <div className="container-ex">
          <Reveal>
            <div className="ctacard">
              <span className="cta-ey">
                <span className="cta-bar" />
                {c.ctaLabel}
              </span>
              <h2 className="h2" style={{ marginTop: 22 }}>
                {c.ctaTitle}
              </h2>
              <p style={{ margin: "16px auto 0", maxWidth: "34rem", fontSize: 17, color: "var(--color-footer-link)" }}>
                {c.ctaLead}
              </p>
              <div className="hero-cta" style={{ justifyContent: "center" }}>
                <Link href={withLocale("/contact", locale)} className="btn btn--pink">
                  {c.ctaPrimary}
                </Link>
                <Link href={withLocale("/support", locale)} className="btn btn--ghostDark">
                  {c.ctaSecondary}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
