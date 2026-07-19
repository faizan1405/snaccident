"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { PRODUCT } from "@/lib/product";
import { formatINR } from "@/utils/format";
import { cn } from "@/utils/cn";
import type { Size } from "@/types";

export function SizeSelector() {
  const [size, setSize] = useState<Size | null>(null);

  return (
    <section
      id="size"
      className="relative flex min-h-svh flex-col items-center justify-center border-t border-white/5 px-6 py-28 text-center"
    >
      <p className="text-[11px] uppercase tracking-[0.4em] text-ash">
        Claim Yours
      </p>
      <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight sm:text-6xl">
        <TextReveal text="Pick your size." />
      </h2>

      <Reveal delay={0.1}>
        <p className="mt-6 text-sm text-white/60">
          {PRODUCT.name} · {PRODUCT.colorway} ·{" "}
          <span className="text-white">{formatINR(PRODUCT.price)}</span>
        </p>
      </Reveal>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {PRODUCT.sizes.map((option) => {
          const selected = size === option;
          return (
            <button
              key={option}
              type="button"
              data-cursor
              aria-pressed={selected}
              onClick={() => setSize(option)}
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-full border text-sm uppercase tracking-widest transition-colors duration-300",
                selected
                  ? "border-white bg-white text-ink"
                  : "border-white/25 text-white hover:border-white",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-12 flex flex-col items-center gap-3">
          <button
            type="button"
            data-cursor
            disabled={!size}
            // Wired to the Zustand cart in Phase 3.
            className={cn(
              "rounded-full px-12 py-4 text-[11px] uppercase tracking-[0.25em] transition-all duration-300",
              size
                ? "bg-white text-ink hover:bg-fog"
                : "cursor-not-allowed bg-white/15 text-white/40",
            )}
          >
            {size ? `Add ${size} to Bag` : "Select a size"}
          </button>
          <p className="text-[10px] uppercase tracking-[0.25em] text-ash">
            Bag &amp; checkout arrive in Phase 3
          </p>
        </div>
      </Reveal>
    </section>
  );
}
