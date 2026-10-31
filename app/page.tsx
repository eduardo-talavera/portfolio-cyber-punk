"use client";

import { useRef } from "react";
import {
  AboutSection,
  CapabilitiesSection,
  ContactSection,
  Hero,
  KineticStory,
  ProjectsSection,
  SiteFooter,
  StackSection,
} from "../components/portfolio/portfolio-content";
import { SiteHeader } from "../components/portfolio/site-header";
import { SignalField } from "../components/signal-field";
import { portfolioContent } from "../content/portfolio";
import { usePortfolioMotion } from "../hooks/use-portfolio-motion";
import { usePortfolioPreferences } from "../hooks/use-portfolio-preferences";
import { useRevealOnScroll } from "../hooks/use-reveal-on-scroll";

export default function Home() {
  const astronautRef = useRef<HTMLDivElement>(null);
  const spaceshipRef = useRef<HTMLDivElement>(null);
  const kineticSectionRef = useRef<HTMLElement>(null);
  const capabilitiesSectionRef = useRef<HTMLElement>(null);
  const capabilitiesHeadingRef = useRef<HTMLDivElement>(null);
  const projectSectionRef = useRef<HTMLElement>(null);
  const projectTrackRef = useRef<HTMLDivElement>(null);
  const { language, switchLanguage, switchTheme } = usePortfolioPreferences();
  const copy = portfolioContent[language];

  usePortfolioMotion({
    astronaut: astronautRef,
    spaceship: spaceshipRef,
    kineticSection: kineticSectionRef,
    capabilitiesSection: capabilitiesSectionRef,
    capabilitiesHeading: capabilitiesHeadingRef,
    projectSection: projectSectionRef,
    projectTrack: projectTrackRef,
  });
  useRevealOnScroll(language);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SignalField />
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div ref={astronautRef} className="astronaut-float" aria-hidden="true">
        <div className="astronaut-float__bob">
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
        <div ref={spaceshipRef} className="spaceship-float" aria-hidden="true">
          <div className="spaceship-float__drift">
            <img src="/images/spaceship.png" alt="" draggable={false} decoding="async" />
          </div>
        </div>

        <Hero copy={copy} />
        <KineticStory copy={copy} language={language} sectionRef={kineticSectionRef} />
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
