import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { Gauge } from "@/components/motion/Gauge";
import { SpecTable } from "@/components/product/SpecTable";
import { MediaBlank } from "@/components/ui/MediaBlank";

export const metadata: Metadata = {
  title: "Moverse AI — 마커리스 AI 모션캡처",
  alternates: { canonical: "/product/moverse" },
  description:
    "전용 수트·마커 없이 AI 비전 카메라와 로컬 네트워크만으로 다수 인원을 캡처하는 Moverse. 100% On-Premise(망분리 대응), 4~16대+ 확장, 대형 캡처 볼륨. EX 공식 한국 총판.",
};

const quickSpecs: { v: string; l: string; numeric: boolean }[] = [
  { v: "Markerless", l: "마커·수트 불필요", numeric: false },
  { v: "On-Premise", l: "100% 로컬 · 망분리", numeric: false },
  { v: "4→16+", l: "카메라 확장", numeric: true },
  { v: "Low-Latency", l: "실시간 스트리밍", numeric: false },
];

const why = [
  {
    t: "마커리스",
    d: "전용 수트·마커 부착 없이 AI 비전 카메라만으로 캡처합니다. 별도 착용·개인 캘리브레이션 없이 즉시 시작합니다.",
  },
  {
    t: "100% On-Premise",
    d: "클라우드 통신을 전면 차단한 100% 로컬 연산. 공공·국방 등 망분리(폐쇄망) 환경에 대응합니다.",
  },
  {
    t: "대형 캡처 볼륨",
    d: "최소 4대에서 최대 16대 이상으로 확장해, 4m×4m에서 10m×10m 이상의 대형 캡처 공간을 커버합니다.",
  },
];

const system = [
  { name: "Moverse AI Software", role: "Software", desc: "AI 비전으로 스켈레톤을 추출·변환하는 100% 로컬(On-Premise) 엔진." },
  { name: "Luxonis OAK-D W PoE", role: "AI Depth Camera", desc: "150° 초광각 산업용 AI 뎁스 카메라. 4~16대 확장." },
  { name: "AI 연산 서버 · PoE 허브", role: "Compute & Network", desc: "다중 카메라 데이터를 병합 연산하는 로컬 서버 + PoE+ 스위치." },
];

const features = [
  { t: "마커리스 · 수트 불필요", d: "전용 수트·마커 부착 없이 일반인도 즉시 캡처, 별도 착용·개인 캘리브레이션 없이 시작." },
  { t: "100% 로컬 (On-Premise)", d: "클라우드 통신을 전면 차단해 공공·국방 망분리 환경에 대응." },
  { t: "다중 카메라 확장", d: "최소 4대에서 최대 16대 이상의 다중 카메라 환경으로 확장." },
  { t: "대형 캡처 볼륨", d: "4m×4m에서 10m×10m 이상의 대형 공간을 커버." },
  { t: "초저지연 다이렉트 스트리밍", d: "Unreal Engine 등 주요 3D 솔루션으로 Low-Latency 스트리밍." },
  { t: "산업용 AI 뎁스 비전", d: "4 TOPS 온디바이스 연산·12MP·150° 초광각·IP65 방수방진 카메라." },
  { t: "안정적인 모션 품질", d: "마커리스에서도 지터(jitter)를 억제하고 발 접촉(contact)을 안정적으로 유지해 부드러운 모션을 출력." },
  { t: "캡처 → 클린업 → 출력 통합", d: "라이브 스트림·녹화·멀티테이크 관리부터 자동 클린업·리그 포맷 출력까지 하나의 흐름으로." },
];

