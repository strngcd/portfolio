import { getContactLinks } from '../src/components/ContactLinks';

describe('getContactLinks', () => {
  test('skips details that are missing', () => {
    const links = getContactLinks({ email: 'a@b.c', github: null, linkedin: null, resume: null });
    expect(links).toEqual([{ label: 'Email', value: 'a@b.c', href: 'mailto:a@b.c' }]);
  });

  test('shows tidy URLs and marks external links', () => {
    const [github, linkedin] = getContactLinks({
      github: 'https://github.com/someone',
      linkedin: 'https://www.linkedin.com/in/someone',
    });
    expect(github).toMatchObject({ value: 'github.com/someone', external: true });
    expect(linkedin).toMatchObject({ value: 'linkedin.com/in/someone', external: true });
  });

  test('adds a résumé download once a file is configured', () => {
    const [resume] = getContactLinks({ resume: '/resume.pdf' });
    expect(resume).toMatchObject({ label: 'Résumé', href: '/resume.pdf', download: true });
  });
});
