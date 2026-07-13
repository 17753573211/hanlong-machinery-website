import Link from "next/link";
import type { Dictionary } from "@/locales";
import type { Locale } from "@/locales/config";
import { WHATSAPP_URL } from "@/lib/whatsapp";

export function SiteFooter({ locale, d }: { locale: Locale; d: Dictionary }) {
  return <footer><div className="container footer-grid"><div>
    <Link className="brand footer-brand" href={`/${locale}`} title="瀚珑集团 · HANLONG GROUP"><span className="brand-mark">HL</span><span className="brand-copy"><b>HANLONG GROUP</b><small>Self Loading Concrete Mixer Manufacturer</small></span></Link>
    <p>{d.footer.tagline}</p>
  </div><div><h4>{d.footer.machines}</h4>
    <Link href={`/${locale}/products`}>{d.footer.allProducts}</Link>
    <Link href={`/${locale}/downloads`}>{d.footer.catalogs}</Link>
  </div><div><h4>{d.footer.company}</h4>
    <Link href={`/${locale}/factory`}>{d.nav.factory}</Link><Link href={`/${locale}/videos`}>{d.nav.videos}</Link><Link href={`/${locale}/contact`}>{d.nav.contact}</Link>
  </div><div><h4>{d.footer.connect}</h4><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a><p>{d.footer.location}</p></div></div>
  <div className="container footer-bottom"><span>© 2026 HANLONG GROUP. {d.footer.rights}</span><span>{d.footer.privacy}</span></div></footer>;
}
