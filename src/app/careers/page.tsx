import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { MediaBlank } from "@/components/ui/MediaBlank";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "채용 — 함께 성장할 동료를 찾습니다",
  description:
    "이엑스(EX) 채용. 일하는 사람이 행복한 회사를 지향합니다. 핵심 가치와 일하는 방식, 판교·하남의 일하는 공간, 지원 절차를 안내합니다. XR·실시간 콘텐츠를 함께 만들 분을 찾습니다.",
};

const values = [
  {
    h: "간결하게, 본질에 집중합니다",
    d: "기술은 문제 해결의 도구입니다. 요청보다 문제를 먼저 보고, 빠르게 움직이되 방향을 잃지 않습니다.",
  },
  {
    h: "기록하고, 함께 더 잘합니다",
    d: "모든 일을 기록으로 남기고, 반대할 때는 대안을 함께 가져옵니다. 혼자 잘하기보다 함께 더 잘하게 만듭니다.",
  },
  {
    h: "삶을 지키며, 오래 함께합니다",
    d: "회사는 삶 전체를 가져가지 않습니다. 좋은 성과는 좋은 사람이 오래 함께할 때 만들어집니다.",
  },
];

const culture = [
  "기술은 문제 해결의 도구입니다.",
  "요청보다 문제를 먼저 봅니다.",
  "모든 일은 기록으로 남깁니다.",
  "자유롭게 일하되, 실행은 책임지고 합니다.",
  "반대할 때는 대안을 함께 가져옵니다.",
  "불편한 문제일수록 지금 이야기합니다.",
  "빠르게 움직이되, 방향을 잃지 않습니다.",
  "혼자 잘하기보다 함께 더 잘하게 만듭니다.",
  "회사는 삶 전체를 가져가지 않습니다.",
  "좋은 성과는 좋은 사람이 오래 함께할 때 만들어집니다.",
];

const spaces = [
  { img: "/studio.png", label: "하남 XR 스튜디오", caption: "촬영이 곧 콘텐츠가 되는 공간", real: true },
  { img: "", label: "판교 HQ", caption: "아이디어가 제품이 되는 공간", real: false },
  { img: "", label: "라운지", caption: "구성원이 한데 모여 어울리는 공간", real: false },
];

const whoWeWant = [
  "문제를 스스로 정의하고 끝까지 파고드는 분",
  "기록과 공유로 동료를 더 빠르게 만드는 분",
  "새로운 기술을 두려워하지 않고 먼저 시도하는 분",
  "솔직하게 말하고, 대안으로 책임지는 분",
];

const env = [
  { k: "자율과 책임", v: "역할·일정·우선순위를 분명히, 프로세스는 일을 돕는 도구로" },
  { k: "수평적 의사결정", v: "반대는 더 나은 방향을 찾는 제안" },
  { k: "워라밸 존중", v: "가족 같은 회사보다 가족을 지킬 수 있는 회사" },
  { k: "최신 제작 인프라", v: "XR 스튜디오·실시간 엔진·모션캡처 환경" },
  { k: "기록 기반 협업", v: "기록은 다음 실행을 더 빠르게 만드는 자산" },
  { k: "성장 기회", v: "개인의 성장이 조직의 성장으로 이어지는 구조" },
];

