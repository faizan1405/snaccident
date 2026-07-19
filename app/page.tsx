import { Hero } from "@/components/sections/Hero";
import { StoryMarquee } from "@/components/sections/StoryMarquee";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { ProductDetails } from "@/components/sections/ProductDetails";
import { SizeSelector } from "@/components/sections/SizeSelector";
import { ProductJsonLd } from "@/components/seo/ProductJsonLd";

/**
 * Home — the full Phase 2 campaign scroll:
 *   Hero (scroll-scrubbed reveal) → Story (marquee + text reveal)
 *   → Product (pointer turntable from the video frames) → Details → Size.
 */
export default function Home() {
  return (
    <>
      <ProductJsonLd />
      <Hero />
      <StoryMarquee />
      <ProductShowcase />
      <ProductDetails />
      <SizeSelector />
    </>
  );
}
