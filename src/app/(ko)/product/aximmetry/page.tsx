import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { ControlledVideo } from "@/components/ui/ControlledVideo";
import { YouTubePreview } from "@/components/ui/YouTubePreview";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { SpecTable } from "@/components/product/SpecTable";
import { JsonLd, breadcrumbLd, faqPageLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Aximmetry 한국 공식 리셀러 — 실시간 가상 스튜디오 엔진",
  alternates: { canonical: "/product/aximmetry", languages: { "ko-KR": "/product/aximmetry", "en-US": "/en/product/aximmetry", "x-default": "/product/aximmetry" } },
  description:
    "Unreal 네이티브 연동과 노드 기반 엔진으로 최대 8K 실시간 가상 스튜디오·XR·AR를 구현하는 Aximmetry. 방송·영화용 크로마키·인카메라 VFX를 EX 공식 인증 리셀러가 지원합니다.",
};

const quickSpecs = [
  { v: "8K", l: "실시간 렌더링" },
  { v: "Node", l: "기반 그래픽 UI" },
  { v: "Unlimited", l: "SDI/NDI/2110 I/O · 라이선스 기준" },
  { v: "Unreal", l: "네이티브 연동" },
];

// §02 — 기능 및 기술. 우선순위 순(첫 항목은 영상 배너로 표시).
// img가 있으면 카드 상단에 16:9 이미지 영역을 추가한다.
const featureTech: { t: string; d: string; img?: string }[] = [
  {
    t: "최첨단 크로마 키어",
    d: "3D 클린 플레이트를 지원하는 내장 크로마 키어로 정밀한 키잉을 구현합니다. (BaM Awards 2023 Create 수상)",
  },
  {
    t: "노드 기반 편집 시스템",
    d: "복잡한 설정을 노드로 쉽게 관리하고, 사용자 정의 로직을 직접 구성합니다.",
    img: "/aximmetry-node-editor.jpg",
  },
  {
    t: "실시간 증강현실(AR)",
    d: "실사 영상 위에 고품질 AR 그래픽을 실시간으로 오버레이합니다.",
    img: "/aximmetry-ar.jpg",
  },
  {
    t: "ICVFX · LED 공간 확장",
    d: "LED 월 버추얼 프로덕션을 확장하는 고품질 설정을 제공합니다.",
    img: "/aximmetry-icvfx-led.jpg",
  },
  {
    t: "카메라 추적 · 렌즈 보정",
    d: "카메라와 렌즈 데이터를 동기화해 정밀한 카메라 연출을 구현합니다.",
    img: "/aximmetry-camera-tracking.gif",
  },
  {
    t: "단일 제어 인터페이스",
    d: "운영자 한 명이 스위칭·그래픽·연출을 한 화면에서 제어합니다.",
    img: "/aximmetry-virtual-production.jpg",
  },
  {
    t: "외부 컨트롤러 연동",
    d: "MIDI·DMX·OSC 등 다양한 외부 컨트롤러와 연결해 제어합니다.",
    img: "/aximmetry-external-control.png",
  },
];

const bfSpecs: [string, string][] = [
  ["렌더링 / 엔진", "네이티브 Aximmetry 3D 엔진 + Unreal Engine 5 통합 (UE5 씬 직접 실행)"],
  ["해상도", "최대 8K 해상도 실시간 렌더링"],
  ["그래픽", "DLSS · Ray Tracing · RTXGI (실시간 전역 조명)"],
  ["컬러", "10-bit · HDR 입출력 · 색 공간(Color Space)·감마 처리"],
  ["크로마키", "3D Clean Plate·Light Wrap을 지원하는 내장 크로마키어"],
  ["입출력", "SDI · NDI · SMPTE 2110(NMOS) · SRT I/O · 라이선스 기준 무제한(실제 채널 수는 하드웨어 구성에 따름)"],
  ["동기화", "SDI 타임코드(Timecode) · 하드웨어 젠록(Genlock)"],
  ["프로토콜", "Free-D 네이티브 · MOS(뉴스룸 통합)"],
  ["디바이스 제어", "GPIO · OSC · MIDI · DMX · ArtNet"],
  ["확장성", "다중 PC 분산 렌더링(Renderer Node) · 멀티 GPU 동기화"],
];


