"use client";

import { useEffect, useRef } from "react";

/*
  Mouse-reactive particle flow field — 의존성 없는 2D 캔버스.
  입자는 잔잔한 플로우필드를 따라 흐르다가, 커서 근처에서는
  커서의 이동 "방향"으로 휘어지며 끌려간다 (마우스 방향 인터랙션).
  브랜드 컬러: Purple / Mint / Pink.
*/

const BRAND_COLORS = [
  [94, 46, 192], // #5E2EC0 purple
  [69, 241, 224], // #45F1E0 mint
  [210, 6, 238], // #D206EE pink
];

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  c: number[];
  size: number;
};

export function ParticleField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: P[] = [];
    let raf = 0;
    let running = true;

    // pointer state (refs, not React state — avoids re-render per frame)
    const mouse = { x: -9999, y: -9999, dx: 0, dy: 0, active: false };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(198, Math.floor((width * height) / 8180));
      particles = Array.from({ length: target }, () => spawn());
    }

    function spawn(edge = false): P {
      return {
        x: Math.random() * width,
        y: edge ? -10 : Math.random() * height,
        vx: 0,
        vy: 0,
        c: BRAND_COLORS[(Math.random() * BRAND_COLORS.length) | 0],
        size: 0.88 + Math.random() * 1.98,
      };
    }

    // cheap pseudo-noise flow field (no deps)
    function flowAngle(x: number, y: number, t: number) {
      return (
        Math.sin(x * 0.0016 + t) * 1.4 +
        Math.cos(y * 0.0018 - t * 0.8) * 1.4 +
        Math.sin((x + y) * 0.001 + t * 0.5)
      );
    }

    let t = 0;
    function frame() {
      if (!running) return;
      t += 0.0016;
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        // base flow
        const a = flowAngle(p.x, p.y, t);
        p.vx += Math.cos(a) * 0.04;
        p.vy += Math.sin(a) * 0.04;

        // mouse-direction influence: steer toward cursor + bias by cursor motion
        if (mouse.active) {
          const ddx = mouse.x - p.x;
          const ddy = mouse.y - p.y;
          const dist = Math.hypot(ddx, ddy);
          const R = 209;
          if (dist < R) {
            const f = (1 - dist / R) * 0.9;
            // pull toward cursor
            p.vx += (ddx / (dist + 0.001)) * f * 0.5;
            p.vy += (ddy / (dist + 0.001)) * f * 0.5;
            // push along cursor movement direction
            p.vx += mouse.dx * f * 0.6;
            p.vy += mouse.dy * f * 0.6;
          }
        }

        // damping + speed clamp
        p.vx *= 0.94;
        p.vy *= 0.94;
        const sp = Math.hypot(p.vx, p.vy);
        const max = 2.6;
        if (sp > max) {
          p.vx = (p.vx / sp) * max;
          p.vy = (p.vy / sp) * max;
        }

        const px = p.x;
        const py = p.y;
        p.x += p.vx;
        p.y += p.vy;

        // wrap-around
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const [r, g, b] = p.c;
        const alpha = Math.min(0.77, 0.198 + sp * 0.242);

        // velocity streak (skip across wrap-around jumps)
        if (Math.abs(p.x - px) < 50 && Math.abs(p.y - py) < 50) {
          ctx!.strokeStyle = `rgba(${r},${g},${b},${alpha * 0.66})`;
          ctx!.lineWidth = p.size * 0.88;
          ctx!.beginPath();
          ctx!.moveTo(px, py);
          ctx!.lineTo(p.x, p.y);
          ctx!.stroke();
        }

        // glowing dot
        ctx!.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
      }

      // decay cursor motion so the "push" fades when the mouse stops
      mouse.dx *= 0.86;
      mouse.dy *= 0.86;

      raf = requestAnimationFrame(frame);
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) {
        const [r, g, b] = p.c;
        ctx!.fillStyle = `rgba(${r},${g},${b},0.44)`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // normalized movement direction (per event)
      mouse.dx = Math.max(-1, Math.min(1, (x - mouse.x) * 0.15));
      mouse.dy = Math.max(-1, Math.min(1, (y - mouse.y) * 0.15));
      mouse.x = x;
      mouse.y = y;
      mouse.active = y >= -40 && y <= height + 40;
    }

    function onLeave() {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    if (reduced) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onResize = () => {
      resize();
      if (reduced) drawStatic();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    // pause when tab hidden / hero scrolled offscreen
    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return;
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(frame);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    />
  );
}
