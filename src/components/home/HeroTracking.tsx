"use client";

import { useEffect, useRef } from "react";

/*
  HeroTracking — a cursor-following camera-tracking reticle for the hero.
  Crosshair lines + a corner-tick target box + a soft purple scan glow follow
  the pointer, and a live coordinate readout (X / Y / Z) updates as you move —
  a literal demo of EX's real-time camera tracking. DOM/CSS only (robust,
  clearly visible). Fine pointers only; hidden until the pointer enters the hero.
  Decorative (aria-hidden), pointer-events: none (never blocks clicks).
*/
export default function HeroTracking() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const vRef = useRef<HTMLDivElement>(null);
  const hRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (!window.matchMedia("(pointer: fine)").matches) return; // skip touch

    const v = vRef.current,
      h = hRef.current,
      box = boxRef.current,
      scan = scanRef.current,
      pos = posRef.current;
    if (!v || !h || !box || !scan || !pos) return;

    let raf = 0;
    let mx = 0;
    let my = 0;
    let inside = false;

    const render = () => {
      raf = 0;
      const r = wrap.getBoundingClientRect();
      const x = mx - r.left;
      const y = my - r.top;
      v.style.transform = `translateX(${x}px)`;
      h.style.transform = `translateY(${y}px)`;
      box.style.transform = `translate(${x}px, ${y}px)`;
      scan.style.transform = `translate(${x}px, ${y}px)`;
      const nx = (x / r.width) * 2 - 1;
      const ny = -((y / r.height) * 2 - 1);
      const z = (3 + Math.hypot(nx, ny)).toFixed(2);
      const sx = (nx * 5).toFixed(2);
      const sy = (ny * 5).toFixed(2);
      pos.textContent = `X ${nx >= 0 ? "+" : ""}${sx}  Y ${ny >= 0 ? "+" : ""}${sy}  Z ${z}`;
    };

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const within =
        e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      mx = e.clientX;
      my = e.clientY;
      if (within !== inside) {
        inside = within;
        wrap.style.opacity = within ? "1" : "0";
      }
      if (within && !raf) raf = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5] opacity-0 transition-opacity duration-300"
    >
      {/* crosshair lines */}
      <div ref={vRef} className="absolute inset-y-0 left-0 w-px bg-[#5E2EC0]/20" />
      <div ref={hRef} className="absolute inset-x-0 top-0 h-px bg-[#5E2EC0]/20" />

      {/* soft scan glow */}
      <div
        ref={scanRef}
        className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(94,46,192,0.12),transparent_70%)]"
        style={{ marginLeft: "-144px", marginTop: "-144px" }}
      />

      {/* reticle target box + live readout */}
      <div ref={boxRef} className="absolute left-0 top-0">
        <div className="relative -ml-5 -mt-5 h-10 w-10">
          <span className="absolute left-0 top-0 h-2.5 w-2.5 border-l-2 border-t-2 border-[#5E2EC0]" />
          <span className="absolute right-0 top-0 h-2.5 w-2.5 border-r-2 border-t-2 border-[#5E2EC0]" />
          <span className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b-2 border-l-2 border-[#5E2EC0]" />
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b-2 border-r-2 border-[#5E2EC0]" />
          <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5E2EC0]" />
          <span
            ref={posRef}
            className="absolute left-12 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] tracking-wider text-[#5E2EC0]"
          >
            X +0.00  Y +0.00  Z 3.00
          </span>
        </div>
      </div>
    </div>
  );
}
