import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "EX XR Studio — 실시간 XR 크로마키 스튜디오",
  description:
    "경기 하남에 위치한 EX XR Studio. 촬영과 동시에 완성형 콘텐츠를 구현하는 실시간 XR 크로마키 스튜디오 대관.",
};

const facilities = [
  { t: "크로마키 스크린 기반 XR 세트", d: "고해상도 카메라 촬영 위에 실시간 가상 배경 및 인터랙션 그래픽 합성" },
  { t: "Moverse AI 마커리스 모션캡처", d: "웨어러블 없이도 배우의 움직임을 실시간으로 캡처" },
  { t: "Aximmetry + Unreal Engine 미디어서버", d: "다양한 가상 씬의 실시간 구성 및 송출 가능" },
  { t: "오디오·조명·송출 시스템 통합 운영", d: "방송 및 라이브 연출에 최적화된 종합 세트" },
  { t: "RETracker 트래킹 시스템", d: "실내외 자유로운 카메라 이동에도 정확한 6DoF 위치 추적" },
];

const steps = [
  { t: "신청 접수", d: "온라인 문의 또는 유선 상담 후 일정 확인" },
  { t: "사전 미팅", d: "장비 사용, 공간 구성, 기술 요구사항 협의" },
  { t: "계약 진행", d: "사용일 확정 → 계약서 체결 및 결제" },
  { t: "현장 사용", d: "담당자 입회 아래 촬영·라이브 진행" },
  { t: "후속 지원", d: "영상 추출, 시스템 리셋, 기술문의 대응" },
];

const faqs = [
  { q: "스튜디오 사용 시 기술 인력이 필요한가요?", a: "EX는 기본적으로 1인의 오퍼레이터 또는 엔지니어를 현장에 배정하여 시스템 지원을 제공합니다." },
  { q: "LED Wall이나 LED 렌더링도 가능한가요?", a: "옵션으로 제공되며, Unreal 기반 콘텐츠를 활용한 ICVFX 연출이 가능합니다." },
  { q: "외부 촬영 장비를 반입할 수 있나요?", a: "가능합니다. 단, 사전 협의가 필요하며 전력·공간 제약이 있을 수 있습니다." },
  { q: "모션캡처 데이터는 저장이 가능한가요?", a: "네. 실시간 캡처 데이터는 FBX 또는 CSV 형식으로 추출 가능하며, 재가공도 지원됩니다." },
  { q: "대관비용은 어떻게 산정되나요?", a: "장비 사용 여부, 인력 포함 여부, 시간 단위(반일/일일) 기준으로 맞춤 견적을 드립니다. 문의 주세요." },
];

export default function XrStudioPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "XR Studio", href: "/xr-studio" }]}
        tag="Hanam · Real-time XR Chromakey Studio"
        title="실시간으로 확장되는, 콘텐츠 제작의 새로운 기준."
        lead="촬영과 동시에 완성형 콘텐츠를 구현하는 실시간 XR 크로마키 스튜디오. 촬영이 곧 결과물이 됩니다."
      />

      {/* Studio photo */}
      <section className="container-ex pt-12">
        <div className="overflow-hidden rounded-2xl border border-border">
          <Image
            src="/studio.png"
            alt="EX XR Studio — 실시간 XR 크로마키 스튜디오 전경"
            width={1366}
            height={779}
            priority
            className="h-auto w-full"
          />
        </div>
      </section>

      {/* Facilities */}
      <section id="facilities" className="container-ex py-section">
        <div className="text-center">
          <SectionLabel index="01">Facilities &amp; Tech</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">스튜디오 시설 및 기술 특징</h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
          {facilities.map((f) => (
            <div key={f.t} className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-semibold">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking process timeline */}
      <section id="booking" className="bg-surface/40">
        <div className="container-ex py-section">
          <div className="text-center">
            <SectionLabel index="02">Booking Process</SectionLabel>
            <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">스튜디오 대관절차</h2>
          </div>
          <ol className="mx-auto mt-12 max-w-3xl space-y-4">
            {steps.map((s, i) => (
              <li
                key={s.t}
                className="relative flex items-center gap-5 overflow-hidden rounded-2xl border border-border bg-surface p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-sm font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold">{s.t}</h3>
                  <p className="mt-1 text-sm text-muted">{s.d}</p>
                </div>
                {/* ghost number (Figma style) */}
                <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 font-mono text-7xl font-bold text-faint/15">
                  {i + 1}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ — native accordion, no JS */}
      <section id="faq" className="container-ex py-section">
        <div className="text-center">
          <SectionLabel index="03">FAQ</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">자주 묻는 질문</h2>
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

      {/* Booking apply */}
      <section id="apply" className="bg-surface/40">
        <div className="container-ex py-section text-center">
          <SectionLabel index="04">Booking</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">대관 신청</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            기본 정보·일정·사용 목적·인력/장비를 알려주시면 담당자가 회신드립니다. (온라인 신청 폼 준비 중)
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="accent">
              대관 문의하기 →
            </Button>
            <Button href={`tel:${site.contact.tel}`} variant="secondary">
              전화 {site.contact.tel}
            </Button>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
