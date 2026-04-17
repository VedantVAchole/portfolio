import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vedant Achole — Data Engineer",
  description:
    "Data engineer and AI practitioner. Building healthcare payment-integrity platforms on Databricks, AWS, and dbt. Available for full-time roles from July 2026.",
  openGraph: {
    title: "Vedant Achole — Data Engineer",
    description: "Building end-to-end data systems for healthcare and AI.",
    url: "https://vedantachole.com",
    siteName: "Vedant Achole",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
