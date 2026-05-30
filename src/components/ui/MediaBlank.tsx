import type { ReactNode } from "react";

/*
  MediaBlank — an intentionally-styled blank media placeholder.
  Communicates "a photo / video / logo goes here" without looking broken:
  a pale bordered box with a mono tag, four corner reticle ticks, and a
  centered line glyph + label/sublabel. Used for product logos and any
  photo/video slot on the white Home.
*/

type MediaBlankProps = {
  label?: string;
  sublabel?: string;
  className?: string;
  /** Top-left mono tag. Pass `null` to hide it (e.g. tiny logo slots). */
  tag?: string | null;
  /** Override the centered glyph; defaults to an "image" line icon. */
  glyph?: "image" | "play";
  /** Extra overlay content (e.g. HUD framing). */
  children?: ReactNode;
  /** Shrink internals for small (logo) slots. */
  compact?: boolean;
};

function CornerTicks() {
  // four absolutely-positioned L-shaped reticle ticks
  const base = "pointer-events-none absolute h-3 w-3 border-[#5e2ec0]/45";
  return (
    <>
      <span className={`${base} left-2.5 top-2.5 border-l border-t`} />
      <span className={`${base} right-2.5 top-2.5 border-r border-t`} />
      <span className={`${base} bottom-2.5 left-2.5 border-b border-l`} />
      <span className={`${base} bottom-2.5 right-2.5 border-b border-r`} />
    </>
  );
}

function Glyph({ kind, small }: { kind: "image" | "play"; small?: boolean }) {
  const size = small ? 20 : 30;
  if (kind === "play") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#6b7280"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9.5" />
        <path d="M10 8.5l5 3.5-5 3.5z" />
      </svg>
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6b7280"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
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
  tag = "MEDIA",
  glyph = "image",
  children,
  compact = false,
}: MediaBlankProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F2F4F7] ${className}`}
    >
      {tag && (
        <span className="absolute left-4 top-3.5 z-10 font-mono text-[10px] uppercase tracking-wider text-[#6b7280]">
          {tag}
        </span>
      )}

      <CornerTicks />

      <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 py-8 text-center">
        <Glyph kind={glyph} small={compact} />
        {label && (
          <span
            className={`font-mono ${
              compact ? "text-[11px]" : "text-xs"
            } font-medium tracking-wide text-[#0F1129]`}
          >
            {label}
          </span>
        )}
        {sublabel && (
          <span className="font-mono text-[10px] tracking-wide text-[#6b7280]">
            {sublabel}
          </span>
        )}
      </div>

      {children}
    </div>
  );
}

export default MediaBlank;
