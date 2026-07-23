import type { Metadata } from "next";
import ServicesHub from "./ServicesHubClient";

export const metadata: Metadata = {
  title: "Our Services — Upscalers | Digital Marketing, Development & Design",
  description:
    "Explore Upscalers' full suite of services: AI-powered digital marketing, custom web & app development, and premium design solutions for local businesses.",
};

export default function ServicesPage() {
  return <ServicesHub />;
}
