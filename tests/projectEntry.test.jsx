import { screen } from '@testing-library/react';
import ProjectEntry from '../src/components/ProjectEntry';
import { renderWithRouter } from './renderWithProviders';

const base = {
  slug: 'sample',
  name: 'Sample',
  tagline: 'Example app',
  summary: 'An example.',
  tech: ['Node.js', 'React'],
  image: { src: 'x.jpg', width: 10, height: 5, alt: 'Sample screenshot showing the main screen' },
  demoUrl: null,
  repoUrl: null,
};

describe('ProjectEntry', () => {
  test('numbers entries from their position', () => {
    renderWithRouter(<ProjectEntry project={base} index={2} />);
    expect(screen.getByText('03')).toBeInTheDocument();
  });

  test('shows no links when there is no case study, demo, or repository', () => {
    renderWithRouter(<ProjectEntry project={base} index={0} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Sample' })).toBeInTheDocument();
  });

  test('adds demo and source links when they are configured', () => {
    renderWithRouter(
      <ProjectEntry
        project={{ ...base, demoUrl: 'https://demo.example', repoUrl: 'https://github.com/x/y' }}
        index={0}
      />,
    );
    expect(screen.getByRole('link', { name: /Live demo of Sample/ })).toHaveAttribute('href', 'https://demo.example');
    expect(screen.getByRole('link', { name: /Source code for Sample/ })).toHaveAttribute('href', 'https://github.com/x/y');
  });

  test('lists technologies as an accessible list', () => {
    renderWithRouter(<ProjectEntry project={base} index={0} />);
    expect(screen.getByRole('list', { name: 'Technologies used in Sample' })).toHaveTextContent('Node.jsReact');
  });
});
