import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "EXLINK — 실시간 XR 통합 솔루션",
  alternates: { canonical: "/solution/xr-solution", languages: { "ko-KR": "/solution/xr-solution", "en-US": "/en/solution/xr-solution", "x-default": "/solution/xr-solution" } },
  description:
    "EXLINK는 촬영·트래킹·렌더·송출을 단일 제어 흐름으로 묶는 EX 자체 개발 통합 실시간 XR 솔루션입니다. XR 스튜디오 구축부터 통합 제어 워크플로우까지, 견적·도입을 상담합니다.",
};

const contrast = [
  { p: "장비·소프트웨어가 제각각, 규격·제어 방식이 다름", s: "단일 제어 흐름에서 일관되게 운영" },
  { p: "현장마다 연동·동기화 셋업에 시간 소요", s: "셋업·전환 시간 단축, 빠른 현장 대응" },
  { p: "파트별 인력 분산으로 운영 부담이 큼", s: "통합 제어 워크플로우로 운영 부담 완화" },
];

const pipeline = [
  { t: "CAPTURE", k: "촬영 · 멀티캠", d: "여러 카메라 영상을 실시간으로 입력받습니다." },
  { t: "TRACKING", k: "카메라 트래킹", d: "카메라 위치·움직임을 정밀하게 추적합니다." },
  { t: "EXLINK", k: "통합 코어", d: "촬영·트래킹·렌더·송출을 한 흐름으로 조율합니다.", core: true },
  { t: "RENDER", k: "실시간 합성", d: "가상 배경·그래픽을 실시간 렌더·합성합니다." },
  { t: "BROADCAST", k: "송출 · 녹화", d: "실시간 송출과 동시 녹화를 진행합니다." },
];

const connected: { t: string; role: string; d: string; href?: string }[] = [
  { t: "Aximmetry", role: "연결", d: "실시간 3D / 버추얼 프로덕션 렌더 엔진을 EXLINK가 연결합니다.", href: "/product/aximmetry" },
  { t: "Moverse AI", role: "연결", d: "마커리스 AI 모션캡처를 EXLINK 흐름에 통합합니다.", href: "/product/moverse" },
  { t: "RETracker", role: "연결", d: "정밀 카메라 트래킹 기술을 EXLINK가 연동합니다.", href: "/product/retracker" },
  { t: "미디어서버 · 네트워크", role: "연결", d: "영상 소스 재생과 현장 네트워크를 제어 흐름 안에서 함께 운영합니다." },
];

const adoption = [
  { step: "도입 컨설팅", desc: "목적·예산·현장 조건을 검토해 적합한 구성을 설계합니다." },
  { step: "시스템 구축 · 셋업", desc: "장비와 EXLINK를 현장에 맞게 구축하고 안정화합니다." },
  { step: "교육", desc: "운영자가 직접 다룰 수 있도록 실무 중심으로 교육합니다." },
  { step: "기술 지원 · 운영", desc: "도입 이후에도 기술 지원과 운영을 지속적으로 함께합니다." },
];

// 고객 사례 — 실제 프로젝트. 실 고객명은 리더 결정에 따라 노출 유지(발행 전 대표 검토 게이트).
// ⚠ 정직성: 성과 수치·고객 인용문은 미검증 → 노출 금지. summary는 "무엇을 했는지"의 사실 기술만 유지.
// {/* TODO: 고객 동의 후 공개 — 성과 수치·고객 인용문 추가는 동의 확인 후에만 */}
type CaseStudy = { title: string; sector: string; client: string; summary: string; stack: string[]; period: string; img: string };
const featuredCase: CaseStudy = {
  title: "GS리테일 홈쇼핑 XR 시스템 구축",
  sector: "System Integration",
  client: "GS리테일",
  summary: "라이브 홈쇼핑 방송에서 지미집 카메라 트래킹과 AR 공간 연출을 실시간으로 구현했습니다.",
  stack: ["EXLINK", "Aximmetry", "RETracker"],
  period: "2026.04",
  img: "/gs_track.png",
};
const cases: CaseStudy[] = [
  {
    title: "쉘 코퍼레이션 24FW YETI 2300s Collection",
    sector: "버추얼 세트 · 패션 필름",
    client: "쉘 코퍼레이션",
    summary: "하남 XR 스튜디오에서 실시간 가상 공간을 활용한 합성 콘텐츠를 제작했습니다.",
    stack: ["하남 XR Studio"],
    period: "2024.11",
    img: "/shell_vp.png",
  },
  {
    title: "2024 자라섬 재즈 페스티벌 라이브 AR",
    sector: "방송 · 중계",
    client: "(사)문화현상",
    summary: "중계 영상에 오디오 반응형 실시간 AR 그래픽을 더해 연출했습니다.",
    stack: ["EXLINK", "Aximmetry", "RETracker"],
    period: "2024.10",
    img: "/jarasum_ar.png",
  },
  {
    title: "프로젝트 초월잼 — Golden Two Piano Remix",
    sector: "방송 · 중계 · 사전 시각화",
    client: "(주)매직아워",
    summary: "중계 영상에 실시간 가상 공간 그래픽을 활용해 사전 시각화를 진행했습니다.",
    stack: ["하남 XR Studio"],
    period: "2025.08",
    img: "/jam_jazz.jpg",
  },
];

