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

    function resize() {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () =>
        Math.random() * -100
      );
    }

    function draw() {
      ctx.fillStyle = 'rgba(10, 14, 23, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Lead character is brighter
        const isLead = Math.random() > 0.97;
        if (isLead) {
          ctx.fillStyle = 'rgba(0, 255, 180, 0.9)';
          ctx.shadowBlur = 15;
          ctx.shadowColor = 'rgba(0, 255, 180, 0.5)';
        } else {
          const opacity = 0.05 + Math.random() * 0.15;
          ctx.fillStyle = `rgba(0, 200, 140, ${opacity})`;
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

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
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
