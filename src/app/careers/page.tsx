import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { ComingSoon } from "@/components/page/ComingSoon";
import { CtaBanner } from "@/components/layout/CtaBanner";

// 풀콘텐츠(가치·문화·공간·채용절차)는 src/app/careers/page.full.tsx.bak 에 보관 — 공개 시 복구.
export const metadata: Metadata = {
  title: "채용 — 함께 성장할 동료를 찾습니다",
  alternates: { canonical: "/careers" },
  description:
    "이엑스(EX) 채용. 일하는 사람이 행복한 회사를 지향합니다. 채용 콘텐츠를 준비 중이며, 관심 직무가 있다면 먼저 문의해 주세요.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Career", href: "/careers" }]}
        tag="Career"
        title="일하는 사람이 행복한 회사."
        lead="모두의 창작 가능성을 넓히는 기술을 함께 만들 동료를 찾습니다. 채용 안내를 준비하고 있습니다."
      />

      <section className="section section--ink section--glow">
        <div className="container-ex">
          <ComingSoon
            title="채용 안내를 준비하고 있습니다"
            description="EX의 가치와 일하는 방식, 모집 포지션을 정리해 곧 공개합니다. 관심 직무가 있다면 먼저 문의해 주세요."
          />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
