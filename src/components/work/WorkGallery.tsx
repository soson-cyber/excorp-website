"use client";

import { useState } from "react";
import Image from "next/image";

/* ── data ──────────────────────────────────────────────────────────────
   TODO: replace static data with Sanity query; add skeleton loading state
   when async (CMS integration comes next). */
type WorkItem = {
  img: string;
  category: string;
  title: string;
  desc: string;
  featured?: boolean;
};

const works: WorkItem[] = [
  {
    img: "/uc-broadcast.png",
    category: "EXLINK 구축",
    title: "실시간 XR 방송 시스템 통합",
    desc: "멀티캠·트래킹·렌더·송출을 EXLINK로 통합한 대표 구축 사례.",
    featured: true,
  },
  {
    img: "/uc-fashion.png",
    category: "버추얼 프로덕션",
    title: "버추얼 패션 필름",
    desc: "가상 배경·세트에서 촬영과 동시에 완성.",
  },
  {
    img: "/uc-event.png",
    category: "이벤트",
    title: "하이브리드 이벤트",
    desc: "오프라인 행사와 온라인 라이브 송출을 하나로.",
  },
  {
    img: "/vp-set.png",
    category: "버추얼 프로덕션",
    title: "버추얼 프로덕션 세트",
    desc: "언리얼 기반 실시간 3D 세트 구성·운용.",
  },
  {
    img: "/vp-chroma.png",
    category: "EXLINK 구축",
    title: "그린 크로마 실시간 합성",
    desc: "카메라 트래킹 기반 입체 연출.",
  },
  {
    img: "/studio.png",
    category: "스튜디오",
    title: "하남 XR 스튜디오 제작",
    desc: "IR·웨비나·대담 메뉴형 콘텐츠 제작.",
  },
  {
    img: "/uc-event.png",
    category: "방송·중계",
    title: "라이브 중계 운용",
    desc: "실시간 그래픽 합성과 동시 송출.",
  },
];

const categories = [
  "전체",
  "EXLINK 구축",
  "버추얼 프로덕션",
  "방송·중계",
  "스튜디오",
  "이벤트",
] as const;

/* ── card ──────────────────────────────────────────────────────────────── */

function WorkCard({ item, wide }: { item: WorkItem; wide: boolean }) {
  return (
    <article
      className={`group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-colors hover:border-[#5E2EC0]/50 ${
        wide ? "sm:col-span-2 lg:col-span-2" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          wide ? "aspect-[16/9]" : "aspect-video"
        }`}
      >
        <Image
          src={item.img}
          alt={item.title}
          fill
          sizes={
            wide
              ? "(min-width: 1024px) 66vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-6">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#5E2EC0]">
          {item.category}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-[#0F1129]">
          {item.title}
        </h3>
        <p className="mt-2 text-sm text-[#51545E]">{item.desc}</p>
      </div>
    </article>
  );
}

/* ── empty state ─────────────────────────────────────────────────────────── */

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5E7EB] bg-white px-6 py-20 text-center">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#7C8090"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
      <p className="mt-4 text-sm text-[#7C8090]">준비 중인 카테고리입니다</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#51545E] transition-colors hover:border-[#0F1129]"
      >
        전체 보기
      </button>
    </div>
  );
}

/* ── gallery ─────────────────────────────────────────────────────────────── */

export function WorkGallery() {
  const [selected, setSelected] =
    useState<(typeof categories)[number]>("전체");

  const isAll = selected === "전체";
  const filtered = isAll
    ? works
    : works.filter((w) => w.category === selected);

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-24 lg:px-20 lg:py-28">
      {/* filter bar */}
      <div className="flex flex-wrap gap-2.5">
        {categories.map((cat) => {
          const active = cat === selected;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelected(cat)}
              aria-pressed={active}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-[#0F1129] text-white"
                  : "border border-[#E5E7EB] bg-white text-[#51545E] hover:border-[#0F1129]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <p className="mt-4 font-mono text-xs uppercase tracking-wider text-[#7C8090]">
        {filtered.length}개 프로젝트
      </p>

      {/* grid / empty state */}
      {filtered.length === 0 ? (
        <div className="mt-10">
          <EmptyState onReset={() => setSelected("전체")} />
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <WorkCard
              key={item.title}
              item={item}
              wide={Boolean(item.featured) && isAll}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default WorkGallery;
