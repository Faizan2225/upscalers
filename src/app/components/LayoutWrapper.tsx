"use client";

import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dark, setDark] = useState(false);

  return (
    <>
      <Header dark={dark} setDark={setDark} />
      {children}
      <Footer />
    </>
  );
}
