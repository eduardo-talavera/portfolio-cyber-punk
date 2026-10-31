import type { PortfolioCopy } from "../../../../content/portfolio";
import styles from "./hero.module.css";

export function Hero({ copy }: { copy: PortfolioCopy }) {
  return (
    <>
      <section className={styles.hero} id="top">
        <div className={styles.grid} aria-hidden="true" />
        <div className={`${styles.orbit} ${styles.orbitOne}`} aria-hidden="true" />
        <div className={`${styles.orbit} ${styles.orbitTwo}`} aria-hidden="true" />
        <div className={styles.content}>
          <p className={styles.eyebrow}><span className="pulse" />{copy.hero.eyebrow}</p>
          <h1>
            <span>{copy.hero.lineOne}</span>
            <span className="outline-text">{copy.hero.lineTwo}</span>
            <span>{copy.hero.lineThree}</span>
          </h1>
          <div className={styles.bottom}>
            <p className={styles.intro}>{copy.hero.intro}</p>
            <div className={styles.actions}>
              <a className={`${styles.button} ${styles.primary}`} href="#work">
                <span>{copy.hero.cta}</span><i aria-hidden="true">↘</i>
              </a>
              <a className={`${styles.button} ${styles.ghost}`} href="#contact">{copy.hero.secondary}</a>
            </div>
          </div>
        </div>

        <div className={styles.scrollCue} aria-hidden="true">
          <span>{copy.hero.scroll}</span>
          <i />
        </div>
        <span className={`${styles.coordinate} ${styles.coordinateLeft}`}>19.4326° N</span>
        <span className={`${styles.coordinate} ${styles.coordinateRight}`}>99.1332° W</span>
      </section>

      <div className={styles.status} aria-label="Professional status">
        {copy.status.map((item, index) => (
          <span key={item}><i>{String(index + 1).padStart(2, "0")}</i>{item}</span>
        ))}
      </div>
    </>
  );
}
