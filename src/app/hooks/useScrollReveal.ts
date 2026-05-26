import { useEffect, useRef, useState } from "react";

export function useScrollReveal() {
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
  const containerRef = useRef<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleIndexes((prev) => (prev.includes(index) ? prev : [...prev, index]));
          } else {
            setVisibleIndexes((prev) => prev.filter((i) => i !== index));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = containerRef.current?.querySelectorAll(".reveal-up");
    elements?.forEach((el: any) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return { containerRef, isVisible: (i: number) => visibleIndexes.includes(i) };
}
