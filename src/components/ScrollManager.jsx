import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

// Client-side navigation does not scroll on its own: go to the hash target if
// there is one, otherwise to the top. Focus moves with it so keyboard and
// screen-reader users continue from the new position.
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
    const id = hash ? decodeURIComponent(hash.slice(1)) : '';
    const target = id && id !== 'top' ? document.getElementById(id) : null;

    if (target) {
      target.scrollIntoView({ behavior, block: 'start' });
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      return;
    }

    window.scrollTo({ top: 0, behavior: hash ? behavior : 'auto' });
    if (!hash) document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname, hash, key]);

  return null;
}
