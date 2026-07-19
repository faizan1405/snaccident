import { PRODUCT } from "@/lib/product";
import { SITE } from "@/lib/constants";

/**
 * Product Schema.org JSON-LD for rich results. Server-rendered into the page.
 * Price/availability will be sourced from the DB once Phase 3 lands.
 */
export function ProductJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${SITE.name} ${PRODUCT.name}`,
    description: SITE.description,
    brand: { "@type": "Brand", name: SITE.name },
    image: [
      `${SITE.url}${PRODUCT.media.graphic.src}`,
      `${SITE.url}${PRODUCT.media.wordmark.src}`,
      `${SITE.url}${PRODUCT.media.reveal.src}`,
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: PRODUCT.currency,
      price: PRODUCT.price,
      availability: "https://schema.org/InStock",
      url: SITE.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD is trusted, static, brand-controlled content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
