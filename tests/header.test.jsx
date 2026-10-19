import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp } from './renderWithProviders';

describe('header navigation', () => {
  test('links each nav item to its homepage section', () => {
    renderApp('/');
    const nav = screen.getAllByRole('navigation', { name: 'Primary' })[0];
    const hrefs = within(nav)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual(['/#work', '/#experience', '/#about', '/#contact']);
  });

  test('every nav target exists on the homepage', () => {
    const { container } = renderApp('/');
    ['work', 'experience', 'about', 'contact'].forEach((id) => {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    });
  });

  test('wordmark links home with an accessible name', () => {
    renderApp('/work/medicare');
    expect(screen.getByRole('link', { name: 'Bilal Ferej, home' })).toHaveAttribute('href', '/');
  });

  test('mobile menu opens, closes with Escape, and returns focus to its button', async () => {
    const user = userEvent.setup();
    renderApp('/');
    const button = screen.getByRole('button', { name: 'Open menu' });
    const menu = document.getElementById('mobile-menu');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(menu).not.toBeVisible();

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAccessibleName('Close menu');
    expect(menu).toBeVisible();
    expect(within(menu).getAllByRole('link')[0]).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveFocus();
  });

  test('mobile menu closes after choosing a link', async () => {
    const user = userEvent.setup();
    renderApp('/');
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    const menu = document.getElementById('mobile-menu');
    await user.click(within(menu).getByRole('link', { name: 'About' }));
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  });

  test('includes a skip link to the main content', () => {
    renderApp('/');
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main');
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main');
  });
});
