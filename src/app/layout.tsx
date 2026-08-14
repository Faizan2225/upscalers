import type { Metadata, Viewport } from "next";
import "./main.css";
import LayoutWrapper from "./components/LayoutWrapper";

const geistSans = { variable: "--font-geist-sans" };
const geistMono = { variable: "--font-geist-mono" };

export const metadata: Metadata = {
  title: "Upscalers — Rank Higher on Google",
  description:
    "AI-powered GEO for local service businesses. Dominate Google Maps and local search.",
};

export const viewport: Viewport = {
  themeColor: "#7c5cff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#7c5cff" />
        <meta name="msapplication-navbutton-color" content="#7c5cff" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#7c5cff" />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

