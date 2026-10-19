import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from '../src/components/ThemeToggle';
import { STORAGE_KEY, ThemeProvider } from '../src/theme/ThemeProvider';

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe('theme', () => {
  test('defaults to dark when the system has no light preference', () => {
    renderToggle();
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument();
  });

  test('follows a light system preference when nothing is stored', () => {
    setPrefersLight(true);
    renderToggle();
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  test('a stored choice wins over the system preference', () => {
    setPrefersLight(true);
    localStorage.setItem(STORAGE_KEY, 'dark');
    renderToggle();
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  test('keeps the theme already applied by the inline script', () => {
    document.documentElement.dataset.theme = 'light';
    renderToggle();
    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeInTheDocument();
  });

  test('toggling switches the theme, updates the label, and persists the choice', async () => {
    const user = userEvent.setup();
    renderToggle();

    await user.click(screen.getByRole('button', { name: 'Switch to light theme' }));
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('light');

    await user.click(screen.getByRole('button', { name: 'Switch to dark theme' }));
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('dark');
  });

  test('ignores an invalid stored value', () => {
    localStorage.setItem(STORAGE_KEY, 'purple');
    renderToggle();
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
