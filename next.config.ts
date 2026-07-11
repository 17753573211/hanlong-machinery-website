import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product media is already exported as WebP and may live on OSS/R2.
    // Avoid proxying large remote files through the Vercel image optimizer.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    const mediaBase = process.env.MEDIA_BASE_URL?.replace(/\/$/, "");
    if (!mediaBase) return [];
    return [
      { source: "/media/:path*", destination: `${mediaBase}/media/:path*` },
      { source: "/videos/:path*", destination: `${mediaBase}/videos/:path*` },
    ];
  },
};

export default nextConfig;
