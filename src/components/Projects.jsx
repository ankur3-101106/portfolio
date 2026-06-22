import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from './SectionHeading';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 'linux-hardening',
    title: 'Linux Hardening Toolkit',
    subtitle: 'System Security',
    description:
      'A comprehensive Bash & Python toolkit for automated Linux system hardening. Includes firewall configuration, user privilege auditing, service hardening, and security benchmarks aligned with CIS standards.',
    tags: ['Bash', 'Python', 'Linux', 'Firewall', 'CIS Benchmarks'],
    icon: '🐧',
    accentColor: 'oklch(0.75 0.15 200)',
    features: ['Automated system hardening', 'Firewall & service auditing', 'CIS benchmark compliance'],
  },
  {
    id: 'network-analyzer',
    title: 'Network Security Analyzer',
    subtitle: 'Traffic Analysis',
    description:
      'A Python-based network security tool for real-time traffic analysis and anomaly detection. Integrates with Wireshark captures for deep packet inspection and generates comprehensive security reports.',
    tags: ['Python', 'Wireshark', 'Nmap', 'Networking', 'Packet Analysis'],
    icon: '🔍',
    accentColor: 'oklch(0.65 0.20 25)',
    features: ['Real-time traffic monitoring', 'Anomaly detection', 'Security report generation'],
  },
];

function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out',
    });

    if (glow) {
      gsap.to(glow, {
        x: x - 150,
        y: y - 150,
        opacity: 1,
        duration: 0.3,
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out',
    });

    if (glow) {
      gsap.to(glow, {
        opacity: 0,
        duration: 0.4,
      });
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card glass-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--project-accent': project.accentColor }}
    >
      {/* Glow follow effect */}
      <div ref={glowRef} className="project-card__glow" />

      <div className="project-card__header">
        <span className="project-card__icon">{project.icon}</span>
        <div>
          <span className="mono-label" style={{ color: project.accentColor }}>
            {project.subtitle}
          </span>
          <h3 className="project-card__title">{project.title}</h3>
        </div>
      </div>

      <p className="project-card__description">{project.description}</p>

      <ul className="project-card__features">
        {project.features.map((feature, i) => (
          <li key={i} className="project-card__feature">
            <span className="project-card__feature-dot" style={{ background: project.accentColor }} />
            {feature}
          </li>
        ))}
      </ul>

      <div className="project-card__tags">
        {project.tags.map((tag) => (
          <span key={tag} className="badge">
            {tag}
          </span>
        ))}
      </div>

      {/* Corner decoration */}
      <div className="project-card__corner project-card__corner--tl" />
      <div className="project-card__corner project-card__corner--br" />
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card');
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          scale: 0.92,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="projects section">
      <div className="container">
        <SectionHeading
          number="03"
          title="Projects"
          subtitle="The proof is in the code. Real-world security solutions."
        />

        <div className="projects__grid">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <div className="grid-bg" />
    </section>
  );
}
