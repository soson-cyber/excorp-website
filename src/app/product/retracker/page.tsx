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
  title: "RETracker — 6-DOF 마커리스 카메라 트래킹",
  alternates: { canonical: "/product/retracker" },
  description:
    "천장 마커 없이 동작하는 6-DOF 마커리스 카메라 트래킹 RETracker. Bliss G2 센서 + Fizz 2 Pro 렌즈 인코더. 오차 <1cm/10m, 500fps IMU 퓨전, Unreal·Aximmetry 연동. EX 공식 한국 총판.",
};

// quickSpec: 숫자는 solid text-fg. 수치 스펙(<1cm/10m·500fps)엔 Gauge 의미 매핑, 비수치엔 제거.
const quickSpecs: { v: string; l: string; gauge?: boolean }[] = [
  { v: "<1cm/10m", l: "트래킹 정확도", gauge: true },
  { v: "500fps", l: "IMU 센서 퓨전", gauge: true },
  { v: "6-DOF", l: "마커리스 트래킹" },
  { v: "Marker-less", l: "천장 마커 불필요" },
];

const whyPoints = [
  {
    t: "100% 마커리스",
    d: "천장에 마커를 붙이는 사전 설비가 필요 없습니다. 카메라에 센서를 장착하면 공간을 직접 매핑해, 이동 범위 제한 없이 어디서나 트래킹합니다.",
  },
  {
    t: "6-DOF · <1cm/10m · 500fps IMU 퓨전",
    d: "위치·방향 6자유도를 10m 이동 시 1cm 미만 오차(제조사 사양 기준)로 추적하고, 500fps IMU 퓨전으로 핸드헬드·빠른 무빙에서도 안정적입니다.",
  },
  {
    t: "Unreal · Aximmetry 실시간 연동",
    d: "방송 표준 Free-D와 LiveLink Bliss를 통해 Unreal Engine·Aximmetry로 트래킹 데이터를 낮은 지연으로 송출합니다.",
  },
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
  {
    name: "RETracker Bliss Software",
    role: "Data Link",
    desc: "Bliss G2의 원시 공간 데이터를 방송 표준 Free-D 기반으로 Aximmetry·Unreal에 실시간 송출하는 데이터 링크 소프트웨어.",
    img: null,
  },
];

const features = [
  { t: "100% 마커리스", d: "천장 마커가 필요 없는 마커리스 매핑. 공간 이동 범위 무제한." },
  { t: "초정밀 6-DOF", d: "10m 이동 시 1cm 미만(<1cm) 오차, 초당 500fps IMU 센서 퓨전. (제조사 사양 기준)" },
  { t: "자체 vSLAM 독립 연산", d: "Intel Movidius Myriad X VPU가 디바이스에서 직접 공간을 매핑." },
  { t: "Kalman 필터링 · AI 추론 엔진", d: "내장 AI 추론 엔진과 Kalman 필터링으로 움직이는 물체를 걸러 흔들림(Jitter)을 억제하고, 급격한 조명 변화에도 대응." },
  { t: "FIZ 렌즈 데이터 정합", d: "Fizz 2 Pro가 렌즈 메타데이터를 추출해 가상 환경 심도를 실시간 반영." },
  { t: "카메라 비종속 · 핫슈 장착", d: "모든 종류의 카메라 상단에 표준 핫슈로 장착하고 LAN/USB로 PC에 전송. 전용 3D 프린팅 마운트 기본 제공." },
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
      ["연결 / 마운트", "단일 USB Type-C(전원+데이터)·UART · 표준 핫슈 · 3D 프린팅 마운트 동봉"],
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
      ["라이선스", "영구(Lifetime) 라이선스 — 센서 + 소프트웨어"],
    ],
  },
];

const useCases = [
  { t: "방송 가상 스튜디오", d: "뉴스·예능 세트를 가상 배경으로 대체, 카메라 무빙에 배경이 실시간으로 따라옵니다." },
  { t: "Virtual Production", d: "사전 시각화부터 본 촬영까지, 실사 카메라 동선을 그대로 가상 환경에 반영합니다." },
  { t: "ICVFX (LED 월)", d: "LED 월 위 배경의 시점이 카메라 위치에 맞춰 변해 자연스러운 패럴랙스를 만듭니다." },
  { t: "라이브 · 중계", d: "핸드헬드·빠른 무빙에서도 안정적인 트래킹으로 실시간 송출 환경에 대응합니다." },
];

