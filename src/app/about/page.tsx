import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Upscalers — Our Story, Mission & Approach",
  description:
    "Learn about Upscalers: a digital growth agency helping local service businesses dominate Google rankings through AI-powered strategies, premium development, and creative design.",
};

export default function AboutPage() {
  return <AboutClient />;
}
