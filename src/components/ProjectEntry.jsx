import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from './Icons';
import Screenshot from './Screenshot';
import TechList from './TechList';
import styles from './ProjectEntry.module.css';

export default function ProjectEntry({ project, index, reverse = false }) {
  const number = String(index + 1).padStart(2, '0');
  const caseStudyPath = project.caseStudy ? `/work/${project.slug}` : null;
  const headingId = `project-${project.slug}`;

  return (
    <article className={`${styles.entry} ${reverse ? styles.reverse : ''}`} aria-labelledby={headingId}>
      <div className={styles.media}>
        <Screenshot image={project.image} />
      </div>

      <div className={styles.body}>
        <p className={`eyebrow ${styles.meta}`}>
          <span className={styles.number}>{number}</span>
          <span>{project.tagline}</span>
        </p>

        <h3 id={headingId} className={styles.title}>
          {caseStudyPath ? <Link to={caseStudyPath}>{project.name}</Link> : project.name}
        </h3>

        <p className={styles.summary}>{project.summary}</p>

        <TechList items={project.tech} label={`Technologies used in ${project.name}`} />

        <ul className={styles.links}>
          {caseStudyPath && (
            <li>
              <Link to={caseStudyPath} className="text-link">
                Read the case study<span className="visually-hidden"> for {project.name}</span>
                <ArrowRight size={16} />
              </Link>
            </li>
          )}
          {project.demoUrl && (
            <li>
              <a href={project.demoUrl} className="text-link" target="_blank" rel="noreferrer">
                Live demo<span className="visually-hidden"> of {project.name} (opens in a new tab)</span>
                <ArrowUpRight size={16} />
              </a>
            </li>
          )}
          {project.repoUrl && (
            <li>
              <a href={project.repoUrl} className="text-link" target="_blank" rel="noreferrer">
                Source<span className="visually-hidden"> code for {project.name} (opens in a new tab)</span>
                <ArrowUpRight size={16} />
              </a>
            </li>
          )}
        </ul>
      </div>
    </article>
  );
}
