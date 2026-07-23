"use client";

/*
  홈 §05 특허 캐러셀 — 다중 항목 + 자동 회전(대표 지시).
  - 데스크톱 3장 · 태블릿 2장 · 모바일 1장 노출, 4초 간격 자동 이동(마지막→처음 순환).
  - hover/포커스 시 일시정지 + 명시적 재생/정지 토글(WCAG 2.2.2), prefers-reduced-motion 시 자동 회전 없음.
  - 좌우 화살표(순환) · 위치 도트 · 카운터 · 키보드 ←/→. 이미지=실제 특허증(public/patent-*.jpg).
*/
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type PatentItem = { no: string; title: string; desc: string; img: string };

const GAP = 20;
const INTERVAL_MS = 4000;

export function PatentSlider({
  items,
  prevLabel,
  nextLabel,
  certLabel,
  pauseLabel,
  playLabel,
}: {
  items: PatentItem[];
  prevLabel: string;
  nextLabel: string;
  certLabel: string;
  pauseLabel: string;
  playLabel: string;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState(0); // 카드폭+GAP (px)
  const [perView, setPerView] = useState(1);
  const [hoverPause, setHoverPause] = useState(false);
  const [userPause, setUserPause] = useState(false);
  const [reduced, setReduced] = useState(false);

  const maxIdx = Math.max(0, items.length - perView);
  const cur = Math.min(idx, maxIdx);

  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const measure = () => {
      const card = el.querySelector<HTMLElement>("[data-card]");
      if (!card) return;
      const w = card.getBoundingClientRect().width;
      setStep(w + GAP);
      setPerView(Math.max(1, Math.round((el.clientWidth + GAP) / (w + GAP))));
    };
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const raf = requestAnimationFrame(() => {
      measure();
      setReduced(mq.matches);
    });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const onMq = () => setReduced(mq.matches);
    mq.addEventListener("change", onMq);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, []);

  const playing = !hoverPause && !userPause && !reduced;
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setIdx((i) => (i >= maxIdx ? 0 : i + 1)), INTERVAL_MS);
    return () => clearInterval(t);
  }, [playing, maxIdx]);

  const go = (d: 1 | -1) =>
    setIdx(d === 1 ? (cur >= maxIdx ? 0 : cur + 1) : cur <= 0 ? maxIdx : cur - 1);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  };

  return (
    <div
      className="mt-12"
      role="group"
      aria-roledescription="carousel"
      onKeyDown={onKey}
      onMouseEnter={() => setHoverPause(true)}
      onMouseLeave={() => setHoverPause(false)}
      onFocus={() => setHoverPause(true)}
      onBlur={() => setHoverPause(false)}
    >
      <div className="pcar">
        <button type="button" aria-label={prevLabel} onClick={() => go(-1)} className="pcar__arrow focus-on-dark">
          <span aria-hidden="true">←</span>
        </button>

        <div ref={viewport} className="pcar__viewport">
          <div className="pcar__track" style={{ transform: `translateX(${-cur * step}px)` }}>
            {items.map((p) => (
              <article key={p.no} data-card className="pcar__card">
                <figure className="pcar__media">
                  <Image
                    src={p.img}
                    alt={`${p.title} ${certLabel}`}
                    width={640}
                    height={905}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw"
                    className="pcar__img"
                  />
                </figure>
                <span className="mt-4 block font-mono text-xs uppercase tracking-wider text-lav">{p.no}</span>
                <h3 className="mt-2 text-base font-semibold leading-snug text-fg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
              </article>
            ))}
          </div>
        </div>

        <button type="button" aria-label={nextLabel} onClick={() => go(1)} className="pcar__arrow focus-on-dark">
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="pcar__meta">
        <button
          type="button"
          aria-label={userPause ? playLabel : pauseLabel}
          aria-pressed={userPause}
          onClick={() => setUserPause((v) => !v)}
          className="pcar__play focus-on-dark"
        >
          <span aria-hidden="true">{userPause ? "▶" : "❚❚"}</span>
        </button>
        <span className="pcar__dots">
          {Array.from({ length: maxIdx + 1 }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1} / ${maxIdx + 1}`}
              aria-pressed={i === cur}
              onClick={() => setIdx(i)}
              className={`pcar__dot ${i === cur ? "is-on" : ""}`}
            />
          ))}
        </span>
        <span className="font-mono text-xs tabular-nums text-faint">
          {String(cur + 1).padStart(2, "0")} / {String(maxIdx + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
