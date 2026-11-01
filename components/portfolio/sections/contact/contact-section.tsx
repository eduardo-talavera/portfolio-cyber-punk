import type { PortfolioCopy } from "../../../../content/portfolio";
import styles from "./contact-section.module.css";

const CONTACT_EMAIL = "edgar.developer.talavera77@gmail.com";
const EMAIL_SUBJECT = "Contacto desde tu portafolio / Portfolio inquiry";
const EMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  CONTACT_EMAIL,
)}&su=${encodeURIComponent(EMAIL_SUBJECT)}`;

export function ContactSection({ copy }: { copy: PortfolioCopy }) {
  return (
    <section className={styles.contact} id="contact">
      <div className={`${styles.index} section-index`} data-reveal>{copy.contact.index}</div>
      <div className={styles.layout}>
        <div>
          <h2 className="section-title" data-reveal>{copy.contact.title}<span>{copy.contact.accent}</span></h2>
          <p className={styles.body} data-reveal>{copy.contact.body}</p>
        </div>
        <div className={styles.action} data-reveal>
          <a
            className={styles.emailLink}
            href={EMAIL_COMPOSE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{copy.contact.email}</span><i>↗</i>
          </a>
          <a className={styles.emailAddress} href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
      <div className={styles.footer}>
        <p><span className="pulse" />{copy.contact.availability}</p>
        <div className={styles.socialLinks}>
          <span>{copy.contact.social}</span>
          <a href="https://linkedin.com/in/devtaed/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="https://github.com/eduardo-talavera" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://twitter.com/ed_talavera" target="_blank" rel="noreferrer">X ↗</a>
        </div>
      </div>
    </section>
  );
}
