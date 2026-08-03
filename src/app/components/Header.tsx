"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type MenuItem = {
  label: string;
  href?: string;
  subItems?: { label: string; href: string }[];
};
const MENU: MenuItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    subItems: [
      { label: "Overview", href: "/services" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "Development", href: "/services/development" },
      { label: "Design", href: "/services/design" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];
interface HeaderProps {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ dark, setDark }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isOverDarkHero, setIsOverDarkHero] = useState(false);
  const pathname = usePathname();

  /* track page scroll for header styling & dark hero overlays */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      // Check if we are on a page route with a dark hero section
      const isDarkRoute = pathname === "/about" || pathname === "/contact";
      if (isDarkRoute) {
        setIsOverDarkHero(scrollY < 420);
      } else {
        setIsOverDarkHero(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

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

  const isDarkHeader = dark || open || isOverDarkHero;

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
        <Link
          href="/"
          className="header__logo"
          onClick={() => {
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src="/favicon.PNG"
            alt="Upscalers"
            className="header__logo-icon"
          />
          <div className="header__logo-text">
            <span className="header__logo-brand">upscalers</span>
          </div>
        </Link>

        <div className="header__actions">
          <button
            className="header__icon-btn"
            aria-label="Toggle theme"
            aria-pressed={dark}
            onClick={() => setDark((d) => !d)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
              <path d="M19 4v4M17 6h4" strokeWidth="1.8" />
              <path d="M14 2v2M13 3h2" strokeWidth="1.2" />
            </svg>
          </button>

          <button className="header__pill" type="button">
            <span className="header__pill-text">Say Hello</span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M7 17 17 7M9 7h8v8"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Inline burger close button for 100% flex alignment */}
          <button
            className={fabClass}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                className="menu-fab__top"
                d="M5 12h14"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                className="menu-fab__bottom"
                d="M5 12h14"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* ── Full-screen overlay menu ── */}
      <div
        className={`menu-overlay${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        {/* Animated vertical column divider */}
        <div className="menu-overlay__divider" />

        {/* Left column: navigation */}
        <div className="menu-overlay__left">
          <nav className="menu-overlay__nav" aria-label="Primary">
            {MENU.map((item, i) => (
              <div
                key={item.label}
                className="menu-item"
                style={{ ["--d" as string]: `${i * 0.05}s` }}
              >
                {item.subItems ? (
                  <>
                    <button
                      type="button"
                      className="menu-item__head"
                      onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
                    >
                      <span>{item.label}</span>
                      <span className={`menu-item__plus${expandedItem === item.label ? " is-expanded" : ""}`} aria-hidden="true">
                        <i />
                        <i />
                      </span>
                    </button>
                    <div className={`menu-item__sub${expandedItem === item.label ? " is-open" : ""}`}>
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="menu-item__sub-link"
                          onClick={() => setOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className="menu-item__head"
                    onClick={() => setOpen(false)}
                  >
                    <span>{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right column: preview card + copyright */}
        <div className="menu-overlay__right">
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

          <div className="menu-overlay__copy">©{new Date().getFullYear()}</div>
        </div>
      </div>
    </>
  );
}
