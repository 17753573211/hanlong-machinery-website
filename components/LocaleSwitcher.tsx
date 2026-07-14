"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/locales/config";

export function LocaleSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const path = usePathname();

  return <details className="language">
    <summary
      aria-label={label}
      style={{ minWidth: 44, minHeight: 44, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
    >
      {locale.toUpperCase()}⌄
    </summary>
    <div>
      {locales.map(x => <Link key={x} href={path.replace(/^\/(en|zh|pt|es|fr)(?=\/|$)/, `/${x}`)} lang={x}>{localeLabels[x]}</Link>)}
    </div>
  </details>;
}
