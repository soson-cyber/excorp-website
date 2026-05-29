import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { WorkGallery } from "@/components/work/WorkGallery";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata: Metadata = {
  title: "Work — 도입 사례 · 포트폴리오",
  description:
    "EX의 실시간 XR 솔루션·파트너 제품·스튜디오로 완성한 프로젝트와 포트폴리오. 방송·이벤트·패션·버추얼 프로덕션 도입 사례를 소개합니다.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Work", href: "/work" }]}
        tag="Work"
        title="기술이 만든 결과, 도입 사례로 증명합니다."
        lead="EX의 실시간 XR 솔루션과 파트너 제품, 그리고 스튜디오로 완성한 프로젝트와 포트폴리오입니다."
      />

      <WorkGallery />

      <CtaBanner />
    </>
  );
}
