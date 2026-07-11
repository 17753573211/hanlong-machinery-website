import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "HANLONG GROUP | Self Loading Concrete Mixer Manufacturer",
  description: "Self-loading concrete mixers engineered and manufactured in China for global construction projects.",
  keywords: ["self loading concrete mixer", "concrete mixer manufacturer", "concrete mixer truck"],
  openGraph: { title: "HANLONG GROUP Industrial Machinery", description: "Self Loading Concrete Mixer Manufacturer", type: "website", images: [{ url: "/og.png", width: 1732, height: 909, alt: "HANLONG GROUP self-loading concrete mixer" }] },
  twitter: { card: "summary_large_image", title: "HANLONG GROUP Industrial Machinery", description: "Self Loading Concrete Mixer Manufacturer", images: ["/og.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
