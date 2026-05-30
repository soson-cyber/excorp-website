import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { Gauge } from "@/components/motion/Gauge";

export const metadata: Metadata = {
  title: "Moverse AI — 마커리스 AI 모션캡처",
  description:
    "전용 수트·마커 없이 AI 비전 카메라와 로컬 네트워크만으로 다수 인원을 캡처하는 Moverse. 100% On-Premise(망분리 대응), 4~16대+ 확장, 대형 캡처 볼륨. EX 공식 한국 총판.",
};

const quickSpecs = [
  { v: "Markerless", l: "마커·수트 불필요" },
  { v: "On-Premise", l: "100% 로컬 · 망분리" },
  { v: "4→16+", l: "카메라 확장" },
  { v: "Low-Latency", l: "실시간 스트리밍" },
];

const system = [
  {
    name: "Moverse AI Software",
    role: "Software",
    desc: "AI 비전으로 스켈레톤을 추출하고 모션 데이터로 변환하는 엔진. 클라우드 통신을 전면 차단한 100% 로컬 연산(On-Premise) 방식.",
  },
  {
    name: "Luxonis OAK-D W PoE",
    role: "AI Depth Camera",
    desc: "150° 초광각 산업용 AI 뎁스 카메라. 4 TOPS 온디바이스 연산과 IP65 방수·방진으로 4~16대까지 확장합니다.",
  },
  {
    name: "AI 연산 서버 · PoE 허브",
    role: "Compute & Network",
    desc: "다중 카메라 비전 데이터를 취합해 3D 좌표를 병합 연산하는 로컬 서버와, 전원·데이터를 함께 공급하는 기가비트 PoE+ 스위치 허브.",
  },
];

const features = [
  { t: "마커리스 · 수트 불필요", d: "전용 수트·마커 부착 없이 일반인도 즉시 캡처, 캘리브레이션 시간 제로화." },
  { t: "100% 로컬 (On-Premise)", d: "클라우드 통신을 전면 차단해 공공·국방 망분리 환경에 완벽 대응." },
  { t: "다중 카메라 확장", d: "최소 4대에서 최대 16대 이상의 다중 카메라 환경으로 확장." },
  { t: "대형 캡처 볼륨", d: "4m×4m에서 10m×10m 이상의 대형 공간을 커버." },
  { t: "초저지연 다이렉트 스트리밍", d: "Unreal Engine 등 주요 3D 솔루션으로 Low-Latency 스트리밍." },
  { t: "산업용 AI 뎁스 비전", d: "4 TOPS 온디바이스 연산·12MP·150° 초광각·IP65 방수방진 카메라." },
];

