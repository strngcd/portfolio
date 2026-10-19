import styles from './SectionHeading.module.css';

export default function SectionHeading({ id, index, label, title, children }) {
  return (
    <div className={styles.heading}>
      <p className={`eyebrow ${styles.label}`}>
        <span className={styles.index}>{index}</span>
        <span aria-hidden="true" className={styles.rule} />
        {label}
      </p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {children && <p className={styles.intro}>{children}</p>}
    </div>
  );
}
