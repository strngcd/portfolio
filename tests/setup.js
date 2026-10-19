import '@testing-library/jest-dom';

// jsdom lacks these browser APIs; give each test a controllable stand-in.
let prefersLight = false;
global.setPrefersLight = (value) => {
  prefersLight = value;
};

beforeEach(() => {
  prefersLight = false;
  localStorage.clear();
  delete document.documentElement.dataset.theme;
  document.title = '';

  window.matchMedia = jest.fn((query) => ({
    matches: query.includes('prefers-color-scheme: light') ? prefersLight : false,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});
