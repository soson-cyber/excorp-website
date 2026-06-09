import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { HistoryTimeline } from "@/components/about/HistoryTimeline";
import { locations } from "@/lib/site";

export const metadata: Metadata = {
  title: "회사 소개",
  alternates: { canonical: "/about" },
  description:
    "AI·XR 기술로 콘텐츠 제작의 문턱을 낮추는 이엑스 주식회사(EX Corporation). 미션·비전, 연혁(2020~), 보유 특허 6건과 벤처기업 인증, 성남 EX AI Office·하남 EX XR Studio를 소개합니다.",
};

const whyEx = [
  { t: "All-in-One 통합 솔루션 제공", d: "카메라·트래커·미디어서버까지 복잡한 요소를 하나로 통합." },
  { t: "다양한 실전 프로젝트 경험과 노하우", d: "한국 주요 XR 프로젝트 수행 경험." },
  { t: "고객 중심의 맞춤형 시스템 설계와 지원", d: "현장에 맞는 유연한 구성과 전 주기 지원." },
  { t: "문화기술과 엔터테인먼트를 잇는 전문성", d: "콘텐츠 제작 현장과 기술을 연결해 온 경험." },
];

// 인증 4종 + 특허 6건 (요청 순서). img 있는 항목은 인증서 이미지, 없으면 플레이스홀더.
const credentials: { tag: string; title: string; no?: string; img?: string }[] = [
  { tag: "인증", title: "사업자등록증" },
  { tag: "인증", title: "벤처기업 인증" },
  { tag: "인증", title: "연구개발전담부서" },
  { tag: "인증", title: "창작전담부서" },
  { tag: "특허", title: "다중 뷰포인트 생성 장치·방법", no: "KR 10-2762537" },
  { tag: "특허", title: "6DoF SLAM 기반 복수 스테레오 카메라 포지셔닝 추정 방법", no: "KR 10-2666600" },
  { tag: "특허", title: "복수의 스테레오 카메라 장치를 활용한 포지셔닝 정보 보정 방법", no: "KR 10-2549811" },
  { tag: "특허", title: "가상 스튜디오의 복합 센서 기반 다중 추적 카메라 시스템 동작 방법", no: "KR 10-2453561", img: "/patent-2453561.jpg" },
  { tag: "특허", title: "전자 장치 및 전자 장치의 3차원 모델링을 위한 촬영방법", no: "KR 10-2078198", img: "/patent-2078198.jpg" },
  { tag: "특허", title: "합성 영상의 왜곡을 결정하는 영상 처리 장치 및 방법", no: "KR 10-2029680", img: "/patent-2029680.jpg" },
];

