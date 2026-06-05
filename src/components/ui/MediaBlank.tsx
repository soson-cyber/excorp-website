import type { ReactNode } from "react";

/*
  MediaBlank — 의도적으로 디자인된 빈 미디어 플레이스홀더.
  "여기에 사진 / 영상 / 다이어그램이 들어옵니다"를 깨진 화면처럼 보이지 않게
  전달한다. 다크 카드 톤 박스 + 모노 태그(선택) + 네 모서리 레티클 틱 +
  중앙 라인 글리프 + 라벨/서브라벨로 구성된다.

  두 가지 호출 방식을 함께 지원한다.
  1) 비율 컨테이너 방식(권장, XR Solution 등) — `ratio`("16/9","16/10","21/9")로
     aspect-ratio를 컨테이너에 고정해 CLS 0. `kind`("video"|"image"|"diagram")로
     중앙 아이콘을 분기. role="img" + aria-label("… 준비 중")로 접근성 보장.
  2) 레거시 방식 — `tag`/`glyph`/`compact`와 className의 aspect 유틸리티 사용.

  플레이스홀더는 정적이라 모션 규칙(prefers-reduced-motion)과 무관하다.

  추후 교체 동선(동일 비율 래퍼 유지 → 레이아웃 흔들림 0):
    // 영상
    <div className="relative overflow-hidden rounded-2xl border border-border" style={{ aspectRatio: "16 / 9" }}>
      <video muted loop playsInline poster="/xr/hero-poster.jpg" className="h-full w-full object-cover">
        <source src="/xr/hero-loop.webm" type="video/webm" />
        <source src="/xr/hero-loop.mp4" type="video/mp4" />
      </video>
    </div>
    // 이미지 (next/image, 소문자 파일명)
    <div className="relative overflow-hidden rounded-2xl border border-border" style={{ aspectRatio: "16 / 9" }}>
      <Image src="/xr/studio.jpg" alt="하남 XR 스튜디오 실사" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
    </div>
*/

type MediaKind = "video" | "image" | "diagram";

type MediaBlankProps = {
  label?: string;
  sublabel?: string;
  className?: string;
  /** 비율(예: "16/9","16/10","21/9"). 지정 시 컨테이너 aspect-ratio 고정 + 브랜드 톤 그라데이션 + role="img" 적용. */
  ratio?: string;
  /** 미디어 종류 — 중앙 아이콘 분기. ratio 방식에서 권장. */
  kind?: MediaKind;
  /** 실제 이미지 경로. 지정 시 플레이스홀더 대신 이미지를 채워 렌더(object-cover) + 하단 라벨 캡션. */
  src?: string;
  /** 이미지 대체 텍스트(src 사용 시). 미지정 시 label 사용. */
  alt?: string;
  /** 좌상단 모노 태그. `null`이면 숨김(작은 로고 슬롯 등). */
  tag?: string | null;
  /** 중앙 글리프 직접 지정. 레거시 방식. 미지정 시 image. */
  glyph?: "image" | "play";
  /** 추가 오버레이 콘텐츠(예: HUD 프레이밍). */
  children?: ReactNode;
  /** 작은(로고) 슬롯용 내부 축소. */
  compact?: boolean;
};

function CornerTicks() {
  // 네 모서리 L자 레티클 틱
  const base = "pointer-events-none absolute h-3 w-3 border-primary/45";
  return (
    <>
      <span className={`${base} left-2.5 top-2.5 border-l border-t`} />
      <span className={`${base} right-2.5 top-2.5 border-r border-t`} />
      <span className={`${base} bottom-2.5 left-2.5 border-b border-l`} />
      <span className={`${base} bottom-2.5 right-2.5 border-b border-r`} />
    </>
  );
}

