import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { MediaBlank } from "@/components/ui/MediaBlank";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata: Metadata = {
  title: "XR Solution — EXLINK",
  alternates: { canonical: "/solution/xr-solution" },
  description:
    "EXLINK은 촬영·트래킹·렌더·송출을 단일 제어 흐름으로 묶는 EX 자체 개발 올인원 실시간 XR 솔루션입니다. 검증된 파트너 기술을 연결·조율해 운영자 1인 중심 워크플로우를 만듭니다.",
};

const contrast = [
  { p: "장비·소프트웨어가 제각각, 규격·제어 방식이 다름", s: "단일 제어 흐름에서 일관되게 운영" },
  { p: "현장마다 연동·동기화 셋업에 시간 소요", s: "셋업·전환 시간 단축, 빠른 현장 대응" },
  { p: "파트별 인력 분산으로 운영 부담이 큼", s: "운영자 1인 중심 워크플로우로 효율화" },
];

const pipeline = [
  { t: "CAPTURE", k: "촬영 · 멀티캠", d: "여러 카메라 영상을 실시간으로 입력받습니다." },
  { t: "TRACKING", k: "카메라 트래킹", d: "카메라 위치·움직임을 정밀하게 추적합니다." },
  { t: "EXLINK", k: "통합 코어", d: "촬영·트래킹·렌더·송출을 한 흐름으로 조율합니다.", core: true },
  { t: "RENDER", k: "실시간 합성", d: "가상 배경·그래픽을 실시간 렌더·합성합니다." },
  { t: "BROADCAST", k: "송출 · 녹화", d: "실시간 송출과 동시 녹화를 진행합니다." },
];

const features = [
  { t: "멀티캠·트래킹 자동 동기화", d: "여러 카메라와 트래킹 데이터를 자동으로 맞춰 수동 보정 부담을 줄입니다." },
  { t: "가상 배경·그래픽 실시간 합성", d: "가상 배경과 그래픽을 촬영 화면과 실시간으로 합성합니다." },
  { t: "라이브 송출·동시 녹화", d: "실시간 송출과 녹화를 동시에 처리해 생방송과 아카이브를 함께 잡습니다." },
  { t: "운영자 1인 중심 제어 UI", d: "핵심 제어를 한 화면에 모아 소수 인력으로 전체 흐름을 운영합니다." },
  { t: "실시간 처리", d: "지연을 최소화한 실시간 처리(1프레임 미만 목표)로 라이브 환경에 대응합니다." },
  { t: "확장성", d: "카메라 수·그래픽 소스·연결 기술을 현장 규모에 맞춰 확장합니다." },
];

const build = {
  software: [
    { t: "Aximmetry (Broadcast & Film)", d: "최대 8K 실시간 3D 그래픽 합성·버추얼 스튜디오 컴포저" },
    { t: "RETracker Bliss Software", d: "Bliss G2 공간 데이터를 Free-D로 엔진에 실시간 송출" },
  ],
  hardware: [
    { t: "Media Server", d: "RTX 5090 32GB · 라이젠9 9950X3D · 128GB · DeckLink 8K Pro G2 (4U)" },
    { t: "RETracker Bliss G2", d: "Myriad X VPU 6-DOF 마커리스 트래킹 센서 (<1cm/10m)" },
    { t: "RETracker Fizz 2 Pro", d: "렌즈 FIZ 인코더 — 심도·시야각 실시간 정합" },
  ],
};

const connected = [
  { t: "Aximmetry", role: "연결", d: "실시간 3D / 버추얼 프로덕션 렌더 엔진을 EXLINK이 연결합니다." },
  { t: "Moverse AI", role: "연결", d: "마커리스 AI 모션캡처를 EXLINK 흐름에 통합합니다." },
  { t: "RETracker", role: "연결", d: "정밀 카메라 트래킹 기술을 EXLINK이 연동합니다." },
  { t: "미디어서버 · 네트워크", role: "연결", d: "영상 소스 재생과 현장 네트워크를 제어 흐름 안에서 함께 운영합니다." },
];

