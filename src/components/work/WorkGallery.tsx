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
                  ? "bg-primary text-white"
                  : "border border-border bg-card text-muted hover:border-primary/50 hover:text-fg"
              }`}
            >
              {c}
            </button>
          );
        })}
        <span className="ml-1 font-mono text-xs text-faint">{list.length}개 프로젝트</span>
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
              className={`card group flex flex-col ${wide ? "sm:col-span-2 lg:col-span-2" : ""}`}
              style={{ overflow: "hidden", padding: 0 }}
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
                <span className="font-mono text-[11px] uppercase tracking-wider text-lav">{w.category}</span>
                <h3 className="mt-2 text-lg font-semibold text-fg">{w.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{w.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-fg">
                  사례 보기 <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </Link>
          );
        })}
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-20 text-center">
          <p className="text-sm text-muted">{active} 시나리오는 준비 중입니다.</p>
          <button
            type="button"
            onClick={() => setActive("전체")}
            className="mt-4 text-sm font-medium text-lav transition-colors hover:text-lav-hover"
          >
            전체 보기 →
          </button>
        </div>
      )}

      <p className="mt-8 font-mono text-xs text-faint">
        현재 항목은 활용 시나리오입니다 · 실제 도입 사례는 순차 업데이트됩니다.
      </p>
    </div>
  );
}

export default WorkGallery;
