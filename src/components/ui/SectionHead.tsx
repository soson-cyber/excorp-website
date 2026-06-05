/*
  Section head — centralized centered section header pattern shared across
  internal pages. Renders the kit SectionLabel, an optional centered .h2 title,
  and an optional centered .lead paragraph. Output is byte-identical to the
  hand-written markup it replaces:

    <div className="text-center">
      <SectionLabel index="0N">Label</SectionLabel>
      <h2 className="h2" style={{ marginTop: 22, marginInline: "auto"[, maxWidth] }}>제목</h2>
      <p className="lead" style={{ maxWidth, marginInline: "auto" }}>리드</p>  // when present
    </div>

  - title omitted → no <h2> (e.g. label-only showcase headers).
  - lead omitted → no <p>.
  - titleMaxWidth unset → style.maxWidth is left undefined (omitted from style).
*/
import type { ReactNode } from "react";
import { SectionLabel } from "./SectionLabel";

export function SectionHead({
  index,
  label,
  title,
  lead,
  titleMaxWidth,
  leadMaxWidth = "42rem",
  className,
}: {
  index: string;
  label: ReactNode;
  title?: ReactNode;
  lead?: ReactNode;
  titleMaxWidth?: string;
  leadMaxWidth?: string;
  className?: string;
}) {
  return (
    <div className={"text-center " + (className ?? "")}>
      <SectionLabel index={index}>{label as string}</SectionLabel>
      {title && (
        <h2 className="h2" style={{ marginTop: 22, marginInline: "auto", maxWidth: titleMaxWidth }}>
          {title}
        </h2>
      )}
      {lead && (
        <p className="lead" style={{ maxWidth: leadMaxWidth, marginInline: "auto" }}>
          {lead}
        </p>
      )}
    </div>
  );
}
