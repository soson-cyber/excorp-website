"use client";

import { useEffect, useRef, useState } from "react";

/*
  Counts 0 → value when scrolled into view (once). Respects reduced-motion
  (shows final value immediately). Use for stat numbers like 6, 4, 3.
*/
export function CountUp({
  value,
  suffix = "",
  className = "",
  duration = 1100,
}: {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Render the final value on the server so crawlers/no-JS users never see
  // misleading "0" company metrics. The client can still replay the count-up
  // animation once the stat enters the viewport.
  const [n, setN] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf0 = requestAnimationFrame(() => setN(value));
      return () => cancelAnimationFrame(raf0);
    }
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          setN(0);
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(eased * value));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  );
}
