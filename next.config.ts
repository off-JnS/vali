import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statischer Export: `next build` schreibt die fertige Seite nach /out.
  output: "export",
  trailingSlash: true,
  images: {
    // Ohne Server gibt es keine Bildoptimierung – Bilder werden direkt ausgeliefert.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
