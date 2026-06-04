import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "accent" | "secondary" | "ghost" | "glow";

// Maps the project's semantic variants onto the kit's .btn classes (dark theme,
// Wope glow-bleed halo on hover). primary = purple (always-on accent),
// accent = pink (highest-intent action), secondary/ghost = outlined on dark.
// glow = 메인 히어로 'EXLINK 둘러보기'와 동일한 회전 글로우-라인 보더(다음 링크 유도용).
const styles: Record<Variant, string> = {
  primary: "btn btn--accent",
  accent: "btn btn--pink",
  secondary: "btn btn--ghostDark",
  ghost: "btn btn--ghostDark",
  glow: "btn btn--glow",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: { variant?: Variant } & ComponentProps<typeof Link>) {
  return <Link className={`${styles[variant]} ${className}`} {...props} />;
}
