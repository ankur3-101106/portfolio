import { useEffect, useRef } from 'react';
import './MatrixRain.css';

/**
 * Matrix-style digital rain canvas — cybersecurity ambiance.
 * Uses Canvas API for performant rendering.
 */
export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;
    let columns;
    let drops;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[]|;:=+*&#@!?$%^~';
    const fontSize = 14;

    function getTheme() {
      return document.documentElement.dataset.theme || 'dark';
    }

    function resize() {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () =>
        Math.random() * -100
      );
    }

    function draw() {
      const isLight = getTheme() === 'light';

      // Trail fade
      if (isLight) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      } else {
        ctx.fillStyle = 'rgba(10, 14, 23, 0.06)';
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Lead character is brighter
        const isLead = Math.random() > 0.97;
        if (isLead) {
          if (isLight) {
            ctx.fillStyle = 'rgba(50, 130, 180, 0.35)';
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(50, 130, 180, 0.2)';
          } else {
            ctx.fillStyle = 'rgba(0, 255, 180, 0.9)';
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(0, 255, 180, 0.5)';
          }
        } else {
          if (isLight) {
            const opacity = 0.03 + Math.random() * 0.07;
            ctx.fillStyle = `rgba(80, 140, 180, ${opacity})`;
          } else {
            const opacity = 0.05 + Math.random() * 0.15;
            ctx.fillStyle = `rgba(0, 200, 140, ${opacity})`;
          }
          ctx.shadowBlur = 0;
        }

        ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);

    // Watch for theme changes to clear canvas on switch
    const observer = new MutationObserver(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-rain"
      aria-hidden="true"
    />
  );
}
