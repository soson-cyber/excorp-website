import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import Image from "next/image";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { ProblemTrio } from "@/components/page/ProblemTrio";
import { SegmentGrid } from "@/components/page/SegmentGrid";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "XR 솔루션 구축 · 버추얼 프로덕션",
  alternates: { canonical: "/solution", languages: { "ko-KR": "/solution", "en-US": "/en/solution", "x-default": "/solution" } },
  description:
    "EX 자체 통합 XR 솔루션 EXLINK와 버추얼 프로덕션 구축. 촬영·트래킹·렌더·송출을 하나로 묶어 현장에 맞는 실시간 XR 환경을 구성하고, 도입 상담·견적부터 운영까지 지원합니다.",
};

const approach = [
  { k: "All-in-One", v: "통합 시스템" },
  { k: "Real-time", v: "1프레임 지연 목표" },
  { k: "Integrated", v: "단일 제어 UI" },
  { k: "End-to-End", v: "셋업·교육·운영" },
];

// Problem Quote Trio (§0-A) — XR 직접 구성 시 막히는 지점(고객 언어).
const problems = [
  { id: "PAIN 01", quote: "장비마다 규격이 달라 연동에서 막힙니다.", desc: "카메라·트래커·렌더·송출이 제각각이라 연동·동기화에 매번 시간이 듭니다." },
  { id: "PAIN 02", quote: "해외 솔루션은 영어 매뉴얼뿐, 문제가 생기면 대응이 늦습니다.", desc: "현장에서 문제가 터지면 본사 시차·언어 장벽으로 대응이 지연됩니다." },
  { id: "PAIN 03", quote: "구축은 됐는데 운영할 사람이 없습니다.", desc: "설치로 끝나면 장비가 창고에 잠깁니다. 직접 운영할 교육과 지원이 필요합니다." },
];

// 세그먼트 슬롯 (§0-C) — XR 솔루션이 맞는 곳.
const segments = [
  { tag: "방송 · 중계", d: "생중계에 실시간 XR·AR 그래픽을 더해야 하는 방송사·중계 프로덕션." },
  { tag: "기업 · 커머스", d: "세트 교체 없이 IR·웨비나·라이브커머스를 자체 무대에서 반복 운영하려는 기업." },
  { tag: "대학 · 교육", d: "버추얼 프로덕션을 직접 가르치고 실습 환경을 갖추려는 교육기관." },
];

// tech 항목 중 자체 페이지가 있는 것은 href로 바로가기 연결.
const capability: { step: string; parts: { label: string; href?: string }[] }[] = [
  {
    step: "촬영 · 트래킹",
    parts: [
      { label: "RETracker", href: "/product/retracker" },
      { label: "Moverse AI", href: "/product/moverse" },
    ],
  },
  {
    step: "합성 · 렌더",
    parts: [{ label: "Unreal Engine" }, { label: "Aximmetry", href: "/product/aximmetry" }],
  },
  {
    step: "미디어서버 · 송출",
    parts: [{ label: "EXLINK", href: "/solution/xr-solution" }],
  },
  {
    step: "라이브 연출 · 운영",
    parts: [{ label: "EXLINK", href: "/solution/xr-solution" }, { label: "전문 인력", href: "/xr-studio" }],
  },
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
      <JsonLd schema={breadcrumbLd([{ name: "Solution", path: "/solution" }])} />
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

      {/* Problem Quote Trio — XR을 직접 꾸리려다 멈추는 지점(§0-A) */}
      <ProblemTrio
        index="00"
        label="Before EX"
        title="XR을 직접 꾸리려다 멈춘 적, 있으십니까."
        problems={problems}
        note="EX는 자체 솔루션 EXLINK와 한국어 기술지원으로 이 지점을 메웁니다."
      />

      {/* §00 Hero media band — EXLINK 통합 솔루션 다이어그램 */}
      <section className="section section--ink">
        <div className="container-ex">
          <Image
            src="/exlink_solution.png"
            alt="EXLINK 통합 XR 솔루션 — 촬영·트래킹·렌더·송출을 하나로 연결하는 파이프라인 다이어그램"
            width={1672}
            height={941}
            sizes="(max-width: 1280px) 100vw, 1216px"
            className="h-auto w-full rounded-2xl border border-border"
          />
        </div>
      </section>

      {/* §01 Approach */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionHead
            index="01"
            label="Approach"
            titleMaxWidth="48rem"
            title={
              <>
                <span className="inline-block">자체 기술과 글로벌 파트너,</span>{" "}
                <span className="inline-block">두 축으로 모든 현장에 대응합니다.</span>
              </>
            }
            lead={
              <>
                EX는 자체 통합 솔루션과 검증된 파트너 제품, 그리고 실 운영 스튜디오까지 — VP 제작에 필요한
                자산을 보유하고 있습니다. 어떤 환경의 XR이라도 EX와 함께 시작할 수 있습니다.
              </>
            }
          />
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
          <SectionHead
            index="02"
            label="Two Routes"
            titleMaxWidth="48rem"
            title={
              <>
                <span className="inline-block">자체 솔루션과 방법론,</span>{" "}
                <span className="inline-block">두 갈래로 시작합니다.</span>
              </>
            }
          />
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
          <SectionHead index="03" label="Capability" title="제작 전 단계를 커버합니다" />
          <div className="card mt-12" style={{ overflow: "hidden", padding: 0 }}>
            {capability.map((c, i) => (
              <div
                key={c.step}
                className="flex flex-col gap-1 p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8"
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-border)" }}
              >
                <span className="text-lg font-semibold text-fg">{c.step}</span>
                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                  {c.parts.map((p, j) => (
                    <span key={p.label + j}>
                      {j > 0 && <span aria-hidden="true"> · </span>}
                      {p.href ? (
                        <Link
                          href={p.href}
                          className="underline-offset-4 transition-colors hover:text-lav hover:underline"
                        >
                          {p.label} ↗
                        </Link>
                      ) : (
                        p.label
                      )}
                    </span>
                  ))}
                </span>
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

      {/* Segment slot — 이런 곳에 맞습니다 (§0-C) */}
      <SegmentGrid index="05" segments={segments} />

      <CtaBanner />
    </>
  );
}
