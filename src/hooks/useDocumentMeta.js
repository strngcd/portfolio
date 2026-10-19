import { useEffect } from 'react';
import { site } from '../data/site';

function setMeta(selector, attribute, value) {
  const element = document.head.querySelector(selector);
  if (element && value) element.setAttribute(attribute, value);
}

// Keeps title, description, canonical URL and Open Graph tags in step with the route.
export function useDocumentMeta({ title, description, path = '/' }) {
  useEffect(() => {
    const url = new URL(path, site.url).href;
    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', url);
  }, [title, description, path]);
}
