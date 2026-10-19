import ContactLinks from '../components/ContactLinks';
import { contact } from '../data/site';
import { ArrowRight } from '../components/Icons';
import section from './Section.module.css';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section className={`${section.section} ${styles.contact}`} id="contact" aria-labelledby="contact-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <p className="eyebrow">
            <span className={styles.index}>05</span> Contact
          </p>
          <h2 id="contact-title" className={styles.title}>
            Have a problem worth solving?
          </h2>
          <p className={styles.lede}>Let’s talk about a role, a project, or an idea.</p>
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="button button-primary">
              Send me an email <ArrowRight size={16} />
            </a>
          )}
        </div>

        <ContactLinks />
      </div>
    </section>
  );
}
