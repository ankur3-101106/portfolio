import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <span className="footer__logo">
              AM<span className="footer__logo-dot" />
            </span>
            <p className="footer__tagline">
              Security is not a product, but a process.
            </p>
          </div>

          <div className="footer__links">
            <a
              href="https://github.com/ankur3-101106"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/ankur101106"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              LinkedIn
            </a>
            <a href="mailto:ankurdcs101106@gmail.com" className="footer__link">
              Email
            </a>
            <a
              href="https://instagram.com/ankur3_101106"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              Instagram
            </a>
            <a
              href="https://x.com/ankur3_101106"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              X
            </a>
            <a
              href="https://gitlab.com/ankur3-101106"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              GitLab
            </a>
            <a
              href="https://discord.com/users/ankur3_101106"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              Discord
            </a>
          </div>

          <div className="footer__copy">
            <p className="mono-label">
              © {currentYear} Ankur Macwan. Engineered with precision.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative top border */}
      <div className="footer__border" />
    </footer>
  );
}
