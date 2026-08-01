"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import ScrollRevealText from "./ScrollRevealText";

type Stat = {
  id: string;
  value: string;
  label: string;
  theme: "dark" | "light";
  src: string;
  alt: string;
  title?: string;
  tags?: string[];
};

const STATS: Stat[] = [
  {
    id: "card-1",
    value: "",
    label: "",
    theme: "dark",
    src: "/images/svc_3d_logo.png",
    alt: "Upscalers stylized 3D brand logo composition with floating glassmorphic tiles",
  },
  {
    id: "card-2",
    value: "400+",
    label: "Trusted by service businesses working to improve local visibility.",
    theme: "light",
    src: "",
    alt: "",
    tags: ["Roofing", "Remodelers", "Chiropractic", "Dental", "Auto Repair", "Roofing"],
  },
  {
    id: "card-3",
    value: "24/7",
    label: "Online estimate and job booking forms capture leads anytime, even after hours.",
    theme: "dark",
    src: "",
    alt: "",
    title: "Lead Capture",
  },
  {
    id: "card-4",
    value: "2",
    label: "Your website and Google Business Profile power the system.",
    theme: "light",
    src: "/images/svc_3d_gbp.png",
    alt: "Core connections with custom Web and GBP 3D assets",
    title: "Core Connections",
  },
];

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
            className={`stat stat--${s.id} ${i === 1 || i === 2 ? "stat--wide" : "stat--narrow"
              }`}
            data-theme={s.theme}
          >
            {/* 3D Render Media Asset */}
            <div className="stat__media-wrap">
              {s.id === "card-4" ? (
                <>
                  <div className="stat__media-img-container stat__media-img-container--web">
                    <Image
                      src="/images/svc_3d_web.png"
                      alt="3D Web asset"
                      width={180}
                      height={180}
                      className="stat__media-img stat__media-img--web"
                    />
                  </div>
                  <div className="stat__media-img-container stat__media-img-container--gbp">
                    <Image
                      src="/images/svc_3d_gbp.png"
                      alt="3D GBP asset"
                      width={220}
                      height={220}
                      className="stat__media-img stat__media-img--gbp"
                    />
                  </div>
                </>
              ) : (
                s.src && (
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={700}
                    height={700}
                    className="stat__media-img"
                  />
                )
              )}
            </div>

            {/* Content Body */}
            <div className="stat__content">
              {s.title && <div className="stat__title">{s.title}</div>}

              {s.tags && (
                <div className="stat__tags-marquee">
                  <div className="stat__tags-group">
                    {s.tags.map((t, idx) => (
                      <span key={idx} className="stat__tag-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="stat__tags-group" aria-hidden="true">
                    {s.tags.map((t, idx) => (
                      <span key={`dup-${idx}`} className="stat__tag-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="stat__text">
                {s.value && (
                  <div className="stat__num">
                    <ScrollRevealText text={s.value} />
                  </div>
                )}
                {s.label && <p className="stat__label">{s.label}</p>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
