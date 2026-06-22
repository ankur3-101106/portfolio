import React, { useEffect, useRef } from 'react';
import Head from '@docusaurus/Head';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Layout from '@theme/Layout';
import SideDock from '../components/SideDock';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const appRef = useRef(null);
  const progressBarRef = useRef(null);

  // Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    // Global scroll progress bar
    const ctx = gsap.context(() => {
      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
    });

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      ctx.revert();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Layout noFooter={true}>
      <div className="home-page-container">
        <Head>
          <title>Ankur Macwan | Cybersecurity Student & Linux Enthusiast</title>
          <meta name="description" content="Ankur Macwan — Cybersecurity student, Linux enthusiast, and future pentester. Explore skills, projects, and certifications in offensive security, networking, and automation." />
          <meta name="theme-color" content="#0a0e17" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        </Head>

        {/* Scroll progress bar */}
        <div
          ref={progressBarRef}
          className="progress-bar"
          style={{ transform: 'scaleX(0)' }}
          aria-hidden="true"
        />

        <SideDock />

        <main ref={appRef} className="app">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Certifications />
          <Contact />
        </main>

        <Footer />
      </div>
    </Layout>
  );
}