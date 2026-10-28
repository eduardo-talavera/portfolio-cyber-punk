"use client";

import { useEffect, useRef, useState } from "react";
import { AmbientSound } from "../components/ambient-sound";
import { KineticTerminal } from "../components/kinetic-terminal";
import { SignalField } from "../components/signal-field";

const content = {
  es: {
    nav: { profile: "Perfil", capabilities: "Enfoque", work: "Proyectos", contact: "Contacto" },
    utility: { language: "Cambiar a inglés", theme: "Cambiar tema", menu: "Abrir navegación" },
    hero: {
      eyebrow: "Ingeniero de software · IA · SRE",
      lineOne: "Construyo software",
      lineTwo: "que aprende, escala",
      lineThree: "y permanece estable.",
      intro: "Soy Edgar Talavera. Transformo problemas complejos en productos claros, sistemas confiables y experiencias web de alto rendimiento.",
      cta: "Explorar proyectos",
      secondary: "Hablemos",
      scroll: "Scroll para explorar",
    },
    status: ["México · Disponible remoto", "Español + English", "Producto · IA · Cloud"],
    scene: {
      index: "00 / SISTEMA EN MOVIMIENTO",
      lineOne: "Ideas audaces.",
      lineTwo: "Sistemas reales.",
      body: "Conecto producto, inteligencia y operación para convertir complejidad técnica en experiencias que se sienten simples.",
      cta: "Ver mi enfoque",
      cardLabel: "Arquitectura viva",
      cardStatus: "Sistema estable",
    },
    about: {
      index: "01 / PERFIL",
      title: "Ingeniería con contexto de producto.",
      body: "Desarrollo aplicaciones web escalables con React, Vue, TypeScript y Node.js. He trabajado en soluciones para fintech, educación y e-commerce, conectando arquitectura, APIs, datos, seguridad y despliegue para resolver necesidades reales del negocio.",
      note: "Mi criterio: una solución valiosa debe ser fácil de usar, observable en producción y sostenible para el equipo que la mantiene.",
    },
    capabilities: {
      index: "02 / ENFOQUE",
      title: "Tres disciplinas.\nUn mismo sistema.",
      intro: "Combino desarrollo de producto, inteligencia aplicada y confiabilidad para reducir la distancia entre una idea y un sistema que funciona en producción.",
      items: [
        {
          number: "01",
          title: "Product Engineering",
          body: "Interfaces rápidas, accesibles y mantenibles; servicios y APIs diseñados alrededor del dominio.",
          tags: ["React / Next.js", "TypeScript", "Node.js", "REST / GraphQL"],
        },
        {
          number: "02",
          title: "Applied AI",
          body: "Experiencias de producto con modelos, automatización y flujos de datos medibles, evaluables y útiles.",
          tags: ["LLM integration", "Automation", "Evaluation", "Data workflows"],
        },
        {
          number: "03",
          title: "Reliability / SRE",
          body: "Entrega continua, infraestructura reproducible y observabilidad para operar con confianza.",
          tags: ["AWS", "Docker", "CI/CD", "Performance"],
        },
      ],
    },
    projects: {
      index: "03 / TRABAJO SELECCIONADO",
      title: "Proyectos diseñados para funcionar.",
      view: "Ver proyecto",
      code: "Código",
      list: [
        {
          number: "01",
          title: "Tickets App",
          type: "Product Engineering",
          description: "Plataforma de gestión y seguimiento de tickets de soporte con una experiencia clara para organizar incidencias.",
          stack: "React · TypeScript · Node.js",
          live: "https://tickets-app-by-eduardo-talavera.vercel.app/issues",
          github: "https://github.com/eduardo-talavera/issues-app-frontend",
          tone: "lime",
        },
        {
          number: "02",
          title: "Tropix UI",
          type: "Design Systems",
          description: "Sistema de diseño y librería de componentes para construir interfaces consistentes y acelerar equipos React.",
          stack: "React · TypeScript · UI Architecture",
          live: "https://tropix-ui-docs.vercel.app/",
          github: "https://github.com/eduardo-talavera/tropix-ui",
          tone: "cyan",
        },
        {
          number: "03",
          title: "Twitter Clone",
          type: "Realtime Product",
          description: "Experiencia social inspirada en Twitter, con autenticación, publicaciones y persistencia en tiempo real.",
          stack: "React · Firebase · Realtime Data",
          live: "https://twitter-clone-3e2df.web.app/",
          github: null,
          tone: "magenta",
        },
        {
          number: "04",
          title: "IP Tracker",
          type: "Data Visualization",
          description: "Localizador de direcciones IP que convierte datos de geolocalización en una interfaz cartográfica inmediata.",
          stack: "JavaScript · API · Maps",
          live: "https://ip-tracker64.netlify.app/",
          github: null,
          tone: "violet",
        },
      ],
    },
    stack: {
      index: "04 / SISTEMA",
      title: "Herramientas que uso para mover ideas a producción.",
      groups: [
        { label: "Interfaces", items: "React, Next.js, Vue, TypeScript, Tailwind, CSS, Design Systems" },
        { label: "Servicios y datos", items: "Node.js, Express, GraphQL, REST, PostgreSQL, MongoDB, Prisma, Firebase" },
        { label: "Plataforma", items: "AWS, Docker, CI/CD, Vercel, Linux, Bash, GitHub Actions" },
        { label: "Calidad", items: "Jest, Vitest, Testing Library, observabilidad, performance y seguridad" },
      ],
    },
    contact: {
      index: "05 / CONTACTO",
      title: "¿Tienes un reto complejo?",
      accent: "Construyámoslo bien.",
      body: "Estoy abierto a conversar sobre posiciones de Software Engineering, Applied AI y SRE, así como proyectos donde confiabilidad y producto importen por igual.",
      email: "Enviar un correo",
      social: "O encuéntrame en",
      availability: "Disponible para oportunidades remotas y colaboraciones seleccionadas.",
    },
    footer: "Diseñado y desarrollado por Edgar Talavera",
  },
  en: {
    nav: { profile: "Profile", capabilities: "Focus", work: "Work", contact: "Contact" },
    utility: { language: "Switch to Spanish", theme: "Switch theme", menu: "Open navigation" },
    hero: {
      eyebrow: "Software · AI · SRE Engineer",
      lineOne: "I build software",
      lineTwo: "that learns, scales",
      lineThree: "and stays reliable.",
      intro: "I’m Edgar Talavera. I turn complex problems into clear products, reliable systems and high-performance web experiences.",
      cta: "Explore projects",
      secondary: "Let’s talk",
      scroll: "Scroll to explore",
    },
    status: ["Mexico · Remote-ready", "Español + English", "Product · AI · Cloud"],
    scene: {
      index: "00 / SYSTEM IN MOTION",
      lineOne: "Bold ideas.",
      lineTwo: "Real systems.",
      body: "I connect product, intelligence and operations to turn technical complexity into experiences that feel simple.",
      cta: "See my focus",
      cardLabel: "Living architecture",
      cardStatus: "System stable",
    },
    about: {
      index: "01 / PROFILE",
      title: "Engineering with product context.",
      body: "I build scalable web applications with React, Vue, TypeScript and Node.js. I have worked on fintech, education and e-commerce solutions, connecting architecture, APIs, data, security and delivery to solve real business needs.",
      note: "My standard: a valuable solution must be easy to use, observable in production and sustainable for the team maintaining it.",
    },
    capabilities: {
      index: "02 / FOCUS",
      title: "Three disciplines.\nOne connected system.",
      intro: "I combine product development, applied intelligence and reliability to shorten the distance between an idea and a system that works in production.",
      items: [
        {
          number: "01",
          title: "Product Engineering",
          body: "Fast, accessible and maintainable interfaces; services and APIs designed around the domain.",
          tags: ["React / Next.js", "TypeScript", "Node.js", "REST / GraphQL"],
        },
        {
          number: "02",
          title: "Applied AI",
          body: "Product experiences powered by models, automation and measurable, testable and useful data flows.",
          tags: ["LLM integration", "Automation", "Evaluation", "Data workflows"],
        },
        {
          number: "03",
          title: "Reliability / SRE",
          body: "Continuous delivery, reproducible infrastructure and observability to operate with confidence.",
          tags: ["AWS", "Docker", "CI/CD", "Performance"],
        },
      ],
    },
    projects: {
      index: "03 / SELECTED WORK",
      title: "Projects designed to work.",
      view: "View project",
      code: "Code",
      list: [
        {
          number: "01",
          title: "Tickets App",
          type: "Product Engineering",
          description: "A support ticket management and tracking platform with a clear experience for organizing issues.",
          stack: "React · TypeScript · Node.js",
          live: "https://tickets-app-by-eduardo-talavera.vercel.app/issues",
          github: "https://github.com/eduardo-talavera/issues-app-frontend",
          tone: "lime",
        },
        {
          number: "02",
          title: "Tropix UI",
          type: "Design Systems",
          description: "A design system and component library for consistent interfaces and faster React teams.",
          stack: "React · TypeScript · UI Architecture",
          live: "https://tropix-ui-docs.vercel.app/",
          github: "https://github.com/eduardo-talavera/tropix-ui",
          tone: "cyan",
        },
        {
          number: "03",
          title: "Twitter Clone",
          type: "Realtime Product",
          description: "A Twitter-inspired social experience with authentication, publishing and real-time persistence.",
          stack: "React · Firebase · Realtime Data",
          live: "https://twitter-clone-3e2df.web.app/",
          github: null,
          tone: "magenta",
        },
        {
          number: "04",
          title: "IP Tracker",
          type: "Data Visualization",
          description: "An IP address locator that turns geolocation data into an immediate map interface.",
          stack: "JavaScript · API · Maps",
          live: "https://ip-tracker64.netlify.app/",
          github: null,
          tone: "violet",
        },
      ],
    },
    stack: {
      index: "04 / SYSTEM",
      title: "Tools I use to move ideas into production.",
      groups: [
        { label: "Interfaces", items: "React, Next.js, Vue, TypeScript, Tailwind, CSS, Design Systems" },
        { label: "Services & data", items: "Node.js, Express, GraphQL, REST, PostgreSQL, MongoDB, Prisma, Firebase" },
        { label: "Platform", items: "AWS, Docker, CI/CD, Vercel, Linux, Bash, GitHub Actions" },
        { label: "Quality", items: "Jest, Vitest, Testing Library, observability, performance and security" },
      ],
    },
    contact: {
      index: "05 / CONTACT",
      title: "Have a complex challenge?",
      accent: "Let’s build it right.",
      body: "I’m open to Software Engineering, Applied AI and SRE roles, as well as projects where reliability and product matter equally.",
      email: "Send an email",
      social: "Or find me on",
      availability: "Available for remote opportunities and selected collaborations.",
    },
    footer: "Designed and developed by Edgar Talavera",
  },
} as const;

