"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { localeLabels, locales, type Locale } from "@/locales/config";

export function LocaleSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  return <div className={`language${open ? " is-open" : ""}`} ref={root}>
    <button type="button" aria-label={label} aria-expanded={open} onClick={() => setOpen(value => !value)}>
      {locale.toUpperCase()}<span aria-hidden="true">⌄</span>
    </button>
    <div>{locales.map(x => <Link key={x} onClick={() => setOpen(false)} href={path.replace(/^\/(en|zh|pt|es|fr)(?=\/|$)/, `/${x}`)} lang={x}>{localeLabels[x]}</Link>)}</div>
  </div>;
}
