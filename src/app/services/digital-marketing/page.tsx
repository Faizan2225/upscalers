import type { Metadata } from "next";
import DigitalMarketingClient from "./DigitalMarketingClient";

export const metadata: Metadata = {
  title: "Digital Marketing Services — Upscalers | GEO, PPL, SMM & GBP",
  description:
    "AI-powered digital marketing services: Generative Engine Optimization (GEO), Pay Per Lead, Social Media Marketing, and Google Business Profile optimization for local businesses.",
};

export default function DigitalMarketingPage() {
  return <DigitalMarketingClient />;
}
