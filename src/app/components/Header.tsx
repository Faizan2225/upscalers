"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type MenuItem = { label: string };

const MENU: MenuItem[] = [
  { label: "Home" },
  { label: "Works" },
  { label: "Pages" },
  { label: "Insights" },
  { label: "Contact" },
];

interface HeaderProps {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ dark, setDark }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* track page scroll for header styling */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* lock body scroll while the overlay is open + close on Escape */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isDarkHeader = (dark && !scrolled) || open;

  const headerClass = [
    "header",
    scrolled && "is-scrolled",
    isDarkHeader && "is-dark-header",
    open && "is-menu-open",
  ]
    .filter(Boolean)
    .join(" ");

  const fabClass = [
    "menu-fab",
    open && "is-open",
    isDarkHeader && !open && "is-dark",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* ── Fixed top header bar ── */}
      <header className={headerClass}>
        <div
          className="header__logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img
            src="/favicon.PNG"
            alt="Upscalers"
            className="header__logo-icon"
          />
          <div className="header__logo-text">
            <span className="header__logo-brand">upscalers</span>
          </div>
        </div>

        <div className="header__actions">
          <button
            className="header__icon-btn"
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

          <button className="header__pill" type="button">
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

          {/* Space reservation for the floating burger button */}
          <div className="menu-fab-spacer" />
        </div>
      </header>

      {/* ── Standalone floating burger / close button ── */}
      <button
        className={fabClass}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            className="menu-fab__top"
            d="M4 9h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            className="menu-fab__bottom"
            d="M4 15h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* ── Full-screen overlay menu ── */}
      <div
        className={`menu-overlay${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        {/* Animated vertical column divider */}
        <div className="menu-overlay__divider" />

        {/* Left column: intro + navigation + credits */}
        <div className="menu-overlay__left">
          <div className="menu-overlay__intro">
            <span className="menu-overlay__intro-bold">
              🦄 Innovative design
            </span>
            <span className="menu-overlay__intro-muted">
              and cutting-edge development
            </span>
          </div>

          <nav className="menu-overlay__nav" aria-label="Primary">
            {MENU.map((item, i) => (
              <div
                key={item.label}
                className="menu-item"
                style={{ ["--d" as string]: `${i * 0.05}s` }}
              >
                <button
                  type="button"
                  className="menu-item__head"
                  onClick={() => setOpen(false)}
                >
                  <span>{item.label}</span>
                  {i < MENU.length - 1 && (
                    <span className="menu-item__plus" aria-hidden="true">
                      <i />
                      <i />
                    </span>
                  )}
                </button>
              </div>
            ))}
          </nav>

          <div className="menu-overlay__credits">
            Made with <span className="menu-overlay__heart">💚</span> by{" "}
            <span className="menu-overlay__brand">upscalers</span>
          </div>
        </div>

        {/* Right column: promo text + preview card + copyright */}
        <div className="menu-overlay__right">
          <div className="menu-overlay__promo">
            <span className="menu-overlay__promo-bold">
              👋 New Rayo template is here!
            </span>
            <span className="menu-overlay__promo-muted">
              Showcase your projects, services and expertise with impact.
            </span>
          </div>

          <div className="menu-overlay__art" aria-hidden="true">
            <div className="menu-overlay__art-spin">
              <Image
                src="/img.PNG"
                alt=""
                width={520}
                height={520}
                priority={false}
              />
            </div>
          </div>

          <div className="menu-overlay__copy">©2025</div>
        </div>
      </div>
    </>
  );
}