const specGroups: { title: string; rows: [string, string][] }[] = [
  {
    title: "Moverse AI Software",
    rows: [
      ["보안 / 구동", "클라우드 차단 100% 로컬 연산(On-Premise) · 망분리 대응"],
      ["편의성", "마커·수트 불필요 · 별도 착용·개인 캘리브레이션 없이 즉시 캡처"],
      ["확장성", "최소 4대 ~ 최대 16대+ 다중 카메라"],
      ["캡처 볼륨", "4m×4m ~ 10m×10m 이상"],
      ["실시간 연동", "Unreal Engine으로 Low-Latency 다이렉트 스트리밍"],
      ["DCC · 엔진 호환", "Unreal · Unity · Blender · Maya · 3ds Max · MotionBuilder · iClone · Cascadeur · Cinema 4D"],
      ["제작 워크플로우", "라이브 스트림 · 녹화 · 멀티테이크 관리 · 자동 클린업"],
      ["출력", "주요 DCC 리그 포맷으로 다운로드"],
    ],
  },
  {
    title: "Luxonis OAK-D W PoE",
    rows: [
      ["연산 / 메모리", "4 TOPS 온디바이스(1.4 TOPS RVC2 NN) · 16GB eMMC"],
      ["Color 센서", "12MP(4032×3040) SONY IMX378 · AF 8cm~∞"],
      ["Depth 센서", "1MP×2 OmniVision OV9282 · 150° DFOV 초광각"],
      ["깊이 / 프레임", "75mm Baseline 40cm~6m(<2%) · 60~120 FPS"],
      ["내구 / 연결", "IP65 방수방진 · 산업용 M12 PoE 기가비트"],
      ["규격", "111 × 40 × 31.3 mm · 184g (1/4″·VESA)"],
    ],
  },
  {
    title: "AI 연산 서버",
    rows: [
      ["역할", "다중 카메라 비전 데이터 취합 → 3D 좌표 병합 연산"],
      ["CPU", "Intel Core i5 / i7 / i9 이상"],
      ["GPU", "NVIDIA RTX 3000 ~ 5000 시리즈 이상"],
      ["네트워크", "기가비트 PoE+ 스위치 허브 (전원+데이터)"],
    ],
  },
];

const useCases = [
  { t: "공공 · 국방", d: "외부망 없는 폐쇄망에서 100% On-Premise로 동작해 보안 환경에 안전하게 도입합니다." },
  { t: "스포츠 · 재활", d: "수트·마커 없이 일반 대상자도 즉시 캡처해 동작·자세 데이터를 수집합니다." },
  { t: "행동 분석 · 연구", d: "대형 캡처 볼륨에서 다수 인원을 캡처해 행동·움직임을 분석합니다." },
  { t: "게임 · 애니메이션", d: "마커리스 캡처 데이터를 Unreal·Maya 등 3D 파이프라인으로 연동합니다." },
  { t: "영화 · 프리비주얼", d: "사전 시각화(previs)부터 CG 워크플로우까지, 마커리스 캡처로 동작을 빠르게 확보합니다." },
  { t: "로보틱스", d: "사람의 움직임을 데이터화해 이미테이션 러닝·인간–로봇 상호작용 연구에 활용합니다." },
  { t: "XR / VP", d: "초저지연 다이렉트 스트리밍으로 라이브 버추얼 프로덕션에 활용합니다." },
];

const process = [
  { step: "01", t: "상담 · 요구분석", d: "캡처 환경·인원·망분리 요건을 파악합니다." },
  { step: "02", t: "구성 제안 · 견적", d: "카메라 대수·볼륨·서버 사양을 설계하고 견적을 제시합니다." },
  { step: "03", t: "설치 · 셋업 · 교육", d: "현장 설치·보안 세팅 후 운영 교육을 진행합니다." },
  { step: "04", t: "운영 · 기술지원", d: "도입 이후 운영과 기술지원을 지속 제공합니다." },
];

const faqs = [
  { q: "마커나 슈트가 필요한가요?", a: "필요 없습니다. 전용 수트·마커 부착 없이 AI 비전 카메라만으로 캡처하며, 일반인도 별도 착용·개인 캘리브레이션 없이 즉시 사용할 수 있습니다." },
  { q: "외부망 없이 폐쇄 환경에서 쓸 수 있나요?", a: "네. 클라우드 통신을 전면 차단한 100% 로컬 연산(On-Premise) 방식이라, 공공·국방 등 망분리 환경에 대응합니다." },
  { q: "카메라는 몇 대가 필요한가요?", a: "최소 4대로 시작해 최대 16대 이상까지 확장할 수 있으며, 캡처 볼륨은 4m×4m에서 10m×10m 이상까지 커버합니다." },
  { q: "동시에 몇 명까지 캡처할 수 있나요?", a: "캡처 볼륨·카메라 구성에 따라 달라지므로, 운영 환경을 기준으로 상담 시 안내드립니다." },
  { q: "실시간 라이브 연동이 되나요?", a: "Unreal Engine 등 주요 3D 솔루션으로 초저지연(Low-Latency) 다이렉트 스트리밍을 지원해 라이브 연동과 후처리 워크플로우 모두 가능합니다." },
  { q: "어떤 3D 소프트웨어와 연동되나요?", a: "Unreal Engine·Unity·Blender·Maya·3ds Max·MotionBuilder·iClone·Cascadeur·Cinema 4D 등 주요 DCC·엔진과 연동되며, 캡처 데이터를 각 툴의 리그 포맷으로 내려받아 활용할 수 있습니다." },
];