const adoption = [
  { step: "도입 컨설팅", desc: "목적·예산·현장 조건을 검토해 적합한 구성을 설계합니다." },
  { step: "시스템 구축 · 셋업", desc: "장비와 EXLINK을 현장에 맞게 구축하고 안정화합니다." },
  { step: "교육", desc: "운영자가 직접 다룰 수 있도록 실무 중심으로 교육합니다." },
  { step: "기술 지원 · 운영", desc: "도입 이후에도 기술 지원과 운영을 지속적으로 함께합니다." },
];

const useCases = [
  { t: "방송 · 중계", mono: "BROADCAST", d: "스튜디오 생방송, 스포츠·중계 등 실시간 방송 제작" },
  { t: "기업 IR · 발표", mono: "IR · KEYNOTE", d: "실적 발표·투자자 프레젠테이션의 가상 무대화" },
  { t: "웨비나 · 컨퍼런스", mono: "WEBINAR", d: "온라인 세미나·발표의 몰입형 가상 배경 연출" },
  { t: "행사 · 이벤트", mono: "LIVE EVENT", d: "런칭·시상·페스티벌 등 라이브 이벤트 연출" },
  { t: "가상 스튜디오 구축", mono: "VIRTUAL STUDIO", d: "XR/버추얼 프로덕션 스튜디오 설계·구축" },
  { t: "교육", mono: "TRAINING", d: "실시간 XR을 활용한 강의·실습 환경 구성" },
];