const process = [
  { n: "01", t: "상담 · 요구 분석", d: "촬영 환경·연동 엔진·운영 규모를 파악해 RETracker 적용 방향을 진단합니다." },
  { n: "02", t: "구성 제안 · 견적", d: "Bliss G2 + Fizz 2 Pro + Bliss Software 구성과 부가 모듈을 제안하고 견적을 산출합니다." },
  { n: "03", t: "설치 · 셋업 · 교육", d: "핫슈 장착 → WorldPose 자동 캘리브레이션 → Unreal·Aximmetry 엔진 연동 → 촬영 셋업까지 현장에서 진행하고 운영 교육을 제공합니다." },
  { n: "04", t: "운영 · 기술 지원", d: "도입 이후 운영 중 발생하는 이슈 대응과 업데이트·기술 지원을 총판으로서 담당합니다." },
];

const faqs = [
  { q: "마커나 트래킹 설비가 필요한가요?", a: "필요 없습니다. Bliss G2는 천장 마커가 필요 없는 100% 마커리스 방식으로, 별도 설비 없이 카메라에 장착해 공간을 직접 매핑합니다. 이동 범위 제한도 없습니다." },
  { q: "트래킹 정확도는 어느 정도인가요?", a: "10m 이동 시 1cm 미만(<1cm)의 초정밀 오차이며(제조사 사양 기준), 초당 500fps IMU 센서 퓨전으로 핸드헬드·빠른 무빙에서도 안정적입니다." },
  { q: "Bliss와 Fizz는 어떻게 함께 쓰나요?", a: "Bliss G2가 카메라의 위치·방향(6-DOF)을 추적하고, Fizz 2 Pro가 렌즈의 Focus·Iris·Zoom 값을 추출해 가상 배경의 심도·시야각을 실사와 정합합니다." },
  { q: "어떤 엔진과 연동되나요?", a: "Unreal Engine(4.27~5.x), Aximmetry, Blender, Ventuz와 호환되며 LiveLink Bliss·Free-D·OSC·FBX(with LTC) 프로토콜을 지원합니다." },
  { q: "어떤 카메라에 장착할 수 있나요?", a: "모든 종류의 카메라와 호환됩니다. 센서를 카메라 상단에 표준 핫슈로 장착하고 LAN/USB로 PC에 데이터를 전송하는 카메라 비종속 방식이며, 전용 3D 프린팅 마운트가 기본 제공됩니다. 실내·실외 모두 이동 범위 제한 없이 사용할 수 있습니다." },
];

