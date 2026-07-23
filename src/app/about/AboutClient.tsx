"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import CtaBlock from "../components/CtaBlock";
import ScrollRevealText from "../components/ScrollRevealText";
import { useScrollReveal } from "../hooks/useScrollReveal";

const VALUES = [
  {
    title: "Extreme Ownership",
    desc: "We own our results, our communication, and our clients' successes. No excuses, just relentless pursuit of positive ROI."
  },
  {
    title: "Data Over Hype",
    desc: "We don't sell vanity metrics. We measure calls, leads, and organic revenue generated. If it doesn't move the needle, we don't do it."
  },
  {
    title: "Modern Innovation",
    desc: "We continuously adapt our frameworks to target new search environments, AI search dynamics, and modern aesthetic standards."
  }
];

const METRICS = [
  { val: "10x+", label: "Average Call Volume Increase", desc: "For local service providers in target regions." },
  { val: "94%", label: "Client Retention Score", desc: "Long-term partnership built on verified business growth." },
  { val: "1.2M+", label: "Leads Routed to Partners", desc: "Direct, high-intent local phone calls and queries." }
];

const STEPS = [
  { num: "01", title: "Interrogate", desc: "We map your service radius, search landscape, and competitor gap metrics." },
  { num: "02", title: "Build", desc: "We deploy transparent local structures, custom Next.js landing pages, and optimize GBPs." },
  { num: "03", title: "Rank", desc: "We build localized authority trust signals to force your business into the local 3-pack." },
  { num: "04", title: "Dominate", desc: "We continuously optimize for next-generation generative search engines (GEO)." }
];

export default function AboutClient() {
  const { containerRef, isVisible } = useScrollReveal();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [activeStep, setActiveStep] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const { clientX, clientY } = e;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 30;
    const y = (clientY - (rect.top + rect.height / 2)) / 30;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  return (
    <>
      {/* Dynamic 3D Interactive Hero */}
      <section 
        className="about-hero" 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="about-hero__glow-1" />
        <div className="about-hero__glow-2" />
        
        <div className="about-hero__inner">
          <div className="about-hero__text">
            <nav className="about-hero__breadcrumbs">
              <Link href="/">Home</Link>
              <span className="about-hero__breadcrumbs-sep">/</span>
              <span>About</span>
            </nav>
            <h1 className="about-hero__title">
              <ScrollRevealText text="Engineering local growth." />
            </h1>
            <p className="about-hero__subtitle">
              We design and code high-performance digital systems that connect local service brands with customers who need them today.
            </p>
          </div>

          <div 
            className="about-hero__visual"
            style={{
              transform: `translate3d(${coords.x}px, ${coords.y}px, 0) rotateY(${coords.x * 0.5}deg) rotateX(${-coords.y * 0.5}deg)`,
              transition: coords.x === 0 ? "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)" : "none"
            }}
          >
            <div className="about-hero__card">
              <div className="about-hero__card-glow" />
              <Image
                src="/images/svc_3d_about.png"
                alt="Upscalers Rocket Lightbulb"
                width={380}
                height={380}
                className="about-hero__3d-img"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="about-page" ref={containerRef}>
        {/* Story Section */}
        <div 
          data-index="0"
          className={`about-page__story reveal-up ${isVisible(0) ? "is-visible" : ""}`.trim()}
        >
          <div className="about-page__story-text">
            <span className="about-page__section-tag">Our Vision</span>
            <h2>Who We Are</h2>
            <p>
              Upscalers is a local search optimization and engineering team. We observed that traditional SEO agencies were selling outdated ranking packages while businesses were losing opportunities because customer behavior changed.
            </p>
            <p>
              Today, customers find services through Google Maps, AI summary search engines, and highly responsive mobile platforms. We design and build the exact structures required to intercept this traffic, rank at the top, and convert visits to phone calls.
            </p>
          </div>
          
          <div className="about-page__story-visual">
            <div className="about-page__story-visual-glow" />
            <div className="about-page__story-visual-inner">
              <div className="about-page__grid-nodes">
                <div className="node node--active" />
                <div className="node" />
                <div className="node" />
                <div className="node node--pulse" />
              </div>
              <span className="about-page__visual-tag">Google maps index</span>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Metrics Grid */}
        <div 
          data-index="1"
          className={`about-page__metrics-row reveal-up ${isVisible(1) ? "is-visible" : ""}`.trim()}
          style={{ animationDelay: "0.2s" }}
        >
          <div className="about-page__metrics-grid">
            {METRICS.map((metric, i) => (
              <div key={metric.label} className="about-page__metric-card group">
                <div className="about-page__metric-card-glow" />
                <span className="about-page__metric-val">{metric.val}</span>
                <span className="about-page__metric-label">{metric.label}</span>
                <p className="about-page__metric-desc">{metric.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Blueprint Methodology Section */}
        <div 
          data-index="2"
          className={`about-blueprint reveal-up ${isVisible(2) ? "is-visible" : ""}`.trim()}
          style={{ animationDelay: "0.3s" }}
        >
          <div className="about-blueprint__header">
            <span className="about-page__section-tag">How We Work</span>
            <h2>Our Blueprint</h2>
          </div>
          
          <div className="about-blueprint__content">
            <div className="about-blueprint__nav">
              {STEPS.map((step, idx) => (
                <button
                  key={step.num}
                  type="button"
                  className={`about-blueprint__nav-btn ${activeStep === idx ? "is-active" : ""}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <span className="about-blueprint__nav-num">{step.num}</span>
                  <span className="about-blueprint__nav-title">{step.title}</span>
                </button>
              ))}
            </div>
            
            <div className="about-blueprint__pane">
              <div className="about-blueprint__pane-glow" />
              <span className="about-blueprint__pane-num">{STEPS[activeStep].num}</span>
              <h3>{STEPS[activeStep].title}</h3>
              <p>{STEPS[activeStep].desc}</p>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div 
          data-index="3"
          className={`about-page__values-section reveal-up ${isVisible(3) ? "is-visible" : ""}`.trim()}
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="about-page__values-title">Our Core Values</h2>
          <div className="about-page__values-grid">
            {VALUES.map((val, i) => (
              <div key={val.title} className="about-page__value-card">
                <span className="about-page__value-num">0{i+1}</span>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock />
    </>
  );
}
