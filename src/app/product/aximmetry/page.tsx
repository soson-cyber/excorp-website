import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { Gauge } from "@/components/motion/Gauge";
import { SpecTable } from "@/components/product/SpecTable";
import { CompareTable } from "@/components/product/CompareTable";

export const metadata: Metadata = {
  title: "Aximmetry — 실시간 버추얼 프로덕션 플랫폼",
  alternates: { canonical: "/product/aximmetry" },
  description:
    "Unreal Engine 완벽 호환 + 자체 노드 기반 엔진으로 최대 8K 실시간 가상 스튜디오·XR·AR를 만드는 Aximmetry (Broadcast & Film Edition). 무제한 SDI/NDI/SMPTE 2110, Free-D·MOS. EX 공식 인증 리셀러.",
};

const quickSpecs = [
  { v: "8K", l: "실시간 렌더링" },
  { v: "Node", l: "기반 그래픽 UI" },
  { v: "Unlimited", l: "SDI/NDI/2110 I/O" },
  { v: "Unreal", l: "완벽 호환" },
];

const editions = [
  { name: "Studio Limited", for: "체험 · 입문", points: ["무료 제공", "워터마크 없음", "NDI 1포트", "기본 카메라 트래킹"] },
  { name: "Studio", for: "콘텐츠 제작자", points: ["렌탈/구독", "확장 기능", "가상 스튜디오 제작", "유연한 라이선스"] },
  { name: "Broadcast & Film", for: "전문 스튜디오 (EX 공급)", points: ["최대 8K 실시간", "무제한 SDI/NDI/2110", "Free-D·MOS 프로토콜", "분산 렌더링"] },
];

const features = [
  { t: "최대 8K 실시간 렌더링", d: "DLSS · Ray Tracing · RTXGI(실시간 전역 조명)로 8K까지 실시간 렌더." },
  { t: "Unreal Engine 완벽 호환", d: "네이티브 Aximmetry 3D 엔진 + Unreal Engine 플러그인 내장." },
  { t: "방송급 자체 크로마키어", d: "최고급 내장 크로마키어 + 3D Clean Plate, Light Wrap·실시간 그림자/반사/굴절." },
  { t: "노드 기반 그래픽 UI", d: "복잡한 코딩 없이 시각적 노드(Node)로 그래픽 로직을 직관적으로 구성." },
  { t: "무제한 방송 I/O", d: "SDI·NDI·SMPTE 2110(NMOS)·SRT 무제한, 타임코드·하드웨어 젠록 지원." },
  { t: "방송 프로토콜 · 분산 렌더링", d: "Free-D·MOS(뉴스룸) 지원, 다중 PC 분산 렌더링·멀티 GPU 동기화." },
];

const editionMatrix = [
  { label: "워터마크", values: ["없음", "없음", "없음"] },
  { label: "입출력", values: ["NDI 1", "확장", "무제한 SDI/NDI/2110"] },
  { label: "카메라 트래킹", values: ["기본", "확장", "프로페셔널"] },
  { label: "엔진", values: ["DE / SE", "DE / SE", "DE / SE"] },
];

const bfSpecs: [string, string][] = [
  ["렌더링 / 엔진", "네이티브 Aximmetry 3D 엔진 + Unreal Engine 완벽 호환 (플러그인 내장)"],
  ["해상도", "최대 8K 해상도 실시간 렌더링"],
  ["그래픽", "DLSS · Ray Tracing · RTXGI (실시간 전역 조명)"],
  ["컬러", "10-bit · HDR 입출력 · 색 공간(Color Space)·감마 처리"],
  ["크로마키", "최고급 자체 내장 크로마키어 + 3D Clean Plate · Light Wrap"],
  ["입출력", "무제한 SDI · NDI · SMPTE 2110(NMOS) · SRT I/O"],
  ["동기화", "SDI 타임코드(Timecode) · 하드웨어 젠록(Genlock)"],
  ["프로토콜", "Free-D 네이티브 · MOS(뉴스룸 통합)"],
  ["확장성", "다중 PC 분산 렌더링(Renderer Node) · 멀티 GPU 동기화"],
];

const useCases = ["방송 가상 스튜디오", "뉴스", "XR", "AR", "라이브"];

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
              <p className="font-mono text-3xl font-bold text-gradient-ex-bright">{s.v}</p>
              <p className="mt-1.5 text-sm text-muted">{s.l}</p>
              <Gauge className="mx-auto mt-3 w-3/4" />
            </div>
          ))}
        </div>
      </section>

      {/* Product preview */}
      <section className="section section--ink">
        <div className="container-ex">
          <figure className="mx-auto max-w-4xl">
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

      {/* §01 Editions */}
      <section className="section section--surface section--glow">
        <div className="container-ex">
          <SectionLabel index="01">Editions</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            용도에 맞는 에디션을 선택하세요
          </h2>
          <div className="mt-12 grid max-w-4xl gap-5 md:grid-cols-3">
            {editions.map((e) => (
              <div key={e.name} className="card flex flex-col" style={{ padding: 24 }}>
                <span className="font-mono text-[11px] uppercase tracking-wider text-lav">{e.for}</span>
                <h3 className="mt-1 text-xl font-semibold text-fg">{e.name}</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {e.points.map((p) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm text-muted">
            EX는 전문 스튜디오용 <span className="text-fg">Broadcast &amp; Film Edition</span>을 공급하며, 모든 에디션은{" "}
            <span className="text-fg">DE(자체+Unreal)</span> 또는 <span className="text-fg">SE(자체 엔진)</span> 중 선택할 수 있습니다.
          </p>
        </div>
      </section>

      {/* §02 Key Features */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="02">Key Features</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            주요 기능
          </h2>
          <div className="mt-12 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.t} className="card" style={{ padding: 24 }}>
                <h3 className="font-semibold text-fg">{f.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §03 Compare */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionLabel index="03">Compare</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            에디션 비교
          </h2>
          <div className="mt-12">
            <CompareTable columns={editions.map((e) => e.name)} rows={editionMatrix} />
          </div>
        </div>
      </section>

      {/* §04 Specifications */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="04">Specifications</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            Broadcast &amp; Film Edition 사양
          </h2>
          <div className="mt-12 max-w-3xl">
            <SpecTable groups={[{ rows: bfSpecs }]} />
          </div>
        </div>
      </section>

      {/* §05 Use Cases */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionLabel index="05">Use Cases</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            활용 분야
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-5">
            {useCases.map((u) => (
              <div key={u} className="card text-center font-medium text-fg" style={{ padding: 24 }}>
                {u}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §06 FAQ */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="06">FAQ</SectionLabel>
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

      {/* §07 EX × Aximmetry */}
      <section className="section section--surface section--glow">
        <div className="container-ex">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel index="07">EX × Aximmetry</SectionLabel>
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
                <Button href="/contact" variant="secondary">
                  데모 영상 요청 →
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
