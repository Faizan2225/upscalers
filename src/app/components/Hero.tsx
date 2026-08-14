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
  href?: string;
};

const CARDS: Card[] = [
  // Pair 1: Express Towing (Google Ranking left, Calls right)
  {
    left: "6%",
    topVh: 126,
    w: 520,
    h: 390,
    src: "/images/image_Cards/EXPRESS_TOWING_RANKING.PNG",
    alt: "Express Towing Google Ranking",
    company: "Express Towing",
    label: "Google Ranking",
    from: "#1c1c22",
    to: "#3a3a44",
    href: "https://www.google.com/search?q=Towing+in+Pleasanton&oq=Towing+in+Pleasanton&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQABgeMgYIAhAAGB4yCAgDEAAYBRgeMggIBBAAGAgYHjIICAUQABgIGB4yBwgGEAAY7wXSAQkxMjc0M2owajeoAgCwAgA&sourceid=chrome&source=chrome.ob&ie=UTF-8"
  },
  {
    left: "52%",
    topVh: 126,
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
    topVh: 184,
    w: 520,
    h: 390,
    src: "/images/image_Cards/LIFE_RESTORATION_RANKING.PNG",
    alt: "Life Restoration Google Ranking",
    company: "Life Restoration",
    label: "Google Ranking",
    from: "#161616",
    to: "#3a3a3a",
    href: "https://www.google.com/search?q=Siding+in+Roosevelt+NY&sca_esv=7333fc682edc1104&biw=1536&bih=746&sxsrf=APpeQnuRSCLkkUO8HPI3GlipAwZXjxxSRw%3A1785208634778&ei=Oh9oaquGL-j_7_UPps7FiQY&ved=0ahUKEwiri5q0tPSVAxXo_7sIHSZnMWEQ4dUDCBA&uact=5&oq=Siding+in+Roosevelt+NY&gs_lp=Egxnd3Mtd2l6LXNlcnAiFlNpZGluZyBpbiBSb29zZXZlbHQgTlkyBRAAGIAEMgsQABiABBiKBRiGAzIFEAAY7wUyBRAAGO8FMgUQABjvBUj1BlD8AViUBXABeACQAQCYAYYCoAH2A6oBAzItMrgBA8gBAPgBAZgCA6AClQTCAggQABiABBiwA8ICDhAAGIAEGIoFGIYDGLADwgIIEAAY7wUYsAPCAgsQABiABBiiBBiwA8ICCBAAGIAEGKIEmAMAiAYBkAYHkgcFMS4wLjKgB6kHsgcDMi0yuAeNBMIHBTItMS4yyAcVgAgB&sclient=gws-wiz-serp"
  },
  {
    left: "52%",
    topVh: 184,
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
    topVh: 242,
    w: 520,
    h: 390,
    src: "/images/image_Cards/ZERO_GRAVITY_RANKING.PNG",
    alt: "Zero Gravity Google Ranking",
    company: "Zero Gravity",
    label: "Google Ranking",
    from: "#241712",
    to: "#e0853a",
    href: "https://www.google.com/search?q=Car+Detailing+in+Sylvan+Lake+Michigan&sca_esv=7333fc682edc1104&biw=1536&bih=746&sxsrf=APpeQnsvtFHFq5hV-Nq8UJVS5fTaU6vlbA%3A1785208655444&ei=Tx9oaoLfGqSI9u8PyIXtKQ&ved=0ahUKEwjCwoe-tPSVAxUkhP0HHchCOwUQ4dUDCBA&uact=5&oq=Car+Detailing+in+Sylvan+Lake+Michigan&gs_lp=Egxnd3Mtd2l6LXNlcnAiJUNhciBEZXRhaWxpbmcgaW4gU3lsdmFuIExha2UgTWljaGlnYW4yBRAhGKABMgUQIRigAUiLlAFQ0QVYxJEBcAJ4AJABAJgB1QKgAdFNqgEGMi0zNy4xuAEDyAEA-AEBmAIooAL5UcICCBAAGIAEGLADwgIOEAAYgAQYigUYhgMYsAPCAggQABjvBRiwA8ICBBAjGCfCAgsQABiABBiKBRiRAsICDRAAGIAEGIoFGEMYsQPCAhEQLhiABBixAxiDARjHARjRA8ICCxAAGIAEGLEDGIMBwgIQEC4YgAQYigUYQxjHARjRA8ICBRAAGIAEwgIKECMY8AUYyQIYJ8ICChAjGMkCGPAFGCfCAhEQABiABBiKBRiRAhixAxiDAcICCxAAGIAEGIoFGJIDwgIOEAAYgAQYigUYkQIYyQPCAgoQLhiABBiKBRhDwgIKEAAYgAQYigUYQ8ICDRAAGIAEGIoFGEMYyQPCAggQABiABBixA8ICBRAuGIAEwgIIEAAYgAQYkgPCAgYQABgWGB7CAgUQABjvBcICCBAAGIkFGKIEwgIIEAAYgAQYogTCAgcQIRgKGKABmAMAiAYBkAYFkgcIMi4wLjM1LjOgB5TrAbIHBjItMzUuM7gH6lHCBwkwLjEuMTguMjHIB5EDgAgB&sclient=gws-wiz-serp"
  },
  {
    left: "52%",
    topVh: 242,
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
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const parallax = parallaxRef.current;
    const cardsScroll = cardsScrollRef.current;
    const marqueeInner = marqueeRef.current;
    if (!wrap || !stage || !parallax || !cardsScroll) return;

    // mouse target / current (lerped) and scroll progress (lerped)
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let smoothP = 0;
    let scrolledLatch = false;
    let raf = 0;
    let running = false;

    /* ---- cached values (avoid per-frame getComputedStyle) ---- */
    let cachedViewH = window.innerHeight;
    let cachedTravelPx = 275 * cachedViewH / 100;
    let cachedCardEls = cardsScroll.querySelectorAll<HTMLElement>('.card');
    const updateCachedValues = () => {
      cachedViewH = window.innerHeight;
      const travelVhStyle = getComputedStyle(stage).getPropertyValue('--travel-vh').trim();
      cachedTravelPx = (parseFloat(travelVhStyle) || 275) * cachedViewH / 100;
      cachedCardEls = cardsScroll.querySelectorAll<HTMLElement>('.card');
    };
    // Recompute on resize
    const onResize = () => updateCachedValues();
    window.addEventListener('resize', onResize, { passive: true });
    updateCachedValues();

    /* ---- marquee scroll-speed boost ---- */
    const MARQUEE_NORMAL = 50;  // seconds (default)
    const MARQUEE_FAST = 22;    // seconds (while scrolling)
    let scrollIdleTimer: ReturnType<typeof setTimeout> | null = null;
    let currentMarqueeDuration = MARQUEE_NORMAL;

    const setMarqueeDuration = (dur: number) => {
      if (!marqueeInner || dur === currentMarqueeDuration) return;
      currentMarqueeDuration = dur;
      marqueeInner.style.setProperty('--marquee-duration', `${dur}s`);
    };

    const onScroll = () => {
      if (currentMarqueeDuration !== MARQUEE_FAST) {
        setMarqueeDuration(MARQUEE_FAST);
      }
      if (scrollIdleTimer) clearTimeout(scrollIdleTimer);
      scrollIdleTimer = setTimeout(() => {
        setMarqueeDuration(MARQUEE_NORMAL);
      }, 150);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

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
      smoothP += (rawP - smoothP) * 0.18;

      // cards rise upward through the stage
      cardsScroll.style.transform = `translate3d(0, calc(-${smoothP} * var(--travel-vh, 275vh)), 0)`;

      // --- per-card opacity: 0.5 at bottom → 1.0 at/above viewport center ---
      const centerY = cachedViewH * 0.45;
      cachedCardEls.forEach((card) => {
        const topVh = parseFloat(card.dataset.topVh || '126');
        const cardVisualY = (topVh / 100) * cachedViewH - smoothP * cachedTravelPx;
        const distBelow = clamp((cardVisualY - centerY) / (cachedViewH * 0.6), 0, 1);
        card.style.opacity = String(1 - distBelow * 0.5);
      });

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
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (scrollIdleTimer) clearTimeout(scrollIdleTimer);
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

  const cards = CARDS.map((c, i) => {
    const media = (
      <div className="card__media">
        <img
          className="card__fill"
          src={c.src}
          alt={c.alt}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    );

    return (
      <div
        key={i}
        className={`card card--${c.label === "Google Ranking" ? "ranking" : "calls"}`}
        data-top-vh={String(c.topVh)}
        style={{
          ["--i" as string]: String(i),
          ["--pair-i" as string]: String(Math.floor(i / 2)),
          left: c.left,
          top: `calc(126vh + (${c.topVh - 126}vh * var(--y-spread, 1)))`,
          width: `calc(min(${c.w}px, 42vw) * var(--card-scale, 1))`,
          height: "auto",
        }}
      >
        {c.href ? (
          <a
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block", cursor: "pointer", width: "100%", height: "100%" }}
          >
            {media}
          </a>
        ) : (
          media
        )}
      </div>
    );
  });

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
            <a href="tel:+19292449454" className="hero__btn hero__btn--primary">
              Get More Calls
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M7 17 17 7M9 7h8v8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <button
              type="button"
              className="hero__btn hero__btn--ghost"
              onClick={() => {
                const wrap = wrapRef.current;
                if (!wrap) return;
                const dist = wrap.offsetHeight - window.innerHeight;
                const targetScroll = dist * 0.35;
                window.scrollTo({
                  top: targetScroll,
                  behavior: "smooth",
                });
              }}
            >
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
