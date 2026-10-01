import { fileURLToPath } from "node:url";

// GitHub Pages serves project sites from /<repo-name>/, so every asset and
// route needs that prefix. Set NEXT_PUBLIC_BASE_PATH in the deploy workflow
// (e.g. "/itzfizz") — it stays empty for local dev, `next start`, and Vercel.
// Must be NEXT_PUBLIC_-prefixed so client components can read it too (see
// src/components/Hero.jsx, which manually prefixes the car image src).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  // Pins the project root so Turbopack doesn't walk up looking for a
  // workspace lockfile and pick the wrong (home directory) root.
  turbopack: { root: fileURLToPath(new URL(".", import.meta.url)) },
};

export default nextConfig;
