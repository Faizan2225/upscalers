"use client";

import { useScrollReveal } from "../hooks/useScrollReveal";

const NAV: { label: string; badge?: string }[] = [
  { label: "Home" },
  { label: "Services" },
  { label: "Results", badge: "+4" },
  { label: "About" },
  { label: "Insights" },
  { label: "Contact" },
];

const ECOSYSTEM = [
  "Google Business",
  "Instagram",
  "LinkedIn",
  "Facebook",
  "YouTube",
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

  return (
    <footer id="site-footer" className="footer" aria-label="Footer" ref={containerRef}>
      <div className="footer__inner">
        <div className="footer__wordmark">upscalers</div>

        <div className="footer__grid">
        {/* nav */}
        <nav 
          data-index="0" 
          className={`footer__card footer__nav reveal-up ${isVisible(0) ? "is-visible" : ""}`} 
          aria-label="Footer navigation"
        >
          {NAV.map((n) => (
            <a key={n.label} href="#" className="footer__nav-link">
              {n.label}
              {n.badge && <span className="footer__badge">{n.badge}</span>}
            </a>
          ))}
        </nav>

        {/* contact + subscribe */}
        <div 
          data-index="1" 
          className={`footer__mid reveal-up ${isVisible(1) ? "is-visible" : ""}`}
          style={{ animationDelay: "0.3s" }}
        >
          <a href="mailto:hello@upscalers.com" className="footer__card footer__contact">
            <Plus />
            hello@upscalers.com
          </a>
          <a href="tel:+12127089400" className="footer__card footer__contact">
            <Plus />
            +1 212-708-9400
          </a>
          <div className="footer__card footer__subscribe">
            <h3>Subscribe to our insights:</h3>
            <form className="footer__sub-form">
              <input
                type="email"
                placeholder="Your email"
                aria-label="Your email"
              />
              <button type="submit" aria-label="Subscribe">
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
            </form>
          </div>
        </div>

        {/* ecosystem */}
        <div 
          data-index="2" 
          className={`footer__card footer__eco reveal-up ${isVisible(2) ? "is-visible" : ""}`}
          style={{ animationDelay: "0.6s" }}
        >
          <h3>Ecosystem</h3>
          <ul>
            {ECOSYSTEM.map((e) => (
              <li key={e}>
                <a href="#">{e}</a>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </footer>
  );
}
