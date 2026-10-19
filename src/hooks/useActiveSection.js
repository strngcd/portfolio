import { useEffect, useState } from 'react';

// Returns the id of the section currently under the reading line (just below
// the sticky header), or null when none of the given sections is there.
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(null);
  const key = ids.join('|');

  useEffect(() => {
    const sectionIds = key ? key.split('|') : [];
    if (sectionIds.length === 0 || typeof IntersectionObserver === 'undefined') return undefined;

    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    const visible = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        setActiveId(sectionIds.find((id) => visible.has(id)) ?? null);
      },
      // A thin band near the top of the viewport acts as the reading line.
      { rootMargin: '-30% 0px -65% 0px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [key]);

  return key ? activeId : null;
}
