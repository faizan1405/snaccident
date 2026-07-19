"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A hairline progress bar pinned to the top of the viewport that fills as the
 * page scrolls. Framer Motion's useScroll reads native scroll position, which
 * Lenis updates, so it stays in lockstep with the smooth-scroll.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-white"
    />
  );
}
