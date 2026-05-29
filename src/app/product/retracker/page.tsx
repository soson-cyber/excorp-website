import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { Gauge } from "@/components/motion/Gauge";

export const metadata: Metadata = {
  title: "RETracker — 6DoF 광학 카메라 트래킹",
  description:
    "VR·AR·LED(ICVFX) 프로덕션을 위한 정밀 6DoF 광학 카메라 트래킹 RETracker (Bliss / Fizz). 오차 <1cm/10m, 500fps, 평생 라이선스. EX 공식 한국 총판.",
};

// 한눈 사양 (buyers가 가장 먼저 보는 수치)
const quickSpecs = [
  { v: "<1cm/10m", l: "트래킹 정확도" },
  { v: "500fps", l: "핸드헬드 대응" },
  { v: "6DoF", l: "광학 트래킹" },
  { v: "Lifetime", l: "평생 라이선스" },
];

const lineup = [
  {
    name: "RETracker Bliss",
    role: "Tracking Sensor",
    desc: "고정밀 6DoF 카메라 위치 추적 센서. vSLAM 3D 매핑과 스테레오 뎁스 엔진으로 카메라의 위치·방향을 실시간 추적합니다.",
    img: "/retracker-bliss.png",
    w: 409,
    h: 152,
  },
  {
    name: "RETracker Fizz / Fizz II",
    role: "Lens FIZ Reader",
    desc: "렌즈의 포커스·아이리스·줌(FIZ) 데이터를 수집하는 고정밀 리더. 가상 카메라의 렌즈 왜곡·심도를 실사와 정합합니다.",
    img: "/retracker-fizz.png",
    w: 297,
    h: 226,
  },
];

const features = [
  { t: "정밀 6DoF 트래킹", d: "오차 1cm/10m 미만의 위치 정확도로 카메라 이동을 실시간 추적." },
  { t: "실내외 + 핸드헬드", d: "500fps 트래킹으로 야외·핸드헬드 촬영에서도 안정적." },
  { t: "ICVFX 최적화", d: "LED 월·가상 배경과의 정밀 렌즈 매칭으로 자연스러운 합성." },
  { t: "빠른 캘리브레이션", d: "World Pose 기능으로 반복 세팅 시간을 최소화." },
  { t: "Unreal · Aximmetry 연동", d: "주요 VP 렌더 엔진과 실시간 호환." },
  { t: "Genlock · Zero-jitter", d: "9축 IMU·칼만 필터 기반 안정적 동기화." },
];

const specs = {
  bliss: [
    ["프로세서", "Intel Movidius Myriad X VPU"],
    ["센서", "9축 IMU · 피시아이 스테레오 뎁스 · 13MP RGB"],
    ["트래킹", "임베디드 vSLAM(3D 매핑) · 6DoF"],
    ["정확도 / 속도", "오차 <1cm/10m · 최대 500fps"],
    ["기능", "Genlock · World Pose · Zero-jitter · Kalman"],
  ],
  fizz: [
    ["지원 렌즈", "Canon · Fujinon 서보(20핀) · LEMO · Cooke/Zeiss /i"],
    ["인코더", "16-bit 고정밀 FIZ 인코더"],
    ["데이터", "포커스 · 아이리스 · 줌 실시간 수집"],
    ["연결", "UART · USB-C 인터페이스"],
    ["옵션", "Genlock 애드온"],
  ],
};

const useCases = ["방송 · 라이브", "Virtual Production", "ICVFX (LED 월)", "야외 프로덕션"];

