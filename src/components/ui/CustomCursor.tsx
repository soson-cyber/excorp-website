"use client";

import { useEffect, useRef } from "react";

/*
  Custom pointer follower — a small purple dot at the exact pointer + a larger
  ring that trails with easing. Grows on interactive hover, shrinks on click.
  Activates ONLY on fine pointers (mouse) with motion allowed; touch and
  reduced-motion keep the native cursor. Decorative (aria-hidden), never blocks
  clicks (pointer-events: none).
*/
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on devices with a mouse/trackpad (skip touch).
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    // Under reduced-motion we still show the cursor, but the ring snaps to the
    // pointer (no trailing lerp) and CSS transitions are disabled.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

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
      dot.style.transform = `translate(${mx}px, ${my}px)`;
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
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };
    const hide = () => {
      dot.style.opacity = "0";
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
      root.classList.remove("cursor-reduce");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      root.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div aria-hidden="true">
      <div ref={ringRef} className="ex-cursor-ring" />
      <div ref={dotRef} className="ex-cursor-dot" />
    </div>
  );
}

export default CustomCursor;
