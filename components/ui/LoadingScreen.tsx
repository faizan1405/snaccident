"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SITE } from "@/lib/constants";

const WORD = SITE.name.split("");

/**
 * Full-bleed intro veil: the wordmark resolves while a 0→100 counter runs,
 * then the panel slides away. Scroll is locked underneath until it clears.
 * Reduced-motion users get a near-instant dismissal.
 */
export function LoadingScreen() {
  const reducedMotion = usePrefersReducedMotion();
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    if (reducedMotion) {
      setCount(100);
      const t = window.setTimeout(() => setDone(true), 250);
      return () => {
        window.clearTimeout(t);
        document.body.style.overflow = "";
      };
    }

    const duration = 1600;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setCount(Math.round(progress * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setDone(true), 350);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, [reducedMotion]);

  // Ensure scroll is released once the veil is gone.
  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center">
            <div className="flex overflow-hidden">
              {WORD.map((letter, i) => (
                <motion.span
                  key={`${letter}-${i}`}
                  className="font-display text-2xl tracking-[0.4em] text-white sm:text-3xl"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    delay: reducedMotion ? 0 : 0.05 * i,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>

          <span className="absolute bottom-8 right-8 font-display text-xs tabular-nums tracking-[0.3em] text-ash">
            {String(count).padStart(3, "0")}
          </span>
          <span className="absolute bottom-8 left-8 text-[10px] uppercase tracking-[0.3em] text-ash">
            {SITE.tagline}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
