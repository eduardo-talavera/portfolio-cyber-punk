import type { RefObject } from "react";
import type { KineticTransition } from "../../../../content/motion";
import type { Language, PortfolioCopy } from "../../../../content/portfolio";
import { KineticTerminal } from "../../../kinetic-terminal";
import styles from "./kinetic-story.module.css";

interface KineticStoryProps {
  copy: PortfolioCopy;
  language: Language;
  sectionRef: RefObject<HTMLElement | null>;
  transition: KineticTransition;
  onTransitionChange: (transition: KineticTransition) => void;
}

export function KineticStory({
  copy,
  language,
  sectionRef,
  transition,
  onTransitionChange,
}: KineticStoryProps) {
  const transitionLabel = language === "es" ? "Seleccionar animación" : "Select animation";

  return (
    <section
      className={styles.story}
      ref={sectionRef}
      aria-labelledby="kinetic-title"
      data-transition={transition}
    >
      <div className={styles.sticky}>
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.cyberFx} aria-hidden="true">
          <span>SCROLL_LINK // LIVE</span>
          <i /><i /><i />
        </div>
        <div className={styles.arc} aria-hidden="true"><i /><i /><i /></div>

        <div className={styles.transitionPicker} role="group" aria-label={transitionLabel}>
          <span>FX</span>
          <button
            type="button"
            aria-pressed={transition === "cyberpunk"}
            onClick={() => onTransitionChange("cyberpunk")}
          >
            CYBER
          </button>
          <button
            type="button"
            aria-pressed={transition === "classic"}
            onClick={() => onTransitionChange("classic")}
          >
            CLASSIC
          </button>
        </div>

        <div className={styles.heading}>
          <span className="section-index">{copy.scene.index}</span>
          <h2 id="kinetic-title" aria-label={`${copy.scene.lineOne} ${copy.scene.lineTwo}`}>
            <span data-text={copy.scene.lineOne} aria-hidden="true">{copy.scene.lineOne}</span>
            <span className="outline-text" data-text={copy.scene.lineTwo} aria-hidden="true">
              {copy.scene.lineTwo}
            </span>
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
