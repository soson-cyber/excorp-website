"use client";

import Link from "next/link";
import { useState } from "react";
import { insights } from "@/lib/insights";

/*
  News & Insight — 카테고리 필터(클라이언트) + 카드 그리드.
  정직성: 보도자료는 실제 마일스톤만 노출(연도 기준). 인사이트는 기술 설명 글
  (/news/[slug] 상세). 케이스/자료실은 준비 전이므로 빈 상태로 안내 — CMS 연동 시 자동 노출.
  Light theme: 시맨틱 토큰 사용.
*/

type Item = {
  cat: "보도자료" | "케이스" | "인사이트" | "자료실";
  year: string;
  title: string;
  excerpt?: string;
  href?: string;
  featured?: boolean;
};

const press: Item[] = [
  {
    cat: "보도자료",
    year: "2026",
    title: "이엑스, 중기부 TIPS 선정 — AI 기반 XR 제작 솔루션 고도화",
    excerpt:
      "중소벤처기업부 TIPS에 선정되어 2년간 R&D를 통해 XR·버추얼 프로덕션의 셋업·운영·합성 과정을 자동화·표준화하는 기술 고도화에 나섭니다. (VentureSquare)",
    href: "https://www.venturesquare.net/1082328/",
    featured: true,
  },
  {
    cat: "보도자료",
    year: "2026",
    title: "이엑스 손승오 대표 인터뷰 — “수십억짜리 세트를 버튼 하나로”",
    excerpt:
      "17년 방송 경력의 손승오 대표가 분산된 XR 장비를 하나로 통합해 버추얼 프로덕션의 문턱을 낮추는 ‘XR 대중화’ 비전을 밝혔습니다. (VentureSquare 인터뷰)",
    href: "https://www.venturesquare.net/1080286/",
  },
  {
    cat: "보도자료",
    year: "2025",
    title: "이엑스, AI Content Festival 2025서 마커리스 모션캡처 시연",
    excerpt:
      "특수 수트·마커 없이 카메라 비전과 AI로 움직임을 추출하는 마커리스 모션캡처를 실시간 렌더링과 결합해 시연했습니다. (산업일보)",
    href: "https://kidd.co.kr/news/244207",
  },
  {
    cat: "보도자료",
    year: "2024",
    title: "Moverse AI 공식 한국 총판 계약 체결",
    excerpt: "마커리스 AI 모션캡처 Moverse의 국내 공식 총판으로서 도입·기술 지원을 본격화합니다.",
    href: "https://www.getnews.co.kr/news/articleView.html?idxno=705765",
  },
  {
    cat: "보도자료",
    year: "2024",
    title: "[인터뷰] XR 기술로 현실을 확장하다 — 이엑스",
    excerpt:
      "자체 EXLINK 플랫폼을 중심으로 VR·AR·MR 콘텐츠 제작을 혁신하는 XR 스타트업으로 이엑스를 조명했습니다. (아이뉴스24)",
    href: "https://www.inews24.com/view/1785934",
  },
  { cat: "보도자료", year: "2023", title: "Rassi Engineering(RETracker) 공식 한국 총판 계약" },
  { cat: "보도자료", year: "2023", title: "Aximmetry 공식 인증 리셀러 선정" },
  { cat: "보도자료", year: "2023", title: "경기 하남 XR 스튜디오 오픈" },
  {
    cat: "보도자료",
    year: "2023",
    title: "성균관대 · 중앙대 · 계원예술대 산학 MOU 체결",
    href: "https://www.kgnews.co.kr/news/article.html?no=766073",
  },
  {
    cat: "보도자료",
    year: "2022",
    title: "Korea Metaverse Festival 2022서 실시간 XR 제작 솔루션 시연",
    excerpt:
      "역대 최대 규모 메타버스 전시회(COEX)에서 AR 스튜디오·아바타 변환 등 실시간 XR 콘텐츠 제작 솔루션을 선보였습니다. (정보통신신문)",
    href: "https://www.koit.co.kr/news/articleView.html?idxno=104368",
  },
];

const insightItems: Item[] = insights.map((i) => ({
  cat: "인사이트",
  year: i.year,
  title: i.title,
  excerpt: i.summary,
  href: `/news/${i.slug}`,
}));

const items: Item[] = [...press, ...insightItems];

const categories = ["전체", "보도자료", "케이스", "인사이트", "자료실"] as const;

function catClass(cat: Item["cat"]) {
  return cat === "보도자료" ? "bg-accent-soft text-accent-bright" : "bg-primary-soft text-lav";
}

export function NewsList() {
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
              {c}
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
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${catClass(n.cat)}`}>
                    {n.cat}
                  </span>
                  <span className="font-mono text-xs text-faint">{n.year}</span>
                </div>
                <h3 className="mt-3 flex-1 text-base font-semibold leading-relaxed text-fg">{n.title}</h3>
                {n.excerpt && active === "전체" && (
                  <p className="mt-2 text-sm leading-relaxed text-muted">{n.excerpt}</p>
                )}
                {n.href && (
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-lav">
                    자세히 <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
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
          <p className="mt-4 text-sm text-muted">{active} 콘텐츠는 준비 중입니다.</p>
          <button
            type="button"
            onClick={() => setActive("전체")}
            className="mt-4 text-sm font-medium text-lav transition-colors hover:text-lav-hover"
          >
            전체 보기 →
          </button>
        </div>
      )}

      <p className="mt-8 font-mono text-xs text-faint">콘텐츠는 CMS 연동 시 자동 업데이트됩니다.</p>
    </div>
  );
}

export default NewsList;
