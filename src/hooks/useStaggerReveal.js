import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for stagger-revealing child elements on scroll.
 *
 * @param {string} childSelector - CSS selector for children to animate
 * @param {Object} options - Animation options
 * @param {number} options.stagger - Stagger delay between children (default: 0.1)
 * @param {number} options.duration - Animation duration (default: 0.7)
 * @param {string} options.ease - GSAP easing (default: 'power2.out')
 * @param {string} options.direction - 'up' | 'left' | 'right' (default: 'up')
 * @param {string} options.start - ScrollTrigger start position (default: 'top 78%')
 * @returns {React.RefObject} - Ref to attach to the container element
 */
export function useStaggerReveal(childSelector, options = {}) {
  const containerRef = useRef(null);

  const {
    stagger = 0.1,
    duration = 0.7,
    ease = 'power2.out',
    direction = 'up',
    start = 'top 78%',
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.querySelectorAll(childSelector);
    if (!children.length) return;

    const fromVars = {
      opacity: 0,
      duration,
      stagger,
      ease,
    };

    switch (direction) {
      case 'up':
        fromVars.y = 60;
        break;
      case 'left':
        fromVars.x = -60;
        break;
      case 'right':
        fromVars.x = 60;
        break;
      default:
        fromVars.y = 60;
    }

    const ctx = gsap.context(() => {
      gsap.from(children, {
        ...fromVars,
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: 'play none none reverse',
        },
      });
    }, container);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return containerRef;
}

export default useStaggerReveal;
