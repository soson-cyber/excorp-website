import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { locations } from "@/lib/site";

export const metadata: Metadata = {
  title: "About EX",
  description:
    "현실과 가상의 융합, 새로운 경험을 창조하는 세상. 이엑스(EX Corporation) — 미션·비전, 연혁(2020~2024), 보유 특허 6건.",
};

const whyEx = [
  { t: "All-in-One 통합 솔루션 제공", d: "카메라·트래커·미디어서버까지 복잡한 요소를 하나로 통합." },
  { t: "다양한 실전 프로젝트 경험과 노하우", d: "한국 주요 XR 프로젝트 수행 경험." },
  { t: "고객 중심의 맞춤형 시스템 설계와 지원", d: "현장에 맞는 유연한 구성과 전 주기 지원." },
  { t: "문화기술과 엔터테인먼트를 연결하는 깊은 이해", d: "콘텐츠와 기술을 잇는 전문성." },
];

const patents = [
  { name: "다중 뷰포인트 생성 장치·방법", no: "KR 10-2762537" },
  { name: "6DoF SLAM 기반 복수 스테레오 카메라 포지셔닝 추정 방법", no: "KR 10-2666600" },
  { name: "복수의 스테레오 카메라 장치를 활용한 포지셔닝 정보 보정 방법", no: "KR 10-2549811" },
  { name: "가상 스튜디오의 복합 센서 기반 다중 추적 카메라 시스템 동작 방법", no: "KR 10-2453561" },
  { name: "전자 장치 및 전자 장치의 3차원 모델링을 위한 촬영방법", no: "KR 10-2078198" },
  { name: "합성 영상의 왜곡을 결정하는 영상 처리 장치 및 방법", no: "KR 10-2029680" },
];

const history: { year: string; items: string[] }[] = [
  { year: "2024", items: ["Moverse AI 공식 한국 총판 계약"] },
  {
    year: "2023",
    items: [
      "Aximmetry Technology 현지 파트너 및 리셀러 인증",
      "Rassi Engineering LTD 공식 한국 총판 계약",
      "성균관대·중앙대·계원예술대 MOU 체결",
      "경기도 하남 XR 스튜디오 오픈",
    ],
  },
  {
    year: "2022",
    items: [
      "연구개발전담부서 설립",
      "기보벤처캠프 10기 선정 및 최종 우수기업 선정",
      "경기 기술창업 4차산업 분야 선정 및 우수기업 선정",
      "벤처기업 혁신성장유형 인증",
    ],
  },
  { year: "2021", items: ["사명 변경 — 이엑스 주식회사"] },
  { year: "2020", items: ["주식회사 스페이스이엑스 법인 설립", "벤처기업 인증"] },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "About EX", href: "/about" }]}
        tag="About EX · EXpand EXperiences"
        title="현실과 가상의 융합, 새로운 경험을 창조하는 세상."
        lead="이엑스(EX Corp.)는 AI와 XR 기술을 연결하여 모두의 창작 가능성을 넓히는 기술을 만듭니다."
      />

      {/* Vision & Mission */}
      <section className="container-ex py-section">
        <div className="mx-auto grid max-w-4xl gap-12 text-center sm:grid-cols-2">
          <div>
            <h2 className="text-gradient-ex text-2xl font-bold">Vision</h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
              모든 사람이 경계를 넘어 ‘새로운 경험(Experience)’을 창조하는 세상.
            </p>
          </div>
          <div>
            <h2 className="text-gradient-ex text-2xl font-bold">Mission</h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
              AI + XR 융합 기술로 문화콘텐츠 제작의 문턱을 허물고, 몰입형 경험 혁신을 선도합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Why EX */}
      <section className="bg-surface/40">
        <div className="container-ex py-section">
          <div className="text-center">
            <SectionLabel index="01">Why EX</SectionLabel>
            <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">왜 EX인가</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-x-12 gap-y-8 sm:grid-cols-2">
            {whyEx.map((c, i) => (
              <div key={c.t} className="flex gap-5 border-t border-border pt-6">
                <span className="font-mono text-2xl font-bold text-faint">0{i + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold">{c.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patents */}
      <section className="container-ex py-section">
        <div className="text-center">
          <SectionLabel index="02">Patents &amp; Certifications</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">보유 특허 &amp; 인증</h2>
          <p className="mt-4 text-muted">기술 특허 6건 보유 · 벤처기업 인증 · 정부·공공 인증</p>
        </div>
        <ol className="mx-auto mt-12 max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
          {patents.map((p) => (
            <li key={p.no} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm text-fg">{p.name}</span>
              <span className="shrink-0 font-mono text-xs text-primary">{p.no}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* History */}
      <section className="bg-surface/40">
        <div className="container-ex py-section">
          <div className="text-center">
            <SectionLabel index="03">History</SectionLabel>
            <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">연혁</h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            {history.map((h) => (
              <div key={h.year} className="flex gap-6 border-l border-border pl-6 pb-8 last:pb-0">
                <span className="-ml-[2.1rem] flex h-10 w-16 shrink-0 items-center justify-center rounded-full bg-surface font-mono text-sm font-bold text-primary ring-1 ring-border">
                  {h.year}
                </span>
                <ul className="space-y-1.5 pt-1.5">
                  {h.items.map((it) => (
                    <li key={it} className="text-sm text-muted">
                      • {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="container-ex py-section">
        <div className="text-center">
          <SectionLabel index="04">Location</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">오시는 길</h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
          {locations.map((loc) => (
            <div key={loc.kind} className="rounded-2xl border border-border bg-surface p-6">
              <span className="font-mono text-xs uppercase tracking-wider text-primary">{loc.kind}</span>
              <p className="mt-1.5 font-medium text-fg">{loc.name}</p>
              <p className="text-sm text-muted">
                {loc.address} <span className="text-faint">({loc.zip})</span>
              </p>
              {loc.tel && <p className="mt-1 font-mono text-xs text-faint">Tel {loc.tel}</p>}
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
