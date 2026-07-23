"use client";

import React, { useState } from "react";
import Image from "next/image";
import PageHero from "../../components/PageHero";
import CtaBlock from "../../components/CtaBlock";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const SERVICES = [
  {
    id: "logo",
    title: "Logo Design",
    src: "/images/svc_3d_logo.png",
    description:
      "Your logo is the face of your brand — it needs to be unforgettable. We craft distinctive, versatile logo identities that communicate trust and professionalism instantly. From initial concept exploration to final delivery in every format you'll ever need.",
    benefits: [
      "Multiple concept directions to choose from",
      "Full brand identity system & guidelines",
      "All file formats (SVG, PNG, PDF, EPS)",
      "Social media avatar & favicon variations",
    ],
    align: "left" as const,
  },
  {
    id: "animation",
    title: "Animation",
    src: "/images/svc_3d_animation.png",
    description:
      "Motion brings your brand to life. From explainer videos and logo animations to UI micro-interactions and social media motion graphics — our animation work captivates audiences and makes complex ideas feel simple and engaging.",
    benefits: [
      "2D & 3D motion graphics",
      "Logo reveal & brand animations",
      "Explainer video production",
      "UI/UX micro-interactions & transitions",
    ],
    align: "right" as const,
  },
  {
    id: "video",
    title: "Video Production",
    src: "/images/svc_3d_video.png",
    description:
      "Professional video content that tells your story and drives action. From brand films and testimonial videos to social media content and product showcases — we handle scripting, shooting, editing, and post-production to deliver polished results.",
    benefits: [
      "End-to-end production & post-production",
      "Brand storytelling & testimonial videos",
      "Social media video content packages",
      "Drone footage & cinematic editing",
    ],
    align: "left" as const,
  },
];

export default function DesignClient() {
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
        title="Design"
        subtitle="Premium creative that elevates your brand — from iconic logos to cinematic video production."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Design", href: "/services/design" },
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
