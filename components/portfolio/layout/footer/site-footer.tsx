import type { PortfolioCopy } from "../../../../content/portfolio";
import styles from "./site-footer.module.css";

export function SiteFooter({ copy }: { copy: PortfolioCopy }) {
  return (
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()}</span>
      <span>{copy.footer}</span>
      <a href="#top">TOP ↑</a>
    </footer>
  );
}
