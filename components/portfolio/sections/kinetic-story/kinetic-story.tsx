import type { RefObject } from "react";
import type { Language, PortfolioCopy } from "../../../../content/portfolio";
import { KineticTerminal } from "../../../kinetic-terminal";
import styles from "./kinetic-story.module.css";

interface KineticStoryProps {
  copy: PortfolioCopy;
  language: Language;
  sectionRef: RefObject<HTMLElement | null>;
}

export function KineticStory({ copy, language, sectionRef }: KineticStoryProps) {
  return (
    <section className={styles.story} ref={sectionRef} aria-labelledby="kinetic-title">
      <div className={styles.sticky}>
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.arc} aria-hidden="true"><i /><i /><i /></div>

        <div className={styles.heading}>
          <span className="section-index">{copy.scene.index}</span>
          <h2 id="kinetic-title">
            <span>{copy.scene.lineOne}</span>
            <span className="outline-text">{copy.scene.lineTwo}</span>
          </h2>
        </div>

        <div className={styles.portal}>
          <KineticTerminal language={language} />
        </div>

        <div className={styles.copy}>
          <p>{copy.scene.body}</p>
          <a href="#capabilities">{copy.scene.cta}<span>↘</span></a>
        </div>

        <div className={styles.counter} aria-hidden="true">
          <span>01</span><i /><span>02</span>
        </div>
      </div>
    </section>
  );
}
