import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton"; 

export const metadata: Metadata = {
  title: "RA Dev | Desarrollo Web Impulsado por IA",
  description: "Desarrollador de software especialista en dirigir y entregar proyectos web de alta calidad de forma eficiente, utilizando una metodología de desarrollo asistida por IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="!scroll-smooth">
      <body className="bg-brand-dark text-brand-text-primary antialiased">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}