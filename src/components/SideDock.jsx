import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SideDock.css';

gsap.registerPlugin(ScrollTrigger);

const DOCK_ITEMS = [
  {
    id: 'hero',
    label: 'Home',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'about',
    label: 'About',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
  },
  {
    id: 'certifications',
    label: 'Certifications',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function SideDock() {
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState('dark');

  // Initialize theme from storage or class list
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track local storage theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    const observer = new MutationObserver(() => {
      const isLight = document.querySelector('.custom-navbar')?.classList.contains('light');
      setTheme(isLight ? 'light' : 'dark');
    });

    const navEl = document.querySelector('.custom-navbar');
    if (navEl) {
      observer.observe(navEl, { attributes: true, attributeFilter: ['class'] });
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Scroll spy for active section
    const triggers = DOCK_ITEMS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: 'top 40%',
        end: 'bottom 40%',
        onToggle: (self) => {
          if (self.isActive) setActiveSection(id);
        },
      });
    }).filter(Boolean);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const handleDockClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`side-dock ${theme === 'light' ? 'side-dock--light' : ''}`} role="navigation" aria-label="Quick links">
      <div className="side-dock__container">
        {DOCK_ITEMS.map(({ id, label, icon }) => {
          const isActive = activeSection === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              className={`side-dock__item ${isActive ? 'side-dock__item--active' : ''}`}
              onClick={(e) => handleDockClick(e, id)}
              aria-label={label}
            >
              {/* Linux Ubuntu style running app indicator dot */}
              <span className={`side-dock__indicator ${isActive ? 'side-dock__indicator--active' : ''}`} />
              <div className="side-dock__icon-wrapper">{icon}</div>
              <span className="side-dock__tooltip">{label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
