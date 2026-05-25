"use client";

import Image from "next/image";
import { useRef } from "react";
import PixelEye from "./PixelEye";

/* guide.md · Section 5 — Results / Case Studies.
   Add `src` (file in /public) to swap a gradient for a real screenshot. */
type CaseStudy = {
  theme: "dark" | "light";
  name: string;
  meta: string;
  keywords: string[];
  results: string[];
  src?: string;
  from: string;
  to: string;
};

const CASES: CaseStudy[] = [
  {
    theme: "dark",
    name: "Life Restoration Inc.",
    meta: "Roofing & Siding — Roosevelt, NY",
    keywords: ["Siding in Roosevelt NY"],
    results: [
      "Increased local visibility",
      "More inbound calls",
      "Stronger Google Maps presence",
    ],
    src: "/websites/life_restoration.PNG",
    from: "#1c1c22",
    to: "#3a3a44",
  },
  {
    theme: "light",
    name: "A&B Locksmiths LLC",
    meta: "Locksmith — Twin Falls, ID",
    keywords: ["Locksmith in Twin Falls, ID"],
    results: [
      "Higher local rankings",
      "More leads from Google",
      "Improved GBP visibility",
    ],
    src: "/websites/louisville.PNG",
    from: "#dfe7ee",
    to: "#f3f6f9",
  },
  {
    theme: "dark",
    name: "Express Towing",
    meta: "Towing Company — California",
    keywords: ["Towing in Concord", "Towing in Pleasanton"],
    results: [
      "Increased search visibility",
      "More local calls",
      "Better trust signals",
    ],
    src: "/websites/express_towing.PNG",
    from: "#15151a",
    to: "#33333d",
  },
  {
    theme: "light",
    name: "Zero Gravity Autospa",
    meta: "Car Detailing — Sylvan Lake, MI",
    keywords: ["Car Detailing in Sylvan Lake MI"],
    results: [
      "More inbound leads",
      "Better Google Maps reach",
      "Increased lead consistency",
    ],
    src: "/websites/treemaniac.PNG",
    from: "#e7ddf6",
    to: "#f4eefb",
  },
];

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5l4 4 10-11"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CaseStudies() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".cs-card");
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="cases" aria-label="Results and case studies">
      <div className="cases__head">
        <div>
          <h2 className="cases__heading">Real Rankings. Real Growth.</h2>
          <p className="cases__sub">
            Real Google Maps visibility improvements for local service
            businesses across the U.S.
          </p>
        </div>
        <div className="cases__nav">
          <button
            className="cases__arrow"
            aria-label="Previous"
            onClick={() => scrollBy(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 5l-7 7 7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="cases__arrow"
            aria-label="Next"
            onClick={() => scrollBy(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="cases__track" ref={trackRef}>
        {CASES.map((c) => (
          <article key={c.name} className="cs-card" data-theme={c.theme}>
            <div className="cs-card__media">
              {c.src ? (
                <Image
                  className="cs-card__img"
                  src={c.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 80vw, 40vw"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div
                  className="cs-card__img"
                  style={{
                    background: `linear-gradient(150deg, ${c.from}, ${c.to})`,
                  }}
                />
              )}
              <div className="cs-card__eye">
                <div className="cs-card__eye-circle">
                  <PixelEye />
                </div>
              </div>
              <div className="cs-card__kw">
                {c.keywords.map((k) => (
                  <span key={k}>{k}</span>
                ))}
              </div>
            </div>

            <div className="cs-card__body">
              <h3 className="cs-card__name">{c.name}</h3>
              <p className="cs-card__meta">{c.meta}</p>
              <ul className="cs-card__results">
                {c.results.map((r) => (
                  <li key={r}>
                    <Check />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
