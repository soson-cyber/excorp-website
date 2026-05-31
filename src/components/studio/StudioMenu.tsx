"use client";

import Link from "next/link";
import { useState } from "react";

/*
  EX Studio 콘텐츠 메뉴 — 3 카테고리(IR·웨비나·대담) 탭 + S/M/L 카드.
  9개 SKU를 한 번에 그리지 않고 탭으로 3개씩 끊어 인지 부하를 줄인다.
  가격 비공개 정책 → 모든 카드 CTA는 "견적 문의"(/contact)로 통일.
  Light theme: 시맨틱 토큰(bg-surface/border-border/text-muted…) 사용.
*/

type Tier = {
  code: string;
  name: string;
  for: string;
  cameras: string;
  backgrounds: string;
  recommended?: boolean;
};

type Category = { id: string; label: string; blurb: string; tiers: Tier[] };

const categories: Category[] = [
  {
    id: "IR",
    label: "IR · 기업 발표",
    blurb: "투자 유치 · IR Day · 데모데이 · 사내 임원 보고 등 발표 중심 콘텐츠",
    tiers: [
      {
        code: "IR-S",
        name: "스타트업 IR",
        for: "스타트업 IR Day · 데모데이 · 지자체 창업 발표회 (여러 팀 순차 발표 슬롯형)",
        cameras: "PTZ 3대 (풀 / 미들 / 바스트)",
        backgrounds: "기본 IR 배경 중 택 1",
      },
      {
        code: "IR-M",
        name: "중견기업 IR",
        for: "분기 IR · 투자 유치 발표 · 사내 임원 보고",
        cameras: "PTZ 3대 + 시네마 1대",
        backgrounds: "기본 배경 중 택 1 + 로고 / CI 삽입",
        recommended: true,
      },
      {
        code: "IR-L",
        name: "대기업 IR",
        for: "상장사 분기 발표 · 대규모 IR",
        cameras: "시네마 2대 + PTZ 2대",
        backgrounds: "전체 기본 배경 + 커스텀 배경 1종 제작",
      },
    ],
  },
  {
    id: "WEBI",
    label: "웨비나 · 강의·세미나",
    blurb: "사내 교육 · 온라인 클래스 · 외부 웨비나 · 컨퍼런스 등 강의·세미나형 콘텐츠",
    tiers: [
      {
        code: "WEBI-S",
        name: "사내 교육형",
        for: "사내 교육 · 단방향 강의 · 온라인 클래스 녹화",
        cameras: "PTZ 2대 (풀 / 바스트)",
        backgrounds: "교육형 배경 중 택 1 (강의실 / 라운지 / 미니멀)",
      },
      {
        code: "WEBI-M",
        name: "기업 웨비나형",
        for: "외부 웨비나 · Q&A 포함 라이브 진행",
        cameras: "PTZ 3대",
        backgrounds: "기본 배경 중 택 1",
        recommended: true,
      },
      {
        code: "WEBI-L",
        name: "컨퍼런스형",
        for: "멀티 패널 컨퍼런스 · 산학 행사",
        cameras: "PTZ 3대 + 시네마 1대",
        backgrounds: "전체 기본 배경 + 컨퍼런스 전용 배경 1종",
      },
    ],
  },
  {
    id: "TALK",
    label: "대담 · 토크",
    blurb: "인터뷰 · 쇼츠 · 정기 토크 · 패널 좌담회 등 대화 중심 콘텐츠",
    tiers: [
      {
        code: "TALK-S",
        name: "인터뷰 / 쇼츠형",
        for: "1:1 인터뷰 · 쇼츠 · 채널용 정기 콘텐츠",
        cameras: "PTZ 3대 (인물 고정 + 투샷)",
        backgrounds: "토크형 배경 중 택 1 (라운지 / 카페 / 다크 토크)",
      },
      {
        code: "TALK-M",
        name: "토크 콘텐츠형",
        for: "정기 토크 · 브랜디드 콘텐츠 · 2~3인 대담",
        cameras: "PTZ 3대 + 시네마 1대",
        backgrounds: "기본 배경 중 택 1",
        recommended: true,
      },
      {
        code: "TALK-L",
        name: "패널 토크형",
        for: "다인 패널 토크 · 좌담회 · 행사 부속 콘텐츠",
        cameras: "PTZ 3대 + 시네마 2대",
        backgrounds: "전체 배경 + 패널 전용 배경 1종",
      },
    ],
  },
];

function Field({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-wider text-faint">{label}</dt>
      <dd className="mt-1 text-sm leading-relaxed text-muted">{children}</dd>
    </div>
  );
}

export function StudioMenu() {
  const [active, setActive] = useState(categories[0].id);
  const current = categories.find((c) => c.id === active) ?? categories[0];

  return (
    <div>
      {/* common guardrail */}
      <p className="text-sm text-muted">
        모든 상품은 기획 · 촬영 · 송출을 <span className="text-fg">전담팀</span>이 함께 진행하며, 견적은 구성에 맞춰
        개별 안내됩니다.
      </p>

      {/* category tabs */}
      <div
        role="group"
        aria-label="콘텐츠 카테고리"
        className="mt-6 flex flex-wrap gap-2 overflow-x-auto"
      >
        {categories.map((c) => {
          const on = c.id === active;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(c.id)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                on
                  ? "bg-primary text-white"
                  : "border border-border bg-white text-muted hover:border-primary/50 hover:text-fg"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-sm text-muted">{current.blurb}</p>

      {/* S/M/L cards */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {current.tiers.map((t) => (
          <div
            key={t.code}
            className={`relative flex flex-col rounded-2xl border bg-surface p-6 ${
              t.recommended ? "border-primary" : "border-border"
            }`}
          >
            {t.recommended && (
              <span className="absolute right-5 top-6 rounded-full bg-primary-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-primary">
                추천
              </span>
            )}
            <span className="font-mono text-[11px] uppercase tracking-wider text-primary">{t.code}</span>
            <h3 className="mt-1 text-xl font-semibold text-fg">{t.name}</h3>
            <dl className="mt-5 flex-1 space-y-4">
              <Field label="추천 대상">{t.for}</Field>
              <Field label="카메라 구성">{t.cameras}</Field>
              <Field label="포함 배경">{t.backgrounds}</Field>
            </dl>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              견적 문의 <span aria-hidden="true">→</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudioMenu;
