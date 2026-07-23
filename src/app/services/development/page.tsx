import type { Metadata } from "next";
import DevelopmentClient from "./DevelopmentClient";

export const metadata: Metadata = {
  title: "Development Services — Upscalers | Web, App & Software Development",
  description:
    "Custom web development, mobile app development, enterprise software, and bespoke digital solutions built for performance, scalability, and business growth.",
};

export default function DevelopmentPage() {
  return <DevelopmentClient />;
}
