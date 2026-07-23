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

  return (
    <>
      <Header dark={dark} setDark={setDark} />
      {children}
      <Footer />
    </>
  );
}
