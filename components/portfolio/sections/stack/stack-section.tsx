import type { PortfolioCopy } from "../../../../content/portfolio";
import styles from "./stack-section.module.css";

export function StackSection({ copy }: { copy: PortfolioCopy }) {
  return (
    <section className={`section ${styles.section}`}>
      <div className="section-index" data-reveal>{copy.stack.index}</div>
      <div className={styles.heading}>
        <h2 className="section-title" data-reveal>{copy.stack.title}</h2>
        <span className={styles.radar} aria-hidden="true"><i /><b /></span>
      </div>
      <div className={styles.list}>
        {copy.stack.groups.map((group, index) => (
          <div className={styles.row} data-reveal key={group.label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{group.label}</h3>
            <p>{group.items}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
