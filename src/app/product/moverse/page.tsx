import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { Gauge } from "@/components/motion/Gauge";
import { SpecTable } from "@/components/product/SpecTable";

export const metadata: Metadata = {
  title: "Moverse — 마커리스 AI 모션캡처",
  alternates: { canonical: "/product/moverse" },
  description:
    "마커·수트 없이 표준 RGB 카메라로 최대 4명을 실시간 캡처하는 마커리스 AI 모션캡처 Moverse. 로컬 실시간 캡처 + 클라우드 Portal의 AI Reprocessing(지터 제거·손가락 트래킹). Unreal 연동·표준 리그 익스포트. EX 공식 한국 총판.",
};

const quickSpecs: { v: string; l: string; numeric: boolean }[] = [
  { v: "Markerless", l: "마커·수트 불필요", numeric: false },
  { v: "60+ FPS", l: "실시간 저지연", numeric: true },
  { v: "Up to 4", l: "동시 캡처 액터", numeric: true },
  { v: "AI", l: "자동 모션 클린업", numeric: false },
];

const why = [
  {
    t: "마커리스 캡처",
    d: "전용 수트·마커 부착 없이 표준 RGB/RGB-IR 카메라만으로 캡처합니다. 별도 착용·개인 캘리브레이션 없이 바로 시작합니다.",
  },
  {
    t: "로컬 실시간 캡처",
    d: "캡처와 연산은 현장 로컬 앱에서 처리해, 최대 4명을 60+ FPS로 저지연 스트리밍합니다. 엔진으로 곧바로 송출합니다.",
  },
  {
    t: "AI 자동 클린업",
    d: "클라우드 Portal의 AI Reprocessing이 녹화 데이터의 지터·아티팩트를 자동으로 보정합니다. 특허 출원·동료심사 연구를 기반으로 합니다.",
  },
];

const ecosystem = [
  {
    role: "Capture · Local",
    name: "Moverse Capture Studio",
    desc: "현장 로컬 앱입니다. 최대 4명을 실시간 저지연으로 캡처하고 카메라 컨트롤·캘리브레이션, 테이크 녹화, 엔진 스트리밍을 처리합니다.",
    img: "/moverse-eco-studio.jpg",
  },
  {
    role: "Control · Bridge",
    name: "Moverse Capture Hub",
    desc: "세션 구성과 원격 제어를 담당하는 중앙 제어입니다. 녹화 대시보드와 VR 모드를 제공하고 업데이트·지원을 관리합니다.",
    img: "/moverse-eco-hub.jpg",
  },
  {
    role: "Manage · Cloud",
    name: "Moverse Portal",
    desc: "Google Cloud 기반 웹 대시보드입니다. 데이터 관리·협업, AI Reprocessing, 표준 리그 매핑과 다중 포맷 익스포트를 제공합니다.",
    img: "/moverse-eco-portal.jpg",
  },
];

const reprocessing = [
  {
    t: "Body Reprocessing",
    d: "지터를 제거하고, 바디 컨택트·오클루전으로 생기는 아티팩트를 보정해 raw 캡처를 안정적인 모션으로 정리합니다.",
  },
  {
    t: "Finger Tracking",
    d: "바디와 손가락을 하나의 시스템으로 후처리합니다. 별도 장비 없이 손동작까지 캡처에 담습니다.",
  },
];

const workflow = [
  {
    t: "엔진 실시간 연동",
    d: "Unreal Engine으로 다이렉트 스트리밍하며, 게임엔진 플러그인·SDK·API(Python REST API·C++ SDK)로 다중 엔드포인트·포맷을 지원합니다.",
  },
  {
    t: "표준 리그 자동 매핑",
    d: "Mixamo Ybot·Mannequin·ActorCore 등 표준 리그에 캡처 데이터를 자동 매핑하고 다중 포맷으로 익스포트합니다.",
  },
  {
    t: "Moverse Motifs",
    d: "사전 정의된 모션의 변형을 만들어 내는 생성형 라이브러리입니다. 기존 모션을 바탕으로 다양한 변주를 생성합니다.",
  },
  {
    t: "브라우저 제어",
    d: "같은 네트워크의 태블릿·폰 브라우저에서 캡처를 제어합니다. 별도 콘솔 설치 없이 현장에서 바로 운영합니다.",
  },
];

