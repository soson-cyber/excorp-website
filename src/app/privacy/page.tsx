import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "이엑스 주식회사 개인정보 처리방침.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Privacy Policy", href: "/privacy" }]}
        title="개인정보 처리방침"
        lead="이엑스 주식회사의 개인정보 처리방침입니다."
      />
      <section className="container-ex py-section">
        <div className="rounded-2xl border border-border bg-card p-8 text-muted">
          <p className="font-mono text-xs uppercase tracking-wider text-faint">준비 중</p>
          <p className="mt-4 max-w-2xl text-pretty">
            개인정보 처리방침 전문은 법무 검토 후 게시될 예정입니다. 문의 사항은{" "}
            <span className="text-fg">contact@excorp.kr</span> 로 연락 주시기 바랍니다.
          </p>
        </div>
      </section>
    </>
  );
}
