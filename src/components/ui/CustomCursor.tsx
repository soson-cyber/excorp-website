"use client";

import { useEffect, useRef } from "react";

/*
  Trailing hexagon ring that follows the pointer with easing — ADDED ON TOP of
  the native cursor (native cursor stays visible). Grows on interactive hover,
  shrinks on click. Activates only on fine pointers (mouse); touch is skipped.
  Under reduced-motion the ring snaps to the pointer (no trailing). Decorative
  (aria-hidden), never blocks clicks (pointer-events: none).
*/
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ring = ringRef.current;
    if (!ring) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");
    if (reduce) root.classList.add("cursor-reduce");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (reduce) ring.style.transform = `translate(${mx}px, ${my}px)`;
      const target = e.target as Element | null;
      const interactive = !!(
        target &&
        target.closest &&
        target.closest("a, button, [role='button'], summary, label, [data-cursor]")
      );
      if (interactive !== hovering) {
        hovering = interactive;
        ring.classList.toggle("is-hover", hovering);
      }
    };
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(tick);
    };
    const show = () => {
      ring.style.opacity = "1";
    };
    const hide = () => {
      ring.style.opacity = "0";
    };
    const down = () => ring.classList.add("is-down");
    const up = () => ring.classList.remove("is-down");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    if (!reduce) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-custom-cursor", "cursor-reduce");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <div ref={ringRef} className="ex-cursor-ring" aria-hidden="true">
      <svg className="ex-cursor-hex" viewBox="0 0 100 100">
        <polygon
          points="25,5 75,5 97,50 75,95 25,95 3,50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export default CustomCursor;
