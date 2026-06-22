import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from './SectionHeading';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const BENTO_ITEMS = [
  {
    id: 'identity',
    span: 'wide',
    label: 'WHO I AM',
    title: 'Security-First Mindset',
    text: "Cybersecurity student with strong foundations in Networking & OS. My daily workflow runs on Arch Linux, and I'm deeply passionate about penetration testing, SOC operations, and network security.",
    icon: '🔐',
    accent: 'oklch(0.75 0.15 200)',
  },
  {
    id: 'os-skills',
    span: 'normal',
    label: 'OPERATING SYSTEMS',
    title: 'Linux Native',
    list: ['Arch Linux', 'Kali Linux', 'Debian', 'Ubuntu', 'Manjaro'],
    icon: '🐧',
    accent: 'oklch(0.72 0.22 145)',
  },
  {
    id: 'security',
    span: 'normal',
    label: 'CYBERSECURITY',
    title: 'Offensive Skills',
    list: ['Network Fundamentals', 'Web Security (SQLi, XSS)', 'Traffic Analysis', 'Password Attacks'],
    icon: '🛡️',
    accent: 'oklch(0.65 0.20 25)',
  },
  {
    id: 'philosophy',
    span: 'normal',
    label: 'PHILOSOPHY',
    title: 'Labs > Theory',
    text: "I believe hands-on practice beats textbooks. From CTF challenges to Wireshark packet analysis — real skills come from real practice.",
    icon: '🧠',
    accent: 'oklch(0.80 0.16 85)',
  },
  {
    id: 'tools',
    span: 'wide',
    label: 'ARSENAL',
    title: 'Tools & Languages',
    tools: [
      { name: 'Python', icon: '🐍' },
      { name: 'Bash', icon: '⚡' },
      { name: 'Nmap', icon: '🗺️' },
      { name: 'Wireshark', icon: '🦈' },
      { name: 'Burp Suite', icon: '🔥' },
      { name: 'Metasploit', icon: '💀' },
      { name: 'Git', icon: '📦' },
      { name: 'PowerShell', icon: '🖥️' },
    ],
    accent: 'oklch(0.70 0.18 280)',
  },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // GSAP ScrollTrigger to trigger anime.js animations
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        // Stagger bento cards in with anime.js
        anime({
          targets: '.bento__card',
          translateY: [60, 0],
          opacity: [0, 1],
          scale: [0.9, 1],
          delay: anime.stagger(100, { grid: [3, 2], from: 'first' }),
          duration: 900,
          easing: 'easeOutExpo',
        });

        // Animate list items inside cards
        anime({
          targets: '.bento__list-item',
          translateX: [-30, 0],
          opacity: [0, 1],
          delay: anime.stagger(50, { start: 600 }),
          duration: 600,
          easing: 'easeOutQuad',
        });

        // Animate tool badges
        anime({
          targets: '.bento__tool',
          scale: [0, 1],
          opacity: [0, 1],
          delay: anime.stagger(40, { start: 500, from: 'center' }),
          duration: 500,
          easing: 'easeOutBack',
        });
      },
    });

    return () => trigger.kill();
  }, []);

  // Mouse tilt on bento cards
  useEffect(() => {
    const cards = document.querySelectorAll('.bento__card');

    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      anime({
        targets: card,
        rotateX,
        rotateY,
        duration: 400,
        easing: 'easeOutQuad',
      });
    };

    const handleMouseLeave = (e) => {
      anime({
        targets: e.currentTarget,
        rotateX: 0,
        rotateY: 0,
        duration: 600,
        easing: 'easeOutElastic(1, .4)',
      });
    };

    cards.forEach((card) => {
      card.style.transformStyle = 'preserve-3d';
      card.style.perspective = '1000px';
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about section">
      <div className="container container--wide">
        <SectionHeading number="01" title="About" subtitle="The narrative behind the code." />

        <div className="bento">
          {BENTO_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`bento__card glass-card bento__card--${item.span}`}
              style={{ '--card-accent': item.accent, opacity: 0 }}
            >
              <div className="bento__card-header">
                <span className="bento__icon">{item.icon}</span>
                <span className="bento__label mono-label">{item.label}</span>
              </div>

              <h3 className="bento__title">{item.title}</h3>

              {item.text && <p className="bento__text">{item.text}</p>}

              {item.list && (
                <ul className="bento__list">
                  {item.list.map((li, i) => (
                    <li key={i} className="bento__list-item" style={{ opacity: 0 }}>
                      <span className="bento__list-bullet" style={{ background: item.accent }} />
                      {li}
                    </li>
                  ))}
                </ul>
              )}

              {item.tools && (
                <div className="bento__tools">
                  {item.tools.map((tool) => (
                    <span key={tool.name} className="bento__tool" style={{ opacity: 0 }}>
                      <span className="bento__tool-icon">{tool.icon}</span>
                      {tool.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Corner accent */}
              <div className="bento__corner" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid-bg" />
    </section>
  );
}
