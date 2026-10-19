import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from '../components/Icons';
import Screenshot from '../components/Screenshot';
import TechList from '../components/TechList';
import { getProject, projects } from '../data/projects';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import NotFoundPage from './NotFoundPage';
import styles from './CaseStudyPage.module.css';

// A numbered section of the case study. Sections without content are skipped
// by the caller, so the template only shows what has been verified.
function Block({ id, number, title, children }) {
  return (
    <section className={styles.block} aria-labelledby={id}>
      <h2 id={id} className={styles.blockTitle}>
        <span className={styles.blockNumber}>{number}</span>
        {title}
      </h2>
      <div className={styles.blockBody}>{children}</div>
    </section>
  );
}

function BulletList({ items }) {
  return (
    <ul className={styles.bullets}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Notes({ items }) {
  return (
    <div className={styles.notes}>
      {items.map((item) => (
        <div key={item.title} className={styles.note}>
          <h3 className={styles.noteTitle}>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export function CaseStudy({ project }) {
  const study = project.caseStudy;
  const index = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects.slice(index + 1).find((p) => p.caseStudy);

  useDocumentMeta({
    title: `${project.name} case study · Bilal Ferej`,
    description: project.summary,
    path: `/work/${project.slug}`,
  });

  const blocks = [
    { id: 'overview', title: 'Overview', content: study.overview && <p>{study.overview}</p> },
    { id: 'problem', title: 'The problem', content: study.problem && <p>{study.problem}</p> },
    { id: 'users', title: 'Who it’s for', content: study.users?.length > 0 && <BulletList items={study.users} /> },
    { id: 'features', title: 'Key features', content: study.features?.length > 0 && <BulletList items={study.features} /> },
    {
      id: 'stack',
      title: 'Technical stack',
      content: study.stack?.length > 0 && (
        <dl className={styles.stack}>
          {study.stack.map((group) => (
            <div key={group.label} className={styles.stackRow}>
              <dt className="eyebrow">{group.label}</dt>
              <dd>
                <TechList items={group.items} label={`${group.label} technologies`} />
              </dd>
            </div>
          ))}
        </dl>
      ),
    },
    { id: 'decisions', title: 'Architecture and decisions', content: study.decisions?.length > 0 && <Notes items={study.decisions} /> },
    { id: 'challenges', title: 'Challenges and trade-offs', content: study.challenges?.length > 0 && <Notes items={study.challenges} /> },
    { id: 'quality', title: 'Testing, security, and reliability', content: study.quality?.length > 0 && <BulletList items={study.quality} /> },
    {
      id: 'screens',
      title: 'Screens',
      content: study.gallery?.length > 0 && (
        <div className={styles.gallery}>
          {study.gallery.map((image) => (
            <figure key={image.src} className={styles.figure}>
              <Screenshot image={image} />
              {image.caption && <figcaption className={styles.caption}>{image.caption}</figcaption>}
            </figure>
          ))}
        </div>
      ),
    },
    { id: 'lessons', title: 'What I learned', content: study.lessons?.length > 0 && <BulletList items={study.lessons} /> },
    { id: 'planned', title: 'Planned improvements', content: study.planned?.length > 0 && <BulletList items={study.planned} /> },
  ].filter((block) => block.content);

  return (
    <article className={styles.page} aria-labelledby="case-title">
      <header className={`container ${styles.header}`}>
        <Link to={{ pathname: '/', hash: '#work' }} className={styles.back}>
          <ArrowLeft size={16} /> All work
        </Link>

        <p className="eyebrow">Case study · {project.tagline}</p>
        <h1 id="case-title" className={styles.title}>
          {project.name}
        </h1>
        <p className={styles.lede}>{project.summary}</p>

        <dl className={styles.meta}>
          {study.role && (
            <div className={styles.metaRole}>
              <dt className="eyebrow">Role</dt>
              <dd>{study.role}</dd>
            </div>
          )}
          <div>
            <dt className="eyebrow">Stack</dt>
            <dd>{project.tech.join(', ')}</dd>
          </div>
          <div>
            <dt className="eyebrow">Links</dt>
            <dd>
              {project.demoUrl || project.repoUrl ? (
                <span className={styles.metaLinks}>
                  {project.demoUrl && (
                    <a href={project.demoUrl} className="text-link" target="_blank" rel="noreferrer">
                      Live demo<span className="visually-hidden"> (opens in a new tab)</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a href={project.repoUrl} className="text-link" target="_blank" rel="noreferrer">
                      Source<span className="visually-hidden"> (opens in a new tab)</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </span>
              ) : (
                'Private repository'
              )}
            </dd>
          </div>
        </dl>
      </header>

      <div className={`container ${styles.hero}`}>
        <Screenshot image={project.image} loading="eager" />
      </div>

      <div className={`container ${styles.content}`}>
        {blocks.map((block, i) => (
          <Block key={block.id} id={block.id} number={String(i + 1).padStart(2, '0')} title={block.title}>
            {block.content}
          </Block>
        ))}
      </div>

      <footer className={`container ${styles.end}`}>
        {nextProject ? (
          <Link to={`/work/${nextProject.slug}`} className="button">
            Next: {nextProject.name} <ArrowRight size={16} />
          </Link>
        ) : (
          <Link to={{ pathname: '/', hash: '#work' }} className="button">
            <ArrowLeft size={16} /> Back to all work
          </Link>
        )}
        <Link to={{ pathname: '/', hash: '#contact' }} className="button button-primary">
          Get in touch <ArrowRight size={16} />
        </Link>
      </footer>
    </article>
  );
}

export default function CaseStudyPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project?.caseStudy) return <NotFoundPage />;
  return <CaseStudy project={project} />;
}
