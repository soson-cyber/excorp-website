"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";

/*
  News & Insight — 카테고리 필터(클라이언트) + 카드 그리드.
  정직성: 보도자료는 실제 마일스톤만 노출(연도 기준). 인사이트는 기술 설명 글
  (/news/[slug] 상세). 케이스/자료실은 준비 전이므로 빈 상태로 안내 — CMS 연동 시 자동 노출.
  데이터는 서버(news/page.tsx)에서 주입 — 보도자료·인사이트 모두 Notion 우선, 미연결 시 fallback.
  Light theme: 시맨틱 토큰 사용.
*/

export type NewsItem = {
  cat: "보도자료" | "케이스" | "인사이트" | "자료실";
  year: string;
  title: string;
  excerpt?: string;
  href?: string;
  featured?: boolean;
  thumbnail?: string;
};
type Item = NewsItem;

// 카테고리 캐논 키(= NewsItem.cat). "전체"는 필터 전용(아이템 cat 아님).
const categories = ["전체", "보도자료", "케이스", "인사이트", "자료실"] as const;

// locale별 UI 카피. cat 캐논 키는 ko 라벨과 동일하므로 ko는 식별 매핑, en은 영문 라벨.
const COPY = {
  ko: {
    catLabel: { 전체: "전체", 보도자료: "보도자료", 케이스: "케이스", 인사이트: "인사이트", 자료실: "자료실" },
    readMore: "자세히",
    emptyTitle: (cat: string) => `${cat} 콘텐츠는 준비 중입니다.`,
    viewAll: "전체 보기 →",
    cmsNote: "콘텐츠는 CMS 연동 시 자동 업데이트됩니다.",
  },
  en: {
    catLabel: { 전체: "All", 보도자료: "Press", 케이스: "Case Studies", 인사이트: "Insights", 자료실: "Resources" },
    readMore: "Read more",
    emptyTitle: (cat: string) => `${cat} content is on the way.`,
    viewAll: "View all →",
    cmsNote: "Content updates automatically once the CMS is connected.",
  },
} as const;

function catClass(cat: Item["cat"]) {
  return cat === "보도자료" ? "bg-accent-soft text-accent-bright" : "bg-primary-soft text-lav";
}

export function NewsList({
  press,
  insights = [],
  locale = "ko",
}: {
  press: Item[];
  insights?: Item[];
  locale?: Locale;
}) {
  const t = COPY[locale];
  const items: Item[] = [...press, ...insights];
  const [active, setActive] = useState<(typeof categories)[number]>("전체");
  const list = active === "전체" ? items : items.filter((i) => i.cat === active);

  return (
    <div>
      {/* filter pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => {
          const on = c === active;
          const count = c === "전체" ? items.length : items.filter((i) => i.cat === c).length;
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
              {t.catLabel[c]}
              <span className={`ml-1.5 font-mono text-[11px] ${on ? "text-white/70" : "text-faint"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      {list.length > 0 ? (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((n) => {
            const span2 = n.featured && active === "전체" ? "md:col-span-2 lg:col-span-2" : "";
            const body = (
              <>
                <div className="-mx-6 -mt-6 mb-4 aspect-[16/9] overflow-hidden rounded-t-2xl border-b border-border bg-gradient-to-br from-primary/25 via-surface to-card">
                  {n.thumbnail && (
                    // Notion 서명 URL은 만료·변경 → next/image 대신 단순 img (설정 불필요)
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={n.thumbnail} alt="" loading="lazy" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${catClass(n.cat)}`}>
                    {t.catLabel[n.cat]}
                  </span>
                  <span className="font-mono text-xs text-faint">{n.year}</span>
                </div>
                <h3 className="mt-3 flex-1 text-base font-semibold leading-relaxed text-fg">{n.title}</h3>
                {n.excerpt && active === "전체" && (
                  <p className="mt-2 text-sm leading-relaxed text-muted">{n.excerpt}</p>
                )}
                {n.href && (
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-lav">
                    {t.readMore} <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                )}
              </>
            );
            const cardClass = `group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50 ${span2}`;
            if (!n.href) {
              return (
                <div
                  key={n.title}
                  className={`flex flex-col rounded-2xl border border-border bg-card p-6 ${span2}`}
                >
                  {body}
                </div>
              );
            }
            // 외부 출처(보도자료 원문)는 새 탭으로, 내부 라우트는 next/link로.
            return n.href.startsWith("http") ? (
              <a key={n.title} href={n.href} target="_blank" rel="noreferrer" className={cardClass}>
                {body}
              </a>
            ) : (
              <Link key={n.title} href={n.href} className={cardClass}>
                {body}
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-20 text-center">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-faint">
            <rect x="3" y="4.5" width="18" height="15" rx="2" />
            <path d="M3 9h18M8 4.5v15" />
          </svg>
          <p className="mt-4 text-sm text-muted">{t.emptyTitle(t.catLabel[active])}</p>
          <button
            type="button"
            onClick={() => setActive("전체")}
            className="mt-4 text-sm font-medium text-lav transition-colors hover:text-lav-hover"
          >
            {t.viewAll}
          </button>
        </div>
      )}

      <p className="mt-8 font-mono text-xs text-faint">{t.cmsNote}</p>
    </div>
  );
}

export default NewsList;
