"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/utils/cn";

/**
 * Sticky top navigation. Transparent over the hero, then a frosted panel once
 * the page scrolls. The cart control is a placeholder here — it gets wired to
 * the Zustand cart drawer in Phase 3.
 */
export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled
          ? "border-b border-white/10 bg-ink/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-base tracking-[0.3em] text-white"
          aria-label="SNACCIDENT home"
        >
          <img src="/favicon.png" alt="SNACCIDENT logo" className="h-7 w-7 rounded-md object-cover shrink-0" />
          <span>SNACCIDENT</span>
        </Link>

        <ul className="hidden items-center gap-10 text-[11px] uppercase tracking-[0.2em] text-white/60 md:flex">
          {NAV_LINKS.map((link) => (
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

        <div className="flex items-center gap-6">
          <Link
            href="#product"
            className="hidden text-[11px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-white sm:block"
          >
            Shop
          </Link>
          <button
            type="button"
            data-cursor
            aria-label="Open cart"
            className="text-[11px] uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-70"
          >
            Cart&nbsp;<span className="tabular-nums text-ash">(0)</span>
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
