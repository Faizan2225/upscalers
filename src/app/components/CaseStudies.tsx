"use client";

import Image from "next/image";
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

const TEXT_WORDS = [
  "Mobile Apps",
  "Development",
  "Design",
  "SEO",
  "Ranking",
];

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
    name: "Louisville Auto Glass and Tint",
    meta: "Auto Glass Replacement - Louisville, KY",
    keywords: ["Auto Glass in Louisville, KY"],
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
    name: "Tree Maniac Tree Service Inc.",
    meta: "Tree Service - Fresno, CA",
    keywords: ["Tree Service in Fresno, CA"],
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
      </div>

      <div className="cases__track">
        <div className="cases__marquee">
          <div className="cases__marquee-group">
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
        
        <div className="cases__marquee-group" aria-hidden="true">
          {CASES.map((c) => (
            <article key={`${c.name}-dup`} className="cs-card" data-theme={c.theme}>
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
      </div>
    </div>

    <div className="cases__text-marquee">
      <div className="cases__text-group">
        {[...TEXT_WORDS, ...TEXT_WORDS, ...TEXT_WORDS, ...TEXT_WORDS].map((w, i) => (
          <div key={i} className="cases__text-item">
            {w} <span className="cases__text-star">✦</span>
          </div>
        ))}
      </div>
      <div className="cases__text-group" aria-hidden="true">
        {[...TEXT_WORDS, ...TEXT_WORDS, ...TEXT_WORDS, ...TEXT_WORDS].map((w, i) => (
          <div key={i + 100} className="cases__text-item">
            {w} <span className="cases__text-star">✦</span>
          </div>
        ))}
      </div>
    </div>

    </section>
  );
}
