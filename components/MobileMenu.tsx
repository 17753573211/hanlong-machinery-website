"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type MobileMenuLink = {
  href: string;
  label: string;
};

export function MobileMenu({ links, label = "Menu" }: { links: MobileMenuLink[]; label?: string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    const closeOutside = (event: MouseEvent | TouchEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("click", closeOutside);
    document.addEventListener("touchend", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("click", closeOutside);
      document.removeEventListener("touchend", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return <div className={`mobile-menu${open ? " is-open" : ""}`} ref={root}>
    <button
      className="mobile-menu-button"
      type="button"
      aria-label={label}
      aria-controls={menuId}
      aria-expanded={open}
      aria-haspopup="menu"
      onClick={() => setOpen(value => !value)}
    >
      <span aria-hidden="true">☰</span>
    </button>
    <nav className="mobile-menu-panel" id={menuId} aria-hidden={!open}>
      {links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
    </nav>
  </div>;
}
