// Extracts a scroll-scrub image sequence + poster from the hero video.
//
// Why an image sequence: a browser <video> element cannot be reverse-scrubbed
// smoothly (seeking is async and stutters). Pre-extracted frames drawn to a
// <canvas> and driven by GSAP ScrollTrigger scrub cleanly in both directions.
//
// Usage:
//   node scripts/extract-hero-frames.mjs [inputVideo]
//   HERO_SOURCE=path/to/video.mp4 node scripts/extract-hero-frames.mjs
//
// Defaults to assets/hero-source.mp4. Shipped output lives in public/hero/.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const INPUT = process.argv[2] || process.env.HERO_SOURCE || resolve(root, "assets/hero-source.mp4");
const FRAMES_DIR = resolve(root, "public/hero/frames");
const POSTER = resolve(root, "public/hero/poster.webp");
const MANIFEST = resolve(root, "public/hero/manifest.json");

// Tuning: 12fps over a ~10s clip → ~120 frames. Enough granularity for a smooth
// scrub while keeping the total payload in the low-single-digit MB range.
const FPS = 12;
const QUALITY = 72; // libwebp 0-100
const WIDTH = 1280;
const HEIGHT = 720;

if (!ffmpegPath) throw new Error("ffmpeg-static binary not found. Run `npm install`.");
if (!existsSync(INPUT)) throw new Error(`Hero source video not found at: ${INPUT}`);

console.log(`→ Source : ${INPUT}`);
console.log(`→ Output : ${FRAMES_DIR}`);

// Clean & recreate frames dir
rmSync(FRAMES_DIR, { recursive: true, force: true });
mkdirSync(FRAMES_DIR, { recursive: true });

// 1) Frame sequence
execFileSync(
  ffmpegPath,
  [
    "-hide_banner", "-loglevel", "error", "-y",
    "-i", INPUT,
    "-vf", `fps=${FPS},scale=${WIDTH}:${HEIGHT}:flags=lanczos`,
    "-c:v", "libwebp",
    "-quality", String(QUALITY),
    "-compression_level", "6",
    resolve(FRAMES_DIR, "frame_%04d.webp"),
  ],
  { stdio: "inherit" },
);

// 2) Poster / reduced-motion + LCP fallback — the resolved product reveal.
execFileSync(
  ffmpegPath,
  [
    "-hide_banner", "-loglevel", "error", "-y",
    "-ss", "9.7",
    "-i", INPUT,
    "-frames:v", "1",
    "-vf", `scale=${WIDTH}:${HEIGHT}:flags=lanczos`,
    "-c:v", "libwebp",
    "-quality", "82",
    POSTER,
  ],
  { stdio: "inherit" },
);

// 3) Manifest so the client knows how many frames to preload.
const frames = readdirSync(FRAMES_DIR).filter((f) => f.endsWith(".webp"));
const manifest = {
  count: frames.length,
  prefix: "frame_",
  pad: 4,
  ext: "webp",
  basePath: "/hero/frames",
  poster: "/hero/poster.webp",
  width: WIDTH,
  height: HEIGHT,
  fps: FPS,
};
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));

console.log(`✓ Extracted ${frames.length} frames + poster`);
console.log(`✓ Manifest → ${MANIFEST}`);
