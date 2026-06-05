import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { MediaBlank } from "@/components/ui/MediaBlank";
import { SpecTable } from "@/components/product/SpecTable";
import { CompareTable } from "@/components/product/CompareTable";

export const metadata: Metadata = {
  title: "Aximmetry — 실시간 버추얼 프로덕션 플랫폼",
  alternates: { canonical: "/product/aximmetry" },
  description:
    "Unreal Engine 네이티브 연동(플러그인 내장) + 자체 노드 기반 엔진으로 최대 8K 실시간 가상 스튜디오·XR·AR를 만드는 Aximmetry (Broadcast & Film Edition). 무제한 SDI/NDI/SMPTE 2110, Free-D·MOS. EX 공식 인증 리셀러.",
};

const quickSpecs = [
  { v: "8K", l: "실시간 렌더링" },
  { v: "Node", l: "기반 그래픽 UI" },
  { v: "Unlimited", l: "SDI/NDI/2110 I/O" },
  { v: "Unreal", l: "네이티브 연동" },
];

// §02 — 왜 Aximmetry인가: 핵심 차별점 3
const whyPoints = [
  {
    t: "Unreal Engine 5 통합",
    d: "Unreal Engine 5를 통합해, 언리얼로 만든 UE5 씬을 Aximmetry에서 바로 열어 실행하고 가상 스튜디오 파이프라인에 그대로 활용할 수 있습니다.",
  },
  {
    t: "노드 기반 자체 엔진",
    d: "복잡한 코딩 없이 시각적 노드(Node)로 그래픽 로직을 구성하는 자체 3D 엔진. DLSS·Ray Tracing·RTXGI로 최대 8K 실시간 렌더링을 지원합니다.",
  },
  {
    t: "무료부터 시작하는 라이선스",
    d: "워터마크 없는 Studio Limited를 무료로 사용해보고, 제작 규모가 커지면 Studio·Broadcast & Film로 단계적으로 확장하는 합리적 라이선스 체계입니다.",
  },
];

const editions = [
  {
    name: "Studio Limited",
    for: "체험 · 입문",
    points: ["무료 제공", "워터마크 없음", "NDI 1포트", "기본 카메라 트래킹"],
    pick: "무료로 노드 워크플로를 먼저 경험하고 싶다면",
  },
  {
    name: "Studio",
    for: "콘텐츠 제작자",
    points: ["렌탈/구독", "확장 기능", "가상 스튜디오 제작", "유연한 라이선스"],
    pick: "1인·소규모로 가상 스튜디오를 제작한다면",
  },
  {
    name: "Broadcast & Film",
    for: "전문 스튜디오 (EX 공급)",
    points: ["최대 8K 실시간", "무제한 SDI/NDI/2110", "Free-D·MOS 프로토콜", "분산 렌더링"],
    pick: "무제한 방송 I/O와 분산 렌더링이 필요한 방송·필름 현장이라면",
  },
];

const features = [
  { t: "최대 8K 실시간 렌더링", d: "DLSS · Ray Tracing · RTXGI(실시간 전역 조명)로 8K까지 실시간 렌더." },
  { t: "Unreal Engine 5 통합", d: "네이티브 Aximmetry 3D 엔진 + Unreal Engine 5 통합 — UE5 씬을 바로 열어 실행." },
  {
    t: "방송급 자체 크로마키어",
    d: "3D Clean Plate·Light Wrap을 지원하는 내장 크로마키어(BAM Award 2023 Create 수상) + 실시간 그림자/반사/굴절.",
  },
  { t: "노드 기반 그래픽 UI", d: "복잡한 코딩 없이 시각적 노드(Node)로 그래픽 로직을 직관적으로 구성." },
  { t: "무제한 방송 I/O", d: "SDI·NDI·SMPTE 2110(NMOS)·SRT 무제한, 타임코드·하드웨어 젠록 지원." },
  { t: "방송 프로토콜 · 분산 렌더링", d: "Free-D·MOS(뉴스룸) 지원, 다중 PC 분산 렌더링·멀티 GPU 동기화." },
  { t: "외부 제어 · 다중 출력", d: "GPIO·OSC·MIDI·DMX·ArtNet 디바이스 제어, 모니터·프로젝터·LED 월로 다중 동시 출력." },
];

