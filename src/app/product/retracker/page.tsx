import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { Gauge } from "@/components/motion/Gauge";
import { SpecTable } from "@/components/product/SpecTable";

export const metadata: Metadata = {
  title: "RETracker — 6-DOF 마커리스 카메라 트래킹",
  description:
    "천장 마커 없이 동작하는 6-DOF 마커리스 카메라 트래킹 RETracker. Bliss G2 센서 + Fizz 2 Pro 렌즈 인코더. 오차 <1cm/10m, 500fps IMU 퓨전, Unreal·Aximmetry 연동. EX 공식 한국 총판.",
};

// 한눈 사양 (buyers가 가장 먼저 보는 수치, 모두 1차 규격서 기준)
const quickSpecs = [
  { v: "<1cm/10m", l: "트래킹 정확도" },
  { v: "500fps", l: "IMU 센서 퓨전" },
  { v: "6-DOF", l: "마커리스 트래킹" },
  { v: "Marker-less", l: "천장 마커 불필요" },
];

const lineup = [
  {
    name: "RETracker Bliss G2",
    role: "Tracking Sensor",
    desc: "Intel Movidius Myriad X VPU로 자체 vSLAM을 독립 연산하는 6-DOF 마커리스 카메라 트래킹 센서. 천장 마커 없이 카메라의 위치·방향을 실시간 추적합니다.",
    img: "/retracker-bliss.png",
    w: 409,
    h: 152,
  },
  {
    name: "RETracker Fizz 2 Pro",
    role: "Lens FIZ Encoder",
    desc: "렌즈의 Focus·Iris·Zoom(FIZ) 값을 물리적으로 추출하는 인코더. 가상 스튜디오의 심도·시야각에 실시간 반영해 실사와 정합합니다.",
    img: "/retracker-fizz.png",
    w: 297,
    h: 226,
  },
];

const features = [
  { t: "100% 마커리스", d: "천장 마커가 필요 없는 마커리스 매핑. 공간 이동 범위 무제한." },
  { t: "초정밀 6-DOF", d: "10m 이동 시 1cm 미만(<1cm) 오차, 초당 500fps IMU 센서 퓨전." },
  { t: "자체 vSLAM 독립 연산", d: "Intel Movidius Myriad X VPU가 디바이스에서 직접 공간을 매핑." },
  { t: "Jitter 제로 · 환경 적응", d: "Noise Rejection AI로 움직이는 물체를 필터링, 급격한 조명 변화에도 대응." },
  { t: "FIZ 렌즈 데이터 정합", d: "Fizz 2 Pro가 렌즈 메타데이터를 추출해 가상 환경 심도를 실시간 반영." },
  { t: "단일 USB-C · 핫슈 장착", d: "케이블 하나로 전원·데이터를 해결, 표준 카메라 핫슈로 간편 장착." },
];

const specGroups: { title: string; rows: [string, string][] }[] = [
  {
    title: "Bliss G2 — Tracking Sensor",
    rows: [
      ["프로세서", "Intel Movidius Myriad X VPU (자체 vSLAM 독립 연산)"],
      ["AI 엔진", "High-Speed CNN Engine + SGBM 뎁스 엔진"],
      ["RGB 센서", "13MP (H.265·JPEG 하드웨어 압축, HDR)"],
      ["IMU", "9축 고속 IMU (가속도·자이로·지자계, Low-drift)"],
      ["정확도 / 속도", "10m당 <1cm 오차 · 500fps IMU 퓨전"],
      ["연결 / 마운트", "단일 USB Type-C(전원+데이터)·UART · 표준 핫슈"],
      ["프로토콜", "LiveLink Bliss · Free-D · OSC · FBX(with LTC)"],
      ["연동 엔진", "Unreal 4.27~5.x · Aximmetry · Blender · Ventuz"],
      ["부가", "HW Genlock 모듈 · WorldPose 자동 캘리브레이션"],
    ],
  },
  {
    title: "Fizz 2 Pro — Lens FIZ Encoder",
    rows: [
      ["FIZ 데이터", "렌즈 Focus·Iris·Zoom 물리 추출 → 심도·시야각 반영"],
      ["프로토콜", "Unreal LiveLink · Free-D"],
      ["디스플레이", "1.3″ OLED 스크린"],
      ["규격 / 무게", "155 × 80 × 42 mm · 0.353 kg"],
      ["전원", "5V DC (USB Type-C)"],
      ["I/O", "12-pin LEMO · BNC(Genlock) · RJ45 LAN · USB-C · USB-A"],
    ],
  },
  {
    title: "Bliss Software — Data Link",
    rows: [
      ["역할", "Bliss G2 원시 공간 데이터를 엔진으로 송출"],
      ["연동", "Aximmetry · Unreal Engine"],
      ["전송", "방송 표준 Free-D 기반 실시간 로우 레이턴시"],
    ],
  },
];