export default function MoversePage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Product", href: "/product" },
          { label: "Moverse AI", href: "/product/moverse" },
        ]}
        tag="Korea Distributor"
        title="수트도, 마커도 없이. AI가 움직임을 읽습니다."
        lead="AI 비전 카메라와 로컬 네트워크만으로 다수 인원을 동시에 캡처하는 마커리스 AI 모션캡처. 클라우드 없이 100% 로컬로 동작해 폐쇄 환경에서도 안전합니다."
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
          <SectionLabel index="01">Showcase</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            캡처 프리뷰
          </h2>
          <figure className="mx-auto mt-12 max-w-4xl">
            <MediaBlank
              tag="CAPTURE PREVIEW"
              glyph="play"
              label="캡처 프리뷰 준비 중"
              sublabel="실측 자료 확보 후 교체 예정"
              className="aspect-video"
            />
            <figcaption className="mt-3 text-center font-mono text-xs text-faint">
              Moverse 마커리스 모션캡처 — 자료 준비 중
            </figcaption>
          </figure>
        </div>
      </section>

      {/* §02 Why Moverse */}
      <section className="section section--white section--glow">
        <div className="container-ex">
          <SectionLabel index="02">Why Moverse</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            왜 Moverse인가
          </h2>
          <div className="mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {why.map((w) => (
              <div key={w.t} className="card" style={{ padding: 28 }}>
                <h3 className="text-xl font-semibold text-fg">{w.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §03 System */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionLabel index="03">System</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            구성 한눈에
          </h2>
          <div className="mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {system.map((s) => (
              <div key={s.name} className="card" style={{ padding: 28 }}>
                <span className="font-mono text-[11px] uppercase tracking-wider text-lav">{s.role}</span>
                <h3 className="mt-1 text-xl font-semibold text-fg">{s.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm text-muted">
            상세 사양은 아래 <span className="text-fg">§05 Specifications</span>에서 확인하세요.
          </p>
        </div>
      </section>

      {/* §04 Key Features */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="04">Key Features</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            주요 기능
          </h2>
          <div className="mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.t} className="card" style={{ padding: 24 }}>
                <h3 className="font-semibold text-fg">{f.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §05 Specifications */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionLabel index="05">Specifications</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            상세 사양
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
            아래 사양은 Moverse 제품 사양이며, EX는 공식 한국 총판으로서 도입·기술지원을 담당합니다.
          </p>
          <div className="mt-12 max-w-3xl">
            <SpecTable groups={specGroups} />
          </div>
        </div>
      </section>

      {/* §06 Use Cases */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="06">Use Cases</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            활용 분야
          </h2>
          <div className="mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* §07 도입 절차 */}
      <section className="section section--surface section--glow">
        <div className="container-ex">
          <SectionLabel index="07">Process</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            도입 절차
          </h2>
          <ol className="mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* §08 FAQ */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="08">FAQ</SectionLabel>
          <h2 className="h2" style={{ marginTop: 22 }}>
            도입 전 자주 묻는 질문
          </h2>
          <div className="card mt-12 max-w-3xl" style={{ overflow: "hidden", padding: 0 }}>
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

      {/* §09 EX × Moverse */}
      <section className="section section--surface section--glow">
        <div className="container-ex">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel index="09">EX × Moverse</SectionLabel>
              <h2 className="h2" style={{ marginTop: 22 }}>
                EX는 Moverse의 <span className="text-lav">공식 한국 총판</span>입니다.
              </h2>
              <p className="lead" style={{ maxWidth: "36rem" }}>
                하드웨어·소프트웨어 공급은 물론, 시스템 설치·보안 세팅·현장 교육을 포함한 통합 턴키로 국내 도입 전 과정을 책임집니다.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {["도입 컨설팅", "시스템 셋업", "보안 세팅", "교육·기술 지원"].map((x) => (
                  <li key={x} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-fg">
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact" variant="accent">
                  도입 상담 →
                </Button>
                <Button href="/support" variant="secondary">
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
