import React, { useEffect } from "react";

export default function ScrollProgress() {
  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = (scrollTop / docHeight) * 100;

      document.documentElement.style.setProperty(
        "--scroll-progress",
        `${progress}%`
      );
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return null; // no UI needed
}