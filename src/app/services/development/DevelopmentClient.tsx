"use client";

import React, { useState } from "react";
import Image from "next/image";
import PageHero from "../../components/PageHero";
import CtaBlock from "../../components/CtaBlock";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const SERVICES = [
  {
    id: "web",
    title: "Web Development",
    src: "/images/svc_3d_web.png",
    description:
      "We build blazing-fast, SEO-optimized websites that convert visitors into customers. Every site is engineered for performance — sub-second load times, mobile-first design, and conversion-focused layouts that work as hard as your best salesperson.",
    benefits: [
      "Custom-coded with Next.js & React",
      "Core Web Vitals optimized for Google rankings",
      "Mobile-first responsive design",
      "Integrated lead capture & CRM connectivity",
    ],
    align: "left" as const,
  },
  {
    id: "app",
    title: "App Development",
    src: "/images/svc_3d_app.png",
    description:
      "From concept to App Store — we design and develop native and cross-platform mobile applications that your customers will love using. Clean interfaces, smooth animations, and robust backend architecture deliver an experience that keeps users coming back.",
    benefits: [
      "iOS & Android native & cross-platform",
      "Intuitive UX with premium UI design",
      "Push notifications & offline capabilities",
      "Backend API development & integration",
    ],
    align: "right" as const,
  },
  {
    id: "software",
    title: "Software Development",
    src: "/images/svc_3d_software.png",
    description:
      "Enterprise-grade software solutions built to streamline your operations. From internal dashboards and CRM systems to automated workflows and data pipelines, we architect scalable software that grows with your business and eliminates manual bottlenecks.",
    benefits: [
      "Custom business process automation",
      "Scalable cloud-native architecture",
      "Real-time dashboards & analytics",
      "Third-party API integrations",
    ],
    align: "left" as const,
  },
  {
    id: "custom",
    title: "Custom Solutions",
    src: "/images/svc_3d_custom.png",
    description:
      "Some challenges require a bespoke approach. Whether it's a unique integration between platforms, an AI-powered tool tailored to your niche, or a complete digital ecosystem — we engineer solutions that don't exist off the shelf.",
    benefits: [
      "Tailored architecture for unique requirements",
      "AI & machine learning integrations",
      "Legacy system modernization",
      "End-to-end project ownership & support",
    ],
    align: "right" as const,
  },
];

export default function DevelopmentClient() {
  const { containerRef, isVisible } = useScrollReveal();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / 15;
    const y = (e.clientY - (rect.top + rect.height / 2)) / 15;
    setMouseOffset({ x, y });
    setHoveredIdx(index);
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setHoveredIdx(null);
  };

  return (
    <>
      <PageHero
        title="Development"
        subtitle="High-performance digital products built with modern technology — designed to scale, convert, and outperform."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Development", href: "/services/development" },
        ]}
      />

      <section className="service-detail" ref={containerRef}>
        {SERVICES.map((svc, i) => (
          <div
            key={svc.id}
            data-index={i}
            className={`service-detail__row service-detail__row--${svc.align} reveal-up ${isVisible(i) ? "is-visible" : ""}`.trim()}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="service-detail__text">
              <span className="service-detail__number">/{String(i + 1).padStart(2, "0")}</span>
              <h2 className="service-detail__title">{svc.title}</h2>
              <p className="service-detail__desc">{svc.description}</p>
              <ul className="service-detail__benefits">
                {svc.benefits.map((b) => (
                  <li key={b}>
                    <CheckIcon />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div 
              className="service-detail__visual"
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="service-detail__glow" />
              <Image
                src={svc.src}
                alt={svc.title}
                width={360}
                height={360}
                style={{ 
                  objectFit: "contain", 
                  zIndex: 2,
                  transform: hoveredIdx === i
                    ? `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0) rotateY(${mouseOffset.x * 0.4}deg) rotateX(${-mouseOffset.y * 0.4}deg) scale(1.05)`
                    : "translate3d(0,0,0) scale(1)",
                  transition: hoveredIdx === i ? "none" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              />
            </div>
          </div>
        ))}
      </section>

      <CtaBlock />
    </>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="service-detail__check" aria-hidden="true">
      <path
        d="M5 12.5l4 4 10-11"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
