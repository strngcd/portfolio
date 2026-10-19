import ProjectEntry from '../components/ProjectEntry';
import SectionHeading from '../components/SectionHeading';
import { ArrowUpRight } from '../components/Icons';
import { projects } from '../data/projects';
import { contact } from '../data/site';
import styles from './Section.module.css';

export default function SelectedWork() {
  return (
    <section className={styles.section} id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading id="work-title" index="01" label="Selected work" title="Software built for real workflows">
          Case studies of applications I have designed and built, with the reasoning behind them.
        </SectionHeading>

        <div>
          {projects.map((project, index) => (
            <ProjectEntry key={project.slug} project={project} index={index} reverse={index % 2 === 1} />
          ))}
        </div>

        {contact.github && (
          <p className={styles.footnote}>
            More of my code is on{' '}
            <a href={contact.github} className="text-link" target="_blank" rel="noreferrer">
              GitHub<span className="visually-hidden"> (opens in a new tab)</span>
              <ArrowUpRight size={14} />
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
