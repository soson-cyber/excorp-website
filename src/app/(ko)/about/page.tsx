import type { Metadata } from "next";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { HistoryTimeline } from "@/components/about/HistoryTimeline";
import { locations } from "@/lib/site";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "회사 소개",
  alternates: { canonical: "/about", languages: { "ko-KR": "/about", "en-US": "/en/about", "x-default": "/about" } },
  description:
    "AI·XR 기술로 콘텐츠 제작의 문턱을 낮추는 이엑스 주식회사(EX Corporation). 미션·비전, 연혁(2020~), 보유 특허 6건과 벤처기업 인증, 성남 EX AI Office·하남 EX XR Studio를 소개합니다.",
};

const whyEx = [
  { t: "통합 솔루션 제공", d: "카메라·트래커·미디어서버까지 복잡한 요소를 하나로 통합." },
  { t: "다양한 실전 프로젝트 경험과 노하우", d: "GS리테일 등 국내 주요 기업과 XR 프로젝트를 수행한 경험." },
  { t: "고객 중심의 맞춤형 시스템 설계와 지원", d: "현장에 맞는 유연한 구성과 전 주기 지원." },
  { t: "문화기술과 엔터테인먼트를 잇는 전문성", d: "콘텐츠 제작 현장과 기술을 연결해 온 경험." },
];

// 인증 3종 + 특허 6건 (요청 순서). 창작전담부서는 인증서 취득 후 재삽입 예정(대표 지시로 제외).
const credentials: { tag: string; title: string; no?: string; img?: string; desc?: string }[] = [
  { tag: "인증", title: "사업자등록증", img: "/cert-business-registration.jpg" },
  { tag: "인증", title: "벤처기업 인증", img: "/cert-venture.jpg" },
  { tag: "인증", title: "연구개발전담부서", img: "/cert-rnd.jpg" },
  { tag: "특허", title: "다중 뷰포인트 생성 장치·방법", no: "KR 10-2762537", img: "/patent-2762537.jpg", desc: "하나의 촬영에서 여러 시점의 화면을 만들어내는 기술." },
  { tag: "특허", title: "6DoF SLAM 기반 복수 스테레오 카메라 포지셔닝 추정 방법", no: "KR 10-2666600", img: "/patent-2666600.jpg", desc: "여러 대의 스테레오 카메라 위치·방향을 실시간으로 추정하는 기술." },
  { tag: "특허", title: "복수의 스테레오 카메라 장치를 활용한 포지셔닝 정보 보정 방법", no: "KR 10-2549811", img: "/patent-2549811.jpg", desc: "다중 카메라의 위치 정보를 보정해 정합 정확도를 높이는 기술." },
  { tag: "특허", title: "가상 스튜디오의 복합 센서 기반 다중 추적 카메라 시스템 동작 방법", no: "KR 10-2453561", img: "/patent-2453561.jpg", desc: "가상 스튜디오에서 여러 카메라를 복합 센서로 동시에 추적하는 기술." },
  { tag: "특허", title: "전자 장치 및 전자 장치의 3차원 모델링을 위한 촬영방법", no: "KR 10-2078198", img: "/patent-2078198.jpg", desc: "3D 모델링에 필요한 촬영을 돕는 전자 장치 기술." },
  { tag: "특허", title: "합성 영상의 왜곡을 결정하는 영상 처리 장치 및 방법", no: "KR 10-2029680", img: "/patent-2029680.jpg", desc: "합성 화면의 왜곡을 감지·판정하는 영상 처리 기술." },
];

const history: { year: string; items: string[] }[] = [
  { year: "2026", items: ["중소벤처기업부 TIPS 선정 (AI 기반 XR 제작 솔루션 R&D)"] },
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
  { year: "2021", items: ["이엑스 주식회사로 사명 변경"] },
  { year: "2020", items: ["주식회사 스페이스이엑스 법인 설립", "벤처기업 인증"] },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd schema={breadcrumbLd([{ name: "회사 소개", path: "/about" }])} />
      {/* About hero — 로고·타이틀 통합 + 동심원 확산 배경(EXpansion of EXperience) */}
      <section className="pagehero relative overflow-hidden">
        <div className="pagehero-aurora" aria-hidden="true" />
        <div className="exrings" aria-hidden="true">
          <span className="exring exring--1" />
          <span className="exring exring--2" />
          <span className="exring exring--3" />
          <span className="exring exring--4" />
          <span className="exring exring--5" />
        </div>
        <div className="pagehero-fade" aria-hidden="true" />
        <div className="container-ex pagehero__inner relative text-center">
          <div className="inline-flex rounded-full border border-border bg-surface/60 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-lav">
            About EX
          </div>
          <div className="mt-8 flex justify-center">
            <Image
              src="/ex-logo.png"
              alt="EX Corporation"
              width={1001}
              height={201}
              priority
              sizes="(min-width:640px) 440px, 78vw"
              className="h-auto w-full max-w-[300px] drop-shadow-[0_0_40px_rgba(139,92,246,0.35)] sm:max-w-[440px]"
            />
          </div>
          <h1 className="mt-7 text-balance break-keep text-[clamp(1.9rem,6vw,4.5rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-gradient-ex-bright">
            EXpansion of EXperience.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            이엑스는 XR 제작에 필요한 기술을 현장에서 연결하고, 그 운영 경험을 더 쉽게 쓰는 제품으로 옮기는 기술회사입니다.
          </p>
        </div>
        <span className="pagehero__sentinel" data-hero-sentinel aria-hidden="true" />
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
                      <a
                        href={c.img}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${c.title} 원본 크게 보기`}
                        className="absolute inset-0 block"
                        title="클릭하여 확대"
                      >
                        <Image
                          src={c.img}
                          alt={`${c.tag} — ${c.title}${c.no ? ` (${c.no})` : ""}`}
                          fill
                          sizes="(min-width:1024px) 240px, (min-width:640px) 33vw, 50vw"
                          className="object-cover object-top"
                        />
                      </a>
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
                    {c.desc && <p className="mt-1.5 text-xs leading-relaxed text-muted">{c.desc}</p>}
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