// §08 — 도입 절차 (공통 4스텝)
const steps = [
  { t: "상담 · 요구 분석", d: "현장 환경과 제작 목표를 진단해 필요한 하드웨어·I/O 구성을 함께 정합니다." },
  { t: "구성 제안 · 견적", d: "라이선스·하드웨어·I/O 구성을 설계하고 투명한 견적을 제시합니다." },
  { t: "설치 · 셋업 · 교육", d: "시스템 설치와 트래킹·키잉 셋업, 운영자 현장 교육을 진행합니다." },
  { t: "운영 · 기술지원", d: "공식 인증 리셀러로서 운영 중 발생하는 이슈를 지속 기술지원합니다." },
];

const faqs = [
  { q: "기존 방송 그래픽 솔루션과 무엇이 다른가요?", a: "Aximmetry는 Unreal Engine을 네이티브로 실행하고 라이선스 기준 무제한 SDI·NDI·SMPTE 2110(NMOS) 입출력과 Free-D·MOS를 지원하는 실시간 그래픽·버추얼 프로덕션 플랫폼입니다. 도입 비용·라이선스 구성은 현장 규모에 맞춰 상담 시 안내드리며, EX가 공식 인증 리셀러로 설치·교육·기술지원을 한국어로 제공합니다." },
  { q: "EX는 어떤 에디션을 공급하나요?", a: "EX는 전문 방송·필름 현장을 위한 Broadcast & Film Edition을 공식 공급합니다. 라이선스·하드웨어·I/O 구성을 현장에 맞춰 제안하고 설치·교육·기술지원까지 공식 인증 리셀러로서 지원합니다." },
  { q: "어느 정도 해상도까지 실시간으로 가능한가요?", a: "Broadcast & Film Edition은 DLSS·Ray Tracing·RTXGI를 활용해 최대 8K 해상도 실시간 렌더링을 지원하며, 10-bit·HDR 입출력을 처리합니다." },
  { q: "방송 시스템과 어떻게 연동되나요?", a: "라이선스 기준 무제한 SDI·NDI·SMPTE 2110(NMOS)·SRT 입출력과 타임코드·하드웨어 젠록을 지원하고, Free-D·MOS(뉴스룸) 프로토콜로 방송 환경에 통합됩니다." },
  { q: "직접 시연해볼 수 있나요?", a: "가능합니다. 하남 XR 스튜디오에서 Aximmetry를 실제로 작동해보실 수 있고, 원거리시면 화상 데모로 진행합니다. 시연 일정은 상담 시 잡아 드립니다." },
  { q: "도입 비용과 라이선스는 어떻게 되나요?", a: "라이선스·하드웨어·I/O 구성에 따라 달라집니다. 현장 규모와 목표를 알려주시면 구성과 견적을 함께 제안해 드립니다. 정확한 조건은 상담에서 확인해 드립니다." },
  { q: "운영 환경에 제약이 있나요?", a: "실시간 성능은 GPU 등 하드웨어 구성과 해상도·I/O 채널 수에 따라 달라집니다. 현장 조건을 함께 검토해 적합한 구성을 설계합니다." },
];

