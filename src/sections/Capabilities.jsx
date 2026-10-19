import SectionHeading from '../components/SectionHeading';
import { capabilities } from '../data/capabilities';
import section from './Section.module.css';
import styles from './Capabilities.module.css';

export default function Capabilities() {
  return (
    <section className={section.section} id="capabilities" aria-labelledby="capabilities-title">
      <div className="container">
        <SectionHeading id="capabilities-title" index="02" label="Capabilities" title="What I work with">
          The tools and practices behind the work above, grouped by the kind of problem they solve.
        </SectionHeading>

        <div className={styles.grid}>
          {capabilities.map((group) => (
            <div key={group.title} className={styles.group}>
              <h3 className={styles.title}>{group.title}</h3>
              <ul className={styles.list}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
