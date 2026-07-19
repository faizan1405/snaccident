/**
 * Brand-wide constants. Keep copy, palette, and navigation here so sections
 * stay presentational and the campaign voice is edited in one place.
 */

export const SITE = {
  name: "SNACCIDENT",
  tagline: "Not a Mistake. A Statement.",
  description:
    "SNACCIDENT — one signature premium tee. Minimal, luxury, futuristic. Not a mistake, a statement.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://snaccident.com",
  locale: "en_IN",
  currency: "INR",
} as const;

/** In-page section anchors used by the sticky nav (sections land in Phase 2). */
export const NAV_LINKS = [
  { label: "Story", href: "#story" },
  { label: "Product", href: "#product" },
  { label: "Details", href: "#details" },
  { label: "Size", href: "#size" },
] as const;

/** Footer / legal routes (pages land in later phases). */
export const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Shipping", href: "/shipping" },
  { label: "Refund", href: "/refund" },
] as const;

/** The one signature tee ships in sizes XS–XXL. */
export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

/** Raw palette tokens (mirror of the Tailwind @theme colors). */
export const PALETTE = {
  ink: "#000000",
  white: "#FFFFFF",
  fog: "#F5F5F5",
  ash: "#7A7A7A",
} as const;
