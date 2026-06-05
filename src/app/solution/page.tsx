import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MediaBlank } from "@/components/ui/MediaBlank";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata: Metadata = {
  title: "XR 솔루션 · 버추얼 프로덕션",
  alternates: { canonical: "/solution" },
  description:
    "EX 자체 통합 XR 솔루션 EXLINK와 버추얼 프로덕션. 촬영·트래킹·렌더·송출을 하나로 묶어 현장에 맞는 실시간 XR 환경을 구성하고, 도입 상담부터 운영까지 지원합니다.",
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
  { n: "6+", l: "기술 특허" },
  { n: "3", l: "글로벌 파트너" },
  { n: "3", l: "대학 MOU" },
  { n: "4", l: "제품 인증" },
];

export default function SolutionPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Solution", href: "/solution" }]}
        tag="Solution"
        title="현장에 맞는 XR 환경을 구성합니다."
        lead={
          <>
            <span className="inline-block">자체 통합 솔루션 EXLINK와 검증된 글로벌 파트너 기술, 그리고 실 운영 스튜디오까지</span>{" "}
            <span className="inline-block">— 콘텐츠 제작의 처음과 끝을 지원합니다.</span>
          </>
        }
      />

      {/* §00 Hero media band — 풀블리드 루프영상 자리 */}
      <section className="section section--ink">
        <div className="container-ex">
          <MediaBlank
            ratio="16/9"
            kind="video"
            tag="EX · INTEGRATED XR PIPELINE"
            label="EX 통합 XR 파이프라인"
            sublabel="촬영 → 트래킹 → 렌더 → 송출 · 영상 준비 중"
            className="w-full"
          />
        </div>
      </section>

      {/* §01 Approach */}
      <section className="section section--ink">
        <div className="container-ex">
          <SectionLabel index="01">Approach</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22, maxWidth: "48rem" }}>
            <span className="inline-block">자체 기술과 글로벌 파트너,</span>{" "}
            <span className="inline-block">두 축으로 모든 현장에 대응합니다.</span>
          </h2>
          <p className="lead" style={{ maxWidth: "42rem" }}>
            EX는 자체 통합 솔루션과 검증된 파트너 제품, 그리고 실 운영 스튜디오까지 — VP 제작에 필요한
            자산을 보유하고 있습니다. 어떤 환경의 XR이라도 EX와 함께 시작할 수 있습니다.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {approach.map((a) => (
              <div key={a.k} className="card" style={{ padding: 22 }}>
                <span className="cap" style={{ color: "var(--color-lav)" }}>
                  {a.k}
                </span>
                <p className="mt-2 text-base font-semibold text-fg">{a.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §02 Two Routes */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionLabel index="02">Two Routes</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22, maxWidth: "48rem" }}>
            <span className="inline-block">자체 솔루션과 방법론,</span>{" "}
            <span className="inline-block">두 갈래로 시작합니다.</span>
          </h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <Link
              href="/solution/xr-solution"
              className="card group relative flex flex-col justify-between lg:col-span-2"
              style={{ padding: 32 }}
            >
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-lav">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                  EX Original
                </span>
                <h3 className="mt-5 text-3xl font-bold text-fg">
                  XR Solution <span className="text-lav">EXLINK</span>
                </h3>
                <p className="mt-4 max-w-xl text-muted">
                  카메라·트래커·모션센서·네트워크·미디어서버를 하나의 제어 흐름으로 묶는 EX 자체 개발 통합 XR
                  솔루션. 운영자 1인 중심으로 운용합니다.
                </p>
              </div>
              <span className="arrowlink arrowlink--accent" style={{ marginTop: 32 }}>
                EXLINK 자세히 보기{" "}
                <span className="ar" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
            <Link href="/solution/virtual-production" className="card group flex flex-col justify-between" style={{ padding: 32 }}>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-lav">Methodology</span>
                <h3 className="mt-3 text-2xl font-semibold text-fg">Virtual Production</h3>
                <p className="mt-3 text-muted">
                  촬영·합성·연출이 동시에 일어나는 영상 제작 기법. 크로마키·실시간 XR 트래킹·AR·ICVFX·LED Wall.
                </p>
              </div>
              <span className="arrowlink" style={{ marginTop: 32 }}>
                제작 방식 알아보기{" "}
                <span className="ar" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* §03 Capability */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="03">Capability</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            제작 전 단계를 커버합니다
          </h2>
          <div className="card mt-12" style={{ overflow: "hidden", padding: 0 }}>
            {capability.map((c, i) => (
              <div
                key={c.step}
                className="flex flex-col gap-1 p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8"
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-border)" }}
              >
                <span className="text-lg font-semibold text-fg">{c.step}</span>
                <span className="font-mono text-xs uppercase tracking-wider text-muted">{c.tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §04 Proof */}
      <section className="section section--surface section--glow">
        <div className="container-ex">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {proof.map((p) => (
              <div key={p.l} className="text-center">
                <p className="font-mono text-4xl font-bold text-lav tabular-nums md:text-5xl">{p.n}</p>
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
