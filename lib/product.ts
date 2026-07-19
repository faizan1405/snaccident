import { SIZES } from "@/lib/constants";
import type { Size } from "@/types";

/**
 * The one signature tee. Single source of truth for the storefront until the
 * MongoDB-backed product lands in Phase 3 (this shape mirrors the Product type).
 *
 * TODO(assets): values marked PLACEHOLDER need the real spec sheet / price from
 * the brand before launch.
 */
export const PRODUCT = {
  id: "snaccident-signature-tee",
  name: "The Signature Tee",
  subtitle: "A moment of indulgence.",
  colorway: "Toffee",
  // PLACEHOLDER — replace with the real retail price (INR).
  price: 1499,
  currency: "INR" as const,
  sizes: [...SIZES] as Size[],
  media: {
    graphic: {
      src: "/product/tee-graphic.webp",
      alt: "SNACCIDENT Signature Tee — front graphic",
    },
    wordmark: {
      src: "/product/tee-wordmark.webp",
      alt: "SNACCIDENT Signature Tee — back wordmark",
    },
    reveal: {
      src: "/product/tee-reveal.webp",
      alt: "SNACCIDENT Signature Tee — studio reveal",
    },
  },
  // PLACEHOLDER specs — confirm against the real fabric spec sheet.
  specs: [
    { label: "Material", value: "100% combed ring-spun cotton" },
    { label: "Weight", value: "240 GSM · heavyweight" },
    { label: "Fabric", value: "Bio-washed single jersey" },
    { label: "Fit", value: "Oversized · drop shoulder" },
    {
      label: "Wash care",
      value: "Machine wash cold, inside out. Do not bleach. Tumble dry low. Do not iron the print.",
    },
  ],
} as const;
