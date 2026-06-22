import { useState, useEffect, useRef, useCallback } from 'react';

const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFabcdef';

/**
 * Custom hook that creates a cybersecurity-style text scramble/decode effect.
 * Characters cycle through random glitch chars before resolving to the target.
 *
 * @param {string} targetText - The final text to reveal
 * @param {Object} options
 * @param {number} options.speed - ms per frame (default: 30)
 * @param {number} options.delay - ms before starting (default: 0)
 * @param {boolean} options.trigger - set true to start animation
 * @returns {{ text: string, isComplete: boolean, restart: () => void }}
 */
export default function useTextScramble(targetText, options = {}) {
  const { speed = 30, delay = 0, trigger = true } = options;
  const [text, setText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const frameRef = useRef(0);
  const rafRef = useRef(null);

  const scramble = useCallback(() => {
    setIsComplete(false);
    let resolvedCount = 0;
    const totalLength = targetText.length;

    const tick = () => {
      frameRef.current++;
      const frame = frameRef.current;

      let output = '';
      for (let i = 0; i < totalLength; i++) {
        if (targetText[i] === ' ') {
          output += ' ';
          continue;
        }

        // Characters resolve progressively from left to right
        const resolveFrame = Math.floor(i * 2.5) + 4;
        if (frame >= resolveFrame) {
          output += targetText[i];
          if (i >= resolvedCount) resolvedCount = i + 1;
        } else {
          output += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }
      }

      setText(output);

      if (resolvedCount >= totalLength) {
        setIsComplete(true);
        return;
      }

      rafRef.current = setTimeout(tick, speed);
    };

    frameRef.current = 0;
    setTimeout(tick, delay);
  }, [targetText, speed, delay]);

  useEffect(() => {
    if (trigger) {
      scramble();
    }
    return () => {
      if (rafRef.current) clearTimeout(rafRef.current);
    };
  }, [trigger, scramble]);

  const restart = useCallback(() => {
    if (rafRef.current) clearTimeout(rafRef.current);
    scramble();
  }, [scramble]);

  return { text, isComplete, restart };
}
