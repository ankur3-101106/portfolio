import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Generic hook for creating GSAP ScrollTrigger instances.
 * Handles cleanup automatically on unmount.
 *
 * @param {Function} animationFactory - Function receiving (element, scrollTriggerInstance) that creates the animation
 * @param {Object} config - ScrollTrigger config overrides
 * @param {Array} deps - Dependency array for re-triggering
 * @returns {React.RefObject} - Ref to attach to the trigger element
 */
export function useScrollTrigger(animationFactory, config = {}, deps = []) {
  const triggerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      animationRef.current = animationFactory(el, {
        trigger: el,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        ...config,
      });
    }, el);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return triggerRef;
}

export default useScrollTrigger;
