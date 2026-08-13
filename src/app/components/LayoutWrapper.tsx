"use client";

import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dark, setDark] = useState(false);

  /* Sync the data-theme attribute on <html> whenever dark changes */
  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.setAttribute("data-theme", "dark");
    } else {
      html.removeAttribute("data-theme");
    }
  }, [dark]);

  /* Initialize Lenis site-wide smooth momentum scroll */
  useEffect(() => {
    let lenisInstance: any = null;
    let rafId: number;

    import("lenis").then((LenisModule) => {
      const LenisClass = LenisModule.default;
      lenisInstance = new LenisClass({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 0, // Keep native touch scroll on mobile for 60fps GPU performance
      });

      const raf = (time: number) => {
        lenisInstance?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);

  return (
    <>
      <Header dark={dark} setDark={setDark} />
      {children}
      <Footer />
    </>
  );
}
