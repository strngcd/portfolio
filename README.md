# bilalferej.com

Personal portfolio of Bilal Ferej, built with React and Vite and tested with Jest.

## Commands

```bash
npm install
npm run dev        # development server on http://localhost:5173
npm test           # Jest + React Testing Library
npm run lint       # ESLint
npm run build      # production build in dist/
npm run preview    # serve dist/ on http://localhost:4173
npm run og-image   # regenerate public/og-image.png from scripts/og-image.html (needs google-chrome)
```

## Structure

```text
src/
  data/        site.js (identity and contact links), projects.js, experience.js, capabilities.js
  theme/       ThemeProvider: system preference, persisted choice, toggle
  styles/      tokens.css (design tokens for both themes), base.css (globals, buttons, links)
  components/  Header, ThemeToggle, SectionHeading, ProjectEntry, Screenshot, TechList,
               ExperienceEntry, ContactLinks, Footer, ScrollManager, Icons
  sections/    Hero, SelectedWork, Capabilities, Experience, About, Contact
  pages/       HomePage, CaseStudyPage (/work/:slug), NotFoundPage
  assets/      project screenshots
public/        favicon, og-image, robots.txt, sitemap.xml
tests/         Jest suites
```

## Editing content

- **Contact details:** `src/data/site.js`. A value left as `null` is hidden everywhere. To add a résumé, put the PDF in `public/` and set `contact.resume` to its path.
- **Projects:** append an entry to `src/data/projects.js`. Add a `caseStudy` object to get a page at `/work/<slug>`, and add that URL to `public/sitemap.xml`. Case-study sections with no content are hidden.
- **Colours and spacing:** `src/styles/tokens.css`.

## Deployment notes

This is a single-page app with client-side routes (`/work/medicare`), so the host must serve `index.html` for unknown paths. On Netlify, add a `_redirects` file with `/* /index.html 200`. On Vercel, add a rewrite to `/index.html`.
