import ExperienceEntry from '../components/ExperienceEntry';
import SectionHeading from '../components/SectionHeading';
import { experience } from '../data/experience';
import styles from './Section.module.css';

export default function Experience() {
  return (
    <section className={styles.section} id="experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading id="experience-title" index="03" label="Experience" title="Building challenges that test AI agents">
          Writing machine-learning problems that are precise enough to grade automatically and hard
          enough to be worth solving.
        </SectionHeading>

        {experience.map((entry) => (
          <ExperienceEntry key={`${entry.organization}-${entry.role}`} entry={entry} />
        ))}
      </div>
    </section>
  );
}
