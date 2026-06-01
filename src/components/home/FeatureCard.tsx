"use client";

// Wope-style feature card — rotating conic border + cursor-tracking spotlight,
// with scroll-reveal. Used by the Home §01 "What We Do" grid.
import Link from "next/link";
import { useEffect, useRef, type MouseEvent } from "react";

export function FeatureCard({
  idx,
  tag,
  title,
  desc,
  href,
  delay = 0,
  full = false,
}: {
  idx: string;
  tag: string;
  title: string;
  desc: string;
  href: string;
  delay?: number;
  full?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!document.documentElement.hasAttribute("data-anim")) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} data-reveal="" className={`feat${full ? " feat--full" : ""}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined} onMouseMove={onMove}>
      <span className="feat-edge" aria-hidden="true" />
      <span className="feat-spot" aria-hidden="true" />
      <div className="feat-in">
        <div className="feat-head">
          <span className="feat-idx">{idx}</span>
          <span className="feat-tag">{tag}</span>
        </div>
        <h3 className="feat-title">{title}</h3>
        <p className="feat-desc">{desc}</p>
        <Link href={href} className="feat-link">
          자세히 <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
