"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/site";

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Which accordion group is expanded inside the mobile sheet (one at a time).
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  // `true` while the top of the page (inside the hero region) is in view.
  // Starts `true` so the first paint is transparent over the hero — no flash.
  const [atHeroTop, setAtHeroTop] = useState(true);

  const pathname = usePathname();

  // Transparent over the dark hero so its aurora/colour bleeds behind the bar;
  // flips to dark-glass once the hero scrolls away (or the mobile sheet opens).
  const overHero = atHeroTop && !mobileOpen;

  useEffect(() => {
    // Every routed page that wants a connected header renders a zero-height
    // sentinel at the bottom of its hero ([data-hero-sentinel]). While that
    // sentinel sits below the header the page is "at hero top"; once it scrolls
    // up past the bar the header turns solid. IntersectionObserver keeps this
    // off the scroll thread (no rAF/scroll listener, no layout thrash).
    const sentinel = document.querySelector<HTMLElement>("[data-hero-sentinel]");

    // No hero on this route (e.g. a bare content page) → header is always solid.
    // Defer to a frame so this isn't a synchronous setState in the effect body
    // (react-hooks/set-state-in-effect); avoids cascading renders.
    if (!sentinel) {
      const raf = requestAnimationFrame(() => setAtHeroTop(false));
      return () => cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      ([entry]) => setAtHeroTop(entry.isIntersecting),
      // The bar is ~84px tall; trip the flip the moment the sentinel crosses
      // beneath it rather than at the very top of the viewport.
      { rootMargin: "-84px 0px 0px 0px", threshold: 0 },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // When the sheet opens, move focus into it (first row); when it closes,
  // collapse any expanded accordion group so it reopens clean next time.
  useEffect(() => {
    if (mobileOpen) {
      const first = panelRef.current?.querySelector<HTMLElement>("a[href], button");
      first?.focus();
      return;
    }
    // Collapse any expanded group after close — deferred a frame so this isn't a
    // synchronous setState in the effect body (react-hooks/set-state-in-effect).
    const raf = requestAnimationFrame(() => setOpenGroup(null));
    return () => cancelAnimationFrame(raf);
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  // Esc closes the sheet; Tab is trapped within the panel for keyboard users.
  const onPanelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setMobileOpen(false);
      return;
    }
    if (e.key === "Tab" && panelRef.current) {
      // Only visible focusables — collapsed groups are `hidden` (display:none) and
      // would otherwise skew the trap boundary (offsetParent is null when hidden).
      const f = [...panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")].filter(
        (el) => el.offsetParent !== null,
      );
      if (f.length === 0) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <header className={`header ${overHero ? "header--overHero" : "header--solid"}${mobileOpen ? " header--sheet" : ""}`}>
      <div className="container-ex header__inner">
        <Link href="/" className="focus-on-dark flex items-center" aria-label="EX Corporation 홈">
          {/* 작은 고정 크기 브랜드 심볼 — 옵티마이저 우회(unoptimized)로 원본 PNG 직접 사용.
              (dev 이미지 옵티마이저가 소형 PNG의 대형 변형에서 멈춰 로고가 안 뜨던 문제 회피) */}
          <Image src="/ex-cube.png" alt="" width={120} height={120} priority unoptimized className="logo logo--symbol" />
        </Link>

        {/* Desktop nav */}
        <nav className="navbar" onMouseLeave={() => setOpenMenu(null)}>
          {nav.map((item) => {
            const alignRight = item.label === "Company";
            return (
              <div
                key={item.label}
                style={{ position: "relative" }}
                onMouseEnter={() => setOpenMenu(item.children ? item.label : null)}
                onFocus={() => item.children && setOpenMenu(item.label)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node))
                    setOpenMenu((m) => (m === item.label ? null : m));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setOpenMenu(null);
                }}
              >
                <Link
                  href={item.href}
                  className="navlink focus-on-dark"
                  aria-haspopup={item.children ? "true" : undefined}
                  aria-expanded={item.children ? openMenu === item.label : undefined}
                >
                  {item.label}
                  {item.children && (
                    <svg
                      className={`caret${openMenu === item.label ? " caret--open" : ""}`}
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  )}
                </Link>

                {item.children && openMenu === item.label && (
                  <div className="dropdown" style={alignRight ? { right: 0, left: "auto" } : undefined}>
                    <div className="dropdown__panel">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="dropdown__row"
                          onClick={() => setOpenMenu(null)}
                        >
                          <span className="dropdown__top">
                            <span className="dropdown__name">{child.label}</span>
                            {child.tag && <span className="tag">{child.tag}</span>}
                          </span>
                          {child.desc && <span className="dropdown__desc">{child.desc}</span>}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="desktop-cta">
          <Link href="/contact" className="btn btn--onDark btn--sm focus-on-dark">
            문의하기
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={mobileOpen}
          className="hamb focus-on-dark"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {mobileOpen ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu — full-screen accordion sheet */}
      {mobileOpen && (
        <div className="mobile" ref={panelRef} onKeyDown={onPanelKeyDown}>
          <nav className="container-ex mobile__nav" aria-label="모바일 메뉴">
            {nav.map((item) => {
              const expanded = openGroup === item.label;
              return (
                <div key={item.label} className="mobile__group">
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        className="mobile__item mobile__item--toggle focus-on-dark"
                        aria-expanded={expanded}
                        aria-controls={`m-sub-${item.label}`}
                        onClick={() => setOpenGroup((g) => (g === item.label ? null : item.label))}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`caret${expanded ? " caret--open" : ""}`}
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                      <div
                        id={`m-sub-${item.label}`}
                        className={`mobile__sub${expanded ? " mobile__sub--open" : ""}`}
                        hidden={!expanded}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="mobile__subitem focus-on-dark"
                            onClick={closeMobile}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link href={item.href} className="mobile__item focus-on-dark" onClick={closeMobile}>
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              );
            })}
            <div className="mobile__foot">
              <Link href="/contact" className="btn btn--onDark focus-on-dark" onClick={closeMobile}>
                문의하기
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
