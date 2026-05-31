import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { MediaBlank } from "@/components/ui/MediaBlank";
import { StudioMenu } from "@/components/studio/StudioMenu";
import { StudioOptions } from "@/components/studio/StudioOptions";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "EX Studio — 버추얼 프로덕션 콘텐츠 스튜디오",
  description:
    "하남 EX Studio. 대형 그린 크로마(W10×D7×H4)와 XR·리얼타임 기술로 IR·웨비나·토크 콘텐츠를 기획부터 촬영·송출까지 한 번에. 메뉴형 콘텐츠 제작 상품.",
};

const reasons = [
  {
    t: "하나의 무대, 무한한 배경",
    d: "물리적인 세트를 새로 짓지 않아도 됩니다. 가상 배경으로 콘텐츠 성격에 맞는 공간을 그때그때 연출하며, 같은 하루에도 전혀 다른 분위기의 촬영이 가능합니다.",
  },
  {
    t: "10m 크로마, 다인 풀샷까지",
    d: "W10 × D7 × H4(약 70㎡)의 호리존 그린 크로마 무대. 좁은 셀프 방송 스튜디오가 담기 어려운 다인 패널·풀샷·와이드 연출까지 안정적으로 소화합니다.",
  },
  {
    t: "XR 리얼타임, 현장에서 완성",
    d: "단순 합성이 아닌 카메라 트래킹 기반 입체 연출. 인물과 가상 배경이 자연스럽게 어우러지고, 제품 데모용 AR 그래픽·입체 PPT 등 차별화된 표현이 가능합니다.",
  },
  {
    t: "전담팀이 기획부터 송출까지",
    d: "PD · 가상환경 컨트롤 · 현장 운영을 담당하는 전담 인력이 함께해, 기획·촬영·라이브 송출을 한 번에 진행합니다.",
  },
];

const presets = [
  { name: "IR 기본", cat: "IR" },
  { name: "강의실", cat: "WEBI" },
  { name: "라운지", cat: "TALK" },
  { name: "미니멀 스튜디오", cat: "WEBI" },
  { name: "카페 스타일", cat: "TALK" },
  { name: "다크 토크", cat: "TALK" },
  { name: "컨퍼런스홀", cat: "WEBI" },
  { name: "키노트 무대", cat: "IR" },
];

const galleryBlanks = [
  { label: "무대 와이드", tag: "STUDIO" },
  { label: "조명 · 장비", tag: "STUDIO" },
  { label: "스튜디오 도면", tag: "FLOORPLAN" },
];

const guide = [
  "콘텐츠 형태와 규모에 따라 진행 방식이 달라지며, 일정·구성에 맞춰 안내드립니다.",
  "발표 자료(PPT)·시나리오를 사전 제출해 주시면, 사전 미팅을 통해 구성을 함께 확정합니다.",
  "무료 주차 가능 · 출장 촬영 옵션 문의 가능.",
];

const facilitySpecs = [
  ["그린 크로마 무대", "W 10m × D 7m × H 4m (약 70㎡) 호리존"],
  ["촬영 스튜디오 실면적", "약 210㎡ (충분한 카메라 후퇴 공간)"],
  ["카메라", "시네마 카메라(4.6K) + PTZ 멀티카메라"],
  ["렌즈", "시네마 줌 20–55mm / 50–125mm"],
];

