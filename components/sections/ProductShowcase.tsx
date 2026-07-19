"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { PRODUCT } from "@/lib/product";
import { cn } from "@/utils/cn";

// Reuse the hero frames, skipping the dark intro so pointer-scrubbing stays on
// the product. Every 2nd frame keeps memory in check while staying smooth.
const FIRST = 42;
const LAST = 120;
const STEP = 2;

/**
 * Pointer-driven, turntable-style product viewer. With no GLB available, the
 * video frames stand in for a 3D model: moving the cursor (or dragging on
 * touch) across the stage scrubs through the footage, and the stage tilts
 * subtly toward the pointer for depth.
 *
 * Enabled only on fine pointers with motion allowed. Everywhere else (touch,
 * reduced motion) it falls back to a static studio still.
 */
export function ProductShowcase() {
  const reducedMotion = usePrefersReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  const frameUrls = useMemo(() => {
    const urls: string[] = [];
    for (let i = FIRST; i <= LAST; i += STEP) {
      urls.push(`/hero/frames/frame_${String(i).padStart(4, "0")}.webp`);
    }
    return urls;
  }, []);
  const restIndex = Math.round((frameUrls.length - 1) * 0.85);

  // Cursor tilt (0..1 pointer position -> degrees)
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(px, [0, 1], [7, -7]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(py, [0, 1], [-5, 5]), {
    stiffness: 120,
    damping: 18,
  });

  useEffect(() => {
    setEnabled(
      !reducedMotion && window.matchMedia("(pointer: fine)").matches,
    );
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !stage || !ctx) return;

    const images: HTMLImageElement[] = [];
    let w = 0;
    let h = 0;
    let current = restIndex;
    let firstDrawn = false;

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = stage.clientWidth;
      h = stage.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (i: number) => {
      const img = images[i];
      if (!img?.complete || !img.naturalWidth || !w || !h) return;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const boxRatio = w / h;
      let dw: number;
      let dh: number;
      if (boxRatio > imgRatio) {
        dw = w;
        dh = w / imgRatio;
      } else {
        dh = h;
        dw = h * imgRatio;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
      current = i;
    };

    setSize();

    frameUrls.forEach((url, idx) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = url;
      img.onload = () => {
        if (!firstDrawn) {
          firstDrawn = true;
          draw(idx);
          setReady(true);
        }
        if (idx === restIndex) draw(restIndex);
      };
      images.push(img);
    });

    const pointerToFrame = (clientX: number, clientY: number) => {
      const rect = stage.getBoundingClientRect();
      const nx = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      const ny = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
      px.set(nx);
      py.set(ny);
      draw(Math.round(nx * (frameUrls.length - 1)));
    };

    const onPointerMove = (e: PointerEvent) => pointerToFrame(e.clientX, e.clientY);
    const onPointerLeave = () => {
      px.set(0.5);
      py.set(0.5);
      draw(restIndex);
    };
    const onResize = () => {
      setSize();
      draw(current);
    };

    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", onResize);

    return () => {
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      images.forEach((img) => {
        img.onload = null;
        img.src = "";
      });
    };
  }, [enabled, frameUrls, restIndex, px, py]);

  return (
    <section
      id="product"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-ash">
          The Product
        </p>
        <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight sm:text-6xl">
          <TextReveal text="Seen from every angle." />
        </h2>
      </div>

      <div
        ref={stageRef}
        data-cursor
        className="relative mt-12 aspect-video w-full max-w-5xl select-none [perspective:1400px]"
      >
        {/* Static base: SSR / LCP / fallback for touch + reduced motion */}
        <Image
          src={PRODUCT.media.reveal.src}
          alt={PRODUCT.media.reveal.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="rounded-2xl object-cover"
          priority={false}
        />

        {enabled && (
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              ready ? "opacity-100" : "opacity-0",
            )}
          >
            <canvas
              ref={canvasRef}
              aria-hidden
              className="h-full w-full rounded-2xl"
            />
          </motion.div>
        )}

        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
      </div>

      <Reveal delay={0.1}>
        <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-ash">
          {enabled ? "Move your cursor across the tee to explore" : PRODUCT.colorway}
        </p>
      </Reveal>
    </section>
  );
}
