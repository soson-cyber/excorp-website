import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { WorkGallery } from "@/components/work/WorkGallery";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata: Metadata = {
  title: "Work — 활용 사례 · 포트폴리오",
  alternates: { canonical: "/work", languages: { "ko-KR": "/work", "en-US": "/en/work", "x-default": "/work" } },
  description:
    "EX의 실시간 XR 솔루션·파트너 제품·하남 스튜디오 활용 시나리오를 방송·컨퍼런스·IR·웨비나·패션·버추얼 세트 등 분야별로 정리했습니다. 프로젝트 상담은 지금 바로 가능합니다.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Work", href: "/work" }]}
        tag="Work"
        title="EX의 기술로 무엇을 만들 수 있는가"
        lead="방송·컨퍼런스·IR·웨비나·패션·버추얼 세트까지, EX의 실시간 XR이 현장에서 어떻게 쓰이는지 분야별 활용 시나리오로 정리했습니다. 프로젝트 상담은 지금 바로 가능합니다."
      />

      <section className="section section--ink section--glow">
        <div className="container-ex">
          <WorkGallery />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