export default function XrSolutionPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Solution", href: "/solution" },
          { label: "XR Solution", href: "/solution/xr-solution" },
        ]}
        tag="XR Solution · EX Original"
        title="하나의 흐름으로 완성하는 실시간 XR 프로덕션"
        lead="촬영부터 트래킹, 가상 배경 렌더링, 송출까지 — 흩어진 XR 파이프라인을 EXLINK 하나의 제어 흐름으로 묶습니다. EX가 자체 개발한 올인원 실시간 XR 솔루션입니다."
      />

      {/* §00 Hero media band — 풀블리드 루프영상 자리 */}
      <section className="section section--ink">
        <div className="container-ex">
          <MediaBlank
            ratio="16/9"
            kind="video"
            tag="EXLINK · REAL-TIME XR"
            label="EXLINK 실시간 XR 워크플로우"
            sublabel="촬영·트래킹·렌더·송출을 한 흐름으로 — 영상 준비 중"
            className="w-full"
          />
        </div>
      </section>

      {/* §01 What is EXLINK */}
      <section className="section section--ink">
        <div className="container-ex">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel index="01">What is EXLINK</SectionLabel>
              <h2 className="h2" style={{ marginTop: 22 }}>
                EXLINK이란?
              </h2>
              <p className="lead" style={{ maxWidth: "36rem" }}>
                EXLINK은 실시간 XR 제작에 필요한 촬영·카메라 트래킹·가상 배경 렌더링·합성·미디어서버·송출 과정을 하나의 제어 흐름으로 통합한 EX 자체 개발 올인원 솔루션입니다. 여러 장비와 소프트웨어를 따로 연동하는 대신, 검증된 기술들을 EXLINK이 한 자리에서 조율합니다.
              </p>
              <p className="mt-6 border-l-2 border-primary pl-4 text-lg font-medium text-fg">
                흩어진 실시간 XR 파이프라인을, 하나의 제어 흐름으로.
              </p>
            </div>
            <figure className="card" style={{ overflow: "hidden", padding: 0 }}>
              <Image src="/vp-workflow.png" alt="EXLINK 노드 기반 실시간 XR 제어 흐름" width={891} height={557} priority className="h-auto w-full" />
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
            실시간 XR을 직접 구성하면 카메라·트래킹·렌더·미디어서버·송출이 제각각입니다. EXLINK은 이 과정을 하나의 흐름으로 묶어 복잡성을 줄이고, 더 적은 인력으로 더 빠르게 운영하게 합니다.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <MediaBlank
              ratio="16/9"
              kind="diagram"
              tag="SCATTERED SETUP"
              label="분산형 구성"
              sublabel="구성 비교 이미지 준비 중"
            />
            <MediaBlank
              ratio="16/9"
              kind="diagram"
              tag="EXLINK INTEGRATED"
              label="EXLINK 통합"
              sublabel="구성 비교 이미지 준비 중"
            />
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {contrast.map((c) => (
              <div key={c.s} className="card" style={{ padding: 24 }}>
                <span className="font-mono text-[11px] uppercase tracking-wider text-faint">분산형 구성</span>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.p}</p>
                <div className="my-4 text-lav">↓</div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-lav">EXLINK 통합</span>
                <p className="mt-2 text-sm font-medium leading-relaxed text-fg">{c.s}</p>
              </div>
            ))}
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
          <MediaBlank
            ratio="21/9"
            kind="diagram"
            tag="EXLINK PIPELINE"
            label="EXLINK 파이프라인 구성도"
            sublabel="촬영부터 송출까지 제어 흐름 — 다이어그램 준비 중"
            className="mt-10 w-full"
          />
          <p className="mt-3 text-xs leading-relaxed text-faint">
            ※ 위 노드 흐름은 개념 구성이며, 실제 결선·신호 흐름 다이어그램은 준비 중입니다.
          </p>
        </div>
      </section>

      {/* §04 Features */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionLabel index="04">Key Features</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            핵심 기능
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.t} className="card" style={{ padding: 24 }}>
                <h3 className="font-semibold text-fg">{f.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §05 System build (turnkey) */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="05">System Build</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            EXLINK 시스템 구성 (턴키)
          </h2>
          <p className="lead" style={{ maxWidth: "42rem" }}>
            하드웨어·소프트웨어·시스템 설치·보안 세팅·현장 교육을 포함한 통합 턴키(Turn-key)로 공급합니다.
          </p>
          <MediaBlank
            ratio="16/9"
            kind="image"
            tag="SYSTEM BUILD"
            label="EXLINK 시스템 구성 실사"
            sublabel="미디어서버·트래킹 구성 — 사진 준비 중"
            className="mt-12 w-full"
          />
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="card" style={{ padding: 28 }}>
              <span className="font-mono text-[11px] uppercase tracking-wider text-lav">Software</span>
              <ul className="mt-4 space-y-4">
                {build.software.map((s) => (
                  <li key={s.t}>
                    <p className="font-semibold text-fg">{s.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{s.d}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card" style={{ padding: 28 }}>
              <span className="font-mono text-[11px] uppercase tracking-wider text-lav">Hardware</span>
              <ul className="mt-4 space-y-4">
                {build.hardware.map((h) => (
                  <li key={h.t}>
                    <p className="font-semibold text-fg">{h.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{h.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-faint">
            ※ 구성·모델은 현장 요구와 공급 시점에 따라 달라질 수 있습니다. 상세 사양은 도입 상담 시 안내합니다.
          </p>
        </div>
      </section>

      {/* §06 Connected tech */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionLabel index="06">Connected Tech</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            연결하는 기술
          </h2>
          <p className="lead" style={{ maxWidth: "42rem" }}>
            EXLINK은 검증된 전문 기술을 직접 만들지 않고, 한 흐름 안에서 조율합니다. 아래 파트너 제품은 EX가 국내 공급하는 기술이며, EXLINK이 이를 연결·통합합니다.
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {connected.map((c) => (
              <div key={c.t} className="card" style={{ padding: 24 }}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-fg">{c.t}</h3>
                  <span className="shrink-0 rounded-full bg-primary-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-lav">
                    {c.role}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-faint">
            ※ Aximmetry · Moverse AI · RETracker는 각 제조사의 제품으로, EXLINK은 이를 연결·조율합니다. 자체 개발 영역은 통합 코어(EXLINK)입니다.
          </p>
        </div>
      </section>

      {/* §07 Adoption */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="07">Adoption</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            <span className="inline-block">도입 방식 —</span>{" "}
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
            <Button href="/solution/virtual-production" variant="secondary">
              버추얼 프로덕션 알아보기 →
            </Button>
          </div>
        </div>
      </section>

      {/* §08 Use cases */}
      <section className="section section--surface section--glow">
        <div className="container-ex">
          <SectionLabel index="08">Use Cases</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            활용 분야
          </h2>
          <p className="mt-4 font-mono text-xs leading-relaxed text-faint">
            실제 사례가 아닌 활용 시나리오입니다 · 이미지 준비 중
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u) => (
              <div key={u.t} className="card" style={{ padding: 24 }}>
                <MediaBlank ratio="16/10" kind="image" tag={u.mono} label={u.t} className="w-full" />
                <h3 className="mt-5 font-semibold text-fg">{u.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{u.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