const specGroups: { title: string; rows: [string, string][] }[] = [
  {
    title: "Moverse Capture Studio (로컬 앱)",
    rows: [
      ["캡처 방식", "마커리스 · 표준 RGB/RGB-IR 카메라 (마커·수트 불필요)"],
      ["실시간 성능", "60+ FPS · 저지연 라이브 MoCap · 최대 4 액터 동시 캡처"],
      ["카메라 운영", "카메라 컨트롤 · 캘리브레이션 · 테이크 녹화"],
      ["엔진 스트리밍", "다중 엔드포인트 · 다중 포맷 · 커스텀 플러그인"],
      ["설치 규모", "Compact 4×4m/4캠 · Pro 8×8m/8캠 · Max 10×10m/16캠"],
    ],
  },
  {
    title: "Moverse Capture Hub (중앙 제어)",
    rows: [
      ["세션 제어", "세션 구성 · 원격 제어"],
      ["녹화 관리", "녹화 대시보드 · 멀티테이크"],
      ["부가 기능", "VR 모드"],
      ["운영", "업데이트 · 지원 관리"],
    ],
  },
  {
    title: "Moverse Portal (클라우드 · Google Cloud)",
    rows: [
      ["기반", "Google Cloud 기반 웹 대시보드"],
      ["데이터", "데이터 관리 · 팀 협업"],
      ["AI Reprocessing", "업로드 녹화 자동 클린업 — Body Reprocessing(지터·아티팩트 보정) · Finger Tracking · 특허 출원·동료심사 연구 기반"],
      ["리그 매핑", "Mixamo Ybot · Mannequin · ActorCore 자동 매핑"],
      ["익스포트", "다중 산업 표준 포맷"],
      ["Motifs", "사전 정의 모션의 변형을 생성하는 생성형 라이브러리"],
    ],
  },
  {
    title: "연동 · 카메라",
    rows: [
      ["엔진 연동", "Unreal Engine 다이렉트 스트리밍 · 게임엔진 플러그인"],
      ["SDK / API", "Python REST API · C++ SDK"],
      ["원격 제어", "네트워크 내 태블릿·폰 브라우저 제어"],
      ["카메라", "Luxonis OAK 계열 (OAK-1 W · OAK-D Pro W PoE 등)"],
    ],
  },
];

const useCases = [
  { t: "라이브 음악 · 공연", d: "게임·라이브 음악 무대에 실시간 캡처로 캐릭터를 움직입니다." },
  { t: "버추얼 프로덕션", d: "로컬 저지연 스트리밍으로 가상 스튜디오·LED 월 제작에 라이브로 연동합니다." },
  { t: "게임 · 애니메이션", d: "마커리스 캡처 데이터를 Unreal·표준 리그로 보내 캐릭터 애니메이션에 활용합니다." },
  { t: "교육 · 학생", d: "수트·마커 없이 표준 카메라만으로 모션캡처를 가르치고 실습합니다." },
  { t: "연구 · 인터랙티브", d: "다수 인원의 움직임을 데이터화해 연구·인터랙티브 콘텐츠에 활용합니다." },
  { t: "까다로운 조명의 라이브", d: "어려운 조명 환경의 라이브 현장에서도 마커리스로 안정적으로 캡처합니다." },
  { t: "손동작 캡처", d: "바디와 손가락을 한 시스템으로 후처리해 디테일한 손동작까지 담습니다." },
];

const process = [
  { step: "01", t: "상담 · 요구분석", d: "캡처 환경·인원·연동 엔진·운영 규모를 파악합니다." },
  { step: "02", t: "구성 제안 · 견적", d: "카메라 대수·캡처 볼륨·Studio/Hub/Portal 구성을 설계하고 견적을 제시합니다." },
  { step: "03", t: "설치 · 셋업 · 교육", d: "현장 설치와 캘리브레이션, 엔진 연동을 마치고 운영 교육을 진행합니다." },
  { step: "04", t: "운영 · 기술지원", d: "도입 이후 운영과 업데이트·기술지원을 총판으로서 지속 제공합니다." },
];

