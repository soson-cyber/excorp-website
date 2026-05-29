"use client";

import { useEffect, useRef, useState } from "react";

/*
  Thin gauge bar that fills 0 → 100% when scrolled into view (once).
  Reduced-motion → shows full immediately. Brand gradient fill.
*/
export function Gauge({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFill(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFill(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`h-0.5 overflow-hidden rounded-full bg-border ${className}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-mint via-primary to-accent transition-[width] duration-1000 ease-out"
        style={{ width: fill ? "100%" : "0%" }}
      />
    </div>
  );
}
