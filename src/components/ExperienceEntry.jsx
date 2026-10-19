import { useId } from 'react';
import styles from './ExperienceEntry.module.css';

export default function ExperienceEntry({ entry }) {
  const headingId = useId();

  return (
    <article className={styles.entry} aria-labelledby={headingId}>
      <header className={styles.header}>
        <h3 id={headingId} className={styles.role}>
          {entry.role}
        </h3>
        <p className={styles.org}>
          {entry.organization}
          {entry.project && (
            <>
              <span aria-hidden="true" className={styles.sep}>
                ·
              </span>
              {entry.project}
            </>
          )}
        </p>
      </header>

      <div className={styles.body}>
        <p className={styles.summary}>{entry.summary}</p>
        <ul className={styles.list}>
          {entry.responsibilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
