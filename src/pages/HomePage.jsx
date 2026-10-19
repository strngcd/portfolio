import { useDocumentMeta } from '../hooks/useDocumentMeta';
import About from '../sections/About';
import Capabilities from '../sections/Capabilities';
import Contact from '../sections/Contact';
import Experience from '../sections/Experience';
import Hero from '../sections/Hero';
import SelectedWork from '../sections/SelectedWork';

export default function HomePage() {
  useDocumentMeta({
    title: 'Bilal Ferej · Software Developer',
    description:
      'Bilal Ferej is a software developer building practical web applications, with a focus on backend engineering, system design, and structured ML evaluation challenges.',
    path: '/',
  });

  return (
    <>
      <Hero />
      <SelectedWork />
      <Capabilities />
      <Experience />
      <About />
      <Contact />
    </>
  );
}
