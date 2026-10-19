import { Link } from 'react-router-dom';
import { ArrowRight } from '../components/Icons';
import { site } from '../data/site';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className="container">
        <p className={`eyebrow ${styles.eyebrow}`}>
          <span className={styles.mark} aria-hidden="true" />
          {site.role} · {site.location}
        </p>

        <h1 id="hero-title" className={styles.title}>
          I build software that solves <span className={styles.highlight}>real problems.</span>
        </h1>

        <p className={styles.lede}>
          From reliable backend systems to practical web applications and structured AI evaluation
          challenges, I turn complex problems into clear, useful software.
        </p>

        <div className={styles.actions}>
          <Link to={{ pathname: '/', hash: '#work' }} className="button button-primary">
            Explore my work <ArrowRight size={16} />
          </Link>
          <Link to={{ pathname: '/', hash: '#contact' }} className="button">
            Get in touch
          </Link>
        </div>

        <dl className={styles.facts}>
          <div>
            <dt className="eyebrow">Focus</dt>
            <dd>Backend engineering &amp; system design</dd>
          </div>
          <div>
            <dt className="eyebrow">Currently</dt>
            <dd>ML Challenge Creator, DataCurve</dd>
          </div>
          <div>
            <dt className="eyebrow">Open to</dt>
            <dd>Meaningful roles &amp; projects</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
