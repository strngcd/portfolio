import { screen } from '@testing-library/react';
import { renderApp } from './renderWithProviders';

describe('case study page', () => {
  test('renders the Medicare case study with its sections', () => {
    renderApp('/work/medicare');
    expect(screen.getByRole('heading', { level: 1, name: 'Medicare' })).toBeInTheDocument();
    [
      'Overview',
      'The problem',
      'Who it’s for',
      'Key features',
      'Technical stack',
      'Architecture and decisions',
      'Challenges and trade-offs',
      'Testing, security, and reliability',
      'Screens',
    ].forEach((title) => {
      expect(screen.getByRole('heading', { level: 2, name: new RegExp(title) })).toBeInTheDocument();
    });
    expect(document.title).toBe('Medicare case study · Bilal Ferej');
  });

  test('hides sections without verified content', () => {
    renderApp('/work/medicare');
    expect(screen.queryByRole('heading', { name: /What I learned/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Planned improvements/ })).not.toBeInTheDocument();
  });

  test('links to the GitHub repository and no unconfirmed demo', () => {
    renderApp('/work/medicare');
    expect(screen.getByRole('link', { name: /Source/ })).toHaveAttribute('href', 'https://github.com/strngcd/medicare-v1');
    expect(screen.queryByRole('link', { name: /Live demo/ })).not.toBeInTheDocument();
    expect(screen.queryByText('Private repository')).not.toBeInTheDocument();
  });

  test('every screenshot has alt text and reserved dimensions', () => {
    renderApp('/work/medicare');
    screen.getAllByRole('img').forEach((img) => {
      expect(img.getAttribute('alt').length).toBeGreaterThan(20);
      expect(img).toHaveAttribute('width');
      expect(img).toHaveAttribute('height');
    });
  });

  test('unknown project slugs show the not-found page', () => {
    renderApp('/work/does-not-exist');
    expect(screen.getByRole('heading', { level: 1, name: 'This page doesn’t exist.' })).toBeInTheDocument();
  });

  test('unknown routes show the not-found page with a way home', () => {
    renderApp('/nowhere');
    expect(screen.getByRole('link', { name: /Back to the homepage/ })).toHaveAttribute('href', '/');
  });
});
