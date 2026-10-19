import { screen, within } from '@testing-library/react';
import { renderApp } from './renderWithProviders';
import { contact } from '../src/data/site';

describe('homepage', () => {
  test('has one h1 and the sections in the required order', () => {
    renderApp('/');
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('I build software that solves real problems.');

    const sectionIds = [...document.querySelectorAll('main section[id]')].map((s) => s.id);
    expect(sectionIds).toEqual(['work', 'capabilities', 'experience', 'about', 'contact']);
  });

  test('hero calls to action point at work and contact', () => {
    renderApp('/');
    expect(screen.getByRole('link', { name: 'Explore my work' })).toHaveAttribute('href', '/#work');
    expect(screen.getByRole('link', { name: 'Get in touch' })).toHaveAttribute('href', '/#contact');
  });

  test('features Medicare first, with a case-study link', () => {
    renderApp('/');
    const work = document.getElementById('work');
    const first = within(work).getAllByRole('article')[0];
    expect(within(first).getByRole('heading', { level: 3 })).toHaveTextContent('Medicare');
    expect(within(first).getByText('01')).toBeInTheDocument();
    expect(within(first).getByRole('link', { name: /Read the case study/ })).toHaveAttribute(
      'href',
      '/work/medicare',
    );
    expect(within(first).getByRole('img')).toHaveAttribute('alt', expect.stringMatching(/Medicare dashboard/));
  });

  test('shows the DataCurve / Project Eris experience without dates', () => {
    renderApp('/');
    const section = document.getElementById('experience');
    expect(within(section).getByRole('heading', { name: 'ML Challenge Creator' })).toBeInTheDocument();
    expect(section).toHaveTextContent('DataCurve');
    expect(section).toHaveTextContent('Project Eris');
    expect(section.textContent).not.toMatch(/\b(19|20)\d{2}\b/);
  });

  test('contact section offers email, GitHub and LinkedIn', () => {
    renderApp('/');
    const section = document.getElementById('contact');
    expect(within(section).getByRole('link', { name: /Send me an email/ })).toHaveAttribute(
      'href',
      `mailto:${contact.email}`,
    );
    expect(within(section).getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', contact.github);
    expect(within(section).getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', contact.linkedin);
  });

  test('sets the page title', () => {
    renderApp('/');
    expect(document.title).toBe('Bilal Ferej · Software Developer');
  });

  test('footer shows the current year', () => {
    renderApp('/');
    expect(screen.getByRole('contentinfo')).toHaveTextContent(`© ${new Date().getFullYear()} Bilal Ferej`);
  });

  test('external links open safely in a new tab and say so', () => {
    renderApp('/');
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
      expect(link).toHaveAccessibleName(expect.stringContaining('opens in a new tab'));
    });
  });
});
