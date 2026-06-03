"use client";

// Product-led dark hero — particle canvas, aurora glow, light ray, and the
// interactive EXLINK Live Console (rotating border + cursor spotlight).
// Ported from the Claude Design handoff (ui_kits/website). All motion is
// prefers-reduced-motion safe; console images are swapped client-side.

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";

/* Drifting mint/purple signal dust behind the headline. */
function HeroStars() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const COLORS = ["125,92,255", "69,241,224", "183,164,251", "210,6,238"];
    let w = 0,
      h = 0,
      stars: { x: number; y: number; r: number; a: number; sp: number; drift: number; c: string }[] = [],
      raf = 0,
      running = true;
    const resize = () => {
      w = canvas.width = canvas.offsetWidth * dpr;
      h = canvas.height = canvas.offsetHeight * dpr;
    };
    const seed = () => {
      stars = [];
      const n = Math.round((canvas.offsetWidth * canvas.offsetHeight) / 8200);
      for (let i = 0; i < n; i++)
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: (Math.random() * 1.7 + 0.35) * dpr,
          a: Math.random() * Math.PI * 2,
          sp: Math.random() * 0.022 + 0.006,
          drift: (Math.random() - 0.5) * 0.18 * dpr,
          c: COLORS[(Math.random() * COLORS.length) | 0],
        });
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.a += s.sp;
        s.y -= s.drift;
        s.x += s.drift * 0.4;
        if (s.y < -4) s.y = h + 4;
        if (s.x > w + 4) s.x = -4;
        if (s.x < -4) s.x = w + 4;
        const op = (Math.sin(s.a) + 1) / 2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.c},${(op * 0.9).toFixed(3)})`;
        ctx.fill();
      }
      raf = running ? requestAnimationFrame(draw) : 0;
    };
    resize();
    seed();
    draw();
    const onResize = () => {
      resize();
      seed();
    };
    const onVis = () => {
      running = !document.hidden;
      if (running && !raf) raf = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  return <canvas ref={ref} className="hero-stars" aria-hidden="true" />;
}

const CAMS = [
  { id: "CAM 01", img: "/studio.png" },
  { id: "CAM 02", img: "/uc-broadcast.png" },
  { id: "CAM 03", img: "/vp-chroma.png" },
  { id: "PGM", img: "/uc-event.png" },
];

function ExlinkConsole() {
  const [sel, setSel] = useState(3); // PGM 기본 선택 → 큰 Program 피드 = PGM 이미지
  const [nonce, setNonce] = useState(0); // bump on manual pick to restart the auto-cycle window
  const program = CAMS[sel];

  // Auto-cycle CAM 01 → … → PGM every 3s (paused for reduced-motion / hidden tab).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!document.hidden) setSel((s) => (s + 1) % CAMS.length);
    }, 8000);
    return () => clearInterval(id);
  }, [nonce]);

  const pick = (i: number) => {
    setSel(i);
    setNonce((n) => n + 1); // wait a fresh 3s after a manual selection
  };

  return (
    <div className="console" role="img" aria-label="EXLINK 실시간 XR 운영 콘솔 미리보기">
      <div className="c-bar">
        <span className="c-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="c-brand">EXLINK</span>
        <span className="c-live">
          <span className="d" />
          LIVE
        </span>
        <span className="c-time">REC 00:14:22:08 · 25.00 fps</span>
      </div>
      <div className="c-body">
        <div className="c-rail">
          <span className="ic on" title="Program">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 18v3" />
            </svg>
          </span>
          <span className="ic" title="Cameras">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 7l-7 5 7 5V7z" />
              <rect x="1" y="5" width="15" height="14" rx="2" />
            </svg>
          </span>
          <span className="ic" title="Tracking">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            </svg>
          </span>
          <span className="ic" title="Scenes">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </span>
        </div>
        <div className="c-stage">
          {/* stacked feeds — crossfade (dissolve) between cameras */}
          {CAMS.map((c, i) => (
            <Image
              key={c.id}
              src={c.img}
              alt={i === sel ? "실시간 프로그램 피드" : ""}
              fill
              sizes="(min-width:1024px) 620px, 100vw"
              priority={i === 3}
              className="c-feed"
              style={{ opacity: i === sel ? 1 : 0 }}
            />
          ))}
          <span className="c-hud" style={{ left: 12, top: 12 }}>
            <span className="c-rec" />
            PROGRAM · LIVE
          </span>
          <span className="c-hud" style={{ right: 12, top: 12 }}>
            {program.id} · 4K
          </span>
          <span className="c-tick" style={{ left: 12, top: 44, borderLeft: "1px solid", borderTop: "1px solid" }} />
          <span className="c-tick" style={{ right: 12, top: 44, borderRight: "1px solid", borderTop: "1px solid" }} />
          <span className="c-coords">
            <span>
              TRACK <b>X 2.41</b>
            </span>
            <span>
              <b>Y 1.08</b>
            </span>
            <span>
              <b>Z 4.92</b>
            </span>
            <span>
              SYNC <b>LOCK</b>
            </span>
          </span>
        </div>
        <div className="c-panel">
          <div>
            <div className="p-h">Multicam</div>
            <div className="cams">
              {CAMS.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  className={`cam${i === sel ? " sel" : ""}`}
                  onClick={() => pick(i)}
                  aria-pressed={i === sel}
                  title={`${c.id} 프로그램으로 전환`}
                >
                  <Image src={c.img} alt="" fill sizes="120px" />
                  <span>{c.id}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="p-h">Telemetry</div>
            <div className="tele">
              <div className="trow">
                <span className="k">트래킹 동기화</span>
                <span className="v ok">LOCKED</span>
              </div>
              <div className="trow">
                <span className="k">렌더 지연</span>
                <span className="v">1 frame</span>
              </div>
              <div className="trow">
                <span className="k">크로마 키</span>
                <span className="v ok">CLEAN</span>
              </div>
              <div className="trow">
                <span className="k">송출</span>
                <span className="v">RTMP · 2</span>
              </div>
            </div>
          </div>
          <div>
            <div className="p-h">Pipeline</div>
            <div className="pipe">
              <span className="pnode">CAP</span>
              <span className="pconn">›</span>
              <span className="pnode">TRK</span>
              <span className="pconn">›</span>
              <span className="pnode core">EXLINK</span>
              <span className="pconn">›</span>
              <span className="pnode">OUT</span>
            </div>
          </div>
        </div>
      </div>
      <div className="c-foot">
        <span className="g">EXLINK 통합 코어 · 운영자 1인</span>
        <span className="g">
          렌더 부하{" "}
          <span className="loadbar">
            <i />
          </span>{" "}
          72%
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  const shellRef = useRef<HTMLDivElement>(null);
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = shellRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <section className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <HeroStars />
      <div className="hero-vig" aria-hidden="true" />

      <div className="container-ex hero-in">
        <h1 className="hero-h1">
          기술의 연결로
          <br />
          경험을 <span className="grad">확장하다</span>
        </h1>
        <p className="hero-lead">
          이엑스는 실시간 XR과 버추얼 프로덕션의 촬영·트래킹·렌더·송출을
          <br />
          하나의 흐름으로 연결합니다.
        </p>
        <div className="hero-cta">
          <Link href="/contact" className="btn btn--onDark focus-on-dark">
            프로젝트 시작 →
          </Link>
          <Link href="/solution/xr-solution" className="btn btn--glow focus-on-dark">
            EXLINK 둘러보기
          </Link>
        </div>
      </div>

      <div className="container-ex console-shell" ref={shellRef} onPointerMove={onMove}>
        <div className="edge" aria-hidden="true" />
        <div className="spot" aria-hidden="true" />
        <ExlinkConsole />
      </div>

      <div className="hero-fade" aria-hidden="true" />
      {/* Header watches this: while it sits below the bar the header stays
          transparent over the hero; scrolling past it → solid glass. Placed
          ~82vh down to preserve the previous home flip point. */}
      <span className="hero-sentinel" data-hero-sentinel aria-hidden="true" />
    </section>
  );
}
