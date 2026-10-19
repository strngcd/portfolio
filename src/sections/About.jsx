import SectionHeading from '../components/SectionHeading';
import section from './Section.module.css';
import styles from './About.module.css';

export default function About() {
  return (
    <section className={section.section} id="about" aria-labelledby="about-title">
      <div className={`container ${styles.layout}`}>
        <SectionHeading id="about-title" index="04" label="About" title="Practical software, built carefully" />

        <div className={styles.prose}>
          <p>
            I’m Bilal, a software developer based in Ethiopia. I like problems where the details
            matter: stock that has to add up, permissions that have to hold, and rules that have to
            be enforced the same way every time.
          </p>
          <p>
            Most of my work is on the backend, designing the data model, the API, and the checks that
            keep both honest. I build web applications end to end, and I care about software that is
            easy to test and easy for the next person to change.
          </p>
          <p>
            I also create machine-learning challenges for DataCurve’s Project Eris, where the work
            is writing clear specifications, preparing data, and building grading that rewards correct
            solutions rather than shortcuts.
          </p>
        </div>
      </div>
    </section>
  );
}
