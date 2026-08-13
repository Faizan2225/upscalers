"use client";

import React, { useState } from "react";
import Link from "next/link";
import ScrollRevealText from "../components/ScrollRevealText";
import { useScrollReveal } from "../hooks/useScrollReveal";

const CONTACT_INFO = [
  {
    title: "Email Us",
    val: "support@businessupscalersllc.com",
    href: "mailto:support@businessupscalersllc.com",
    icon: "✉"
  },
  {
    title: "Call Us",
    val: "+1 (929) 244-9454",
    href: "tel:+19292449454",
    icon: "☎"
  },
  {
    title: "New York Office",
    val: "2442 Brigham Street Fl 2, Brooklyn, NY 11235, USA",
    href: "#",
    icon: "⚲"
  },
  {
    title: "New Jersey Office",
    val: "32 Morningside Ave, South River, NJ 08882, USA",
    href: "#",
    icon: "⚲"
  },
  {
    title: "Business Hours",
    val: "Mon - Fri, 9:00 AM - 6:00 PM EST",
    href: "#",
    icon: "🕒"
  }
];

export default function ContactClient() {
  const { containerRef, isVisible } = useScrollReveal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Google Business Profile (GBP)",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <>
      {/* Premium Hero */}
      <section className="contact-hero">
        <div className="contact-hero__glow" />
        <div className="contact-hero__inner">
          <nav className="contact-hero__breadcrumbs">
            <Link href="/">Home</Link>
            <span className="contact-hero__breadcrumbs-sep">/</span>
            <span>Contact</span>
          </nav>
          <h1 className="contact-hero__title">
            <ScrollRevealText text="Let's build something." />
          </h1>
          <p className="contact-hero__subtitle">
            Request your free local search audit or send a brief details statement about your custom app or web build goals.
          </p>
        </div>
      </section>

      <section className="contact-page" ref={containerRef}>
        <div className="contact-page__grid">
          {/* Interactive Form Side */}
          <div 
            data-index="0"
            className={`contact-page__form-container reveal-up ${isVisible(0) ? "is-visible" : ""}`.trim()}
          >
            {submitted ? (
              <div className="contact-page__success">
                <div className="contact-page__success-checkmark">
                  <span>✓</span>
                </div>
                <h2>Request Received</h2>
                <p>We have queued your local audit. A lead engineer will analyze your GBP presence and follow up within 24 hours.</p>
                <button 
                  type="button" 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", service: "Google Business Profile (GBP)", message: "" });
                  }}
                  className="contact-page__reset-btn"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__row">
                  <div className={`contact-form__field ${focusedField === "name" || formData.name ? "is-active" : ""}`}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className={`contact-form__field ${focusedField === "email" || formData.email ? "is-active" : ""}`}>
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className={`contact-form__field ${focusedField === "phone" || formData.phone ? "is-active" : ""}`}>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="(555) 0199"
                      value={formData.phone}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className={`contact-form__field is-active`}>
                    <label htmlFor="service">Desired Service</label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option>Google Business Profile (GBP)</option>
                      <option>Generative Engine Optimization (GEO)</option>
                      <option>Pay Per Lead (PPL)</option>
                      <option>Custom Web Development</option>
                      <option>Brand Identity / Design</option>
                    </select>
                  </div>
                </div>

                <div className={`contact-form__field ${focusedField === "message" || formData.message ? "is-active" : ""}`}>
                  <label htmlFor="message">Your Project Details</label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    placeholder="Tell us about your target keywords, service locations, or app vision..."
                    value={formData.message}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="contact-form__submit">
                  <span>Send Audit Request</span>
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
            )}
          </div>

          {/* Satisfying Info & Live Preview Side */}
          <div 
            data-index="1"
            className={`contact-page__info-container reveal-up ${isVisible(1) ? "is-visible" : ""}`.trim()}
            style={{ animationDelay: "0.2s" }}
          >
            {/* Live Interactive Preview Card */}
            <div className="contact-preview">
              <div className="contact-preview__header">
                <span className="contact-preview__dot" />
                <span className="contact-preview__dot" />
                <span className="contact-preview__dot" />
                <span className="contact-preview__title">LIVE AUDIT PROPOSAL</span>
              </div>
              <div className="contact-preview__body">
                <div className="contact-preview__meta">
                  <span className="contact-preview__tag">Lead Intel</span>
                  <span className="contact-preview__date">Now</span>
                </div>
                <div className="contact-preview__content">
                  <p className="contact-preview__line">
                    <span className="lbl">Client:</span>{" "}
                    <span className="val">{formData.name || "Undetermined Client"}</span>
                  </p>
                  <p className="contact-preview__line">
                    <span className="lbl">Channel:</span>{" "}
                    <span className="val">{formData.email || "No email entered"}</span>
                  </p>
                  <p className="contact-preview__line">
                    <span className="lbl">Objective:</span>{" "}
                    <span className="val text-accent">{formData.service}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Info Cards */}
            <div className="contact-page__info-grid">
              {CONTACT_INFO.map((info) => (
                <div 
                  key={info.title} 
                  className="contact-page__info-card"
                  onClick={() => info.href !== "#" && handleCopy(info.val)}
                >
                  <span className="contact-page__info-icon">{info.icon}</span>
                  <div>
                    <h3>{info.title}</h3>
                    {info.href !== "#" ? (
                      <span className="contact-page__info-val contact-page__info-val--link">
                        {info.val}
                        <span className="contact-page__copy-tooltip">
                          {copiedText === info.val ? "Copied!" : "Click to Copy"}
                        </span>
                      </span>
                    ) : (
                      <span className="contact-page__info-val">{info.val}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
