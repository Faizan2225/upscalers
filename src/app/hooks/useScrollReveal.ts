import { useEffect, useRef, useState } from "react";

export function useScrollReveal() {
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
  const containerRef = useRef<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.getAttribute("data-index"));
          setVisibleIndexes((prev) => (prev.includes(index) ? prev : [...prev, index]));
          // reveal once, then stop observing so it never replays on scroll-back
          observer.unobserve(entry.target);
        });
      },
      // fire later: element must be ~20% up from the viewport bottom,
      // so the reveal plays while it's actually in view, not before
      { threshold: 0.15, rootMargin: "0px 0px -20% 0px" }
    );

    const elements = containerRef.current?.querySelectorAll(".reveal-up");
    elements?.forEach((el: any) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return { containerRef, isVisible: (i: number) => visibleIndexes.includes(i) };
}
