import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { ComingSoon } from "@/components/page/ComingSoon";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { works } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work — 도입 사례 · 활용 시나리오",
  alternates: { canonical: "/work", languages: { "ko-KR": "/work", "en-US": "/en/work", "x-default": "/work" } },
  description:
    "검증된 EX 도입 사례는 고객 공개 승인을 거쳐 순차적으로 공개합니다. 현재는 방송·컨퍼런스·IR·웨비나·패션·버추얼 세트 분야의 활용 시나리오와 기대 효과를 확인할 수 있습니다.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Work", href: "/work" }]}
        tag="Work"
        title="EX의 기술로 무엇을 만들 수 있는가"
        lead="검증된 실제 도입 사례는 준비 중입니다. 아래에는 EX 솔루션을 업종별로 적용하는 방법을 활용 시나리오로 공개합니다."
      />

      <section className="section section--ink section--glow">
        <div className="container-ex">
          <ComingSoon
            title="도입 사례를 준비하고 있습니다"
            description="GS리테일 홈쇼핑 XR 시스템 등 EX가 진행한 프로젝트를 정리해 순차적으로 공개합니다. 먼저 상담이 필요하시면 언제든 문의해 주세요."
          />
        </div>
      </section>

      <section className="section section--surface">
        <div className="container-ex">
          <SectionLabel index="01">Use Scenarios</SectionLabel>
          <div className="mt-5 max-w-3xl">
            <h2 className="text-balance text-2xl font-bold text-fg md:text-3xl">업종별 활용 시나리오</h2>
            <p className="mt-4 leading-relaxed text-muted">
              아래 콘텐츠는 실제 고객 사례가 아닌 적용 예시입니다. 기대 효과는 구성·환경에 따라 달라지며,
              검증된 프로젝트 실적은 고객 공개 승인을 거쳐 별도로 게시합니다.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((work) => (
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
                  <span className="font-mono text-[11px] uppercase tracking-wider text-lav">활용 시나리오</span>
                  <h3 className="mt-1.5 font-semibold text-fg">{work.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{work.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
