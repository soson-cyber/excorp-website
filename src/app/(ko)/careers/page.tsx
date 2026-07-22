import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { ComingSoon } from "@/components/page/ComingSoon";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

const applyMailto = `mailto:${site.contact.careersEmail}?subject=${encodeURIComponent(
  "[채용 지원] 이름 / 지원 분야",
)}`;

// 풀콘텐츠(가치·문화·공간·채용절차)는 src/app/careers/page.full.tsx.bak 에 보관 — 공개 시 복구.
export const metadata: Metadata = {
  title: "채용 — 함께 성장할 동료를 찾습니다",
  alternates: { canonical: "/careers", languages: { "ko-KR": "/careers", "en-US": "/en/careers", "x-default": "/careers" } },
  description:
    "이엑스(EX) 채용. 일하는 사람이 행복한 회사를 지향합니다. 채용 콘텐츠를 준비 중이며, 관심 직무가 있다면 먼저 문의해 주세요.",
};

export default function CareersPage() {
  return (
    <>
      <JsonLd schema={breadcrumbLd([{ name: "채용", path: "/careers" }])} />
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
            description="EX의 가치와 일하는 방식, 모집 포지션을 정리해 곧 공개합니다. 관심 직무가 있다면 이메일로 먼저 지원해 주세요."
            ctaHref={null}
          />

          <div className="mx-auto max-w-xl text-center">
            <Link href={applyMailto} className="btn btn--accent">
              이메일로 지원하기
            </Link>
            <p className="mx-auto mt-5 max-w-md text-pretty text-sm leading-relaxed text-faint">
              제출하신 이력서와 지원 서류는 채용 전형 목적으로만 이용하며, 전형 종료 후 1년 보관 뒤 파기합니다. 파기를
              원하시면 언제든 요청하실 수 있습니다.{" "}
              <Link href="/privacy" className="font-medium text-lav underline-offset-4 hover:underline">
                개인정보 처리방침
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
