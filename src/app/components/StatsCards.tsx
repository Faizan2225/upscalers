"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import ScrollRevealText from "./ScrollRevealText";
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
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const cards = cardRefs.current;
    if (cards.length === 0) return;

    let rafId = 0;

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const startFraction = 0.95; // starts when card top is 95% down the screen
      const endFraction = 0.45;   // settles when card top is 45% down the screen

      cards.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();

        // If card is completely out of view, set to boundary values
        if (rect.bottom < 0) {
          card.style.setProperty("--card-progress", "1");
          return;
        }
        if (rect.top > viewportHeight) {
          card.style.setProperty("--card-progress", "0");
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

        card.style.setProperty("--card-progress", progress.toString());
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
            }`}
            data-theme={s.theme}
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
                  <ScrollRevealText text={s.value} />
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
