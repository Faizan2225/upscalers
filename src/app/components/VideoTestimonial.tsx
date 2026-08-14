"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const TESTIMONIALS = [
  {
    id: "paul",
    quote: "Our busines has been on for 6 months now, and from the time Mark Williams reached out to me, He has just made our business explode, our phone rings non-stop.",
    author: "Brent Hilliard - A & B Locksmith Owner",
    videoSrc: "https://res.cloudinary.com/dcylaqbxa/video/upload/v1785276764/IMG_1743_zoc5li.mp4",
  },
  {
    id: "mark",
    quote: "Most of the companies were selling me fake leads, and I would barely have customers, but when I met Abraham from Upscalers company, my company completely changed. We started having minimum of 5 leads a day, and when I increased my budget, my number of leads increased.",
    author: "Prince Asong - Prince Asong Moving Owner",
    videoSrc: "https://res.cloudinary.com/dcylaqbxa/video/upload/v1785570012/IMG_4415_lm6lt9.mp4",
  },
];

export default function VideoTestimonial() {
  const { containerRef, isVisible } = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const active = TESTIMONIALS[activeIndex];

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setTimeout(() => {
      setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 300);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setTimeout(() => {
      setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 300);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [activeIndex]);

  return (
    <section className="video-testimonial" ref={containerRef}>
      <div data-index="0" className={`video-testimonial__panel reveal-up ${isVisible(0) ? "is-visible" : ""}`}>
        <div className="vt-slider">

          {/* Left panel: quote & control buttons */}
          <div className="vt-slider__left">
            <div className="vt-slider__quote-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.189 18.666H4v-7.666c0-3.333.666-6 4-8l2.667 1.334c-1.334 1.333-2 3.333-2 5.333h6.522v9.333zM22.667 18.666H15.48v-7.666c0-3.333.666-6 4-8l2.666 1.334c-1.333 1.333-2 3.333-2 5.333h6.521v9.333z" />
              </svg>
            </div>

            <div className={`vt-slider__content-wrap ${isTransitioning ? "is-fading" : ""}`}>
              <blockquote className="vt-slider__quote">
                “{active.quote}”
              </blockquote>
              <cite className="vt-slider__author">{active.author}</cite>
            </div>

            <div className="vt-slider__controls">
              <button
                type="button"
                onClick={handlePrev}
                className="vt-slider__btn"
                aria-label="Previous feedback video"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="vt-slider__btn"
                aria-label="Next feedback video"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right panel: landscape oriented video player */}
          <div className="vt-slider__right">
            <div className="vt-player-wrapper">
              <video
                ref={videoRef}
                src={active.videoSrc}
                className="vt-player"
                playsInline
                onClick={togglePlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              <button
                type="button"
                className={`vt-play-corner-btn ${isPlaying ? "is-hidden" : ""}`}
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause review video" : "Play review video"}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  {isPlaying ? (
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  ) : (
                    <path d="M8 5v14l11-7z" />
                  )}
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
