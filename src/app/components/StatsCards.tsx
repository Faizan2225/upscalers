"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
/* guide.md · Section 6 — Stats Cards.
   Add `src` (file in /public) to a card to swap its gradient visual. */
type Stat = {
  value: string;
  label: string;
  theme: "accent" | "light";
  word?: boolean; // word-style value (e.g. "Thousands") → smaller type
  cta?: string;
  avatars?: boolean;
  mediaSide: "left" | "right";
  src?: string;
  from: string;
  to: string;
};

const STATS: Stat[] = [
  {
    value: "150+",
    label: "Keywords Ranked on Google",
    theme: "accent",
    cta: "Book Free Audit",
    mediaSide: "left",
    src: "/images/stat_keywords_ranked.png",
    from: "#8a6bff",
    to: "#c3b2ff",
  },
  {
    value: "80%",
    label: "Clients Continue Long-Term",
    theme: "light",
    avatars: true,
    mediaSide: "left",
    src: "/images/stat_clients_longterm.png",
    from: "#e6e2da",
    to: "#f6f4ef",
  },
  {
    value: "Thousands",
    label: "Of Local Leads Generated",
    theme: "light",
    word: true,
    cta: "View Results",
    mediaSide: "right",
    src: "/images/stat_local_leads.png",
    from: "#dfe7ee",
    to: "#f3f6f9",
  },
  {
    value: "Multi-State",
    label: "Businesses Ranked Across the U.S.",
    theme: "light",
    word: true,
    cta: "Case Studies",
    mediaSide: "right",
    src: "/images/stat_multistate.png",
    from: "#e7ddf6",
    to: "#f4eefb",
  },
];

function ArrowUR() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StatsCards() {
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.getAttribute("data-index"));
          setVisibleIndexes((prev) => (prev.includes(index) ? prev : [...prev, index]));
          // reveal once, then stop observing so the bento cards don't re-animate
          observer.unobserve(entry.target);
        });
      },
      // fire later: card must be ~20% up from the viewport bottom before it animates
      { threshold: 0.15, rootMargin: "0px 0px -20% 0px" }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" aria-label="Results in numbers">
      <div className="stats__grid">
        {STATS.map((s, i) => (
          <article
            key={s.value}
            data-index={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={`stat stat--media-${s.mediaSide} ${
              i === 1 || i === 2 ? "stat--wide" : "stat--narrow"
            } ${visibleIndexes.includes(i) ? "stat--visible" : ""}`}
            data-theme={s.theme}
            style={{ animationDelay: `${i * 0.25}s` }}
          >
            {s.avatars && (
              <div className="stat__avatars" aria-hidden="true">
                <span
                  style={{ background: "linear-gradient(135deg,#c9b8a0,#e7dcc8)" }}
                />
                <span className="stat__avatars-mark">✦</span>
                <span
                  style={{ background: "linear-gradient(135deg,#7a8794,#b9c4ce)" }}
                />
              </div>
            )}

            <div className="stat__body">
              <div className="stat__text">
                <div className={`stat__num${s.word ? " stat__num--word" : ""}`}>
                  {s.value}
                </div>
                <p className="stat__label">{s.label}</p>
              </div>

              <div className="stat__media">
                {s.src ? (
                  <Image
                    src={s.src}
                    alt=""
                    fill
                    sizes="(max-width: 760px) 90vw, 22vw"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="stat__media-fill"
                    style={{
                      background: `linear-gradient(150deg, ${s.from}, ${s.to})`,
                    }}
                  />
                )}
              </div>
            </div>

            {s.cta && (
              <div className="stat__actions">
                <button type="button" className="stat__pill">
                  {s.cta}
                  <ArrowUR />
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
