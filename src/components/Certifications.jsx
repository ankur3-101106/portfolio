import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from './SectionHeading';
import './Certifications.css';

gsap.registerPlugin(ScrollTrigger);

const CERTIFICATIONS = [
  {
    id: 'ccst-networking',
    title: 'CCST Networking',
    issuer: 'Cisco',
    icon: '🌐',
    category: 'Networking',
    description:
      'Pursuing Cisco Certified Support Technician in Networking — validating expertise in network fundamentals, LAN/WAN, subnetting, OSI model, and enterprise network troubleshooting.',
    color: 'oklch(0.70 0.15 200)',
  },
  {
    id: 'linux-hardening',
    title: 'Linux Hardening',
    issuer: 'Self-Study',
    icon: '🐧',
    category: 'Systems',
    description:
      'Deep study of Linux system hardening techniques — kernel security, firewall configuration, user privilege management, and security-focused system administration on Arch-based systems.',
    color: 'oklch(0.70 0.12 280)',
  },
  {
    id: 'web-app-security',
    title: 'Web Application Security',
    issuer: 'Lab-Based Learning',
    icon: '🔐',
    category: 'Cybersecurity',
    description:
      'Hands-on practice with web application vulnerabilities including SQL injection, cross-site scripting (XSS), CSRF attacks, and secure authentication mechanisms using Burp Suite.',
    color: 'oklch(0.75 0.18 85)',
  },
  {
    id: 'ceh-ejpt',
    title: 'CEH / eJPT',
    issuer: 'Target Certification',
    icon: '🛡️',
    category: 'Pentesting',
    description:
      'Preparing for Certified Ethical Hacker (CEH) and eLearnSecurity Junior Penetration Tester (eJPT) certifications — covering reconnaissance, exploitation, post-exploitation, and CTF challenges.',
    color: 'oklch(0.70 0.18 30)',
  },
];

function CertCard({ cert, index }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`cert-card ${isFlipped ? 'cert-card--flipped' : ''}`}
      style={{ '--cert-color': cert.color, '--cert-index': index }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onFocus={() => setIsFlipped(true)}
      onBlur={() => setIsFlipped(false)}
      tabIndex={0}
      role="button"
      aria-label={`${cert.title} by ${cert.issuer}. ${cert.description}`}
    >
      <div className="cert-card__inner">
        {/* Front */}
        <div className="cert-card__front glass-card">
          <div className="cert-card__icon">{cert.icon}</div>
          <span className="cert-card__category mono-label">{cert.category}</span>
          <h3 className="cert-card__title">{cert.title}</h3>
          <p className="cert-card__issuer">{cert.issuer}</p>

          {/* Decorative border glow */}
          <div className="cert-card__border-glow" />
        </div>

        {/* Back */}
        <div className="cert-card__back glass-card">
          <div className="cert-card__back-header">
            <span className="cert-card__icon cert-card__icon--small">{cert.icon}</span>
            <span className="mono-label">{cert.issuer}</span>
          </div>
          <p className="cert-card__description">{cert.description}</p>
          <div className="cert-card__verified">
            <span className="cert-card__verified-icon">✓</span>
            <span>Verified Credential</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Certifications() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.cert-card');
      gsap.from(cards, {
        opacity: 0,
        y: 60,
        scale: 0.85,
        stagger: 0.12,
        duration: 0.7,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.cert-grid',
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="certifications section">
      <div className="container">
        <SectionHeading
          number="04"
          title="Certifications"
          subtitle="Industry-recognized credentials that validate expertise."
        />

        <div className="cert-grid">
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>

      <div className="grid-bg" />
    </section>
  );
}
