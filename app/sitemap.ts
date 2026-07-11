import type { MetadataRoute } from "next";
import { locales, type Locale } from "@/locales/config";
import { SITE_URL } from "@/lib/seo";
import { products } from "@/src/data/products";

const hrefLang: Record<Locale,string> = { en:"en", zh:"zh-CN", pt:"pt", es:"es", fr:"fr" };
const pages = ["", "/products", ...products.map(p=>`/products/${p.slug}`), "/factory", "/videos", "/downloads", "/contact"];

export default function sitemap():MetadataRoute.Sitemap {
  return locales.flatMap(locale=>pages.map(path=>({
    url:`${SITE_URL}/${locale}${path}`,
    lastModified:new Date(),
    changeFrequency:path===""?"weekly" as const:"monthly" as const,
    priority:path===""?1:path.includes("products")?.9:.7,
    alternates:{languages:{...Object.fromEntries(locales.map(x=>[hrefLang[x],`${SITE_URL}/${x}${path}`])),"x-default":`${SITE_URL}/en${path}`}}
  })));
}
