"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import HeroLists from "./HeroLists";
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
const MARQUEE_TRAVEL_VW = 0.55; // how far the giant text slides left

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
  src?: string; // real image (in /public) — falls back to the gradient
  from: string; // placeholder gradient start
  to: string; // placeholder gradient end
};
const CARDS: Card[] = [
  { left: "4%", topVh: 104, w: 300, h: 360, src: "/images/IMG_3368.PNG", from: "#1c1c22", to: "#3a3a44" },
  { left: "37%", topVh: 116, w: 360, h: 300, src: "/images/IMG_3369.PNG", from: "#0d0d10", to: "#2b2b33" },
  { left: "80%", topVh: 104, w: 240, h: 330, src: "/images/IMG_3370.PNG", from: "#9a9a9a", to: "#cfcfcf" },
  { left: "3%", topVh: 156, w: 380, h: 260, src: "/images/IMG_3371.PNG", from: "#161616", to: "#3a3a3a" },
  { left: "62%", topVh: 150, w: 400, h: 300, src: "/images/IMG_3372.PNG", from: "#7fbf38", to: "#cdee7e" },
  { left: "4%", topVh: 204, w: 330, h: 320, src: "/images/IMG_3373.PNG", from: "#6d5bd0", to: "#a78bff" },
  { left: "36%", topVh: 198, w: 380, h: 300, src: "/images/IMG_3374.PNG", from: "#4a5b6b", to: "#9fb2c4" },
  { left: "79%", topVh: 206, w: 330, h: 360, src: "/images/IMG_3375.PNG", from: "#241712", to: "#e0853a" },
  { left: "56%", topVh: 252, w: 320, h: 330, src: "/images/IMG_3376.PNG", from: "#222", to: "#444" },
];

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const cardsScrollRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const parallax = parallaxRef.current;
    const cardsScroll = cardsScrollRef.current;
    const marquee = marqueeRef.current;
    if (!wrap || !stage || !parallax || !cardsScroll || !marquee) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // mouse target / current (lerped) and scroll progress (lerped)
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let smoothP = 0;
    let scrolledLatch = false;
    let raf = 0;

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
      smoothP += (rawP - smoothP) * 0.09;

      const vh = window.innerHeight;
      const vw = window.innerWidth;

      // giant text slides left
      marquee.style.transform = `translateX(${
        -smoothP * MARQUEE_TRAVEL_VW * vw
      }px)`;

      // cards rise upward through the stage
      cardsScroll.style.transform = `translateY(${
        -smoothP * CARD_TRAVEL_VH * vh
      }px)`;

      // mouse-reactive 3D tilt of the whole track
      if (!reduce) {
        current.x += (target.x - current.x) * 0.06;
        current.y += (target.y - current.y) * 0.06;
        parallax.style.transform = `rotateX(${-current.y * 12}deg) rotateY(${
          current.x * 12
        }deg) translate3d(${current.x * 46}px, ${current.y * 30}px, 0)`;
      }

      // swap to scroll-to-top + fade chrome once scrolling starts
      const sc = smoothP > 0.03;
      if (sc !== scrolledLatch) {
        scrolledLatch = sc;
        setScrolled(sc);
      }

      raf = requestAnimationFrame(tick);
    };

    if (!reduce) {
      stage.addEventListener("pointermove", onMove, { passive: true });
      stage.addEventListener("pointerleave", onLeave);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
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
      className="card"
      style={{
        left: c.left,
        top: `${c.topVh}vh`,
        // cap width to the viewport on small screens, keep the aspect ratio
        width: `min(${c.w}px, 58vw)`,
        aspectRatio: `${c.w} / ${c.h}`,
      }}
    >
      <div className="card__media">
        {c.src ? (
          <Image
            className="card__fill"
            src={c.src}
            alt=""
            fill
            sizes="420px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div
            className="card__fill"
            style={{
              background: `linear-gradient(145deg, ${c.from}, ${c.to})`,
            }}
          />
        )}
        <div className="card__eye">
          <div className="card__eye-circle">
            <PixelEye />
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="hero-wrap" ref={wrapRef}>
      <section
        ref={stageRef}
        className={`hero${dark ? " is-dark" : ""}${
          scrolled ? " is-scrolled" : ""
        }`}
        aria-label="Upscalers hero"
      >
        {/* ---- nav ---- */}
        <header className="hero__nav">
          <div className="hero__logo">upscalers</div>

          <div className="hero__nav-actions">
            <button
              className="hero__icon-btn hero__theme"
              aria-label="Toggle theme"
              aria-pressed={dark}
              onClick={() => setDark((d) => !d)}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"
                  fill="currentColor"
                />
                <path
                  d="M18 3v4M16 5h4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <button className="hero__pill">
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
          </div>
        </header>

        {/* ---- top-left intro (guide.md · Section 1) ---- */}
        <div className="hero__intro">
          <h1>
            Rank Higher on Google.
            <br />
            <span className="muted">Generate More Local Calls.</span>
          </h1>
          <p className="hero__sub">
            AI-Powered GEO for Local Service Businesses.
          </p>
        </div>

        {/* ---- bottom-left + bottom-right word lists (Section 2) ---- */}
        <HeroLists />

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
          <div className="marquee__inner" ref={marqueeRef}>
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
