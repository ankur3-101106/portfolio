import { useEffect, useRef, useState, useCallback } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { gsap } from 'gsap';
import emailjs from '@emailjs/browser';
import MatrixRain from './MatrixRain';
import useTextScramble from '../hooks/useTextScramble';
import './Hero.css';

const HERO_NAME = 'ANKUR-MACWAN';
const TYPING_LINES = [
  { command: 'whoami', delay: 80 },
  { command: 'cat /etc/profile | head -3', delay: 160 },
  { command: 'nmap -sV portfolio.ankur.dev', delay: 240 },
];

const SKILL_TAGS = [
  { label: 'Pentesting', icon: '🔓' },
  { label: 'Linux', icon: '🐧' },
  { label: 'Networking', icon: '🌐' },
  { label: 'Python', icon: '🐍' },
  { label: 'Bash', icon: '⚡' },
  { label: 'Wireshark', icon: '🦈' },
];

/* ── EmailJS config ── */
const SERVICE_ID = 'service_qevelsu';
const TEMPLATE_ID = 'template_wime712';
const PUBLIC_KEY = 'kCGt5u2Dec5LkConG';

/* ── Arch neofetch ASCII art ── */
const ARCH_LOGO = [
  '                   -`                 ',
  '                  .o+`                ',
  '                 `ooo/                ',
  '                `+oooo:               ',
  '               `+oooooo:              ',
  '               -+oooooo+:             ',
  '             `/:-:++oooo+:            ',
  '            `/++++/+++++++:           ',
  '           `/++++++++++++++:          ',
  '          `/+++ooooooooooooo/`        ',
  '         ./ooosssso++osssssso+`       ',
  '        .oossssso-````/ossssss+`      ',
  '       -osssssso.      :ssssssso.     ',
  '      :osssssss/        osssso+++.    ',
  '     /ossssssss/sssssssss\\ssssooo/-    ',
  '   `/ossssso+/:-        -:/+osssso+-  ',
  '  `+sso+:-`                 `.-/+oso: ',
  ' `++:.                           `-/+/',
  ' .`                                 `/',
];

const NEOFETCH_INFO = [
  { label: '', value: 'ankur@arch', type: 'title' },
  { label: '', value: '──────────', type: 'separator' },
  { label: 'OS', value: 'Ankur OS x96_69' },
  { label: 'Kernel', value: '7.2.7-archy-1' },
  { label: 'Shell', value: 'bash 2.11' },
  { label: 'WM', value: 'Hyprland' },
  { label: 'Terminal', value: 'Alacritty' },
  { label: 'Theme', value: 'Catppuccin-Mocha [GTK3]' },
  { label: 'Icons', value: 'Papirus-Dark' },
  { label: 'CPU', value: 'AMD EPYC 9965' },
  { label: 'Memory', value: '8.2 PiB / 32 PiB' },
];

const HELP_TEXT = `Available commands:
  help           — Show this help menu
  about          — Who I am
  neofetch       — Show system info
  projects       — List projects
  certifications — View certifications
  contact        — Social links & email
  connect        — Send me a message (emailjs)
  clear          — Clear terminal`;