export default function AximmetryPage() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbLd([
            { name: "Product", path: "/product" },
            { name: "Aximmetry", path: "/product/aximmetry" },
          ]),
          faqPageLd(faqs),
        ]}
      />
      <PageHero
        breadcrumb={[
          { label: "Product", href: "/product" },
          { label: "Aximmetry", href: "/product/aximmetry" },
        ]}
        tag="Certified Reseller"
        title="Aximmetry — 올인원 버추얼 프로덕션 플랫폼"
        lead="자체 노드 기반 엔진과 Unreal Engine을 결합해, 실시간 가상 스튜디오·XR·AR를 제작하는 버추얼 프로덕션 컴포저입니다."
      />

      {/* Quick spec bar */}
      <section className="section--surface" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="container-ex grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
          {quickSpecs.map((s) => (
            <div key={s.l} className="text-center">
              <p className="font-mono text-3xl font-bold text-fg">{s.v}</p>
              <p className="mt-1.5 text-sm text-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* §01 Showcase */}
      <section className="section section--ink">
        <div className="container-ex">
          <SectionHead index="01" label="Showcase" />
          <figure className="mt-12">
            <div className="card relative aspect-video" style={{ overflow: "hidden", padding: 0 }}>
              <YouTubePreview
                videoId="vcuQegxG3dA"
                poster="/aximmetry-showcase-poster.jpg"
                title="Aximmetry 실시간 버추얼 프로덕션 데모"
                playLabel="Aximmetry 데모 영상 재생"
              />
            </div>
          </figure>
        </div>
      </section>

      {/* §02 Features & Technology */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead
            index="02"
            label="Features & Technology"
            title="기능 및 기술"
            lead="Aximmetry의 노드 기반 편집기는 방송 제작·가상 이벤트·사전 시각화·LED 월 버추얼 프로덕션은 물론, 복잡한 3D 그래픽 작업까지 프로젝트 성격에 맞게 그래프를 구성해 유연하게 구현합니다."
            leadMaxWidth="48rem"
          />
          {/* 기능 카드 — 우선순위 순: 상위 4개(2열) + 하위 3개(3열) */}
          {/* 최첨단 크로마 키어 — 영상 배너 (텍스트·배지 오버레이, BaM Awards 2023 수상) */}
          <figure className="mt-12">
            <div className="card relative aspect-video" style={{ overflow: "hidden", padding: 0 }}>
              <ControlledVideo
                src="/aximmetry-chroma-web.mp4"
                poster="/aximmetry-fig-chroma.jpg"
                label="Aximmetry 최첨단 크로마 키어 실시간 키잉 데모 영상"
                playLabel="크로마 키어 영상 재생"
                pauseLabel="크로마 키어 영상 일시정지"
              />

              {/* 우상단 — BaM Awards 2023 Create 수상 배지 */}
              <Image
                src="/aximmetry-bam-award-2023.png"
                alt="BaM Awards 2023 Winner — NAB Show CREATE (Aximmetry)"
                width={200}
                height={200}
                className="absolute right-4 top-4 z-10 h-16 w-16 drop-shadow-lg sm:h-24 sm:w-24"
              />

              {/* 좌하단 — 텍스트 레이어 (가독성용 스크림) */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-white sm:text-xl">{featureTech[0].t}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80">{featureTech[0].d}</p>
              </div>
            </div>
          </figure>

          {/* 나머지 기능 카드 6개 — 모든 카드 상단에 16:9 이미지 영역 고정(object-cover로 채움, 여백 없음).
              이미지 미지정 카드는 동일 비율 플레이스홀더로 레이아웃을 맞춘다. */}
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featureTech.slice(1).map((p) => (
              <div key={p.t} className="card flex flex-col" style={{ padding: 0, overflow: "hidden" }}>
                <div className="aspect-video w-full overflow-hidden bg-bg/60">
                  {p.img ? (
                    <Image
                      src={p.img}
                      alt={p.t}
                      width={1280}
                      height={720}
                      unoptimized={p.img.endsWith(".gif")}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-faint">이미지 준비 중</span>
                    </div>
                  )}
                </div>
                <div style={{ padding: 24 }}>
                  <h3 className="font-semibold text-fg">{p.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §03 Edition — EX는 Broadcast & Film Edition만 공급 */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionHead
            index="03"
            label="Edition"
            title="Aximmetry Broadcast & Film Edition"
            lead="전문 스튜디오용 Broadcast & Film Edition은 무제한 방송 I/O와 분산 렌더링으로 방송·필름 현장에 대응하는 최상위 구성입니다."
            leadMaxWidth="44rem"
          />

          {/* 상세 사양 */}
          <div className="mx-auto mt-12 max-w-3xl">
            <SpecTable groups={[{ rows: bfSpecs }]} />
          </div>
        </div>
      </section>

      {/* §04 도입 절차 */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionHead index="04" label="Process" title="도입 절차" />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.t} className="card flex flex-col" style={{ padding: 24 }}>
                <span className="font-mono text-sm text-lav">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-semibold text-fg">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* §05 FAQ */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionHead index="05" label="FAQ" title="도입 전 자주 묻는 질문" />
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

      {/* §06 EX × Aximmetry */}
      <section className="section section--ink">
        <div className="container-ex">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel index="06">EX × Aximmetry</SectionLabel>
              <h2 className="h2" style={{ marginTop: 22 }}>
                EX는 Aximmetry <span className="text-lav">공식 인증 리셀러</span>입니다.
              </h2>
              <p className="lead" style={{ maxWidth: "36rem" }}>
                도입 컨설팅부터 시스템 설치·보안 세팅·현장 교육·유지보수까지, 통합 턴키로 도입 전 과정을 지원합니다. Aximmetry 한국 공식 리셀러로서 도입 견적과 한국어 기술지원을 함께 제공합니다.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {["도입 컨설팅", "셋업", "교육", "유지보수"].map((x) => (
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
                  src="/cert-aximmetry.png"
                  alt="Aximmetry Certified Reseller 인증서 (Authorization Certificate — EX Corporation)"
                  width={957}
                  height={677}
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 text-center font-mono text-xs text-faint">
                Aximmetry Authorization Certificate — EX Corporation
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
