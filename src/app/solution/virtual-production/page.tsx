import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata: Metadata = {
  title: "Virtual Production — 촬영하는 순간 완성되는 영상 제작",
  alternates: { canonical: "/solution/virtual-production" },
  description:
    "버추얼 프로덕션은 디지털 배경과 실제 촬영을 실시간으로 결합해 현장에서 완성하는 제작 방식입니다. 크로마키·Simulcam·ICVFX·AR까지, EX는 RETracker·Moverse·Aximmetry·EXLINK와 하남 XR 스튜디오를 하나의 파이프라인으로 연결합니다.",
};

// UE 워크플로우(World Capture → Performance Capture → Simulcam → ICVFX)를 EX 실보유·총판 자산에 매핑
const pipeline: { stage: string; t: string; tech: string; d: string; href?: string }[] = [
  { stage: "01", t: "카메라 트래킹", tech: "RETracker", d: "카메라의 6-DOF 위치·방향을 실시간 추적해 배경 정합의 기준을 만듭니다.", href: "/product/retracker" },
  { stage: "02", t: "퍼포먼스 캡처", tech: "Moverse", d: "배우 동작을 마커리스로 캡처해 CG 캐릭터를 구동합니다.", href: "/product/moverse" },
  { stage: "03", t: "실시간 렌더 · 합성", tech: "Aximmetry · Unreal", d: "가상 배경을 실시간 렌더해 실사와 프레임 단위로 정합·합성합니다.", href: "/product/aximmetry" },
  { stage: "04", t: "통합 · 송출", tech: "EXLINK", d: "촬영·트래킹·렌더·송출을 하나의 제어 흐름으로 운영합니다.", href: "/solution/xr-solution" },
  { stage: "05", t: "촬영 스테이지", tech: "하남 XR Studio", d: "대형 그린 크로마(W10×D7×H4)에서 촬영을 진행합니다.", href: "/xr-studio" },
];

const exPoints = [
  "올인원 실시간 솔루션 EXLINK — 가상 배경 제작부터 실시간 합성·운영까지 하나로",
  "검증된 파트너 기술 연결 — Aximmetry · Moverse · RETracker를 프로젝트에 맞게 결합",
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
        lead="디지털 배경과 실제 촬영을 실시간으로 결합해, 제작자가 라이브 액션처럼 현장에서 직접 연출하고 완성합니다. 길고 복잡한 후반 작업이 필요 없습니다."
      />

      {/* §01 What is VP */}
      <section className="section section--ink section--glow">
        <div className="container-ex">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <figure className="card" style={{ overflow: "hidden", padding: 0 }}>
              <Image src="/xr-studio.jpg" alt="가상 배경 위에서 완성되는 XR 콘텐츠 — 하남 XR 스튜디오 버추얼 프로덕션" width={1672} height={941} priority className="h-auto w-full" />
            </figure>
            <div>
              <SectionLabel index="01">What is VP</SectionLabel>
              <h2 className="h2" style={{ marginTop: 22 }}>
                버추얼 프로덕션이란?
              </h2>
              <p className="lead" style={{ maxWidth: "36rem" }}>
                버추얼 프로덕션(Virtual Production)은 디지털 세계와 물리 세계를 실시간으로 결합하는 제작 방식입니다. 컴퓨터로 만든 가상 배경·세트를 실제 촬영과 그 자리에서 합쳐, 제작자가 라이브 액션을 다루듯 디지털 과정을 직접 연출합니다. 카메라가 움직여도 배경이 자연스럽게 따라오고, 긴 후반 작업 없이 현장에서 결과를 확인합니다.
              </p>
              <p className="mt-6 border-l-2 border-primary pl-4 text-lg font-medium text-fg">
                가상 배경 위에서 실제로 촬영하고, 그 자리에서 완성하는 영상 제작 방식.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §02 VP Pipeline — EX 자산 매핑 */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead
            index="02"
            label="VP Pipeline"
            title="VP 전 단계를 EX 자산으로 잇습니다"
            lead="카메라 트래킹부터 퍼포먼스 캡처·실시간 렌더·송출까지, 버추얼 프로덕션의 각 단계를 EX의 솔루션과 파트너 기술로 연결합니다."
            leadMaxWidth="46rem"
          />
          <figure className="card mt-10 overflow-hidden" style={{ padding: 0 }}>
            <Image
              src="/vp-workflow-diagram.png"
              alt="버추얼 프로덕션 제작 흐름 — Preproduction(Story·Physical Art·Virtual Art·Visual Effects) → Production(Filming·Visualization·Hybrid Camera·Motion Capture·LED Live Action) → Postproduction(Editing·Post VFX) → Showtime"
              width={1672}
              height={941}
              sizes="(max-width: 768px) 100vw, 1100px"
              className="h-auto w-full"
            />
          </figure>
          <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pipeline.map((p) => {
              const inner = (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-sm font-bold text-lav tabular-nums">{p.stage}</span>
                    <span className="rounded-full border border-border bg-card px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                      {p.tech}
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold text-fg">{p.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
                  {p.href && (
                    <span className="arrowlink mt-4 text-sm">
                      자세히 보기{" "}
                      <span className="ar" aria-hidden="true">
                        →
                      </span>
                    </span>
                  )}
                </>
              );
              return p.href ? (
                <li key={p.stage}>
                  <Link href={p.href} className="card group flex h-full flex-col" style={{ padding: 24 }}>
                    {inner}
                  </Link>
                </li>
              ) : (
                <li key={p.stage} className="card flex flex-col" style={{ padding: 24 }}>
                  {inner}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* §05 EX Virtual Production */}
      <section className="section section--white">
        <div className="container-ex">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel index="03">EX Virtual Production</SectionLabel>
              <h2 className="h2" style={{ marginTop: 22 }}>
                EX의 버추얼 프로덕션
              </h2>
              <p className="lead" style={{ maxWidth: "36rem" }}>
                EX는 자체 솔루션 EXLINK, 검증된 파트너 기술, 그리고 하남 XR 스튜디오를 하나의 제작 파이프라인으로 연결합니다. 대형 그린 크로마(W10m×D7m×H4m)와 시네마 카메라, 실시간 XR 트래킹을 기반으로 촬영과 합성을 동시에 진행해 현장에서 결과물을 완성합니다.
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
                <Button href="/solution/xr-solution" variant="glow">
                  EXLINK 자세히 →
                </Button>
                <Button href="/contact">도입 상담 →</Button>
              </div>
            </div>
            <figure className="card" style={{ overflow: "hidden", padding: 0 }}>
              <Image src="/vp-workflow.png" alt="EX 버추얼 프로덕션 노드 기반 실시간 워크플로우" width={891} height={557} className="h-auto w-full" />
            </figure>
          </div>
        </div>
      </section>

      {/* §06 Process */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead index="04" label="Process" title="제작 프로세스" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <div key={p.step} className="card" style={{ padding: 24 }}>
                <span className="font-mono text-3xl font-bold text-lav tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-semibold text-fg">{p.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §07 Use Cases */}
      <section className="section section--white section--glow">
        <div className="container-ex">
          <SectionHead index="05" label="Use Cases" title="활용 분야" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u) => (
              <div key={u.t} className="card" style={{ padding: 24 }}>
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
