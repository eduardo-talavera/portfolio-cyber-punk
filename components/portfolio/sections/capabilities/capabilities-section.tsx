import type { RefObject } from "react";
import type { PortfolioCopy } from "../../../../content/portfolio";
import styles from "./capabilities-section.module.css";

interface CapabilitiesSectionProps {
  copy: PortfolioCopy;
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLDivElement | null>;
}

export function CapabilitiesSection({ copy, sectionRef, headingRef }: CapabilitiesSectionProps) {
  return (
    <section className={`section ${styles.section}`} id="capabilities" ref={sectionRef}>
      <div className={styles.heading} ref={headingRef}>
        <div className="section-index" data-reveal>{copy.capabilities.index}</div>
        <h2 className="section-title" data-reveal>
          {copy.capabilities.title.split("\n").map((line) => <span key={line}>{line}</span>)}
        </h2>
        <p data-reveal>{copy.capabilities.intro}</p>
      </div>

      <div className={styles.list}>
        {copy.capabilities.items.map((item) => (
          <article className={styles.card} data-reveal key={item.number}>
            <span className={styles.number}>{item.number}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
            <ul>
              {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
            <span className={styles.cross} aria-hidden="true">+</span>
          </article>
        ))}
      </div>
    </section>
  );
}
