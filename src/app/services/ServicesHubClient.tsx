"use client";

import Link from "next/link";
import PageHero from "../components/PageHero";
import CtaBlock from "../components/CtaBlock";
import ScrollRevealText from "../components/ScrollRevealText";
import { useScrollReveal } from "../hooks/useScrollReveal";

const CATEGORIES = [
  {
    title: "Digital Marketing",
    href: "/services/digital-marketing",
    theme: "purple" as const,
    description:
      "Dominate local search with AI-powered GEO, Pay Per Lead campaigns, social media strategies, and Google Business Profile optimization.",
    services: ["GEO", "Pay Per Lead", "Social Media", "GBP Optimization"],
  },
  {
    title: "Development",
    href: "/services/development",
    theme: "dark" as const,
    description:
      "Custom-built digital solutions — from high-converting websites and mobile apps to enterprise software and bespoke integrations.",
    services: ["Web Dev", "App Dev", "Software Dev", "Custom Solutions"],
  },
  {
    title: "Design",
    href: "/services/design",
    theme: "light" as const,
    description:
      "Premium creative services that elevate your brand identity through distinctive logos, captivating animations, and professional video production.",
    services: ["Logo Design", "Animation", "Video Production"],
  },
];

export default function ServicesHub() {
  const { containerRef, isVisible } = useScrollReveal();

  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Everything your business needs to rank higher, convert more leads, and build a brand that stands out."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />

      <section className="services-hub" ref={containerRef}>
        <div className="services-hub__grid">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.title}
              href={cat.href}
              data-index={i}
              className={`services-hub__card services-hub__card--${cat.theme} reveal-up ${isVisible(i) ? "is-visible" : ""}`.trim()}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <span className="services-hub__card-number">/{String(i + 1).padStart(2, "0")}</span>
              <h2 className="services-hub__card-title">{cat.title}</h2>
              <p className="services-hub__card-desc">{cat.description}</p>
              <div className="services-hub__card-tags">
                {cat.services.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <span className="services-hub__card-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17 17 7M9 7h8v8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBlock />
    </>
  );
}
