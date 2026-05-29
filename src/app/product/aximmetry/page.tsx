import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { Gauge } from "@/components/motion/Gauge";

export const metadata: Metadata = {
  title: "Aximmetry — 실시간 버추얼 프로덕션 플랫폼",
  description:
    "Unreal Engine 통합 + 자체 노드 기반 엔진으로 방송급 실시간 가상 스튜디오·XR·AR를 만드는 Aximmetry. EX 공식 인증 리셀러.",
};

const quickSpecs = [
  { v: "2", l: "Render Engines (자체+Unreal)" },
  { v: "Node", l: "기반 워크플로우" },
  { v: "Broadcast", l: "실시간 고급 키어" },
  { v: "Free", l: "Studio Limited 체험" },
];

const editions = [
  {
    name: "Studio Limited",
    for: "체험 · 입문",
    points: ["무료 제공", "워터마크 없음", "NDI 1포트", "기본 카메라 트래킹"],
  },
  {
    name: "Studio",
    for: "콘텐츠 제작자",
    points: ["렌탈/구독", "확장 기능", "가상 스튜디오 제작", "유연한 라이선스"],
  },
  {
    name: "Broadcast & Film",
    for: "전문 스튜디오",
    points: ["프로 카메라 트래킹", "무제한 SDI/NDI 입출력", "단일/멀티 PC 구성", "방송 제작 대응"],
  },
];

const features = [
  { t: "듀얼 엔진", d: "자체 렌더 엔진 + Unreal Engine을 함께 사용(DE), 또는 자체 엔진만(SE)." },
  { t: "노드 기반 커스텀 로직", d: "노드 UI로 사용자 정의 로직을 직관적으로 구성." },
  { t: "방송급 고급 키어", d: "머리카락·투명·접지 그림자까지 GPU 실시간 키잉." },
  { t: "무제한 SDI/NDI", d: "Broadcast 에디션에서 무제한 입출력 포트 지원." },
  { t: "프로 카메라 트래킹 연동", d: "RETracker 등 전문 트래킹 시스템과 연동." },
  { t: "MIDI · DMX · OSC", d: "외부 장비 제어 및 가상 카메라·인터랙션." },
];

const editionMatrix = [
  { label: "워터마크", values: ["없음", "없음", "없음"] },
  { label: "입출력", values: ["NDI 1", "확장", "무제한 SDI/NDI"] },
  { label: "카메라 트래킹", values: ["기본", "확장", "프로페셔널"] },
  { label: "엔진", values: ["DE / SE", "DE / SE", "DE / SE"] },
];

const useCases = ["방송 가상 스튜디오", "뉴스", "XR", "AR", "라이브"];

const faqs = [
  { q: "DE와 SE의 차이는 무엇인가요?", a: "DE(Dual Engine)는 Aximmetry 자체 엔진과 Unreal Engine을 함께 사용하고, SE(Single Engine)는 자체 엔진만 사용합니다. Unreal 콘텐츠가 필요하면 DE를 선택합니다." },
  { q: "무료로 먼저 써볼 수 있나요?", a: "네. Studio Limited 에디션은 무료이며 워터마크가 없고 NDI 1포트·기본 트래킹을 제공합니다." },
  { q: "카메라 트래킹을 연동할 수 있나요?", a: "Broadcast & Film 에디션에서 RETracker 등 전문 카메라 트래킹 시스템을 연동할 수 있습니다." },
  { q: "단일/멀티 PC 구성이 가능한가요?", a: "Broadcast 환경은 단일 PC(무제한 SDI/NDI) 또는 멀티 PC 구성 모두 지원합니다." },
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
        lead="자체 노드 기반 엔진과 Unreal Engine을 결합해 방송급 실시간 가상 스튜디오·XR·AR를 제작하는 버추얼 프로덕션 플랫폼."
      />

      {/* Quick spec bar */}
      <section className="border-b border-border bg-surface/40">
        <div className="container-ex grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
          {quickSpecs.map((s) => (
            <div key={s.l} className="text-center">
              <p className="font-mono text-3xl font-bold text-gradient-ex">{s.v}</p>
              <p className="mt-1.5 text-sm text-muted">{s.l}</p>
              <Gauge className="mx-auto mt-3 w-3/4" />
            </div>
          ))}
        </div>
      </section>

      {/* Product preview */}
      <section className="container-ex py-section">
        <figure className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-border">
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
      </section>

      {/* Editions */}
      <section className="bg-surface/40">
        <div className="container-ex py-section">
          <div className="text-center">
            <SectionLabel index="01">Editions</SectionLabel>
            <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">용도에 맞는 에디션을 선택하세요</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-3">
            {editions.map((e) => (
              <div key={e.name} className="flex flex-col rounded-2xl border border-border bg-surface p-6">
                <span className="font-mono text-[11px] uppercase tracking-wider text-primary">{e.for}</span>
                <h3 className="mt-1 text-xl font-semibold">{e.name}</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {e.points.map((p) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            모든 에디션은 <span className="text-fg">DE(자체+Unreal)</span> 또는 <span className="text-fg">SE(자체 엔진)</span> 중 선택할 수 있습니다.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="container-ex py-section">
        <div className="text-center">
          <SectionLabel index="02">Key Features</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">주요 기능</h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.t} className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-semibold">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Edition comparison */}
      <section className="bg-surface/40">
        <div className="container-ex py-section">
          <div className="text-center">
            <SectionLabel index="03">Compare</SectionLabel>
            <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">에디션 비교</h2>
          </div>
          <div className="mt-12 overflow-x-auto">
            <div className="grid min-w-[40rem] grid-cols-4 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              <div className="bg-surface-2 p-4" />
              {editions.map((e) => (
                <div key={e.name} className="bg-surface-2 p-4 text-center text-sm font-semibold">
                  {e.name}
                </div>
              ))}
              {editionMatrix.map((row) => (
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
        </div>
      </section>

      {/* Use Cases */}
      <section className="container-ex py-section">
        <SectionLabel index="04">Use Cases</SectionLabel>
        <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">활용 분야</h2>
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-5">
          {useCases.map((u) => (
            <div key={u} className="bg-surface p-6 text-center font-medium">
              {u}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface/40">
        <div className="container-ex py-section">
          <div className="text-center">
            <SectionLabel index="05">FAQ</SectionLabel>
            <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">도입 전 자주 묻는 질문</h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
            {faqs.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-fg">
                  {f.q}
                  <span className="font-mono text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* EX × Aximmetry */}
      <section className="container-ex py-section">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel index="06">EX × Aximmetry</SectionLabel>
            <h2 className="mt-5 text-balance text-3xl font-bold leading-snug md:text-4xl">
              EX는 Aximmetry <span className="text-gradient-ex">공식 인증 리셀러</span>입니다.
            </h2>
            <p className="mt-5 text-pretty text-muted">
              Aximmetry Technologies의 공식 인증 리셀러로서 에디션 선택 컨설팅부터 셋업·교육·유지보수까지
              도입 전 과정을 지원합니다.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {["도입 컨설팅", "셋업", "교육", "유지보수"].map((x) => (
                <li key={x} className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg">
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" variant="accent">
                제품 도입 문의 →
              </Button>
              <Button href="/contact" variant="secondary">
                데모 영상 요청 →
              </Button>
            </div>
          </div>
          <figure>
            <div className="overflow-hidden rounded-2xl border border-border">
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
      </section>

      <CtaBanner />
    </>
  );
}
