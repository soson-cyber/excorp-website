import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata: Metadata = {
  title: "Virtual Production — 촬영하는 순간 완성되는 영상 제작",
  description:
    "버추얼 프로덕션은 가상 배경과 실제 촬영을 실시간으로 합쳐 현장에서 완성하는 제작 방식입니다. EX는 EXLINK·파트너 기술·하남 XR 스튜디오를 연결해 크로마·실시간 트래킹 기반 VP를 제공합니다.",
};

const benefits = [
  { t: "촬영이 곧 완성", d: "현장에서 합성 화면을 보며 촬영해, 후반 작업 기간을 대폭 줄입니다." },
  { t: "무한한 배경 · 세트비 절감", d: "세트 제작·로케이션 이동 없이 어떤 공간이든 가상으로 구현합니다." },
  { t: "실시간 연출 · 즉시 확인", d: "배경·조명·구도를 그 자리에서 바꾸고 결과를 바로 확인합니다." },
  { t: "라이브 송출까지", d: "완성된 화면을 실시간 그대로 방송·중계·스트리밍으로 내보냅니다." },
];

const methods = [
  { t: "크로마키 (그린스크린)", d: "초록 배경 앞에서 촬영해 인물만 따내 가상 배경과 합성합니다.", tag: "EX 강점" },
  { t: "실시간 XR 트래킹", d: "카메라 움직임을 정밀 추적해 배경이 어긋나지 않고 따라옵니다.", tag: "EX 핵심" },
  { t: "ICVFX (인카메라 VFX)", d: "카메라 안에서 가상 배경을 그대로 완성, 보이는 그대로가 결과물." },
  { t: "LED Wall", d: "대형 LED에 배경을 띄워 그 앞에서 촬영하는 업계 방식." },
  { t: "AR 그래픽", d: "실제 영상 위에 가상 그래픽·오브젝트를 실시간으로 합성합니다." },
  { t: "XR 확장", d: "크로마·AR·가상 배경을 결합해 무대를 화면 밖까지 확장합니다." },
];

const exPoints = [
  "올인원 실시간 솔루션 EXLINK — 가상 배경 제작부터 실시간 합성·운영까지 하나로",
  "검증된 파트너 기술 연결 — Aximmetry · Moverse AI · RETracker를 프로젝트에 맞게 결합",
  "촬영과 동시에 완성 — 대형 그린 크로마 + 실시간 트래킹으로 후반 작업 최소화",
];

const process = [
  { step: "문의 · 기획", desc: "목적과 예산을 정리하고 가장 알맞은 제작 방식을 제안합니다." },
  { step: "가상 자산 · 세팅", desc: "가상 배경·그래픽을 제작하고 스튜디오·카메라·트래킹을 세팅합니다." },
  { step: "실시간 촬영 · 합성", desc: "그린 크로마 앞에서 촬영하며 가상 배경을 실시간 합성·확인합니다." },
  { step: "즉시 검수 · 납품", desc: "현장에서 검수하고 영상 납품 또는 라이브 송출로 마무리합니다." },
];

const useCases = [
  { t: "방송 · 중계", d: "가상 스튜디오와 실시간 그래픽이 더해진 생중계" },
  { t: "기업 IR · 발표", d: "신뢰감 있는 가상 무대 위 임원·실적 발표" },
  { t: "웨비나 · 컨퍼런스", d: "가상 배경·AR 그래픽을 활용한 온라인 세션" },
  { t: "패션 · 커머스", d: "제품·룩을 돋보이게 하는 다양한 가상 공간 연출" },
  { t: "행사 · 이벤트", d: "무대를 화면 밖까지 확장하는 XR 라이브 연출" },
  { t: "교육", d: "가상 환경을 활용한 강의·실습 콘텐츠" },
];

