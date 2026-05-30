"use client";

import { useEffect, useRef } from "react";

/*
  HeroAurora — full-bleed, pointer-reactive aurora for the dark Highnote-style
  hero. Soft EX-triad glows (mint / pink / purple) drift on their own and
  parallax toward the pointer over a deep-purple base, with a faint concentric
  "sunburst" ring echo and a center vignette so white text stays legible.

  Pure DOM/CSS (GPU translate3d) → robustly visible and cheap. Gradients are
  inline styles on purpose: runtime-applied, so the build/dev CSS compiler never
  touches them. Fine pointers parallax; everything also drifts autonomously.
  prefers-reduced-motion → one static frame. Decorative: aria-hidden + no events.
*/
export default function HeroAurora() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mintRef = useRef<HTMLDivElement>(null);
  const pinkRef = useRef<HTMLDivElement>(null);
  const purpleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const mint = mintRef.current;
    const pink = pinkRef.current;
    const purple = purpleRef.current;
    if (!wrap || !mint || !pink || !purple) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    // per-layer parallax strength (px) — different depths
    const layers = [
      { el: mint, px: 42, py: 30 },
      { el: pink, px: -54, py: 26 },
      { el: purple, px: 26, py: -38 },
    ];

    if (reduced) {
      // static, centered — no drift, no parallax
      for (const L of layers) L.el.style.transform = "translate3d(0,0,0)";
      return;
    }

    let raf = 0;
    let t = 0;
    let tx = 0; // pointer target, -1..1 from center
    let ty = 0;
    let cx = 0; // eased current
    let cy = 0;

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    };

    const frame = () => {
      t += 0.004;
      // autonomous lissajous drift, plus eased pointer follow
      const dax = Math.cos(t) * 0.5;
      const day = Math.sin(t * 0.8) * 0.5;
      cx += (tx + dax - cx) * 0.04;
      cy += (ty + day - cy) * 0.04;
      for (const L of layers) {
        L.el.style.transform = `translate3d(${(cx * L.px).toFixed(1)}px, ${(cy * L.py).toFixed(1)}px, 0)`;
      }
      raf = requestAnimationFrame(frame);
    };

    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* deep base wash */}
      <div className="absolute inset-0 bg-[#120733]" />

      {/* aurora glows (parallax layers) */}
      <div
        ref={purpleRef}
        className="absolute left-[18%] top-[34%] h-[92vh] w-[92vh] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(94,46,192,0.9), transparent 60%)", willChange: "transform" }}
      />
      <div
        ref={mintRef}
        className="absolute -left-[12%] -top-[18%] h-[80vh] w-[80vh] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(69,241,224,0.5), transparent 62%)", willChange: "transform" }}
      />
      <div
        ref={pinkRef}
        className="absolute -right-[14%] top-[2%] h-[78vh] w-[78vh] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(210,6,238,0.5), transparent 62%)", willChange: "transform" }}
      />

      {/* faint concentric sunburst rings (Highnote echo) */}
      <div
        className="absolute left-1/2 top-[28%] h-[130vh] w-[130vh] -translate-x-1/2"
        style={{
          opacity: 0.06,
          background:
            "repeating-radial-gradient(circle at center, rgba(255,255,255,0.9) 0px, rgba(255,255,255,0.9) 1px, transparent 1px, transparent 66px)",
        }}
      />

      {/* center vignette → keeps the white headline readable */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 42%, rgba(18,7,51,0) 38%, rgba(18,7,51,0.55) 82%)" }}
      />
    </div>
  );
}
