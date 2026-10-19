import { capabilities } from '../src/data/capabilities';
import { experience } from '../src/data/experience';
import { getProject, projects } from '../src/data/projects';

describe('content data', () => {
  test('Medicare is the first, featured project', () => {
    expect(projects[0].slug).toBe('medicare');
    expect(getProject('medicare')).toBe(projects[0]);
    expect(getProject('missing')).toBeUndefined();
  });

  test('project slugs are unique and URL-safe', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9-]+$/));
  });

  test('project links are either unset or absolute https URLs', () => {
    projects.forEach((p) => {
      [p.demoUrl, p.repoUrl].forEach((url) => {
        if (url !== null) expect(url).toMatch(/^https:\/\//);
      });
    });
  });

  test('experience entries carry no dates', () => {
    experience.forEach((entry) => {
      expect(entry).not.toHaveProperty('start');
      expect(entry).not.toHaveProperty('end');
    });
  });

  test('capability groups are short lists, not badge walls', () => {
    capabilities.forEach((group) => expect(group.items.length).toBeLessThanOrEqual(6));
  });
});
