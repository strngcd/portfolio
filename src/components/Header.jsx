import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems, site } from '../data/site';
import { useActiveSection } from '../hooks/useActiveSection';
import { Close, Menu } from './Icons';
import ThemeToggle from './ThemeToggle';
import styles from './Header.module.css';

const sectionIds = navItems.map((item) => item.id);

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const activeId = useActiveSection(isHome ? sectionIds : []);
  // The menu is tied to the location it was opened on, so any navigation closes it.
  const [openOnKey, setOpenOnKey] = useState(null);
  const menuOpen = openOnKey === location.key;
  const setMenuOpen = (open) => setOpenOnKey(open ? location.key : null);
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;

    menuRef.current?.querySelector('a')?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenOnKey(null);
        menuButtonRef.current?.focus();
      }
    };
    // Close when the layout grows past the mobile breakpoint.
    const wide = window.matchMedia('(min-width: 48rem)');
    const onResize = (event) => event.matches && setOpenOnKey(null);

    document.addEventListener('keydown', onKeyDown);
    wide.addEventListener('change', onResize);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      wide.removeEventListener('change', onResize);
    };
  }, [menuOpen]);

  const links = navItems.map((item) => (
    <li key={item.id}>
      <Link
        to={{ pathname: '/', hash: `#${item.id}` }}
        className={styles.link}
        aria-current={activeId === item.id ? 'true' : undefined}
      >
        {item.label}
      </Link>
    </li>
  ));

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link to="/" className={styles.wordmark} aria-label={`${site.name}, home`}>
          bf<span className={styles.dot}>.</span>
        </Link>

        <nav aria-label="Primary" className={styles.desktopNav}>
          <ul className={styles.list}>{links}</ul>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        ref={menuRef}
        aria-label="Primary"
        className={styles.mobileNav}
        hidden={!menuOpen}
      >
        <ul className={`container ${styles.mobileList}`}>{links}</ul>
      </nav>
    </header>
  );
}