const faqs = [
  { q: "마커나 슈트가 필요한가요?", a: "필요 없습니다. 표준 RGB/RGB-IR 카메라만으로 캡처하며, 일반인도 별도 착용·개인 캘리브레이션 없이 바로 사용할 수 있습니다." },
  { q: "실시간 라이브 연동이 되나요?", a: "됩니다. 로컬 Capture Studio에서 60+ FPS로 최대 4명을 캡처해 Unreal Engine 등으로 저지연 다이렉트 스트리밍합니다." },
  { q: "AI Reprocessing은 무엇인가요?", a: "클라우드 Portal에 녹화를 업로드하면 자동으로 클린업하는 후처리입니다. 지터·아티팩트를 줄이고 손가락까지 후처리하며, 특허 출원·동료심사 연구를 기반으로 합니다." },
  { q: "데이터는 어디에서 처리되나요?", a: "캡처와 실시간 연산은 현장 로컬 앱에서 처리하고, 데이터 관리·협업·AI Reprocessing은 Google Cloud 기반 Moverse Portal에서 처리하는 하이브리드 방식입니다." },
  { q: "카메라는 어떤 것을 쓰나요?", a: "Luxonis OAK 계열(OAK-1 W·OAK-D Pro W PoE 등)을 사용합니다. 필요한 대수·구성은 캡처 볼륨에 맞춰 상담 시 안내드립니다." },
  { q: "어떤 엔진·리그와 연동되나요?", a: "Unreal Engine 다이렉트 스트리밍과 게임엔진 플러그인·SDK·API(Python REST API·C++ SDK)를 지원하고, Mixamo Ybot·Mannequin·ActorCore 등 표준 리그로 자동 매핑·익스포트합니다." },
];

