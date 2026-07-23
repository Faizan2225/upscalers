"use client";

import React, { useState } from "react";
import Image from "next/image";
import PageHero from "../../components/PageHero";
import CtaBlock from "../../components/CtaBlock";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const SERVICES = [
  {
    id: "geo",
    title: "Generative Engine Optimization (GEO)",
    src: "/images/svc_3d_geo.png",
    description:
      "Traditional SEO is evolving. GEO prepares your business for the next generation of search — where AI-powered engines like Google SGE, ChatGPT, and Perplexity determine visibility. We structure your content, schema, and digital footprint so AI models surface your brand as the authoritative answer.",
    benefits: [
      "Optimized for AI-generated search results",
      "Structured data & schema markup implementation",
      "Authority building across AI knowledge graphs",
      "Future-proof local search positioning",
    ],
    align: "left" as const,
  },
  {
    id: "ppl",
    title: "Pay Per Lead (PPL)",
    src: "/images/svc_3d_ppl.png",
    description:
      "Stop paying for clicks that don't convert. Our Pay Per Lead model ensures you only invest in real, qualified leads — verified phone calls and form submissions from customers actively searching for your services. Zero wasted ad spend, maximum ROI.",
    benefits: [
      "Only pay for verified, qualified leads",
      "No wasted budget on empty clicks",
      "Real-time lead tracking dashboard",
      "Transparent pricing with guaranteed results",
    ],
    align: "right" as const,
  },
  {
    id: "smm",
    title: "Social Media Marketing",
    src: "/images/svc_3d_smm.png",
    description:
      "Build a loyal local following and turn social engagement into real-world customers. We craft scroll-stopping content strategies tailored for local service businesses — from Instagram reels that showcase your work to Facebook campaigns that drive appointment bookings.",
    benefits: [
      "Platform-specific content strategies",
      "Engagement-driven community building",
      "Targeted local audience campaigns",
      "Monthly analytics & performance reports",
    ],
    align: "left" as const,
  },
  {
    id: "gbp",
    title: "Google Business Profile (GBP)",
    src: "/images/svc_3d_gbp.png",
    description:
      "Your Google Business Profile is the single most important asset for local visibility. We optimize every element — from categories and attributes to posts, photos, and review management — ensuring your profile ranks in the coveted local 3-pack and drives consistent inbound calls.",
    benefits: [
      "Complete GBP audit & optimization",
      "Review management & response strategy",
      "Weekly Google Posts for engagement",
      "Local 3-pack ranking improvements",
    ],
    align: "right" as const,
  },
];

export default function DigitalMarketingClient() {
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
        title="Digital Marketing"
        subtitle="AI-powered strategies that put your business in front of the right customers at the right time — on Google, social media, and beyond."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Digital Marketing", href: "/services/digital-marketing" },
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
