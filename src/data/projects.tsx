// src/data/projects.tsx

import type { ReactNode } from 'react';
import { Apple, Camera, Code, Scale, Coffee, LayoutDashboard, Smartphone, ShoppingCart, Briefcase, Palette } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  type: string;
  icon: ReactNode;
  objective: string;
  myRole: string;
  supervisedTech: string[];
  liveUrl: string;
  codeUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Bossio Monteresino - Estudio Jurídico",
    type: "Web Corporativa Profesional",
    icon: <Scale className="w-12 h-12" />,
    objective: "Digitalizar la presencia de un prestigioso estudio jurídico, estableciendo un canal de comunicación formal y transmitiendo solidez y confianza a través de un diseño sobrio y profesional.",
    myRole: "Dirigí el diseño UX/UI enfocándome en la seriedad institucional. Utilicé herramientas de IA para estructurar el contenido legal y optimizar el SEO. La arquitectura en Next.js garantiza tiempos de carga inmediatos, vitales para la retención de clientes corporativos.",
    supervisedTech: ["Next.js", "TailwindCSS", "Framer Motion", "EmailJS"],
    liveUrl: "https://www.bossiomonteresino.com/",
    codeUrl: "#",
  },
  {
    id: 2,
    title: "Mimate Bien - Tienda de Mates",
    type: "Catálogo & E-commerce",
    icon: <Coffee className="w-12 h-12" />,
    objective: "Crear una plataforma visual para exhibir un stock variado de productos regionales, facilitando la consulta de disponibilidad y cerrando ventas de forma directa y personalizada vía WhatsApp.",
    myRole: "Implementé un catálogo autogestionable ligero. La integración estratégica con la API de WhatsApp agilizó el embudo de ventas. Utilicé generación de código asistida para crear rápidamente componentes de galería responsivos.",
    supervisedTech: ["React", "Vite", "TailwindCSS", "WhatsApp Business API"],
    liveUrl: "https://www.mimatebien.com/",
    codeUrl: "#",
  },
  {
    id: 3,
    title: "iPhone Store - Catálogo Autogestionable",
    type: "Plataforma de Inventario Web",
    icon: <Apple className="w-12 h-12" />,
    objective: "Empoderar al cliente con una herramienta web intuitiva para que pudiera gestionar su inventario de productos y reseñas en tiempo real.",
    myRole: "Definí la arquitectura full-stack serverless con Firebase. Supervisé el front-end en React y el panel de control, usando IA para acelerar la lógica de estado.",
    supervisedTech: ["React", "TailwindCSS", "Firebase", "Vite"],
    liveUrl: "https://iphone-store-catalogo.web.app/",
    codeUrl: "#",
  },
  {
    id: 4,
    title: "Seve Photography - Portfolio de Artista",
    type: "Portfolio Autogestionable",
    icon: <Camera className="w-12 h-12" />,
    objective: "Proporcionar a la fotógrafa una plataforma visualmente impactante y completamente autogestionable para sus galerías.",
    myRole: "Estrategia centrada en optimización de imágenes y carga rápida. Integración con Firebase Storage y diseño de transiciones suaves.",
    supervisedTech: ["React", "Firebase", "TailwindCSS", "Vite"],
    liveUrl: "https://seve-photography-web.web.app/",
    codeUrl: "#",
  },
  {
    id: 5,
    title: "RA Dev - Mi Marca Personal",
    type: "Caso de Estudio: Plataforma de Marca",
    icon: <Code className="w-12 h-12" />,
    objective: "Construir la plataforma digital para mi propia marca, demostrando mi metodología de desarrollo ágil asistida por IA.",
    myRole: "Desarrollo integral, estrategia de contenido y copywritting. Arquitectura estática con Next.js para máximo rendimiento.",
    supervisedTech: ["Next.js", "TypeScript", "TailwindCSS", "Vercel"],
    liveUrl: "#",
    codeUrl: "#",
  },
];

export interface ProjectInDev {
  id: number;
  title: string;
  type: string;
  icon: ReactNode;
  description: string;
  supervisedTech: string[];
}

export const projectsInDev: ProjectInDev[] = [
  {
    id: 1,
    title: "ConsultaPro - Sistema de Turnos Online",
    type: "SaaS · Gestión de Citas",
    icon: <LayoutDashboard className="w-6 h-6" />,
    description: "Plataforma para que profesionales independientes (médicos, psicólogos, coaches) gestionen su agenda online. Reservas automáticas, recordatorios por email y panel de administración.",
    supervisedTech: ["Next.js", "TypeScript", "Supabase", "TailwindCSS"],
  },
  {
    id: 2,
    title: "MenuQR - Carta Digital para Gastronomía",
    type: "Product · Menú Digital",
    icon: <Smartphone className="w-6 h-6" />,
    description: "Solución QR para restaurantes y cafeterías que reemplaza la carta física. Actualización de precios y disponibilidad en tiempo real, sin costos de impresión.",
    supervisedTech: ["React", "Firebase", "TailwindCSS", "PWA"],
  },
  {
    id: 3,
    title: "LaunchPage - Landing de Alta Conversión",
    type: "Template · E-commerce",
    icon: <ShoppingCart className="w-6 h-6" />,
    description: "Template premium para lanzamientos de productos digitales. Optimizado para conversión con secciones de social proof, FAQ y checkout integrado.",
    supervisedTech: ["Next.js", "Stripe", "TailwindCSS", "Framer Motion"],
  },
  {
    id: 4,
    title: "MetricsDash - Dashboard de Agencia",
    type: "Interno · Reportes",
    icon: <Briefcase className="w-6 h-6" />,
    description: "Panel centralizado de métricas para agencias de marketing. Reemplaza reportes manuales en Excel con visualizaciones interactivas y exportación en PDF.",
    supervisedTech: ["React", "TypeScript", "Chart.js", "TailwindCSS"],
  },
  {
    id: 5,
    title: "CreativeStudio - Portfolio Visual Premium",
    type: "Template · Portfolio Creativo",
    icon: <Palette className="w-6 h-6" />,
    description: "Template de portfolio para estudios de diseño y artistas. Micro-interacciones únicas, galería con transiciones cinematográficas y CMS headless integrado.",
    supervisedTech: ["Next.js", "Framer Motion", "TailwindCSS", "Contentful"],
  },
];
