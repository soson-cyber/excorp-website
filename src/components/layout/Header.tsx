"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";

  // Transparent over the dark hero; flips to dark-glass once scrolled past it
  // (or off-home, or while the mobile sheet is open).
  const overHero = isHome && !scrolled && !mobileOpen;

  useEffect(() => {
    // overHero already requires isHome, so non-home needs no scroll tracking.
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.82);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className={`header ${overHero ? "header--overHero" : "header--solid"}`}>
      <div className="container-ex header__inner">
        <Link href="/" className="focus-on-dark flex items-center" aria-label="EX Corporation 홈">
          <Image src="/ex-cube.png" alt="" width={120} height={120} sizes="60px" priority className="logo logo--symbol" />
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
          <span className="kobadge">KO / EN</span>
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mobile">
          <nav className="container-ex mobile__nav">
            {nav.map((item) => (
              <div key={item.label}>
                <Link href={item.href} className="mobile__item" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mobile__sub">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="mobile__subitem"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="btn btn--onDark"
              style={{ marginTop: 16 }}
              onClick={() => setMobileOpen(false)}
            >
              문의하기
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
