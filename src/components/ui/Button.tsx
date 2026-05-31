import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "accent" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  // Pink = Action — reserved for the highest-intent conversion CTAs
  accent: "bg-accent text-white hover:bg-accent/85",
  secondary:
    "border border-border bg-surface/60 text-fg hover:border-primary/50 hover:text-primary",
  ghost: "text-muted hover:text-fg",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: { variant?: Variant } & ComponentProps<typeof Link>) {
  return (
    <Link
      className={`inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${styles[variant]} ${className}`}
      {...props}
    />
  );
}
