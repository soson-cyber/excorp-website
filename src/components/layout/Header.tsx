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
                  <span className={light ? "text-[10px] text-[#7C8090]" : "text-[10px] text-faint"}>▾</span>
                )}
              </Link>

              {item.children && openMenu === item.label && (
                <div className="animate-dropdown absolute left-0 top-full w-80 pt-2">
                  <div
                    className={
                      light
                        ? "overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-2xl"
                        : "overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
                    }
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={
                          light
                            ? "block border-b border-[#E5E7EB] px-4 py-3.5 transition-colors last:border-0 hover:bg-[#F7F8FA]"
                            : "block border-b border-border/60 px-4 py-3.5 transition-colors last:border-0 hover:bg-surface-2"
                        }
                      >
                        <span className="flex items-center gap-2">
                          <span className={light ? "font-medium text-[#0F1129]" : "font-medium text-fg"}>
                            {child.label}
                          </span>
                          {child.tag && (
                            <span
                              className={
                                light
                                  ? "rounded-full bg-[#5E2EC0]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#5E2EC0]"
                                  : "rounded-full bg-primary-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary"
                              }
                            >
                              {child.tag}
                            </span>
                          )}
                        </span>
                        {child.desc && (
                          <span className={light ? "mt-1 block text-xs text-[#7C8090]" : "mt-1 block text-xs text-muted"}>
                            {child.desc}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <span className={light ? "font-mono text-xs text-[#7C8090]" : "font-mono text-xs text-faint"}>
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