export default function XrStudioPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "XR Studio", href: "/xr-studio" }]}
        tag="Hanam · Virtual Production Studio"
        title="가상 배경 위에서 완성되는 IR · 웨비나 · 토크 콘텐츠"
        lead="하남 EX Studio는 대형 그린 크로마와 XR·리얼타임 기술로, 기획부터 촬영·송출까지 한 번에 완성하는 버추얼 프로덕션 스튜디오입니다."
      />

      {/* Studio photo */}
      <section className="container-ex pt-12">
        <div className="overflow-hidden rounded-2xl border border-border">
          <Image
            src="/studio.png"
            alt="EX Studio — 하남 그린 크로마 버추얼 프로덕션 스튜디오 전경"
            width={1366}
            height={779}
            priority
            className="h-auto w-full"
          />
        </div>
      </section>

      {/* §01 Why EX Studio */}
      <section className="bg-surface">
        <div className="container-ex py-section">
          <SectionLabel index="01">Why EX Studio</SectionLabel>
          <h2 className="mt-5 text-balance text-4xl font-semibold md:text-5xl">EX Studio가 다른 이유</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.t} className="rounded-2xl border border-border bg-card p-7">
                <h3 className="text-lg font-semibold text-fg">{r.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §02 Content menu (tabs + S/M/L) */}
      <section id="menu" className="container-ex py-section">
        <SectionLabel index="02">Content Menu</SectionLabel>
        <h2 className="mt-5 text-balance text-4xl font-semibold md:text-5xl">콘텐츠 메뉴</h2>
        <p className="mt-4 max-w-2xl text-muted">
          찌개를 고르듯, 목적에 맞는 콘텐츠 상품을 고르세요. 규모(S · M · L)만 정하면 나머지는 전담팀이 맞춥니다.
        </p>
        <div className="mt-12">
          <StudioMenu />
        </div>
      </section>

      {/* §03 Background presets */}
      <section className="bg-surface">
        <div className="container-ex py-section">
          <SectionLabel index="03">Backgrounds</SectionLabel>
          <h2 className="mt-5 text-balance text-4xl font-semibold md:text-5xl">배경 프리셋</h2>
          <p className="mt-4 max-w-2xl text-muted">
            콘텐츠 성격에 맞춰 가상 배경을 선택합니다. 기본 프리셋 외 브랜드 맞춤 배경도 제작합니다.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {presets.map((p) => (
              <MediaBlank
                key={p.name}
                tag={p.cat}
                label={p.name}
                sublabel="프리뷰 준비 중"
                className="aspect-[4/3]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* §04 Options (toggle) */}
      <section className="container-ex py-section">
        <SectionLabel index="04">Options</SectionLabel>
        <h2 className="mt-5 text-balance text-4xl font-semibold md:text-5xl">옵션 서비스</h2>
        <p className="mt-4 max-w-2xl text-muted">기본 구성에 필요한 옵션을 더할 수 있습니다.</p>
        <div className="mt-12">
          <StudioOptions />
        </div>
      </section>

      {/* §05 Guide */}
      <section className="bg-surface">
        <div className="container-ex py-section">
          <SectionLabel index="05">Guide</SectionLabel>
          <h2 className="mt-5 text-balance text-4xl font-semibold md:text-5xl">이용 안내</h2>
          <ul className="mt-12 max-w-3xl space-y-4">
            {guide.map((g) => (
              <li key={g} className="flex gap-3 text-fg">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                <span className="leading-relaxed">{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* §06 Studio tour — sample video + gallery */}
      <section id="facilities" className="container-ex py-section">
        <SectionLabel index="06">Studio</SectionLabel>
        <h2 className="mt-5 text-balance text-4xl font-semibold md:text-5xl">스튜디오 둘러보기</h2>

        {/* sample video stage */}
        <div className="mt-12">
          <MediaBlank
            tag="STUDIO · VIDEO"
            glyph="play"
            label="촬영 샘플 영상"
            sublabel="영상 에셋 추가 예정"
            className="aspect-[16/9] w-full"
          />
        </div>

        {/* gallery blanks */}
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {galleryBlanks.map((b) => (
            <MediaBlank key={b.label} tag={b.tag} label={b.label} sublabel="이미지 준비 중" className="aspect-video" />
          ))}
        </div>

        {/* specs */}
        <div className="mt-12 max-w-3xl overflow-hidden rounded-2xl border border-border bg-card">
          <dl>
            {facilitySpecs.map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1 border-b border-border/60 px-6 py-4 last:border-0 sm:flex-row sm:gap-6">
                <dt className="w-44 shrink-0 font-mono text-xs uppercase tracking-wider text-faint">{k}</dt>
                <dd className="text-sm text-fg">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA — quote & booking */}
      <section className="bg-surface">
        <div className="container-ex py-section">
          <div className="rounded-3xl border border-border bg-bg px-8 py-14 text-center">
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-lav">
              <span className="h-0.5 w-7 bg-primary" aria-hidden="true" />
              가격 및 예약 문의
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl text-balance text-4xl font-semibold leading-snug md:text-5xl">
              목적에 맞는 최적의 구성을 제안해 드립니다.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              콘텐츠 형태 · 규모 · 옵션에 따라 견적을 맞춤 안내합니다. 부담 없이 문의 주세요.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/contact" variant="accent">
                견적 문의하기 →
              </Button>
              <Button href={`tel:${site.contact.tel.replace(/[^0-9+]/g, "")}`} variant="secondary">
                전화 {site.contact.tel}
              </Button>
            </div>
            <p className="mt-6 font-mono text-xs text-faint">
              <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-muted">
                {site.contact.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
