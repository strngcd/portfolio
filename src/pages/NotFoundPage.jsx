import { Link } from 'react-router-dom';
import { ArrowLeft } from '../components/Icons';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  useDocumentMeta({
    title: 'Page not found · Bilal Ferej',
    description: 'This page does not exist.',
  });

  return (
    <section className={`container ${styles.page}`} aria-labelledby="not-found-title">
      <p className="eyebrow">404</p>
      <h1 id="not-found-title" className={styles.title}>
        This page doesn’t exist.
      </h1>
      <p className={styles.text}>The link may be broken, or the page may have moved.</p>
      <Link to="/" className="button">
        <ArrowLeft size={16} /> Back to the homepage
      </Link>
    </section>
  );
}
