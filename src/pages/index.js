import React, { useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { gsap } from 'gsap';
import emailjs from '@emailjs/browser';

import Heading from '@theme/Heading';
import styles from './index.module.css';



function Hero() {
  return (
    <header className={clsx('hero ', styles.heroBanner)}>
      <div className="container">
        <Heading
          as="h1"
          className="hero__title floating-title"
        >  Hi, I'm Ankur 👋
        </Heading>
        <p className="hero__subtitle">
          Penetration Tester | Network Administrator | Network Security
        </p>

        {/* <div className={styles.buttons}>
          <a className="button button--secondary button--lg" href="#projects">
            View My Work
          </a>
          <a className="button button--outline button--lg" href="/resume.pdf">
            Download Resume
          </a>
        </div> */}
      </div>
    </header>
  );
}

function About() {
  return (
    <section className="container margin-vert--lg">
      <Heading as="h2">About Me</Heading>
      <p>
        I’m passionate about cybersecurity and the challenge of securing modern digital systems.
        From exploring vulnerabilities to analyzing threats, I focus on understanding how attacks happen and how they can be prevented.
        I enjoy hands-on learning through practical labs, tools, and real-world scenarios.
        My goal is to build systems that are not just functional, but resilient, secure, and prepared for the unexpected.
      </p>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="container margin-vert--lg">
      <Heading as="h2">Projects</Heading>

      <div className="row">
        <div className="col col--4">
          <div className="card">
            <div className="card__body">
              <h3>Project One</h3>
              <p>Short description of your project.</p>
            </div>
            <div className="card__footer">
              <a href="https://github.com/ankur3-101106">GitHub</a>
            </div>
          </div>
        </div>

        <div className="col col--4">
          <div className="card">
            <div className="card__body">
              <h3>Project Two</h3>
              <p>Another cool thing you built.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="container margin-vert--lg">
      <Heading as="h2">Contact</Heading>

      <p className="social-icons">
        <a href="https://instagram.com/ankur3_101106">
          <img src="https://skillicons.dev/icons?i=instagram" />
        </a>
        <a href="https://x.com/ankur3_101106">
          <img src="https://skillicons.dev/icons?i=twitter" />
        </a>
        <a href="mailto:ankurdcs101106@gmail.com">
          <img src="https://skillicons.dev/icons?i=gmail" />
        </a>
        <a href="https://linkedin.com/in/ankur101106">
          <img src="https://skillicons.dev/icons?i=linkedin" />
        </a>
        <a href="https://github.com/ankur3-101106">
          <img src="https://skillicons.dev/icons?i=github" />
        </a>
        <a href="https://gitlab.com/ankur3-101106">
          <img src="https://skillicons.dev/icons?i=gitlab" />
        </a>
        <a href="https://discord.com/users/ankur3_101106">
          <img src="https://skillicons.dev/icons?i=discord" />
        </a>
      </p>
    </section>
  );
}

// Full-screen Matrix-style canvas background, interactive with cursor + scroll
function ThreeAnimations() {
  const containerRef = React.useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-9999';
    canvas.style.opacity = '1';
    canvas.style.pointerEvents = 'none';
    // append to body so canvas sits behind page content reliably
    document.body.appendChild(canvas);

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*()[]{}<>/\\|~';
    const drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * height));

    // mouse influence
    let mouse = { x: -9999, y: -9999 };
    function onMove(e){ mouse.x = e.clientX; mouse.y = e.clientY; }
    function onLeave(){ mouse.x = -9999; mouse.y = -9999; }

    // scroll influence (affects speed/density)
    function onScroll(){ scrollT = document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight) || 0; }
    let scrollT = 0;

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('scroll', onScroll);

    function resize(){
      width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops.length = columns;
      for (let i=0;i<columns;i++) drops[i] = Math.floor(Math.random()*height);
    }
    window.addEventListener('resize', resize);

    ctx.fillStyle = '#000'; ctx.fillRect(0,0,width,height);

    let rafId;
    function draw(){
      // clear each frame (avoid dimming foreground by not drawing a dark overlay)
      ctx.clearRect(0,0,width,height);

      ctx.font = `${fontSize}px monospace`;
      for (let i=0;i<columns;i++){
        const x = i * fontSize;
        // adapt speed by distance to cursor
        const cx = mouse.x === -9999 ? 9999 : Math.abs(mouse.x - x);
        const proximity = Math.max(0, 1 - (cx / 400));
        const speed = 1 + proximity * 20 + scrollT * 12; // faster near cursor and on scroll
        // choose char
        const text = chars.charAt(Math.floor(Math.random()*chars.length));
        const y = drops[i] * fontSize;
        // brightness based on proximity
        const green = Math.floor(60 + proximity * 80);
        const alpha = Math.max(0.12, 0.28 - scrollT * 0.18);
        ctx.fillStyle = `rgba(0,${green},0,${alpha})`;
        ctx.fillText(text, x, y);
        drops[i] += speed/ fontSize;
        if (drops[i]*fontSize > height && Math.random() > 0.98) drops[i] = 0;
      }

      rafId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" />;
}

