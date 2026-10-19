import { contact, site } from '../data/site';
import { ArrowUp } from './Icons';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          © {year} {site.name}
        </p>

        <ul className={styles.links}>
          {contact.github && (
            <li>
              <a href={contact.github} target="_blank" rel="noreferrer">
                GitHub<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          )}
          {contact.linkedin && (
            <li>
              <a href={contact.linkedin} target="_blank" rel="noreferrer">
                LinkedIn<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          )}
          <li>
            <a href="#top" className={styles.top}>
              Back to top <ArrowUp size={14} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
