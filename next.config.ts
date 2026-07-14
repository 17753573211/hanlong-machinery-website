import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The repository already contains optimized WebP assets. Serve them
    // directly from public/ in Vercel Preview instead of routing requests
    // through either the Vinext or Vercel image optimization endpoints.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, s-maxage=31536000, immutable" }],
      },
      {
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, s-maxage=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
