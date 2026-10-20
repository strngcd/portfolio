// Single source for identity and contact details. A link left as null is
// hidden everywhere, so details can be added later without touching components.
export const site = {
  name: 'Bilal Ferej',
  shortName: 'bf.',
  role: 'Software developer',
  location: 'Ethiopia',
  url: 'https://bilalferej.com',
};

export const contact = {
  email: 'ferejbilal@gmail.com',
  phone: '+251 983 301 090',
  github: 'https://github.com/strngcd',
  linkedin: 'https://www.linkedin.com/in/bilal-ferej-140305258',
  // Add the path of a PDF in /public (for example '/bilal-ferej-resume.pdf') once it exists.
  resume: null,
};

export const navItems = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];
