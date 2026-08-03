"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useScrollReveal } from "../hooks/useScrollReveal";

const NAV: { label: string; href: string; badge?: string }[] = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const ECOSYSTEM = [
  { label: "Google Business", href: "https://share.google/9xzxgAvLACTEvG3TT" },
  { label: "Instagram", href: "https://www.instagram.com/businessupscalers" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/business-upscalers/" },
  { label: "Facebook", href: "https://www.facebook.com/businessupscalerllc" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCskqKIuc2OzY1AScKF5P0AQ" },
];

function Plus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="footer__plus">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Footer() {
  const { containerRef, isVisible } = useScrollReveal();
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  /* ── auto-fit wordmark font-size to fill container width exactly ── */
  useEffect(() => {
    const wordmark = wordmarkRef.current;
    const inner = innerRef.current;
    if (!wordmark || !inner) return;

    const fit = () => {
      const containerW = inner.clientWidth;
      // Reset to a massive size so we can measure the natural text width with high precision
      wordmark.style.fontSize = "1000px";
      
      // Use getBoundingClientRect for sub-pixel accuracy.
      // Temporarily remove constraints to get the true, unclipped text width.
      const prevTransform = wordmark.style.transform;
      const prevWidth = wordmark.style.width;
      
      wordmark.style.transform = "none";
      wordmark.style.width = "max-content";
      
      const naturalW = wordmark.getBoundingClientRect().width;
      
      if (naturalW <= 0) {
        wordmark.style.transform = prevTransform;
        wordmark.style.width = prevWidth;
        return;
      }
      
      // Scale up: desired = containerW, natural at 1000px = naturalW
      const fitted = (containerW / naturalW) * 1000;
      wordmark.style.fontSize = `${fitted}px`;
      
      // Restore styles
      wordmark.style.transform = prevTransform;
      wordmark.style.width = prevWidth;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  /* ── scroll-driven fade-in on wordmark ── */
  useEffect(() => {
    const handleScroll = () => {
      const footer = containerRef.current;
      const wordmark = wordmarkRef.current;
      if (!footer || !wordmark) return;

      const rect = footer.getBoundingClientRect();
      const viewportH = window.innerHeight;

      const entry = viewportH - rect.top;
      const total = rect.height + viewportH;
      const progress = Math.max(0, Math.min(1, entry / total));

      // Fade in and slide up smoothly as the footer enters the viewport
      const opacity = Math.max(0, Math.min(1, (progress - 0.1) * 2.5));
      const translateY = Math.max(0, 16 * (1 - opacity)); // Starts 16px down and slides to 0
      
      wordmark.style.opacity = `${opacity}`;
      wordmark.style.transform = `translate3d(0, ${translateY}px, 0)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  return (
    <footer id="site-footer" className="footer" aria-label="Footer" ref={containerRef}>
      <div className="footer__inner" ref={innerRef}>
        {/* giant wordmark — on top like the reference */}
        <div className="footer__wordmark" ref={wordmarkRef}>
          upscalers
        </div>

        {/* 3-column grid below */}
        <div className="footer__grid">
          {/* nav */}
          <nav
            data-index="0"
            className={`footer__card footer__nav reveal-up ${isVisible(0) ? "is-visible" : ""}`.trim()}
            style={{ ["--reveal-delay" as string]: "0s" }}
            aria-label="Footer navigation"
          >
            <div className="footer__nav-links">
              {NAV.map((n, idx) => (
                <Link
                  key={n.label}
                  href={n.href}
                  className="footer__nav-link"
                  style={{ ["--text-delay" as string]: `${0.08 + idx * 0.06}s` }}
                >
                  {n.label}
                  {n.badge && <span className="footer__badge">{n.badge}</span>}
                </Link>
              ))}
            </div>

            <div className="footer__nav-legal-wrap">
              <Link
                href="/privacy"
                className="footer__nav-legal"
                style={{ ["--text-delay" as string]: "0.46s" }}
              >
                Privacy Policy
                <RightArrow />
              </Link>
              <Link
                href="/terms"
                className="footer__nav-legal"
                style={{ ["--text-delay" as string]: "0.52s" }}
              >
                Terms of Service
                <RightArrow />
              </Link>
            </div>
          </nav>

          {/* contact + subscribe */}
          <div
            data-index="1"
            className={`footer__mid reveal-up ${isVisible(1) ? "is-visible" : ""}`.trim()}
            style={{ ["--reveal-delay" as string]: "0.25s" }}
          >
            <a
              href="mailto:info@businessupscalers.com"
              className="footer__card footer__contact"
              style={{ ["--text-delay" as string]: "0.08s" }}
            >
              <Plus />
              info@businessupscalers.com
            </a>
            <a
              href="tel:+18323409080"
              className="footer__card footer__contact"
              style={{ ["--text-delay" as string]: "0.16s" }}
            >
              <Plus />
              (832) 340-9080
            </a>
            <div
              className="footer__card footer__contact footer__address-card"
              style={{ ["--text-delay" as string]: "0.24s", display: "flex", gap: "10px", alignItems: "flex-start", padding: "20px 24px" }}
            >
              <Plus />
              <span className="footer__address-text">
                8115 Valburn Drive, Richmond Texas, 77406, USA
              </span>
            </div>
          </div>

          {/* ecosystem */}
          <div
            data-index="2"
            className={`footer__card footer__eco reveal-up ${isVisible(2) ? "is-visible" : ""}`.trim()}
            style={{ ["--reveal-delay" as string]: "0.50s" }}
          >
            <h3 style={{ ["--text-delay" as string]: "0.08s" }}>Ecosystem</h3>
            <ul>
              {ECOSYSTEM.map((e, idx) => (
                <li
                  key={e.label}
                  style={{ ["--text-delay" as string]: `${0.14 + idx * 0.06}s` }}
                >
                  <a href={e.href} target="_blank" rel="noopener noreferrer">
                    {e.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* bottom utility bar */}
        <div
          data-index="3"
          className={`footer__utility reveal-up ${isVisible(3) ? "is-visible" : ""}`.trim()}
          style={{ ["--reveal-delay" as string]: "0.72s" }}
        >
          <p className="footer__credit">© {new Date().getFullYear()} Business Upscalers LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function RightArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
