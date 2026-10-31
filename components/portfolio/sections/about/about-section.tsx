import type { PortfolioCopy } from "../../../../content/portfolio";
import styles from "./about-section.module.css";

export function AboutSection({ copy }: { copy: PortfolioCopy }) {
  return (
    <section className="section" id="profile">
      <div className="section-index" data-reveal>{copy.about.index}</div>
      <div className={styles.layout}>
        <h2 className="section-title" data-reveal>{copy.about.title}</h2>
        <div className={styles.copy} data-reveal>
          <p>{copy.about.body}</p>
          <blockquote>{copy.about.note}</blockquote>
          <div className={styles.signature} aria-label="Edgar Talavera">
            <span>EDGAR</span><span>TALAVERA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
