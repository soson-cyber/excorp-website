"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
  Scroll-reveal wrapper. Content is SSR-rendered and visible by default;
  the hidden→visible transition only kicks in when <html> has `.anim`
  (added by the layout inline script when motion is allowed). So JS-off /
  reduced-motion users always see content immediately (no flash, SEO-safe).
*/
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // motion disabled (reduced-motion / no-anim) → leave visible
    if (!document.documentElement.hasAttribute("data-anim")) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -18% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
