import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs/lib/anime.es.js';
import SectionHeading from './SectionHeading';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/ankur3_101106',
    icon: 'instagram',
    color: 'oklch(0.70 0.20 350)',
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/ankur3_101106',
    icon: 'twitter',
    color: 'oklch(0.75 0.12 220)',
  },
  {
    name: 'Email',
    href: 'mailto:ankurdcs101106@gmail.com',
    icon: 'gmail',
    color: 'oklch(0.65 0.20 25)',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/ankur101106',
    icon: 'linkedin',
    color: 'oklch(0.60 0.15 240)',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/ankur3-101106',
    icon: 'github',
    color: 'oklch(0.75 0.02 260)',
  },
  {
    name: 'GitLab',
    href: 'https://gitlab.com/ankur3-101106',
    icon: 'gitlab',
    color: 'oklch(0.70 0.18 30)',
  },
  {
    name: 'Discord',
    href: 'https://discord.com/users/ankur3_101106',
    icon: 'discord',
    color: 'oklch(0.60 0.18 280)',
  },
];

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        // Stagger social icons entrance with anime.js
        anime({
          targets: '.contact__social-link',
          scale: [0, 1],
          opacity: [0, 1],
          delay: anime.stagger(80, { from: 'center' }),
          duration: 600,
          easing: 'easeOutBack',
        });

        // Animate the headline
        anime({
          targets: '.contact__headline',
          translateY: [40, 0],
          opacity: [0, 1],
          duration: 800,
          easing: 'easeOutExpo',
        });

        // Animate the subtitle
        anime({
          targets: '.contact__subtext',
          translateY: [30, 0],
          opacity: [0, 1],
          duration: 800,
          delay: 200,
          easing: 'easeOutExpo',
        });

        // Animate the email card
        anime({
          targets: '.contact__email-card',
          translateY: [50, 0],
          opacity: [0, 1],
          duration: 900,
          delay: 400,
          easing: 'easeOutExpo',
        });
      },
    });

    return () => trigger.kill();
  }, []);

  // Mouse hover glow on social icons
  useEffect(() => {
    const links = document.querySelectorAll('.contact__social-link');

    const handleMouseMove = (e) => {
      const link = e.currentTarget;
      const rect = link.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      link.style.setProperty('--glow-x', `${x}px`);
      link.style.setProperty('--glow-y', `${y}px`);
    };

    links.forEach((link) => {
      link.addEventListener('mousemove', handleMouseMove);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('mousemove', handleMouseMove);
      });
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="contact section">
      <div className="container">
        <SectionHeading
          number="05"
          title="Contact"
          subtitle="Let's connect and build something remarkable."
        />

        <div className="contact__content">
          <h3 className="contact__headline" style={{ opacity: 0 }}>
            Get In Touch
          </h3>
          <p className="contact__subtext" style={{ opacity: 0 }}>
            I'm always open to discussing new opportunities, cybersecurity challenges,
            or just connecting with fellow security enthusiasts.
          </p>

          {/* Email CTA card */}
          <a
            href="mailto:ankurdcs101106@gmail.com"
            className="contact__email-card glass-card"
            style={{ opacity: 0 }}
          >
            <div className="contact__email-icon">📧</div>
            <div className="contact__email-info">
              <span className="mono-label">Say Hello</span>
              <span className="contact__email-address">ankurdcs101106@gmail.com</span>
            </div>
            <span className="contact__email-arrow">→</span>
          </a>

          {/* Social icons grid */}
          <div className="contact__socials">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social-link glass-card"
                style={{ '--link-color': link.color, opacity: 0 }}
                aria-label={`Visit ${link.name}`}
              >
                <img
                  src={`https://skillicons.dev/icons?i=${link.icon}`}
                  alt={link.name}
                  className="contact__social-icon"
                  loading="lazy"
                  width="48"
                  height="48"
                />
                <span className="contact__social-name">{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-bg" />
    </section>
  );
}
