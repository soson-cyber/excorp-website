import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "이엑스 주식회사 이용약관.",
  alternates: { canonical: "/terms" },
};

const EFFECTIVE_DATE = "2026년 6월 11일";

export default function TermsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Terms of Use", href: "/terms" }]}
        title="이용약관"
        lead={`이엑스 주식회사 웹사이트 이용약관입니다. (시행일: ${EFFECTIVE_DATE})`}
      />

      <section className="container-ex py-section">
        <div className="mx-auto max-w-3xl space-y-12 text-[0.975rem] leading-[1.85] text-muted">
          {/* 제1조 목적 */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">제1조 (목적)</h2>
            <p className="text-pretty">
              본 약관은 이엑스 주식회사(이하 &ldquo;회사&rdquo;)가 운영하는 웹사이트(이하 &ldquo;사이트&rdquo;)의
              이용과 관련하여 회사와 이용자 간의 권리·의무 및 책임 사항을 규정하는 것을 목적으로 합니다.
            </p>
          </article>

          {/* 제2조 정의 */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">제2조 (정의)</h2>
            <p className="text-pretty">본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-lav">
              <li>
                <span className="font-medium text-fg">&ldquo;사이트&rdquo;</span>란 회사가 회사·제품·솔루션 정보를
                제공하고 문의를 접수하기 위해 운영하는 웹사이트를 말합니다.
              </li>
              <li>
                <span className="font-medium text-fg">&ldquo;이용자&rdquo;</span>란 사이트에 접속하여 본 약관에 따라
                회사가 제공하는 서비스를 이용하는 자를 말합니다.
              </li>
            </ul>
          </article>

          {/* 제3조 약관의 게시와 개정 */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">제3조 (약관의 게시와 개정)</h2>
            <p className="text-pretty">
              회사는 본 약관의 내용을 이용자가 쉽게 확인할 수 있도록 사이트에 게시합니다. 회사는 관련 법령을 위배하지
              않는 범위에서 본 약관을 개정할 수 있으며, 개정 시에는 적용 일자 및 개정 사유를 명시하여 시행일 전부터
              사이트에 공지합니다.
            </p>
          </article>

          {/* 제4조 제공 서비스 */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">제4조 (제공 서비스)</h2>
            <p className="text-pretty">회사가 사이트를 통해 제공하는 서비스는 다음과 같습니다.</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-lav">
              <li>회사·제품·솔루션에 관한 정보의 제공</li>
              <li>문의 폼을 통한 상담·도입 문의의 접수 및 응대</li>
            </ul>
          </article>

          {/* 제5조 서비스의 변경 및 중단 */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">제5조 (서비스의 변경 및 중단)</h2>
            <p className="text-pretty">
              회사는 서비스의 내용을 변경하거나, 시스템 점검·교체, 기술적 사유, 천재지변 등 부득이한 사유가 있는
              경우 서비스의 전부 또는 일부를 중단할 수 있습니다. 이 경우 회사는 가능한 범위에서 사전에 사이트를 통해
              이를 공지합니다.
            </p>
          </article>

          {/* 제6조 지식재산권 */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">제6조 (지식재산권)</h2>
            <p className="text-pretty">
              사이트에 게시된 콘텐츠(텍스트, 이미지, 디자인, 로고 등)에 대한 저작권 및 기타 지식재산권은 회사에
              귀속됩니다. 이용자는 회사의 사전 서면 동의 없이 이를 복제·배포·전송·출판하거나 영리 목적으로 이용할 수
              없습니다.
            </p>
            <p className="text-pretty">
              사이트에 표시된 파트너 제품의 명칭 및 상표(Aximmetry, Moverse AI, RETracker, Unreal Engine 등)에 대한
              권리는 각 권리자에게 있으며, 회사는 식별 목적으로만 이를 사용합니다.
            </p>
          </article>

          {/* 제7조 이용자의 의무 */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">제7조 (이용자의 의무)</h2>
            <p className="text-pretty">이용자는 다음 각 호의 행위를 하여서는 안 됩니다.</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-lav">
              <li>타인의 정보를 도용하거나 허위 정보를 입력하는 행위</li>
              <li>회사의 콘텐츠에 대한 권리를 침해하는 행위</li>
              <li>사이트의 정상적인 운영을 방해하는 행위(부정 접근, 자동화된 대량 요청 등)</li>
              <li>법령 또는 본 약관이 금지하는 행위</li>
            </ul>
          </article>

          {/* 제8조 제3자 정보 및 외부 링크 */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">제8조 (제3자 정보 및 외부 링크)</h2>
            <p className="text-pretty">
              사이트에 게시된 파트너 제품의 사양·기능 등 정보는 각 제조사가 제공하는 자료를 기반으로 작성되며, 해당
              정보는 제조사의 사정에 따라 사전 고지 없이 변경될 수 있습니다. 정확한 최신 정보는 각 제조사의 공식
              자료를 통해 확인하시기 바랍니다.
            </p>
            <p className="text-pretty">
              사이트가 외부 사이트로 연결되는 링크를 제공하는 경우, 회사는 해당 외부 사이트의 콘텐츠 및 운영에 대하여
              책임을 지지 않습니다.
            </p>
          </article>

          {/* 제9조 면책 조항 */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">제9조 (면책 조항)</h2>
            <p className="text-pretty">
              회사는 천재지변, 정전, 통신 서비스 장애 등 회사의 합리적인 통제를 벗어난 사유로 서비스를 제공할 수 없는
              경우 그에 대한 책임을 지지 않습니다. 회사는 이용자가 사이트의 정보를 신뢰하여 행한 판단·결정에 대하여
              관련 법령이 허용하는 범위에서 책임을 지지 않습니다.
            </p>
          </article>

          {/* 제10조 개인정보 보호 */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">제10조 (개인정보 보호)</h2>
            <p className="text-pretty">
              회사는 이용자의 개인정보를 보호하기 위해 노력하며, 개인정보의 수집·이용·보관 등에 관한 사항은 회사의{" "}
              <a href="/privacy" className="font-medium text-lav underline-offset-4 hover:underline">
                개인정보 처리방침
              </a>
              에 따릅니다.
            </p>
          </article>

          {/* 제11조 준거법 및 관할 */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">제11조 (준거법 및 관할)</h2>
            <p className="text-pretty">
              본 약관 및 서비스 이용과 관련한 사항에는 대한민국 법을 적용합니다. 서비스 이용과 관련하여 회사와 이용자
              간에 분쟁이 발생한 경우, 「민사소송법」에 따른 관할 법원을 제1심 관할 법원으로 합니다.
            </p>
          </article>

          {/* 부칙 */}
          <article className="space-y-3 border-t border-border pt-8">
            <h2 className="text-xl font-bold text-fg">부칙</h2>
            <p className="text-pretty">본 약관은 {EFFECTIVE_DATE}부터 시행합니다.</p>
          </article>
        </div>
      </section>
    </>
  );
}
