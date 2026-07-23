"use client";

import Link from "next/link";
import ScrollRevealText from "./ScrollRevealText";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface PageHeroProps {
  title: string;
  subtitle: string;
  breadcrumbs?: { label: string; href: string }[];
}

export default function PageHero({ title, subtitle, breadcrumbs }: PageHeroProps) {
  const { containerRef, isVisible } = useScrollReveal();

  return (
    <section className="page-hero" ref={containerRef}>
      <div className="page-hero__inner">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            data-index="0"
            className={`page-hero__breadcrumbs reveal-up ${isVisible(0) ? "is-visible" : ""}`.trim()}
            aria-label="Breadcrumb"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.href}>
                {i > 0 && <span className="page-hero__breadcrumb-sep">/</span>}
                <Link href={crumb.href} className="page-hero__breadcrumb-link">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
        )}

        <h1 className="page-hero__title">
          <ScrollRevealText text={title} />
        </h1>

        <p
          data-index="1"
          className={`page-hero__subtitle reveal-up ${isVisible(1) ? "is-visible" : ""}`.trim()}
          style={{ animationDelay: "0.3s" }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}