export default function RetrackerPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Product", href: "/product" },
          { label: "RETracker", href: "/product/retracker" },
        ]}
        tag="Distributor"
        title="천장 마커 없이, 카메라가 공간을 읽습니다."
        lead="자체 vSLAM을 독립 연산하는 6-DOF 마커리스 카메라 트래킹. Bliss G2 센서와 Fizz 2 Pro 렌즈 인코더로 실사와 가상을 프레임 단위로 정합합니다."
      />

      {/* Quick spec bar */}
      <section className="section--surface" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="container-ex grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
          {quickSpecs.map((s) => (
            <div key={s.l} className="text-center">
              <p className="font-mono text-3xl font-bold text-fg">{s.v}</p>
              <p className="mt-1.5 text-sm text-muted">{s.l}</p>
              {s.gauge && <Gauge className="mx-auto mt-3 w-3/4" />}
            </div>
          ))}
        </div>
      </section>

      {/* §01 Showcase */}
      <section className="section section--white section--glow">
        <div className="container-ex">
          <SectionHead
            index="01"
            label="Showcase"
            title={
              <>
                <span className="inline-block">카메라가 움직이는 그대로,</span>{" "}
                <span className="inline-block">공간이 따라옵니다</span>
              </>
            }
            lead="마커 없이 추적한 카메라의 6-DOF 위치·방향을 가상 배경에 실시간으로 정합한 트래킹 현장입니다."
            leadMaxWidth="40rem"
          />
          <figure className="mt-12">
            <div className="card" style={{ overflow: "hidden", padding: 0 }}>
              <Image
                src="/retracker-tracking.jpg"
                alt="RETracker 마커리스 카메라 트래킹 현장 — 카메라 무빙에 맞춰 정합되는 가상 공간"
                width={1280}
                height={720}
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-center font-mono text-xs text-faint">
              RETracker 6-DOF 마커리스 트래킹 — 실사 카메라 × 가상 배경 정합
            </figcaption>
          </figure>
        </div>
      </section>

      {/* §02 Why RETracker */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead index="02" label="Why RETracker" title="RETracker가 다른 점" />
          <div className="mt-12 grid max-w-4xl gap-5 md:grid-cols-3">
            {whyPoints.map((p, i) => (
              <div key={p.t} className="card" style={{ padding: 24 }}>
                <span className="font-mono text-sm text-lav">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-semibold text-fg">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §03 Lineup (구성) */}
      <section className="section section--white section--glow">
        <div className="container-ex">
          <SectionHead
            index="03"
            label="Lineup"
            title={
              <>
                <span className="inline-block">센서 · 인코더 · 소프트웨어,</span>{" "}
                <span className="inline-block">세 요소로 구성됩니다</span>
              </>
            }
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {lineup.map((p) => (
              <div key={p.name} className="card flex flex-col" style={{ padding: 24 }}>
                <div className="flex h-44 items-center justify-center rounded-xl bg-bg/60">
                  {p.img ? (
                    <Image src={p.img} alt={p.name} width={p.w} height={p.h} className="max-h-36 w-auto" />
                  ) : (
                    <span className="font-mono text-xs uppercase tracking-wider text-faint">Software</span>
                  )}
                </div>
                <span className="mt-5 font-mono text-[11px] uppercase tracking-wider text-lav">{p.role}</span>
                <h3 className="mt-1 text-xl font-semibold text-fg">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §04 Features */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead index="04" label="Features" title="주요 특징" />
          <div className="mt-12 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
      <section className="section section--white">
        <div className="container-ex">
          <SectionHead
            index="05"
            label="Specifications"
            title="상세 사양"
            lead="아래 사양은 RETracker 제품 사양이며, EX는 공식 한국 총판으로서 도입·기술지원을 담당합니다."
            leadMaxWidth="44rem"
          />
          <div className="mt-12 max-w-3xl">
            <SpecTable groups={specGroups} />
          </div>
        </div>
      </section>

      {/* §06 Use Cases */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead index="06" label="Use Cases" title="활용 분야" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((u) => (
              <div key={u.t} className="card" style={{ padding: 24 }}>
                <h3 className="font-semibold text-fg">{u.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{u.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §07 도입 절차 */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionHead
            index="07"
            label="Process"
            title="도입 절차"
            lead="상담부터 설치·운영까지, EX가 공식 한국 총판으로서 도입 전 과정을 함께합니다."
            leadMaxWidth="40rem"
          />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <li key={p.n} className="card" style={{ padding: 24 }}>
                <span className="font-mono text-sm text-lav">{p.n}</span>
                <h3 className="mt-2 font-semibold text-fg">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* §08 FAQ */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead index="08" label="FAQ" title="도입 전 자주 묻는 질문" />
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

      {/* §09 EX × RETracker */}
      <section className="section section--white section--glow">
        <div className="container-ex">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel index="09">EX × RETracker</SectionLabel>
              <h2 className="h2" style={{ marginTop: 22 }}>
                EX는 RETracker의 <span className="text-lav">공식 한국 총판</span>입니다.
              </h2>
              <p className="lead" style={{ maxWidth: "36rem" }}>
                하드웨어·소프트웨어 공급은 물론, 시스템 설치·보안 세팅·현장 교육을 포함한 통합 턴키로 도입 전 과정을 책임집니다.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {["도입 컨설팅", "캘리브레이션", "교육", "기술 지원"].map((x) => (
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
