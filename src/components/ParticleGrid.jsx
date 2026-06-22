import './ParticleGrid.css';

/**
 * Animated CSS-only grid background that creates a network topology feel.
 * Uses pure CSS animations for performance (no canvas).
 */
export default function ParticleGrid() {
  return (
    <div className="particle-grid" aria-hidden="true">
      <div className="particle-grid__lines" />
      <div className="particle-grid__dots">
        {Array.from({ length: 20 }, (_, i) => (
          <span
            key={i}
            className="particle-grid__dot"
            style={{
              '--dot-x': `${10 + (i % 5) * 20 + Math.random() * 10}%`,
              '--dot-y': `${10 + Math.floor(i / 5) * 22 + Math.random() * 10}%`,
              '--dot-delay': `${i * 0.3}s`,
              '--dot-duration': `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      <div className="particle-grid__glow" />
    </div>
  );
}
