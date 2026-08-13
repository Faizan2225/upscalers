"use client";

import { useEffect, useRef, useState } from "react";

interface CounterNumberProps {
  value: string;       // e.g. "400+", "24/7", "2"
  duration?: number;   // animation duration in ms (default 2000)
}

/**
 * Parses a stat value into segments that can be animated.
 * "400+" → [{ type: "number", value: 400 }, { type: "text", value: "+" }]
 * "24/7" → [{ type: "number", value: 24 }, { type: "text", value: "/" }, { type: "number", value: 7 }]
 */
type Segment = { type: "number"; value: number } | { type: "text"; value: string };

function parseValue(raw: string): Segment[] {
  const segments: Segment[] = [];
  const regex = /(\d+(?:\.\d+)?)|([^\d]+)/g;
  let match;
  while ((match = regex.exec(raw)) !== null) {
    if (match[1] !== undefined) {
      segments.push({ type: "number", value: parseFloat(match[1]) });
    } else if (match[2] !== undefined) {
      segments.push({ type: "text", value: match[2] });
    }
  }
  return segments;
}

// easeOutExpo for a satisfying deceleration
function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function CounterNumber({ value, duration = 2000 }: CounterNumberProps) {
  const segments = useRef(parseValue(value)).current;
  const elRef = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const [currentValues, setCurrentValues] = useState<number[]>(
    segments.map(() => 0)
  );

  // Trigger animation once the element is in viewport
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Run the counting animation
  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(t);

      const newValues = segments.map((seg) => {
        if (seg.type !== "number") return 0;
        return eased * seg.value;
      });

      setCurrentValues(newValues);

      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [started, duration, segments]);

  return (
    <span ref={elRef} className="counter-number">
      {segments.map((seg, i) => {
        if (seg.type === "text") {
          return <span key={i}>{seg.value}</span>;
        }
        // Determine if the original number is an integer
        const isInt = Number.isInteger(seg.value);
        const display = isInt
          ? Math.round(currentValues[i])
          : currentValues[i].toFixed(1);
        return <span key={i}>{display}</span>;
      })}
    </span>
  );
}
