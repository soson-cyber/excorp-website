"use client";

import { useEffect, useRef } from "react";

/*
  HeroAurora — Highnote-style concentric COLOUR-BAND gradient that tracks the
  pointer with eased (non-linear) motion.

  The bands ARE the gradient: a multi-stop radial of EX-triad glows (mint /
  purple / pink) on a deep base, painted onto one huge ring layer. That layer is
  GPU-translated so the ring centre follows the cursor — large, obvious motion —
  with an easing lag (non-linear) plus an autonomous lissajous drift so it lives
  even at rest. A fixed vignette behind the headline keeps white text legible no
  matter where the bands are.

  Pure DOM/CSS, gradients inline (compiler never touches them). Fine pointers
  track; everything drifts on its own. prefers-reduced-motion → static, centred.
  Decorative: aria-hidden + pointer-events:none.
*/
export default function HeroAurora() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const rings = ringsRef.current;
    if (!wrap || !rings) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    const place = (dx: number, dy: number) => {
      rings.style.transform = `translate3d(calc(-50% + ${dx.toFixed(1)}px), calc(-50% + ${dy.toFixed(1)}px), 0)`;
    };

    if (reduced) {
      place(0, 0);
      return;
    }

    let raf = 0;
    let running = true;
    let t = 0;
    let tx = 0; // pointer offset from hero centre (px)
    let ty = 0;
    let cx = 0; // eased current offset
    let cy = 0;

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      tx = e.clientX - (r.left + r.width / 2);
      ty = e.clientY - (r.top + r.height / 2);
    };

    const frame = () => {
      t += 0.005;
      // autonomous lissajous drift (px) — non-linear path, keeps it alive at rest
      const dax = Math.cos(t) * 90 + Math.sin(t * 1.7) * 26;
      const day = Math.sin(t * 0.8) * 70 + Math.cos(t * 1.3) * 22;
      // pointer follow (0.85 of the offset) + drift
      const gx = (fine ? tx * 0.85 : 0) + dax;
      const gy = (fine ? ty * 0.85 : 0) + day;
      // easing lag = non-linear, organic motion
      cx += (gx - cx) * 0.06;
      cy += (gy - cy) * 0.06;
      place(cx, cy);
      raf = running ? requestAnimationFrame(frame) : 0;
    };

    // Pause the rAF loop while the hero is scrolled offscreen (saves GPU/battery).
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!running) {
            running = true;
            if (!raf) raf = requestAnimationFrame(frame);
          }
        } else {
          running = false;
        }
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* deep base wash */}
      <div className="absolute inset-0 bg-hero" />

      {/* concentric colour bands — this whole layer's centre tracks the pointer */}
      <div
        ref={ringsRef}
        className="absolute left-1/2 top-1/2 h-[220vmax] w-[220vmax]"
        style={{
          willChange: "transform",
          background:
            "radial-gradient(circle at 50% 50%," +
            " rgba(125,92,255,0.52) 0%," +
            " rgba(69,241,224,0.26) 12%," +
            " rgba(94,46,192,0.58) 25%," +
            " rgba(210,6,238,0.32) 38%," +
            " rgba(94,46,192,0.50) 52%," +
            " rgba(69,241,224,0.20) 66%," +
            " rgba(168,85,247,0.34) 79%," +
            " rgba(14,6,38,0) 92%)",
        }}
      />

      {/* fixed spotlight vignette → headline stays legible wherever the bands sit */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(58% 54% at 50% 46%, rgba(14,6,38,0.66) 0%, rgba(14,6,38,0) 72%)" }}
      />

      {/* edge darkening for depth */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(125% 125% at 50% 50%, rgba(14,6,38,0) 52%, rgba(14,6,38,0.6) 100%)" }}
      />
    </div>
  );
}