const steps = [
  { t: "지원 접수", d: "채용 메일로 이력서·포트폴리오 제출" },
  { t: "서류 검토", d: "회사의 성장 단계·결·직무 역량 순으로 검토" },
  { t: "인터뷰", d: "대표·매니저와의 대화로 상호 핏 확인" },
  { t: "처우 협의", d: "역할과 처우를 함께 조율" },
  { t: "합류", d: "온보딩과 함께 첫 주를 시작" },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Career", href: "/careers" }]}
        tag="Career"
        title="일하는 사람이 행복한 회사."
        lead="모두의 창작 가능성을 넓히는 기술을 함께 만들 동료를 찾습니다. EX의 가치와 일하는 방식에 공감한다면."
      />

      {/* ambiance image */}
      <section className="container-ex" style={{ paddingTop: 48 }}>
        <div className="card" style={{ overflow: "hidden", padding: 0 }}>
          <Image src="/studio.png" alt="EX가 일하는 공간 — XR 스튜디오" width={1366} height={779} className="h-auto w-full" />
        </div>
      </section>

      {/* §01 Core values */}
      <section className="section section--surface section--glow">
        <div className="container-ex">
          <SectionLabel index="01">Our Values</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22, maxWidth: "48rem" }}>
            우리가 일하는 세 가지 방식
          </h2>
          <p className="lead" style={{ maxWidth: "42rem" }}>
            이 세 가지 가치는 우리가 일하는 방식, 일하는 공간, 커뮤니케이션 곳곳에 녹아 있습니다.
          </p>
          <div className="mt-14 grid gap-5">
            {values.map((v, i) => (
              <div key={v.h} className="card grid gap-4 md:grid-cols-[5rem_1fr]" style={{ padding: 36 }}>
                <span className="font-mono text-3xl font-bold text-lav md:text-4xl">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-balance text-2xl font-bold leading-snug text-fg md:text-3xl">{v.h}</h3>
                  <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted">{v.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §02 Culture */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="02">Culture</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            구체적으로, 이렇게 일합니다
          </h2>
          <div className="mt-12 grid gap-x-12 gap-y-7 sm:grid-cols-2">
            {culture.map((c, i) => (
              <div key={c} className="flex gap-4 border-t border-border pt-5">
                <span className="font-mono text-xl font-bold text-faint">{String(i + 1).padStart(2, "0")}</span>
                <p className="pt-0.5 text-sm leading-relaxed text-fg">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §03 Spaces */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionLabel index="03">Spaces</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            기술이 만들어지는 공간
          </h2>
          <p className="lead" style={{ maxWidth: "40rem" }}>
            판교 본사와 하남 스튜디오 — 우리가 매일 만들고 어울리는 곳입니다.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {spaces.map((s) =>
              s.real ? (
                <figure key={s.label} className="card" style={{ overflow: "hidden", padding: 0 }}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={s.img} alt={`${s.label} — ${s.caption}`} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
                  </div>
                  <figcaption className="p-5">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-lav">{s.label}</span>
                    <p className="mt-1 text-sm text-muted">{s.caption}</p>
                  </figcaption>
                </figure>
              ) : (
                <MediaBlank key={s.label} tag={s.label} label={s.caption} sublabel="사진 준비 중" className="aspect-[4/3]" />
              ),
            )}
          </div>
        </div>
      </section>

      {/* §04 Environment */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="04">Environment</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            일하는 환경
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {env.map((e) => (
              <div key={e.k} className="card" style={{ padding: 24 }}>
                <p className="font-semibold text-fg">{e.k}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{e.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §05 Who we want */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionLabel index="05">Who We Want</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            이런 분과 함께하고 싶어요
          </h2>
          <ul className="mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {whoWeWant.map((w) => (
              <li key={w} className="card flex items-start gap-3" style={{ padding: 24 }}>
                <span className="mt-1 font-mono text-lav" aria-hidden="true">
                  ✓
                </span>
                <span className="leading-relaxed text-fg">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* §06 Open Positions */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="06">Open Positions</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            채용 중인 포지션
          </h2>
          <div className="card mt-12" style={{ overflow: "hidden", padding: 0 }}>
            <div className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <span className="text-lg font-semibold text-fg">상시 지원</span>
                <p className="mt-1 text-sm text-muted">XR/실시간 콘텐츠 개발·기획·운영 — 직무 무관 상시 지원 환영</p>
              </div>
              <span className="shrink-0 rounded-full bg-primary-soft px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-lav">
                Always Open
              </span>
            </div>
            <div className="p-6 text-sm text-muted md:px-8" style={{ borderTop: "1px solid var(--color-border)" }}>
              구체적인 모집 공고는 준비 중입니다. 관심 직무가 있다면 먼저 지원해 주세요. (CMS 연동 예정)
            </div>
          </div>
        </div>
      </section>

      {/* §07 How to Apply */}
      <section className="section section--surface section--glow">
        <div className="container-ex">
          <SectionLabel index="07">How to Apply</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            지원 절차
          </h2>
          <ol className="mt-12 max-w-3xl space-y-4">
            {steps.map((s, i) => (
              <li key={s.t} className="card relative flex items-center gap-5" style={{ overflow: "hidden", padding: 24 }}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-sm font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-fg">{s.t}</h3>
                  <p className="mt-1 text-sm text-muted">{s.d}</p>
                </div>
                <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 font-mono text-7xl font-bold text-faint/15">
                  {i + 1}
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Button href={`mailto:${site.contact.careersEmail}`} variant="accent">
              채용 지원하기 →
            </Button>
            <p className="mt-3 font-mono text-xs text-faint">{site.contact.careersEmail}</p>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