const specGroups = [
  {
    title: "Moverse AI Software",
    rows: [
      ["보안 / 구동", "클라우드 차단 100% 로컬 연산(On-Premise) · 망분리 대응"],
      ["편의성", "마커·수트 불필요 · 캘리브레이션 제로화"],
      ["확장성", "최소 4대 ~ 최대 16대+ 다중 카메라"],
      ["캡처 볼륨", "4m×4m ~ 10m×10m 이상"],
      ["엔진 연동", "Unreal Engine 등 Low-Latency 다이렉트 스트리밍"],
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

const useCases = ["게임 · 애니메이션", "XR / VP", "행동 분석 · 연구", "스포츠 · 재활", "공공 · 국방"];

const faqs = [
  { q: "마커나 슈트가 필요한가요?", a: "필요 없습니다. 전용 수트·마커 부착 없이 AI 비전 카메라만으로 캡처하며, 일반인도 별도 착용·캘리브레이션 없이 즉시 사용할 수 있습니다." },
  { q: "외부망 없이 폐쇄 환경에서 쓸 수 있나요?", a: "네. 클라우드 통신을 전면 차단한 100% 로컬 연산(On-Premise) 방식이라, 공공·국방 등 망분리 환경에 완벽히 대응합니다." },
  { q: "카메라는 몇 대가 필요한가요?", a: "최소 4대로 시작해 최대 16대 이상까지 확장할 수 있으며, 캡처 볼륨은 4m×4m에서 10m×10m 이상까지 커버합니다." },
  { q: "실시간 라이브 연동이 되나요?", a: "Unreal Engine 등 주요 3D 솔루션으로 초저지연(Low-Latency) 다이렉트 스트리밍을 지원해 라이브 연동과 후처리 워크플로우 모두 가능합니다." },
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
        lead="AI 비전 카메라와 로컬 네트워크만으로 다수 인원을 캡처하는 차세대 마커리스 모션캡처. 클라우드 없이 100% 로컬로 동작해 폐쇄 환경에서도 안전합니다."
      />

      {/* Quick spec bar */}
      <section className="border-b border-border bg-surface/40">
        <div className="container-ex grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
          {quickSpecs.map((s) => (
            <div key={s.l} className="text-center">
              <p className="font-mono text-3xl font-bold text-gradient-ex">{s.v}</p>
              <p className="mt-1.5 text-sm text-muted">{s.l}</p>
              <Gauge className="mx-auto mt-3 w-3/4" />
            </div>
          ))}
        </div>
      </section>

      {/* System */}
      <section className="container-ex py-section">
        <div className="text-center">
          <SectionLabel index="01">System</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">구성</h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {system.map((s) => (
            <div key={s.name} className="rounded-2xl border border-border bg-surface p-7">
              <span className="font-mono text-[11px] uppercase tracking-wider text-primary">{s.role}</span>
              <h3 className="mt-1 text-xl font-semibold">{s.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-surface/40">
        <div className="container-ex py-section">
          <div className="text-center">
            <SectionLabel index="02">Key Features</SectionLabel>
            <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">주요 기능</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.t} className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-semibold">{f.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="container-ex py-section">
        <div className="text-center">
          <SectionLabel index="03">Specifications</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">상세 사양</h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-3">
          {specGroups.map((g) => (
            <div key={g.title} className="overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="border-b border-border px-6 py-4 font-semibold">{g.title}</div>
              <dl>
                {g.rows.map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1 border-b border-border/60 px-6 py-3.5 last:border-0">
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-faint">{k}</dt>
                    <dd className="text-sm text-fg">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-surface/40">
        <div className="container-ex py-section">
          <SectionLabel index="04">Use Cases</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">활용 분야</h2>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-5">
            {useCases.map((u) => (
              <div key={u} className="bg-surface p-6 text-center font-medium">
                {u}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-ex py-section">
        <div className="text-center">
          <SectionLabel index="05">FAQ</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">도입 전 자주 묻는 질문</h2>
        </div>
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
          {faqs.map((f) => (
            <details key={f.q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-fg">
                {f.q}
                <span className="font-mono text-primary transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* EX × Moverse — official distributor + certificate */}
      <section className="bg-surface/40">
        <div className="container-ex py-section">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel index="06">EX × Moverse</SectionLabel>
              <h2 className="mt-5 text-balance text-3xl font-bold leading-snug md:text-4xl">
                EX는 Moverse의 <span className="font-semibold text-primary">공식 한국 총판</span>입니다.
              </h2>
              <p className="mt-5 text-pretty text-muted">
                하드웨어·소프트웨어 공급은 물론, 시스템 설치·보안 세팅·현장 교육을 포함한 통합 턴키로
                국내 도입 전 과정을 책임집니다.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {["도입 컨설팅", "시스템 셋업", "보안 세팅", "교육·기술 지원"].map((x) => (
                  <li key={x} className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg">
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact" variant="accent">
                  제품 도입 문의 →
                </Button>
                <Button href="/contact" variant="secondary">
                  데모 신청 →
                </Button>
              </div>
            </div>
            <figure>
              <div className="overflow-hidden rounded-2xl border border-border">
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
