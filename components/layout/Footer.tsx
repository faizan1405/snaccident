import Link from "next/link";
import { LEGAL_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="border-t border-white/10 bg-ink px-6 py-16"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl tracking-[0.3em] text-white">
            {SITE.name}
          </p>
          <p className="mt-3 text-sm text-ash">{SITE.tagline}</p>
        </div>

        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.2em] text-ash">
          {LEGAL_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="mx-auto mt-12 max-w-7xl text-[10px] uppercase tracking-[0.2em] text-white/30">
        © {year} {SITE.name}. All rights reserved.
      </p>
    </footer>
  );
}
