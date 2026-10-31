"use client";

import { useState } from "react";
import type { Language, PortfolioCopy } from "../../../../content/portfolio";
import { AmbientSound } from "../../../ambient-sound";
import styles from "./site-header.module.css";

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
    <header className={styles.header}>
      <a className={styles.brand} href="#top" aria-label="Edgar Talavera — Home">
        <span className={styles.brandMark}>ET</span>
        <span className={styles.brandCopy}>EDGAR / TALAVERA</span>
      </a>

      <button
        className={styles.menuToggle}
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
        className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
        aria-label="Primary navigation"
      >
        <a href="#profile" onClick={closeMenu}>{copy.nav.profile}</a>
        <a href="#capabilities" onClick={closeMenu}>{copy.nav.capabilities}</a>
        <a href="#work" onClick={closeMenu}>{copy.nav.work}</a>
        <a href="#contact" onClick={closeMenu}>{copy.nav.contact}</a>
      </nav>

      <div className={styles.tools}>
        <button
          className={`tool-button ${styles.languageButton}`}
          type="button"
          onClick={onLanguageChange}
          aria-label={copy.utility.language}
        >
          <span className={language === "es" ? styles.active : ""}>ES</span>
          <span>/</span>
          <span className={language === "en" ? styles.active : ""}>EN</span>
        </button>
        <AmbientSound language={language} />
        <button
          className={`tool-button ${styles.themeButton}`}
          type="button"
          onClick={onThemeChange}
          aria-label={copy.utility.theme}
        >
          <span className={styles.themeOrbit} aria-hidden="true"><i /></span>
        </button>
      </div>
    </header>
  );
}
