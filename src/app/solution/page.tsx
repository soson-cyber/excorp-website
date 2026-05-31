import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata: Metadata = {
  title: "Solution — XR Solution & Virtual Production",
  description:
    "EX의 자체 통합 XR 솔루션 EXLINK와 버추얼 프로덕션 방법론. 현장에 맞는 최적의 실시간 XR 환경을 구성합니다.",
};

const approach = [
  { k: "All-in-One", v: "통합 시스템" },
  { k: "Real-time", v: "1프레임 미만" },
  { k: "Integrated", v: "단일 제어 UI" },
  { k: "End-to-End", v: "셋업·교육·운영" },
];

const capability = [
  { step: "촬영 · 트래킹", tech: "RETracker · Moverse AI" },
  { step: "합성 · 렌더", tech: "Unreal Engine · Aximmetry" },
  { step: "미디어서버 · 송출", tech: "EXLINK" },
  { step: "라이브 연출 · 운영", tech: "EXLINK · 전문 인력" },
];

const proof = [
  { n: "6+", l: "Tech Patents" },
  { n: "3", l: "Global Partners" },
  { n: "3", l: "University MOU" },
  { n: "4", l: "Certifications" },
];

export default function SolutionPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Solution", href: "/solution" }]}
        tag="Solution"
        title="현장에 맞는 최적의 XR 환경을 구성합니다."
        lead="자체 통합 솔루션 EXLINK와 검증된 글로벌 파트너 기술, 그리고 실 운영 스튜디오까지 — 콘텐츠 제작의 처음과 끝을 지원합니다."
      />

      {/* §01 Approach */}
      <section className="container-ex py-section">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel index="01">Approach</SectionLabel>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-snug md:text-5xl">
              자체 기술과 글로벌 파트너, 양손 전략으로 모든 현장에 대응합니다.
            </h2>
            <p className="mt-5 text-pretty text-muted">
              EX는 자체 통합 솔루션과 검증된 파트너 제품, 그리고 실 운영 스튜디오까지 — VP 제작에 필요한
              모든 자산을 보유하고 있습니다. 어떤 환경의 XR이라도 EX와 함께 시작할 수 있습니다.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-px self-center overflow-hidden rounded-2xl border border-border bg-border">
            {approach.map((a) => (
              <div key={a.k} className="bg-surface p-6">
                <dt className="font-mono text-xs uppercase tracking-wider text-primary">{a.k}</dt>
                <dd className="mt-1.5 text-sm font-medium text-fg">{a.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* §02 Two Routes (asymmetric) */}
      <section className="bg-surface/40">
        <div className="container-ex py-section-lg">
          <SectionLabel index="02">Two Routes</SectionLabel>
          <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-snug md:text-5xl">
            자체 솔루션과 방법론, 두 갈래로 시작합니다.
          </h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <Link
              href="/solution/xr-solution"
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-primary/40 bg-surface p-8 transition-colors hover:border-primary lg:col-span-2"
            >
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-primary">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                  EX Original
                </span>
                <h3 className="mt-5 text-3xl font-bold">
                  XR Solution <span className="text-primary">EXLINK</span>
                </h3>
                <p className="mt-4 max-w-xl text-muted">
                  카메라·트래커·모션센서·네트워크·미디어서버를 하나의 제어 흐름으로 묶는 EX의 통합 XR 솔루션.
                </p>
              </div>
              <span className="relative mt-8 font-medium text-primary transition-transform group-hover:translate-x-1">
                View Solution →
              </span>
            </Link>
            <Link
              href="/solution/virtual-production"
              className="group flex flex-col justify-between rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-primary/60"
            >
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                  Methodology
                </span>
                <h3 className="mt-3 text-2xl font-semibold">Virtual Production</h3>
                <p className="mt-3 text-muted">
                  촬영·합성·연출이 동시에 일어나는 신개념 영상 제작 기법. ICVFX·LED·크로마키·AR·XR.
                </p>
              </div>
              <span className="mt-8 font-medium text-primary transition-transform group-hover:translate-x-1">
                Learn VP →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* §03 Capability Matrix (directory rows) */}
      <section className="container-ex py-section">
        <SectionLabel index="03">Capability</SectionLabel>
        <h2 className="mt-5 text-balance text-4xl font-semibold md:text-5xl">제작 전 단계를 커버합니다</h2>
        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-surface">
          {capability.map((c) => (
            <div
              key={c.step}
              className="flex flex-col gap-1 border-b border-border p-6 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:px-8"
            >
              <span className="text-lg font-semibold">{c.step}</span>
              <span className="font-mono text-xs uppercase tracking-wider text-muted">{c.tech}</span>
            </div>
          ))}
        </div>
      </section>

      {/* §04 Proof */}
      <section className="bg-surface/40">
        <div className="container-ex py-section-sm">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {proof.map((p) => (
              <div key={p.l} className="text-center">
                <p className="font-mono text-4xl font-bold text-primary">{p.n}</p>
                <p className="mt-2 text-sm text-muted">{p.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
