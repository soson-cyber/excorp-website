import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "이엑스 주식회사 이용약관.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Terms of Use", href: "/terms" }]}
        title="이용약관"
        lead="이엑스 주식회사 웹사이트 이용약관입니다."
      />
      <section className="container-ex py-section">
        <div className="rounded-2xl border border-border bg-white p-8 text-muted">
          <p className="font-mono text-xs uppercase tracking-wider text-faint">준비 중</p>
          <p className="mt-4 max-w-2xl text-pretty">
            이용약관 전문은 법무 검토 후 게시될 예정입니다. 문의 사항은{" "}
            <span className="text-fg">soson@excorp.kr</span> 로 연락 주시기 바랍니다.
          </p>
        </div>
      </section>
    </>
  );
}
