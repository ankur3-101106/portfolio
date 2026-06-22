import { useEffect, useCallback, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for smooth scrolling navigation.
 * Provides a scrollTo function that smoothly animates to a target.
 *
 * @returns {{ scrollTo: (target: string | Element) => void, wrapperRef: React.RefObject }}
 */
export function useSmoothScroll() {
  const isReady = useRef(false);

  useEffect(() => {
    isReady.current = true;
    return () => {
      isReady.current = false;
    };
  }, []);

  const scrollTo = useCallback((target) => {
    if (!isReady.current) return;

    const element = typeof target === 'string'
      ? document.querySelector(target)
      : target;

    if (!element) return;

    gsap.to(window, {
      duration: 1.2,
      scrollTo: {
        y: element,
        offsetY: 0,
      },
      ease: 'power3.inOut',
    });
  }, []);

  return { scrollTo };
}

export default useSmoothScroll;
