import type { RefObject } from "react";
import type { Language, PortfolioCopy, ProjectTone } from "../../../../content/portfolio";
import { projectImages } from "../../../../content/portfolio";
import styles from "./projects-section.module.css";

interface ProjectsSectionProps {
  copy: PortfolioCopy;
  language: Language;
  sectionRef: RefObject<HTMLElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
}

const toneClass: Record<ProjectTone, string> = {
  lime: styles.toneLime,
  cyan: styles.toneCyan,
  magenta: styles.toneMagenta,
  violet: styles.toneViolet,
};

export function ProjectsSection({ copy, language, sectionRef, trackRef }: ProjectsSectionProps) {
  return (
    <section className={styles.projects} id="work" ref={sectionRef}>
      <div className={styles.sticky}>
        <div className={styles.intro}>
          <div className="section-index">{copy.projects.index}</div>
          <h2 className="section-title">{copy.projects.title}</h2>
          <div className={styles.progress} aria-hidden="true"><i /></div>
        </div>
        <div className={styles.track} ref={trackRef}>
          {copy.projects.list.map((project) => {
            const image = projectImages[project.number];

            return (
              <article className={`${styles.card} ${toneClass[project.tone]}`} key={project.number}>
                <div
                  className={`${styles.visual} ${image ? styles.hasImage : ""}`}
                  aria-hidden={image ? undefined : true}
                >
                  <span className={styles.scan} aria-hidden="true" />
                  <div className={styles.mesh} aria-hidden="true" />
                  {image && (
                    <div className={styles.imageFrame}>
                      <img
                        className={styles.image}
                        src={image.src}
                        width={image.width}
                        height={image.height}
                        style={{ objectPosition: image.position }}
                        alt={language === "es" ? `Vista previa de ${project.title}` : `${project.title} preview`}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className={styles.imageOverlay} aria-hidden="true" />
                    </div>
                  )}
                  <span className={styles.visualCode} aria-hidden="true">SYS/{project.number}</span>
                  <span className={`${styles.visualShape} ${styles.shapeA}`} aria-hidden="true" />
                  <span className={`${styles.visualShape} ${styles.shapeB}`} aria-hidden="true" />
                  <strong aria-hidden="true">{project.title.slice(0, 2).toUpperCase()}</strong>
                </div>
                <div className={styles.content}>
                  <div className={styles.meta}><span>{project.number}</span><span>{project.type}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <small>{project.stack}</small>
                  <div className={styles.links}>
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
          <div className={styles.end} aria-hidden="true"><span>ET</span><i /></div>
        </div>
      </div>
    </section>
  );
}
