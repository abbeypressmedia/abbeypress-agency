"use client";

import { useState } from "react";

const links = [
  ["Systems", "#systems"],
  ["Services", "#services"],
  ["Proof", "#proof"],
  ["Contact", "/contact"],
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-wrap">
      <div className="nav shell">
        <a className="brand" href="#" aria-label="AbbeyPress Agency home">
          <span className="brand-mark">A</span>
          <span>ABBEYPRESS</span>
          <small>AGENCY</small>
        </a>

        <nav className={open ? "nav-links nav-open" : "nav-links"} aria-label="Primary">
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a className="nav-cta" href="#audit" onClick={() => setOpen(false)}>
            Free Store Audit <span>↗</span>
          </a>
        </nav>

        <button
          className="menu-button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "×" : "☰"}
        </button>
      </div>
    </header>
  );
}
