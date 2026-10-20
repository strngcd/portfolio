import { contact } from '../data/site';
import { ArrowUpRight } from './Icons';
import styles from './ContactLinks.module.css';

// Builds the list from whatever contact details exist; missing ones are skipped.
export function getContactLinks(details = contact) {
  return [
    details.email && {
      label: 'Email',
      value: details.email,
      href: `mailto:${details.email}`,
    },
    details.phone && {
      label: 'Phone',
      value: details.phone,
      href: `tel:${details.phone.replace(/\s/g, '')}`,
    },
    details.github && {
      label: 'GitHub',
      value: details.github.replace(/^https?:\/\/(www\.)?/, ''),
      href: details.github,
      external: true,
    },
    details.linkedin && {
      label: 'LinkedIn',
      value: details.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
      href: details.linkedin,
      external: true,
    },
    details.resume && {
      label: 'Résumé',
      value: 'Download PDF',
      href: details.resume,
      download: true,
    },
  ].filter(Boolean);
}

export default function ContactLinks({ details = contact }) {
  return (
    <ul className={styles.list}>
      {getContactLinks(details).map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            className={styles.link}
            {...(link.external && { target: '_blank', rel: 'noreferrer' })}
            {...(link.download && { download: '' })}
          >
            <span className={`eyebrow ${styles.label}`}>{link.label}</span>
            <span className={styles.value}>{link.value}</span>
            {link.external && <span className="visually-hidden"> (opens in a new tab)</span>}
            <ArrowUpRight size={18} className={styles.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