const useCases = ["방송 가상 스튜디오", "Virtual Production", "ICVFX (LED 월)", "라이브 · 중계"];

const faqs = [
  { q: "마커나 트래킹 설비가 필요한가요?", a: "필요 없습니다. Bliss G2는 천장 마커가 필요 없는 100% 마커리스 방식으로, 별도 설비 없이 카메라에 장착해 공간을 직접 매핑합니다. 이동 범위 제한도 없습니다." },
  { q: "트래킹 정확도는 어느 정도인가요?", a: "10m 이동 시 1cm 미만(<1cm)의 초정밀 오차이며, 초당 500fps IMU 센서 퓨전으로 핸드헬드·빠른 무빙에서도 안정적입니다." },
  { q: "Bliss와 Fizz는 어떻게 함께 쓰나요?", a: "Bliss G2가 카메라의 위치·방향(6-DOF)을 추적하고, Fizz 2 Pro가 렌즈의 Focus·Iris·Zoom 값을 추출해 가상 배경의 심도·시야각을 실사와 정합합니다." },
  { q: "어떤 엔진과 연동되나요?", a: "Unreal Engine(4.27~5.x), Aximmetry, Blender, Ventuz와 호환되며 LiveLink Bliss·Free-D·OSC·FBX(with LTC) 프로토콜을 지원합니다." },
];

export default function RetrackerPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Product", href: "/product" },
          { label: "RETracker", href: "/product/retracker" },
        ]}
        tag="Korea Distributor"
        title="천장 마커 없이, 카메라가 공간을 읽습니다."
        lead="자체 vSLAM을 독립 연산하는 6-DOF 마커리스 카메라 트래킹. Bliss G2 센서와 Fizz 2 Pro 렌즈 인코더로 실사와 가상을 프레임 단위로 정합합니다."
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
        <div>
          <SectionLabel index="01">Lineup</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">두 가지 핵심 장치로 구성됩니다</h2>
        </div>
        <div className="mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
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
        <p className="mt-6 max-w-2xl text-sm text-muted">
          여기에 <span className="text-fg">Bliss Software</span>가 더해져, 센서의 원시 공간 데이터를 Aximmetry·Unreal로 실시간 송출합니다.
        </p>
      </section>

      {/* Key Features */}
      <section className="bg-surface/40">
        <div className="container-ex py-section">
          <div>
            <SectionLabel index="02">Key Features</SectionLabel>
            <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">주요 특징</h2>
          </div>
          <div className="mt-12 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
        <div>
          <SectionLabel index="03">Specifications</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">상세 사양</h2>
        </div>
        <div className="mt-12 max-w-3xl">
          <SpecTable groups={specGroups} />
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
        <div>
          <SectionLabel index="05">FAQ</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">도입 전 자주 묻는 질문</h2>
        </div>
        <div className="mt-12 max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
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
                EX는 RETracker의 <span className="font-semibold text-primary">공식 한국 총판</span>입니다.
              </h2>
              <p className="mt-5 text-pretty text-muted">
                하드웨어·소프트웨어 공급은 물론, 시스템 설치·보안 세팅·현장 교육을 포함한 통합 턴키로
                도입 전 과정을 책임집니다.
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
                  도입 상담 →
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
                  alt="RETracker 공식 한국 총판 인증서 (Certificate of Excellence — EX Corporation)"
                  width={958}
                  height={740}
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 text-center font-mono text-xs text-faint">
                RETracker Certificate of Excellence — EX Corporation
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
