import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { Gauge } from "@/components/motion/Gauge";

export const metadata: Metadata = {
  title: "Moverse AI — 마커리스 모션캡처",
  description:
    "마커·슈트 없이 AI 비전으로 실시간 캡처하는 마커리스 모션캡처 Moverse. 4대로 시작해 16대+로 확장. EX 공식 한국 대표·총판.",
};

const quickSpecs = [
  { v: "Markerless", l: "마커·슈트 없음" },
  { v: "Real-time", l: "실시간 캡처" },
  { v: "4→16+", l: "카메라 스케일링" },
  { v: "0", l: "캘리브레이션·슈트업 시간" },
];

const system = [
  {
    name: "AI Motion Processor",
    role: "Server",
    desc: "AI 비전 알고리즘으로 카메라 영상에서 움직임을 추출·정합하는 처리 서버.",
  },
  {
    name: "Camera Array",
    role: "4 → 16+ Units",
    desc: "4대 린 셋업으로 시작해 더 큰 볼륨·다인원·고품질이 필요하면 16대 이상으로 확장.",
  },
];

const features = [
  { t: "마커리스", d: "웨어러블·마커·슈트 없이 그대로 캡처." },
  { t: "실시간 캡처", d: "AI가 움직임을 실시간으로 읽어 즉시 활용." },
  { t: "확장형 카메라 어레이", d: "4대→16대+ 확장으로 볼륨·인원·품질을 조절." },
  { t: "셋업 시간 제거", d: "캘리브레이션·슈트업 시간을 없애 제작 시간 단축." },
  { t: "프로덕션급 데이터", d: "정제된 고품질 모션 데이터를 즉시 산출." },
  { t: "AI 기반 정밀 처리", d: "AI 알고리즘으로 정확도와 사용 편의성 확보." },
];

const specs = [
  ["구성", "AI Motion Processor + 카메라 어레이"],
  ["카메라", "4대(린 셋업) ~ 16대+ (확장 시 볼륨·인원·품질 ↑)"],
  ["캡처 방식", "마커리스 · 슈트 불필요 · 실시간"],
  ["셋업", "캘리브레이션·슈트업 시간 제거"],
  ["출력", "프로덕션급 모션 데이터 (FBX 등) · 재가공 가능"],
];

const useCases = ["게임 개발", "XR / VP", "메타버스", "교육", "스포츠·재활"];

const faqs = [
  { q: "카메라가 몇 대 필요한가요?", a: "4대 린 셋업으로 시작할 수 있고, 더 큰 볼륨·다인원·고품질이 필요하면 16대 이상으로 확장합니다." },
  { q: "실시간 라이브 연동이 되나요?", a: "실시간 캡처를 지원하여 라이브 연동과 배치(후처리) 워크플로우 모두 가능합니다." },
  { q: "마커나 슈트가 필요한가요?", a: "필요 없습니다. 마커·슈트 착용과 캘리브레이션 시간을 없애 셋업을 대폭 단축합니다." },
  { q: "어떤 데이터로 출력되나요?", a: "프로덕션에 바로 쓸 수 있는 정제된 모션 데이터(FBX 등)로 추출되며 재가공도 지원합니다." },
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
        title="센서 없이, 마커 없이. AI가 움직임을 읽습니다."
        lead="웨어러블이 사라진 마커리스 모션캡처. AI 비전 기반으로 셋업 시간을 0에 가깝게 줄여 물리 퍼포먼스에서 디지털 에셋까지 최단 경로로 연결합니다."
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

      {/* System & Scaling */}
      <section className="container-ex py-section">
        <div className="text-center">
          <SectionLabel index="01">System</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">구성과 확장</h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
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
        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-border bg-surface">
          <dl>
            {specs.map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1 border-b border-border/60 px-6 py-4 last:border-0 sm:flex-row sm:gap-6">
                <dt className="w-32 shrink-0 font-mono text-xs uppercase tracking-wider text-faint">{k}</dt>
                <dd className="text-sm text-fg">{v}</dd>
              </div>
            ))}
          </dl>
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
                EX는 Moverse Capture의 <span className="text-gradient-ex">공식 한국 대표·총판</span>입니다.
              </h2>
              <p className="mt-5 text-pretty text-muted">
                Moverse Private Company와의 공식 파트너십을 바탕으로, 도입 검토부터 시스템 셋업·교육·기술
                지원까지 국내 도입 전 과정을 책임집니다.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {["도입 컨설팅", "시스템 셋업", "교육", "기술 지원"].map((x) => (
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
                  alt="Moverse Capture 공식 한국 대표·총판 인증서 (Certificate of Excellence — EX Corporation)"
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
