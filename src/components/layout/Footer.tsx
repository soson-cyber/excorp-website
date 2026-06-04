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
              <a
                href={site.social.instagram}
                className="transition-colors hover:text-footer-accent"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Icon name="instagram" />
                <span className="sr-only">Instagram</span>
              </a>
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

        {/* Locations */}
        <div className="mt-14 grid gap-6 border-t border-ink-hover pt-8 sm:grid-cols-2">
          {locations.map((loc) => (
            <div key={loc.kind}>
              <span className="font-mono text-xs uppercase tracking-wider text-footer-accent">{loc.kind}</span>
              <p className="mt-1.5 text-sm font-medium text-white">{loc.name}</p>
              <p className="text-sm text-footer-link">
                {loc.address} <span className="text-footer-muted">({loc.zip})</span>
              </p>
              {loc.tel && (
                <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-footer-muted">
                  <a
                    href={`tel:${loc.tel.replace(/[^0-9+]/g, "")}`}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                  >
                    <Icon name="phone" className="h-3.5 w-3.5" />
                    <span className="sr-only">Tel</span>
                    {loc.tel}
                  </a>
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="fax" className="h-3.5 w-3.5" />
                    <span className="sr-only">Fax</span>
                    {site.contact.fax}
                  </span>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                  >
                    <Icon name="mail" className="h-3.5 w-3.5" />
                    <span className="sr-only">Email</span>
                    {site.contact.email}
                  </a>
                </p>
              )}
            </div>
          ))}
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
