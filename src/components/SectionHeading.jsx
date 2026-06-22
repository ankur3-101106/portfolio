import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SectionHeading.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable animated section heading with number prefix and decorative line.
 *
 * @param {Object} props
 * @param {string} props.number - Section number (e.g., "01")
 * @param {string} props.title - Section title
 * @param {string} [props.subtitle] - Optional subtitle
 */
export default function SectionHeading({ number, title, subtitle }) {
  const headingRef = useRef(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from(el.querySelector('.section-heading__number'), {
        opacity: 0,
        x: -20,
        duration: 0.5,
        ease: 'power2.out',
      })
        .from(
          el.querySelector('.section-heading__line'),
          {
            scaleX: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .from(
          el.querySelector('.section-heading__title'),
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.3'
        );

      if (el.querySelector('.section-heading__subtitle')) {
        tl.from(
          el.querySelector('.section-heading__subtitle'),
          {
            opacity: 0,
            y: 15,
            duration: 0.4,
            ease: 'power2.out',
          },
          '-=0.2'
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={headingRef} className="section-heading">
      <div className="section-heading__top">
        <span className="section-heading__number mono-label">{number}</span>
        <span className="section-heading__line" />
      </div>
      <h2 className="section-heading__title">{title}</h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </div>
  );
}