const editionMatrix = [
  { label: "워터마크", values: ["없음", "없음", "없음"] },
  { label: "입출력", values: ["NDI 1", "확장", "무제한 SDI/NDI/2110"] },
  { label: "카메라 트래킹", values: ["기본", "확장", "프로페셔널"] },
  { label: "엔진", values: ["DE / SE", "DE / SE", "DE / SE"] },
];

const bfSpecs: [string, string][] = [
  ["렌더링 / 엔진", "네이티브 Aximmetry 3D 엔진 + Unreal Engine 5 통합 (UE5 씬 직접 실행)"],
  ["해상도", "최대 8K 해상도 실시간 렌더링"],
  ["그래픽", "DLSS · Ray Tracing · RTXGI (실시간 전역 조명)"],
  ["컬러", "10-bit · HDR 입출력 · 색 공간(Color Space)·감마 처리"],
  ["크로마키", "3D Clean Plate·Light Wrap을 지원하는 내장 크로마키어"],
  ["입출력", "무제한 SDI · NDI · SMPTE 2110(NMOS) · SRT I/O"],
  ["동기화", "SDI 타임코드(Timecode) · 하드웨어 젠록(Genlock)"],
  ["프로토콜", "Free-D 네이티브 · MOS(뉴스룸 통합)"],
  ["디바이스 제어", "GPIO · OSC · MIDI · DMX · ArtNet"],
  ["확장성", "다중 PC 분산 렌더링(Renderer Node) · 멀티 GPU 동기화"],
];

const useCases: { t: string; mono: string; d: string; src?: string; alt?: string }[] = [
  {
    t: "방송 가상 스튜디오",
    mono: "VIRTUAL STUDIO",
    d: "크로마키 배경을 실시간 3D 세트로 합성해 한 공간에서 다양한 무대를 연출합니다.",
    src: "/aximmetry-vp.jpg",
    alt: "그린스크린 가상 스튜디오 촬영 예시",
  },
  { t: "뉴스", mono: "NEWS", d: "Free-D·MOS(뉴스룸) 연동으로 데이터·그래픽을 실시간 반영하는 뉴스 스튜디오를 구성합니다." },
  { t: "XR", mono: "XR", d: "LED 월과 카메라 트래킹을 결합해 화면 밖까지 확장되는 XR 무대를 제작합니다." },
  { t: "AR", mono: "AR", d: "실사 영상 위에 3D 그래픽을 정합해 띄우는 증강현실 그래픽을 연출합니다." },
  { t: "라이브", mono: "LIVE", d: "무제한 방송 I/O와 분산 렌더링으로 대규모 라이브 중계를 실시간 송출합니다." },
];

// §08 — 도입 절차 (공통 4스텝)
const steps = [
  { t: "상담 · 요구 분석", d: "현장 환경과 제작 목표를 진단해 필요한 에디션·엔진(DE/SE)을 함께 정합니다." },
  { t: "구성 제안 · 견적", d: "라이선스·하드웨어·I/O 구성을 설계하고 투명한 견적을 제시합니다." },
  { t: "설치 · 셋업 · 교육", d: "시스템 설치와 트래킹·키잉 셋업, 운영자 현장 교육을 진행합니다." },
  { t: "운영 · 기술지원", d: "공식 인증 리셀러로서 운영 중 발생하는 이슈를 지속 기술지원합니다." },
];

