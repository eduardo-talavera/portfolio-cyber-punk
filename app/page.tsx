"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SiteFooter, SiteHeader } from "../components/portfolio/layout";
import {
  AboutSection,
  CapabilitiesSection,
  ContactSection,
  Hero,
  KineticStory,
  ProjectsSection,
  StackSection,
} from "../components/portfolio/sections";
import { SignalField } from "../components/signal-field";
import {
  DEFAULT_KINETIC_TRANSITION,
  KINETIC_TRANSITION_STORAGE_KEY,
  isKineticTransition,
  type KineticTransition,
} from "../content/motion";
import { portfolioContent } from "../content/portfolio";
import { usePortfolioMotion } from "../hooks/use-portfolio-motion";
import { usePortfolioPreferences } from "../hooks/use-portfolio-preferences";
import { useRevealOnScroll } from "../hooks/use-reveal-on-scroll";
import styles from "./page.module.css";

export default function Home() {
  const astronautRef = useRef<HTMLDivElement>(null);
  const spaceshipRef = useRef<HTMLDivElement>(null);
  const kineticSectionRef = useRef<HTMLElement>(null);
  const capabilitiesSectionRef = useRef<HTMLElement>(null);
  const capabilitiesHeadingRef = useRef<HTMLDivElement>(null);
  const projectSectionRef = useRef<HTMLElement>(null);
  const projectTrackRef = useRef<HTMLDivElement>(null);
  const [kineticTransition, setKineticTransition] = useState<KineticTransition>(
    DEFAULT_KINETIC_TRANSITION,
  );
  const { language, switchLanguage, switchTheme } = usePortfolioPreferences();
  const copy = portfolioContent[language];

  useEffect(() => {
    const queryTransition = new URLSearchParams(window.location.search).get("motion");
    const storedTransition = window.localStorage.getItem(KINETIC_TRANSITION_STORAGE_KEY);
    const selectedTransition = isKineticTransition(queryTransition)
      ? queryTransition
      : isKineticTransition(storedTransition)
        ? storedTransition
        : DEFAULT_KINETIC_TRANSITION;

    setKineticTransition(selectedTransition);
  }, []);

  const selectKineticTransition = useCallback((transition: KineticTransition) => {
    setKineticTransition(transition);
    window.localStorage.setItem(KINETIC_TRANSITION_STORAGE_KEY, transition);
  }, []);

  usePortfolioMotion(
    {
      astronaut: astronautRef,
      spaceship: spaceshipRef,
      kineticSection: kineticSectionRef,
      capabilitiesSection: capabilitiesSectionRef,
      capabilitiesHeading: capabilitiesHeadingRef,
      projectSection: projectSectionRef,
      projectTrack: projectTrackRef,
    },
    kineticTransition,
  );
  useRevealOnScroll(language);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SignalField />
      <div className={`${styles.ambient} ${styles.ambientOne}`} aria-hidden="true" />
      <div className={`${styles.ambient} ${styles.ambientTwo}`} aria-hidden="true" />
      <div ref={astronautRef} className={styles.astronaut} aria-hidden="true">
        <div className={styles.astronautBob}>
          <img src="/images/astronaut.png" alt="" draggable={false} decoding="async" />
        </div>
      </div>

      <SiteHeader
        language={language}
        copy={copy}
        onLanguageChange={switchLanguage}
        onThemeChange={switchTheme}
      />

      <main id="main">
        <div ref={spaceshipRef} className={styles.spaceship} aria-hidden="true">
          <div className={styles.spaceshipDrift}>
            <img src="/images/spaceship.png" alt="" draggable={false} decoding="async" />
          </div>
        </div>

        <Hero copy={copy} />
        <KineticStory
          copy={copy}
          language={language}
          sectionRef={kineticSectionRef}
          transition={kineticTransition}
          onTransitionChange={selectKineticTransition}
        />
        <AboutSection copy={copy} />
        <CapabilitiesSection
          copy={copy}
          sectionRef={capabilitiesSectionRef}
          headingRef={capabilitiesHeadingRef}
        />
        <ProjectsSection
          copy={copy}
          language={language}
          sectionRef={projectSectionRef}
          trackRef={projectTrackRef}
        />
        <StackSection copy={copy} />
        <ContactSection copy={copy} />
      </main>

      <SiteFooter copy={copy} />
    </>
  );
}
