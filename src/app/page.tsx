"use client";

import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import CaseStudies from "./components/CaseStudies";
import StatsCards from "./components/StatsCards";
import About from "./components/About";
import CtaBlock from "./components/CtaBlock";
import Footer from "./components/Footer";

export default function Home() {
  const [dark, setDark] = useState(false);

  return (
    <>
      <Header dark={dark} setDark={setDark} />
      <Hero dark={dark} />
      <Services />
      <CaseStudies />
      <StatsCards />
      <About />
      <CtaBlock />
      <Footer />
    </>
  );
}
