"use client";

import { useState } from "react";
import type { Language, PortfolioCopy } from "../../content/portfolio";
import { AmbientSound } from "../ambient-sound";

interface SiteHeaderProps {
  language: Language;
  copy: PortfolioCopy;
  onLanguageChange: () => void;
  onThemeChange: () => void;
}

export function SiteHeader({
  language,
  copy,
  onLanguageChange,
  onThemeChange,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Edgar Talavera — Home">
        <span className="brand-mark">ET</span>
        <span className="brand-copy">EDGAR / TALAVERA</span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={copy.utility.menu}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <nav
        id="primary-navigation"
        className={menuOpen ? "site-nav is-open" : "site-nav"}
        aria-label="Primary navigation"
      >
        <a href="#profile" onClick={closeMenu}>{copy.nav.profile}</a>
        <a href="#capabilities" onClick={closeMenu}>{copy.nav.capabilities}</a>
        <a href="#work" onClick={closeMenu}>{copy.nav.work}</a>
        <a href="#contact" onClick={closeMenu}>{copy.nav.contact}</a>
      </nav>

      <div className="header-tools">
        <button
          className="tool-button language-button"
          type="button"
          onClick={onLanguageChange}
          aria-label={copy.utility.language}
        >
          <span className={language === "es" ? "is-active" : ""}>ES</span>
          <span>/</span>
          <span className={language === "en" ? "is-active" : ""}>EN</span>
        </button>
        <AmbientSound language={language} />
        <button
          className="tool-button theme-button"
          type="button"
          onClick={onThemeChange}
          aria-label={copy.utility.theme}
        >
          <span className="theme-orbit" aria-hidden="true"><i /></span>
        </button>
      </div>
    </header>
  );
}