// Minimal Starship-style terminal emulator (real terminal behavior)
function TerminalEmulator() {
  React.useEffect(()=>{
    const id = 'jetbrains-mono-font';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const [lines, setLines] = React.useState([]); // history
  const [input, setInput] = React.useState('');
  const [isConnecting, setIsConnecting] = React.useState(false);
  const [connectData, setConnectData] = React.useState({ name: '', email: '', message: '' });
  const bottomRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const serviceID = 'service_qevelsu';
  const templateID = 'template_wime712';
  const publicKey = 'kCGt5u2Dec5LkConG';

  React.useEffect(() => { if (bottomRef.current) bottomRef.current.scrollIntoView({behavior:'smooth'}); }, [lines]);

  function pushLine(text){ setLines(l=>[...l, text]); }

  function handleEnter(e){
    e.preventDefault();
    const cmdRaw = input;
    const cmd = cmdRaw.trim();
    if (!cmd) return;
    // append prompt + command to history
    pushLine('ankur@starship:~$ ' + cmd);
    setInput('');
    runCommand(cmdRaw);
    // keep focus
    setTimeout(()=>{ inputRef.current && inputRef.current.focus(); }, 10);
  }

  function runCommand(cmdRaw){
    const cmd = cmdRaw.trim().toLowerCase();
    if (isConnecting && cmd !== 'cancel') { pushLine('Type cancel to abort connect process.'); return; }
    switch (true) {
      case cmd === 'help':
        pushLine('Available commands: help, about, projects, certifications, contact, connect');
        break;
      case cmd === 'about':
        pushLine('Hi, I\'m Ankur — penetration tester and network security enthusiast.');
        pushLine('Use "projects" to list projects and "certifications" to see certs.');
        break;
      case cmd === 'projects':
        pushLine('Projects:');
        pushLine('- Project One: description');
        pushLine('- Project Two: description');
        break;
      case cmd === 'certifications':
        pushLine('Certifications:');
        pushLine('- Certified Ethical Hacker (CEH)');
        pushLine('- CompTIA Security+');
        break;
      case cmd === 'contact':
        pushLine('Email: ankurdcs101106@gmail.com');
        pushLine('GitHub: github.com/ankur3-101106');
        break;
      case cmd === 'connect':
        pushLine('Starting connect. You can type cancel anytime.');
        setIsConnecting(true);
        pushLine('Enter your name (type: name Your Name)');
        break;
      default:
        if (cmd.startsWith('name ')){
          const val = cmdRaw.substring(5).trim(); setConnectData(d=>({ ...d, name: val })); pushLine('Name set to: ' + val); return;
        }
        if (cmd.startsWith('email ')){
          const val = cmdRaw.substring(6).trim(); setConnectData(d=>({ ...d, email: val })); pushLine('Email set to: ' + val); return;
        }
        if (cmd.startsWith('message ')){
          const val = cmdRaw.substring(8).trim(); setConnectData(d=>({ ...d, message: val })); pushLine('Message set.'); return;
        }
        if (cmd === 'send' && isConnecting){
          const { name, email, message } = connectData;
          if (!name || !email || !message) { pushLine('Missing fields. Set name, email and message. Example: name John'); return; }
          pushLine('Sending message...');
          emailjs.send(serviceID, templateID, { from_name: name, from_email: email, message }, publicKey)
            .then(()=>{ pushLine('Message sent. Thank you!'); setIsConnecting(false); setConnectData({ name:'', email:'', message:'' }); })
            .catch(err=>{ console.error(err); pushLine('Failed to send: ' + (err.text || err.message || 'unknown error')); });
          return;
        }
        if (cmd === 'cancel' && isConnecting){ setIsConnecting(false); setConnectData({ name:'', email:'', message:'' }); pushLine('Connect cancelled.'); return; }
        pushLine('Command not found: ' + cmd);
    }
  }

  return (
    <section className="terminal-panel" style={{background:'rgba(11,12,16,0.95)', color:'#c9d1d9', fontFamily:"'JetBrains Mono', 'JetBrains Mono Nerd Font', monospace", padding:12, borderRadius:8, border:'1px solid rgba(255,255,255,0.06)', boxShadow:'0 6px 18px rgba(0,0,0,0.6)', width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>

      {/* output history */}
      <div style={{flex:1, overflowY:'auto', padding:12, background:'transparent'}}>
        {lines.length === 0 ? (<div style={{opacity:0.6}}>No output yet. Type a command below and press enter.</div>) : (
          lines.map((l,i)=>(<div key={i} style={{whiteSpace:'pre-wrap'}}>{l}</div>))
        )}
        <div ref={bottomRef} />
      </div>

      {/* connect helper (above input if active) */}
      {isConnecting ? (
        <div style={{position:'sticky', bottom:56, padding:'8px 12px', borderTop:'1px solid rgba(255,255,255,0.03)', background:'rgba(11,12,16,0.7)'}}>
          <div style={{marginBottom:6}}>Connect mode. Set name/email/message via commands:</div>
          <div style={{fontSize:13, opacity:0.9}}>name Your Name</div>
          <div style={{fontSize:13, opacity:0.9}}>email you@domain.com</div>
          <div style={{fontSize:13, opacity:0.9}}>message Your message text</div>
          <div style={{fontSize:13, opacity:0.9}}>When ready, type: send</div>
        </div>
      ) : null}

      {/* input/prompt fixed at bottom */}
      <form onSubmit={handleEnter} style={{position:'sticky', bottom:0, display:'flex', gap:8, alignItems:'center', padding:'10px 12px', background:'linear-gradient(180deg, rgba(11,12,16,0.0), rgba(11,12,16,0.95))', borderTop:'1px solid rgba(255,255,255,0.03)'}}>
        <div style={{flex:'0 0 auto', color:'#7ee787', fontWeight:700, fontSize:14}}>ankur@starship:~$</div>
        <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} autoFocus style={{flex:1, background:'transparent', border:'none', outline:'none', color:'#c9d1d9', fontFamily:"'JetBrains Mono', monospace", fontSize:14}} placeholder="Type a command and press Enter" />
      </form>

      <div style={{position:'absolute', left:12, bottom:8, fontSize:12, opacity:0.75}}>Tip: Use 'help' to see commands. Use 'connect' to send a message (emailjs must be configured).</div>
    </section>
  );
}

export default function Home() {

  useEffect(() => {

    gsap.from(".hero__title", {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out"
    });

    gsap.from(".hero__subtitle", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.3
    });

    gsap.from(".about-section", {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.5
    });

    gsap.from(".contact-section", {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.8
    });

    gsap.from(".social-icons a", {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "back.out(2)"
    });

  }, []);

  return (
    <Layout
      title="Home"
      description="Personal portfolio website"
    >
      <Hero />

      <main style={{position: 'relative', zIndex: 100}}>
        <ThreeAnimations />
        <div style={{display:'flex', gap:24, alignItems:'stretch', padding:'24px', maxWidth:1100, margin:'0 auto', width:'100%'}}>
          <div style={{flex:1, minWidth:0}}>
            <About />
            <Projects />
            <Contact />
          </div>
          <div style={{flex:'0 0 420px', alignSelf:'stretch', display:'flex', flexDirection:'column'}}>
            <TerminalEmulator />
          </div>
        </div>
      </main>

    </Layout>
  );
}