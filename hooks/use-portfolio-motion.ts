"use client";

import { useEffect, type RefObject } from "react";

interface PortfolioMotionRefs {
  astronaut: RefObject<HTMLDivElement | null>;
  spaceship: RefObject<HTMLDivElement | null>;
  kineticSection: RefObject<HTMLElement | null>;
  capabilitiesSection: RefObject<HTMLElement | null>;
  capabilitiesHeading: RefObject<HTMLDivElement | null>;
  projectSection: RefObject<HTMLElement | null>;
  projectTrack: RefObject<HTMLDivElement | null>;
}

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (value: number) => value * value * (3 - 2 * value);
const lerp = (start: number, end: number, progress: number) =>
  start + (end - start) * progress;
const documentTop = (element: HTMLElement, scrollY: number) =>
  element.getBoundingClientRect().top + scrollY;

export function usePortfolioMotion(refs: PortfolioMotionRefs) {
  useEffect(() => {
    let animationFrame = 0;
    let cleanup = () => {};
    let cancelled = false;

    const startMotion = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const root = document.documentElement;

      root.dataset.reducedMotion = reduceMotion ? "true" : "false";

      const syncProjectHeight = () => {
        const section = refs.projectSection.current;
        const track = refs.projectTrack.current;
        if (!section || !track || window.innerWidth <= 900 || reduceMotion) {
          section?.style.removeProperty("height");
          return;
        }

        const travel = Math.max(0, track.scrollWidth - window.innerWidth + 72);
        section.style.height = `${window.innerHeight + travel + window.innerHeight * 0.55}px`;
      };

      const updateKineticScene = (scrollY: number) => {
        const section = refs.kineticSection.current;
        if (!section) return;

        if (reduceMotion) {
          section.style.setProperty("--scene-progress", "1");
          section.style.setProperty("--scene-reveal", "1");
          section.style.setProperty("--scene-settle", "1");
          section.style.setProperty("--portal-x", "0px");
          section.style.setProperty("--portal-y", "0px");
          section.style.setProperty("--portal-scale", "1");
          section.style.setProperty("--portal-tilt", "0deg");
          section.style.setProperty("--title-x", "0px");
          section.style.setProperty("--copy-x", "0px");
          section.style.setProperty("--arc-rotation", "28deg");
          return;
        }

        const range = Math.max(1, section.offsetHeight - window.innerHeight);
        const rawProgress = clamp((scrollY - section.offsetTop) / range);
        const progress = smooth(rawProgress);
        const reveal = smooth(clamp((rawProgress - 0.12) / 0.56));
        const settle = smooth(clamp((rawProgress - 0.58) / 0.42));
        const mobile = window.innerWidth <= 700;

        section.style.setProperty("--scene-progress", progress.toFixed(4));
        section.style.setProperty("--scene-reveal", reveal.toFixed(4));
        section.style.setProperty("--scene-settle", settle.toFixed(4));
        section.style.setProperty("--portal-x", `${mobile ? 0 : -progress * window.innerWidth * 0.23}px`);
        section.style.setProperty("--portal-y", `${progress * window.innerHeight * (mobile ? 0.25 : 0.2)}px`);
        section.style.setProperty("--portal-scale", `${1 - progress * (mobile ? 0.3 : 0.42)}`);
        section.style.setProperty("--portal-tilt", `${progress * -4}deg`);
        section.style.setProperty("--title-x", `${(1 - reveal) * -190}px`);
        section.style.setProperty("--copy-x", `${(1 - reveal) * 150}px`);
        section.style.setProperty("--arc-rotation", `${-105 + reveal * 138}deg`);
      };

      const updateAstronaut = (scrollY: number, velocity = 0) => {
        const astronaut = refs.astronaut.current;
        const kineticSection = refs.kineticSection.current;
        if (!astronaut || !kineticSection) return;

        const mobile = window.innerWidth <= 700;
        if (mobile) {
          const x = window.innerWidth - astronaut.offsetWidth - 18;
          const y = Math.max(104, window.innerHeight * 0.12);

          astronaut.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(-10deg)`;
          astronaut.style.opacity = "0.78";
          return;
        }

        const kineticTop = documentTop(kineticSection, scrollY);
        const fadeDistance = Math.max(180, window.innerHeight * 0.32);
        const sectionVisibility =
          1 - smooth(clamp((scrollY - (kineticTop - fadeDistance)) / fadeDistance));

        if (reduceMotion) {
          astronaut.style.opacity = scrollY < kineticTop ? "0.62" : "0";
          return;
        }

        const pageRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const progress = clamp(scrollY / pageRange);
        const width = astronaut.offsetWidth;
        const phase = progress * Math.PI * 4.2;
        const inwardDrift =
          (0.5 + Math.sin(phase) * 0.5) * window.innerWidth * (mobile ? 0.035 : 0.11);
        const x = window.innerWidth - width - (mobile ? 10 : window.innerWidth * 0.035) - inwardDrift;
        const viewportY =
          window.innerHeight * (0.1 + progress * (mobile ? 0.47 : 0.62)) +
          Math.sin(phase * 1.55) * (mobile ? 7 : 16);
        const documentY = scrollY + viewportY;
        const velocityTilt = Math.max(-5, Math.min(5, velocity * 0.12));
        const rotation = -10 + Math.sin(phase) * 11 + velocityTilt;
        const scale = 0.96 + Math.sin(phase * 0.72) * 0.035;
        const opacity = (mobile ? 0.62 : 0.84) * sectionVisibility;

        astronaut.style.transform = `translate3d(${x}px, ${documentY}px, 0) rotate(${rotation}deg) scale(${scale})`;
        astronaut.style.opacity = opacity.toFixed(3);
      };

      const updateSpaceship = (scrollY: number, velocity = 0) => {
        const spaceship = refs.spaceship.current;
        const kineticSection = refs.kineticSection.current;
        const capabilitiesSection = refs.capabilitiesSection.current;
        const capabilitiesHeading = refs.capabilitiesHeading.current;
        if (!spaceship || !kineticSection || !capabilitiesSection || !capabilitiesHeading) return;

        const mobile = window.innerWidth <= 700;
        const width = spaceship.offsetWidth;
        const height = spaceship.offsetHeight;
        const viewportHeight = window.innerHeight;

        if (mobile) {
          const x = Math.max(18, window.innerWidth * 0.045);
          const y = Math.max(544, viewportHeight * 0.82);

          spaceship.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(8deg)`;
          spaceship.style.opacity = "1";
          return;
        }

        const kineticTop = documentTop(kineticSection, scrollY);
        const capabilitiesTop = documentTop(capabilitiesSection, scrollY);
        const headingRect = capabilitiesHeading.getBoundingClientRect();
        const headingTop = headingRect.top + scrollY;
        const entryStart = capabilitiesTop - viewportHeight * 0.82;
        const entryEnd = capabilitiesTop - viewportHeight * 0.12;
        const heroX = mobile ? 4 : window.innerWidth * 0.04;
        const hiddenRightX = window.innerWidth + width * 0.18;
        const headingInset = mobile ? 8 : Math.max(20, headingRect.width * 0.04);
        const restingX = Math.min(
          headingRect.left + headingInset,
          Math.max(headingRect.left, headingRect.right - width - headingInset),
        );
        const restingDocumentY =
          headingTop + Math.max(0, headingRect.height - height - (mobile ? 18 : 28));
        const baseOpacity = 1;
        const velocityTilt = Math.max(-3, Math.min(3, velocity * -0.08));
        let x = hiddenRightX;
        let documentY = scrollY + viewportHeight * 0.72;
        let rotation = -12;
        let scale = 0.96;
        let facing = 1;
        let opacity = 0;

        if (reduceMotion) {
          const inHero = scrollY < kineticTop;
          const inCapabilities = scrollY >= entryStart;
          x = inCapabilities ? restingX : heroX;
          documentY = inCapabilities
            ? restingDocumentY
            : scrollY + viewportHeight * 0.74;
          rotation = inCapabilities ? -4 : 8;
          facing = inCapabilities ? -1 : 1;
          opacity = inHero || inCapabilities ? baseOpacity : 0;
        } else if (scrollY < kineticTop) {
          const rawDeparture = clamp(scrollY / Math.max(1, kineticTop));
          const departure = smooth(rawDeparture);
          x = lerp(heroX, hiddenRightX, departure);
          documentY =
            scrollY +
            lerp(viewportHeight * 0.74, viewportHeight * 0.58, departure) -
            Math.sin(departure * Math.PI) * viewportHeight * (mobile ? 0.09 : 0.2);
          rotation = lerp(8, 20, departure) + velocityTilt;
          scale = lerp(1, 0.9, departure);
          opacity =
            baseOpacity *
            (1 - smooth(clamp((rawDeparture - 0.62) / 0.38)));
        } else if (scrollY >= entryStart) {
          const rawEntry = clamp((scrollY - entryStart) / Math.max(1, entryEnd - entryStart));
          const entry = smooth(rawEntry);
          x = lerp(hiddenRightX, restingX, entry);
          documentY =
            lerp(scrollY + viewportHeight * 0.78, restingDocumentY, entry) -
            Math.sin(entry * Math.PI) * viewportHeight * (mobile ? 0.1 : 0.2);
          rotation = lerp(-18, 4, entry) + velocityTilt;
          scale = lerp(0.9, 1, entry);
          facing = -1;
          opacity = baseOpacity * smooth(clamp(rawEntry / 0.3));
        }

        spaceship.style.transform =
          `translate3d(${x}px, ${documentY}px, 0) rotate(${rotation}deg) scale3d(${facing * scale}, ${scale}, 1)`;
        spaceship.style.opacity = opacity.toFixed(3);
      };

      const updateProjects = (scrollY: number) => {
        const section = refs.projectSection.current;
        const track = refs.projectTrack.current;
        if (!section || !track || window.innerWidth <= 900 || reduceMotion) {
          if (track) track.style.transform = "none";
          return;
        }

        const sectionStart = section.offsetTop;
        const scrollRange = Math.max(1, section.offsetHeight - window.innerHeight);
        const progress = clamp((scrollY - sectionStart) / scrollRange);
        const travel = Math.max(0, track.scrollWidth - window.innerWidth + 72);
        track.style.transform = `translate3d(${-progress * travel}px, 0, 0)`;
        root.style.setProperty("--project-progress", progress.toString());
      };

      const updateGlobalMotion = (scrollY: number, velocity = 0) => {
        root.style.setProperty("--scroll-y", `${scrollY}px`);
        root.style.setProperty("--scroll-velocity", Math.min(Math.abs(velocity), 30).toString());
        updateKineticScene(scrollY);
        updateAstronaut(scrollY, velocity);
        updateSpaceship(scrollY, velocity);
        updateProjects(scrollY);
      };

      if (reduceMotion) {
        const onReducedScroll = () => updateGlobalMotion(window.scrollY);
        updateGlobalMotion(window.scrollY);
        window.addEventListener("scroll", onReducedScroll, { passive: true });
        cleanup = () => {
          window.removeEventListener("scroll", onReducedScroll);
          delete root.dataset.reducedMotion;
        };
        return;
      }

      const lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        allowNestedScroll: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.1,
      });

      const onScroll = (event: { scroll: number; velocity: number }) =>
        updateGlobalMotion(event.scroll, event.velocity);
      const onResize = () => {
        syncProjectHeight();
        updateGlobalMotion(lenis.scroll);
      };
      const raf = (time: number) => {
        lenis.raf(time);
        animationFrame = window.requestAnimationFrame(raf);
      };

      const resizeObserver = new ResizeObserver(onResize);
      if (refs.projectTrack.current) resizeObserver.observe(refs.projectTrack.current);

      lenis.on("scroll", onScroll);
      window.addEventListener("resize", onResize);
      syncProjectHeight();
      updateGlobalMotion(window.scrollY);
      animationFrame = window.requestAnimationFrame(raf);

      cleanup = () => {
        window.cancelAnimationFrame(animationFrame);
        window.removeEventListener("resize", onResize);
        resizeObserver.disconnect();
        lenis.destroy();
        delete root.dataset.reducedMotion;
      };
    };

    void startMotion();
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [
    refs.astronaut,
    refs.capabilitiesHeading,
    refs.capabilitiesSection,
    refs.kineticSection,
    refs.projectSection,
    refs.projectTrack,
    refs.spaceship,
  ]);
}