const faqs = [
  { q: "DE와 SE의 차이는 무엇인가요?", a: "DE(Dual Engine)는 Aximmetry 자체 엔진과 Unreal Engine을 함께 사용하고, SE(Single Engine)는 자체 엔진만 사용합니다. Unreal 콘텐츠가 필요하면 DE를 선택합니다." },
  { q: "무료로 먼저 써볼 수 있나요?", a: "네. Studio Limited 에디션은 무료이며 워터마크가 없고 NDI 1포트·기본 트래킹을 제공합니다." },
  { q: "어느 정도 해상도까지 실시간으로 가능한가요?", a: "Broadcast & Film 에디션은 DLSS·Ray Tracing·RTXGI를 활용해 최대 8K 해상도 실시간 렌더링을 지원하며, 10-bit·HDR 입출력을 처리합니다." },
  { q: "방송 시스템과 어떻게 연동되나요?", a: "무제한 SDI·NDI·SMPTE 2110(NMOS)·SRT 입출력과 타임코드·하드웨어 젠록을 지원하고, Free-D·MOS(뉴스룸) 프로토콜로 방송 환경에 통합됩니다." },
];

export default function AximmetryPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Product", href: "/product" },
          { label: "Aximmetry", href: "/product/aximmetry" },
        ]}
        tag="Authorised Reseller"
        title="Unreal Engine의 힘, 합리적인 가격에."
        lead="자체 노드 기반 엔진과 Unreal Engine을 결합해 최대 8K 실시간 가상 스튜디오·XR·AR를 제작하는 버추얼 프로덕션 컴포저."
      />

      {/* Quick spec bar */}
      <section className="section--surface" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="container-ex grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
          {quickSpecs.map((s) => (
            <div key={s.l} className="text-center">
              <p className="font-mono text-3xl font-bold text-fg">{s.v}</p>
              <p className="mt-1.5 text-sm text-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* §01 Showcase */}
      <section className="section section--ink">
        <div className="container-ex">
          <SectionLabel index="01">Showcase</SectionLabel>
          <figure className="mx-auto mt-12 max-w-4xl">
            <div className="card" style={{ overflow: "hidden", padding: 0 }}>
              <Image
                src="/aximmetry-hero.png"
                alt="Aximmetry — 크로마키 촬영을 실시간 가상 세트로 합성한 버추얼 프로덕션 예시"
                width={1140}
                height={641}
                priority
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-center font-mono text-xs text-faint">
              실시간 크로마키 합성 — Beauty &amp; Joy 가상 세트
            </figcaption>
          </figure>
        </div>
      </section>

      {/* §02 Why Aximmetry */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionLabel index="02">Why Aximmetry</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            왜 Aximmetry인가
          </h2>
          <p className="lead" style={{ maxWidth: "40rem" }}>
            언리얼의 비주얼, 노드 기반 워크플로, 그리고 무료부터 시작하는 라이선스 — 세 가지가 한 플랫폼에 모였습니다.
          </p>
          <MediaBlank
            ratio="16/9"
            kind="image"
            src="/vp-workflow.png"
            alt="Aximmetry 노드 기반 그래픽 편집 화면"
            tag="AXIMMETRY NODE EDITOR"
            label="노드 기반 자체 엔진 — 실제 그래프 편집 화면"
            className="mt-12 w-full"
          />
          <div className="mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {whyPoints.map((p) => (
              <div key={p.t} className="card" style={{ padding: 24 }}>
                <h3 className="text-lg font-semibold text-fg">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §03 구성 (Editions) */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="03">Editions</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            용도에 맞는 에디션을 선택하세요
          </h2>
          <div className="mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {editions.map((e) => (
              <div key={e.name} className="card flex flex-col" style={{ padding: 24 }}>
                <span className="font-mono text-[11px] uppercase tracking-wider text-lav">{e.for}</span>
                <h3 className="mt-1 text-xl font-semibold text-fg">{e.name}</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {e.points.map((p) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-border pt-4 text-sm text-lav">{e.pick}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm text-muted">
            EX는 전문 스튜디오용 <span className="text-fg">Broadcast &amp; Film Edition</span>을 공급하며, 모든 에디션은{" "}
            <span className="text-fg">DE(자체+Unreal)</span> 또는 <span className="text-fg">SE(자체 엔진)</span> 중 선택할 수 있습니다.{" "}
            <span className="text-fg">Unreal 콘텐츠가 필요하면 DE</span>를 선택하세요.
          </p>
        </div>
      </section>

      {/* §05 Compare */}
      <section className="section section--ink">
        <div className="container-ex">
          <SectionLabel index="04">Compare</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            에디션 비교
          </h2>
          <div className="mt-12">
            <CompareTable columns={editions.map((e) => e.name)} rows={editionMatrix} />
          </div>
        </div>
      </section>

      {/* §04 Features */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionLabel index="05">Features</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            주요 기능
          </h2>
          <MediaBlank
            ratio="16/9"
            kind="image"
            src="/vp-chroma.png"
            alt="크로마키 촬영을 실시간 합성하는 버추얼 프로덕션 현장"
            tag="REAL-TIME CHROMA KEY"
            label="방송급 자체 크로마키 — 실시간 합성 현장"
            className="mt-12 w-full"
          />
          <div className="mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.t} className="card" style={{ padding: 24 }}>
                <h3 className="font-semibold text-fg">{f.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §06 Specifications */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="06">Specifications</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            Broadcast &amp; Film Edition 사양
          </h2>
          <p className="lead" style={{ maxWidth: "44rem" }}>
            아래 사양은 Aximmetry 제품 사양이며, EX는 공식 인증 리셀러로서 도입·기술지원을 담당합니다.
          </p>
          <div className="mt-12 max-w-3xl">
            <SpecTable groups={[{ rows: bfSpecs }]} />
          </div>
        </div>
      </section>

      {/* §07 Use Cases */}
      <section className="section section--ink">
        <div className="container-ex">
          <SectionLabel index="07">Use Cases</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            활용 분야
          </h2>
          <p className="mt-4 font-mono text-xs leading-relaxed text-faint">
            실제 사례가 아닌 활용 시나리오입니다 · 일부 이미지 준비 중
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u) => (
              <div key={u.t} className="card" style={{ padding: 24 }}>
                <MediaBlank
                  ratio="16/10"
                  kind="image"
                  src={u.src}
                  alt={u.alt}
                  tag="활용 시나리오"
                  label={u.t}
                  className="w-full"
                />
                <h3 className="mt-5 font-semibold text-fg">{u.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{u.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §08 도입 절차 */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionLabel index="08">Process</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            도입 절차
          </h2>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.t} className="card flex flex-col" style={{ padding: 24 }}>
                <span className="font-mono text-sm text-lav">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-semibold text-fg">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* §09 FAQ */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="09">FAQ</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            도입 전 자주 묻는 질문
          </h2>
          <div className="card mt-12 max-w-3xl" style={{ overflow: "hidden", padding: 0 }}>
            {faqs.map((f, i) => (
              <details key={f.q} className="group p-6" style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-border)" }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-fg">
                  {f.q}
                  <span className="font-mono text-lav transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* §10 EX × Aximmetry */}
      <section className="section section--ink">
        <div className="container-ex">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel index="10">EX × Aximmetry</SectionLabel>
              <h2 className="h2" style={{ marginTop: 22 }}>
                EX는 Aximmetry <span className="text-lav">공식 인증 리셀러</span>입니다.
              </h2>
              <p className="lead" style={{ maxWidth: "36rem" }}>
                에디션 선택 컨설팅부터 시스템 설치·보안 세팅·현장 교육·유지보수까지, 통합 턴키로 도입 전 과정을 지원합니다.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {["도입 컨설팅", "셋업", "교육", "유지보수"].map((x) => (
                  <li key={x} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-fg">
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact" variant="accent">
                  도입 상담 →
                </Button>
                <Button href="/support" variant="glow">
                  기술 사양서 요청 →
                </Button>
              </div>
            </div>
            <figure>
              <div className="card" style={{ overflow: "hidden", padding: 0 }}>
                <Image
                  src="/cert-aximmetry.png"
                  alt="Aximmetry Certified Reseller 인증서 (Authorization Certificate — EX Corporation)"
                  width={957}
                  height={677}
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 text-center font-mono text-xs text-faint">
                Aximmetry Authorization Certificate — EX Corporation
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
