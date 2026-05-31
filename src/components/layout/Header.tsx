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

  // Transparent, white-on-dark header while sitting over the dark home hero;
  // flips to the solid light header once scrolled past the hero (or off-home,
  // or while the mobile sheet is open).
  const overHero = isHome && !scrolled && !mobileOpen;

  // Track whether we've scrolled past (most of) the hero.
  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.82);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        overHero
          ? "border-b border-white/10 bg-transparent"
          : "border-b border-border bg-white/80 backdrop-blur-xl"
      }`}
    >
      <div className="container-ex flex h-16 items-center justify-between gap-6">
        <Link href="/" className={`flex items-center ${overHero ? "focus-on-dark" : ""}`} aria-label="EX Corporation 홈">
          <Image
            src="/ex-logo.png"
            alt="EX Corporation"
            width={1001}
            height={201}
            priority
            className="h-6 w-auto transition-[filter] duration-300"
            style={{ filter: overHero ? "brightness(0) invert(1)" : "none" }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpenMenu(null)}>
          {nav.map((item) => (
            <div
              key={item.label}
              className="relative"
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
                aria-haspopup={item.children ? "true" : undefined}
                aria-expanded={item.children ? openMenu === item.label : undefined}
                className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors ${
                  overHero
                    ? "text-white/80 hover:text-white focus-on-dark"
                    : "text-muted hover:text-fg"
                }`}
              >
                {item.label}
                {item.children && (
                  <span className={overHero ? "text-[10px] text-white/50" : "text-[10px] text-faint"}>
                    ▾
                  </span>
                )}
              </Link>

              {item.children && openMenu === item.label && (
                <div
                  className={`animate-dropdown absolute top-full pt-3 ${
                    item.label === "Company" ? "right-0" : "left-0"
                  }`}
                >
                  <div className="flex w-[600px] overflow-hidden rounded-2xl border border-border bg-white shadow-[0_24px_60px_-20px_rgba(15,17,41,0.28)]">
                    {/* link column */}
                    <div className="flex-1 p-3">
                      <p className="px-3 pb-1 pt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                        {item.label}
                      </p>
                      <div className="flex flex-col">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenMenu(null)}
                            className="group/row rounded-xl px-3 py-2.5 transition-colors hover:bg-surface"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-fg transition-colors group-hover/row:text-primary">
                                {child.label}
                              </span>
                              {child.tag && (
                                <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
                                  {child.tag}
                                </span>
                              )}
                            </span>
                            {child.desc && (
                              <span className="mt-0.5 block text-xs leading-relaxed text-faint">
                                {child.desc}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* featured card — EX gradient mesh */}
                    {item.featured && (
                      <Link
                        href={item.featured.href}
                        onClick={() => setOpenMenu(null)}
                        className="gradient-ex-mesh group/feat relative flex w-[210px] shrink-0 flex-col justify-between overflow-hidden p-5 text-white"
                      >
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                          {item.featured.eyebrow}
                        </span>
                        <span className="mt-4 block">
                          <span className="block text-[15px] font-bold leading-snug">
                            {item.featured.title}
                          </span>
                          <span className="mt-1.5 block text-xs leading-relaxed text-white/75">
                            {item.featured.desc}
                          </span>
                        </span>
                        <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-white">
                          {item.featured.cta}
                          <span className="transition-transform group-hover/feat:translate-x-0.5">→</span>
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <span className={overHero ? "font-mono text-xs text-white/60" : "font-mono text-xs text-faint"}>
            KO / EN
          </span>
          <Link
            href="/contact"
            className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              overHero
                ? "bg-white text-fg hover:bg-white/90"
                : "bg-fg text-white hover:bg-ink-hover"
            }`}
          >
            문의하기
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={mobileOpen}
          className={`flex h-11 w-11 items-center justify-center rounded-md transition-colors lg:hidden ${
            overHero ? "text-white hover:bg-white/10 focus-on-dark" : "text-fg hover:bg-surface"
          }`}
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
        <div className="border-t border-border bg-white lg:hidden">
          <nav className="container-ex flex flex-col py-4">
            {nav.map((item) => (
              <div key={item.label} className="py-1">
                <Link
                  href={item.href}
                  className="block py-2 text-base font-medium text-fg"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-3 flex flex-col border-l border-border pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="py-1.5 text-sm text-muted"
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
              className="mt-4 inline-flex items-center justify-center rounded-full bg-fg px-5 py-2.5 text-sm font-bold text-white"
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
