"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Site-wide LIGHT theme (white migration). The header is always light now.
  const light = true;

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={
        light
          ? "sticky top-0 z-50 border-b border-[#E5E7EB] bg-white/80 backdrop-blur-xl"
          : "sticky top-0 z-50 border-b border-border/70 bg-bg/80 backdrop-blur-xl"
      }
    >
      <div className="container-ex flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center" aria-label="EX Corporation 홈">
          <Image
            src="/ex-logo.png"
            alt="EX Corporation"
            width={1001}
            height={201}
            priority
            className="h-6 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpenMenu(null)}>
          {nav.map((item) => (
            <div key={item.label} className="relative" onMouseEnter={() => setOpenMenu(item.children ? item.label : null)}>
              <Link
                href={item.href}
                className={
                  light
                    ? "flex items-center gap-1 rounded-md px-3 py-2 text-sm text-[#51545E] transition-colors hover:text-[#0F1129]"
                    : "flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
                }
              >
                {item.label}
                {item.children && (
                  <span className={light ? "text-[10px] text-[#6b7280]" : "text-[10px] text-faint"}>▾</span>
                )}
              </Link>

              {item.children && openMenu === item.label && (
                <div
                  className={`animate-dropdown absolute top-full pt-3 ${
                    item.label === "Company" ? "right-0" : "left-0"
                  }`}
                >
                  <div className="flex w-[600px] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_24px_60px_-20px_rgba(15,17,41,0.28)]">
                    {/* link column */}
                    <div className="flex-1 p-3">
                      <p className="px-3 pb-1 pt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9aa0aa]">
                        {item.label}
                      </p>
                      <div className="flex flex-col">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenMenu(null)}
                            className="group/row rounded-xl px-3 py-2.5 transition-colors hover:bg-[#F7F8FA]"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-[#0F1129] transition-colors group-hover/row:text-[#5E2EC0]">
                                {child.label}
                              </span>
                              {child.tag && (
                                <span className="rounded-full bg-[#5E2EC0]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#5E2EC0]">
                                  {child.tag}
                                </span>
                              )}
                            </span>
                            {child.desc && (
                              <span className="mt-0.5 block text-xs leading-relaxed text-[#6b7280]">
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
          <span className={light ? "font-mono text-xs text-[#6b7280]" : "font-mono text-xs text-faint"}>
            KO / EN
          </span>
          {light ? (
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#0F1129] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#23264a]"
            >
              문의하기
            </Link>
          ) : (
            <Button href="/contact" className="px-4 py-2">
              문의하기
            </Button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={mobileOpen}
          className={
            light
              ? "flex h-11 w-11 items-center justify-center rounded-md text-[#0F1129] transition-colors hover:bg-[#F7F8FA] lg:hidden"
              : "flex h-11 w-11 items-center justify-center rounded-md text-fg transition-colors hover:bg-surface lg:hidden"
          }
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
        <div className={light ? "border-t border-[#E5E7EB] bg-white lg:hidden" : "border-t border-border bg-bg lg:hidden"}>
          <nav className="container-ex flex flex-col py-4">
            {nav.map((item) => (
              <div key={item.label} className="py-1">
                <Link
                  href={item.href}
                  className={light ? "block py-2 text-base font-medium text-[#0F1129]" : "block py-2 text-base font-medium text-fg"}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className={light ? "ml-3 flex flex-col border-l border-[#E5E7EB] pl-3" : "ml-3 flex flex-col border-l border-border pl-3"}>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={light ? "py-1.5 text-sm text-[#51545E]" : "py-1.5 text-sm text-muted"}
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {light ? (
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-[#0F1129] px-5 py-2.5 text-sm font-bold text-white"
                onClick={() => setMobileOpen(false)}
              >
                문의하기
              </Link>
            ) : (
              <Button href="/contact" className="mt-4" onClick={() => setMobileOpen(false)}>
                문의하기
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
