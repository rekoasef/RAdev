import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import WhatsAppButton from "@/components/WhatsAppButton";
import PageLoader from "@/components/PageLoader";
import Analytics from "@/components/Analytics";
import ScrollTracker from "@/components/ScrollTracker";
import TimeTracker from "@/components/TimeTracker";

export const metadata: Metadata = {
  title: "RA Dev | Desarrollador Web Full-Stack",
  description:
    "Desarrollador web full-stack especializado en construir sitios y aplicaciones modernas, rápidas y enfocadas en resultados. Next.js, React, TypeScript y más.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="!scroll-smooth">
      <body className="bg-brand-dark text-brand-text-primary antialiased">

        <PageLoader />
        {children}

        <WhatsAppButton />

        {/* 🔥 GOOGLE ANALYTICS BASE */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FBZB2DEMFR"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag(){
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-FBZB2DEMFR', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* 🔥 TRACKING SPA */}
        <Analytics />

        {/* 🔥 SCROLL DEPTH TRACKING */}
        <ScrollTracker />

        {/* 🔥 TIME ON PAGE TRACKING */}
        <TimeTracker />

      </body>
    </html>
  );
}