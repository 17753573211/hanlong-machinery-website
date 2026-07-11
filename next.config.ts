import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cloudflare Images and the ASSETS binding only exist in the deployed
    // Worker. In local Vinext development, serve the already optimized WebP
    // files directly instead of calling /_vinext/image without those bindings.
    unoptimized: process.env.NODE_ENV !== "production",
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