export default function MoversePage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Product", href: "/product" },
          { label: "Moverse", href: "/product/moverse" },
        ]}
        tag="Distributor"
        title="수트도, 마커도 없이. AI가 움직임을 읽습니다."
        lead={
          <>
            <span className="inline-block">표준 RGB 카메라만으로 최대 4명을 실시간 캡처하는 마커리스 AI 모션캡처입니다.</span>{" "}
            <span className="inline-block">로컬에서 60+ FPS로 저지연 스트리밍하고, 클라우드 Portal에서 데이터를 정리·관리합니다.</span>
          </>
        }
        bgImage="/moverse-hero.jpg"
      />

      {/* Quick spec bar */}
      <section className="section--surface" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="container-ex grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
          {quickSpecs.map((s) => (
            <div key={s.l} className="text-center">
              <p className="font-mono text-3xl font-bold text-fg">{s.v}</p>
              <p className="mt-1.5 text-sm text-muted">{s.l}</p>
              <Gauge className={`mx-auto mt-3 ${s.numeric ? "w-3/4" : "w-full"}`} />
            </div>
          ))}
        </div>
      </section>

      {/* §01 Showcase */}
      <section className="section section--ink">
        <div className="container-ex">
          <SectionHead index="01" label="Showcase" title="Motion Capture for Everyone" />
          <figure className="mt-12">
            {/* 자체 호스팅 16:9 — 무음 자동재생·루프. poster로 로드 전 폴백.
                웹 최적화본(720p30·무음·~5MB, faststart). */}
            <div className="card aspect-video" style={{ overflow: "hidden", padding: 0 }}>
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/moverse-showcase-poster.jpg"
                aria-label="Moverse 마커리스 AI 모션캡처 데모 영상"
                className="h-full w-full object-cover"
              >
                <source src="/moverse-showcase-web.mp4" type="video/mp4" />
              </video>
            </div>
          </figure>
        </div>
      </section>

      {/* §02 Why Moverse */}
      <section className="section section--white section--glow">
        <div className="container-ex">
          <SectionHead index="02" label="Why Moverse" title="왜 Moverse인가" />
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {why.map((w) => (
              <div key={w.t} className="card" style={{ padding: 28 }}>
                <h3 className="text-xl font-semibold text-fg">{w.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §03 Ecosystem */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead
            index="03"
            label="Ecosystem"
            title="캡처부터 정리·협업까지, 하나의 생태계"
            lead="현장에서 실시간으로 캡처하고(Studio), 중앙에서 세션을 제어하며(Hub), 클라우드에서 데이터를 정리·공유합니다(Portal). 세 구성이 하나의 워크플로우로 이어집니다."
            leadMaxWidth="46rem"
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {ecosystem.map((e) => (
              <div key={e.name} className="card flex flex-col" style={{ padding: 0, overflow: "hidden" }}>
                <div className="aspect-video w-full overflow-hidden bg-bg/60">
                  <Image src={e.img} alt={`${e.name} 화면`} width={1280} height={720} className="h-full w-full object-cover" />
                </div>
                <div style={{ padding: 24 }}>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-lav">{e.role}</span>
                  <h3 className="mt-1 text-lg font-semibold text-fg">{e.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §04 AI Reprocessing */}
      <section className="section section--white section--glow">
        <div className="container-ex">
          <SectionHead
            index="04"
            label="AI Reprocessing"
            title="녹화 데이터를 AI가 자동으로 다듬습니다"
            lead="업로드한 녹화를 클라우드에서 자동 클린업합니다. 특허 출원·동료심사 연구를 기반으로, raw 캡처의 지터와 아티팩트를 줄여 안정적인 모션으로 만듭니다."
            leadMaxWidth="46rem"
          />
          {/* Raw / AI Reprocessed 2-up 비교 — 자체 호스팅 16:9 무음 자동재생·루프 */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {[
              { src: "/moverse-raw-web.mp4", poster: "/moverse-raw-poster.jpg", tag: "RAW", label: "원본 캡처", aria: "AI 재처리 전 — 원본 캡처 영상" },
              { src: "/moverse-rendered-web.mp4", poster: "/moverse-rendered-poster.jpg", tag: "AI REPROCESSED", label: "AI 재처리 후", aria: "AI 재처리 후 — 정합된 모션 영상" },
            ].map((v) => (
              <figure key={v.src} className="card relative aspect-video" style={{ overflow: "hidden", padding: 0 }}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={v.poster}
                  aria-label={v.aria}
                  className="h-full w-full object-cover"
                >
                  <source src={v.src} type="video/mp4" />
                </video>
                <span
                  className={`absolute left-4 top-4 z-10 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider ${
                    v.tag === "RAW" ? "border-border bg-black/60 text-white/80" : "border-lav/40 bg-black/60 text-lav"
                  }`}
                >
                  {v.tag}
                </span>
              </figure>
            ))}
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {reprocessing.map((r) => (
              <div key={r.t} className="card" style={{ padding: 24 }}>
                <h3 className="font-semibold text-fg">{r.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §05 Engine, Rig & Motifs */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead
            index="05"
            label="Engine & Workflow"
            title="엔진 연동부터 모션 라이브러리까지"
            lead="셋업은 Compact(4×4m·4캠)에서 Pro(8×8m·8캠), Max(10×10m·16캠)까지 확장합니다. 캡처한 데이터는 엔진·표준 리그로 곧바로 이어집니다."
            leadMaxWidth="46rem"
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map((w) => (
              <div key={w.t} className="card" style={{ padding: 24 }}>
                <h3 className="font-semibold text-fg">{w.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §06 Specifications */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionHead index="06" label="Specifications" title="상세 사양" />
          <div className="mx-auto mt-12 max-w-3xl">
            <SpecTable groups={specGroups} />
            <p className="mt-4 text-center text-xs text-faint">
              본 사양은 Moverse 제품 사양이며, EX는 공식 한국 총판으로서 도입·기술지원을 담당합니다.
            </p>
          </div>
        </div>
      </section>

      {/* §07 Use Cases */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead index="07" label="Use Cases" title="활용 분야" />
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u) => (
              <div key={u.t} className="card" style={{ padding: 24 }}>
                <span className="inline-block rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-fg">
                  {u.t}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-muted">{u.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §08 Process */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionHead index="08" label="Process" title="도입 절차" />
          <ol className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <li key={p.step} className="card" style={{ padding: 24 }}>
                <span className="font-mono text-sm font-bold text-lav">{p.step}</span>
                <h3 className="mt-2 font-semibold text-fg">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* §09 FAQ */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead index="09" label="FAQ" title="도입 전 자주 묻는 질문" />
          <div className="card mx-auto mt-12 max-w-3xl" style={{ overflow: "hidden", padding: 0 }}>
            {faqs.map((f, i) => (
              <details key={f.q} className="group p-6" style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-border)" }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-fg">
                  {f.q}
                  <span className="font-mono text-lav transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* §10 EX × Moverse */}
      <section className="section section--ink section--glow">
        <div className="container-ex">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel index="10">EX × Moverse</SectionLabel>
              <h2 className="h2" style={{ marginTop: 22 }}>
                EX는 Moverse의 <span className="text-lav">공식 한국 총판</span>입니다.
              </h2>
              <p className="lead" style={{ maxWidth: "36rem" }}>
                하드웨어·소프트웨어 공급은 물론 시스템 설치·캘리브레이션·엔진 연동·현장 교육까지, 통합 턴키로 국내 도입 전 과정을 책임집니다.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {["도입 컨설팅", "시스템 셋업", "엔진 연동", "교육·기술 지원"].map((x) => (
                  <li key={x} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-fg">
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact" variant="accent">
                  도입 상담 →
                </Button>
                <Button href="/support" variant="glow">
                  기술 사양서 요청 →
                </Button>
              </div>
            </div>
            <figure>
              <div className="card" style={{ overflow: "hidden", padding: 0 }}>
                <Image
                  src="/cert-moverse.png"
                  alt="Moverse Capture 공식 한국 총판 인증서 (Certificate of Excellence — EX Corporation)"
                  width={948}
                  height={670}
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 text-center font-mono text-xs text-faint">
                Moverse Certificate of Excellence — EX Corporation
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
