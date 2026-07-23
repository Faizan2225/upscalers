import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — Upscalers | Book a Free Audit",
  description:
    "Get in touch with Upscalers. Book your free local search audit, ask a question, or discuss your next custom development or design project.",
};

export default function ContactPage() {
  return <ContactClient />;
}