export default function XrSolutionPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbLd([
          { name: "Solution", path: "/solution" },
          { name: "XR Solution", path: "/solution/xr-solution" },
        ])}
      />
      <PageHero
        breadcrumb={[
          { label: "Solution", href: "/solution" },
          { label: "XR Solution", href: "/solution/xr-solution" },
        ]}
        tag="XR Solution · EX Original"
        title="하나의 흐름으로 완성하는 실시간 XR 프로덕션"
        lead="촬영부터 트래킹, 가상 배경 렌더링, 송출까지 흩어져 있던 XR 파이프라인을 EXLINK 하나의 제어 흐름으로 묶습니다. EX가 자체 개발한 통합 실시간 XR 솔루션입니다."
      />

      {/* §01 What is EXLINK */}
      <section className="section section--ink">
        <div className="container-ex">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel index="01">What is EXLINK</SectionLabel>
              <h2 className="h2" style={{ marginTop: 22 }}>
                EXLINK란?
              </h2>
              <p className="lead" style={{ maxWidth: "36rem" }}>
                EXLINK는 실시간 XR 제작에 필요한 촬영·카메라 트래킹·가상 배경 렌더링·합성·미디어서버·송출 과정을 하나의 제어 흐름으로 통합한 EX 자체 개발 솔루션입니다. 여러 장비와 소프트웨어를 따로 연동하는 대신, 검증된 기술들을 EXLINK가 한 자리에서 조율합니다.
              </p>
              <p className="mt-6 border-l-2 border-primary pl-4 text-lg font-medium text-fg">
                흩어진 실시간 XR 파이프라인을, 하나의 제어 흐름으로.
              </p>
            </div>
            <figure className="card" style={{ overflow: "hidden", padding: 0 }}>
              <Image src="/exlink_solution.png" alt="EXLINK 통합 실시간 XR 솔루션 — 촬영·트래킹·렌더·송출 통합 제어 흐름" width={1672} height={941} priority className="h-auto w-full" />
            </figure>
          </div>
        </div>
      </section>

      {/* §02 Why integrated */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionLabel index="02">Why Integrated</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            왜 통합 솔루션인가
          </h2>
          <p className="lead" style={{ maxWidth: "42rem" }}>
            실시간 XR을 직접 구성하면 카메라·트래킹·렌더·미디어서버·송출이 제각각입니다. EXLINK는 이 과정을 하나의 흐름으로 묶어 복잡성을 줄이고, 현장 운영을 더 단순하고 빠르게 만듭니다. 생방송은 한 번의 멈춤도 치명적이기에, EX는 구축으로 끝내지 않고 운영까지 함께하는 파트너로 남습니다.
          </p>
          <p className="mt-5 border-l-2 border-primary pl-4 text-base italic leading-relaxed text-muted">
            &ldquo;장비마다 따로 만지느라 사람이 여럿 붙는다.&rdquo; 통합으로 풀어야 할 지점입니다.
          </p>
          {/* 2열 대비 — 좌: 분산형 구성(✕) / 우: EXLINK 통합(✓), 항목별 1:1 정렬 */}
          <div className="mx-auto mt-12 max-w-5xl">
            {/* 수렴 비주얼 — 흩어진 구성요소 → (흐름선) → EXLINK 단일 통합 */}
            <div className="grid items-stretch gap-3 sm:grid-cols-[1fr_64px_1fr] sm:gap-4">
              <div className="flex flex-col justify-center rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-xs uppercase tracking-wider text-faint">Scattered Setup · 분산형 구성</span>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {["카메라", "트래커", "렌더", "미디어서버", "송출"].map((x) => (
                    <span key={x} className="rounded-lg border border-dashed border-border bg-bg/40 px-3 py-1.5 text-sm text-muted">
                      {x}
                    </span>
                  ))}
                </div>
              </div>

              {/* 흐름선 — 데스크톱 가로 / 모바일 세로 */}
              <div className="flex items-center justify-center">
                <span className="hidden w-full items-center gap-1.5 sm:flex" aria-hidden="true">
                  <span className="flowline-x" />
                  <span className="text-lg leading-none text-lav">▶</span>
                </span>
                <span className="flex flex-col items-center gap-1.5 sm:hidden" aria-hidden="true">
                  <span className="flowline-y" />
                  <span className="text-base leading-none text-lav">▼</span>
                </span>
              </div>

              <div
                className="flex flex-col justify-center rounded-2xl border border-primary/50 bg-primary-soft p-6 text-center"
                style={{ boxShadow: "0 0 36px -6px var(--color-primary)" }}
              >
                <span className="font-mono text-xs uppercase tracking-wider text-lav">EXLINK Integrated · 통합</span>
                <p className="mt-3 text-4xl font-bold tracking-tight text-lav md:text-5xl">EXLINK</p>
                <p className="mt-1 text-base text-muted">하나의 제어 흐름</p>
              </div>
            </div>

            {/* 항목 행 */}
            <div className="mt-4 space-y-4">
              {contrast.map((c) => (
                <div key={c.s} className="grid items-stretch gap-3 sm:grid-cols-[1fr_64px_1fr] sm:gap-4">
                  <div className="card flex items-start gap-3" style={{ padding: 22 }}>
                    <span className="mt-0.5 shrink-0 text-lg font-semibold text-faint" aria-hidden="true">✕</span>
                    <p className="text-base leading-relaxed text-muted">{c.p}</p>
                  </div>
                  <span className="flex rotate-90 items-center justify-center text-lg text-lav sm:rotate-0" aria-hidden="true">
                    →
                  </span>
                  <div className="card flex items-start gap-3 border-primary/40" style={{ padding: 22 }}>
                    <span className="mt-0.5 shrink-0 text-lg font-semibold text-lav" aria-hidden="true">✓</span>
                    <p className="text-base font-medium leading-relaxed text-fg">{c.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* §03 Architecture */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="03">Architecture</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            구성 / 아키텍처
          </h2>
          <p className="mt-4 font-mono text-xs uppercase tracking-wider text-faint">
            CAPTURE → TRACKING → EXLINK CORE → RENDER → BROADCAST
          </p>
          <div className="mt-10 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-stretch">
            {pipeline.map((n, i) => (
              <Fragment key={n.t}>
                <div
                  className={`flex-1 rounded-2xl border p-5 lg:basis-[180px] ${
                    n.core ? "border-primary bg-primary-soft" : "border-border bg-card"
                  }`}
                >
                  <span className={`font-mono text-xs uppercase tracking-wider ${n.core ? "text-lav" : "text-faint"}`}>{n.t}</span>
                  <h3 className={`mt-2 font-semibold ${n.core ? "text-lav" : "text-fg"}`}>{n.k}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{n.d}</p>
                </div>
                {i < pipeline.length - 1 && (
                  <span className="flex items-center justify-center self-center rotate-90 text-lav lg:rotate-0" aria-hidden="true">
                    →
                  </span>
                )}
              </Fragment>
            ))}
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-border">
            <Image
              src="/exlink-vp-core.png"
              alt="EX-LINK VP Production Core 통합 신호 흐름 — 카메라·트래킹 시스템, 미디어 서버, 브로드캐스트 시스템, 플랫폼 스트리밍을 하나로 연결하는 아이소메트릭 다이어그램"
              width={1672}
              height={941}
              sizes="(max-width: 768px) 100vw, 960px"
              className="h-auto w-full"
            />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-faint">
            ※ 위 노드 흐름은 개념 구성이며, EX-LINK 통합 신호 흐름을 아이소메트릭 다이어그램으로 표현했습니다.
          </p>
        </div>
      </section>

      {/* §04 Connected tech */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionLabel index="04">Connected Tech</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            연결하는 기술
          </h2>
          <p className="lead" style={{ maxWidth: "42rem" }}>
            <span className="inline-block">EXLINK는 검증된 전문 기술을 직접 만들지 않고, 한 흐름 안에서 조율합니다.</span>{" "}
            <span className="inline-block">아래 파트너 제품은 EX가 국내 공급하는 기술이며,</span>{" "}
            <span className="inline-block">EXLINK는 이를 연결·통합합니다.</span>
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {connected.map((c) => {
              const inner = (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-fg">{c.t}</h3>
                    <span className="shrink-0 rounded-full bg-primary-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-lav">
                      {c.role}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.d}</p>
                  {c.href && (
                    <span className="arrowlink mt-4 text-sm">
                      제품 보기{" "}
                      <span className="ar" aria-hidden="true">
                        →
                      </span>
                    </span>
                  )}
                </>
              );
              return c.href ? (
                <Link key={c.t} href={c.href} className="card group flex flex-col" style={{ padding: 24 }}>
                  {inner}
                </Link>
              ) : (
                <div key={c.t} className="card flex flex-col" style={{ padding: 24 }}>
                  {inner}
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-faint">
            ※ Aximmetry · Moverse AI · RETracker는 각 제조사의 제품으로, EXLINK는 이를 연결·조율합니다. 자체 개발 영역은 통합 코어(EXLINK)입니다.
          </p>
        </div>
      </section>

      {/* §07 Adoption */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="05">Adoption</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            <span className="inline-block">도입 방식,</span>{" "}
            <span className="inline-block">컨설팅부터 운영까지</span>
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {adoption.map((a, i) => (
              <div key={a.step} className="card" style={{ padding: 24 }}>
                <span className="font-mono text-3xl font-bold text-lav tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-semibold text-fg">{a.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact">도입 상담 →</Button>
            <Button href="/solution/virtual-production" variant="glow">
              버추얼 프로덕션 알아보기 →
            </Button>
          </div>
        </div>
      </section>

      {/* §06 Customer cases — 대표 1 + 그리드 */}
      <section className="section section--surface section--glow">
        <div className="container-ex">
          <SectionLabel index="06">Customer Cases</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            고객 사례
          </h2>
          <p className="lead" style={{ maxWidth: "42rem" }}>
            EXLINK와 하남 XR 스튜디오로 실제 현장에서 완성한 프로젝트입니다.
          </p>

          {/* 대표 사례 (Featured) */}
          <div className="card mt-12 grid items-stretch gap-0 overflow-hidden p-0 lg:grid-cols-2">
            <div className="aspect-video overflow-hidden bg-bg/60 lg:aspect-auto">
              <Image src={featuredCase.img} alt={`${featuredCase.title} — ${featuredCase.summary}`} width={1280} height={720} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-9">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary-soft px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-lav">Featured</span>
                <span className="font-mono text-xs uppercase tracking-wider text-faint">{featuredCase.sector}</span>
              </div>
              <h3 className="mt-4 text-2xl font-bold leading-snug text-fg">{featuredCase.title}</h3>
              <p className="mt-1.5 text-sm font-medium text-lav">{featuredCase.client}</p>
              <p className="mt-3 leading-relaxed text-muted">{featuredCase.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {featuredCase.stack.map((s) => (
                  <li key={s} className="rounded-full border border-border bg-card px-3 py-1 text-xs text-fg">{s}</li>
                ))}
              </ul>
              <p className="mt-5 font-mono text-xs text-faint">{featuredCase.period}</p>
            </div>
          </div>

          {/* 보조 사례 그리드 */}
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cases.map((c) => (
              <div key={c.title} className="card flex flex-col" style={{ padding: 0, overflow: "hidden" }}>
                <div className="aspect-video w-full overflow-hidden bg-bg/60">
                  <Image src={c.img} alt={`${c.title} — ${c.summary}`} width={1280} height={720} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-faint">{c.sector}</span>
                  <h3 className="mt-2 font-semibold leading-snug text-fg">{c.title}</h3>
                  <p className="mt-1 text-sm font-medium text-lav">{c.client}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {c.stack.map((s) => (
                      <li key={s} className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] text-muted">{s}</li>
                    ))}
                  </ul>
                  <p className="mt-3 font-mono text-[11px] text-faint">{c.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner variant="studio" />
    </>
  );
}
