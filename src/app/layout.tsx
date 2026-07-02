import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Exo_2, Open_Sans } from "next/font/google";
import "./globals.css";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
  display: "swap",
});

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

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`!scroll-smooth ${exo2.variable} ${openSans.variable}`}>
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