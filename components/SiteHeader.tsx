import Link from "next/link";
import { ArrowIcon } from "./Icons";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";
import type { Dictionary } from "@/locales";
import type { Locale } from "@/locales/config";

export function SiteHeader({ locale, d }: { locale: Locale; d: Dictionary }) {
  const links = [
    { label: d.nav.products, url: "products" },
    { label: d.nav.factory, url: "factory" },
    { label: d.nav.videos, url: "videos" },
    { label: d.nav.downloads, url: "downloads" },
    { label: d.nav.contact, url: "contact" },
  ];
  const mobileLinks = links.map(link => ({ label: link.label, href: `/${locale}/${link.url}` }));

  return <header className="site-header">
    <Link className="brand" href={`/${locale}`} title="瀚珑集团 · HANLONG GROUP">
      <span className="brand-mark">HL</span>
      <span className="brand-copy"><b>HANLONG GROUP</b><small>Self Loading Concrete Mixer Manufacturer</small></span>
    </Link>
    <nav className="desktop-nav">{links.map(link => <Link key={link.url} href={`/${locale}/${link.url}`}>{link.label}</Link>)}</nav>
    <div className="header-actions">
      <LocaleSwitcher locale={locale} label={d.nav.language}/>
      <Link className="header-quote" href={`/${locale}/contact`}>{d.nav.quote} <ArrowIcon/></Link>
      <MobileMenu links={mobileLinks}/>
    </div>
  </header>;
}