export default function VirtualProductionPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Solution", href: "/solution" },
          { label: "Virtual Production", href: "/solution/virtual-production" },
        ]}
        tag="Methodology"
        title="촬영하는 순간, 콘텐츠가 완성됩니다."
        lead="가상 배경과 실제 촬영을 실시간으로 하나로 합칩니다. 길고 복잡한 후반 작업 없이, 현장에서 결과물을 바로 확인하세요."
      />

      {/* §01 What is VP */}
      <section className="container-ex py-section">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl border border-border">
            <Image
              src="/vp-chroma.png"
              alt="크로마키 촬영을 실시간 가상 배경에 합성한 버추얼 프로덕션 결과"
              width={891}
              height={472}
              priority
              className="h-auto w-full"
            />
          </figure>
          <div>
            <SectionLabel index="01">What is VP</SectionLabel>
            <h2 className="mt-5 text-balance text-3xl font-bold leading-snug md:text-4xl">버추얼 프로덕션이란?</h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted">
              버추얼 프로덕션(Virtual Production)은 컴퓨터로 만든 가상의 배경·세트를 실제 촬영과 실시간으로
              합쳐 영상을 완성하는 제작 방식입니다. 현장에서 합성된 화면을 바로 보며 연출할 수 있어 긴 후반
              작업이 필요 없고, 카메라가 움직여도 배경이 자연스럽게 따라옵니다.
            </p>
            <p className="mt-6 border-l-2 border-primary pl-4 text-lg font-medium text-fg">
              가상 배경 위에서 실제로 촬영하고, 그 자리에서 완성하는 영상 제작 방식.
            </p>
          </div>
        </div>
      </section>

      {/* §02 Why VP */}
      <section className="bg-surface/40">
        <div className="container-ex py-section">
          <SectionLabel index="02">Why VP</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">왜 지금 버추얼 프로덕션인가</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((c) => (
              <div key={c.t} className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-semibold text-fg">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §03 Methods */}
      <section className="container-ex py-section">
        <SectionLabel index="03">Methods</SectionLabel>
        <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">제작 방식</h2>
        <p className="mt-4 max-w-2xl text-muted">
          버추얼 프로덕션은 한 가지 방법만 있는 게 아닙니다. 목적과 예산에 따라 아래 방식을 선택하거나
          조합합니다.
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {methods.map((m) => (
            <div key={m.t} className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-fg">{m.t}</h3>
                {m.tag && (
                  <span className="shrink-0 rounded-full bg-primary-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-primary">
                    {m.tag}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{m.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* §04 EX Virtual Production */}
      <section className="bg-surface/40">
        <div className="container-ex py-section">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel index="04">EX Virtual Production</SectionLabel>
              <h2 className="mt-5 text-balance text-3xl font-bold leading-snug md:text-4xl">EX의 버추얼 프로덕션</h2>
              <p className="mt-5 text-pretty leading-relaxed text-muted">
                EX는 자체 솔루션 EXLINK, 검증된 파트너 기술, 그리고 하남 XR 스튜디오를 하나의 제작 파이프라인으로
                연결합니다. 대형 그린 크로마(W10×D7×H4)와 시네마 카메라, 실시간 XR 트래킹을 기반으로 촬영과 합성을
                동시에 진행해 현장에서 결과물을 완성합니다.
              </p>
              <ul className="mt-7 space-y-3">
                {exPoints.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-fg">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/solution/xr-solution" variant="secondary">
                  EXLINK 자세히 →
                </Button>
                <Button href="/contact">도입 상담 →</Button>
              </div>
            </div>
            <figure className="overflow-hidden rounded-2xl border border-border">
              <Image
                src="/vp-workflow.png"
                alt="EX 버추얼 프로덕션 노드 기반 실시간 워크플로우"
                width={891}
                height={557}
                className="h-auto w-full"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* §05 Process */}
      <section className="container-ex py-section">
        <SectionLabel index="05">Process</SectionLabel>
        <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">제작 프로세스</h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <div key={p.step} className="rounded-2xl border border-border bg-surface p-6">
              <span className="font-mono text-3xl font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-semibold text-fg">{p.step}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* §06 Use Cases */}
      <section className="bg-surface/40">
        <div className="container-ex py-section">
          <SectionLabel index="06">Use Cases</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">활용 분야</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u) => (
              <div key={u.t} className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-semibold text-fg">{u.t}</h3>
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