function Glyph({ kind, small }: { kind: "image" | "play" | "diagram"; small?: boolean }) {
  const size = small ? 20 : 30;
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    className: "text-faint",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (kind === "play") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9.5" />
        <path d="M10 8.5l5 3.5-5 3.5z" />
      </svg>
    );
  }
  if (kind === "diagram") {
    return (
      <svg {...common}>
        <rect x="3" y="4" width="6" height="5" rx="1" />
        <rect x="15" y="4" width="6" height="5" rx="1" />
        <rect x="9" y="15" width="6" height="5" rx="1" />
        <path d="M6 9v3h12V9M12 12v3" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.6" />
      <path d="M21 16l-5-5-5.5 5.5L8 14l-5 5" />
    </svg>
  );
}

export function MediaBlank({
  label,
  sublabel,
  className = "",
  ratio,
  kind,
  src,
  alt,
  tag = "MEDIA",
  glyph = "image",
  children,
  compact = false,
}: MediaBlankProps) {
  // ratio가 주어진 새 방식인지 판별
  const hasRatio = typeof ratio === "string" && ratio.length > 0;
  const hasSrc = typeof src === "string" && src.length > 0;

  // 중앙 글리프 결정 — kind가 있으면 우선(video→play), 없으면 레거시 glyph
  const resolvedGlyph: "image" | "play" | "diagram" =
    kind === "video" ? "play" : kind === "diagram" ? "diagram" : kind === "image" ? "image" : glyph;

  // ratio 방식이면 컨테이너에 aspect-ratio 고정 + 카드 톤 + 상단 한정 미세 그라데이션,
  // 그리고 role="img" + aria-label("… 준비 중")로 접근성 부여.
  const aspectRatio = hasRatio ? ratio!.replace("/", " / ") : undefined;
  const ariaLabel = hasSrc
    ? alt ?? label ?? undefined
    : hasRatio
      ? sublabel
        ? `${label ?? ""} — ${sublabel} (자산 준비 중)`.trim()
        : `${label ?? ""} (자산 준비 중)`.trim()
      : undefined;

  return (
    <div
      role={hasRatio || hasSrc ? "img" : undefined}
      aria-label={ariaLabel}
      className={`relative overflow-hidden rounded-2xl border border-border ${hasRatio || hasSrc ? "" : "bg-pale"} ${className}`}
      style={
        hasRatio
          ? hasSrc
            ? { aspectRatio, backgroundColor: "var(--color-card)" }
            : {
                aspectRatio,
                // 카드 표면 위 상단 한정 미세 핫퍼플 그라데이션
                // (섹션 배경이 아니라 자산 자리이므로 단색 배경 정책과 무관)
                backgroundImage:
                  "radial-gradient(120% 90% at 50% 0%, rgba(94, 46, 192, 0.18), transparent 60%)",
                backgroundColor: "var(--color-card)",
              }
          : undefined
      }
    >
      {hasSrc ? (
        <>
          {/* 실제 이미지 — 옵티마이저 우회(원본 직접) 안정 로딩. 동일 비율 컨테이너라 CLS 0. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt ?? label ?? ""} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          {/* 하단 가독성 스크림 + 라벨 캡션 */}
          {(tag || label) && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-4 pb-3 pt-10">
              {tag && <span className="font-mono text-[10px] uppercase tracking-wider text-white/70">{tag}</span>}
              {label && <p className="mt-0.5 text-sm font-semibold text-white">{label}</p>}
            </div>
          )}
        </>
      ) : (
        <>
          {tag && (
            <span className="absolute left-4 top-3.5 z-10 font-mono text-[10px] uppercase tracking-wider text-faint">
              {tag}
            </span>
          )}

          <CornerTicks />

          <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 py-8 text-center">
            <Glyph kind={resolvedGlyph} small={compact} />
            {label && (
              <span
                className={`font-mono ${
                  compact ? "text-[11px]" : "text-xs"
                } font-medium tracking-wide ${hasRatio ? "lowercase text-faint" : "text-fg"}`}
              >
                {label}
              </span>
            )}
            {sublabel && (
              <span className="font-mono text-[10px] leading-relaxed tracking-wide text-faint">
                {sublabel}
              </span>
            )}
          </div>

          {children}
        </>
      )}
    </div>
  );
}

export default MediaBlank;
