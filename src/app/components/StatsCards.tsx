"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import ScrollRevealText from "./ScrollRevealText";

type Stat = {
  id: string;
  value: string;
  label: string;
  theme: "accent" | "light";
  cta?: string;
  avatars?: boolean;
  src: string;
  alt: string;
  word?: boolean;
};

const STATS: Stat[] = [
  {
    id: "card-1",
    value: "150+",
    label: "Keywords Ranked on Google",
    theme: "accent",
    cta: "Book Free Audit",
    src: "/images/stat_3d_pin_v4.png",
    alt: "3D Chrome Google Maps Location Pin & Ranking Stars",
  },
  {
    id: "card-2",
    value: "80%",
    label: "Clients Continue Long-Term",
    theme: "light",
    avatars: true,
    src: "/images/stat_3d_phone_v4.png",
    alt: "3D Phone Call & 5-Star Rating Notification",
  },
  {
    id: "card-3",
    value: "Thousands",
    label: "Of Local Leads Generated",
    theme: "light",
    word: true,
    cta: "View Results",
    src: "/images/stat_3d_target_v4.png",
    alt: "3D Target & AI Lead Generation Chart",
  },
  {
    id: "card-4",
    value: "Multi-State",
    label: "Businesses Ranked Across the U.S.",
    theme: "light",
    word: true,
    cta: "Case Studies",
    src: "/images/stat_3d_globe_v4.png",
    alt: "3D Glass USA Multi-State Map Network Globe",
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
      const startFraction = 0.95;
      const endFraction = 0.45;

      cards.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();

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
            key={s.id}
            data-index={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={`stat stat--${s.id} ${
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

            {/* 3D Render Media Asset */}
            <div className="stat__media-wrap">
              <Image
                src={s.src}
                alt={s.alt}
                width={700}
                height={700}
                className="stat__media-img"
              />
            </div>

            {/* Content Body */}
            <div className="stat__content">
              <div className="stat__text">
                <div className={`stat__num${s.word ? " stat__num--word" : ""}`}>
                  <ScrollRevealText text={s.value} />
                </div>
                <p className="stat__label">{s.label}</p>
              </div>

              {s.cta && (
                <div className="stat__actions">
                  <button type="button" className="stat__pill">
                    {s.cta}
                    <ArrowUR />
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
