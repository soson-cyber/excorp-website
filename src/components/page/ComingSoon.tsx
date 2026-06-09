import { Button } from "@/components/ui/Button";

/*
  콘텐츠 준비 중 — 재사용 빈 상태(empty state).
  아직 콘텐츠가 없는 페이지/섹션에 임시로 적용한다. 다크 product-led 토큰 사용.
*/
export function ComingSoon({
  badge = "준비 중",
  title = "콘텐츠를 준비하고 있습니다",
  description = "곧 새로운 내용으로 찾아뵙겠습니다. 먼저 상담이 필요하시면 언제든 문의해 주세요.",
  ctaHref = "/contact",
  ctaLabel = "문의하기 →",
}: {
  badge?: string;
  title?: string;
  description?: string;
  /** null이면 CTA 버튼을 숨긴다. */
  ctaHref?: string | null;
  ctaLabel?: string;
}) {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center sm:py-28">
      {/* 글리프 */}
      <div
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card"
        aria-hidden="true"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-lav" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      </div>

      <span className="mt-7 inline-flex rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-faint">
        {badge}
      </span>

      <h2 className="mt-5 text-balance text-2xl font-bold leading-snug text-fg md:text-3xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-muted">{description}</p>

      {ctaHref && (
        <div className="mt-8 flex justify-center">
          <Button href={ctaHref} variant="accent">
            {ctaLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
