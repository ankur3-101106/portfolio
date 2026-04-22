import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function Hero() {
  return (
    <header className={clsx('hero ', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Hi, I'm Ankur 👋
        </Heading>
        <p className="hero__subtitle">
          Penetration Tester | Network Administrator | Network Security
        </p>

        <div className={styles.buttons}>
          <a className="button button--secondary button--lg" href="#projects">
            View My Work
          </a>
          <a className="button button--outline button--lg" href="/resume.pdf">
            Download Resume
          </a>
        </div>
      </div>
    </header>
  );
}

function About() {
  return (
    <section className="container margin-vert--lg">
      <Heading as="h2">About Me</Heading>
      <p>
        I’m passionate about cybersecurity and the challenge of securing modern digital systems.
        From exploring vulnerabilities to analyzing threats, I focus on understanding how attacks happen and how they can be prevented.
        I enjoy hands-on learning through practical labs, tools, and real-world scenarios.
        My goal is to build systems that are not just functional, but resilient, secure, and prepared for the unexpected.
      </p>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="container margin-vert--lg">
      <Heading as="h2">Projects</Heading>

      <div className="row">
        <div className="col col--4">
          <div className="card">
            <div className="card__body">
              <h3>Project One</h3>
              <p>Short description of your project.</p>
            </div>
            <div className="card__footer">
              <a href="https://github.com/your-repo">GitHub</a>
            </div>
          </div>
        </div>

        <div className="col col--4">
          <div className="card">
            <div className="card__body">
              <h3>Project Two</h3>
              <p>Another cool thing you built.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="container margin-vert--lg">
      <Heading as="h2">Contact</Heading>
      <p>
        Email: <a href='mailto:ankurdcs101106@gmail.com'>ankurdcs101106@gmail.com</a>
      </p>
      <p>
        <a href="https://github.com/ankur3-101106">GitHub</a> |{" "}
        <a href="https://linkedin.com/in/ankur101106">LinkedIn</a>
      </p>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="Home"
      description="Personal portfolio website">
      <Hero />
      <main>
        <About />
        <Projects />
        <Contact />
      </main>
    </Layout>
  );
}