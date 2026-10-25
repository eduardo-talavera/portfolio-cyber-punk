"use client";

import { useEffect } from "react";
import MonolithScene from "../components/monolith-scene";

const projects = [
  {
    number: "01",
    title: "Sistema Orbital",
    type: "Identidad digital · 2026",
    description:
      "Un lenguaje visual flexible que convierte datos, tipografía y movimiento en una experiencia de marca viva.",
    className: "project-visual project-visual--orbital",
  },
  {
    number: "02",
    title: "Materia",
    type: "Dirección de arte · 2026",
    description:
      "Una colección de superficies digitales donde el color, la luz y la textura construyen una presencia táctil.",
    className: "project-visual project-visual--matter",
  },
  {
    number: "03",
    title: "Umbral",
    type: "Experiencia web · 2026",
    description:
      "Narrativa interactiva que transforma el desplazamiento en un recorrido preciso, envolvente y memorable.",
    className: "project-visual project-visual--threshold",
  },
];

export default function Home() {
  useEffect(() => {
    let cleanup = () => {};

    async function startMotion() {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { y: reduceMotion ? 0 : 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: reduceMotion ? 0.01 : 1.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 86%",
                once: true,
              },
            },
          );
        });

        if (!reduceMotion) {
          gsap.to(".hero-word--one", {
            xPercent: -10,
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
          gsap.to(".hero-word--two", {
            xPercent: 13,
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      });

      if (!reduceMotion) {
        const { default: Lenis } = await import("lenis");
        const lenis = new Lenis({
          lerp: 0.085,
          smoothWheel: true,
          wheelMultiplier: 0.9,
        });
        let frame = 0;
        const raf = (time: number) => {
          lenis.raf(time);
          frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);
        lenis.on("scroll", ScrollTrigger.update);

        cleanup = () => {
          cancelAnimationFrame(frame);
          lenis.destroy();
          context.revert();
        };
      } else {
        cleanup = () => context.revert();
      }
    }

    void startMotion();
    return () => cleanup();
  }, []);

  return (
    <main>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <div className="scene-shell" aria-hidden="true">
        <MonolithScene />
      </div>
      <div className="grain" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          TN<span>®</span>
        </a>
        <p className="availability">
          <span /> Disponible para proyectos · 2026
        </p>
        <nav aria-label="Navegación principal">
          <a href="#trabajo">Trabajo</a>
          <a href="#perfil">Perfil</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-kicker">Portafolio / Edición 01</div>
        <h1 aria-label="Hago ideas tangibles">
          <span className="hero-word hero-word--one">Hago</span>
          <span className="hero-word hero-word--two">ideas</span>
          <span className="hero-word hero-word--three">tangibles.</span>
        </h1>
        <div className="hero-meta">
          <p>
            Diseño digital, dirección visual
            <br />y desarrollo creativo.
          </p>
          <a className="round-link" href="#trabajo" aria-label="Ver proyectos">
            <span>Explorar</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4v15m0 0 6-6m-6 6-6-6" />
            </svg>
          </a>
        </div>
      </section>

      <div id="contenido">
        <section className="manifesto section-pad" id="perfil">
          <div className="section-label" data-reveal>
            <span>01</span>
            <p>Una práctica entre forma y función</p>
          </div>
          <div className="manifesto-copy" data-reveal>
            <p className="eyebrow">Enfoque</p>
            <h2>
              Construyo identidades digitales que se sienten tan claras como
              inesperadas.
            </h2>
            <div className="manifesto-detail">
              <p>
                Traduzco ideas complejas en sistemas visuales precisos. Cada
                interacción tiene un propósito: orientar, provocar curiosidad y
                dejar una impresión duradera.
              </p>
              <ul aria-label="Servicios">
                <li>Dirección creativa</li>
                <li>Diseño de producto</li>
                <li>Desarrollo interactivo</li>
                <li>Motion y 3D</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="work section-pad" id="trabajo">
          <div className="work-heading" data-reveal>
            <p className="eyebrow">Trabajo seleccionado</p>
            <h2>Proyectos con pulso propio.</h2>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <article className="project-card" key={project.number} data-reveal>
                <div className={project.className} aria-hidden="true">
                  <div className="visual-grid" />
                  <div className="visual-object" />
                  <span>{project.number}</span>
                </div>
                <div className="project-info">
                  <div>
                    <p>{project.number}</p>
                    <h3>{project.title}</h3>
                  </div>
                  <div>
                    <p className="project-type">{project.type}</p>
                    <p>{project.description}</p>
                    <button type="button" aria-label={`Abrir ${project.title}`}>
                      Ver caso <span>↗</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="concept-note">
            Proyectos conceptuales de muestra — reemplázalos por tus casos reales.
          </p>
        </section>

        <section className="method section-pad">
          <div className="section-label" data-reveal>
            <span>02</span>
            <p>Cómo trabajo</p>
          </div>
          <div className="method-grid">
            {[
              ["01", "Descubrir", "Entender el contexto, la audiencia y la tensión que hace único al proyecto."],
              ["02", "Definir", "Convertir hallazgos en una dirección visual clara y un sistema que pueda crecer."],
              ["03", "Construir", "Diseñar, animar y desarrollar con atención obsesiva al ritmo y al detalle."],
            ].map(([number, title, copy]) => (
              <article key={number} data-reveal>
                <p>{number}</p>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contacto">
          <div className="contact-top" data-reveal>
            <p className="eyebrow">¿Tienes una idea en movimiento?</p>
            <p>Ciudad de México · Disponible globalmente</p>
          </div>
          <a className="contact-link" href="mailto:hola@tudominio.com" data-reveal>
            <span>Hablemos</span>
            <span>↗</span>
          </a>
          <footer>
            <p>© 2026 Tu Nombre</p>
            <div>
              <a href="#inicio">Instagram</a>
              <a href="#inicio">LinkedIn</a>
              <a href="#inicio">Behance</a>
            </div>
            <a href="#inicio">Volver arriba ↑</a>
          </footer>
        </section>
      </div>
    </main>
  );
}
