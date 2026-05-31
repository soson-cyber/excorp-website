import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "accent" | "secondary" | "ghost";

// Maps the project's semantic variants onto the kit's .btn classes (dark theme,
// Wope glow-bleed halo on hover). primary = purple (always-on accent),
// accent = pink (highest-intent action), secondary/ghost = outlined on dark.
const styles: Record<Variant, string> = {
  primary: "btn btn--accent",
  accent: "btn btn--pink",
  secondary: "btn btn--ghostDark",
  ghost: "btn btn--ghostDark",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: { variant?: Variant } & ComponentProps<typeof Link>) {
  return <Link className={`${styles[variant]} ${className}`} {...props} />;
}
