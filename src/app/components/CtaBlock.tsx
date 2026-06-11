"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import ScrollRevealText from "./ScrollRevealText";

// clamp a value to ±max while keeping its sign
const clampMag = (v: number, max: number) =>
  Math.max(-max, Math.min(max, v));

/* Pre-footer call-to-action — black round-top panel, giant headline,
   magnetic accent button, and the floating chrome object (reused hero asset). */
export default function CtaBlock() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll progress listener to drive width-shrinking transition
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight;
      const end = viewportHeight * 0.2;
      const current = rect.top;

      let progress = (start - current) / (start - end);
      progress = Math.max(0, Math.min(1, progress));
      section.style.setProperty("--cta-progress", progress.toString());
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* magnetic button: the pill is gently pulled toward the cursor when it
     gets close, lerped each frame so the motion stays buttery. */
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip on touch

    const label = btn.querySelector<HTMLElement>(".cta__btn-label");
    const target = { x: 0, y: 0, s: 1 };
    const current = { x: 0, y: 0, s: 1 };
    let raf = 0;

    // the field extends a bit beyond the button's own box, so the pull
    // "grabs" the cursor as it approaches and releases as it leaves.
    const PAD = 90; // px of magnetic field around the edges
    const PULL = 0.4; // fraction of the offset the button follows
    const MAX = 26; // px cap so the shift stays subtle, never flings

    const onMove = (e: PointerEvent) => {
      const r = btn.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      // inside the padded field?
      const within =
        Math.abs(dx) < r.width / 2 + PAD && Math.abs(dy) < r.height / 2 + PAD;
      if (within) {
        target.x = clampMag(dx * PULL, MAX);
        target.y = clampMag(dy * PULL, MAX);
        target.s = 1.05;
      } else {
        target.x = 0;
        target.y = 0;
        target.s = 1;
      }
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      current.s += (target.s - current.s) * 0.18;
      btn.style.transform = `translate(${current.x}px, ${current.y}px) scale(${current.s})`;
      if (label) {
        // label drifts a touch further → subtle parallax inside the pill
        label.style.transform = `translate(${current.x * 0.22}px, ${
          current.y * 0.22
        }px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="cta" aria-label="Get in touch">
      <div className="cta__inner">
        <div className="cta__content">
          <h2 className="cta__title">
            <ScrollRevealText text="Let's grow your business." />
          </h2>
          <button ref={btnRef} type="button" className="cta__btn">
            <span className="cta__btn-label">
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
            </span>
          </button>
        </div>

        <div className="cta__art" aria-hidden="true">
          <div className="cta__art-spring" />
          <div className="cta__art-object">
            <Image src="/img.PNG" alt="" width={460} height={460} />
          </div>
        </div>
      </div>
    </section>
  );
}