const history: { year: string; items: string[] }[] = [
  { year: "2026", items: ["중소벤처기업부 TIPS 선정 — AI 기반 XR 제작 솔루션 R&D"] },
  { year: "2024", items: ["Moverse AI 공식 한국 총판 계약"] },
  {
    year: "2023",
    items: [
      "Aximmetry Technology 현지 파트너 및 리셀러 인증",
      "RETracker(Rassi Engineering LTD) 공식 한국 총판 계약",
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
        eyebrow="모두의 창작 가능성을 넓히는 기술 스타트업"
        title="EXpansion of EXperience."
        lead="이엑스는 AI와 XR 기술을 연결하여 모두의 창작 가능성을 넓히는 기술을 만듭니다."
      />

      {/* Brand mark — EX 로고 */}
      <section className="container-ex" style={{ paddingTop: 48 }}>
        <Reveal>
          <div className="flex items-center justify-center py-10 sm:py-14">
            <Image
              src="/ex-logo.png"
              alt="EX Corporation 로고"
              width={1001}
              height={201}
              priority
              sizes="(min-width:640px) 460px, 80vw"
              className="h-auto w-full max-w-[280px] sm:max-w-[460px]"
            />
          </div>
        </Reveal>
      </section>

      {/* §01 Vision & Mission */}
      <section className="section section--ink section--glow">
        <div className="container-ex">
          <Reveal className="text-center">
            <SectionLabel index="01">Vision &amp; Mission</SectionLabel>
            <h2 className="h2" style={{ marginTop: 22 }}>
              우리가 그리는 세상
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-12 text-center lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-lav">Vision</span>
              <p className="mt-6 text-balance text-[1.65rem] font-medium leading-[1.45] tracking-[-0.01em] text-fg md:text-[2.15rem]">
                모든 사람이 경계를 넘어 <span className="text-gradient-ex-bright">‘새로운 경험’</span>을 창조하는 세상.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-lav">Mission</span>
              <p className="mt-6 text-balance text-[1.65rem] font-medium leading-[1.45] tracking-[-0.01em] text-fg md:text-[2.15rem]">
                AI + XR 융합 기술로 문화콘텐츠 제작의 문턱을 낮추고, 누구나 몰입형 경험을 만들 수 있게 합니다.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* §02 Why EX */}
      <section className="section section--surface">
        <div className="container-ex">
          <Reveal className="text-center">
            <SectionLabel index="02">Why EX</SectionLabel>
            <h2 className="h2" style={{ marginTop: 22 }}>
              왜 EX인가
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {whyEx.map((c, i) => (
              <Reveal key={c.t} className="card flex gap-5 p-7" delay={i * 80}>
                <span className="font-mono text-2xl font-bold text-faint tabular-nums">0{i + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold text-fg">{c.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* §03 Patents */}
      <section className="section section--white">
        <div className="container-ex">
          <Reveal className="text-center">
            <SectionLabel index="03">Patents &amp; Certifications</SectionLabel>
            <h2 className="h2" style={{ marginTop: 22 }}>
              보유 특허 &amp; 인증
            </h2>
            <p className="lead" style={{ maxWidth: "40rem", marginInline: "auto" }}>
              기술 특허 6건 보유 · 벤처기업 인증 · 정부·공공 인증
            </p>
          </Reveal>
          <ol className="mt-12 grid list-none gap-4 p-0 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {credentials.map((c, i) => (
              <Reveal key={c.title} className="card patent-card" delay={(i % 5) * 50}>
                <li className="patent-card__inner">
                  <div className="patent-card__media">
                    {c.img ? (
                      <Image
                        src={c.img}
                        alt={`${c.tag} — ${c.title}${c.no ? ` (${c.no})` : ""}`}
                        fill
                        sizes="(min-width:1024px) 240px, (min-width:640px) 33vw, 50vw"
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="patent-card__ph">
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-lav">{c.tag === "특허" ? "Patent" : "Certified"}</span>
                        {c.no ? (
                          <span className="mt-1 font-mono text-xs text-faint">{c.no}</span>
                        ) : (
                          <span className="mt-1 px-3 text-center text-xs text-faint">{c.title}</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="patent-card__body">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{c.tag === "특허" ? "Patent" : "Cert"}</span>
                      {c.no && <span className="font-mono text-[11px] font-semibold text-lav">{c.no}</span>}
                    </div>
                    <h3 className="mt-2 text-[13px] font-medium leading-snug text-fg">{c.title}</h3>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* §04 History */}
      <section className="section section--surface">
        <div className="container-ex">
          <Reveal className="text-center">
            <SectionLabel index="04">History</SectionLabel>
            <h2 className="h2" style={{ marginTop: 22 }}>
              연혁
            </h2>
            <p className="lead" style={{ maxWidth: "40rem", marginInline: "auto" }}>
              2020년 설립 이후, EX가 걸어온 길.
            </p>
          </Reveal>
          <Reveal>
            <HistoryTimeline items={history} />
          </Reveal>
        </div>
      </section>

      {/* §05 Locations */}
      <section className="section section--white">
        <div className="container-ex">
          <Reveal className="text-center">
            <SectionLabel index="05">Location</SectionLabel>
            <h2 className="h2" style={{ marginTop: 22 }}>
              오시는 길
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {locations.map((loc, i) => (
              <Reveal key={loc.kind} className="card overflow-hidden p-0" delay={i * 90}>
                <div className="p-6">
                  <span className="font-mono text-xs uppercase tracking-wider text-lav">{loc.kind}</span>
                  <p className="mt-1.5 font-medium text-fg">{loc.name}</p>
                  <p className="text-sm text-muted">
                    {loc.address} <span className="text-faint">({loc.zip})</span>
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-lav transition-colors hover:text-lav-hover"
                  >
                    구글 지도에서 길찾기 <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <iframe
                  title={`${loc.name} 위치 지도`}
                  src={loc.mapEmbed}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block aspect-[16/10] w-full border-0"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
