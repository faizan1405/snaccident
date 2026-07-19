import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Product photography / 3D texture CDNs get added here as phases land.
    remotePatterns: [],
  },
  experimental: {
    // Keep heavy client libs (three, gsap, framer-motion) out of the initial graph
    // where possible; individual sections still use dynamic imports.
    optimizePackageImports: ["framer-motion", "lenis"],
  },
};

export default nextConfig;