export default function Hero() {
  const sectionRef = useRef(null);
  const terminalRef = useRef(null);
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);
  const skillsRef = useRef(null);
  const [showTerminal, setShowTerminal] = useState(false);
  const [typedLines, setTypedLines] = useState([]);
  const [showNeofetch, setShowNeofetch] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  /* ── Interactive terminal state ── */
  const [interactiveReady, setInteractiveReady] = useState(false);
  const [cmdLines, setCmdLines] = useState([]);
  const [cmdInput, setCmdInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectStep, setConnectStep] = useState(0);
  const [connectData, setConnectData] = useState({ name: '', email: '', message: '' });

  const { text: scrambledName, isComplete: nameRevealed } = useTextScramble(HERO_NAME, {
    speed: 25,
    delay: 200,
  });

  // ── Initial typewriter animation ──
  useEffect(() => {
    if (!nameRevealed || !startTyping) return;

    const timeouts = [];
    setShowTerminal(true);

    // Show neofetch first
    const neoTimeout = setTimeout(() => setShowNeofetch(true), 300);
    timeouts.push(neoTimeout);

    TYPING_LINES.forEach((line) => {
      const t = setTimeout(() => {
        setTypedLines((prev) => [...prev, line]);
      }, line.delay + 600);
      timeouts.push(t);
    });

    // After all initial lines finish, enable interactive mode
    const readyTimeout = setTimeout(() => {
      setInteractiveReady(true);
      setCmdLines([{ type: 'system', text: '  Type "help" for available commands.' }]);
    }, TYPING_LINES[TYPING_LINES.length - 1].delay + 2100);
    timeouts.push(readyTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, [nameRevealed, startTyping]);

  // ── Auto-scroll terminal body ──
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [cmdLines, typedLines]);

  // ── Anime.js animations ──
  useEffect(() => {
    const skillTimeout = setTimeout(() => {
      anime({
        targets: '.hero__skill-tag',
        translateY: [40, 0],
        opacity: [0, 1],
        scale: [0.7, 1],
        delay: anime.stagger(80, { start: 0 }),
        duration: 800,
        easing: 'easeOutElastic(1, .6)',
      });
    }, 1200);

    anime({
      targets: '.hero__status-badge',
      translateX: [-60, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: 400,
      easing: 'easeOutExpo',
    });

    anime({
      targets: '.hero__scan-line',
      translateY: ['0%', '100%'],
      opacity: [0.6, 0],
      duration: 2000,
      delay: 600,
      easing: 'linear',
      loop: true,
      direction: 'normal',
    });

    anime({
      targets: '.hero__orbit-ring',
      rotate: '1turn',
      duration: (el, i) => 20000 + i * 8000,
      easing: 'linear',
      loop: true,
    });

    return () => clearTimeout(skillTimeout);
  }, []);

  // ── Parallax and Terminal Entry Scroll Animations (GSAP) ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero__content', {
        y: -60,
        opacity: 0.8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Terminal entry animation (hence and forth motion bound to scroll)
      gsap.fromTo(terminalRef.current,
        {
          opacity: 0,
          y: 120,
          scale: 0.9,
          rotationX: 10,
          transformOrigin: "center top",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: terminalRef.current,
            start: "top bottom-=80px",
            end: "top 30%",
            scrub: 1,
            onEnter: () => setStartTyping(true),
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ── Mouse parallax ──
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 30;
      const y = (clientY / window.innerHeight - 0.5) * 30;

      anime({
        targets: '.matrix-rain',
        translateX: x * 0.3,
        translateY: y * 0.3,
        duration: 1500,
        easing: 'easeOutQuad',
      });

      anime({
        targets: '.hero__orbit-ring',
        translateX: x * 0.15,
        translateY: y * 0.15,
        duration: 2000,
        easing: 'easeOutQuad',
      });
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, []);

  /* ════════════════════════════════════════
     Interactive Terminal Logic
     ════════════════════════════════════════ */

  const pushLine = useCallback((text, type = 'output') => {
    setCmdLines((prev) => [...prev, { type, text }]);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const cmd = cmdInput.trim();
    if (!cmd) return;

    // Show the full starship prompt with the typed command
    pushLine(cmd, 'command');
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setCmdInput('');

    if (isConnecting) {
      handleConnectInput(cmd);
    } else {
      runCommand(cmd);
    }
  }

  function handleConnectInput(raw) {
    const val = raw.trim();

    if (val.toLowerCase() === 'cancel') {
      setIsConnecting(false);
      setConnectStep(0);
      setConnectData({ name: '', email: '', message: '' });
      pushLine('  Connect cancelled.', 'system');
      return;
    }

    if (connectStep === 0) {
      setConnectData((d) => ({ ...d, name: val }));
      pushLine(`  ✓ Name set: ${val}`, 'success');
      pushLine('  Enter your email:', 'system');
      setConnectStep(1);
    } else if (connectStep === 1) {
      if (!val.includes('@')) {
        pushLine('  ✗ Invalid email format. Try again:', 'error');
        return;
      }
      setConnectData((d) => ({ ...d, email: val }));
      pushLine(`  ✓ Email set: ${val}`, 'success');
      pushLine('  Enter your message:', 'system');
      setConnectStep(2);
    } else if (connectStep === 2) {
      const finalData = { ...connectData, message: val };
      pushLine('  Sending message...', 'system');

      emailjs
        .send(SERVICE_ID, TEMPLATE_ID, {
          from_name: finalData.name,
          from_email: finalData.email,
          message: finalData.message,
        }, PUBLIC_KEY)
        .then(() => {
          pushLine('  ✓ Message sent successfully. Thank you!', 'success');
          setIsConnecting(false);
          setConnectStep(0);
          setConnectData({ name: '', email: '', message: '' });
        })
        .catch((err) => {
          pushLine(`  ✗ Failed: ${err.text || err.message || 'Unknown error'}`, 'error');
          setIsConnecting(false);
          setConnectStep(0);
          setConnectData({ name: '', email: '', message: '' });
        });
    }
  }

  function runCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();

    switch (cmd) {
      case 'help':
        pushLine(HELP_TEXT, 'info');
        break;

      case 'about':
        pushLine("  Hi, I'm Ankur — penetration tester & network security enthusiast.", 'info');
        pushLine('  Daily Arch Linux user │ CTF Player │ Hands-on Learner', 'info');
        pushLine('  Type \"projects\" to see my work or \"certs\" to see certifications.', 'system');
        break;

      case 'neofetch':
        // Re-render neofetch inline
        pushLine('__NEOFETCH__', 'neofetch');
        break;

      case 'projects':
        pushLine('  ┌─── Projects ──────────────────────────────────────┐', 'info');
        pushLine('  │  🐧  Linux Hardening Toolkit                     │', 'info');
        pushLine('  │      Automated system hardening (Bash + Python)   │', 'diminfo');
        pushLine('  │  🔍  Network Security Analyzer                   │', 'info');
        pushLine('  │      Real-time traffic analysis & anomaly detect  │', 'diminfo');
        pushLine('  └──────────────────────────────────────────────────┘', 'info');
        break;

      case 'certifications':
      case 'certs':
        pushLine('  ┌─── Certifications ───────────────────────────────┐', 'info');
        pushLine('  │  🌐  CCST Networking — Cisco                     │', 'info');
        pushLine('  │  🐧  Linux Hardening — Self-Study                │', 'info');
        pushLine('  │  🔐  Web Application Security — Lab-Based        │', 'info');
        pushLine('  │  🛡️  CEH / eJPT — Target Certification           │', 'info');
        pushLine('  └──────────────────────────────────────────────────┘', 'info');
        break;

      case 'contact':
        pushLine('  ┌─── Contact ──────────────────────────────────────┐', 'info');
        pushLine('  │  📧  ankurdcs101106@gmail.com                    │', 'info');
        pushLine('  │  🐙  github.com/ankur3-101106                    │', 'info');
        pushLine('  │  🔗  linkedin.com/in/ankur101106                 │', 'info');
        pushLine('  │  🦊  gitlab.com/ankur3-101106                    │', 'info');
        pushLine('  └──────────────────────────────────────────────────┘', 'info');
        pushLine('  Type \"connect\" to send me a message directly.', 'system');
        break;

      case 'connect':
        pushLine('  Starting connect wizard...', 'system');
        pushLine('  Enter your name (or type \"cancel\" to abort):', 'system');
        setIsConnecting(true);
        setConnectStep(0);
        break;

      case 'clear':
        setCmdLines([
          { type: 'system', text: '  Terminal cleared. Type \"help\" for commands.' },
        ]);
        break;

      default:
        pushLine(`  zsh: command not found: ${cmdRaw}`, 'error');
        pushLine('  Type \"help\" to see available commands.', 'system');
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCmdInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCmdInput('');
        } else {
          setHistoryIndex(newIndex);
          setCmdInput(commandHistory[newIndex]);
        }
      }
    }
  }

  return (
    <section id="hero" ref={sectionRef} className="hero section section--full">
      <MatrixRain />

      {/* Orbiting decoration rings */}
      <div className="hero__orbits" aria-hidden="true">
        <div className="hero__orbit-ring hero__orbit-ring--1" />
        <div className="hero__orbit-ring hero__orbit-ring--2" />
        <div className="hero__orbit-ring hero__orbit-ring--3" />
      </div>

      {/* Scan line effect */}
      <div className="hero__scan-line" aria-hidden="true" />

      <div className="hero__content">
        {/* Split layout: Left info, Right terminal */}
        <div className="hero__layout">
          {/* ── LEFT COLUMN ── */}
          <div className="hero__left">
            <div className="hero__status-badge mono-label">
              <span className="hero__status-dot" />
              <span>System Active</span>
              <span className="hero__status-separator">|</span>
              <span className="hero__status-role">Cybersecurity Student</span>
            </div>

            <h1 className="hero__name" aria-label={HERO_NAME}>
              {scrambledName.split('').map((char, i) => (
                <span
                  key={i}
                  className={`hero__char ${nameRevealed ? 'hero__char--resolved' : 'hero__char--glitch'
                    }`}
                  style={{ '--char-i': i }}
                >
                  {char}
                </span>
              ))}
            </h1>

            <p className="hero__subtitle">
              <span className="hero__subtitle-line">
                <span className="hero__subtitle-accent">Offensive Security</span>
                <span className="hero__subtitle-divider">·</span>
                🐧 Linux
                <span className="hero__subtitle-divider">·</span>
                <span className="hero__subtitle-accent">Networking</span>
              </span>
            </p>

            <div ref={skillsRef} className="hero__skills">
              {SKILL_TAGS.map((tag) => (
                <span key={tag.label} className="hero__skill-tag" style={{ opacity: 0 }}>
                  <span className="hero__skill-icon">{tag.icon}</span>
                  {tag.label}
                </span>
              ))}
            </div>

            <p className="hero__quote">
              &ldquo;Security is not a product, but a process.&rdquo;
            </p>
          </div>

          {/* ════════════════════════════════════════
              RIGHT COLUMN: Arch Terminal
              ════════════════════════════════════════ */}
          <div
            ref={terminalRef}
            className="arch-term"
          >
            {/* ── Terminal Chrome Header ── */}
            <div className="arch-term__header">
              <div className="arch-term__controls">
                <span className="arch-term__ctrl arch-term__ctrl--close" />
                <span className="arch-term__ctrl arch-term__ctrl--min" />
                <span className="arch-term__ctrl arch-term__ctrl--max" />
              </div>
              <div className="arch-term__tabs">
                <div className="arch-term__tab arch-term__tab--active">
                  <span className="arch-term__tab-icon">⬢</span>
                  <span>ankur@arch: ~</span>
                </div>
                <div className="arch-term__tab">
                  <span className="arch-term__tab-icon">+</span>
                </div>
              </div>
              {isConnecting && (
                <span className="arch-term__connect-badge">● CONNECT</span>
              )}
            </div>

            {/* ── Terminal Body ── */}
            <div className="arch-term__body" ref={terminalBodyRef}>

              {/* ── Neofetch ── */}
              {showNeofetch && (
                <div className="arch-term__neofetch">
                  <div className="arch-term__neofetch-logo" aria-hidden="true">
                    {ARCH_LOGO.map((line, i) => (
                      <div key={i} className="arch-term__logo-line">{line}</div>
                    ))}
                  </div>
                  <div className="arch-term__neofetch-info">
                    {NEOFETCH_INFO.map((item, i) => (
                      <div key={i} className={`arch-term__info-row ${item.type ? `arch-term__info-row--${item.type}` : ''}`}>
                        {item.label ? (
                          <>
                            <span className="arch-term__info-label">{item.label}</span>
                            <span className="arch-term__info-sep">:</span>
                            <span className="arch-term__info-value">{item.value}</span>
                          </>
                        ) : (
                          <span className={item.type === 'title' ? 'arch-term__info-title' : 'arch-term__info-separator'}>
                            {item.value}
                          </span>
                        )}
                      </div>
                    ))}
                    {/* Color palette dots */}
                    <div className="arch-term__color-bar">
                      <span className="arch-term__color-dot" style={{ '--c': '#f38ba8' }} />
                      <span className="arch-term__color-dot" style={{ '--c': '#fab387' }} />
                      <span className="arch-term__color-dot" style={{ '--c': '#f9e2af' }} />
                      <span className="arch-term__color-dot" style={{ '--c': '#a6e3a1' }} />
                      <span className="arch-term__color-dot" style={{ '--c': '#89b4fa' }} />
                      <span className="arch-term__color-dot" style={{ '--c': '#cba6f7' }} />
                      <span className="arch-term__color-dot" style={{ '--c': '#f5c2e7' }} />
                      <span className="arch-term__color-dot" style={{ '--c': '#cdd6f4' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* ── Initial animated lines with Starship prompt ── */}
              {typedLines.map((line, i) => (
                <div key={`init-${i}`} className="arch-term__cmd-block">
                  <StarshipPrompt />
                  <div className="arch-term__cmd-line">
                    <TypewriterText text={line.command} speed={40} />
                  </div>
                </div>
              ))}

              {typedLines.length >= 1 && (
                <div className="arch-term__output">
                  <span className="arch-term__out-result">ankur-macwan</span>
                </div>
              )}

              {typedLines.length >= 2 && (
                <div className="arch-term__output">
                  <span className="arch-term__out-comment"># Cybersecurity Student</span>
                  <br />
                  <span className="arch-term__out-comment"># Arch Linux · Pentester · Networker</span>
                  <br />
                  <span className="arch-term__out-comment"># Fast learner · Labs {'>'} Theory</span>
                </div>
              )}

              {typedLines.length >= 3 && (
                <div className="arch-term__output arch-term__output--scan">
                  <span className="arch-term__out-success">PORT&nbsp;&nbsp;&nbsp;&nbsp;STATE&nbsp;&nbsp;SERVICE</span>
                  <br />
                  <span className="arch-term__out-success">443/tcp open&nbsp;&nbsp;https ✓</span>
                  <br />
                  <span className="arch-term__out-success">22/tcp&nbsp;&nbsp;open&nbsp;&nbsp;ssh ✓</span>
                  <br />
                  <span className="arch-term__out-warn">All systems secured.</span>
                </div>
              )}

              {/* ── Interactive command output ── */}
              {cmdLines.map((line, i) => {
                if (line.type === 'command') {
                  return (
                    <div key={`cmd-${i}`} className="arch-term__cmd-block">
                      <StarshipPrompt />
                      <div className="arch-term__cmd-line">
                        <span className="arch-term__typed-cmd">{line.text}</span>
                      </div>
                    </div>
                  );
                }
                if (line.type === 'neofetch') {
                  return (
                    <div key={`cmd-${i}`} className="arch-term__neofetch arch-term__neofetch--inline">
                      <div className="arch-term__neofetch-logo" aria-hidden="true">
                        {ARCH_LOGO.map((l, j) => (
                          <div key={j} className="arch-term__logo-line">{l}</div>
                        ))}
                      </div>
                      <div className="arch-term__neofetch-info">
                        {NEOFETCH_INFO.map((item, j) => (
                          <div key={j} className={`arch-term__info-row ${item.type ? `arch-term__info-row--${item.type}` : ''}`}>
                            {item.label ? (
                              <>
                                <span className="arch-term__info-label">{item.label}</span>
                                <span className="arch-term__info-sep">:</span>
                                <span className="arch-term__info-value">{item.value}</span>
                              </>
                            ) : (
                              <span className={item.type === 'title' ? 'arch-term__info-title' : 'arch-term__info-separator'}>
                                {item.value}
                              </span>
                            )}
                          </div>
                        ))}
                        <div className="arch-term__color-bar">
                          <span className="arch-term__color-dot" style={{ '--c': '#f38ba8' }} />
                          <span className="arch-term__color-dot" style={{ '--c': '#fab387' }} />
                          <span className="arch-term__color-dot" style={{ '--c': '#f9e2af' }} />
                          <span className="arch-term__color-dot" style={{ '--c': '#a6e3a1' }} />
                          <span className="arch-term__color-dot" style={{ '--c': '#89b4fa' }} />
                          <span className="arch-term__color-dot" style={{ '--c': '#cba6f7' }} />
                          <span className="arch-term__color-dot" style={{ '--c': '#f5c2e7' }} />
                          <span className="arch-term__color-dot" style={{ '--c': '#cdd6f4' }} />
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={`cmd-${i}`} className={`arch-term__line arch-term__line--${line.type}`}>
                    <pre>{line.text}</pre>
                  </div>
                );
              })}

              {/* ── Blinking cursor (only before interactive mode) ── */}
              {!interactiveReady && showNeofetch && (
                <div className="arch-term__cursor-idle">
                  <StarshipPrompt />
                  <span className="arch-term__blink">▋</span>
                </div>
              )}
            </div>

            {/* ── Interactive input row (Starship prompt) ── */}
            {interactiveReady && (
              <form onSubmit={handleSubmit} className="arch-term__input-row">
                <StarshipPrompt compact />
                <input
                  ref={inputRef}
                  value={cmdInput}
                  onChange={(e) => setCmdInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="arch-term__input"
                  spellCheck="false"
                  autoComplete="off"
                  placeholder="type a command..."
                  aria-label="Terminal command input"
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Starship-style Prompt ── */
function StarshipPrompt({ compact }) {
  return (
    <div className={`starship ${compact ? 'starship--compact' : ''}`}>
      <span className="starship__seg starship__seg--user">
        ankur@arch
      </span>
      <span className="starship__arrow starship__arrow--user" />
      <span className="starship__seg starship__seg--dir">
        ~/portfolio
      </span>
      <span className="starship__arrow starship__arrow--dir" />
      <span className="starship__seg starship__seg--git">
        main
      </span>
      <span className="starship__arrow starship__arrow--git" />
      <span className="starship__char">❯</span>
    </div>
  );
}

/* ── Typewriter sub-component ── */
function TypewriterText({ text, speed = 50 }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span className="arch-term__typed-cmd">{displayed}</span>;
}