type Language = keyof typeof content;
type Theme = "dark" | "light";

const projectImages: Record<string, { src: string; width: number; height: number; position: string }> = {
  "01": {
    src: "/images/projects/tickets-app.webp",
    width: 2862,
    height: 1626,
    position: "50% 48%",
  },
  "02": {
    src: "/images/projects/tropix-ui.webp",
    width: 1885,
    height: 887,
    position: "50% 40%",
  },
  "04": {
    src: "/images/projects/ip-tracker.webp",
    width: 1506,
    height: 795,
    position: "50% 22%",
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const [theme, setTheme] = useState<Theme>("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const astronautRef = useRef<HTMLDivElement>(null);
  const spaceshipRef = useRef<HTMLDivElement>(null);
  const kineticSectionRef = useRef<HTMLElement>(null);
  const profileSectionRef = useRef<HTMLElement>(null);
  const capabilitiesSectionRef = useRef<HTMLElement>(null);
  const capabilitiesHeadingRef = useRef<HTMLDivElement>(null);
  const projectSectionRef = useRef<HTMLElement>(null);
  const projectTrackRef = useRef<HTMLDivElement>(null);
  const t = content[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language") as Language | null;
    const savedTheme = window.localStorage.getItem("portfolio-theme") as Theme | null;
    const preferredTheme: Theme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

    if (savedLanguage === "es" || savedLanguage === "en") setLanguage(savedLanguage);
    setTheme(savedTheme === "light" || savedTheme === "dark" ? savedTheme : preferredTheme);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    let animationFrame = 0;
    let cleanup = () => {};
    let cancelled = false;

    const startMotion = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const root = document.documentElement;
      const clamp = (value: number) => Math.min(1, Math.max(0, value));
      const smooth = (value: number) => value * value * (3 - 2 * value);
      const lerp = (start: number, end: number, progress: number) =>
        start + (end - start) * progress;
      const documentTop = (element: HTMLElement, scrollY: number) =>
        element.getBoundingClientRect().top + scrollY;

      root.dataset.reducedMotion = reduceMotion ? "true" : "false";

      const syncProjectHeight = () => {
        const section = projectSectionRef.current;
        const track = projectTrackRef.current;
        if (!section || !track || window.innerWidth <= 900 || reduceMotion) {
          section?.style.removeProperty("height");
          return;
        }

        const travel = Math.max(0, track.scrollWidth - window.innerWidth + 72);
        section.style.height = `${window.innerHeight + travel + window.innerHeight * 0.55}px`;
      };

      const updateKineticScene = (scrollY: number) => {
        const section = kineticSectionRef.current;
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
        const astronaut = astronautRef.current;
        const kineticSection = kineticSectionRef.current;
        if (!astronaut || !kineticSection) return;

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
        const mobile = window.innerWidth <= 700;
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
        const spaceship = spaceshipRef.current;
        const kineticSection = kineticSectionRef.current;
        const capabilitiesSection = capabilitiesSectionRef.current;
        const capabilitiesHeading = capabilitiesHeadingRef.current;
        if (!spaceship || !kineticSection || !capabilitiesSection || !capabilitiesHeading) return;

        const mobile = window.innerWidth <= 700;
        const width = spaceship.offsetWidth;
        const height = spaceship.offsetHeight;
        const viewportHeight = window.innerHeight;
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
        const section = projectSectionRef.current;
        const track = projectTrackRef.current;
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

      const onScroll = (event: { scroll: number; velocity: number }) => updateGlobalMotion(event.scroll, event.velocity);
      const onResize = () => {
        syncProjectHeight();
        updateGlobalMotion(lenis.scroll);
      };
      const raf = (time: number) => {
        lenis.raf(time);
        animationFrame = window.requestAnimationFrame(raf);
      };

      const resizeObserver = new ResizeObserver(onResize);
      if (projectTrackRef.current) resizeObserver.observe(projectTrackRef.current);

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

    startMotion();
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [language]);

  const switchLanguage = () => setLanguage((current) => (current === "es" ? "en" : "es"));
  const switchTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

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

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Edgar Talavera — Home">
          <span className="brand-mark">ET</span>
          <span className="brand-copy">EDGAR / TALAVERA</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={t.utility.menu}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">
          <a href="#profile" onClick={() => setMenuOpen(false)}>{t.nav.profile}</a>
          <a href="#capabilities" onClick={() => setMenuOpen(false)}>{t.nav.capabilities}</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>{t.nav.work}</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
        </nav>

        <div className="header-tools">
          <button className="tool-button language-button" type="button" onClick={switchLanguage} aria-label={t.utility.language}>
            <span className={language === "es" ? "is-active" : ""}>ES</span>
            <span>/</span>
            <span className={language === "en" ? "is-active" : ""}>EN</span>
          </button>
          <AmbientSound language={language} />
          <button className="tool-button theme-button" type="button" onClick={switchTheme} aria-label={t.utility.theme}>
            <span className="theme-orbit" aria-hidden="true"><i /></span>
          </button>
        </div>
      </header>

      <main id="main">
        <div ref={spaceshipRef} className="spaceship-float" aria-hidden="true">
          <div className="spaceship-float__drift">
            <img src="/images/spaceship.png" alt="" draggable={false} decoding="async" />
          </div>
        </div>

        <section className="hero" id="top">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orbit orbit-one" aria-hidden="true" />
          <div className="hero-orbit orbit-two" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow hero-eyebrow"><span className="pulse" />{t.hero.eyebrow}</p>
            <h1>
              <span>{t.hero.lineOne}</span>
              <span className="outline-text">{t.hero.lineTwo}</span>
              <span>{t.hero.lineThree}</span>
            </h1>
            <div className="hero-bottom">
              <p className="hero-intro">{t.hero.intro}</p>
              <div className="hero-actions">
                <a className="button button-primary magnetic" href="#work"><span>{t.hero.cta}</span><i aria-hidden="true">↘</i></a>
                <a className="button button-ghost" href="#contact">{t.hero.secondary}</a>
              </div>
            </div>
          </div>

          <div className="scroll-cue" aria-hidden="true">
            <span>{t.hero.scroll}</span>
            <i />
          </div>
          <span className="hero-coordinate coordinate-left">19.4326° N</span>
          <span className="hero-coordinate coordinate-right">99.1332° W</span>
        </section>

        <div className="status-strip" aria-label="Professional status">
          {t.status.map((item, index) => (
            <span key={item}><i>{String(index + 1).padStart(2, "0")}</i>{item}</span>
          ))}
        </div>

        <section className="kinetic-story" ref={kineticSectionRef} aria-labelledby="kinetic-title">
          <div className="kinetic-sticky">
            <div className="kinetic-grid" aria-hidden="true" />
            <div className="kinetic-arc" aria-hidden="true"><i /><i /><i /></div>

            <div className="kinetic-heading">
              <span className="section-index">{t.scene.index}</span>
              <h2 id="kinetic-title">
                <span>{t.scene.lineOne}</span>
                <span className="outline-text">{t.scene.lineTwo}</span>
              </h2>
            </div>

            <div className="kinetic-portal">
              <KineticTerminal language={language} />
            </div>

            <div className="kinetic-copy">
              <p>{t.scene.body}</p>
              <a href="#capabilities">{t.scene.cta}<span>↘</span></a>
            </div>

            <div className="kinetic-counter" aria-hidden="true">
              <span>01</span><i /><span>02</span>
            </div>
          </div>
        </section>

        <section className="section about" id="profile" ref={profileSectionRef}>
          <div className="section-index" data-reveal>{t.about.index}</div>
          <div className="about-layout">
            <h2 data-reveal>{t.about.title}</h2>
            <div className="about-copy" data-reveal>
              <p>{t.about.body}</p>
              <blockquote>{t.about.note}</blockquote>
              <div className="signature" aria-label="Edgar Talavera"><span>EDGAR</span><span>TALAVERA</span></div>
            </div>
          </div>
        </section>

        <section className="section capabilities" id="capabilities" ref={capabilitiesSectionRef}>
          <div className="capabilities-heading" ref={capabilitiesHeadingRef}>
            <div className="section-index" data-reveal>{t.capabilities.index}</div>
            <h2 data-reveal>{t.capabilities.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
            <p data-reveal>{t.capabilities.intro}</p>
          </div>

          <div className="capability-list">
            {t.capabilities.items.map((item) => (
              <article className="capability-card" data-reveal key={item.number}>
                <span className="card-number">{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
                <ul>
                  {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <span className="card-cross" aria-hidden="true">+</span>
              </article>
            ))}
          </div>
        </section>

        <section className="projects" id="work" ref={projectSectionRef}>
          <div className="projects-sticky">
            <div className="projects-intro">
              <div className="section-index">{t.projects.index}</div>
              <h2>{t.projects.title}</h2>
              <div className="projects-progress" aria-hidden="true"><i /></div>
            </div>
            <div className="project-track" ref={projectTrackRef}>
              {t.projects.list.map((project) => {
                const projectImage = projectImages[project.number];

                return (
                  <article className={`project-card tone-${project.tone}`} key={project.number}>
                    <div
                      className={`project-visual${projectImage ? " has-image" : ""}`}
                      aria-hidden={projectImage ? undefined : true}
                    >
                      <span className="project-scan" aria-hidden="true" />
                      <div className="project-mesh" aria-hidden="true" />
                      {projectImage && (
                        <div className="project-image-frame">
                          <img
                            className="project-image"
                            src={projectImage.src}
                            width={projectImage.width}
                            height={projectImage.height}
                            style={{ objectPosition: projectImage.position }}
                            alt={language === "es" ? `Vista previa de ${project.title}` : `${project.title} preview`}
                            loading="lazy"
                            decoding="async"
                          />
                          <span className="project-image-overlay" aria-hidden="true" />
                        </div>
                      )}
                      <span className="visual-code" aria-hidden="true">SYS/{project.number}</span>
                      <span className="visual-shape shape-a" aria-hidden="true" />
                      <span className="visual-shape shape-b" aria-hidden="true" />
                      <strong aria-hidden="true">{project.title.slice(0, 2).toUpperCase()}</strong>
                    </div>
                    <div className="project-content">
                      <div className="project-meta"><span>{project.number}</span><span>{project.type}</span></div>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <small>{project.stack}</small>
                      <div className="project-links">
                        <a href={project.live} target="_blank" rel="noreferrer">{t.projects.view} <span>↗</span></a>
                        {project.github && <a href={project.github} target="_blank" rel="noreferrer">{t.projects.code} <span>↗</span></a>}
                      </div>
                    </div>
                  </article>
                );
              })}
              <div className="project-end" aria-hidden="true"><span>ET</span><i /></div>
            </div>
          </div>
        </section>

        <section className="section stack-section">
          <div className="section-index" data-reveal>{t.stack.index}</div>
          <div className="stack-heading">
            <h2 data-reveal>{t.stack.title}</h2>
            <span className="stack-radar" aria-hidden="true"><i /><b /></span>
          </div>
          <div className="stack-list">
            {t.stack.groups.map((group, index) => (
              <div className="stack-row" data-reveal key={group.label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{group.label}</h3>
                <p>{group.items}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-noise" aria-hidden="true" />
          <div className="section-index" data-reveal>{t.contact.index}</div>
          <div className="contact-layout">
            <div>
              <h2 data-reveal>{t.contact.title}<span>{t.contact.accent}</span></h2>
              <p className="contact-body" data-reveal>{t.contact.body}</p>
            </div>
            <div className="contact-action" data-reveal>
              <a className="email-link" href="mailto:edgar.developer.talavera77@gmail.com">
                <span>{t.contact.email}</span><i>↗</i>
              </a>
              <small>edgar.developer.talavera77@gmail.com</small>
            </div>
          </div>
          <div className="contact-footer">
            <p><span className="pulse" />{t.contact.availability}</p>
            <div className="social-links">
              <span>{t.contact.social}</span>
              <a href="https://linkedin.com/in/devtaed/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="https://github.com/eduardo-talavera" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://twitter.com/ed_talavera" target="_blank" rel="noreferrer">X ↗</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()}</span>
        <span>{t.footer}</span>
        <a href="#top">TOP ↑</a>
      </footer>
    </>
  );
}
