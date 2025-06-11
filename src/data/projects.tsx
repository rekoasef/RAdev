// Importamos los tipos de React para poder usar componentes como iconos
import type { ReactNode } from 'react';
import { Apple, Camera, Code } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  type: string;
  icon: ReactNode; // CAMBIO: Reemplazamos imageUrl por icon
  objective: string;
  myRole: string;
  supervisedTech: string[];
  liveUrl: string;
  codeUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "iPhone Store - Catálogo Autogestionable",
    type: "Plataforma de Inventario Web",
    icon: <Apple className="w-12 h-12" />, // Usamos el icono de Apple
    objective: "Empoderar al cliente con una herramienta web intuitiva para que pudiera gestionar su inventario de productos y reseñas en tiempo real, eliminando la dependencia de un desarrollador para actualizaciones diarias.",
    myRole: "Definí la arquitectura full-stack sin servidor utilizando Firebase para la base de datos en tiempo real y la autenticación. Dirigí el desarrollo del front-end en React, supervisando la creación de un panel de control interno. El uso de IA para generar componentes de formulario y lógica de estado base aceleró la entrega, permitiéndome enfocar en la seguridad de los datos y en una experiencia de usuario fluida para el cliente final.",
    supervisedTech: ["React", "TailwindCSS", "Firebase", "Firebase Hosting", "Vite"],
    liveUrl: "https://iphone-store-catalogo.web.app/",
    codeUrl: "#",
  },
  {
    id: 2,
    title: "Seve Photography - Portfolio de Artista",
    type: "Portfolio Autogestionable",
    icon: <Camera className="w-12 h-12" />, // Usamos el icono de una cámara
    objective: "Proporcionar a la fotógrafa una plataforma visualmente impactante y completamente autogestionable, donde pudiera actualizar sus galerías y testimonios de forma autónoma, reflejando instantáneamente su trabajo más reciente.",
    myRole: "La estrategia se centró en la optimización de imágenes para una carga ultra-rápida. Supervisé la integración con Firebase Storage para la gestión de archivos multimedia. El panel de administración fue prototipado rápidamente con asistencia de IA, lo que nos dio más tiempo para refinar las animaciones y transiciones del front-end, asegurando que la experiencia visual estuviera a la altura de la calidad artística de la fotógrafa.",
    supervisedTech: ["React", "Firebase", "TailwindCSS", "Firebase Storage", "Vite"],
    liveUrl: "https://seve-photography-web.web.app/",
    codeUrl: "#",
  },
  {
    id: 3,
    title: "RA Dev - Mi Marca y Portfolio Personal",
    type: "Caso de Estudio: Plataforma de Marca",
    icon: <Code className="w-12 h-12" />, // Usamos un icono de código
    objective: "Construir la plataforma digital para mi propia marca, 'RA Dev', que no solo muestre mis proyectos, sino que también comunique y demuestre en sí misma mi metodología de desarrollo ágil asistida por IA.",
    myRole: "Como único desarrollador y estratega, apliqué mi propia metodología. Definí la arquitectura estática con Next.js para un rendimiento superior. Utilicé asistentes de IA para acelerar la maquetación con TailwindCSS y generar código base, lo que me permitió dedicar la mayor parte del tiempo a la estrategia de contenido, la redacción publicitaria (copywriting) y el refinamiento de la experiencia de usuario que estás viendo ahora mismo.",
    supervisedTech: ["Next.js", "TypeScript", "TailwindCSS", "Vercel", "IA-Assisted Dev"],
    liveUrl: "#",
    codeUrl: "#",
  },
];