import type { RefObject } from "react";
import type { Language, PortfolioCopy } from "../../content/portfolio";
import { projectImages } from "../../content/portfolio";
import { KineticTerminal } from "../kinetic-terminal";

interface HeroProps {
  copy: PortfolioCopy;
}

export function Hero({ copy }: HeroProps) {
  return (
    <>
      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow"><span className="pulse" />{copy.hero.eyebrow}</p>
          <h1>
            <span>{copy.hero.lineOne}</span>
            <span className="outline-text">{copy.hero.lineTwo}</span>
            <span>{copy.hero.lineThree}</span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-intro">{copy.hero.intro}</p>
            <div className="hero-actions">
              <a className="button button-primary magnetic" href="#work">
                <span>{copy.hero.cta}</span><i aria-hidden="true">↘</i>
              </a>
              <a className="button button-ghost" href="#contact">{copy.hero.secondary}</a>
            </div>
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span>{copy.hero.scroll}</span>
          <i />
        </div>
        <span className="hero-coordinate coordinate-left">19.4326° N</span>
        <span className="hero-coordinate coordinate-right">99.1332° W</span>
      </section>

      <div className="status-strip" aria-label="Professional status">
        {copy.status.map((item, index) => (
          <span key={item}><i>{String(index + 1).padStart(2, "0")}</i>{item}</span>
        ))}
      </div>
    </>
  );
}

interface KineticStoryProps {
  copy: PortfolioCopy;
  language: Language;
  sectionRef: RefObject<HTMLElement | null>;
}

export function KineticStory({ copy, language, sectionRef }: KineticStoryProps) {
  return (
    <section className="kinetic-story" ref={sectionRef} aria-labelledby="kinetic-title">
      <div className="kinetic-sticky">
        <div className="kinetic-grid" aria-hidden="true" />
        <div className="kinetic-arc" aria-hidden="true"><i /><i /><i /></div>

        <div className="kinetic-heading">
          <span className="section-index">{copy.scene.index}</span>
          <h2 id="kinetic-title">
            <span>{copy.scene.lineOne}</span>
            <span className="outline-text">{copy.scene.lineTwo}</span>
          </h2>
        </div>

        <div className="kinetic-portal">
          <KineticTerminal language={language} />
        </div>

        <div className="kinetic-copy">
          <p>{copy.scene.body}</p>
          <a href="#capabilities">{copy.scene.cta}<span>↘</span></a>
        </div>

        <div className="kinetic-counter" aria-hidden="true">
          <span>01</span><i /><span>02</span>
        </div>
      </div>
    </section>
  );
}

export function AboutSection({ copy }: HeroProps) {
  return (
    <section className="section about" id="profile">
      <div className="section-index" data-reveal>{copy.about.index}</div>
      <div className="about-layout">
        <h2 data-reveal>{copy.about.title}</h2>
        <div className="about-copy" data-reveal>
          <p>{copy.about.body}</p>
          <blockquote>{copy.about.note}</blockquote>
          <div className="signature" aria-label="Edgar Talavera">
            <span>EDGAR</span><span>TALAVERA</span>
          </div>
        </div>
      </div>
    </section>
  );
}

interface CapabilitiesSectionProps extends HeroProps {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLDivElement | null>;
}

export function CapabilitiesSection({
  copy,
  sectionRef,
  headingRef,
}: CapabilitiesSectionProps) {
  return (
    <section className="section capabilities" id="capabilities" ref={sectionRef}>
      <div className="capabilities-heading" ref={headingRef}>
        <div className="section-index" data-reveal>{copy.capabilities.index}</div>
        <h2 data-reveal>
          {copy.capabilities.title.split("\n").map((line) => <span key={line}>{line}</span>)}
        </h2>
        <p data-reveal>{copy.capabilities.intro}</p>
      </div>

      <div className="capability-list">
        {copy.capabilities.items.map((item) => (
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
  );
}

interface ProjectsSectionProps extends HeroProps {
  language: Language;
  sectionRef: RefObject<HTMLElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
}

export function ProjectsSection({
  copy,
  language,
  sectionRef,
  trackRef,
}: ProjectsSectionProps) {
  return (
    <section className="projects" id="work" ref={sectionRef}>
      <div className="projects-sticky">
        <div className="projects-intro">
          <div className="section-index">{copy.projects.index}</div>
          <h2>{copy.projects.title}</h2>
          <div className="projects-progress" aria-hidden="true"><i /></div>
        </div>
        <div className="project-track" ref={trackRef}>
          {copy.projects.list.map((project) => {
            const image = projectImages[project.number];

            return (
              <article className={`project-card tone-${project.tone}`} key={project.number}>
                <div
                  className={`project-visual${image ? " has-image" : ""}`}
                  aria-hidden={image ? undefined : true}
                >
                  <span className="project-scan" aria-hidden="true" />
                  <div className="project-mesh" aria-hidden="true" />
                  {image && (
                    <div className="project-image-frame">
                      <img
                        className="project-image"
                        src={image.src}
                        width={image.width}
                        height={image.height}
                        style={{ objectPosition: image.position }}
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
                    <a href={project.live} target="_blank" rel="noreferrer">
                      {copy.projects.view} <span>↗</span>
                    </a>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer">
                        {copy.projects.code} <span>↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
          <div className="project-end" aria-hidden="true"><span>ET</span><i /></div>
        </div>
      </div>
    </section>
  );
}

export function StackSection({ copy }: HeroProps) {
  return (
    <section className="section stack-section">
      <div className="section-index" data-reveal>{copy.stack.index}</div>
      <div className="stack-heading">
        <h2 data-reveal>{copy.stack.title}</h2>
        <span className="stack-radar" aria-hidden="true"><i /><b /></span>
      </div>
      <div className="stack-list">
        {copy.stack.groups.map((group, index) => (
          <div className="stack-row" data-reveal key={group.label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{group.label}</h3>
            <p>{group.items}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ContactSection({ copy }: HeroProps) {
  return (
    <section className="contact" id="contact">
      <div className="contact-noise" aria-hidden="true" />
      <div className="section-index" data-reveal>{copy.contact.index}</div>
      <div className="contact-layout">
        <div>
          <h2 data-reveal>{copy.contact.title}<span>{copy.contact.accent}</span></h2>
          <p className="contact-body" data-reveal>{copy.contact.body}</p>
        </div>
        <div className="contact-action" data-reveal>
          <a className="email-link" href="mailto:edgar.developer.talavera77@gmail.com">
            <span>{copy.contact.email}</span><i>↗</i>
          </a>
          <small>edgar.developer.talavera77@gmail.com</small>
        </div>
      </div>
      <div className="contact-footer">
        <p><span className="pulse" />{copy.contact.availability}</p>
        <div className="social-links">
          <span>{copy.contact.social}</span>
          <a href="https://linkedin.com/in/devtaed/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="https://github.com/eduardo-talavera" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://twitter.com/ed_talavera" target="_blank" rel="noreferrer">X ↗</a>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ copy }: HeroProps) {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()}</span>
      <span>{copy.footer}</span>
      <a href="#top">TOP ↑</a>
    </footer>
  );
}
