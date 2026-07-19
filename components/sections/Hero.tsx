"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/utils/cn";
import heroManifest from "../../public/hero/manifest.json";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const { count, prefix, pad, ext, basePath, poster } = heroManifest;

const frameUrl = (i: number) =>
  `${basePath}/${prefix}${String(i).padStart(pad, "0")}.${ext}`;

/**
 * Full-bleed, scroll-scrubbed hero.
 *
 * A pre-extracted WebP frame sequence is drawn to a <canvas> and driven by a
 * pinned GSAP ScrollTrigger — the tee resolves out of black as you scroll, and
 * the overlay copy recedes as the product arrives. (A <video> element can't be
 * reverse-scrubbed smoothly, hence the image sequence.)
 *
 * Reduced-motion: no pin, no scrub, no canvas — just the resolved product still
 * with static copy.
 */
export function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !section || !ctx) return;

    const state = { frame: 0 };
    const images: HTMLImageElement[] = [];
    let cssW = 0;
    let cssH = 0;

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssW = section.clientWidth;
      cssH = section.clientHeight;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawCover = (img: HTMLImageElement) => {
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const boxRatio = cssW / cssH;
      let w: number;
      let h: number;
      if (boxRatio > imgRatio) {
        w = cssW;
        h = cssW / imgRatio;
      } else {
        h = cssH;
        w = cssH * imgRatio;
      }
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.drawImage(img, (cssW - w) / 2, (cssH - h) / 2, w, h);
    };

    const render = () => {
      const img = images[Math.round(state.frame)];
      if (img?.complete && img.naturalWidth) drawCover(img);
    };

    setSize();

    // Preload the full sequence.
    let loaded = 0;
    for (let i = 0; i < count; i++) {
      const img = new window.Image();
      img.decoding = "async";
      img.src = frameUrl(i + 1);
      img.onload = () => {
        loaded += 1;
        if (i === 0) {
          render();
          setCanvasReady(true);
        }
        if (loaded === count) ScrollTrigger.refresh();
      };
      images.push(img);
    }

    const onResize = () => {
      setSize();
      render();
    };
    window.addEventListener("resize", onResize);

    const gsapCtx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=180%",
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });
      tl.to(state, { frame: count - 1, ease: "none", duration: 1, onUpdate: render }, 0);
      tl.to(
        overlayRef.current,
        { autoAlpha: 0, y: -40, ease: "none", duration: 0.4 },
        0,
      );
    }, section);

    return () => {
      window.removeEventListener("resize", onResize);
      gsapCtx.revert();
      images.forEach((img) => {
        img.onload = null;
        img.src = "";
      });
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative h-svh w-full overflow-hidden bg-ink"
    >
      {reducedMotion ? (
        <Image
          src={poster}
          alt="SNACCIDENT signature tee — front graphic and back wordmark"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <canvas
          ref={canvasRef}
          aria-hidden
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-700",
            canvasReady ? "opacity-100" : "opacity-0",
          )}
        />
      )}

      {/* Legibility scrim */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/10 to-ink/85"
      />

      {/* Overlay copy */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
        <p className="text-[11px] uppercase tracking-[0.4em] text-white/70">
          Edition 01 · The Signature Tee
        </p>
        <h1 className="mt-6 font-display text-[19vw] font-medium leading-[0.82] tracking-tight md:text-[13vw]">
          SNACCIDENT
        </h1>
        <p className="mt-6 max-w-md text-base text-white/80 sm:text-lg">
          Not a Mistake. A Statement.
        </p>

        <div className="pointer-events-auto mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="#product"
            data-cursor
            className="rounded-full bg-white px-9 py-3.5 text-[11px] uppercase tracking-[0.25em] text-ink transition-colors duration-300 hover:bg-fog"
          >
            Shop the Tee
          </Link>
          <Link
            href="#story"
            data-cursor
            className="rounded-full border border-white/30 px-9 py-3.5 text-[11px] uppercase tracking-[0.25em] text-white backdrop-blur-sm transition-colors duration-300 hover:border-white"
          >
            Explore Story
          </Link>
        </div>
      </div>

      <span className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/60">
        Scroll to reveal
      </span>
    </section>
  );
}
