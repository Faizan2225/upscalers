"use client";

import React, { useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import ScrollRevealText from "./ScrollRevealText";

export default function VideoTestimonial() {
  const { containerRef, isVisible } = useScrollReveal();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="video-testimonial" ref={containerRef}>
      <div className="video-testimonial__inner">
        <div className="video-testimonial__left">
          <span className="video-testimonial__kicker">Client Review</span>
          <h2 className="video-testimonial__title">
            <ScrollRevealText text="Hear It From Our Clients" />
          </h2>
          <p
            data-index="1"
            className={`video-testimonial__desc reveal-up ${isVisible(1) ? "is-visible" : ""}`}
            style={{ animationDelay: "0.3s" }}
          >
            Real results from local business owners who partnered with us. Watch the video feedback to see how we optimized their local visibility, Google Maps rankings, and phone calls.
          </p>

        </div>

        <div className="video-testimonial__right">
          <div className="video-wrapper">
            <video
              ref={videoRef}
              src="https://res.cloudinary.com/dcylaqbxa/video/upload/v1785276764/IMG_1743_zoc5li.mp4"
              className="video-player"
              playsInline
              onClick={togglePlay}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            {!isPlaying && (
              <button
                type="button"
                className="play-overlay"
                onClick={togglePlay}
                aria-label="Play client video testimonial"
              >
                <div className="play-button-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