const faqs = [
  { q: "어떤 렌즈를 지원하나요?", a: "Fizz/Fizz II가 Canon·Fujinon 서보 렌즈(20핀), LEMO, Cooke·Zeiss /i 데이터 렌즈를 지원합니다. 보유 렌즈 호환은 사전 확인해 드립니다." },
  { q: "Bliss만으로 트래킹이 가능한가요?", a: "카메라 위치·방향(6DoF)은 Bliss로 추적합니다. 렌즈 FIZ 데이터(가상 배경 정합)가 필요하면 Fizz를 함께 구성합니다." },
  { q: "Genlock이 꼭 필요한가요?", a: "방송·LED 환경의 정밀 동기화에는 Genlock 애드온을 권장하며, 용도에 따라 선택 구성합니다." },
  { q: "어떤 엔진과 연동되나요?", a: "Unreal Engine, Aximmetry 등 주요 VP 렌더 엔진과 실시간 연동됩니다." },
];

export default function RetrackerPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Product", href: "/product" },
          { label: "RETracker", href: "/product/retracker" },
        ]}
        tag="Korea Distributor · Rassi Engineering"
        title="모든 카메라, 모든 환경에 대응하는 정밀 광학 트래커."
        lead="VR·AR·LED(ICVFX) 프로덕션을 위한 실시간 6DoF 광학 카메라 트래킹. 평생 라이선스로 제공되며 고사양 VPU 기반으로 동작합니다."
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

      {/* Lineup */}
      <section className="container-ex py-section">
        <div className="text-center">
          <SectionLabel index="01">Lineup</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">두 가지 핵심 장치로 구성됩니다</h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          {lineup.map((p) => (
            <div key={p.name} className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex h-44 items-center justify-center rounded-xl bg-bg/60">
                <Image src={p.img} alt={p.name} width={p.w} height={p.h} className="max-h-36 w-auto" />
              </div>
              <span className="mt-5 font-mono text-[11px] uppercase tracking-wider text-primary">{p.role}</span>
              <h3 className="mt-1 text-xl font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-surface/40">
        <div className="container-ex py-section">
          <div className="text-center">
            <SectionLabel index="02">Key Features</SectionLabel>
            <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">주요 특징</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          {(["bliss", "fizz"] as const).map((key) => (
            <div key={key} className="overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="border-b border-border px-6 py-4 font-semibold">
                {key === "bliss" ? "Bliss — Tracking Sensor" : "Fizz — Lens FIZ Reader"}
              </div>
              <dl>
                {specs[key].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1 border-b border-border/60 px-6 py-3.5 last:border-0 sm:flex-row sm:gap-4">
                    <dt className="w-32 shrink-0 font-mono text-xs uppercase tracking-wider text-faint">{k}</dt>
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
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
            {useCases.map((u) => (
              <div key={u} className="bg-surface p-6 text-center font-medium">
                {u}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — 도입 고려 */}
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

      {/* EX × RETracker — official distributor + certificate */}
      <section className="bg-surface/40">
        <div className="container-ex py-section">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel index="06">EX × RETracker</SectionLabel>
              <h2 className="mt-5 text-balance text-3xl font-bold leading-snug md:text-4xl">
                EX는 RETracker의 <span className="text-gradient-ex">공식 한국 총판</span>입니다.
              </h2>
              <p className="mt-5 text-pretty text-muted">
                Rassi Engineering LTD와의 공식 파트너십을 바탕으로, 국내 최고 수준의 카메라 캘리브레이션
                노하우와 기술 특허를 보유하고 도입·교육·기술 지원을 책임집니다.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {["도입 컨설팅", "캘리브레이션", "교육", "기술 지원"].map((x) => (
                  <li key={x} className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg">
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact" variant="accent">
                  제품 도입 문의 →
                </Button>
                <Button href="/support" variant="secondary">
                  기술 사양서 요청 →
                </Button>
              </div>
            </div>
            <figure>
              <div className="overflow-hidden rounded-2xl border border-border">
                <Image
                  src="/cert-retracker.png"
                  alt="RETracker 공식 한국 대표·총판·기술지원 인증서 (Certificate of Excellence — EX Corporation)"
                  width={958}
                  height={740}
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 text-center font-mono text-xs text-faint">
                RETracker Certificate of Excellence — Rassi Engineering LTD
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
