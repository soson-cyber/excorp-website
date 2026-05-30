"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { works, categories } from "@/lib/work";

/*
  Work 갤러리 — 카테고리 필터(클라이언트) + 카드 그리드.
  데이터는 src/lib/work.ts (활용 시나리오). 카드는 /work/[slug] 상세로 연결.
  // TODO: Sanity 연동 시 works를 CMS 쿼리로 교체.
*/

export function WorkGallery() {
  const [active, setActive] = useState<(typeof categories)[number]>("전체");
  const list = active === "전체" ? works : works.filter((w) => w.category === active);

  return (
    <div>
      {/* filter bar */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((c) => {
          const on = c === active;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                on
                  ? "bg-[#5E2EC0] text-white"
                  : "border border-[#E5E7EB] bg-white text-[#51545E] hover:border-[#5E2EC0]/50 hover:text-[#0F1129]"
              }`}
            >
              {c}
            </button>
          );
        })}
        <span className="ml-1 font-mono text-xs text-[#5f636d]">{list.length}개 프로젝트</span>
      </div>

      {/* grid (or empty state) */}
      {list.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((w) => {
          const wide = w.featured && active === "전체";
          return (
            <Link
              key={w.slug}
              href={`/work/${w.slug}`}
              className={`group flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-colors hover:border-[#5E2EC0]/50 ${
                wide ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div className={`relative overflow-hidden ${wide ? "aspect-[16/9]" : "aspect-video"}`}>
                <Image
                  src={w.image}
                  alt={w.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#5E2EC0]">{w.category}</span>
                <h3 className="mt-2 text-lg font-semibold text-[#0F1129]">{w.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#51545E]">{w.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#0F1129]">
                  사례 보기 <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </Link>
          );
        })}
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5E7EB] bg-white px-6 py-20 text-center">
          <p className="text-sm text-[#51545E]">{active} 시나리오는 준비 중입니다.</p>
          <button
            type="button"
            onClick={() => setActive("전체")}
            className="mt-4 text-sm font-medium text-[#5E2EC0] transition-colors hover:text-[#4a23a0]"
          >
            전체 보기 →
          </button>
        </div>
      )}

      <p className="mt-8 font-mono text-xs text-[#5f636d]">
        현재 항목은 활용 시나리오입니다 · 실제 도입 사례는 순차 업데이트됩니다.
      </p>
    </div>
  );
}

export default WorkGallery;
