import type { Metadata } from "next";
import DesignClient from "./DesignClient";

export const metadata: Metadata = {
  title: "Design Services — Upscalers | Logo, Animation & Video Production",
  description:
    "Premium design services including distinctive logo design, captivating motion graphics & animation, and professional video production for brands that demand excellence.",
};

export default function DesignPage() {
  return <DesignClient />;
}
