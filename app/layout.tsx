import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

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
  return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
