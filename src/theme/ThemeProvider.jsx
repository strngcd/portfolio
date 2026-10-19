import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export const STORAGE_KEY = 'theme';
const ThemeContext = createContext(null);

function readStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
}

function systemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

// index.html sets data-theme before first paint; start from that so React agrees with it.
function initialTheme() {
  const fromDocument = document.documentElement.dataset.theme;
  if (fromDocument === 'light' || fromDocument === 'dark') return fromDocument;
  return readStoredTheme() ?? systemTheme();
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Follow the operating system until the visitor picks a theme themselves.
  useEffect(() => {
    const query = window.matchMedia?.('(prefers-color-scheme: light)');
    if (!query) return undefined;
    const onChange = (event) => {
      if (!readStoredTheme()) setTheme(event.matches ? 'light' : 'dark');
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 500);

    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Storage can be unavailable (private mode); the choice still applies for this visit.
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
}
