"use client";

import { useScrollReveal } from "../hooks/useScrollReveal";

// guide.md · Section 7 — Company / About
export default function About() {
  const { containerRef, isVisible } = useScrollReveal();

  return (
    <section className="about" aria-label="About Upscalers" ref={containerRef}>
      <div className="about__inner">
        <h2 
          data-index="0" 
          className={`about__title reveal-up ${isVisible(0) ? "is-visible" : ""}`}
        >
          Company
        </h2>

        <div className="about__content">
          <p 
            data-index="1" 
            className={`about__lead reveal-up ${isVisible(1) ? "is-visible" : ""}`}
            style={{ animationDelay: "0.3s" }}
          >
            We help local service businesses rank higher on Google and generate
            more inbound calls using AI-powered GEO strategies.
          </p>
          <p 
            data-index="2" 
            className={`about__text reveal-up ${isVisible(2) ? "is-visible" : ""}`}
            style={{ animationDelay: "0.6s" }}
          >
            Our focus is simple: more visibility, more rankings, and more
            qualified leads through Google Maps and local search. From Google
            Business Profile optimization to high-converting websites, every
            system we build is designed around business growth.
          </p>
          <button 
            type="button" 
            data-index="3" 
            className={`about__btn reveal-up ${isVisible(3) ? "is-visible" : ""}`}
            style={{ animationDelay: "0.9s" }}
          >
            More About Us
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M7 17 17 7M9 7h8v8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
