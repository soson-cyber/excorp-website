import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { ComingSoon } from "@/components/page/ComingSoon";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata: Metadata = {
  title: "Work — 활용 사례 · 포트폴리오",
  alternates: { canonical: "/work", languages: { "ko-KR": "/work", "en-US": "/en/work", "x-default": "/work" } },
  description:
    "EX의 실시간 XR 솔루션·파트너 제품·하남 스튜디오로 진행한 도입 사례를 순차적으로 공개합니다. 방송·컨퍼런스·IR·웨비나·패션·버추얼 세트 등 분야별 프로젝트 상담은 지금 바로 가능합니다.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Work", href: "/work" }]}
        tag="Work"
        title="EX의 기술로 무엇을 만들 수 있는가"
        lead="실제 도입 사례를 준비하고 있습니다. 분야별 활용 방식은 순차적으로 공개하며, 프로젝트 상담은 지금 바로 가능합니다."
      />

      <section className="section section--ink section--glow">
        <div className="container-ex">
          <ComingSoon
            title="도입 사례를 준비하고 있습니다"
            description="GS리테일 홈쇼핑 XR 시스템 등 EX가 진행한 프로젝트를 정리해 순차적으로 공개합니다. 먼저 상담이 필요하시면 언제든 문의해 주세요."
          />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
