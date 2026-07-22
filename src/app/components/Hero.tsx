"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PixelEye from "./PixelEye";

/* ---- editable copy ----------------------------------------- */
const MARQUEE_PHRASES = [
  "rank higher on google",
  "more local calls",
  "ai-powered geo",
];
const MARQUEE_REPS = 3; // copies of the phrase set in one half

/* ---- timeline tuning --------------------------------------- */
const CARD_TRAVEL_VH = 2.0; // how far (in viewport heights) the cards rise

/* ---- floating cards: scattered across a tall canvas --------
   topVh >= 102 so none are visible at the very top of the page;
   scrolling lifts them up through the pinned stage.

   To use real images: drop files in /public and set `src`, e.g.
   { left: "4%", topVh: 104, w: 300, h: 360, src: "/card-1.jpg" }
   Cards without a `src` render the gradient placeholder.        */
type Card = {
  left: string;
  topVh: number;
  w: number;
  h: number;
  src: string;
  alt: string;
  company: string;
  label: "Google Ranking" | "Calls";
  from: string;
  to: string;
};

const CARDS: Card[] = [
  // Pair 1: Express Towing (Google Ranking left, Calls right)
  {
    left: "6%",
    topVh: 104,
    w: 520,
    h: 390,
    src: "/images/image_Cards/EXPRESS_TOWING_RANKING.PNG",
    alt: "Express Towing Google Ranking",
    company: "Express Towing",
    label: "Google Ranking",
    from: "#1c1c22",
    to: "#3a3a44",
  },
  {
    left: "52%",
    topVh: 104,
    w: 520,
    h: 390,
    src: "/images/image_Cards/EXPRESS_TOWING_CALLS.PNG",
    alt: "Express Towing Calls",
    company: "Express Towing",
    label: "Calls",
    from: "#1c1c22",
    to: "#3a3a44",
  },

  // Pair 2: Life Restoration (Google Ranking left, Calls right)
  {
    left: "6%",
    topVh: 162,
    w: 520,
    h: 390,
    src: "/images/image_Cards/LIFE_RESTORATION_RANKING.PNG",
    alt: "Life Restoration Google Ranking",
    company: "Life Restoration",
    label: "Google Ranking",
    from: "#161616",
    to: "#3a3a3a",
  },
  {
    left: "52%",
    topVh: 162,
    w: 520,
    h: 390,
    src: "/images/image_Cards/LIFE_RESTORATION_CALLS.PNG",
    alt: "Life Restoration Calls",
    company: "Life Restoration",
    label: "Calls",
    from: "#161616",
    to: "#3a3a3a",
  },

  // Pair 3: Zero Gravity (Google Ranking left, Calls right)
  {
    left: "6%",
    topVh: 220,
    w: 520,
    h: 390,
    src: "/images/image_Cards/ZERO_GRAVITY_RANKING.PNG",
    alt: "Zero Gravity Google Ranking",
    company: "Zero Gravity",
    label: "Google Ranking",
    from: "#241712",
    to: "#e0853a",
  },
  {
    left: "52%",
    topVh: 220,
    w: 520,
    h: 390,
    src: "/images/image_Cards/ZERO_GRAVITY_CALLS.PNG",
    alt: "Zero Gravity Calls",
    company: "Zero Gravity",
    label: "Calls",
    from: "#241712",
    to: "#e0853a",
  },
];

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export default function Hero({ dark }: { dark: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const cardsScrollRef = useRef<HTMLDivElement>(null);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const parallax = parallaxRef.current;
    const cardsScroll = cardsScrollRef.current;
    if (!wrap || !stage || !parallax || !cardsScroll) return;

    // mouse target / current (lerped) and scroll progress (lerped)
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let smoothP = 0;
    let scrolledLatch = false;
    let raf = 0;
    let running = false;

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width - 0.5;
      target.y = (e.clientY - r.top) / r.height - 0.5;
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    const tick = () => {
      // --- scroll progress 0..1 over the wrapper's scroll length ---
      const rect = wrap.getBoundingClientRect();
      const dist = wrap.offsetHeight - window.innerHeight;
      const rawP = dist > 0 ? clamp(-rect.top / dist, 0, 1) : 0;
      smoothP += (rawP - smoothP) * 0.08;

      // cards rise upward through the stage
      cardsScroll.style.transform = `translate3d(0, calc(-${smoothP} * var(--travel-vh, 255vh)), 0)`;

      // mouse-reactive 3D tilt of the whole track
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      parallax.style.transform = `rotateX(${-current.y * 10}deg) rotateY(${current.x * 10
        }deg) translate3d(${current.x * 36}px, ${current.y * 24}px, 0)`;

      // swap to scroll-to-top + fade chrome once scrolling starts
      const sc = smoothP > 0.03;
      if (sc !== scrolledLatch) {
        scrolledLatch = sc;
        setScrolled(sc);
      }

      if (running) raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // only burn frames while the hero is actually on (or near) screen —
    // once you've scrolled past it the loop idles instead of stealing frames
    const vis = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "200px 0px" }
    );
    vis.observe(wrap);

    stage.addEventListener("pointermove", onMove, { passive: true });
    stage.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      vis.disconnect();
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // one looping half of the marquee: phrase set repeated, ✦ between items
  const marqueeHalf = (
    <span>
      {Array.from({ length: MARQUEE_REPS }).flatMap((_, r) =>
        MARQUEE_PHRASES.map((phrase, i) => (
          <span key={`${r}-${i}`} style={{ display: "inline-flex" }}>
            {phrase}
            <i className="marquee__star">✦</i>
          </span>
        ))
      )}
    </span>
  );

  const cards = CARDS.map((c, i) => (
    <div
      key={i}
      className={`card card--${c.label === "Google Ranking" ? "ranking" : "calls"}`}
      style={{
        ["--i" as string]: String(i),
        ["--pair-i" as string]: String(Math.floor(i / 2)),
        left: c.left,
        top: `calc(104vh + (${c.topVh - 104}vh * var(--y-spread, 1)))`,
        width: `calc(min(${c.w}px, 42vw) * var(--card-scale, 1))`,
        height: "auto",
      }}
    >
      <div className="card__media">
        <img
          className="card__fill"
          src={c.src}
          alt={c.alt}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    </div>
  ));

  return (
    <div className="hero-wrap" ref={wrapRef}>
      <section
        ref={stageRef}
        className={`hero${dark ? " is-dark" : ""}${scrolled ? " is-scrolled" : ""
          }`}
        aria-label="Upscalers hero"
      >
        {/* ---- nav ---- */}


        {/* ---- top-left intro (guide.md · Section 1) ---- */}
        <div className="hero__intro">
          <h1>
            Rank Higher on Google.
            <br />
            <span className="muted">Generate More Local Calls.</span>
          </h1>
        </div>

        {/* ---- bottom-center: supporting line + CTAs ---- */}
        <div className="hero__bottom">
          <p className="hero__support">
            We help service businesses dominate Google Maps and local search
            using AI-powered optimization systems.
          </p>
          <div className="hero__cta">
            <button type="button" className="hero__btn hero__btn--primary">
              Book Free Audit
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
            <button type="button" className="hero__btn hero__btn--ghost">
              View Results
            </button>
          </div>
        </div>

        {/* ---- giant marquee (deepest) ---- */}
        <div className="hero__marquee" aria-hidden="true">
          <div className="marquee__inner">
            {marqueeHalf}
            {marqueeHalf}
          </div>
        </div>

        {/* ---- floating image track ---- */}
        <div className="hero__cards" aria-hidden="true">
          <div className="cards__parallax" ref={parallaxRef}>
            <div className="cards__scroll" ref={cardsScrollRef}>
              {cards}
            </div>
          </div>
        </div>

        {/* ---- central 3D object ---- */}
        <div className="hero__object">
          <div className="hero__object-inner">
            <Image
              src="/img.PNG"
              alt="Upscalers"
              width={560}
              height={560}
              priority
            />
          </div>
        </div>

        {/* ---- scroll-to-top (shown once scrolling) ---- */}
        <button
          className="hero__top-btn"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 19V5M6 11l6-6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </section>
    </div>
  );
}
