import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { ComingSoon } from "@/components/page/ComingSoon";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { works, type WorkCase } from "@/lib/work";

// 신뢰 대안 블록 (리디자인 A · P1-5) — 사례 갤러리 게이트는 유지하고,
// 공개 전에도 확인 가능한 것(진행 방식·구성 예시·스튜디오 시연)으로 신뢰 공백을 메운다.
const processSteps = [
  { t: "상담·현장 진단", d: "목표와 현장 조건을 함께 확인합니다." },
  { t: "구성 설계·견적", d: "현장에 맞는 장비·솔루션 구성을 설계합니다." },
  { t: "구축·연동", d: "설치와 시스템 연동, 테스트까지 진행합니다." },
  { t: "교육·운영 이관", d: "운영 인력을 교육해 현장에 이관하고, 이후를 지원합니다." },
];

const configExamples = [
  { t: "생방송 스튜디오 XR 시스템", d: "실시간 트래킹·합성·송출을 하나의 흐름으로 구성합니다." },
  { t: "대학 실습실 버추얼 프로덕션 환경", d: "교육 과정에서 직접 다루는 실습용 장비 구성을 만듭니다." },
  { t: "기업 스테이지 상시 운영 구성", d: "세트 교체 없이 반복 행사를 소화하는 구성을 만듭니다." },
];

export const metadata: Metadata = {
  title: "Work — 고객 사례 · 포트폴리오",
  alternates: { canonical: "/work", languages: { "ko-KR": "/work", "en-US": "/en/work", "x-default": "/work" } },
  description:
    "EX 고객 사례와 포트폴리오를 업로드 준비 중입니다. 고객 공개 승인을 거쳐 순차적으로 공개하며, 프로젝트 상담은 언제든 문의해 주세요.",
};

function WorkGrid({ items }: { items: WorkCase[] }) {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((work) => (
        <Link
          key={work.slug}
          href={`/work/${work.slug}`}
          className="card group"
          style={{ overflow: "hidden", padding: 0 }}
        >
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={work.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
          <div className="p-5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-lav">
              {work.kind === "scenario" ? "활용 시나리오" : "도입 사례"}
            </span>
            <h3 className="mt-1.5 font-semibold text-fg">{work.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{work.summary}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function WorkPage() {
  const verifiedCases = works.filter((work) => work.kind === "case");

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Work", href: "/work" }]}
        tag="Work"
        title="EX의 기술로 무엇을 만들 수 있는가"
        lead="고객 사례와 포트폴리오를 업로드 준비 중입니다. 고객 공개 승인을 거쳐 순차적으로 공개합니다."
      />

      <section className="section section--ink section--glow">
        <div className="container-ex">
          {verifiedCases.length > 0 ? (
            <>
              <SectionLabel index="01">Verified Cases</SectionLabel>
              <h2 className="mt-5 text-balance text-2xl font-bold text-fg md:text-3xl">검증된 도입 사례</h2>
              <WorkGrid items={verifiedCases} />
            </>
          ) : (
            <ComingSoon
              title="고객 사례·포트폴리오 업로드 준비 중"
              description="GS리테일 홈쇼핑 XR 시스템 등 EX가 진행한 프로젝트를 정리해 순차적으로 공개합니다. 먼저 상담이 필요하시면 언제든 문의해 주세요."
            />
          )}
        </div>
      </section>

      {/* 신뢰 대안 블록 — 사례 공개 전에도 확인할 수 있는 것 (갤러리 재오픈 아님) */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index={verifiedCases.length > 0 ? "02" : "01"}>In the Meantime</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            사례 공개 전에도 확인할 수 있습니다
          </h2>
          <p className="lead" style={{ maxWidth: "42rem" }}>
            프로젝트는 아래 과정으로 진행합니다. 실제 운영 환경은 하남 스튜디오에서 직접 보여드립니다.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <div key={s.t} className="card" style={{ padding: 24 }}>
                <span className="font-mono text-2xl font-bold text-faint tabular-nums">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold text-fg">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="card" style={{ padding: 28 }}>
              <span className="font-mono text-[11px] uppercase tracking-wider text-lav">Configurations</span>
              <h3 className="mt-3 text-xl font-semibold text-fg">이런 구성을 진행해 왔습니다</h3>
              <ul className="mt-5 space-y-4">
                {configExamples.map((c) => (
                  <li key={c.t} className="border-l-2 border-border pl-4">
                    <p className="font-medium text-fg">{c.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{c.d}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-faint">
                고객 공개 승인 전까지 구성 수준으로만 소개합니다.
              </p>
            </div>
            <div className="card flex flex-col justify-between" style={{ padding: 28 }}>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-lav">See It Running</span>
                <h3 className="mt-3 text-xl font-semibold text-fg">하남 스튜디오에서 직접 확인하세요</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  문서 대신 실제 화면으로 보여드립니다. 하남 EX 스튜디오에서 실시간 XR 데모 시연과 기술 상담을 무료로 진행합니다. 방문이 어려우시면 화상 데모로 진행합니다.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/xr-studio" variant="accent">
                  스튜디오 둘러보기 →
                </Button>
                <Button href={`/contact?type=${encodeURIComponent("시연·쇼룸 방문")}#form`} variant="secondary">
                  시연 예약 →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
