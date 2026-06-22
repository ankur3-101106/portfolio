import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from './SectionHeading';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    id: 'cybersecurity-labs',
    role: 'Cybersecurity Researcher',
    company: 'Self-Directed Labs',
    period: '2024 — Present',
    side: 'left',
    description:
      'Building a structured repository of cybersecurity notes and hands-on labs. Practicing penetration testing methodologies, vulnerability assessment, and SOC workflows through practical exercises.',
    achievements: [
      'Structured comprehensive cybersecurity notes & lab documentation',
      'Practiced web security attacks — SQLi, XSS, CSRF',
      'Traffic analysis & packet inspection with Wireshark',
    ],
    tags: ['Pentesting', 'Wireshark', 'Nmap', 'Burp Suite', 'Metasploit'],
  },
  {
    id: 'python-security',
    role: 'Security Tool Developer',
    company: 'Open Source',
    period: '2024 — Present',
    side: 'right',
    description:
      'Developing Python-based security automation tools for analysis and reconnaissance. Building Bash scripts for Linux hardening and system configuration, combining scripting skills with security principles.',
    achievements: [
      'Built Python automation & analysis scripts for security tasks',
      'Created Bash scripts for Linux hardening & performance tuning',
      'Practiced networking fundamentals — subnetting, OSI, packet analysis',
    ],
    tags: ['Python', 'Bash', 'Automation', 'Linux', 'Networking'],
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Animate the central timeline line
      gsap.from(lineRef.current, {
        scaleY: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
        },
      });

      // Animate each card
      const cards = gsap.utils.toArray('.timeline__card');
      cards.forEach((card) => {
        const isLeft = card.classList.contains('timeline__card--left');
        gsap.from(card, {
          opacity: 0,
          x: isLeft ? -80 : 80,
          scale: 0.92,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Animate timeline dots
      const dots = gsap.utils.toArray('.timeline__dot');
      dots.forEach((dot) => {
        gsap.from(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: dot,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="experience section">
      <div className="container">
        <SectionHeading
          number="02"
          title="Experience"
          subtitle="Building the future, one project at a time."
        />

        <div className="timeline">
          {/* Central line */}
          <div className="timeline__line-wrapper">
            <div ref={lineRef} className="timeline__line" />
          </div>

          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="timeline__item">
              <div className="timeline__dot">
                <span className="timeline__dot-inner" />
              </div>

              <div className={`timeline__card timeline__card--${exp.side} glass-card`}>
                <div className="timeline__card-header">
                  <span className="mono-label">{exp.period}</span>
                  <h3 className="timeline__role">{exp.role}</h3>
                  <p className="timeline__company">
                    @ <span className="glow-text">{exp.company}</span>
                  </p>
                </div>

                <p className="timeline__description">{exp.description}</p>

                <ul className="timeline__achievements">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="timeline__achievement">
                      <span className="timeline__achievement-icon">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="timeline__tags">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="badge">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-bg" />
    </section>
  );
}
