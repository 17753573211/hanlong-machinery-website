"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { localeLabels, locales, type Locale } from "@/locales/config";

export function LocaleSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return <div className={`language${open ? " is-open" : ""}`} ref={root} onPointerDown={event => event.stopPropagation()}>
    <button
      type="button"
      aria-label={label}
      aria-controls={menuId}
      aria-expanded={open}
      aria-haspopup="menu"
      onClick={() => setOpen(value => !value)}
    >
      {locale.toUpperCase()}<span aria-hidden="true">⌄</span>
    </button>
    <div id={menuId} role="menu" aria-hidden={!open}>
      {locales.map(x => <Link role="menuitem" key={x} onClick={() => setOpen(false)} href={path.replace(/^\/(en|zh|pt|es|fr)(?=\/|$)/, `/${x}`)} lang={x}>{localeLabels[x]}</Link>)}
    </div>
  </div>;
}
