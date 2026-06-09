import Link from "next/link";
import Image from "next/image";
import { site, footerColumns, locations } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

/*
  Footer stays DARK site-wide (a deliberate dark anchor under the white pages,
  matching the approved Home). Colors are hardcoded so the light @theme token
  remap does not flip it.
*/
export function Footer() {
  return (
    <footer className="border-t border-ink-hover bg-footer text-white">
      <div className="container-ex py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_2.5fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block" aria-label="EX Corporation 홈">
              <Image src="/ex-logo-dark.png" alt="EX Corporation" width={1372} height={274} className="h-7 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-footer-link">{site.mission}</p>
            <div className="mt-6 flex gap-5 text-footer-link">
              {(
                [
                  { name: "instagram", label: "Instagram", href: site.social.instagram },
                  { name: "facebook", label: "Facebook", href: site.social.facebook },
                  { name: "youtube", label: "YouTube", href: site.social.youtube },
                ] as const
              ).map((sns) => (
                <a
                  key={sns.name}
                  href={sns.href}
                  className="transition-colors hover:text-footer-accent"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={sns.label}
                >
                  <Icon name={sns.name} />
                  <span className="sr-only">{sns.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-xs uppercase tracking-wider text-footer-muted">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-footer-link transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Locations(좌) + 공용 연락처(우) — 연락처는 특정 거점이 아니라 회사 공용 */}
        <div className="mt-14 grid gap-8 border-t border-ink-hover pt-8 lg:grid-cols-[2fr_1fr]">
          {/* 주소 — Office · Studio */}
          <div className="grid gap-6 sm:grid-cols-2">
            {locations.map((loc) => (
              <div key={loc.kind}>
                <span className="font-mono text-xs uppercase tracking-wider text-footer-accent">{loc.kind}</span>
                <p className="mt-1.5 text-sm font-medium text-white">{loc.name}</p>
                <p className="text-sm text-footer-link">
                  {loc.address} <span className="text-footer-muted">({loc.zip})</span>
                </p>
              </div>
            ))}
          </div>

          {/* 공용 연락처 */}
          <div className="lg:border-l lg:border-ink-hover lg:pl-8">
            <span className="font-mono text-xs uppercase tracking-wider text-footer-accent">Contact</span>
            <ul className="mt-1.5 space-y-2 font-mono text-xs text-footer-muted">
              <li>
                <a
                  href={`tel:${site.contact.tel.replace(/[^0-9+]/g, "")}`}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  <Icon name="phone" className="h-3.5 w-3.5 shrink-0" />
                  <span className="sr-only">Tel</span>
                  {site.contact.tel}
                </a>
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Icon name="fax" className="h-3.5 w-3.5 shrink-0" />
                <span className="sr-only">Fax</span>
                {site.contact.fax}
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  <Icon name="mail" className="h-3.5 w-3.5 shrink-0" />
                  <span className="sr-only">Email</span>
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-10 flex flex-col gap-3 border-t border-ink-hover pt-6 text-xs text-footer-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} EX Corporation. All rights reserved.</p>
          <p className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Use
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
