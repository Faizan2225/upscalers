"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* Persistent hamburger (fixed top-right) → full-screen dark overlay menu
   with accordion sub-menus and a hypnotically rotating 3D render. */

type MenuItem = { label: string; sub?: string[] };

const MENU: MenuItem[] = [
  { label: "Home" },
  { label: "Works" },
  {
    label: "Services",
    sub: [
      "Google Maps Rankings",
      "AI-Powered GEO",
      "High-Converting Websites",
      "Local Authority",
    ],
  },
  {
    label: "Pages",
    sub: ["About us", "Case Studies", "Pricing", "FAQ", "Contact"],
  },
  { label: "Insights" },
  { label: "Contact" },
];

export default function MenuButton() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const artRef = useRef<HTMLDivElement>(null);

  // lock body scroll while the overlay is open + close on Escape
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

  // subtle cursor-reactive tilt on the 3D render inside the overlay
  useEffect(() => {
    if (!open) return;
    const art = artRef.current;
    if (!art) return;
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      art.style.setProperty("--tilt-x", `${-y}deg`);
      art.style.setProperty("--tilt-y", `${x}deg`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [open]);

  return (
    <>
      <button
        className="menu-fab"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={open ? "is-open" : ""}
        >
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

      <div className={`menu-overlay${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Site menu">
        <nav className="menu-overlay__nav" aria-label="Primary">
          {MENU.map((item, i) => {
            const isOpen = active === i;
            const hasSub = !!item.sub?.length;
            return (
              <div
                key={item.label}
                className={`menu-item${isOpen ? " is-active" : ""}`}
                style={{ ["--d" as string]: `${i * 0.06}s` }}
              >
                <button
                  type="button"
                  className="menu-item__head"
                  onClick={() =>
                    hasSub ? setActive(isOpen ? null : i) : setOpen(false)
                  }
                >
                  <span>{item.label}</span>
                  {hasSub && (
                    <span className="menu-item__plus" aria-hidden="true">
                      <i />
                      <i />
                    </span>
                  )}
                </button>
                {hasSub && (
                  <div className="menu-item__drawer">
                    <ul>
                      {item.sub!.map((s, j) => (
                        <li
                          key={s}
                          style={{ ["--sd" as string]: `${j * 0.05}s` }}
                        >
                          <a href="#" onClick={() => setOpen(false)}>
                            {s}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="menu-overlay__art" aria-hidden="true">
          {/* outer = cursor tilt (JS) · inner = infinite spin (CSS) → no conflict */}
          <div className="menu-overlay__art-tilt" ref={artRef}>
            <div className="menu-overlay__art-spin">
              <Image src="/img.PNG" alt="" width={520} height={520} priority={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
