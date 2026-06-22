import { useEffect, useRef, useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  // Theme (light / dark) state initialization
  const [theme, setTheme] = useState(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('theme') || 'dark' : 'dark';
  });

  // Sync theme with local storage
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`custom-navbar ${scrolled ? 'custom-navbar--scrolled' : ''} ${theme === 'light' ? 'light' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="custom-navbar__inner">
        {/* Left: Brand logo + Notes (desktop) */}
        <div className="custom-navbar__brand">
          <a href="#hero" className="custom-navbar__logo">
            <img src="/favicon.jpg" alt="Logo" className="custom-navbar__logo-img" />
            <span className="custom-navbar__logo-text">Ankur's Page</span>
          </a>
          <a
            href="./docs/intro"
            rel="noopener noreferrer"
            className="custom-navbar__notes-desktop"
          >
            Notes
          </a>
        </div>

        {/* Right: GitHub (desktop), Theme Toggle */}
        <div className="custom-navbar__right">
          <a
            href="https://github.com/ankur3-101106/"
            target="_blank"
            rel="noopener noreferrer"
            className="custom-navbar__github-desktop"
          >
            GitHub <span className="external-arrow">↗</span>
          </a>

          <button onClick={toggleTheme} className="custom-navbar__theme-toggle" aria-label="Toggle Theme">
            {theme === 'light' ? '☾' : '𖤓'}
          </button>
        </div>
      </div>
    </nav>
  );
}
