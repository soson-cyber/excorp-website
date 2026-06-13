"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

/*
  EX Studio 옵션 서비스 — 기본은 그룹별 핵심 옵션만, "전체 옵션 보기"로 풀 리스트 확장.
  Light theme: 시맨틱 토큰 사용. compact 개수만큼만 노출하고 나머지는 토글.
  locale 미지정 시 ko. xr-studio 전용 컴포넌트라 자체 카피를 보유한다.
*/

const COMPACT = 3;

const GROUPS: Record<Locale, { t: string; items: string[] }[]> = {
  ko: [
    {
      t: "영상 · 편집",
      items: [
        "즉시 편집본 송출 (촬영 종료 후 빠른 전달)",
        "멀티 카메라 컷 편집본 제공",
        "세로 컷 동시 녹화 (숏폼용)",
        "자막 베이크 편집본 · 챕터별 분할 편집",
        "음성 클리닝 · 마스터링",
      ],
    },
    {
      t: "그래픽 · 연출",
      items: [
        "PPT 송출 위치 변경 (좌 / 우 / 배경 풀스크린)",
        "PPT 입체화 (3D 그래픽 변환)",
        "자막 · 로워서드 삽입",
        "입체 AR 그래픽 (제품 데모)",
        "인서트 컷 그래픽 (자료 화면 합성)",
        "세션 전환 그래픽 패키지",
      ],
    },
    {
      t: "배경 · 커스텀",
      items: [
        "브랜드 컬러 매칭 배경 커스텀",
        "추가 커스텀 배경 제작",
        "가상 객석 반응 합성",
      ],
    },
    {
      t: "라이브 송출",
      items: [
        "라이브 스트리밍 송출 (YouTube / Zoom Webinar 등)",
        "다중 송출 (유튜브 · 사내방송 동시)",
        "다중 발표자 동시 송출",
        "라이브 채팅 위젯 · Q&A 자막 합성",
        "실시간 통역 화면 합성",
      ],
    },
    {
      t: "현장 지원",
      items: ["사전 미팅 · 리허설 추가", "발표자 메이크업 · 의상 연계 (외주)"],
    },
  ],
  en: [
    {
      t: "Video · Editing",
      items: [
        "Same-day cut delivery (fast turnaround after the shoot)",
        "Multi-camera edited cut",
        "Simultaneous vertical-cut recording (for short-form)",
        "Burned-in subtitles · chapter-based segmenting",
        "Audio cleanup · mastering",
      ],
    },
    {
      t: "Graphics · Direction",
      items: [
        "Slide placement options (left / right / full-screen background)",
        "Slides in 3D (conversion to 3D graphics)",
        "Subtitles · lower-thirds",
        "3D AR graphics (product demos)",
        "Insert-cut graphics (compositing reference visuals)",
        "Session-transition graphics package",
      ],
    },
    {
      t: "Backgrounds · Custom",
      items: [
        "Brand-color-matched custom backgrounds",
        "Additional custom background builds",
        "Composited virtual-audience reactions",
      ],
    },
    {
      t: "Live Streaming",
      items: [
        "Live streaming (YouTube / Zoom Webinar, etc.)",
        "Multi-destination streaming (YouTube + internal broadcast at once)",
        "Multiple presenters streamed simultaneously",
        "Live chat widget · Q&A subtitle compositing",
        "Real-time interpretation overlay",
      ],
    },
    {
      t: "On-site Support",
      items: ["Additional pre-meeting · rehearsal", "Presenter makeup · wardrobe coordination (outsourced)"],
    },
  ],
};

const UI: Record<Locale, { more: (n: number) => string; expand: string; collapse: string }> = {
  ko: {
    more: (n) => `+ ${n}개 더 · 문의 시 안내`,
    expand: "전체 옵션 보기",
    collapse: "옵션 접기",
  },
  en: {
    more: (n) => `+${n} more · shared on request`,
    expand: "View all options",
    collapse: "Collapse options",
  },
};

export function StudioOptions({ locale = "ko" }: { locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const groups = GROUPS[locale];
  const t = UI[locale];

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => {
          const shown = open ? g.items : g.items.slice(0, COMPACT);
          const hidden = g.items.length - shown.length;
          return (
            <div key={g.t} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold text-fg">{g.t}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {shown.map((it) => (
                  <li key={it} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 flex-none rounded-full bg-primary" />
                    <span className="leading-relaxed">{it}</span>
                  </li>
                ))}
              </ul>
              {!open && hidden > 0 && (
                <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-faint">
                  {t.more(hidden)}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-primary/50 hover:text-lav"
        >
          {open ? t.collapse : t.expand}
          <span aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`}>
            ↓
          </span>
        </button>
      </div>
    </div>
  );
}

export default StudioOptions;
