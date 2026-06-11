"use client";

import React, { useEffect, useRef } from "react";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  startFraction?: number; // default: 0.85
  endFraction?: number;   // default: 0.35
  overlap?: number;       // default: 3.0
}

export default function ScrollRevealText({
  text,
  className = "",
  startFraction = 0.85,
  endFraction = 0.35,
  overlap = 3.0,
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll(".reveal-char");
    const numChars = chars.length;
    if (numChars === 0) return;

    let rafId = 0;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // If the element is entirely out of view, we can skip or set extreme values
      if (rect.bottom < 0 || rect.top > viewportHeight) {
        if (rect.top > viewportHeight) {
          chars.forEach((char) => {
            (char as HTMLElement).style.setProperty("--char-progress", "0");
          });
        } else if (rect.bottom < 0) {
          chars.forEach((char) => {
            (char as HTMLElement).style.setProperty("--char-progress", "1");
          });
        }
        return;
      }

      const currentFraction = rect.top / viewportHeight;
      let progress = 0;
      if (currentFraction >= startFraction) {
        progress = 0;
      } else if (currentFraction <= endFraction) {
        progress = 1;
      } else {
        progress = (startFraction - currentFraction) / (startFraction - endFraction);
      }

      chars.forEach((char, i) => {
        const charProgress = Math.min(
          1,
          Math.max(0, progress * (1 + overlap) - (i / numChars) * overlap)
        );
        (char as HTMLElement).style.setProperty("--char-progress", charProgress.toString());
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    handleScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [startFraction, endFraction, overlap]);

  const words = text.split(" ");
  let charCounter = 0;

  return (
    <span ref={containerRef} className={`scroll-reveal-text ${className}`.trim()}>
      {words.map((word, wordIdx) => {
        const wordChars = Array.from(word);
        return (
          <span
            key={wordIdx}
            className="reveal-word"
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {wordChars.map((char, charIdx) => {
              const absIdx = charCounter++;
              return (
                <span
                  key={charIdx}
                  className="reveal-char"
                  data-char-index={absIdx}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </span>
              );
            })}
            {wordIdx < words.length - 1 && (
              <span
                className="reveal-char reveal-space"
                data-char-index={charCounter++}
                style={{ display: "inline-block" }}
              >
                &nbsp;
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
